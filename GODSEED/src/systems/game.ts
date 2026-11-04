import {scenes} from '../content/story';
import {transact,random,type State} from '../engine/state';
import {byId,spell,type Core,type Form,type Mod} from './spells';
export function choose(s:State,id:string){return transact(s,d=>{
 if(d.battle)throw Error('กรุณาจบการต่อสู้ก่อน');
 const c=scenes[d.scene].choices.find(c=>c.id===id);if(!c||c.requires&&!d.flags[c.requires])throw Error('ยังเลือกเส้นทางนี้ไม่ได้');
 const first=!d.choices.includes(id);const day=Math.floor(d.ticks/3);const daily=['CH0601','CH0603','CH0802'].includes(id);const reward=daily?d.gathered[id]!==day:first;
 if(c.flags)c.flags.forEach(f=>d.flags[f]=true);
 if(c.items&&reward)for(const [i,n] of Object.entries(c.items))d.inventory[i]=(d.inventory[i]||0)+n;
 if(reward&&c.trust)d.trust[c.trust]=Math.min(5,(d.trust[c.trust]||0)+(id==='CH0301'||id==='CH03B1'?2:1));
 if(daily)d.gathered[id]=day;
 if(first)d.choices.push(id);
 d.journal.push(c.label);d.ticks+=c.cue==='walk'||c.cue==='rest'?1:0;
 if(c.cue==='rest'){d.hp=Math.min(100,d.hp+15);d.mp=Math.min(40,d.mp+10);}
 const prev=d.scene;d.scene=c.next;
 if(d.scene==='S02_HUB'&&!d.flags.intro_grant){if(!d.inventory.CORE_WIND)d.inventory.CORE_WIND=1;d.flags.intro_grant=true;}
 if(d.scene==='S03_LUMI')d.flags.lumi_met=true;
 if(d.scene==='S04_KORO')d.flags.forest_open=true;
 if(d.scene==='S05_CRAFT_TUTORIAL'&&!d.flags.starter_grant){for(const i of ['CORE_WIND','FORM_ORB','MOD_SEEK'])d.inventory[i]=Math.max(1,d.inventory[i]||0);d.flags.starter_grant=true;}
 if(c.battle){d.battle={id:c.battle,enemyHp:c.battle==='BT_TRAINING'?35:42,turn:1,shield:0,status:{},checkpoint:prev,next:c.next};d.scene=prev;}
 });}
export function craft(s:State,c:Core,f:Form,m:Mod){return transact(s,d=>{
 if(d.battle)throw Error('ผสมเวทระหว่างต่อสู้ไม่ได้');const sp=spell(c,f,m);if(d.known.includes(sp.id))throw Error('ค้นพบสูตรนี้แล้ว ไม่ใช้วัตถุดิบซ้ำ');
 const parts=[`CORE_${c}`,`FORM_${f}`,`MOD_${m}`];if(parts.some(p=>!(d.inventory[p]>0)))throw Error('วัตถุดิบไม่ครบ');parts.forEach(p=>d.inventory[p]--);d.known.push(sp.id);if(d.equipped.length<4)d.equipped.push(sp.id);d.journal.push('ค้นพบ '+sp.name);
 if(!d.flags.crafted_first){d.flags.crafted_first=true;d.inventory.IT_MANA_LEAF=(d.inventory.IT_MANA_LEAF||0)+2;if(d.scene==='S05_CRAFT_TUTORIAL')d.scene='S02_HUB';}
 });}
export function equip(s:State,id:string,slot:number){return transact(s,d=>{if(d.battle||!d.known.includes(id)||slot<0||slot>3||d.equipped.includes(id))throw Error('ติดตั้งเวทนี้ไม่ได้');if(slot>d.equipped.length)throw Error('เลือกช่องว่างแรกก่อน');d.equipped[slot]=id;});}
export const enemyName=(s:State)=>s.battle?.id==='BT_TRAINING'?'ภูตฝึกเวทจำลอง':'ต้นอ่อนหลงทาง';
export function intent(s:State){return s.battle?.turn&&s.battle.turn%2===0?'หุบใบป้องกัน — ลดความเสียหายครึ่งหนึ่ง':'ลูกศรใบไม้ — โจมตี 7';}
export function fight(s:State,action:string){return transact(s,d=>{
 const b=d.battle;if(!b)throw Error('ไม่มีการต่อสู้');let damage=0,guard=false;const name=enemyName(d);
 if(action==='FLEE'||action==='SURRENDER'){if(action==='SURRENDER'&&b.id!=='BT_TRAINING')throw Error('ยอมแพ้ไม่ได้');d.scene=b.checkpoint;d.battle=undefined;d.ticks++;d.journal.push('ถอยออกมาเตรียมตัว');return;}
 if(action==='BASIC_PULSE')damage=4;
 else if(action==='GUARD'){guard=true;d.mp=Math.min(40,d.mp+6);}
 else if(action==='IT_POTION_DEW'||action==='IT_MANA_LEAF'){if(!d.inventory[action])throw Error('ไอเทมหมดแล้ว');d.inventory[action]--;if(action==='IT_POTION_DEW')d.hp=Math.min(100,d.hp+25);else d.mp=Math.min(40,d.mp+15);}
 else {const sp=byId[action];if(!sp||!d.equipped.includes(action)||d.mp<sp.mp)throw Error('ใช้เวทนี้ไม่ได้');d.mp-=sp.mp;
  if(sp.heal)d.hp=Math.min(100,d.hp+sp.heal);else if(sp.shield)b.shield=Math.min(60,b.shield+sp.shield);else{
   let mult=sp.core==='FIRE'?1.2:1;if(sp.core==='FIRE'&&b.status.WET){mult*=1.2;b.status.WET--;}
   const shield=b.turn%2===0?.5:0;damage=Math.max(1,Math.round(sp.power*1.2*mult*(1-shield*(1-sp.pierce))*(sp.mod==='SEEK'?1.1:1)*(b.status.RESONANCE?1.1:1)*(sp.hits===2?.6:1)))*sp.hits;
   if(random(d)<.35)b.status[sp.status]=sp.duration||2;
  }
 }
 if(b.status.SEAR)damage+=3;b.enemyHp=Math.max(0,b.enemyHp-damage);d.journal.push(damage?`พลังเวทกระทบ ${name} ${damage}`:guard?'ตั้งรับและฟื้น MP 6':'ฟื้นพลัง');
 if(b.enemyHp<=0){const key='win:'+b.id;if(!d.rewarded.includes(key)){d.rewarded.push(key);d.inventory.CORE_BLOOM=(d.inventory.CORE_BLOOM||0)+1;}d.flags.first_battle_won=true;d.flags.battle_B01_done=true;d.scene=b.next;d.battle=undefined;d.journal.push('ต้นอ่อนสงบลงแล้ว');return;}
 let incoming=b.turn%2===0?0:7;if(guard)incoming=Math.ceil(incoming*.6);const absorbed=Math.min(b.shield,incoming);b.shield-=absorbed;incoming-=absorbed;d.hp-=incoming;
 for(const status of Object.keys(b.status))if(--b.status[status]<=0)delete b.status[status];b.turn++;
 if(d.hp<=0){d.hp=70;d.mp=20;d.scene='S28_RECOVER';d.battle=undefined;d.journal.push('พิพพากลับมาพักอย่างปลอดภัย');}
 });}
