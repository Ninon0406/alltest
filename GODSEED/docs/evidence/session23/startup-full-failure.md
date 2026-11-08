# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: guardian.spec.ts >> 1366: missing guardian atlas has explicit retry and preserves manual-file state
- Location: tests/guardian.spec.ts:26:1

# Error details

```
Test timeout of 180000ms exceeded.
```

```
Error: locator.focus: Test timeout of 180000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'ลุกขึ้นสำรวจรอบตัว', exact: true })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - link "GODSEED THE WORLD THAT REMEMBERS" [ref=e4] [cursor=pointer]:
      - /url: ./
      - text: GODSEED
      - generic [ref=e5]: THE WORLD THAT REMEMBERS
    - generic [ref=e6]: เมล็ดแรก · ฉบับทดลอง 0.13.0
    - button "ลดการเคลื่อนไหว" [pressed] [ref=e7] [cursor=pointer]
  - main [ref=e8]:
    - generic [ref=e9]:
      - img "โลกพิกเซลของ GODSEED" [ref=e10]
      - generic [ref=e11]: บทที่หนึ่ง · หมู่บ้านที่ลืมเสียงเพลง
      - generic [ref=e12]: โลกที่จดจำทุกทางเลือกของคุณ
    - generic [ref=e13]:
      - navigation "เมนูเกม" [ref=e14]
      - generic [ref=e15]:
        - paragraph [ref=e16]: เรื่องราวของ ผู้มาเยือน
        - heading "โลกกำลังรอเรื่องราวของคุณ" [level=1] [ref=e17]
        - paragraph [ref=e18]: ใต้เงาต้นเมล็ด มีบทเพลงหนึ่งกำลังเลือนหาย และมีใครบางคนรอให้คุณช่วยฟัง
        - generic [ref=e19]:
          - text: ชื่อผู้มาเยือน
          - textbox "ชื่อผู้มาเยือน" [ref=e20]:
            - /placeholder: อาเรน
        - button "เริ่มการเดินทาง" [ref=e21] [cursor=pointer]
        - button "บันทึกเกมเป็นไฟล์" [disabled] [ref=e22]
        - generic [ref=e23]: โหลดเกมจากไฟล์
        - button "โหลดเกมจากไฟล์" [ref=e24] [cursor=pointer]
        - paragraph [ref=e25]: เกมเก็บความคืบหน้าใน RAM เท่านั้น รีเฟรชหรือปิดเว็บแล้วต้องเลือกไฟล์เพื่อเล่นต่อ บน iPhone/iPad หากเปิดหน้าตัวอย่าง ให้ใช้ แชร์ → บันทึกไปยังแอปไฟล์ บน Android/คอมพิวเตอร์ให้ตรวจ Downloads
      - status
  - contentinfo [ref=e26]: ทุกทางเลือกทิ้งความทรงจำไว้ · เซฟเป็นไฟล์ด้วยตัวเอง · ไม่ใช้ AI ภายนอก
```

# Test source

```ts
  1  | import {expect,type Page} from '@playwright/test';
  2  | import {scenes} from '../src/content/story.ts';
  3  | import {exportedState} from './file-helpers.ts';
  4  | 
  5  | export const choiceLabel=(id:string)=>Object.values(scenes).flatMap(s=>s.choices).find(c=>c.id===id)!.label;
  6  | export async function clickLife(page:Page,name:string){
  7  |  const button=page.getByRole('button',{name,exact:true});
  8  |  if(!await button.isVisible()&&await page.locator('.other-routes summary').isVisible())await page.locator('.other-routes summary').click();
> 9  |  if((page.viewportSize()?.width||0)>=1280){await button.focus();await page.keyboard.press('Enter');}else await button.tap();
     |                                                         ^ Error: locator.focus: Test timeout of 180000ms exceeded.
  10 |  await expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:20_000});
  11 | }
  12 | export async function takeLife(page:Page,...ids:string[]){for(const id of ids)await clickLife(page,choiceLabel(id));}
  13 | /** Earn every flag, item and spell through the public UI. No injected save/state. */
  14 | export async function completeOpening(page:Page,url='/'){
  15 |  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await clickLife(page,'เริ่มการเดินทาง');
  16 |  await takeLife(page,'CH0001','CH0101','CH0202','CH0401');await clickLife(page,'ทดลองสูตรแรกจากของที่มี');await clickLife(page,'ผสมและค้นพบเวท');
  17 |  await takeLife(page,'CH0201','CH0301','CH03B1','CH0204','CH0701','CH1401','CH0205','CH0802','CH0903','CH1301','CH0208',
  18 |   'CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND','CH1802','CHV6_NOTES_MARK','CHV6_NOTES_COPY','CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_RECORD',
  19 |   'CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW','CH1903','CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER','CHV6_MORNING_FINISH');
  20 | }
  21 | export async function winTraining(page:Page){
  22 |  for(let i=0;i<30;i++){
  23 |   if(!await page.getByRole('button',{name:'ประกายพื้นฐาน · MP 0',exact:true}).count())return;
  24 |   const spell=page.getByRole('button',{name:'วายุดารานำวิถี · MP 10',exact:true});
  25 |   await clickLife(page,await spell.isEnabled()?'วายุดารานำวิถี · MP 10':'ประกายพื้นฐาน · MP 0');
  26 |  }
  27 |  throw Error('Training did not finish in 30 actions');
  28 | }
  29 | export async function learnBothPaths(page:Page){
  30 |  await takeLife(page,'CHLP_HUB','CHLP_START_EXPLORER','CHLP_E_BEGIN','CHLP_E_SURVEY_FEET','CHLP_E_MARK_RIBBON','CHLP_E_ACK_MAP','CHLP_E_TRIAL_START');
  31 |  await winTraining(page);await takeLife(page,'CHLP_E_RANK2_SHARE','CHLP_E_HOME_CROSS','CHLP_START_NATURE','CHLP_N_BEGIN','CHLP_N_SOURCE_CLEAR','CHLP_N_WATER_BUCKET','CHLP_N_ACK_PATIENCE','CHLP_N_TRIAL_START');
  32 |  await winTraining(page);await takeLife(page,'CHLP_N_RANK2_REFUGE','CHLP_N_HOME_CROSS','CHLP_SHARED_LESSON','CHLP_SHARED_GUIDE');
  33 |  const state=await exportedState(page);expect(state.flags.lp_explorer_rank2).toBe(true);expect(state.flags.lp_nature_rank2).toBe(true);expect(state.flags.lp_shared_guide).toBe(true);return state;
  34 | }
  35 | 
```