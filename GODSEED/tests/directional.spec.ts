import {test,expect,type Page} from '@playwright/test';
test.use({hasTouch:true});
// A real road from the retained bench position has up to eight bounded legs;
// the former 5s helper assumed every action started at the reset entry point.
const stable=async(page:Page)=>{await expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:12_000});};
const tap=async(page:Page,name:string)=>{const b=page.getByRole('button',{name,exact:true});if(!await b.isVisible()&&await page.locator('.other-routes summary').isVisible())await page.locator('.other-routes summary').tap();await b.tap();await stable(page);};
function observe(page:Page,facing:string,texture='hero-walk-v4'){
 return page.waitForFunction(({facing,texture})=>{
  const d=document.querySelector<HTMLElement>('#canvas')?.dataset;if(d?.walkFacing!==facing||d.pathPhase!=='approach'||d.playerAction!=='walk'||!d.walkSample)return null;
  const s=JSON.parse(d.walkSample);return s.texture===texture&&Math.abs(s.shadowY-s.feetY)<=1&&Math.abs(s.shadowX-s.x)<=1?{facing,...s}:null;
 },{facing,texture},{polling:'raf'});
}
for(const [width,height] of [[390,844],[820,1180],[1024,768],[1366,768]])test(`four authored directions from genuine choices ${width}x${height}`,async({page})=>{
 test.setTimeout(60_000);await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'no-preference'});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 await page.goto('/');await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');await tap(page,'เริ่มการเดินทาง');
 const south=observe(page,'south'),east=observe(page,'east');await page.getByRole('button',{name:'ลุกขึ้นสำรวจรอบตัว',exact:true}).tap();
 for(const [direction,observed] of [['south',south],['east',east]] as const){const h=await observed,s=await h.jsonValue();expect(s.animation).toBe('hero-walk-'+direction);expect(Math.abs(s.depth-s.feetY)).toBeLessThanOrEqual(1);await h.dispose();}
 await page.locator('#canvas').screenshot({path:`test-results/directional-east-${width}.png`});await stable(page);
 await tap(page,'เก็บขนนกสีฟ้าที่ข้างทางก่อน');
 const west=observe(page,'west');await page.getByRole('button',{name:'พักผ่อนที่ม้านั่ง',exact:true}).tap();const w=await west;expect((await w.jsonValue()).animation).toBe('hero-walk-west');await w.dispose();await stable(page);
 await tap(page,'เข้าหอสมุดของไอรา');const north=observe(page,'north');await page.getByRole('button',{name:'ขอดูจารึกเสียงสะท้อน',exact:true}).tap();const n=await north;expect((await n.jsonValue()).animation).toBe('hero-walk-north');await n.dispose();
 await page.locator('#canvas').screenshot({path:`test-results/directional-north-${width}.png`});await stable(page);
 await expect(page.locator('#canvas')).toHaveAttribute('data-walk-trace','east,north');await expect(page.getByRole('heading',{name:'ร่องรอยบนหน้ากระดาษ',exact:true})).toBeVisible();
 await page.reload();await tap(page,'เล่นต่อจากความทรงจำ');await expect(page.getByRole('heading',{name:'ร่องรอยบนหน้ากระดาษ',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});
test('missing directional PNG falls back to existing hero and keeps choices/save working',async({page})=>{
 await page.route('**/assets/art-v4/hero-walk.png',route=>route.abort());await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/');await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','degraded');await tap(page,'เริ่มการเดินทาง');
 const moving=observe(page,'south','hero-v2');await page.getByRole('button',{name:'ลุกขึ้นสำรวจรอบตัว',exact:true}).tap();const h=await moving;expect((await h.jsonValue()).animation).toBe('hero-walk');await h.dispose();await stable(page);
 await expect(page.locator('#render-notice')).toContainText('ใช้ภาพสำรอง');await page.reload();await tap(page,'เล่นต่อจากความทรงจำ');await expect(page.getByRole('heading',{name:'เส้นทางสู่หมู่บ้าน',exact:true})).toBeVisible();
});
