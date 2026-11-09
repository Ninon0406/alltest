import type {State} from '../engine/state';
import {battleRules,enemyMaxHp,enemyName,intent,statusSummary,statusHelp,scoutAvailability,distillAvailability} from '../systems/combat';
import {hasPathAbility} from '../systems/life-paths';
import {byId,cores,coreNames} from '../systems/spells';

type ButtonFactory=(label:string,action:()=>void,disabled?:boolean)=>HTMLButtonElement;
type CombatAction=(id:string,cue:string,spellId?:string)=>void;
const element=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{
 const node=document.createElement(tag);
 if(text)node.textContent=text;
 return node;
};

function vital(label:string,value:number,max:number,kind:'hp'|'mp'){
 const wrap=element('div');wrap.className='battle-vital';
 const heading=element('div',`${label} ${value}/${max}`);
 const bar=element('progress');bar.className=`vital-bar ${kind}`;bar.max=max;bar.value=value;
 bar.setAttribute('aria-label',label);bar.setAttribute('aria-valuetext',`${value} จาก ${max}`);
 wrap.append(heading,bar);return wrap;
}

function statusInfo(host:HTMLElement,statuses:Record<string,number>,label:string){
 const summaries=statusSummary(statuses);if(!summaries.length){host.append(element('p',label+': ปกติ'));return;}
 const detail=element('details');detail.className='status-help';detail.append(element('summary',summaries.join(' · ')));
 for(const [id,turns] of Object.entries(statuses))if(turns>0)detail.append(element('p',statusHelp[id]||'ผลเวทจะหมดเมื่อครบเวลาที่แสดง'));
 host.append(detail);
}

/** Presentation consumes resolved state; animations never decide combat results. */
export function combatPanel(content:HTMLElement,s:State,button:ButtonFactory,action:CombatAction){
 const battle=s.battle;if(!battle)return;
 content.replaceChildren();
 content.append(element('p',`การต่อสู้ · เทิร์น ${battle.turn}`),element('h1',enemyName(s)));
 const stats=element('div');stats.className='battle-stats';
 const player=element('section');player.className='combatant';player.setAttribute('aria-label','สถานะผู้เล่น');
 player.append(element('h2',s.name),vital('HP ของคุณ',s.hp,100,'hp'),vital('MP ของคุณ',s.mp,40,'mp'));
 const guard=element('p',battle.shield>0?`โล่ ${battle.shield} · คงอยู่ ${battle.shieldTurns} เทิร์น`:'ยังไม่มีโล่');
 guard.className='battle-status';player.append(guard);
 statusInfo(player,battle.playerStatus,'สถานะของคุณ');
 const enemy=element('section');enemy.className='combatant';enemy.setAttribute('aria-label','สถานะศัตรู');
 enemy.append(element('h2','คู่ต่อสู้'),vital('HP ศัตรู',battle.enemyHp,enemyMaxHp(s),'hp'));
 statusInfo(enemy,battle.status,'สถานะศัตรู');
 stats.append(player,enemy);content.append(stats);
 const telegraph=element('p',`การเคลื่อนไหวถัดไป: ${intent(s)}`);telegraph.className='battle-intent';content.append(telegraph);
 const rules=battleRules(s);if('weakness' in rules&&rules.weakness)content.append(element('p',`จุดอ่อน: ธาตุ${coreNames[cores.indexOf(rules.weakness)]} · แรงขึ้น 20%`));

 const log=element('section');log.className='battle-log';log.setAttribute('aria-label','ผลของเทิร์นล่าสุด');
 log.append(element('h2','ผลของเทิร์นล่าสุด'));
 const entries=element('ul');
 for(const line of battle.log.length?battle.log:['เลือกคาถาหรือเตรียมรับมือการเคลื่อนไหวถัดไป'])entries.append(element('li',line));
 log.append(entries);content.append(log);

 content.append(element('h2','คาถาที่ติดตั้ง'));
 const slots=element('div');slots.className='spell-slots';
 for(let i=0;i<4;i++){
  const spell=byId[s.equipped[i]],slot=element('div');slot.className='spell-slot';
  const label=spell?`${spell.name} · MP ${spell.mp}`:`ช่อง ${i+1} ว่าง`;
  const control=button(label,()=>{if(spell)action(spell.id,'cast',spell.id);},!spell||s.mp<spell.mp);
  const description=element('p',!spell?'ติดตั้งคาถาจากสมุดเวทนอกการต่อสู้':s.mp<spell.mp?'MP ไม่พอ · ตั้งรับหรือใช้ใบฟื้นเวท':spell.heal?`ฟื้น HP ${spell.heal} · เป้าหมาย: ตัวเอง`:spell.shield?`สร้างโล่ ${spell.shield} · เป้าหมาย: ตัวเอง`:`พลัง ${spell.power} · ${spell.hits} ครั้ง · เป้าหมาย: ศัตรู`);
  description.id=`battle-slot-${i}-detail`;description.className='action-detail';control.setAttribute('aria-describedby',description.id);
  slot.append(control,description);slots.append(slot);
 }
 content.append(slots,element('h2','การเตรียมตัว'));
 const utilities=element('div');utilities.className='battle-utilities';
 const actions:[string,string,string][]=[
  ['BASIC_PULSE','ประกายพื้นฐาน · MP 0','cast'],
  ['GUARD','ตั้งรับ · ฟื้น MP 6','guard'],
  ['IT_POTION_DEW',`น้ำค้างฟื้นพลัง · ${s.inventory.IT_POTION_DEW||0}`,'rest'],
  ['IT_MANA_LEAF',`ใบฟื้นเวท · ${s.inventory.IT_MANA_LEAF||0}`,'rest']
 ];
 for(const [id,label,cue] of actions)utilities.append(button(label,()=>action(id,cue),id.startsWith('IT_')&&!s.inventory[id]));

 const scout=scoutAvailability(s),scoutControl=button('สำรวจจังหวะ · MP 4',()=>action('SCOUT','pick'),!scout.enabled);
 const scoutDetail=element('p',scout.reason||'ใช้หนึ่งเทิร์น ไม่โจมตี · เวทโจมตีที่ติดตั้งครั้งถัดไปแม่นยำและผ่านท่าป้องกัน ต้องใช้ใน 2 เทิร์น');
 scoutDetail.id='battle-scout-detail';scoutDetail.className='action-detail';scoutControl.setAttribute('aria-describedby',scoutDetail.id);scoutControl.dataset.pathAbility='TRAIL_FOCUS';
 utilities.append(scoutControl,scoutDetail);
 const distill=distillAvailability(s),distillControl=button('กลั่นน้ำค้าง · น้ำค้าง 1',()=>action('DISTILL','cast','SPELL_WATER_RING_HEAL'),!distill.enabled);
 const distillDetail=element('p',distill.reason||'ใช้หนึ่งเทิร์น ฟื้น HP 12 / MP 6 ล้างเพลิงคุกรุ่นและม่านพร่า ศัตรูยังลงมือ ใช้ครั้งเดียวต่อการต่อสู้');distillDetail.id='battle-distill-detail';distillDetail.className='action-detail';distillControl.setAttribute('aria-describedby',distillDetail.id);distillControl.dataset.pathAbility='DISTILL';
 if(hasPathAbility(s,'DISTILL'))utilities.append(distillControl,distillDetail);

 const abilities=element('section');abilities.className='path-abilities';abilities.setAttribute('aria-label','ความสามารถจากเส้นทางชีวิต');
 if(hasPathAbility(s,'TRAIL_FOCUS'))abilities.append(element('p',battle.pathActions?.scouted?'นักสำรวจ · ใช้สำรวจจังหวะในการต่อสู้นี้แล้ว':'นักสำรวจ · สำรวจจังหวะได้ครั้งเดียวในการต่อสู้นี้'));
 if(hasPathAbility(s,'ROOT_REFUGE'))abilities.append(element('p',battle.pathActions?.rootGuardUsed?'ผู้พิทักษ์ธรรมชาติ · ใช้รากคุ้มภัยจากการตั้งรับครั้งแรกแล้ว':'ผู้พิทักษ์ธรรมชาติ · ตั้งรับครั้งแรกสร้างโล่ 8 คุ้มกัน 2 จังหวะศัตรู คงโล่เดิมที่แรงกว่าและไม่ต่อเวลา'));
 if(abilities.childElementCount)content.append(abilities);

 if(rules.canFlee)utilities.append(button('ถอยออกมาเตรียมตัว',()=>action('FLEE','walk')));
 else{const reason=element('p','fleeHint' in rules?rules.fleeHint:'การต่อสู้นี้ถอยไม่ได้');reason.className='action-detail';utilities.append(reason);}
 if(rules.canSurrender)utilities.append(button('ยุติการฝึก',()=>action('SURRENDER','rest')));
 content.append(utilities);
}
