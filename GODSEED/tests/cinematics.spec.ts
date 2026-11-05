import {test,expect,type Page} from '@playwright/test';
async function stable(page:Page){await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');}
async function choice(page:Page,name:string){await page.getByRole('button',{name,exact:true}).tap();await stable(page);}
async function snapshot(page:Page){return page.evaluate(()=>new Promise<{revision:number;choices:string[];inventory:Record<string,number>}>(resolve=>{const r=indexedDB.open('godseed-saves',1);r.onsuccess=()=>{const db=r.result,tx=db.transaction('slots','readonly'),g=tx.objectStore('slots').get('current');g.onsuccess=()=>resolve(g.result);tx.oncomplete=()=>db.close();};}));}
test.use({hasTouch:true});
for(const [width,height] of [[390,844],[820,1180],[1024,768],[1366,768]])test(`authored approach, seated rest and skip ${width}x${height}`,async({page})=>{
 await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'no-preference'});
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/');const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','ready');
 await choice(page,'เริ่มการเดินทาง');await choice(page,'ลุกขึ้นสำรวจรอบตัว');
 const first=await snapshot(page);
 const pickup=page.waitForFunction(()=>{const d=document.querySelector<HTMLElement>('#canvas')?.dataset;return d?.pathPhase==='interaction'&&d.playerAction==='pick_up'?JSON.parse(d.actionAnchor!):null;},null,{polling:'raf'});
 await page.getByRole('button',{name:'เก็บขนนกสีฟ้าที่ข้างทางก่อน',exact:true}).tap();
 expect(await (await pickup).jsonValue()).toEqual({x:208,y:219,feetY:239,depth:239,pose:'pick_up'});await stable(page);
 const picked=await snapshot(page);expect(picked.revision).toBe(first.revision+1);expect(picked.inventory.CORE_WIND).toBe(1);
 const seated=page.waitForFunction(()=>{const d=document.querySelector<HTMLElement>('#canvas')?.dataset;return d?.pathPhase==='interaction'&&d.playerAction==='rest'?JSON.parse(d.actionAnchor!):null;},null,{polling:'raf'});
 await page.getByRole('button',{name:'พักผ่อนที่ม้านั่ง',exact:true}).tap();
 expect(await (await seated).jsonValue()).toEqual({x:79,y:193,feetY:213,depth:239,pose:'rest'});
 await page.screenshot({path:`test-results/cinematic-bench-${width}.png`,fullPage:true});await stable(page);
 const before=await snapshot(page);
 await page.getByRole('button',{name:'ไปโรงช่างของคุโร',exact:true}).tap();await expect(canvas).toHaveAttribute('data-path-phase','approach');
 await page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true}).tap();await stable(page);
 const after=await snapshot(page);expect(after.revision).toBe(before.revision+1);expect(after.choices.filter(id=>id==='CH0202')).toHaveLength(1);
 await expect(canvas).toHaveAttribute('data-stage','workshop');await expect(canvas).toHaveAttribute('data-path-phase','idle');
 await page.reload();await choice(page,'เล่นต่อจากความทรงจำ');expect((await snapshot(page)).revision).toBe(after.revision);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});
