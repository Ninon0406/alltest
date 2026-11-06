# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browser.spec.ts >> real loop and save 1024x768
- Location: tests/browser.spec.ts:3:129

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeHidden() failed

Locator:  getByRole('button', { name: 'ข้ามแอนิเมชัน', exact: true })
Expected: hidden
Received: visible

Call log:
  - Expect "toBeHidden" getByRole('button', { name: 'ข้ามแอนิเมชัน', exact: true }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'ข้ามแอนิเมชัน', exact: true })
    6 × locator resolved to <button id="skip">ข้ามแอนิเมชัน</button>
      - unexpected value "visible"
  - Test timeout of 30000ms exceeded.

```

```yaml
- button "ข้ามแอนิเมชัน"
```

# Test source

```ts
  1  | import {reloadFromFile} from './file-helpers';
  2  | import {test,expect} from '@playwright/test';
  3  | for(const [w,h] of [[360,800],[390,844],[430,932],[768,1024],[820,1180],[1024,768],[1366,768],[1440,900],[1920,1080],[844,390]])test(`real loop and save ${w}x${h}`,async({page})=>{
  4  |  await page.setViewportSize({width:w,height:h});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  5  |  await page.goto('/');if(w===360)await page.screenshot({path:'test-results/title-360.png',fullPage:true});await page.getByRole('button',{name:'ลดการเคลื่อนไหว'}).click();await page.getByRole('button',{name:'เริ่มการเดินทาง'}).click();
> 6  |  const click=async(name:string)=>{await page.getByRole('button',{name,exact:true}).click();await expect(page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true})).toBeHidden();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');};
     |                                                                                                                                                                     ^ Error: expect(locator).toBeHidden() failed
  7  |  for(const n of ['ลุกขึ้นสำรวจรอบตัว','เก็บขนนกสีฟ้าที่ข้างทางก่อน','ไปโรงช่างของคุโร','ขอเรียนการผสมเวท','ทดลองสูตรแรกจากของที่มี','ผสมและค้นพบเวท'])await click(n);
  8  |  await expect(page.getByRole('heading',{name:'จัตุรัสของเรื่องราว'})).toBeVisible();
  9  |  await page.getByRole('button',{name:'สมุดเวท',exact:true}).click();await expect(page.getByRole('heading',{name:'วายุดารานำวิถี'})).toBeVisible();
  10 |  await reloadFromFile(page);
  11 |  for(const n of ['เดินทางสู่ชายป่า','เก็บขนนกกับละอองเมฆข้างทาง','ลองใช้เวทให้มันถอย'])await click(n);
  12 |  await expect(page.getByRole('heading',{name:'ต้นอ่อนหลงทาง'})).toBeVisible();if([360,768,1366].includes(w))await page.screenshot({path:`test-results/battle-${w}.png`,fullPage:true});
  13 |  for(let i=0;i<10&&await page.getByRole('button',{name:'วายุดารานำวิถี · MP 10',exact:true}).count();i++){
  14 |  const b=page.getByRole('button',{name:'วายุดารานำวิถี · MP 10',exact:true});if(await b.isEnabled())await click('วายุดารานำวิถี · MP 10');else await click('ตั้งรับ · ฟื้น MP 6');
  15 |  if(w===360&&i===0){const hud=await page.locator('#hud').innerText(),enemy=await page.getByText(/HP ศัตรู/).innerText();await reloadFromFile(page);await expect(page.locator('#hud')).toHaveText(hud);await expect(page.getByText(/HP ศัตรู/)).toHaveText(enemy);}
  16 |  }
  17 |  await expect(page.getByRole('heading',{name:'เสียงบนใบไม้'})).toBeVisible();for(const n of ['ลอกลายโน้ตเก็บไว้','เก็บชิ้นส่วนโน้ตเรืองแสง'])await click(n);
  18 |  await expect(page.getByText(/จบช่วงทดลองเมล็ดแรก/)).toBeVisible();await page.getByRole('button',{name:'กระเป๋า',exact:true}).click();await expect(page.getByText('โน้ตบนใบไม้ × 1')).toBeVisible();
  19 |  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`test-results/loop-${w}x${h}.png`,fullPage:true});expect(errors).toEqual([]);
  20 | });
  21 | test('project Pages subpath loads actual production assets and accepts keyboard/touch without duplicate action',async({page})=>{
  22 |  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.url());});
  23 |  // A slow real PNG must not turn an early Enter on a disabled button into
  24 |  // an assumed game start. Keep the real keyboard/subpath/double-click path.
  25 |  await page.route('**/assets/art-v4/hero-walk.png',async route=>{await new Promise(resolve=>setTimeout(resolve,500));await route.continue();});
  26 |  await page.goto('http://127.0.0.1:4191/alltest/');
  27 |  await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');
  28 |  const start=page.getByRole('button',{name:'เริ่มการเดินทาง'});await expect(start).toBeEnabled();await start.focus();await page.keyboard.press('Enter');
  29 |  await page.getByRole('button',{name:'ลุกขึ้นสำรวจรอบตัว',exact:true}).click();await page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true}).click();
  30 |  await expect(page.getByRole('heading',{name:'เส้นทางสู่หมู่บ้าน'})).toBeVisible();
  31 |  await page.getByRole('button',{name:'เก็บขนนกสีฟ้าที่ข้างทางก่อน',exact:true}).dblclick();await expect(page.getByRole('heading',{name:'จัตุรัสของเรื่องราว'})).toBeVisible();
  32 |  await page.getByRole('button',{name:'กระเป๋า',exact:true}).click();await expect(page.getByText('ขนนกสายลม × 1')).toBeVisible();
  33 |  await reloadFromFile(page);await expect(page.getByRole('heading',{name:'จัตุรัสของเรื่องราว'})).toBeVisible();expect(errors).toEqual([]);
  34 | });
  35 | test('touch controls commit one choice and expose an animated world',async({browser})=>{
  36 |  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const page=await context.newPage();await page.goto('http://127.0.0.1:4190/');await page.getByRole('button',{name:'เริ่มการเดินทาง'}).tap();await expect(page.locator('canvas')).toBeVisible();await page.getByRole('button',{name:'ลุกขึ้นสำรวจรอบตัว',exact:true}).tap();await expect(page.getByRole('heading',{name:'เส้นทางสู่หมู่บ้าน'})).toBeVisible();await context.close();
  37 | });
  38 | 
```