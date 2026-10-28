import { test,expect } from '@playwright/test';
import { generateBirth } from '../../src/character/rebirth.js';
import { advanceTime } from '../../src/engine/time.js';
import { simulateCareer } from '../../scripts/progression-simulation.mjs';
import { getCareer } from '../../src/data/careers.js';
async function loadAtAge(page,age=12){const state=generateBirth(8);advanceTime(state,age*360);delete state.progression;await page.addInitScript(state=>{if(!localStorage.getItem('reborn_save'))localStorage.setItem('reborn_save',JSON.stringify({version:3,state}));},state);await page.goto('/');return state;}
const saved=page=>page.evaluate(()=>JSON.parse(localStorage.getItem('reborn_save')).state);
test('complete awakening, select an eligible career, work, train and retain everything on reload',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));const fixture=await loadAtAge(page);
 for(let step=0;step<7;step++){
  await expect(page.locator('#sceneContainer h2')).toBeVisible();
  const more=page.getByRole('button',{name:'อ่านต่อ',exact:true});if(await more.count())await more.click();
  await page.locator('.choice-card').first().click();
 }
 const result=(await saved(page)).progression.awakening.result;expect(result).not.toBeNull();
 await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();
 await expect(page.getByRole('heading',{name:/ผลการปลุกพลัง:/})).toBeVisible();
 await page.getByRole('button',{name:'เลือกอาชีพ ผู้ดูแลธรรมชาติ',exact:true}).click();
 const before=await saved(page);await page.getByRole('button',{name:/^ดูแลสวนและแบ่งผลผลิต/}).click();
 expect((await saved(page)).gold).toBe(before.gold+8);
 await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();expect((await saved(page)).progression.practice.wis).toBeGreaterThanOrEqual(8);
 await page.reload();await expect(page.locator('#displayCareer')).toContainText('ผู้ดูแลธรรมชาติ');
 await page.locator('.choice-card').first().click();expect((await saved(page)).progression.records.farmer.arcStep).toBe(1);
 await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();
 await page.locator('.career-codex summary').click();await page.getByRole('searchbox',{name:'ค้นหาในสารานุกรมอาชีพ'}).fill('นักเวท');await expect(page.locator('.career-codex')).toContainText('นักเวทดวงดาว');
 const state=await saved(page);expect(state.progression.awakening.result).toEqual(result);expect(state.birth).toEqual(fixture.birth);
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('reborn_save_backup_before_v4')).version)).toBe(3);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});
test('pause a ceremony, travel and return to its real venue before resuming',async({page})=>{
 await loadAtAge(page);await page.getByRole('button',{name:'อ่านต่อ',exact:true}).click();await page.locator('.choice-card').first().click();
 const original=(await saved(page)).world.currentLocationId;
 await page.getByRole('button',{name:'พักพิธีไว้ก่อน',exact:true}).click();
 await page.getByRole('button',{name:'แผนที่และบริการ',exact:true}).click();const select=page.getByRole('combobox',{name:'เลือกสถานที่ที่รู้จัก'});
 const destination=await select.locator('option').evaluateAll((options,original)=>options.map(o=>o.value).find(id=>id!==original),original);
 await select.selectOption(destination);await page.getByRole('button',{name:'เดินทางตามเส้นทางนี้',exact:true}).click();
 await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();await page.getByRole('button',{name:'กลับเข้าพิธีที่พักไว้',exact:true}).click();await expect(page.locator('#gameNotice')).toContainText('กลับไป');
 await page.getByRole('button',{name:'แผนที่และบริการ',exact:true}).click();await page.getByRole('combobox',{name:'เลือกสถานที่ที่รู้จัก'}).selectOption(original);await page.getByRole('button',{name:'เดินทางตามเส้นทางนี้',exact:true}).click();
 await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();await page.getByRole('button',{name:'กลับเข้าพิธีที่พักไว้',exact:true}).click();expect((await saved(page)).progression.awakening.paused).toBe(false);expect((await saved(page)).progression.awakening.step).toBe(1);
});
test('pre-awakening training has real fatigue limits and free recovery',async({page})=>{
 await loadAtAge(page,8);await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();
 await expect(page.getByRole('button',{name:/^เลือกอาชีพ /})).toHaveCount(0);
 for(let n=0;n<4;n++)await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();
 const before=await saved(page);await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();await expect(page.locator('#gameNotice')).toContainText('พักฟื้น');expect(await saved(page)).toEqual(before);
 await page.getByRole('button',{name:/^พักฟื้น 2 วัน/}).click();expect((await saved(page)).progression.fatigue).toBe(40);await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();expect((await saved(page)).progression.practice.wis).toBeGreaterThan(30);
});
test('earned promotion changes work rewards and capacity exactly once',async({page})=>{
 const fixture=simulateCareer(getCareer('farmer'),{stopBeforePromotion:true}).state;
 await page.addInitScript(state=>{if(!localStorage.getItem('reborn_save'))localStorage.setItem('reborn_save',JSON.stringify({version:4,state}));},fixture);await page.goto('/');await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();
 const before=await saved(page);await page.getByRole('button',{name:'รับรองขั้นชำนาญ',exact:true}).evaluate(button=>{button.click();button.click();});
 const state=await saved(page);expect(state.maxStamina).toBe(before.maxStamina+20);expect(state.progression.records.farmer.advanced).toBe(true);await expect(page.locator('#displayCareer')).toContainText('ผู้ฟื้นฟูสวนตำนาน');
 await page.reload();await expect(page.locator('#displayCareer')).toContainText('ผู้ฟื้นฟูสวนตำนาน');await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();await expect(page.getByRole('button',{name:'รับรองขั้นชำนาญ',exact:true})).toHaveCount(0);
 await page.getByRole('button',{name:/^พักฟื้น 2 วัน/}).click();const balance=(await saved(page)).gold;await page.getByRole('button',{name:/^ดูแลสวนและแบ่งผลผลิต/}).click();expect((await saved(page)).gold).toBe(balance+12);
});
