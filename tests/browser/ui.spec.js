import {test,expect} from '@playwright/test';
import {locations} from '../../src/world/locations.js';
import {start,snapshot,reachAge,openOverlay,closeOverlay,oneMonth} from './helpers.js';
test('native panels trap keyboard focus, restore the opener and never cover live controls after closing',async({page})=>{
 await start(page);const before=await snapshot(page);await openOverlay(page,'แผนที่และบริการ');await expect(page.getByRole('button',{name:'ปิดหน้าต่าง',exact:true})).toBeFocused();await page.keyboard.press('Shift+Tab');expect(await page.evaluate(()=>document.getElementById('modalOverlay').contains(document.activeElement))).toBe(true);
 await page.keyboard.press('Tab');expect(await page.evaluate(()=>document.getElementById('modalOverlay').contains(document.activeElement))).toBe(true);await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'แผนที่และบริการ',exact:true})).toBeFocused();expect(await snapshot(page)).toEqual(before);
 await oneMonth(page);expect((await snapshot(page)).time.absoluteDay).toBe(30);await reachAge(page,3);await openOverlay(page,'เปลี่ยนแผน');await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'เปลี่ยนแผน',exact:true})).toBeFocused();
});
test('training validation reports inside its modal and successful recovery preserves the same run',async({page})=>{
 await start(page);await reachAge(page,8);await openOverlay(page,'อาชีพและการฝึก');for(let n=0;n<4;n++)await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();const tired=await snapshot(page);await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();expect(await snapshot(page)).toEqual(tired);await expect(page.locator('#panelNotice')).not.toBeEmpty();
 await page.getByRole('button',{name:/^พักฟื้น 2 วัน/}).click();expect((await snapshot(page)).progression.fatigue).toBeLessThan(tired.progression.fatigue);expect((await snapshot(page)).run.id).toBe(tired.run.id);
});
test('a real local shop, bag and food use share one wallet and reject a stale duplicate purchase',async({page})=>{
 await start(page);await reachAge(page,12);
 // Walk the existing graph to a real food service; no clock/state injection.
 for(let steps=0;!locations[(await snapshot(page)).world.currentLocationId].services.includes('food');steps++){
  if(steps>10)throw Error('No reachable food shop');const current=(await snapshot(page)).world.currentLocationId,queue=[[current]],seen=new Set([current]);let route;
  while(queue.length){const path=queue.shift(),id=path.at(-1);if(locations[id].services.includes('food')){route=path;break;}for(const next of locations[id].neighbors)if(!seen.has(next)){seen.add(next);queue.push([...path,next]);}}
  await openOverlay(page,'วางแผนเดินทาง');await page.getByRole('combobox',{name:'จุดหมายการเดินทาง'}).selectOption(route[1]);await page.getByRole('button',{name:/^เดินเท้ากับผู้ร่วมทาง/}).click();await closeOverlay(page);
 }
 await openOverlay(page,'ร้านค้าและเสบียง');const before=await snapshot(page);await page.getByRole('button',{name:/^ซื้อขนมปัง/}).evaluate(b=>{b.click();b.click();});const bought=await snapshot(page);expect(bought.gold).toBe(before.gold-2);expect(bought.world.inventory.bread).toBe(1);expect(bought.time.absoluteDay).toBe(before.time.absoluteDay+1);
 await openOverlay(page,'กระเป๋า');await expect(page.getByRole('dialog')).toContainText('ขนมปัง 1/20');await page.getByRole('button',{name:/^กินขนมปัง/}).click();expect((await snapshot(page)).world.inventory.bread).toBeUndefined();expect((await snapshot(page)).run.id).toBe(before.run.id);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
test('hidden page stops autoplay and reduced effects setting writes no persistent preferences',async({page})=>{
 await page.clock.install();await start(page);await oneMonth(page);await page.getByRole('combobox',{name:'ความเร็วเวลา'}).selectOption('8');await page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true}).click();await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});await page.clock.runFor(10000);expect((await snapshot(page)).age).toBe(0);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'));});await openOverlay(page,'ตัวเลือก');await page.getByRole('checkbox',{name:'ลดการเคลื่อนไหว'}).check();expect(await page.evaluate(()=>document.documentElement.classList.contains('reduce-effects'))).toBe(true);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
