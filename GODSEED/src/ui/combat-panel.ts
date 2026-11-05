import type {State} from '../engine/state';
import {battleRules,enemyMaxHp,enemyName,intent,statusSummary,statusHelp} from '../systems/combat';
import {byId} from '../systems/spells';

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
 const rules=battleRules(s);
 if(rules.canFlee)utilities.append(button('ถอยออกมาเตรียมตัว',()=>action('FLEE','walk')));
 else{const reason=element('p','การต่อสู้นี้ถอยไม่ได้');reason.className='action-detail';utilities.append(reason);}
 if(rules.canSurrender)utilities.append(button('ยุติการฝึก',()=>action('SURRENDER','rest')));
 content.append(utilities);
}
