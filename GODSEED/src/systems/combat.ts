import {transact,random,type State} from '../engine/state';
import {encounters,type EncounterId} from '../content/encounters';
import {byId,itemNames,type Spell} from './spells';
type Battle=NonNullable<State['battle']>;
export const statusNames:Record<string,string>={SEAR:'เพลิงคุกรุ่น',WET:'เปียกชุ่ม',SWIRL:'ลมหมุน',GROUNDED:'ยึดโยงพื้นดิน',GLEAM:'แสงเผยเงา',VEIL:'ม่านลดความแม่นยำ',ROOTED:'รากตรึง',RESONANCE:'เสียงก้องขยายเวท',SLOWED:'เสียจังหวะ'};
export const statusHelp:Record<string,string>={SEAR:'รับผลเพลิง 3 HP หลังการกระทำในแต่ละเทิร์นที่เหลือ',WET:'เพลิงเพิ่มพลัง 20% และใช้หยดน้ำหนึ่งช่วง ลมทำให้เสียจังหวะหนึ่งครั้ง',SWIRL:'เพิ่มโอกาสติดสถานะของเวทถัดไป 15%',GROUNDED:'ลดแรงโจมตี 2 หน่วย พฤกษาที่กระทบผืนดินฟื้น MP ผู้ร่าย 3',GLEAM:'แสงสลายม่านเงา เวทเงาที่ตามมาจะไม่เพิ่มม่านซ้ำในครั้งนั้น',VEIL:'ลดความแม่นยำการโจมตีของผู้ติดสถานะ 10%',ROOTED:'รากลดการหลบ ทำให้เวททั่วไปแม่นขึ้น น้ำที่ตามมาฟื้น HP ผู้ร่าย 3',RESONANCE:'เวทโจมตีถัดไปแรงขึ้น 10% แล้วใช้เสียงก้องหมด เวทเสียงซ้ำแยกสองครั้ง',SLOWED:'เลื่อนการกระทำของศัตรูหนึ่งครั้งในจังหวะนี้'};
const statusTurns:Record<string,number>={SEAR:2,WET:2,SWIRL:1,GROUNDED:2,GLEAM:2,VEIL:1,ROOTED:1,RESONANCE:2};
export const statusSummary=(statuses:Record<string,number>)=>Object.entries(statuses).filter(([,n])=>n>0).map(([id,n])=>`${statusNames[id]||'สถานะเวท'} · ${n} เทิร์น`);
export const enemyName=(s:State)=>s.battle?encounters[s.battle.id].name:'';
export const enemyMaxHp=(s:State)=>s.battle?encounters[s.battle.id].hp:0;
export const battleRules=(s:State)=>s.battle?encounters[s.battle.id]:{canFlee:false,canSurrender:false};
export function intent(s:State){if(!s.battle)return '';return s.battle.id==='BT_TRAINING'?'ประกายฝึกหัด — โจมตี 5':s.battle.turn%2===0?'หุบใบป้องกัน — ลดความเสียหายครึ่งหนึ่ง':'ลูกศรใบไม้ — โจมตี 7';}
export function createBattle(id:EncounterId,checkpoint:string,next:string):Battle{return {id,enemyHp:encounters[id].hp,turn:1,shield:0,shieldTurns:0,status:{},playerStatus:{},log:[],checkpoint,next};}
function tick(statuses:Record<string,number>,fresh=new Set<string>()){for(const key of Object.keys(statuses)){if(!fresh.has(key))statuses[key]--;if(statuses[key]<=0)delete statuses[key];}}
function finish(d:State,b:Battle){
 const encounter=encounters[b.id],key='win:'+b.id;const first=!d.rewarded.includes(key);
 if(first){d.rewarded.push(key);d.inventory[encounter.reward]=(d.inventory[encounter.reward]||0)+1;d.xp+=encounter.xp;}
 if(b.id==='B01_FOREST_SPROUT'){d.flags.first_battle_won=true;d.flags.battle_B01_done=true;}else d.flags.training_won=true;
 d.scene=b.next;d.battle=undefined;d.journal.push((b.id==='BT_TRAINING'?'ผ่านการฝึกกับภูตจำลองแล้ว':'ต้นอ่อนสงบลงแล้ว')+(first?` · ประสบการณ์ ${encounter.xp} และ ${itemNames[encounter.reward]} 1 ชิ้น`:' · เคยรับรางวัลครั้งแรกแล้ว'));
}
function cast(d:State,b:Battle,sp:Spell,fresh:Set<string>){
 const log=(text:string)=>b.log.push(text);
 const mark=b.status.RESONANCE>0||b.playerStatus.RESONANCE>0;
 const support=sp.heal>0||sp.shield>0;
 if(sp.core==='LIGHT'){
  if(b.status.VEIL){delete b.status.VEIL;log('แสงสลายม่านของศัตรู');}
  if(support&&b.playerStatus.VEIL){delete b.playerStatus.VEIL;log('แสงสลายม่านที่รบกวนคุณ');}
 }
 const nourish=()=>{
  if(sp.core==='WATER'&&b.status.ROOTED){d.hp=Math.min(100,d.hp+3);log('น้ำหล่อเลี้ยงราก — ฟื้น HP 3');}
  if(sp.core==='BLOOM'&&(b.status.GROUNDED||b.playerStatus.GROUNDED)){d.mp=Math.min(40,d.mp+3);log('ต้นอ่อนบนผืนดิน — ฟื้น MP 3');}
 };
 if(support){
  nourish();
  if(sp.heal){const healed=Math.min(100-d.hp,sp.heal);d.hp+=healed;log(`${sp.name} ฟื้น HP ${healed}`);}
  if(sp.shield){b.shield=Math.min(60,Math.max(b.shield,sp.shield));b.shieldTurns=2;log(`สร้างโล่ ${b.shield} ป้องกัน 2 จังหวะศัตรู`);}
  if(sp.core==='EARTH')b.playerStatus.GROUNDED=2;
  if(sp.core==='ECHO')b.playerStatus.RESONANCE=2;
  return;
 }
 const shadowRevealed=sp.core==='SHADOW'&&b.status.GLEAM>0;
 if(shadowRevealed){delete b.status.VEIL;log('เสียงของแสงเปิดม่านเงา');}
 const chance=sp.mod==='SEEK'?1:Math.max(0, (b.status.ROOTED?1:.95)-(b.playerStatus.VEIL?.1:0));
 if(chance<1&&random(d)>=chance){log('เวทคลาดเป้า');return;}
 nourish();
 let multiplier=sp.core===encounters[b.id].weakness?1.2:1;
 if(sp.core==='FIRE'&&b.status.WET){multiplier*=1.2;b.status.WET--;log('เพลิงปะทะหยดน้ำ — พลังเพิ่ม 20%');}
 if(sp.core==='WIND'&&b.status.WET){b.status.SLOWED=1;log('ลมกับหยดน้ำทำให้ศัตรูเสียจังหวะ');}
 const swirling=b.status.SWIRL>0;
 if(mark){delete b.status.RESONANCE;delete b.playerStatus.RESONANCE;log('เสียงก้องขยายเวทครั้งนี้ 10%');}
 const hits=sp.hits===2||(sp.core==='ECHO'&&mark)?2:1;
 const guard=b.id==='B01_FOREST_SPROUT'&&b.turn%2===0?.5:0;
 const armor=b.status.GROUNDED?2:0;
 const power=sp.power*1.2*multiplier*(mark?1.1:1)*(sp.mod==='SEEK'?1.1:1)*(hits===2?.6:1)*(1-guard*(1-sp.pierce));
 const perHit=Math.min(999,Math.max(1,Math.round(power-armor)));
 const damage=perHit*hits;b.enemyHp=Math.max(0,b.enemyHp-damage);log(`${sp.name} กระทบ ${damage}${hits===2?' (2 ครั้ง)':''}`);
 if(!shadowRevealed&&random(d)<Math.min(.85,.35+(swirling?.15:0))){
  b.status[sp.status]=sp.mod==='LINGER'?2:statusTurns[sp.status];fresh.add(sp.status);log(`${statusNames[sp.status]} ${b.status[sp.status]} เทิร์น`);
 }
}
export function fight(state:State,action:string){return transact(state,d=>{
 const b=d.battle;if(!b)throw Error('ไม่มีการต่อสู้');
 const encounter=encounters[b.id];const fresh=new Set<string>();const burning=b.status.SEAR>0;let guarding=false;b.log=[];
 if(action==='FLEE'||action==='SURRENDER'){
  if(action==='SURRENDER'?!encounter.canSurrender:!encounter.canFlee)throw Error('ออกจากการต่อสู้ด้วยวิธีนี้ไม่ได้');
  d.scene=b.checkpoint;d.battle=undefined;d.ticks++;d.journal.push(action==='FLEE'?'ถอยออกมาเตรียมตัว':'ยุติการฝึกอย่างปลอดภัย');return;
 }
 if(action==='BASIC_PULSE'){const base=b.id==='B01_FOREST_SPROUT'&&b.turn%2===0?2:4;const damage=Math.max(1,base-(b.status.GROUNDED?2:0));b.enemyHp=Math.max(0,b.enemyHp-damage);b.log.push(`ประกายพื้นฐานกระทบ ${damage}`);}
 else if(action==='GUARD'){guarding=true;d.mp=Math.min(40,d.mp+6);b.log.push('ตั้งรับ ลดแรงโจมตี 40% และฟื้น MP 6');}
 else if(action==='IT_POTION_DEW'||action==='IT_MANA_LEAF'){
  if(!d.inventory[action])throw Error('ไอเทมหมดแล้ว');d.inventory[action]--;
  if(action==='IT_POTION_DEW'){d.hp=Math.min(100,d.hp+25);b.log.push('ดื่มน้ำค้าง ฟื้น HP สูงสุด 25');}else{d.mp=Math.min(40,d.mp+15);b.log.push('ใบฟื้นเวท ฟื้น MP สูงสุด 15');}
 }else{
  const sp=byId[action];if(!sp||!d.equipped.includes(action)||d.mp<sp.mp)throw Error('ใช้เวทนี้ไม่ได้');
  d.mp-=sp.mp;cast(d,b,sp,fresh);
 }
 if(burning&&b.enemyHp>0){b.enemyHp=Math.max(0,b.enemyHp-3);b.log.push('เพลิงคุกรุ่นกระทบ 3');}
 if(b.enemyHp===0){d.journal.push(...b.log);finish(d,b);return;}
 const attack=b.id==='BT_TRAINING'||b.turn%2===1;
 if(b.status.SLOWED){b.log.push('ศัตรูเสียจังหวะ จึงเลื่อนการกระทำครั้งนี้');delete b.status.SLOWED;}
 else if(attack){
  if(b.status.VEIL&&random(d)>=.9)b.log.push('ม่านเงาทำให้ศัตรูโจมตีพลาด');
  else {let incoming:number=encounter.power;if(guarding)incoming=Math.ceil(incoming*.6);if(b.playerStatus.GROUNDED)incoming=Math.max(0,incoming-2);
   const absorbed=Math.min(b.shield,incoming);b.shield-=absorbed;incoming-=absorbed;d.hp-=incoming;b.log.push(`${encounter.name} โจมตี ${incoming}${absorbed?` · โล่รับ ${absorbed}`:''}`);
  }
 }else b.log.push('ต้นอ่อนหุบใบป้องกัน');
 fresh.delete('VEIL');tick(b.status,fresh);tick(b.playerStatus);
 if(b.shieldTurns>0&&--b.shieldTurns===0){b.shield=0;b.log.push('โล่เวทหมดเวลา');}
 b.turn++;b.log=b.log.slice(-12);d.journal.push(...b.log);
 if(d.hp<=0){d.hp=70;d.mp=20;d.recoveryScene=b.checkpoint;d.scene='S28_RECOVER';d.battle=undefined;d.journal.push('พิพพากลับมาพักอย่างปลอดภัย');}
 });}
