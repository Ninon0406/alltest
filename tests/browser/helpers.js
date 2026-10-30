import {expect} from '@playwright/test';
import {pendingDecision} from '../../src/engine/decisions.js';
export const snapshot=page=>page.evaluate(()=>Game.snapshot);
export async function start(page){page.on('dialog',d=>d.accept());await page.goto('/?classic=1');await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่',exact:true}).click();}
export async function closeOverlay(page){if(await page.getByRole('dialog').isVisible())await page.getByRole('button',{name:'ปิดหน้าต่าง',exact:true}).click();}
export async function openOverlay(page,name){
 await closeOverlay(page);const direct=page.getByRole('button',{name,exact:true});if(await direct.isVisible())await direct.click();else{await page.getByRole('button',{name:'เพิ่มเติม',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name,exact:true}).click();}
 await expect(page.getByRole('dialog')).toBeVisible();
}
export async function decide(page,index=0){
 if(!await page.locator('.major-option').count())await openOverlay(page,'ตัดสินใจตอนนี้');
 await page.locator('.major-option:not([disabled])').nth(index).click();
}
export async function settle(page){let steps=0;while(pendingDecision(await snapshot(page))){await decide(page);if(++steps>15)throw Error('Decision loop stalled');}}
export async function reachAge(page,target,{settleAtTarget=true}={}){
 let steps=0;
 while((await snapshot(page)).age<target){
  if(pendingDecision(await snapshot(page)))await decide(page);
  else if((await snapshot(page)).age<3)await page.getByRole('button',{name:'เติบโตต่อ 3 เดือน',exact:true}).click();
  else {const left=target-(await snapshot(page)).age,years=left>=5?5:left>=2?2:1;await page.getByRole('button',{name:`ใช้ชีวิตต่อ ${years} ปี`,exact:true}).click();}
  if(++steps>target*3+40)throw Error('V7 progression stalled');
 }
 if(settleAtTarget)await settle(page);
}
export async function awaken(page){await reachAge(page,12);expect((await snapshot(page)).progression.awakening.step).toBe(7);}
export async function oneMonth(page){await settle(page);await page.getByRole('button',{name:'เติบโตต่อ 1 เดือน',exact:true}).click();}
export async function selectCareer(page,label){const button=page.getByRole('button',{name:`เลือกอาชีพ ${label}`,exact:true});if(!await button.isVisible())await page.locator('.career-codex>summary').click();await button.click();}
export async function openReading(page){await closeOverlay(page);await page.getByText('อ่านเรื่องราวและเส้นทางเพิ่มเติม',{exact:true}).click();}
export async function finishPeacefully(page){await reachAge(page,60);await openReading(page);await page.getByRole('button',{name:'เปิดเรื่องราวเส้นทางเดิม',exact:true}).click();for(const name of [/เลือกเส้นทาง 'ชาวบ้านสันโดษ/,/พัฒนาสวนเกษตรเวทมนตร์/,/ใช้ชีวิตบั้นปลายอย่างมีความสุข/])await page.getByRole('button',{name}).click();await expect(page.locator('.terminal-summary')).toBeVisible();}
