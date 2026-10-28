import {test,expect} from '@playwright/test';
import {generateBirth} from '../../src/character/rebirth.js';
import {advanceTime} from '../../src/engine/time.js';
import {takeAction,takeChoice} from '../../scripts/progression-simulation.mjs';
const saved=page=>page.evaluate(()=>JSON.parse(localStorage.getItem('reborn_save')).state);
async function start(page){await page.goto('/');await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่'}).click();await page.getByRole('button',{name:'เส้นทางชีวิต',exact:true}).click();}
test('uses annual focuses and rare five-way decisions instead of mandatory two-option vignettes',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await start(page);
 await expect(page.locator('.choice-card')).toHaveCount(0);await expect(page.locator('.year-focus')).toHaveCount(4);
 await page.getByRole('button',{name:'ถึงจุดตัดสินใจถัดไป (สูงสุด 10 ปี)',exact:true}).click();expect((await saved(page)).age).toBe(6);await expect(page.locator('.major-option')).toHaveCount(5);await expect(page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true})).toBeDisabled();
 await page.locator('.major-option').first().click();await page.getByRole('button',{name:'ใช้ชีวิตต่อ 5 ปี',exact:true}).click();expect((await saved(page)).age).toBe(10);
 await page.locator('.major-option').first().click();await page.getByRole('button',{name:'ใช้ชีวิตต่อ 5 ปี',exact:true}).click();expect((await saved(page)).age).toBe(12);await expect(page.locator('.major-option')).toHaveCount(5);
 await page.locator('.major-option').first().click();const s=await saved(page);expect(s.progression.awakening.step).toBe(7);expect(s.chronicle).toHaveLength(12);
 const result=s.progression.awakening.result;await page.reload();expect((await saved(page)).progression.awakening.result).toEqual(result);
 await expect(page.locator('.year-layout aside')).toContainText(s.birth.parents.mother);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});
test('annual work runs real jobs with recovery and keeps the ledger compact',async({page})=>{
 let s=generateBirth(8);advanceTime(s,12*360);while(s.progression.awakening.step<7)s=takeChoice(s);s=takeAction(s,{type:'chooseCareer',careerId:'farmer'});
 await page.addInitScript(state=>{if(!localStorage.getItem('reborn_save'))localStorage.setItem('reborn_save',JSON.stringify({version:4,state}));},s);await page.goto('/');
 await page.getByRole('button',{name:/^ทำงานและเก็บเงิน/}).click();await page.getByRole('button',{name:'ใช้ชีวิตต่อ 1 ปี',exact:true}).click();
 const after=await saved(page);expect(after.age).toBe(13);expect(after.gold).toBeGreaterThan(s.gold);expect(after.yearly.reports.at(-1).counts.work).toBeGreaterThan(20);expect(after.world.ledger.at(-1).transactions).toBeGreaterThan(20);await expect(page.locator('.major-option')).toHaveCount(4);
 await page.locator('.major-option').nth(3).click();await page.getByRole('button',{name:'ใช้ชีวิตต่อ 2 ปี',exact:true}).click();expect((await saved(page)).age).toBe(15);await expect(page.locator('.major-option')).toHaveCount(4);
});
test('autoplay stops at an important decision and never resumes on its own after pause or reload',async({page})=>{
 await page.clock.install();await start(page);await page.getByRole('button',{name:'8×',exact:true}).click();await page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true}).click();await page.clock.runFor(1500);expect((await saved(page)).age).toBe(1);
 await page.getByRole('button',{name:'หยุดเวลา',exact:true}).click();await page.clock.runFor(10000);expect((await saved(page)).age).toBe(1);
 await page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true}).click();await page.clock.runFor(10000);expect((await saved(page)).age).toBe(6);await expect(page.locator('.major-option')).toHaveCount(5);
 await page.reload();await page.clock.runFor(10000);expect((await saved(page)).age).toBe(6);await expect(page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true})).toBeDisabled();
});
test('changing tabs pauses automatic time and a failed annual save rolls the whole year back',async({page})=>{
 await page.clock.install();await start(page);await page.getByRole('button',{name:'8×',exact:true}).click();await page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true}).click();await page.getByRole('button',{name:'แผนที่และบริการ',exact:true}).click();await page.clock.runFor(5000);expect((await saved(page)).age).toBe(0);
 await page.getByRole('button',{name:'เส้นทางชีวิต',exact:true}).click();const before=await saved(page);await page.evaluate(()=>{Storage.prototype.setItem=()=>{throw new DOMException('full','QuotaExceededError');};});await page.getByRole('button',{name:'ใช้ชีวิตต่อ 1 ปี',exact:true}).click();await expect(page.locator('#gameNotice')).toContainText('บันทึกไม่ได้');expect(await saved(page)).toEqual(before);await expect(page.locator('#displayAge')).toHaveText('อายุ: 0 ปี');
});
