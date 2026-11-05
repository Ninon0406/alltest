import {reloadFromFile} from './file-helpers';
import {test,expect} from '@playwright/test';
test.use({hasTouch:true});
for(const [width,height] of [[390,844],[820,1180],[1024,768],[1366,768]])test(`camera focus and reduced cancellation ${width}x${height}`,async({page})=>{
 await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'no-preference'});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','ready');
 const tap=async(name:string)=>{await page.getByRole('button',{name,exact:true}).tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');};
 await tap('เริ่มการเดินทาง');
 const focus=page.waitForFunction(()=>{const d=document.querySelector<HTMLElement>('#canvas')?.dataset;if(d?.actionPhase!=='action'||!d.cameraShot)return null;const c=JSON.parse(d.cameraShot);return c.x<-5?c:null;},null,{polling:'raf'});
 await page.getByRole('button',{name:'ลุกขึ้นสำรวจรอบตัว',exact:true}).tap();const h=await focus,c=await h.jsonValue();await h.dispose();expect(c.left).toBeGreaterThanOrEqual(0);expect(c.right).toBeLessThanOrEqual(480);expect(c.top).toBeGreaterThanOrEqual(0);expect(c.bottom).toBeLessThanOrEqual(270);
 await page.locator('#canvas').screenshot({path:`test-results/camera-${width}.png`});
 await page.getByRole('button',{name:'ลดการเคลื่อนไหว',exact:true}).tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');
 const settled=JSON.parse((await canvas.getAttribute('data-camera-shot'))!);expect(settled.zoom).toBe(1);expect(settled.x).toBe(0);
 await expect(page.getByRole('heading',{name:'เส้นทางสู่หมู่บ้าน',exact:true})).toBeVisible();await reloadFromFile(page);await expect(page.getByRole('heading',{name:'เส้นทางสู่หมู่บ้าน',exact:true})).toBeVisible();expect(errors).toEqual([]);
});
