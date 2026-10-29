import {it,expect} from 'vitest';
import {createRun} from '../src/engine/run.js';
import {dispatch} from '../src/engine/actions.js';
import {storyToken} from '../src/engine/life.js';
import {pendingDecision,nextDecisionDay} from '../src/engine/decisions.js';
import {act,simulateV7} from '../scripts/v7-simulation.mjs';
import {findRoute} from '../src/world/travel.js';
import {equipmentItems,equipmentById} from '../src/data/equipment.js';
import {validEquipment,effectiveStats,effectiveCapacities,equipmentModifiers} from '../src/character/equipment-stats.js';
import {trainingQuote,jobQuote,eligibleCareers,promotionMissing} from '../src/progression/engine.js';
import {sprite} from '../src/ui/avatar/sprite.js';
import {pixelAvatar} from '../src/ui/avatar/pixel-avatar.js';
import {verifyEquipmentAssets} from '../scripts/verify-equipment-assets.mjs';
import {completedSummary} from '../src/save/archive.js';
function settle(s){while(pendingDecision(s)){const d=pendingDecision(s);s=act(s,{type:'majorChoice',decisionId:d.id,choiceId:d.choices.find(c=>!c.disabled&&c.id!=='later').id});}return s;}
function ready(s,days){s=settle(s);while(nextDecisionDay(s)-s.time.absoluteDay<days)s=settle(act(s,{type:'advanceDays',days:nextDecisionDay(s)-s.time.absoluteDay}));return s;}
function atShop(){let s=settle(simulateV7(8,{targetAge:12,ceremony:true}).state);while(s.world.currentLocationId!=='capital'){const route=findRoute(s,'capital','walk');s=act(s,{type:'journeyChoice',destination:route.path[1],method:'walk'});}return s;}
function purchase(s,id){return act(s,{type:'buyEquipment',itemId:id});}
function equip(s,id){return act(s,{type:'equipEquipment',slot:equipmentById[id].slot,itemId:id});}
function earn(s,amount){if(!s.progression.activeCareerId)s=act(ready(s,7),{type:'chooseCareer',careerId:'farmer'});while(s.gold<amount){s=ready(s,7);if(s.stamina<jobQuote(s).stamina||s.progression.fatigue>=85)s=act(s,{type:'trainingRest'});else s=act(s,{type:'careerJob'});}return s;}
it('starts with no combat gear, keeps gifts/identity unchanged and derives modifiers without writes',()=>{
 const baby=createRun(8,{id:'equipment',startedAt:'2026-10-30T00:00:00Z'}),before=structuredClone(baby);
 expect(validEquipment(baby.equipment)).toBe(true);expect(baby.equipment.owned).toEqual([]);expect(effectiveStats(baby)).toEqual(baby.stats);expect(effectiveCapacities(baby)).toEqual({maxHp:baby.maxHp,maxMana:baby.maxMana,maxStamina:baby.maxStamina});expect(sprite(baby)).not.toContain('data-equipment-id');expect(baby).toEqual(before);
});
it('charges one actual day and one payment, never equips purchases, and rejects stale/forged/duplicate/unaffordable requests atomically',()=>{
 let s=atShop(),before=structuredClone(s),token=storyToken(s);s=purchase(s,'practice_staff');
 expect(s.gold).toBe(before.gold-12);expect(s.time.absoluteDay).toBe(before.time.absoluteDay+1);expect(s.equipment.owned).toEqual(['practice_staff']);expect(s.equipment.equipped.mainHand).toBe(null);expect(s.world.ledger.at(-1)).toMatchObject({source:'equipment:buy:practice_staff',amount:-12,location:'capital'});expect(sprite(s)).not.toContain('data-equipment-id');
 const bought=structuredClone(s);
 for(const action of [{type:'buyEquipment',itemId:'practice_staff'},{type:'buyEquipment',itemId:'__proto__'},{type:'equipEquipment',slot:'mainHand',itemId:'focus_rod'},{type:'equipEquipment',slot:'body',itemId:'practice_staff'},{type:'equipEquipment',slot:'__proto__',itemId:null}]){expect(()=>act(s,action)).toThrow();expect(s).toEqual(bought);}
 expect(()=>dispatch(s,{type:'buyEquipment',itemId:'travel_coat',token})).toThrow(/เปลี่ยนไป/);expect(s).toEqual(bought);
 const poor=structuredClone(before);poor.gold=0;expect(()=>purchase(poor,'practice_staff')).toThrow(/เงินไม่พอ/);expect(poor.gold).toBe(0);expect(poor.equipment.owned).toEqual([]);
 const child=settle(simulateV7(8,{targetAge:8}).state);expect(()=>purchase(child,'practice_staff')).toThrow(/ร้าน/);
});
it('enforces age, base requirements, ownership and slots; swapping removes every previous bonus without stacking',()=>{
 let s=earn(atShop(),120);for(const id of ['practice_staff','training_sword','round_shield','focus_rod'])s=purchase(s,id);
 const before=structuredClone(s);s=equip(s,'practice_staff');expect(trainingQuote(s,'dex').equipmentBonus).toBe(1);s=equip(s,'training_sword');expect(effectiveStats(s).str).toBe(s.stats.str+2);expect(effectiveStats(s).dex).toBe(s.stats.dex);expect(trainingQuote(s,'dex').equipmentBonus).toBe(0);expect(trainingQuote(s,'str').equipmentBonus).toBe(2);
 s=equip(s,'round_shield');expect(effectiveCapacities(s).maxHp).toBe(s.maxHp+6);expect(s.stats).toEqual(before.stats);expect(s.time).toEqual(before.time);expect(s.gold).toBe(before.gold);expect(s.birth).toEqual(before.birth);expect(s.wardrobe).toEqual(before.wardrobe);expect(s.appearance).toEqual(before.appearance);expect(s.power.level).toBe(1);
 const equipped=structuredClone(s);expect(()=>equip(s,'training_sword')).toThrow(/อยู่แล้ว/);expect(s).toEqual(equipped);
 s=act(s,{type:'equipEquipment',slot:'mainHand',itemId:null});expect(trainingQuote(s,'str').equipmentBonus).toBe(0);expect(effectiveStats(s).str).toBe(s.stats.str);
 const low=structuredClone(s);low.stats.int=9;expect(()=>equip(low,'focus_rod')).toThrow(/พื้นฐาน/);
 const baby=createRun(8,{id:'age-gate',startedAt:'2026-10-30T00:00:00Z'});expect(()=>act(baby,{type:'equipEquipment',slot:'body',itemId:null})).toThrow(/8 ปี/);
 let child=settle(simulateV7(8,{targetAge:8}).state);child=act(child,{type:'journeyChoice',destination:'dawn',method:'walk'});child=act(child,{type:'journeyChoice',destination:'market',method:'walk'});expect(()=>purchase(child,'padded_vest')).toThrow(/12 ปี/);
});
it('keeps current versus maximum resources honest through rest, replacement, repeated equip and earned promotion bonuses',()=>{
 let s=earn(atShop(),120);for(const id of ['padded_vest','travel_coat','focus_rod','round_shield'])s=purchase(s,id);
 s.hp-=20;s.mana-=20;s.stamina-=20;const base={hp:s.maxHp,mana:s.maxMana,stamina:s.maxStamina},current={hp:s.hp,mana:s.mana,stamina:s.stamina};
 s=equip(s,'padded_vest');s=equip(s,'focus_rod');s=equip(s,'round_shield');expect({hp:s.hp,mana:s.mana,stamina:s.stamina}).toEqual(current);expect(effectiveCapacities(s)).toEqual({maxHp:base.hp+18,maxMana:base.mana+10,maxStamina:base.stamina});
 for(let i=0;i<4;i++)s=act(s,{type:'trainingRest'});expect(s.hp).toBe(base.hp+18);expect(s.mana).toBe(base.mana+10);
 s=equip(s,'travel_coat');expect(s.hp).toBe(base.hp+6);expect(effectiveCapacities(s).maxStamina).toBe(base.stamina+10);
 for(let i=0;i<3;i++){s=act(s,{type:'equipEquipment',slot:'body',itemId:null});const stamina=s.stamina;s=equip(s,'travel_coat');expect(s.stamina).toBe(stamina);}
 s=act(s,{type:'equipEquipment',slot:'offHand',itemId:null});s=act(s,{type:'equipEquipment',slot:'mainHand',itemId:null});expect(s.hp).toBe(base.hp);expect(s.mana).toBe(base.mana);expect(s.maxHp).toBe(base.hp);expect(s.maxMana).toBe(base.mana);expect(s.maxStamina).toBe(base.stamina);
 s=act(s,{type:'yearFocus',focus:'train',stat:'wis'});
 for(let i=0;i<50&&promotionMissing(s).length;i++){s=settle(s);if(promotionMissing(s).length)s=act(s,{type:'advanceYears',years:1});}
 s=ready(s,7);expect(promotionMissing(s)).toEqual([]);const prior=s.maxStamina;s=act(s,{type:'promoteCareer'});expect(s.progression.records.farmer.advanced).toBe(true);expect(s.maxStamina).toBe(prior+20);expect(effectiveCapacities(s).maxStamina).toBe(prior+30);expect(equipmentModifiers(s).capacities.maxStamina).toBe(10);
 s=act(s,{type:'equipEquipment',slot:'body',itemId:null});expect(s.maxStamina).toBe(prior+20);expect(effectiveCapacities(s).maxStamina).toBe(prior+20);
});
it('uses equipped training bonuses only on actual timed practice, leaving career eligibility and measured results unchanged',()=>{
 let s=purchase(atShop(),'practice_staff'),before=structuredClone(s),bare=trainingQuote(s,'str');s=equip(s,'practice_staff');const q=trainingQuote(s,'str');expect(q.xp).toBe(bare.xp+1);expect(eligibleCareers(s).map(c=>c.id)).toEqual(eligibleCareers(before).map(c=>c.id));
 const after=act(s,{type:'train',stat:'str'});expect(after.time.absoluteDay).toBe(s.time.absoluteDay+7);expect(after.progression.practice.str).toBe((s.progression.practice.str??0)+q.xp);expect(after.stats.str-s.stats.str).toBe(Math.floor(after.progression.practice.str/20)-Math.floor((s.progression.practice.str??0)/20));expect(after.progression.awakening.result).toEqual(before.progression.awakening.result);expect(after.power).toEqual(before.power);
 s=act(s,{type:'equipEquipment',slot:'mainHand',itemId:null});expect(trainingQuote(s,'str').xp).toBe(bare.xp);expect(s.progression.practice).toEqual(before.progression.practice);
});
it('reduces actual community and career work costs and the monthly work planner uses the same quote',()=>{
 let s=purchase(atShop(),'travel_coat');s=equip(s,'travel_coat');const before=structuredClone(s);s=act(s,{type:'service',serviceId:'work'});expect(s.stamina).toBe(before.stamina-8);expect(s.gold).toBe(before.gold+4);expect(s.time.absoluteDay).toBe(before.time.absoluteDay+1);
 s=act(s,{type:'chooseCareer',careerId:'farmer'});s=ready(s,7);const q=jobQuote(s),old=structuredClone(s);expect(q.stamina).toBe(13);s=act(s,{type:'careerJob'});expect(s.stamina).toBe(old.stamina-13);expect(s.gold).toBe(old.gold+q.gold);
 s=act(s,{type:'yearFocus',focus:'work'});s.stamina=13;const planned=act(s,{type:'advanceDays',days:7});expect(planned.gold-s.gold).toBe(jobQuote(s).gold);expect(planned.stamina).toBe(0);expect(planned.time.absoluteDay-s.time.absoluteDay).toBe(7);
});
it('requires unequipping before half-price returns, removes ownership and cannot create resale profit',()=>{
 const start=atShop();let s=equip(purchase(start,'practice_staff'),'practice_staff'),before=structuredClone(s);expect(()=>act(s,{type:'sellEquipment',itemId:'practice_staff'})).toThrow(/ถอด/);expect(s).toEqual(before);
 s=act(s,{type:'equipEquipment',slot:'mainHand',itemId:null});s=act(s,{type:'sellEquipment',itemId:'practice_staff'});expect(s.equipment.owned).toEqual([]);expect(s.gold).toBe(start.gold-6);expect(s.time.absoluteDay).toBe(start.time.absoluteDay+2);expect(s.world.ledger.at(-1).amount).toBe(6);expect(()=>equip(s,'practice_staff')).toThrow(/เจ้าของ/);expect(()=>act(s,{type:'sellEquipment',itemId:'practice_staff'})).toThrow();
});
it('never passes a decision during trade, but zero-day equipment choices preserve a pending decision',()=>{
 let s=purchase(atShop(),'practice_staff');s=act(s,{type:'advanceDays',days:nextDecisionDay(s)-s.time.absoluteDay});expect(pendingDecision(s)).toBeTruthy();const before=structuredClone(s);expect(()=>purchase(s,'travel_coat')).toThrow(/ตัดสินใจ/);expect(()=>act(s,{type:'sellEquipment',itemId:'practice_staff'})).toThrow(/ตัดสินใจ/);expect(s).toEqual(before);
 s=equip(s,'practice_staff');expect(s.time).toEqual(before.time);expect(pendingDecision(s).id).toBe(pendingDecision(before).id);
 let boundary=purchase(atShop(),'practice_staff');boundary=act(boundary,{type:'advanceDays',days:nextDecisionDay(boundary)-boundary.time.absoluteDay-1});boundary=purchase(boundary,'travel_coat');expect(pendingDecision(boundary)).toBeTruthy();
});
it('draws only owned equipped layers and excludes gear from parent reference portraits',()=>{
 let s=earn(atShop(),100);for(const id of ['training_sword','round_shield','padded_vest']){s=purchase(s,id);expect(sprite(s)).not.toContain(`data-equipment-id="${id}"`);s=equip(s,id);expect(sprite(s)).toContain(`data-equipment-id="${id}"`);expect(sprite(s)).toContain(equipmentById[id].path);}
 expect(pixelAvatar(s,{role:'mother',headOnly:true})).not.toContain('data-equipment-id');expect(sprite(s).indexOf('data-equipment-id="padded_vest"')).toBeLessThan(sprite(s).indexOf('data-equipment-id="training_sword"'));
 s=act(s,{type:'equipEquipment',slot:'mainHand',itemId:null});expect(sprite(s)).not.toContain('data-equipment-id="training_sword"');
 while(s.age<60){s=settle(s);s=act(s,{type:'advanceYears',years:Math.min(5,60-s.age)});}s=settle(s);s=act(s,{type:'legacyArc'});for(const choiceId of ['c_path_peasant','c_peasant_farm','c_end_peasant'])s=act(s,{type:'legacyChoice',choiceId});
 const summary=completedSummary(s,'2026-10-30T01:00:00Z');expect(summary.equipment.map(item=>item.id)).toContain('round_shield');expect(summary.equipment.map(item=>item.id)).toContain('padded_vest');expect(summary).not.toHaveProperty('world');expect(summary).not.toHaveProperty('state');expect(summary).not.toHaveProperty('seed');
 const bad=structuredClone(s.equipment);bad.equipped.mainHand='focus_rod';expect(validEquipment(bad)).toBe(false);
});
it('verifies six real transparent, unique, registered PNGs and canonical shop coverage',async()=>{
 expect(equipmentItems).toHaveLength(6);expect(await verifyEquipmentAssets()).toEqual({ownedEquipmentDesigns:6,transparentPngs:6,canonicalShops:8});
});
