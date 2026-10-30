import './v8.css';
import {createV8Run,dispatchV8,v8Vitals} from '../engine/v8-life-loop.js';
import {v8Decision,v8Focuses,v8NextDecisionDay,v8CanResumePower} from '../engine/v8-model.js';
import {calendar} from '../engine/time.js';
import {storyToken,textTokens} from '../engine/life.js';
import {ActivePlayClock} from '../engine/run.js';
import {powerTitle} from '../progression/power-model.js';
import {effectiveCapacities,effectiveStats} from '../character/equipment-stats.js';
import {renderScene} from './scene.js';
import {renderMap} from './map-view.js';
import {renderFamily} from './family-view.js';
import {initPanels,openPanel,closePanel} from './panels.js';
import {archiveCompleted,completedSummary,readArchive} from '../save/archive.js';
import {v8Endings} from '../data/v8-endings.js';

document.body.className='v8-app';
document.body.innerHTML='<header class="v8-top"><h1>REBORN</h1><div><button id="v8Archive">ประวัติชีวิต</button><button id="v8Settings" aria-label="ตั้งค่า">⚙</button></div></header><p id="gameNotice" role="status" aria-live="polite"></p><main class="v8-shell" id="v8Root"></main><dialog id="modalOverlay" aria-labelledby="panelTitle"><div class="panel-top"><h2 id="panelTitle"></h2><button id="closePanel" aria-label="ปิดหน้าต่าง">✕</button></div><div id="modalContent" tabindex="-1"></div></dialog>';
initPanels();
const root=document.getElementById('v8Root'),clock=new ActivePlayClock();
let state=null,summary=null,archiveStatus=null,running=false,autoWanted=false,speed=1,raf=null,lastFrame=0,carry=0;
const MONTH_MS=600;
const names={health:'สุขภาพ',happiness:'ความสุข',knowledge:'ความรู้',bonds:'สายสัมพันธ์',gold:'เงิน',stamina:'ความอึด',focus:'สมาธิ',mana:'มานา',power:'ระดับพลัง'};
const statNames={str:'พละกำลัง',dex:'ความคล่อง',con:'ความทนทาน',int:'สติปัญญา',wis:'ความเข้าใจ',per:'การสังเกต',luk:'โชค',cha:'เสน่ห์'};
const rounded=n=>Math.round(n*10)/10;
function el(tag,parent,text,className){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;parent?.append(n);return n;}
function button(parent,label,fn,className){const b=el('button',parent,label,className);b.type='button';b.dataset.key=label;b.onclick=fn;return b;}
const notify=text=>{document.getElementById('gameNotice').textContent=text;};
const available=()=>state?.v8.stage==='life'&&state.run.status==='active'&&!state.v8.outcome&&!v8Decision(state);
function syncPlay(){const b=document.getElementById('v8Play');if(b){b.textContent=running?'พักเวลา':'เดินเวลา';b.dataset.key=b.textContent;b.setAttribute('aria-pressed',String(running));}}
function stopAuto(manual=false){if(manual)autoWanted=false;running=false;carry=0;cancelAnimationFrame(raf);raf=null;syncPlay();}
function animate(now){
 if(!running)return;
 if(!available()||document.hidden){stopAuto();return;}
 const elapsed=now-lastFrame;lastFrame=now;
 if(elapsed>2000){stopAuto(true);return;}
 carry+=Math.max(0,elapsed)*speed;
 if(carry>=MONTH_MS){carry-=MONTH_MS;perform({type:'v8Tick',days:30});}
 const fill=document.getElementById('v8TimeFill');
 if(fill&&running&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.documentElement.classList.contains('reduce-effects')){
  const c=calendar(state),days=Math.min(30*carry/MONTH_MS,Math.max(0,v8NextDecisionDay(state)-state.time.absoluteDay));fill.style.width=`${Math.min(100,(c.dayInYear+days)/360*100)}%`;
 }
 if(running)raf=requestAnimationFrame(animate);
}
function startAuto(){if(running||!available()||document.hidden)return;autoWanted=true;running=true;carry=0;lastFrame=performance.now();syncPlay();raf=requestAnimationFrame(animate);}
function archiveEnding(){
 if(!summary)return;archiveStatus='pending';const current=summary;
 const write=()=>archiveCompleted(localStorage,current);
 const task=navigator.locks?navigator.locks.request('reborn-finished-lives',write):Promise.resolve().then(write);
 return task.then(()=>{if(summary===current){archiveStatus='success';render();}}).catch(()=>{if(summary===current){archiveStatus='failed';render();}});
}
function perform(action){
 if(!state)return false;
 try{
  const next=dispatchV8(state,{token:storyToken(state),...action});next.run.activeMs=clock.sample(performance.now());state=next;notify('');
  if(state.run.status==='ended'){stopAuto(true);clock.pause(performance.now());summary=completedSummary(state,new Date().toISOString());archiveStatus='pending';render();archiveEnding();}
  else{if(!available())stopAuto();render();}
  return true;
 }catch(error){notify(error.message);return false;}
}
function begin(){if(state)return;state=createV8Run(crypto.getRandomValues(new Uint32Array(1))[0],{id:crypto.randomUUID(),startedAt:new Date().toISOString()});clock.start(performance.now());render();}
function restart(){stopAuto(true);closePanel();clock.pause(performance.now());state=null;summary=null;archiveStatus=null;notify('');render();}
function changes(parent,values){
 const row=el('div',parent,undefined,'v8-changes');
 for(const [key,n]of Object.entries(values??{}))if(n)el('span',row,`${names[key]} ${n>0?'+':''}${rounded(n)}`,`v8-change${n<0?' negative':''}`);
}
function facts(parent,rows){const list=el('dl',parent,undefined,'v8-facts');for(const [label,value]of rows){const item=el('div',list);el('dt',item,label);el('dd',item,value);}}
function status(parent){
 const header=el('section',parent),c=calendar(state),head=el('div',header,undefined,'v8-heading');
 el('div',head,`อายุ ${c.ageYears} ปี ${c.ageMonths%12} เดือน`,'v8-age').id='v8Age';
 button(head,'รายละเอียด',()=>panel('status'));
 const power=el('div',header,state.progression.awakening.step===7?`ระดับพลัง ${state.power.level} / 10`:'ยังไม่ปลุกพลัง','v8-power');power.id='v8Power';
 if(state.progression.awakening.step===7)el('span',power,powerTitle(state),'v8-rank');
 const identity=el('div',header,undefined,'v8-identity');el('span',identity,`${state.name} · ${state.race}`);el('strong',identity,`${state.gold} เหรียญ`).id='v8Gold';
 const bars=el('div',header,undefined,'v8-bars'),v=v8Vitals(state);
 for(const [id,max,color]of [['health',100,'#b7d0a7'],['happiness',100,'#e4c47f'],['knowledge',100,'#9dc6de'],['bonds',100,'#cfabca']]){
  const box=el('div',bars,undefined,'v8-stat'),label=el('div',box);el('span',label,names[id]);el('span',label,`${Math.round(v[id]/max*100)}`);
  const meter=el('meter',box);meter.min=0;meter.max=max;meter.value=v[id];meter.setAttribute('aria-label',names[id]);meter.style.setProperty('--meter-color',color);
 }
}
function stage(parent){const box=el('section',parent,undefined,'v8-stage');renderScene(box,state);el('p',box,`${state.career} · ${state.v8.stage==='reveal'?'บ้านครอบครัว':v8Focuses(state).find(f=>f.id===state.v8.focus)?.label??(state.age<1?'ผู้ดูแลจัดชีวิตตามวัย':'รอเริ่มแนวชีวิตช่วงใหม่')}`,'v8-place');}
function timeline(parent){
 const d=v8Decision(state),v=state.v8,c=calendar(state),block=!!d||!!v.outcome;
 const section=el('section',parent,undefined,`v8-timeline${block?' is-paused':''}`),label=el('div',section,undefined,'v8-time-label');
 el('span',label,`ปีที่ ${c.ageYears+1} · ${c.ageMonths%12} เดือนจาก 12`);el('span',label,block?'เวลาหยุดรอคุณ':running?'กำลังใช้ชีวิต':'หยุดพัก');
 const track=el('div',section,undefined,'v8-track');track.id='v8TimeTrack';track.setAttribute('role','progressbar');track.setAttribute('aria-label','เวลาที่ผ่านในปีอายุปัจจุบัน');track.setAttribute('aria-valuemin','0');track.setAttribute('aria-valuemax','360');track.setAttribute('aria-valuenow',String(c.dayInYear));const fill=el('div',track);fill.id='v8TimeFill';fill.style.width=`${c.yearProgress*100}%`;
 const row=el('div',section,undefined,'v8-time-buttons');
 for(const n of [1,2,4,8]){const b=button(row,`${n}×`,()=>{speed=n;render();});b.setAttribute('aria-label',`ความเร็ว ${n} เท่า`);b.setAttribute('aria-pressed',String(speed===n));b.disabled=block;}
 const play=button(row,running?'พักเวลา':'เดินเวลา',()=>{if(running)stopAuto(true);else startAuto();render();});play.id='v8Play';play.setAttribute('aria-pressed',String(running));play.disabled=block;
 const seek=button(section,'ข้ามไปเหตุการณ์ถัดไป',()=>{stopAuto(true);perform({type:'v8Seek'});},'v8-seek');seek.disabled=block;
}
function choiceDescription(choice){
 if(choice.disabled)return choice.unavailable;
 if(choice.description)return choice.description;
 const parts=[`${choice.timeDays} วัน`];
 if(choice.destination)parts.push(`ไป${choice.destination}`);
 if(choice.costGold)parts.push(`เงิน −${choice.costGold}`);else parts.push('ฟรี');
 if(choice.stamina)parts.push(`ความอึด −${choice.stamina}`);
 for(const [key,n]of Object.entries(choice.effects??{}))if(names[key]&&typeof n==='number'){
  const old=v8Vitals(state)[key],cap=['knowledge','bonds','happiness','health'].includes(key)?100:Infinity;
  const actual=rounded(Math.min(cap,Math.max(0,old+n))-old);if(actual)parts.push(`${names[key]} ${actual>0?'+':''}${actual}`);
 }
 if(choice.special==='defend')parts.push(`ความพร้อม ${choice.readiness}/32`);
 return parts.join(' · ');
}
function decision(parent,d){
 const card=el('section',parent,undefined,'v8-card v8-decision');card.dataset.eventId=d.id;card.setAttribute('aria-label','เรื่องสำคัญที่รอเลือก');
 el('p',card,`เรื่องสำคัญ · ${state.location}${d.kind==='ritual'?` · ขั้น ${d.step+1}/7`:''}`,'v8-context');el('h2',card,d.title);el('p',card,textTokens(d.prose??d.text,state));
 const options=el('div',card,undefined,'v8-options');
 for(const c of d.choices){
  const action={type:'v8Choice',decisionId:d.id,choiceId:c.id,token:storyToken(state)};
  const b=button(options,'',()=>perform(action),'v8-choice');b.dataset.choiceId=c.id;b.dataset.key=`choice:${c.id}`;b.disabled=!!c.disabled;
  el('strong',b,c.label);el('span',b,choiceDescription(c));
 }
}
function lifeContent(parent){
 const v=state.v8,d=v8Decision(state);
 if(v.outcome){
  const card=el('section',parent,undefined,'v8-card v8-outcome');card.setAttribute('aria-label','ผลของการตัดสินใจ');el('h2',card,v.outcome.title);el('p',card,v.outcome.text);changes(card,v.outcome.changes);
  button(card,'ดำเนินชีวิตต่อ',()=>{const resume=autoWanted;if(perform({type:'v8Continue'})&&resume)startAuto();},'primary');return;
 }
 if(d){decision(parent,d);return;}
 const card=el('section',parent,undefined,'v8-card v8-routine');el('h2',card,v.lastAmbient?.title??'ชีวิตช่วงนี้');el('p',card,v.lastAmbient?.text??'วันธรรมดาค่อย ๆ พาคุณไปสู่เรื่องถัดไป');
 if(v.lastAmbient?.changes)changes(card,v.lastAmbient.changes);
 const focuses=v8Focuses(state);
 if(focuses.length){
  const detail=el('details',card);el('summary',detail,'แนวชีวิตช่วงนี้');detail.ontoggle=()=>{if(detail.open)stopAuto(true);};
  el('p',detail,'เปลี่ยนแนวทางมีผลเมื่อเวลาเดินครั้งถัดไป การกดไม่ให้เงินหรือประสบการณ์ทันที','v8-note');
  const grid=el('div',detail,undefined,'v8-focus');
  for(const f of focuses){const b=button(grid,'',()=>{stopAuto(true);perform({type:'v8Focus',focus:f.id});},'');b.dataset.key=`focus:${f.id}`;b.dataset.focusId=f.id;b.setAttribute('aria-pressed',String((v.nextFocus??v.focus)===f.id));el('strong',b,f.label);el('span',b,f.description);}
 }
 if(v8CanResumePower(state))button(card,'กลับไปทบทวนขอบเขตพลัง',()=>{stopAuto(true);perform({type:'v8ResumePower'});});
}
function birth(parent){
 const card=el('section',parent,undefined,'v8-card');el('h2',card,'ชีวิตใหม่ในเอลินดรา');
 facts(card,[['ชื่อ',state.name],['เผ่า',state.race],['บ้านเกิด',state.location],['ครอบครัว',state.family],['มารดา',`${state.birth.parents.mother} · ${state.birth.parents.motherOccupation}`],['บิดา',`${state.birth.parents.father} · ${state.birth.parents.fatherOccupation}`],['เงินครอบครัว',`${state.gold} เหรียญ`],['ลักษณะเริ่มต้น',state.traits.join(' · ')]]);
 el('p',card,'ศักยภาพยังไม่ค้นพบ ผู้ดูแลจะจัดชีวิตวัยทารกให้ตามวัย','v8-note');
 const row=el('div',card,undefined,'v8-birth-actions');button(row,'เริ่มชีวิต',()=>{autoWanted=true;if(perform({type:'v8Begin'}))startAuto();},'primary');button(row,'ดูครอบครัว',()=>panel('status'));
 stage(parent);
}
function finale(parent){
 const ending=v8Endings[state.run.endingId],card=el('section',parent,undefined,'v8-card v8-final');card.dataset.endingId=state.run.endingId;
 el('p',card,'ชีวิตถึงปลายอายุขัยตามธรรมชาติ','v8-context');el('h2',card,ending.title);el('p',card,ending.text);
 facts(card,[['อาชีพ',state.career],['ความสัมพันธ์',state.v8.relationship==='partner'?'มีคู่ชีวิต':state.v8.relationship==='friend'?'มิตรภาพที่ไว้ใจ':'ใช้ชีวิตอิสระ'],['สถานที่ที่เคยไป',`${state.world.visited.length} แห่ง`],['เงินที่เหลือ',`${state.gold} เหรียญ`],['ความไว้ใจชุมชน',String(state.story.relationships.community)]]);
 el('h3',card,'สิ่งที่คุณเลือกไว้');const list=el('ul',card);for(const text of summary.events)el('li',list,text);
 const note=el('p',card,archiveStatus==='success'?'เก็บสรุปชีวิตที่จบแล้วเรียบร้อย':archiveStatus==='failed'?'เก็บประวัติไม่ได้ ดาวน์โหลดสรุปไว้ได้':'กำลังเก็บประวัติชีวิต');note.setAttribute('role','status');
 if(archiveStatus==='failed')button(card,'ลองเก็บประวัติอีกครั้ง',()=>archiveEnding());
 button(card,'เริ่มชีวิตใหม่',restart,'primary');button(card,'ดาวน์โหลดสรุปชีวิต',()=>download(summary,'reborn-finished-life.json'));
}
function render(){
 const focused=document.activeElement?.dataset.key;root.replaceChildren();
 if(!state){
  const intro=el('section',root,undefined,'v8-intro');el('p',intro,'หนึ่งชีวิต · หนึ่งครั้งที่เล่น','v8-muted');el('h2',intro,'ประตูสู่เอลินดรา');
  const image=el('img',intro);image.src=new URL('../../public/art/cradle.svg',import.meta.url).href;image.alt='เปลเล็กใต้แสงดาว';
  el('p',intro,'กำเนิดที่สุ่มมา วันธรรมดาที่ค่อย ๆ เดินไป และทางแยกที่คุณเป็นคนเลือก');button(intro,'เกิด',begin,'primary');el('p',intro,'รีเฟรช = เริ่มชีวิตใหม่\nเก็บเฉพาะประวัติของชีวิตที่จบจริง','v8-note');return;
 }
 if(state.v8.stage==='reveal'){birth(root);return;}
 status(root);stage(root);
 if(state.run.status==='ended')finale(root);else{timeline(root);lifeContent(root);}
 const nav=el('nav',root,undefined,'v8-nav');nav.setAttribute('aria-label','ข้อมูลชีวิต');
 for(const [id,label]of [['status','ตัวละคร'],['journal','บันทึกชีวิต'],['map','แผนที่']])button(nav,label,()=>panel(id));
 if(focused)[...root.querySelectorAll('[data-key]')].find(n=>n.dataset.key===focused)?.focus({preventScroll:true});
}
function download(value,name){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function panel(id){
 stopAuto(true);
 const titles={archive:'ประวัติชีวิตที่จบแล้ว',settings:'ตั้งค่า',status:'ตัวละคร',map:'แผนที่เอลินดรา',journal:'บันทึกชีวิต'};
 openPanel(id,titles[id],parent=>{
  if(id==='archive'){
   el('p',parent,'เก็บเฉพาะสรุปชีวิตที่จบจริง ไม่มีการเล่นต่อจากประวัติ');let records=[];
   try{records=readArchive(localStorage);}catch{el('p',parent,'อ่านประวัติไม่ได้ ข้อมูลเดิมยังอยู่');}
   for(const r of records.toReversed()){const entry=el('details',parent,undefined,'v8-archive-entry');el('summary',entry,`${r.name} · ${r.age} ปี · ${r.title}`);el('p',entry,`${r.race} · ${r.career} · พลัง ${r.powerLevel} · เงิน ${r.gold} เหรียญ`);el('p',entry,r.epilogue);for(const text of r.events)el('p',entry,text);}
   if(!records.length)el('p',parent,'ยังไม่มีชีวิตที่จบแล้วในประวัติ');button(parent,'ดาวน์โหลดประวัติชีวิต',()=>download({version:1,lives:records},'reborn-finished-lives.json'));
  }else if(id==='settings'){
   el('p',parent,'การตั้งค่ามีผลเฉพาะแท็บนี้ ชีวิตที่กำลังเล่นจะไม่ถูกบันทึก');
   const label=el('label',parent);const input=el('input',label);input.type='checkbox';input.checked=document.documentElement.classList.contains('reduce-effects');label.append(document.createTextNode('ลดการเคลื่อนไหว'));input.onchange=()=>document.documentElement.classList.toggle('reduce-effects',input.checked);
   if(state?.run.status==='active')button(parent,'ละชีวิตนี้และกลับหน้าเกิด',()=>{if(confirm('ละชีวิตที่ยังไม่จบหรือไม่? ชีวิตนี้จะไม่เก็บในประวัติ'))restart();});
  }else if(!state)el('p',parent,'ยังไม่ได้เริ่มชีวิต');
  else if(id==='map')renderMap(parent,state,()=>false,()=>panel('map'));
  else if(id==='journal'){
   el('p',parent,'เหตุการณ์ตามเวลาจริงของชีวิตนี้');for(const item of state.journal.slice().reverse()){const months=Math.floor((item.day-state.time.birthAbsoluteDay)/30);el('p',parent,`${Math.floor(months/12)} ปี ${months%12} เดือน · ${item.title}`,'journal-line');}
  }else{
   const s=effectiveStats(state),caps=effectiveCapacities(state);facts(parent,[['ชื่อ',state.name],['เผ่า',state.race],['อาชีพ',state.career],['สุขภาพ',`${rounded(state.hp)}/${caps.maxHp}`],['ความอึด',`${rounded(state.stamina)}/${caps.maxStamina}`],['มานา',`${rounded(state.mana)}/${caps.maxMana}`],['สมาธิ',`${state.progression.focus}/100`],['เหนื่อยล้า',`${state.progression.fatigue}/100`],...Object.entries(s).map(([key,n])=>[statNames[key],String(n)])]);
   el('p',parent,'ขอบเขตพลังที่ฝึกได้ขณะนี้คือระดับ 1–10 ต้องผ่านพิธี เลือกอาชีพ และใช้วันฝึกจริง ระดับสิบต้องยืนยันด้วยตนเอง');
   renderFamily(parent,state);
  }
 });
}
document.getElementById('v8Archive').onclick=()=>panel('archive');document.getElementById('v8Settings').onclick=()=>panel('settings');
for(const type of ['pointerdown','keydown'])document.addEventListener(type,e=>{if(e.isTrusted&&state?.run.status==='active')clock.interact(performance.now());if(type==='keydown'&&e.key==='Tab')stopAuto(true);},{passive:true});
document.addEventListener('visibilitychange',()=>{stopAuto(true);if(document.hidden)clock.pause(performance.now());else if(state?.run.status==='active')clock.resume(performance.now());});
window.addEventListener('blur',()=>{stopAuto(true);clock.pause(performance.now());});window.addEventListener('focus',()=>{if(state?.run.status==='active')clock.resume(performance.now());});
window.addEventListener('pagehide',()=>{stopAuto(true);clock.pause(performance.now());state=null;summary=null;});window.addEventListener('pageshow',e=>{if(e.persisted)restart();});
window.addEventListener('beforeunload',e=>{if(state?.run.status==='active'){e.preventDefault();e.returnValue='';}});
window.Game={get snapshot(){return state?structuredClone(state):null;},perform,downloadHistory:()=>{try{download({version:1,lives:readArchive(localStorage)},'reborn-finished-lives.json');}catch{notify('อ่านประวัติไม่ได้ ข้อมูลเดิมยังอยู่');}}};
render();
