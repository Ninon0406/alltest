import {expect} from '@playwright/test';
export const snapshot=page=>page.evaluate(()=>Game.snapshot);
export async function start(page){page.on('dialog',d=>d.accept());await page.goto('/');await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่',exact:true}).click();}
export async function closeOverlay(page){if(await page.getByRole('dialog').isVisible())await page.getByRole('button',{name:'ปิดหน้าต่าง',exact:true}).click();}
export async function openOverlay(page,name){
 await closeOverlay(page);const direct=page.getByRole('button',{name,exact:true});if(await direct.isVisible())await direct.click();else{await page.getByRole('button',{name:'เพิ่มเติม',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name,exact:true}).click();}
 await expect(page.getByRole('dialog')).toBeVisible();
}
export async function reachAge(page,target){let steps=0;while((await snapshot(page)).age<target){if(await page.locator('.major-option').count())await page.locator('.major-option').first().click();else await page.getByRole('button',{name:'ใช้ชีวิตต่อ 1 ปี',exact:true}).click();if(++steps>target+20)throw Error('Annual progression stalled');}}
export async function awaken(page){await reachAge(page,12);await page.locator('.major-option').first().click();expect((await snapshot(page)).progression.awakening.step).toBe(7);}
export async function openReading(page){await closeOverlay(page);await page.getByText('อ่านเรื่องราวและเส้นทางเพิ่มเติม',{exact:true}).click();}
export async function finishPeacefully(page){await reachAge(page,12);await openReading(page);await page.getByRole('button',{name:'เปิดเรื่องราวเส้นทางเดิม',exact:true}).click();for(const name of [/เลือกเส้นทาง 'ชาวบ้านสันโดษ/,/พัฒนาสวนเกษตรเวทมนตร์/,/ใช้ชีวิตบั้นปลายอย่างมีความสุข/])await page.getByRole('button',{name}).click();await expect(page.locator('.terminal-summary')).toBeVisible();}
