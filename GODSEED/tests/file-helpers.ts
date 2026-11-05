import {expect,type Page} from '@playwright/test';
import type {State} from '../src/engine/state';
export async function exportFile(page:Page){
 await expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:15_000});
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'บันทึกเกมเป็นไฟล์',exact:true}).click();const file=await download;
 expect(file.suggestedFilename()).toMatch(/^GODSEED_Save_\d{4}-\d{2}-\d{2}\.godseed$/);const stream=await file.createReadStream(),chunks:Buffer[]=[];for await(const chunk of stream!)chunks.push(Buffer.from(chunk));
 await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');await page.getByRole('button',{name:'ยืนยันว่าเก็บไฟล์แล้ว',exact:true}).click();return Buffer.concat(chunks);
}
export async function exportedState(page:Page):Promise<State>{return JSON.parse((await exportFile(page)).toString()).state;}
export async function loadFile(page:Page,buffer:Buffer,name='GODSEED_Save.godseed'){
 if(!await page.getByLabel('โหลดเกมจากไฟล์',{exact:true}).count())await page.getByRole('button',{name:'บันทึก',exact:true}).click();
 await expect(page.getByLabel('โหลดเกมจากไฟล์',{exact:true})).toBeEnabled({timeout:12_000});
 await page.getByLabel('โหลดเกมจากไฟล์',{exact:true}).setInputFiles({name,mimeType:'application/json',buffer});await expect(page.getByRole('heading',{name:'ตรวจสอบไฟล์เซฟก่อนโหลด',exact:true})).toBeVisible();await page.getByRole('button',{name:'ยืนยันโหลดไฟล์นี้',exact:true}).click();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');
}
export async function reloadFromFile(page:Page){const buffer=await exportFile(page);await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'เล่นต่อจากความทรงจำ',exact:true})).toHaveCount(0);await loadFile(page,buffer);}
