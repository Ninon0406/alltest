import './ui/styles.css';
import {Game} from './ui/game.js';
import {GameState} from './engine/state.js';
import {Scenes} from './data/scenes.js';
import {pendingDecision} from './engine/yearly.js';
import {storyToken} from './engine/life.js';
import {renderCareer} from './ui/career-view.js';
import {renderMap} from './ui/map-view.js';
import {renderJournal,paragraph,actionButton,panelButton,statNames} from './ui/life-view.js';
import {renderBirthRecord} from './ui/birth-record.js';
import {renderFocus,renderDecision,stopYearlyAuto} from './ui/yearly-view.js';
import {openPanel,closePanel,refreshPanel,panelKey,initPanels} from './ui/panels.js';
import {readArchive} from './save/archive.js';
import {readGallery} from './save/gallery.js';
import {services,availableServices} from './world/economy.js';
import {locations} from './world/locations.js';
import {currentCareer,jobQuote} from './progression/engine.js';
import {renderJourney} from './ui/journey-view.js';
import {ageLabel} from './engine/time.js';
window.Game=Game;initPanels();
let dismissedDecision=null,manualOpening=false,textScale=100,reduced=false;
const decisionKey=()=>{const d=Game.active&&GameState.run.status==='active'?pendingDecision(GameState):null;return d?`${GameState.run.id}:${d.id}:${d.stage??''}:${GameState.time.absoluteDay}`:null;};
function showBirth(){
 closePanel();document.body.classList.remove('yearly-mode','playing');document.querySelector('#gameView').hidden=true;document.querySelector('#runHeader').hidden=true;document.querySelector('.main-nav').hidden=true;document.querySelector('#birthScreen')?.remove();dismissedDecision=null;
 const screen=document.createElement('section');screen.id='birthScreen';screen.className='rebirth-screen';
 screen.innerHTML='<p class="eyebrow">เอลินดรา · หนึ่งชีวิต หนึ่งครั้งที่เล่น</p><h2>ประตูแห่งการเกิดใหม่</h2><img class="birth-art" alt="เปลทารกใต้แสงดาว"><p>คุณเลือกกำเนิดไม่ได้ แต่เลือกเส้นทางของตนเองได้</p><button class="primary" id="beginBirth">ก้าวสู่ชีวิตใหม่</button><p class="run-warning">ชีวิตอยู่ในแท็บนี้เท่านั้น รีเฟรชหรือปิดหน้าแล้วเริ่มใหม่<br>เก็บประวัติเฉพาะชีวิตที่ถึงฉากจบ</p>';
 screen.querySelector('img').src=new URL('../public/art/cradle.svg',import.meta.url).href;
 screen.querySelector('button').onclick=()=>{if(Game.active)return;Game.startRun();screen.remove();document.querySelector('#gameView').hidden=false;document.querySelector('#runHeader').hidden=false;document.querySelector('.main-nav').hidden=false;Game.render();};
 document.querySelector('header').after(screen);Game.notify('');
}
function renderArchive(parent){
 paragraph(parent,'เก็บเฉพาะสรุป 100 ชีวิตล่าสุด ไม่มีการเล่นต่อจากประวัติ');
 let records=[];try{records=readArchive(localStorage);}catch(e){paragraph(parent,e.message);}
 for(const r of records.toReversed()){
  const entry=document.createElement('details');parent.append(entry);paragraph(entry,`${r.name} · ${r.age} ปี · ${r.title}`,'summary');paragraph(entry,`${r.career} · ระดับพลัง ${r.powerLevel}/100 · ${r.gold} เหรียญ`);paragraph(entry,r.epilogue);paragraph(entry,`เวลาเล่นที่มีส่วนร่วม ${Math.floor(r.activePlayMs/1000)} วินาที · ${new Intl.DateTimeFormat('th-TH',{dateStyle:'medium',timeZone:'Asia/Bangkok'}).format(new Date(r.finishedAt))}`);
 }
 if(!records.length)paragraph(parent,'ยังไม่มีชีวิตที่จบแล้วในประวัติ');
 const download=document.createElement('button');download.textContent='ดาวน์โหลดประวัติชีวิตทั้งหมด';download.onclick=()=>Game.downloadHistory();parent.append(download);
 const legacy=readGallery(localStorage);if(legacy.length){const old=document.createElement('details');parent.append(old);paragraph(old,`ฉากจบจากรุ่นก่อน (${legacy.length})`,'summary');paragraph(old,legacy.map(id=>Object.values(Scenes).find(s=>s.endingId===id).title).join(' · '));}
}
function renderBag(parent){
 const qty=GameState.world.inventory.bread??0;paragraph(parent,`เงิน ${GameState.gold} เหรียญ · อยู่ที่${GameState.location}`);paragraph(parent,qty?`ขนมปัง ${qty}/20 ชิ้น`:'ยังไม่มีสิ่งของในกระเป๋า');
 if(qty&&GameState.age>=4)actionButton(parent,'กินขนมปัง · ฟื้นอาหาร 25 · 1 วัน',{type:'service',serviceId:'eat',token:storyToken(GameState)},a=>Game.perform(a));
 panelButton(parent,'ร้านค้าและเสบียง','shop');
}
function renderShop(parent){
 paragraph(parent,`${GameState.location} · เงิน ${GameState.gold} เหรียญ`);
 if(GameState.age<4){paragraph(parent,'ผู้ดูแลยังจัดหาอาหารให้ การซื้อของด้วยตนเองเริ่มเมื่ออายุ 4 ปี');return;}
 const offered=availableServices(GameState).filter(id=>['food','sell','eat'].includes(id));
 for(const id of offered){const c=services[id];actionButton(parent,`${c.label} · ${c.gold>=0?'+':''}${c.gold} เหรียญ · ${c.days} วัน`,{type:'service',serviceId:id,token:storyToken(GameState)},a=>Game.perform(a));}
 if(!offered.includes('food')){paragraph(parent,'ที่นี่ยังไม่มีแผงขายเสบียง ลองดูตลาดหรือเมืองท่าที่รู้จักบนแผนที่');panelButton(parent,'ดูแผนที่และบริการ','map');}
 paragraph(parent,`ขนมปังในกระเป๋า ${GameState.world.inventory.bread??0}/20 ชิ้น`);
}
function renderStatus(parent){
 paragraph(parent,`${GameState.name} · อายุ ${ageLabel(GameState)} · ${GameState.career}`);paragraph(parent,`ระดับพลัง ${GameState.power?.level??1}/100 · ผู้เริ่มรับรู้พลัง`);
 const grid=document.createElement('div');grid.className='stats-grid';parent.append(grid);for(const [id,label]of Object.entries(statNames))paragraph(grid,`${label} ${GameState.stats[id]}`);
 paragraph(parent,`พลังชีวิต ${GameState.hp}/${GameState.maxHp} · ความอึด ${GameState.stamina}/${GameState.maxStamina} · มานา ${GameState.mana}/${GameState.maxMana}`);paragraph(parent,`อาหาร ${GameState.hunger}/100 · น้ำ ${GameState.thirst}/100 · เหนื่อยล้า ${GameState.progression.fatigue}/100 · สมาธิ ${GameState.progression.focus}/100 · ขวัญกำลังใจ ${GameState.morale}/100`);paragraph(parent,GameState.traits.join(' · '));panelButton(parent,'บันทึกตัวละคร','record');
}
function renderWork(parent){
 if(GameState.age<8){paragraph(parent,'ตอนนี้ยังอยู่ในวัยเรียนรู้ งานชุมชนที่มีผู้ดูแลเปิดเมื่ออายุ 8 ปี');return;}
 if(currentCareer(GameState)){const job=jobQuote(GameState);actionButton(parent,`${currentCareer(GameState).job} · รับ ${job.gold} เหรียญ · ${job.days} วัน`,{type:'careerJob',token:storyToken(GameState)},a=>Game.perform(a));}
 else if(availableServices(GameState).includes('work'))actionButton(parent,'ช่วยงานชุมชน · +4 เหรียญ · 1 วัน',{type:'service',serviceId:'work',token:storyToken(GameState)},a=>Game.perform(a));
 else{paragraph(parent,'ที่นี่ยังไม่มีงานชุมชน ลองดูหมู่บ้าน ตลาด หรือเมืองท่าที่เปิดรับงาน');panelButton(parent,'หางานบนแผนที่','map');}
 panelButton(parent,'อาชีพและการฝึก','career');
}
function renderOptions(parent){
 const label=document.createElement('label');label.textContent='ขนาดตัวอักษร';const scale=document.createElement('select');scale.setAttribute('aria-label','ขนาดตัวอักษร');for(const n of [100,112,125]){const option=document.createElement('option');option.value=n;option.textContent=`${n}%`;scale.append(option);}scale.value=textScale;scale.onchange=()=>{textScale=Number(scale.value);document.documentElement.style.fontSize=`${16*textScale/100}px`;};label.append(scale);parent.append(label);
 const motion=document.createElement('label'),check=document.createElement('input');check.type='checkbox';check.checked=reduced;check.onchange=()=>{reduced=check.checked;document.documentElement.classList.toggle('reduce-effects',reduced);};motion.append(check,document.createTextNode('ลดการเคลื่อนไหว'));parent.append(motion);
 paragraph(parent,'รีเฟรชหรือปิดหน้าแล้วเริ่มใหม่ ชีวิตนี้เก็บเฉพาะในแท็บ คำเตือนก่อนปิดหน้าอาจไม่ปรากฏบนบางเบราว์เซอร์');
 if(Game.active){const exit=document.createElement('button');exit.textContent='เริ่มใหม่';exit.onclick=()=>Game.restartGame();parent.append(exit);}panelButton(parent,'คู่มือโลก','guide');
}
function showPanel(key){
 if(!Game.active&&!['archive','options','guide'].includes(key))return;
 const previous=document.activeElement,label=previous?.getAttribute('aria-label')??previous?.textContent;
 manualOpening=true;stopYearlyAuto();if(Game.active)Game.render();manualOpening=false;
 const titles={map:'แผนที่และบริการ',career:'อาชีพและการฝึก',bag:'กระเป๋า',record:'บันทึกตัวละคร',chronicle:'บันทึกชีวิตรายปี',focus:'แนวชีวิตประจำปี',decision:'การตัดสินใจสำคัญ',shop:'ร้านค้าและเสบียง',status:'สถานะตัวละคร',work:'งานและรายได้',archive:'ประวัติชีวิตที่จบแล้ว',options:'ตัวเลือก',more:'เพิ่มเติม',guide:'คู่มือโลก'};
 titles.journey='เลือกการเดินทาง';if(!titles[key])return;
 const render=parent=>{
  if(key==='map')renderMap(parent,GameState,a=>Game.perform(a),refreshPanel);
  else if(key==='journey')renderJourney(parent,GameState,a=>{const ok=Game.perform(a);if(ok)closePanel();return ok;},refreshPanel);
  else if(key==='career')renderCareer(parent,GameState,a=>{const ok=Game.perform(a);if(ok&&a.type==='beginAwakening')closePanel();return ok;});
  else if(key==='bag')renderBag(parent);
  else if(key==='shop')renderShop(parent);
  else if(key==='status')renderStatus(parent);
  else if(key==='work')renderWork(parent);
  else if(key==='record')renderBirthRecord(parent,GameState);
  else if(key==='chronicle')renderJournal(parent,GameState);
  else if(key==='focus')renderFocus(parent,GameState,a=>Game.perform(a),closePanel);
  else if(key==='decision')renderDecision(parent,GameState,a=>Game.perform(a));
  else if(key==='archive')renderArchive(parent);
  else if(key==='options')renderOptions(parent);
  else if(key==='more'){for(const [label,id]of [['ดูสถานะทั้งหมด','status'],['บันทึกตัวละคร','record'],['บันทึกชีวิตรายปี','chronicle'],['เปลี่ยนแผน','focus'],['งานและรายได้','work'],['ร้านค้าและเสบียง','shop'],['คู่มือโลก','guide']])panelButton(parent,label,id);}
  else paragraph(parent,'วัยเล็กอยู่ภายใต้การดูแลและแสดงอายุเป็นเดือนจนถึง 3 ปี หลังจากนั้นเลือกแนวชีวิตและผ่านครั้งละ 1, 2 หรือ 5 ปี เรื่องสำคัญจะหยุดรอให้เลือก พิธีอายุ 12 ปีเลือกทีละขั้น แผนที่ใช้ดูข้อมูล ส่วนการเดินทางเลือกจากหน้าชีวิต เวลาอัตโนมัติครั้งละ 30 วันหยุดเมื่อซ่อนแท็บหรือเปิดหน้าต่างย่อย ชีวิตอยู่ในหน่วยความจำเท่านั้น รีเฟรชแล้วกลับไปเกิดใหม่');
 };
 const restore=previous?.isConnected?previous:[...document.querySelectorAll('button')].find(b=>(b.getAttribute('aria-label')??b.textContent)===label);
 openPanel(key,titles[key],render,()=>{if(key==='decision')dismissedDecision=decisionKey();if(Game.active)Game.render();},restore);
}
Game.onRestart=showBirth;Game.openPanel=showPanel;
Game.onChange=()=>{
 if(GameState.run.status==='ended'){if(panelKey())closePanel();return;}
 if(panelKey()==='decision'&&!pendingDecision(GameState))closePanel();else refreshPanel();
 const key=decisionKey();if(!manualOpening&&!panelKey()&&GameState.yearly.view==='yearly'&&key&&key!==dismissedDecision)showPanel('decision');
};
document.addEventListener('open-game-panel',e=>showPanel(e.detail));
document.querySelectorAll('[data-view]').forEach(button=>button.onclick=()=>{if(button.dataset.view==='game'){closePanel();if(Game.active)Game.render();}else showPanel(button.dataset.view);});
for(const name of ['pointerdown','keydown'])document.addEventListener(name,e=>{if(e.isTrusted&&Game.active)Game.clock.interact(performance.now());},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)Game.clock.pause(performance.now());else if(Game.active)Game.clock.resume(performance.now());});
window.addEventListener('beforeunload',e=>{if(Game.active&&GameState.run.status==='active'){e.preventDefault();e.returnValue='';}});
window.addEventListener('pagehide',()=>Game.abandon());window.addEventListener('pageshow',e=>{if(e.persisted){Game.abandon();showBirth();}});
showBirth();
