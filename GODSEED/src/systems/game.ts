import {createBattle} from './combat';
import {scenes} from '../content/story';
import {transact,type State} from '../engine/state';
import {spell,type Core,type Form,type Mod} from './spells';
import {choiceAvailability} from './story';
export function choose(s:State,id:string){return transact(s,d=>{
 if(d.battle)throw Error('กรุณาจบการต่อสู้ก่อน');
 const c=scenes[d.scene].choices.find(c=>c.id===id);if(!c||!choiceAvailability(d,c).enabled)throw Error('ยังเลือกเส้นทางนี้ไม่ได้');
 const first=!d.choices.includes(id);const day=Math.floor(d.ticks/3);const daily=!!c.daily;const reward=daily?d.gathered[id]!==day:c.onceFlag?!d.flags[c.onceFlag]:first;
 if(c.clearFlags)c.clearFlags.forEach(f=>d.flags[f]=false);
 if(c.flags)c.flags.forEach(f=>d.flags[f]=true);
 // Stable, backwards-compatible flags restore resting poses after a reload.
 d.flags.rest_under_tree=id==='CH0004'||id==='CH02T1';d.flags.rest_bench=id==='CH0210';
 if(c.items&&reward)for(const [i,n] of Object.entries(c.items))d.inventory[i]=(d.inventory[i]||0)+n;
 if(reward&&c.trust)d.trust[c.trust]=Math.min(5,(d.trust[c.trust]||0)+(c.trustAmount??(id==='CH0301'||id==='CH03B1'?2:1)));
 if(daily)d.gathered[id]=day;
 if(first)d.choices.push(id);
 d.journal.push(c.label);if(daily&&!reward)d.journal.push('เก็บวัตถุดิบที่นี่แล้ววันนี้ กลับมาใหม่ในวันถัดไปได้');d.ticks+=c.cue==='walk'||c.cue==='rest'?1:0;
 if(c.time==='evening')d.ticks=s.ticks+(2-s.ticks%3+3)%3;else if(c.time==='next-morning')d.ticks=s.ticks+3-s.ticks%3;
 if(c.cue==='rest'){d.hp=Math.min(100,d.hp+15);d.mp=Math.min(40,d.mp+10);}
 const prev=d.scene;d.scene=c.next;if(id==='CH2801')d.scene=d.recoveryScene;
 if(d.scene==='S02_HUB'&&!d.flags.intro_grant){if(!d.inventory.CORE_WIND)d.inventory.CORE_WIND=1;d.flags.intro_grant=true;}
 if(d.scene==='S03_LUMI')d.flags.lumi_met=true;
 if(d.scene==='S04_KORO')d.flags.forest_open=true;
 if(d.scene==='S05_CRAFT_TUTORIAL'&&!d.flags.starter_grant){for(const i of ['CORE_WIND','FORM_ORB','MOD_SEEK'])d.inventory[i]=Math.max(1,d.inventory[i]||0);d.flags.starter_grant=true;}
 if(!c.battle)for(const flag of scenes[d.scene].entryFlags||[])d.flags[flag]=true;
 if(c.battle){d.battle=createBattle(c.battle,prev,c.next);d.scene=prev;}
 });}
export function craft(s:State,c:Core,f:Form,m:Mod){return transact(s,d=>{
 if(d.battle)throw Error('ผสมเวทระหว่างต่อสู้ไม่ได้');const sp=spell(c,f,m);if(d.known.includes(sp.id))throw Error('ค้นพบสูตรนี้แล้ว ไม่ใช้วัตถุดิบซ้ำ');
 const parts=[`CORE_${c}`,`FORM_${f}`,`MOD_${m}`];if(parts.some(p=>!(d.inventory[p]>0)))throw Error('วัตถุดิบไม่ครบ');parts.forEach(p=>d.inventory[p]--);d.known.push(sp.id);if(d.equipped.length<4)d.equipped.push(sp.id);d.journal.push('ค้นพบ '+sp.name);
 if(!d.flags.crafted_first){d.flags.crafted_first=true;d.xp+=10;d.inventory.IT_MANA_LEAF=(d.inventory.IT_MANA_LEAF||0)+2;if(d.scene==='S05_CRAFT_TUTORIAL')d.scene='S02_HUB';}
 });}
export function equip(s:State,id:string,slot:number){return transact(s,d=>{if(d.battle||!d.known.includes(id)||slot<0||slot>3||d.equipped.includes(id))throw Error('ติดตั้งเวทนี้ไม่ได้');if(slot>d.equipped.length)throw Error('เลือกช่องว่างแรกก่อน');d.equipped[slot]=id;});}
export {fight,enemyName,intent} from './combat';

export function unequip(s:State,slot:number){return transact(s,d=>{if(d.battle||!Number.isInteger(slot)||slot<0||slot>=d.equipped.length)throw Error('ถอดเวทช่องนี้ไม่ได้');d.equipped.splice(slot,1);});}
