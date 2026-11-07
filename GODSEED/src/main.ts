import {craftingPanel,spellbookPanel} from './ui/alchemy-panel';
import type {BookFilter} from './systems/alchemy';
import {lifePathsPanel} from './ui/life-paths-panel';
import './styles/game.css';
import {fresh,type State} from './engine/state';import {ManualSession} from './engine/manual-session';import {readSaveFile} from './engine/save-file';import {saveControls,downloadSave} from './ui/save-controls';
import {scenes,type Choice} from './content/story';import {choiceAvailability,nextHint,rememberedLines} from './systems/story';import {memoryPanel} from './ui/memory-panel';import {choose,craft,equip,unequip,fight} from './systems/game';import {byId,itemNames} from './systems/spells';import {startWorld} from './scenes/world';import {combatPanel} from './ui/combat-panel';
const bookFilter:BookFilter={core:'',kind:'',mp:''};
const app=document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML=`<header><a class="brand" href="./">GODSEED<span>THE WORLD THAT REMEMBERS</span></a><span class="edition">เมล็ดแรก · ฉบับทดลอง 0.11.1</span><button id="motion" aria-pressed="false">ลดการเคลื่อนไหว</button></header><aside id="storage" role="status" aria-live="polite" hidden></aside><p id="render-notice" role="status" hidden></p><main><section class="world"><div id="canvas" role="img" aria-label="โลกพิกเซลของ GODSEED"></div><span class="chapter">บทที่หนึ่ง · หมู่บ้านที่ลืมเสียงเพลง</span><div id="hud"></div><button id="skip" hidden>ข้ามแอนิเมชัน</button></section><section class="desk"><nav id="nav" aria-label="เมนูเกม"></nav><div id="content"></div><p id="notice" role="status" aria-live="polite"></p></section></main><footer>ทุกทางเลือกทิ้งความทรงจำไว้ · เซฟเป็นไฟล์ด้วยตัวเอง · ไม่ใช้ AI ภายนอก</footer>`;
const {world,game}=startWorld(document.querySelector('#canvas')!);const session=new ManualSession();let state:State|null=null,busy=true,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,screen='title',titleName='';let skip:()=>void=()=>{};
const content=document.querySelector<HTMLDivElement>('#content')!,notice=document.querySelector<HTMLParagraphElement>('#notice')!;
const el=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{const e=document.createElement(tag);if(text)e.textContent=text;return e;};
function msg(s:string){notice.textContent=s;}
function button(text:string,fn:()=>void,disabled=false){const b=el('button',text);b.disabled=busy||!world.ready||disabled;b.onclick=fn;return b;}
function section(title:string,body:string){content.replaceChildren(el('p','เรื่องราวของ '+(state?.name||'ผู้มาเยือน')),el('h1',title),el('p',body));}
async function exclusive(operation:()=>Promise<void>){
 if(busy||!world.ready)return;busy=true;msg('');render();
 try{await operation();}catch(error){msg(error instanceof Error?error.message:'ดำเนินการไม่สำเร็จ');}
 finally{busy=false;render();}
}
let artNoticeKey='';
function renderArtNotice(){
 const status=world.assetStatus,host=document.querySelector<HTMLElement>('#render-notice')!;
 const key=JSON.stringify([status.loading,status.failed,busy,world.ready]);if(key===artNoticeKey)return;artNoticeKey=key;
 host.hidden=!status.loading&&!status.failed.length;host.replaceChildren();
 if(status.loading){host.append(el('span','กำลังเตรียมภาพสถานที่… โปรดรอสักครู่'));return;}
 if(status.failed.length){host.append(el('span','ภาพบางส่วนโหลดไม่ครบ ใช้ภาพสำรองขณะนี้ คุณยังเล่นและบันทึกเกมได้ '),button('ลองโหลดภาพอีกครั้ง',()=>void exclusive(async()=>{
  await world.prepare(state,true);world.show(state,true);msg(world.assetStatus.failed.length?'ยังโหลดภาพบางส่วนไม่ได้ ลองใหม่ภายหลังได้ ความคืบหน้ายังอยู่ในเกม':'โหลดภาพพร้อมแล้ว ความคืบหน้าในเกมยังอยู่ครบ');
 })));}
}
function showState(next:State,continuity=false){state=next;screen=next.battle?'battle':'story';world.show(next,continuity);}
let pendingImport:Awaited<ReturnType<typeof readSaveFile>>|null=null;
let leaving:'title'|'new'|null=null;
async function exportCurrent(){await exclusive(async()=>{downloadSave(await session.exportFile());msg('ส่งไฟล์ให้เบราว์เซอร์แล้ว โปรดตรวจในแอปไฟล์หรือ Downloads เกมยังยืนยันไม่ได้ว่าอุปกรณ์เก็บไฟล์สำเร็จ');});}
function controls(){saveControls(content,{current:state,busy:busy||!world.ready,canConfirm:false,button,
 download:()=>void exportCurrent(),confirm:()=>{session.confirmExport();msg('คุณยืนยันว่าเก็บไฟล์แล้ว การกระทำครั้งถัดไปต้องบันทึกไฟล์ใหม่');render();},
 importFile:file=>void exclusive(async()=>{pendingImport=await readSaveFile(file);})});}
function begin(){const next=fresh(titleName,Date.now()%1000000000);session.commit(next);showState(next);}
function leave(target:'title'|'new'){
 if(session.dirty){leaving=target;render();return;}
 if(target==='new')begin();else{session.clear();state=null;screen='title';world.show(null);render();}
}
function finishLeaving(){const target=leaving;leaving=null;session.clear();state=null;if(target==='new')begin();else{screen='title';world.show(null);}render();}
async function act(fn:()=>State,cue='talk',spellId?:string,command?:string,target?:'scene'){if(!state)return;const previousScreen=screen;await exclusive(async()=>{
 const previous=state!;const next=fn();
 try{
  const anim=world.action(cue,reduced,spellId?byId[spellId]:undefined,previous,next,command,target);document.querySelector<HTMLButtonElement>('#skip')!.hidden=false;
  await Promise.race([anim,new Promise<void>(resolve=>skip=resolve)]);
 }finally{
  world.finishAction();
  document.querySelector<HTMLButtonElement>('#skip')!.hidden=true;
 }
 await world.prepare(next);
 session.commit(next);
 if(world.ready&&(next.scene!==previous.scene||!!next.battle!==!!previous.battle))world.cameras.main.fadeIn(reduced?60:350,20,48,40);
 showState(next,true);if(previousScreen==='book'&&!next.battle)screen='book';
 if(previous.battle&&!next.battle)msg(next.journal.at(-1)||'จบการต่อสู้แล้ว');

 });}
function render(){
 renderArtNotice();content.setAttribute('aria-busy',String(busy));
 const banner=document.querySelector<HTMLElement>('#storage')!;banner.hidden=!state;banner.textContent=session.dirty?'ยังไม่ได้เก็บความคืบหน้าล่าสุดเป็นไฟล์ · บันทึกก่อนออก':'มีไฟล์ของความคืบหน้านี้แล้ว · เล่นต่อแล้วอย่าลืมบันทึกใหม่';
 banner.dataset.dirty=String(session.dirty);
 if(state&&session.canConfirmExport)banner.append(button('ยืนยันว่าเก็บไฟล์แล้ว',()=>{session.confirmExport();render();msg('คุณยืนยันว่าเก็บไฟล์แล้ว');}));
 const nav=document.querySelector('#nav')!;nav.replaceChildren();const hud=document.querySelector('#hud')!;hud.textContent=state?`${state.name} · HP ${state.hp}/100 · MP ${state.mp}/40 · ประสบการณ์ ${state.xp} · วันที่ ${Math.floor(state.ticks/3)+1} ${['เช้า','บ่าย','เย็น'][state.ticks%3]}`:'โลกที่จดจำทุกทางเลือกของคุณ';
 if(state){for(const [id,label] of [['story','เรื่องราว'],['inventory','กระเป๋า'],['craft','ผสมเวท'],['book','สมุดเวท'],['paths','เส้นทางชีวิต'],['journal','ความทรงจำ'],['save','บันทึก']])nav.append(button(label,()=>{screen=id;render();},!!state.battle&&id!=='story'&&id!=='save'));}
 if(state){if(screen!=='save'&&!leaving&&!pendingImport)nav.append(button('บันทึกเกมเป็นไฟล์',()=>void exportCurrent()));nav.append(button('เมนูหลัก',()=>leave('title')),button('เริ่มเกมใหม่',()=>leave('new')));}
 if(state&&busy)nav.append(el('p','กำลังเตรียมเหตุการณ์ จึงยังบันทึกหรือโหลดไฟล์ไม่ได้'));
 if(leaving||pendingImport)nav.querySelectorAll('button').forEach(b=>b.disabled=true);
 if(pendingImport){const result=pendingImport,loaded=result.state;section('ตรวจสอบไฟล์เซฟก่อนโหลด',`${result.fileName} · ${loaded.name} · บทที่หนึ่ง · ${scenes[loaded.scene].title} · HP ${loaded.hp}/100 · MP ${loaded.mp}/40 · EXP ${loaded.xp} · วันที่ ${Math.floor(loaded.ticks/3)+1} · เวท ${loaded.known.length} สูตร${loaded.battle?' · อยู่ระหว่างเทิร์นต่อสู้':''}${result.legacy?' · ไฟล์รุ่นเดิม จะปรับข้อมูลใน RAM':''}`);
 content.append(el('p','การโหลดจะแทนที่เกมใน RAM ปัจจุบัน หากมีความคืบหน้าที่ยังไม่เก็บไฟล์ให้ยกเลิกและบันทึกก่อน'),button('ยืนยันโหลดไฟล์นี้',()=>void exclusive(async()=>{await world.prepare(loaded);session.load(loaded);pendingImport=null;showState(session.current!);})),button('ยกเลิกการโหลด',()=>{pendingImport=null;render();}));return;}
 if(leaving){section('ก่อนออกจากเรื่องราว','ความคืบหน้าที่ยังไม่ได้บันทึกเป็นไฟล์จะหายไป ต้องการบันทึกก่อนหรือไม่?');content.append(button('บันทึกเกมเป็นไฟล์',()=>void exportCurrent()),button('กลับไปเล่นต่อ',()=>{leaving=null;render();}),button('ออกโดยไม่บันทึก',finishLeaving),el('p','หลังเริ่มดาวน์โหลด ให้ตรวจว่าเก็บไฟล์ไว้แล้วก่อนออก เกมไม่บันทึกให้ลับหลัง'));return;}
 if(!state){section('โลกกำลังรอเรื่องราวของคุณ','ใต้เงาต้นเมล็ด มีบทเพลงหนึ่งกำลังเลือนหาย และมีใครบางคนรอให้คุณช่วยฟัง');const label=el('label','ชื่อผู้มาเยือน');const name=el('input');name.placeholder='อาเรน';name.maxLength=30;name.value=titleName;name.disabled=busy||!world.ready;name.oninput=()=>titleName=name.value;label.append(name);content.append(label,button('เริ่มการเดินทาง',()=>{if(state||busy||!world.ready)return;titleName=name.value;begin();render();}));
 if(busy||!world.ready)content.append(el('p','กำลังเปิดโลกแห่งความทรงจำ…'));
 controls();return;}
 const s=state;
 if(screen==='save'){section('ไฟล์เซฟของคุณ','บันทึกเกมเป็นไฟล์ .godseed ด้วยตัวเอง เลือกไฟล์จากอุปกรณ์เพื่อเล่นต่อ ไม่มีการกู้ความคืบหน้าอัตโนมัติ');controls();return;}
 if(screen==='inventory'){section('กระเป๋าของผู้มาเยือน','วัตถุดิบสามชนิด สร้างคาถาที่เป็นของคุณ ของภารกิจจะไม่ถูกใช้ในการผสม');for(const [id,n] of Object.entries(s.inventory).filter(([,n])=>n>0)){content.append(el('p',`${itemNames[id]||id} × ${n}`));}return;}
 if(screen==='journal'){memoryPanel(content,s);return;}
 if(screen==='paths'){lifePathsPanel(content,s,()=>{screen='story';render();});return;}
 if(screen==='craft'){section('โต๊ะผสมเมล็ดเวท','แก่นธาตุ + รูปแบบ + ตัวปรับ ใช้อย่างละหนึ่งชิ้นเมื่อค้นพบครั้งแรก ร่ายครั้งถัดไปใช้ MP');craftingPanel(content,s,button,(c,f,m)=>void act(()=>craft(s,c,f,m),'craft',`SPELL_${c}_${f}_${m}`));return;}
 if(screen==='book'){section('สมุดเวทมนตร์',`${s.known.length} สูตรที่ค้นพบ · ติดตั้งได้ 4 ช่อง · เปลี่ยนเวทได้เมื่อนอกการต่อสู้`);spellbookPanel(content,s,button,(id,slot)=>void act(()=>equip(s,id,slot)),slot=>void act(()=>unequip(s,slot)),bookFilter);return;}
 if(s.battle){screen='battle';combatPanel(content,s,button,(id,cue,spellId)=>void act(()=>fight(s,id),cue,spellId,id));return;}
 const scene=scenes[s.scene];section(scene.title,scene.text);if(s.flags.slice_complete&&s.scene==='S02_HUB')content.append(el('p','คุณนำโน้ตจากป่ากลับมาแล้ว — จบช่วงทดลองเมล็ดแรก! ยังสำรวจ ผสมเวท และฝึกสู้ต่อได้ หอสมุด ลำธาร ศาลเจ้า และงานเพลงของหมู่บ้านยังมีเรื่องให้ติดตามต่อ'));
 if(s.flags.lumi_helped&&s.scene==='S02_HUB')content.append(el('p','ลูมิโบกมือ: “หนูรู้แล้วว่าถ้าหาไม่เจอ ก็ลองฟังให้ดีกว่าเดิม!”'));
 for(const line of rememberedLines(s,scene))content.append(el('p',line));
 if(scene.id==='S02_HUB'){const hint=el('p',nextHint(s));hint.className='story-hint';content.append(hint);}
 const choices=el('div');choices.className='choices';
 const appendChoice=(host:HTMLElement,c:Choice)=>{
  const available=choiceAvailability(s,c);
  host.append(button(c.label+(!available.enabled?' · '+available.reason:''),()=>{
   if(c.route){screen='craft';render();}
   else void act(()=>choose(s,c.id),c.cue,c.spellCore?s.known.find(id=>byId[id].core===c.spellCore):undefined,c.id,c.target);
  },!available.enabled));
  if(c.daily&&s.gathered[c.id]===Math.floor(s.ticks/3))host.append(el('p','เก็บวัตถุดิบที่นี่แล้ววันนี้ · ยังแวะดูได้ กลับมาเก็บใหม่วันถัดไป'));
 };
 for(const c of scene.choices.filter(c=>!c.group))appendChoice(choices,c);
 content.append(choices);
 const other=scene.choices.filter(c=>c.group==='other');
 if(other.length){const details=el('details');details.className='other-routes';details.append(el('summary','สถานที่อื่น'));const routes=el('div');routes.className='choices';for(const c of other)appendChoice(routes,c);details.append(routes);content.append(details);}

}
document.querySelector<HTMLButtonElement>('#skip')!.onclick=()=>skip();
const motionButton=document.querySelector<HTMLButtonElement>('#motion')!;
function applyMotion(){motionButton.setAttribute('aria-pressed',String(reduced));world.setReduced(reduced);}
motionButton.onclick=()=>{reduced=!reduced;applyMotion();};
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',event=>{reduced=event.matches;applyMotion();});
game.events.on('world-ready',()=>{applyMotion();world.show(state);render();});
game.events.on('art-status',renderArtNotice);
applyMotion();
window.addEventListener('beforeunload',event=>{if(session.dirty){event.preventDefault();event.returnValue='';}});
document.querySelector('.brand')!.addEventListener('click',event=>{event.preventDefault();if(!busy&&world.ready)leave('title');});
busy=false;render();
