import {transact,random,type State} from '../engine/state';
import {encounters,type EncounterId} from '../content/encounters';
import {scenes} from '../content/story';
import {byId,itemNames,cores,coreNames,type Spell,type Core} from './spells';
import {hasPathAbility} from './life-paths';
type Battle=NonNullable<State['battle']>;
export const statusNames:Record<string,string>={GUARDIAN_SEAL:'ผนึกความทรงจำ',TRAIL_FOCUS:'เพ่งจังหวะ',RUNE_WARD:'เกราะรูน',SEAR:'เพลิงคุกรุ่น',WET:'เปียกชุ่ม',SWIRL:'ลมหมุน',GROUNDED:'ยึดโยงพื้นดิน',GLEAM:'แสงเผยเงา',VEIL:'ม่านลดความแม่นยำ',ROOTED:'รากตรึง',RESONANCE:'เสียงก้องขยายเวท',SLOWED:'เสียจังหวะ'};
export const statusHelp:Record<string,string>={GUARDIAN_SEAL:'ลดความเสียหาย 50% สองจังหวะ เวททะลวงลดเกราะได้ พฤกษาหรือเสียงสะท้อนที่อ่านจารึกแล้วลดเกราะเหลือ 25%',TRAIL_FOCUS:'เวทโจมตีที่ติดตั้งครั้งถัดไปแม่นยำแน่นอนและผ่านท่าหุบใบหรือเกราะรูน แต่เกราะพื้นดินยังลดแรงโจมตี 2 หน่วย ใช้ได้ใน 2 เทิร์นถัดไป เวทสนับสนุนไม่ใช้ผลแต่เวลายังลดลง',RUNE_WARD:'ลดความเสียหาย 50% เป็นเวลา 2 จังหวะผู้เล่น เวททะลวงลดผลเกราะได้ หุ่นจะหยุดโจมตีในจังหวะกางเกราะ',SEAR:'รับผลเพลิง 3 HP หลังการกระทำในแต่ละเทิร์นที่เหลือ',WET:'เพลิงเพิ่มพลัง 20% และใช้หยดน้ำหนึ่งช่วง ลมทำให้เสียจังหวะหนึ่งครั้ง',SWIRL:'เพิ่มโอกาสติดสถานะของเวทถัดไป 15%',GROUNDED:'ลดแรงโจมตี 2 หน่วย พฤกษาที่กระทบผืนดินฟื้น MP ผู้ร่าย 3',GLEAM:'แสงสลายม่านเงา เวทเงาที่ตามมาจะไม่เพิ่มม่านซ้ำในครั้งนั้น',VEIL:'ลดความแม่นยำการโจมตีของผู้ติดสถานะ 10%',ROOTED:'รากลดการหลบ ทำให้เวททั่วไปแม่นขึ้น น้ำที่ตามมาฟื้น HP ผู้ร่าย 3',RESONANCE:'เวทโจมตีถัดไปแรงขึ้น 10% แล้วใช้เสียงก้องหมด เวทเสียงซ้ำแยกสองครั้ง',SLOWED:'เลื่อนการกระทำของศัตรูหนึ่งครั้งในจังหวะนี้'};
const statusTurns:Record<string,number>={SEAR:2,WET:2,SWIRL:1,GROUNDED:2,GLEAM:2,VEIL:1,ROOTED:1,RESONANCE:2};
export const statusSummary=(statuses:Record<string,number>)=>Object.entries(statuses).filter(([,n])=>n>0).map(([id,n])=>`${statusNames[id]||'สถานะเวท'} · ${n} เทิร์น`);
export const enemyName=(s:State)=>s.battle?encounters[s.battle.id].name:'';
export const enemyMaxHp=(s:State)=>s.battle?encounters[s.battle.id].hp:0;
export const guardianPhase=(b:Battle)=>b.enemyHp>100?1:b.enemyHp>50?2:3;
export const guardianWeakness=(b:Battle):Core=>guardianPhase(b)===1?'LIGHT':guardianPhase(b)===2?'ECHO':'BLOOM';
export const battleRules=(s:State)=>{
 if(!s.battle)return {canFlee:false,canSurrender:false};
 const rules=encounters[s.battle.id];
 if(s.battle.id==='B05_MEMORY_GUARDIAN')return {...rules,weakness:guardianWeakness(s.battle),fleeHint:'บททดสอบนี้หนีหรือยอมแพ้ไม่ได้ แพ้แล้วกลับมาลองใหม่ได้พร้อมของใช้ก่อนเริ่ม'};
 return s.battle.id==='B04_ECHO_KNOT'?{...rules,canFlee:(s.trust.EIRA||0)>=2&&!!s.battle.echo?.exitOpened,fleeHint:'ถอยได้เมื่อไอราไว้วางใจอย่างน้อย 2 และเวทวายุโจมตีถูกเป้าเพื่อเปิดช่องลมแล้ว'}:rules;
};
export const echoIntentCore=(s:State):Core|undefined=>s.battle?.id==='B04_ECHO_KNOT'?s.battle.echo?.core:undefined;
export function scoutAvailability(s:State){
 const reason=!s.battle?'ใช้ได้ระหว่างการต่อสู้':!hasPathAbility(s,'TRAIL_FOCUS')?'ต้องผ่านบททดสอบนักสำรวจระดับ 2':s.battle.pathActions?.scouted?'สำรวจจังหวะไปแล้วในการต่อสู้นี้':s.mp<4?'MP ไม่พอ · ต้องใช้ 4 MP':'';
 return {enabled:!reason,reason};
}
function plannedIntent(b:Battle):'pulse'|'leaf'|'curl'|'splash'|'mist'|'rune'|'ward'|'listen'|'echo'|'seal'|'memory'|'clue'|'gather'|'seeds'|'sweep'{
 if(b.id==='B06_ROOT_WEAVER')return b.turn%3===1?'gather':b.turn%3===2?'seeds':'sweep';
 if(b.id==='B05_MEMORY_GUARDIAN'){const phase=guardianPhase(b);return phase===3?(b.turn%2===0?'memory':'pulse'):b.turn%3===1?'seal':phase===1&&b.turn%3===0?'clue':'pulse';}
 if(b.id==='B04_ECHO_KNOT')return b.echo?.core?'echo':b.turn===1?'listen':'pulse';
 if(b.id==='B03_RUIN_SENTINEL')return b.turn%3===0?'ward':'rune';
 if(b.id==='BT_TRAINING')return 'pulse';
 if(b.id==='B02_STREAM_WISP')return b.enemyHp<=26&&b.turn%2===0?'mist':'splash';
 return b.turn%2===0?'curl':'leaf';
}
export function intent(s:State){if(!s.battle)return '';if(s.battle.id==='B06_ROOT_WEAVER')return ({gather:'รวบราก — ไม่โจมตี เป็นจังหวะเตรียมโล่หรือฟื้น MP',seeds:'ปล่อยเมล็ด — โจมตี 9',sweep:'กวาดเถา — โจมตี 18; ตั้งรับหรือใช้เวทน้ำโจมตีถูกเป้าให้เหลือ 9'} as Record<string,string>)[plannedIntent(s.battle)];if(s.battle.id==='B05_MEMORY_GUARDIAN'){const plan=plannedIntent(s.battle),phase=guardianPhase(s.battle);return `ระยะ ${phase}/3 · `+({seal:'เตรียมกางผนึก — ไม่โจมตี ลดความเสียหาย 50% สองจังหวะ',memory:'เศษความทรงจำ — โจมตี 20 เตรียมตั้งรับ',clue:'หยุดฟัง — ไม่โจมตี เป็นจังหวะฟื้นพลัง',pulse:'คลื่นผนึก — โจมตี 12'}[plan as 'seal'|'memory'|'clue'|'pulse'])+(s.flags.guardian_gentle_test?' · ผ่อนแรง 25%':'');}if(s.battle.id==='B04_ECHO_KNOT'){const core=echoIntentCore(s);return core?`ทวนธาตุ${coreNames[cores.indexOf(core)]} — โจมตี 11; หากใช้เวทโจมตีธาตุเดิมซ้ำ จะแรงเป็น 16 ลองสลับธาตุหรือตั้งรับ`:s.battle.turn===1?'ฟังหนึ่งจังหวะแรก — ไม่โจมตี เทิร์นถัดไปคลื่นเสียง 11 แม้ยังไม่รู้ธาตุ':'คลื่นเสียง — โจมตี 11; ประกายพื้นฐานและเวทสนับสนุนไม่สอนธาตุ';}return ({gather:'รวบราก',seeds:'ปล่อยเมล็ด',sweep:'กวาดเถา',seal:'กางผนึก',memory:'เศษความทรงจำ',clue:'หยุดฟัง',echo:'ทวนเสียงธาตุ',listen:'ฟังธาตุ',rune:'ลูกศรรูน — โจมตี 10',ward:'เตรียมกางเกราะรูน — ไม่โจมตี ลดความเสียหาย 50% ใน 2 จังหวะถัดไป',pulse:'ประกายฝึกหัด — โจมตี 5',leaf:'ลูกศรใบไม้ — โจมตี 7',curl:'หุบใบป้องกัน — ลดความเสียหายครึ่งหนึ่ง',splash:'ละอองน้ำ — โจมตี 8',mist:'ม่านหมอก — ลดความแม่นยำคุณ 10% ในเทิร์นถัดไป ไม่มีการโจมตี'})[plannedIntent(s.battle)];}
export function createBattle(id:EncounterId,checkpoint:string,next:string):Battle{return {id,enemyHp:encounters[id].hp,turn:1,shield:0,shieldTurns:0,status:{},playerStatus:{},log:[],checkpoint,next};}
function tick(statuses:Record<string,number>,fresh=new Set<string>()){for(const key of Object.keys(statuses)){if(!fresh.has(key))statuses[key]--;if(statuses[key]<=0)delete statuses[key];}}
function finish(d:State,b:Battle){
 const encounter=encounters[b.id],key='win:'+b.id;const first=!d.rewarded.includes(key);
 if(first){d.rewarded.push(key);d.inventory[encounter.reward]=(d.inventory[encounter.reward]||0)+1;d.xp+=encounter.xp;}
 if(b.id==='B01_FOREST_SPROUT'){d.flags.first_battle_won=true;d.flags.battle_B01_done=true;}else if(b.id==='BT_TRAINING')d.flags.training_won=true;else if(b.id==='B02_STREAM_WISP')d.flags.battle_B02_done=true;else if(b.id==='B04_ECHO_KNOT'){d.flags.battle_B04_done=true;d.flags.echo_knot_cleared=true;}else if(b.id==='B05_MEMORY_GUARDIAN'){d.flags.battle_B05_done=true;d.flags.guardian_trial_complete=true;}else if(b.id==='B06_ROOT_WEAVER')d.flags.battle_B06_done=true;else d.flags.battle_B03_done=true;
 d.scene=b.next;for(const flag of scenes[d.scene].entryFlags||[])d.flags[flag]=true;d.battle=undefined;d.journal.push((b.id==='BT_TRAINING'?'ผ่านการฝึกกับภูตจำลองแล้ว':b.id==='B02_STREAM_WISP'?'ละอองธาราสงบลงแล้ว':b.id==='B05_MEMORY_GUARDIAN'?'ผู้พิทักษ์ยอมเปิดบทสนทนาแล้ว':b.id==='B04_ECHO_KNOT'?'ปมเสียงย้อนยอมเว้นช่องให้เสียงอื่นแล้ว':b.id==='B06_ROOT_WEAVER'?'ผู้ถักรากลดเถาและเปิดทางแล้ว':b.id==='B03_RUIN_SENTINEL'?'หุ่นรูนลดเกราะและเปิดทางแล้ว':'ต้นอ่อนสงบลงแล้ว')+(first?` · ประสบการณ์ ${encounter.xp} และ ${itemNames[encounter.reward]} 1 ชิ้น`:' · เคยรับรางวัลครั้งแรกแล้ว'));
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
 const focused=!!b.playerStatus.TRAIL_FOCUS;
 if(focused){delete b.playerStatus.TRAIL_FOCUS;log('เพ่งจังหวะ — เวทแม่นยำและผ่านท่าป้องกัน');}
 const chance=focused||sp.mod==='SEEK'?1:Math.max(0, (b.status.ROOTED?1:.95)-(b.playerStatus.VEIL?.1:0));
 if(chance<1&&random(d)>=chance){log('เวทคลาดเป้า');return;}
 nourish();
 let multiplier=sp.core===(b.id==='B05_MEMORY_GUARDIAN'?guardianWeakness(b):encounters[b.id].weakness)?1.2:1;
 if(sp.core==='FIRE'&&b.status.WET){multiplier*=1.2;b.status.WET--;log('เพลิงปะทะหยดน้ำ — พลังเพิ่ม 20%');}
 if(sp.core==='WIND'&&b.status.WET){b.status.SLOWED=1;log('ลมกับหยดน้ำทำให้ศัตรูเสียจังหวะ');}
 const swirling=b.status.SWIRL>0;
 if(mark){delete b.status.RESONANCE;delete b.playerStatus.RESONANCE;log('เสียงก้องขยายเวทครั้งนี้ 10%');}
 const hits=sp.hits===2||(sp.core==='ECHO'&&mark)?2:1;
 const sealWeak=b.status.GUARDIAN_SEAL&&d.flags.guardian_pattern_understood&&(sp.core==='BLOOM'||sp.core==='ECHO');
 if(sealWeak)log('อ่านช่องว่างของผนึก — พฤกษาหรือเสียงสะท้อนลดเกราะเหลือ 25%');
 const guard=b.status.GUARDIAN_SEAL?(sealWeak?.25:.5):b.status.RUNE_WARD||b.id==='B01_FOREST_SPROUT'&&b.turn%2===0?.5:0;
 const armor=b.status.GROUNDED?2:0;
 const power=sp.power*1.2*multiplier*(mark?1.1:1)*(sp.mod==='SEEK'?1.1:1)*(hits===2?.6:1)*(1-guard*(1-(focused?1:sp.pierce)));
 const perHit=Math.min(999,Math.max(1,Math.round(power-armor)));
 const damage=perHit*hits;b.enemyHp=Math.max(0,b.enemyHp-damage);log(`${sp.name} กระทบ ${damage}${hits===2?' (2 ครั้ง)':''}`);
 if(!shadowRevealed&&random(d)<Math.min(.85,.35+(swirling?.15:0))){
  b.status[sp.status]=sp.mod==='LINGER'?2:statusTurns[sp.status];fresh.add(sp.status);log(`${statusNames[sp.status]} ${b.status[sp.status]} เทิร์น`);
 }
}
export function fight(state:State,action:string){return transact(state,d=>{
 const b=d.battle;if(!b)throw Error('ไม่มีการต่อสู้');
 const encounter=encounters[b.id],plan=plannedIntent(b);const fresh=new Set<string>(),playerFresh=new Set<string>();const burning=b.status.SEAR>0;const echoedCore=b.echo?.core;let repeatedCore=false,guarding=false,waterInterrupted=false;b.log=[];
 if(action==='FLEE'||action==='SURRENDER'){
  if(action==='SURRENDER'?!encounter.canSurrender:!battleRules(d).canFlee)throw Error('ออกจากการต่อสู้ด้วยวิธีนี้ไม่ได้');
  d.scene=b.checkpoint;d.battle=undefined;d.ticks++;d.journal.push(action==='FLEE'?'ถอยออกมาเตรียมตัว':'ยุติการฝึกอย่างปลอดภัย');return;
 }
 if(action==='SCOUT'){
  const availability=scoutAvailability(d);if(!availability.enabled)throw Error(availability.reason);
  d.mp-=4;b.pathActions={...b.pathActions,scouted:true};b.playerStatus.TRAIL_FOCUS=2;playerFresh.add('TRAIL_FOCUS');b.log.push('สำรวจจังหวะ — ใช้ MP 4 เตรียมเวทโจมตีที่ติดตั้งครั้งถัดไป');
 }
 else if(action==='BASIC_PULSE'){const base=b.status.GUARDIAN_SEAL||b.status.RUNE_WARD||b.id==='B01_FOREST_SPROUT'&&b.turn%2===0?2:4;const damage=Math.max(1,base-(b.status.GROUNDED?2:0));b.enemyHp=Math.max(0,b.enemyHp-damage);b.log.push(`ประกายพื้นฐานกระทบ ${damage}`);}
 else if(action==='GUARD'){
  guarding=true;d.mp=Math.min(40,d.mp+6);b.log.push('ตั้งรับ ลดแรงโจมตี 40% และฟื้น MP 6');
  if(hasPathAbility(d,'ROOT_REFUGE')&&!b.pathActions?.rootGuardUsed){
   b.pathActions={...b.pathActions,rootGuardUsed:true};
   if(b.shield<=8){b.shield=8;b.shieldTurns=2;b.log.push('รากคุ้มภัย — โล่ 8 ป้องกัน 2 จังหวะศัตรู ใช้ได้ครั้งเดียวในการต่อสู้');}
   else b.log.push('รากคุ้มภัย — คงโล่เดิมที่แข็งแรงกว่า ไม่ต่อเวลา ใช้สิทธิ์ครั้งแรกแล้ว');
  }
 }
 else if(action==='IT_POTION_DEW'||action==='IT_MANA_LEAF'){
  if(!d.inventory[action])throw Error('ไอเทมหมดแล้ว');d.inventory[action]--;
  if(action==='IT_POTION_DEW'){d.hp=Math.min(100,d.hp+25);b.log.push('ดื่มน้ำค้าง ฟื้น HP สูงสุด 25');}else{d.mp=Math.min(40,d.mp+15);b.log.push('ใบฟื้นเวท ฟื้น MP สูงสุด 15');}
 }else{
  const sp=byId[action];if(!sp||!d.equipped.includes(action)||d.mp<sp.mp)throw Error('ใช้เวทนี้ไม่ได้');
  d.mp-=sp.mp;const hpBefore=b.enemyHp;cast(d,b,sp,fresh);waterInterrupted=b.id==='B06_ROOT_WEAVER'&&plan==='sweep'&&sp.core==='WATER'&&!sp.heal&&!sp.shield&&b.enemyHp<hpBefore;
  if(waterInterrupted)b.log.push('เวทน้ำคลายแนวเถา — กวาดเถาเหลือแรงโจมตี 9');
  if(b.id==='B04_ECHO_KNOT'&&!sp.heal&&!sp.shield){
   repeatedCore=sp.core===echoedCore;b.echo={...b.echo,core:sp.core};
   if(sp.core==='WIND'&&b.enemyHp<hpBefore){b.echo.exitOpened=true;b.log.push('วายุเปิดช่องลมแล้ว — ถ้าไอราไว้วางใจ 2 ขึ้นไป สามารถถอยได้');}
  }
 }
 if(burning&&b.enemyHp>0){b.enemyHp=Math.max(0,b.enemyHp-3);b.log.push('เพลิงคุกรุ่นกระทบ 3');}
 if(b.enemyHp===0){d.journal.push(...b.log);finish(d,b);return;}
 const attack=plan!=='curl'&&plan!=='mist'&&plan!=='ward'&&plan!=='listen'&&plan!=='seal'&&plan!=='clue'&&plan!=='gather';let misted=false;
 if(b.status.SLOWED){b.log.push('ศัตรูเสียจังหวะ จึงเลื่อนการกระทำครั้งนี้');delete b.status.SLOWED;}
 else if(attack){
  if(b.status.VEIL&&random(d)>=.9)b.log.push('ม่านเงาทำให้ศัตรูโจมตีพลาด');
  else {let incoming:number=(plan==='memory'?20:plan==='sweep'?(waterInterrupted?9:18):encounter.power)+(plan==='echo'&&repeatedCore?5:0);
   if(b.id==='B05_MEMORY_GUARDIAN'&&d.flags.guardian_gentle_test)incoming=Math.ceil(incoming*.75);
   if(b.id==='B05_MEMORY_GUARDIAN'&&guardianPhase(b)===3&&!b.guardian?.assistUsed&&(d.flags.lumi_helped||d.flags.garden_tended||d.flags.maren_listened)){b.guardian={...b.guardian,assistUsed:true};incoming=Math.max(0,incoming-12);b.log.push('เสียงของเพื่อนช่วยคุ้มกัน 12 หน่วย — ช่วยได้หนึ่งครั้งในบททดสอบ');}
   if(guarding)incoming=Math.ceil(incoming*.6);if(b.playerStatus.GROUNDED)incoming=Math.max(0,incoming-2);
   const absorbed=Math.min(b.shield,incoming);b.shield-=absorbed;incoming-=absorbed;d.hp-=incoming;b.log.push(`${encounter.name} โจมตี ${incoming}${absorbed?` · โล่รับ ${absorbed}`:''}`);
  }
 }else if(plan==='gather')b.log.push('ผู้ถักรากรวบเถา — ยังไม่โจมตี');
 else if(plan==='seal'){b.status.GUARDIAN_SEAL=2;fresh.add('GUARDIAN_SEAL');b.log.push('ผู้พิทักษ์กางผนึก ลดความเสียหาย 50% สองจังหวะ — ไม่โจมตี');}
 else if(plan==='clue')b.log.push('ผู้พิทักษ์หยุดฟัง — ใช้จังหวะนี้ฟื้นพลังได้');
 else if(plan==='ward'){b.status.RUNE_WARD=2;fresh.add('RUNE_WARD');b.log.push('หุ่นกางเกราะรูน ป้องกัน 50% เป็นเวลา 2 จังหวะผู้เล่น — จังหวะนี้ไม่โจมตี');}
 else if(plan==='mist'){b.playerStatus.VEIL=1;misted=true;b.log.push('ม่านหมอกบดบังสายตา ลดความแม่นยำ 10% ในเทิร์นถัดไป');}
 else if(plan==='listen')b.log.push('ปมเสียงย้อนฟังธาตุไว้ — ยังไม่โจมตี');
 else b.log.push('ต้นอ่อนหุบใบป้องกัน');
 fresh.delete('VEIL');if(misted)playerFresh.add('VEIL');tick(b.status,fresh);tick(b.playerStatus,playerFresh);
 if(b.shieldTurns>0&&--b.shieldTurns===0){b.shield=0;b.log.push('โล่เวทหมดเวลา');}
 b.turn++;b.log=b.log.slice(-12);d.journal.push(...b.log);
 if(d.hp<=0){if(b.id==='B05_MEMORY_GUARDIAN'&&b.guardian?.supplies){for(const [item,n] of Object.entries(b.guardian.supplies))d.inventory[item]=n;d.journal.push('บททดสอบคืนของใช้ก่อนเข้าประตูแล้ว ไม่มีรางวัลชัยชนะ');}d.hp=70;d.mp=20;d.recoveryScene=b.checkpoint;d.scene='S28_RECOVER';d.battle=undefined;d.journal.push('พิพพากลับมาพักอย่างปลอดภัย');}
 });}
