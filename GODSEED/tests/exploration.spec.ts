import {exportedState,reloadFromFile} from './file-helpers';
import {test,expect,type Page} from '@playwright/test';

test.use({hasTouch:true});
const saved=exportedState;
async function settled(page:Page){await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');await expect(page.locator('#skip')).toBeHidden();}
async function tap(page:Page,name:string){
 const button=page.getByRole('button',{name,exact:true});
 if(!await button.isVisible()&&await page.locator('.other-routes summary').isVisible())await page.locator('.other-routes summary').tap();
 await button.tap();await settled(page);
}
async function start(page:Page){await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส'])await tap(page,name);}
async function recipe(page:Page,core:string,form:string,mod:string){await tap(page,'ผสมเวท');await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption(core);await page.getByLabel('รูปแบบ',{exact:true}).selectOption(form);await page.getByLabel('ตัวปรับ',{exact:true}).selectOption(mod);await tap(page,'ผสมและค้นพบเวท');}
async function photo(page:Page,name:string,width:number){
 await expect(page.locator('#canvas')).toHaveAttribute('data-stage-layers','3');await page.waitForTimeout(100);
 if(width<=900){const canvas=await page.locator('#canvas canvas').boundingBox(),hud=await page.locator('#hud').boundingBox();expect(canvas).not.toBeNull();expect(hud!.y).toBeGreaterThanOrEqual(canvas!.y+canvas!.height);}
 await page.screenshot({path:`test-results/explore-${name}-${width}.png`,fullPage:true});
}

for(const [width,height] of [[390,844],[820,1180],[1024,768],[1366,768]])test(`archive research, WATER/ECHO craft, B02 reload and remembered clean stream ${width}`,async({page})=>{
 test.setTimeout(120000);await page.setViewportSize({width,height});const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 await start(page);
 await page.locator('.other-routes summary').tap();await expect(page.getByRole('button',{name:'สำรวจลำธารสีหยก · คุยกับลูมิหรือผสมเวทแรกก่อน',exact:true})).toBeDisabled();
 await tap(page,'เข้าหอสมุดของไอรา');await expect(page.locator('#canvas')).toHaveAttribute('data-npc','eira-v3');await photo(page,'archive',width);
 for(const label of ['ช่วยจัดหนังสือก่อน','จดพิกัดโบราณสถาน','ไปโรงช่างของคุโร','ขอเรียนการผสมเวท','ทดลองสูตรแรกจากของที่มี','ผสมและค้นพบเวท','ไปโรงช่างของคุโร','ช่วยยกกล่องเครื่องมือ','ออกไปหาของเพิ่มเติมก่อน','เข้าหอสมุดของไอรา','ขอดูจารึกเสียงสะท้อน','ศึกษาเวทเสียงสะท้อน'])await tap(page,label);
 await recipe(page,'ECHO','ORB','LINGER');
 for(const label of ['แวะสวนดอกไม้ของยายมาเรน','ช่วยรดน้ำและเก็บเมล็ด','สำรวจลำธารสีหยก'])await tap(page,label);
 await expect(page.locator('#canvas')).toHaveAttribute('data-stage','stream');await expect(page.locator('#canvas')).toHaveAttribute('data-stream-mist','visible');await photo(page,'stream-fog',width);
 for(const label of ['เก็บน้ำหยกกับน้ำค้าง','ปล่อยกระดิ่งไว้และจำจังหวะเสียง'])await tap(page,label);
 await recipe(page,'WATER','RING','HEAL');
 for(const label of ['สำรวจลำธารสีหยก','ตรวจดูหมอกใต้สะพาน'])await tap(page,label);
 await expect(page.getByRole('heading',{name:'วิญญาณละอองธารา',exact:true})).toBeVisible();await expect(page.getByText('HP ศัตรู 52/52',{exact:true})).toBeVisible();
 await expect(page.locator('#canvas')).toHaveAttribute('data-npc','wisp-v3');await photo(page,'stream-battle',width);
 await tap(page,'เสียงสะท้อนดาราเนิ่นนาน · MP 14');const checkpoint=await saved(page);
 expect(checkpoint.mp).toBe(26);expect(checkpoint.battle!.turn).toBe(2);if(checkpoint.battle!.log.includes('เวทคลาดเป้า'))expect(checkpoint.battle!.enemyHp).toBe(52);else expect(checkpoint.battle!.enemyHp).toBeLessThan(52);expect(checkpoint.known).toHaveLength(3);
 await reloadFromFile(page);expect(await saved(page)).toEqual(checkpoint);
 await tap(page,'ธาราวงแหวนชีวา · MP 14');const healed=await saved(page);expect(healed.battle!.enemyHp).toBe(checkpoint.battle!.enemyHp);expect(healed.battle!.log.join(' ')).toContain('ฟื้น HP');expect(healed.mp).toBe(checkpoint.mp-14);expect(healed.hp).toBeGreaterThan(checkpoint.hp-8);
 await tap(page,'วายุดารานำวิถี · MP 10');for(let turn=0;(await saved(page)).battle&&turn<16;turn++)await tap(page,'ประกายพื้นฐาน · MP 0');
 const won=await saved(page);expect(won.scene).toBe('S12_STREAM_RESULT');expect(won.rewarded).toEqual(['win:B02_STREAM_WISP']);expect(won.xp).toBe(24);expect(won.flags.training_won).not.toBe(true);
 await tap(page,'ช่วยนำกระดิ่งออกจากรากไม้');const clean=await saved(page);expect(clean.flags.stream_clean).toBe(true);expect(clean.inventory.IT_OLD_BELL).toBe(1);
 await tap(page,'สำรวจลำธารสีหยก');await expect(page.locator('#canvas')).toHaveAttribute('data-stream-mist','clear');await photo(page,'stream-clean',width);
 for(const label of ['กลับหมู่บ้าน','เข้าหอสมุดของไอรา'])await tap(page,label);
 await expect(page.getByText(/เธอช่วยให้ลำธารกลับมาใสแล้ว/)).toBeVisible();
 await tap(page,'ความทรงจำ');await expect(page.getByText('เบาะแสบทเพลงที่ค้นพบ 2 แห่ง',{exact:true})).toBeVisible();await expect(page.getByText('ลำธารกลับมาใส · หมอกใต้สะพานจางลง',{exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});

test('non-combat stream path remembers listening, then a skipped genuine WIND cast cleans it once',async({page})=>{
 await page.setViewportSize({width:390,height:844});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await start(page);
 for(const label of ['ไปหาลูมิที่บ่อน้ำ','ถามถึงเรื่องราวของเพลง','บอกลูมิว่าจะช่วยตามหาทำนอง','สำรวจลำธารสีหยก'])await tap(page,label);
 await expect(page.getByRole('button',{name:'ใช้เวทลมพัดหมอก · ค้นพบเวทธาตุลมก่อน',exact:true})).toBeDisabled();
 for(const label of ['เก็บน้ำหยกกับน้ำค้าง','ปล่อยกระดิ่งไว้และจำจังหวะเสียง','เข้าหอสมุดของไอรา'])await tap(page,label);
 await expect(page.getByText(/เธอจำจังหวะกระดิ่งได้หรือ/)).toBeVisible();
 for(const label of ['ขอดูจารึกเสียงสะท้อน','ขอความช่วยเหลือจากไอรา','ไปโรงช่างของคุโร','ขอเรียนการผสมเวท','ทดลองสูตรแรกจากของที่มี','ผสมและค้นพบเวท','สำรวจลำธารสีหยก'])await tap(page,label);
 const before=await saved(page);await page.getByRole('button',{name:'ลดการเคลื่อนไหว',exact:true}).tap();
 await page.getByRole('button',{name:'ใช้เวทลมพัดหมอก',exact:true}).tap();await expect(page.locator('#canvas')).toHaveAttribute('data-player-action','cast');
 expect(JSON.parse((await page.locator('#canvas').getAttribute('data-spell-target'))!)).toEqual({kind:'scene',x:330,y:150});
 // Capture the observed target before skipping, but do not spend the finite
 // skip window waiting for a full-page screenshot on a busy CI runner.
 await page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true}).tap();await settled(page);
 await page.screenshot({path:'test-results/explore-wind-target-390.png',fullPage:true});
 const next=await saved(page);expect(next.flags).toMatchObject({stream_clean:true,stream_clue:true});expect(next.revision).toBe(before.revision+1);expect(next.mp).toBe(before.mp);expect(next.rewarded).toEqual([]);expect(next.choices.filter(id=>id==='CH1102')).toHaveLength(1);
 await expect(page.locator('#canvas')).toHaveAttribute('data-stream-mist','clear');await expect(page.locator('#canvas')).toHaveAttribute('data-active-effects','0');
 await tap(page,'ปล่อยกระดิ่งไว้และจำจังหวะเสียง');expect((await saved(page)).flags.stream_clean).toBe(true);expect((await saved(page)).inventory.IT_OLD_BELL||0).toBe(0);await tap(page,'ความทรงจำ');await expect(page.getByText('ลำธารกลับมาใส · หมอกใต้สะพานจางลง',{exact:true})).toBeVisible();await expect(page.getByText('ช่วยกระดิ่งจากรากไม้ · เก็บกระดิ่งเก่าไว้แล้ว',{exact:true})).toHaveCount(0);expect(errors).toEqual([]);
});

test('new archive layers retain a playable fallback when a PNG request fails',async({page})=>{
 await page.route('**/assets/art-v3/archive-rear.png',route=>route.abort());await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');
 for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส','เข้าหอสมุดของไอรา'])await tap(page,name);
 await expect(page.locator('#render-notice')).toContainText('ใช้ภาพสำรอง');await expect(page.locator('#canvas')).toHaveAttribute('data-stage-layers','1');
 for(const name of ['ถามว่าเศษความทรงจำคืออะไร','ขอความช่วยเหลือจากไอรา'])await tap(page,name);
 expect((await saved(page)).flags).toMatchObject({archive_read:true,ruins_open:true});
});
