import {exportedState} from './file-helpers';
import {test,expect,type Page} from '@playwright/test';

const savedSnapshot=exportedState;
async function settled(page:Page){
 await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');
 await expect(page.locator('#skip')).toBeHidden();
 await expect(page.locator('#canvas')).toHaveAttribute('data-action-phase','idle');
 await expect(page.locator('#canvas')).toHaveAttribute('data-active-effects','0');
}
async function clickAndWait(page:Page,name:string){
 await page.getByRole('button',{name,exact:true}).click();
 await settled(page);
}
async function start(page:Page){
 await page.goto('/');
 await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');
 await clickAndWait(page,'เริ่มการเดินทาง');
}
async function hudClearsCanvas(page:Page,width:number){
 if(width>900)return;
 const canvas=await page.locator('#canvas canvas').boundingBox(),hud=await page.locator('#hud').boundingBox();
 if(!canvas||!hud)throw Error('ไม่พบพื้นที่ฉากหรือข้อมูลพลังสำหรับตรวจการซ้อนทับ');
 expect(hud.y,`HUD must sit below the actual canvas at ${width}px`).toBeGreaterThanOrEqual(canvas.y+canvas.height);
}
async function photographStage(page:Page,stage:string,width:number){
 await expect(page.locator('#canvas')).toHaveAttribute('data-stage',stage);
 await expect(page.locator('#canvas')).toHaveAttribute('data-stage-layers','3');
 // Reduced-motion scene fades last 60 ms; capture the settled scene, not the fade.
 await page.waitForTimeout(100);
 await hudClearsCanvas(page,width);
 await page.screenshot({path:`test-results/visual-${stage}-${width}.png`,fullPage:true});
}

test('walk skip cleans up and persists one choice before the next genuine action',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await start(page);
 const before=await savedSnapshot(page),canvas=page.locator('#canvas');
 await page.getByRole('button',{name:'ลุกขึ้นสำรวจรอบตัว',exact:true}).click();
 await expect(canvas).toHaveAttribute('data-action-phase','action');
 await expect(canvas).toHaveAttribute('data-player-action','walk');
 await page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true}).click();
 await settled(page);
 const first=await savedSnapshot(page);
 expect(first.revision).toBe(before.revision+1);
 expect(first.choices.filter(id=>id==='CH0001')).toHaveLength(1);
 expect(first.scene).toBe('S01_FIRST_STEPS');
 await expect(canvas).toHaveAttribute('data-last-cue','walk');
 await clickAndWait(page,'เก็บขนนกสีฟ้าที่ข้างทางก่อน');
 const second=await savedSnapshot(page);
 expect(second.revision).toBe(first.revision+1);
 expect(second.choices.filter(id=>id==='CH0102')).toHaveLength(1);
 expect(second.inventory.CORE_WIND).toBe(1);
 expect(second.scene).toBe('S02_HUB');
 expect(errors).toEqual([]);
});

test('OS reduced motion is reflected initially and toggling it during an action settles safely',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await start(page);
 const canvas=page.locator('#canvas'),motion=page.getByRole('button',{name:'ลดการเคลื่อนไหว',exact:true});
 await expect(motion).toHaveAttribute('aria-pressed','true');
 await expect(canvas).toHaveAttribute('data-motion','reduced');
 await clickAndWait(page,'ลุกขึ้นสำรวจรอบตัว');
 const ambientTick=await canvas.getAttribute('data-ambient-tick'),frame=await canvas.getAttribute('data-hero-frame');
 await page.waitForTimeout(250);
 await expect(canvas).toHaveAttribute('data-ambient-tick',ambientTick!);
 await expect(canvas).toHaveAttribute('data-hero-frame',frame!);
 await motion.click();
 await expect(canvas).toHaveAttribute('data-motion','full');
 await page.getByRole('button',{name:'เก็บขนนกสีฟ้าที่ข้างทางก่อน',exact:true}).click();
 await expect(canvas).toHaveAttribute('data-action-phase','action');
 await expect(canvas).toHaveAttribute('data-player-action','walk');
 await motion.click();
 await settled(page);
 await expect(motion).toHaveAttribute('aria-pressed','true');
 await expect(canvas).toHaveAttribute('data-motion','reduced');
 const state=await savedSnapshot(page);
 expect(state.choices.filter(id=>id==='CH0102')).toHaveLength(1);
 expect(state.inventory.CORE_WIND).toBe(1);
});

test('a missing layered PNG shows a readable fallback and keeps choices/save playable',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.route('**/assets/art-v5/village-rear.png',route=>route.abort());
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/');
 const canvas=page.locator('#canvas');
 await expect(canvas).toHaveAttribute('data-render-status','degraded');
 await expect(canvas).toHaveAttribute('data-asset-errors','1');
 await expect(canvas).toHaveAttribute('data-stage-layers','1');
 await expect(page.locator('#render-notice')).toBeVisible();
 await expect(page.locator('#render-notice')).toContainText('ใช้ภาพสำรอง');
 await clickAndWait(page,'เริ่มการเดินทาง');
 await clickAndWait(page,'ลุกขึ้นสำรวจรอบตัว');
 expect((await savedSnapshot(page)).scene).toBe('S01_FIRST_STEPS');
 await expect(page.getByRole('heading',{name:'เส้นทางสู่หมู่บ้าน',exact:true})).toBeVisible();
 expect(errors).toEqual([]);
});

test('phone landscape keeps the entire canvas inside its world column beside the desk',async({page})=>{
 await page.setViewportSize({width:844,height:390});
 await page.emulateMedia({reducedMotion:'reduce'});
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/');
 await expect(page.getByRole('heading',{name:'โลกกำลังรอเรื่องราวของคุณ',exact:true})).toBeVisible();
 await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');
 await clickAndWait(page,'เริ่มการเดินทาง');
 await expect(page.getByRole('heading',{name:'ตื่นใต้ต้นเมล็ด',exact:true})).toBeVisible();
 const main=await page.locator('main').boundingBox(),world=await page.locator('.world').boundingBox();
 const canvas=await page.locator('#canvas canvas').boundingBox(),desk=await page.locator('.desk').boundingBox();
 if(!main||!world||!canvas||!desk)throw Error('ไม่พบขอบเขตฉากและแผงตัวเลือกในแนวนอน');
 expect(Math.abs(world.width-main.width/2),'landscape world must fit its assigned half-width column').toBeLessThanOrEqual(2);
 expect(canvas.x).toBeGreaterThanOrEqual(world.x-1);
 expect(canvas.x+canvas.width).toBeLessThanOrEqual(world.x+world.width+1);
 expect(canvas.y).toBeGreaterThanOrEqual(world.y-1);
 expect(canvas.y+canvas.height).toBeLessThanOrEqual(world.y+world.height+1);
 expect(canvas.x+canvas.width,'the desk must not cover the foe side of the canvas').toBeLessThanOrEqual(desk.x+1);
 await page.screenshot({path:'test-results/visual-landscape-844.png',fullPage:true});
 expect(errors).toEqual([]);
});

test('a genuine training defeat reacts in the workshop before recovering without a win reward',async({page})=>{
 test.setTimeout(60_000);
 await page.emulateMedia({reducedMotion:'reduce'});
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await start(page);
 for(const name of ['ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส','ไปโรงช่างของคุโร','ขอเรียนการผสมเวท','ทดลองสูตรแรกจากของที่มี','ผสมและค้นพบเวท','ไปโรงช่างของคุโร','ฝึกต่อสู้กับภูตจำลอง'])await clickAndWait(page,name);
 let state=await savedSnapshot(page),guardTurns=0;
 while(state.hp>3&&guardTurns<34){
  await clickAndWait(page,'ตั้งรับ · ฟื้น MP 6');
  state=await savedSnapshot(page);guardTurns++;
 }
 expect(state.hp).toBeGreaterThan(0);expect(state.hp).toBeLessThanOrEqual(3);
 const canvas=page.locator('#canvas');
 await page.getByRole('button',{name:'ลดการเคลื่อนไหว',exact:true}).click();
 await expect(canvas).toHaveAttribute('data-motion','full');
 // Observe the short reaction at animation-frame cadence. The default locator
 // assertion backoff can jump across a legitimate 400 ms presentation beat.
 const reaction=page.waitForFunction(()=>{
  const data=document.querySelector<HTMLElement>('#canvas')?.dataset;
  return data?.actionPhase==='reaction'&&data.playerAction==='hit'
   ?{phase:data.actionPhase,stage:data.stage,action:data.playerAction}:null;
 },null,{polling:'raf'});
 await page.getByRole('button',{name:'ตั้งรับ · ฟื้น MP 6',exact:true}).click();
 await expect(canvas).toHaveAttribute('data-last-outcome','lose');
 const reactionSnapshot=await reaction;
 expect(await reactionSnapshot.jsonValue()).toEqual({phase:'reaction',stage:'workshop',action:'hit'});
 await reactionSnapshot.dispose();
 await settled(page);
 await expect(canvas).toHaveAttribute('data-stage','village');
 await expect(page.getByRole('heading',{name:'จุดพักสำหรับคนไม่ยอมแพ้',exact:true})).toBeVisible();
 const recovered=await savedSnapshot(page);
 expect(recovered.scene).toBe('S28_RECOVER');expect(recovered.hp).toBe(70);expect(recovered.mp).toBe(20);
 expect(recovered.rewarded).not.toContain('win:BT_TRAINING');
 expect(recovered.inventory.IT_POTION_DEW).toBe(2);
 expect(errors).toEqual([]);
});

for(const [width,height] of [[390,844],[820,1180],[1366,768]]){
 test(`layered village/garden/workshop and original practice spirit ${width}x${height}`,async({page})=>{
  await page.setViewportSize({width,height});
  await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
  await start(page);
  await clickAndWait(page,'ลุกขึ้นสำรวจรอบตัว');await photographStage(page,'village',width);
  for(const name of ['เดินตามป้ายไม้ไปที่จัตุรัส','แวะสวนดอกไม้ของยายมาเรน'])await clickAndWait(page,name);
  await photographStage(page,'garden',width);
  for(const name of ['ช่วยรดน้ำและเก็บเมล็ด','ไปโรงช่างของคุโร'])await clickAndWait(page,name);
  await photographStage(page,'workshop',width);
  for(const name of ['ขอเรียนการผสมเวท','ทดลองสูตรแรกจากของที่มี','ผสมและค้นพบเวท','ไปโรงช่างของคุโร','ฝึกต่อสู้กับภูตจำลอง'])await clickAndWait(page,name);
  const canvas=page.locator('#canvas');
  await expect(canvas).toHaveAttribute('data-npc','training-v2');await expect(canvas).toHaveAttribute('data-workshop-anvil','false');
  await expect(canvas).toHaveAttribute('data-stage','workshop');
  await expect(page.getByRole('heading',{name:'ภูตฝึกเวทจำลอง',exact:true})).toBeVisible();
  expect((await savedSnapshot(page)).scene).toBe('S04_KORO');
  await hudClearsCanvas(page,width);
  await page.screenshot({path:`test-results/visual-training-${width}.png`,fullPage:true});
  if(width===390){
   for(let turn=0;turn<2;turn++)await clickAndWait(page,'วายุดารานำวิถี · MP 10');
   await expect(canvas).toHaveAttribute('data-last-outcome','win');
   await expect(canvas).toHaveAttribute('data-npc','koro-v10');await expect(canvas).toHaveAttribute('data-workshop-anvil','true');
   await expect(page.getByRole('heading',{name:'โรงช่างที่กลิ่นเหล็กกับดอกไม้',exact:true})).toBeVisible();
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(errors).toEqual([]);
 });
}
