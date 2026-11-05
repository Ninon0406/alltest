import {craftingPanel,spellbookPanel} from './ui/alchemy-panel';
import type {BookFilter} from './systems/alchemy';
import './styles/game.css';
import {fresh,type State} from './engine/state';import {StorageSession} from './engine/storage-session';import {decodeSave} from './engine/save-file';import {saveControls,downloadSave} from './ui/save-controls';
import {scenes,type Choice} from './content/story';import {choiceAvailability,nextHint,rememberedLines} from './systems/story';import {memoryPanel} from './ui/memory-panel';import {choose,craft,equip,unequip,fight} from './systems/game';import {byId,itemNames} from './systems/spells';import {startWorld} from './scenes/world';import {combatPanel} from './ui/combat-panel';
const bookFilter:BookFilter={core:'',kind:'',mp:''};
const app=document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML=`<header><a class="brand" href="./">GODSEED<span>THE WORLD THAT REMEMBERS</span></a><span class="edition">เมล็ดแรก · ฉบับทดลอง 0.4.2</span><button id="motion" aria-pressed="false">ลดการเคลื่อนไหว</button></header><aside id="storage" role="status" aria-live="polite" hidden></aside><p id="render-notice" role="status" hidden></p><main><section class="world"><div id="canvas" role="img" aria-label="โลกพิกเซลของ GODSEED"></div><span class="chapter">บทที่หนึ่ง · หมู่บ้านที่ลืมเสียงเพลง</span><div id="hud"></div><button id="skip" hidden>ข้ามแอนิเมชัน</button></section><section class="desk"><nav id="nav" aria-label="เมนูเกม"></nav><div id="content"></div><p id="notice" role="status" aria-live="polite"></p></section></main><footer>ทุกทางเลือกทิ้งความทรงจำไว้ · บันทึกบนอุปกรณ์นี้ · ไม่ใช้ AI ภายนอก</footer>`;
const {world,game}=startWorld(document.querySelector('#canvas')!);const storage=new StorageSession();let state:State|null=null,busy=true,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,screen='title',saved:State|null=null,titleName='';let skip:()=>void=()=>{};
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
function showState(next:State){state=next;saved=next;screen=next.battle?'battle':'story';world.show(next);}
function controls(){saveControls(content,{current:state||saved,recovery:storage.recovery,archives:storage.archives,busy:busy||!world.ready,button,
 restore:next=>{void exclusive(async()=>{if(!confirm('แทนที่เซฟปัจจุบันด้วยความทรงจำที่เลือก?'))return;await storage.archiveCurrent();await storage.persist(next);showState(next);});},
 download:next=>{void exclusive(()=>downloadSave(next));},
 importFile:file=>{void exclusive(async()=>{
  if(file.size>1_000_000)throw Error('ไฟล์เซฟมีขนาดใหญ่เกินไป');
  const result=await decodeSave(await file.text());
  if(!confirm((result.legacy?'ไฟล์เซฟรุ่นเก่ายังไม่มีข้อมูลตรวจสอบความถูกต้อง ':'ตรวจสอบไฟล์เซฟแล้ว ')+ 'นำเข้าและแทนที่เซฟปัจจุบัน?'))return;
  await storage.archiveCurrent();await storage.persist(result.state);showState(result.state);
 });}
 });}
async function act(fn:()=>State,cue='talk',spellId?:string,command?:string,target?:'scene'){if(!state)return;const previousScreen=screen;await exclusive(async()=>{
 const previous=state!;const next=fn();
 try{
  const anim=world.action(cue,reduced,spellId?byId[spellId]:undefined,previous,next,command,target);document.querySelector<HTMLButtonElement>('#skip')!.hidden=false;
  await Promise.race([anim,new Promise<void>(resolve=>skip=resolve)]);
 }finally{
  world.finishAction();
  document.querySelector<HTMLButtonElement>('#skip')!.hidden=true;
 }
 await storage.persist(next);
 if(world.ready&&(next.scene!==previous.scene||!!next.battle!==!!previous.battle))world.cameras.main.fadeIn(reduced?60:350,20,48,40);
 showState(next);if(previousScreen==='book'&&!next.battle)screen='book';
 if(previous.battle&&!next.battle)msg(next.journal.at(-1)||'จบการต่อสู้แล้ว');

 });}
function render(){
 content.setAttribute('aria-busy',String(busy));
 const banner=document.querySelector<HTMLElement>('#storage')!;banner.replaceChildren();banner.hidden=!storage.warning;
 if(storage.warning){banner.append(el('p',storage.warning));if(state||saved){banner.append(button('ดาวน์โหลดสำเนาเซฟ',()=>{void exclusive(()=>downloadSave((state||saved)!));}));if(storage.memory)banner.append(button('ลองบันทึกลงอุปกรณ์อีกครั้ง',()=>{void exclusive(async()=>{await storage.retry();msg('บันทึกลงอุปกรณ์แล้ว');});}));}}
 const nav=document.querySelector('#nav')!;nav.replaceChildren();const hud=document.querySelector('#hud')!;hud.textContent=state?`${state.name} · HP ${state.hp}/100 · MP ${state.mp}/40 · ประสบการณ์ ${state.xp} · วันที่ ${Math.floor(state.ticks/3)+1} ${['เช้า','บ่าย','เย็น'][state.ticks%3]}`:'โลกที่จดจำทุกทางเลือกของคุณ';
 if(state){for(const [id,label] of [['story','เรื่องราว'],['inventory','กระเป๋า'],['craft','ผสมเวท'],['book','สมุดเวท'],['journal','ความทรงจำ'],['save','บันทึก']])nav.append(button(label,()=>{screen=id;render();},!!state.battle&&id!=='story'&&id!=='save'));}
 if(!state){section('โลกกำลังรอเรื่องราวของคุณ','ใต้เงาต้นเมล็ด มีบทเพลงหนึ่งกำลังเลือนหาย และมีใครบางคนรอให้คุณช่วยฟัง');const label=el('label','ชื่อผู้มาเยือน');const name=el('input');name.placeholder='อาเรน';name.maxLength=30;name.value=titleName;name.disabled=busy||!world.ready;name.oninput=()=>titleName=name.value;label.append(name);content.append(label,button('เริ่มการเดินทาง',()=>{const playerName=name.value;void exclusive(async()=>{
 if(saved&&!confirm('เริ่มเรื่องราวใหม่? จะเก็บเซฟเดิมเป็นสำเนาไว้'))return;
 await storage.archiveCurrent();const next=fresh(playerName,Date.now()%1000000000);await storage.persist(next);showState(next);
 });}),button('เล่นต่อจากความทรงจำ',()=>{if(saved&&!busy){state=saved;screen='story';world.show(state);render();}},!saved));
 if(busy||!world.ready)content.append(el('p','กำลังเปิดโลกแห่งความทรงจำ…'));
 controls();return;}
 const s=state;
 if(screen==='save'){section('ความทรงจำบนอุปกรณ์',storage.memory?'กำลังเล่นชั่วคราว กรุณาส่งออกไฟล์ก่อนปิดหรือรีโหลดหน้า':'บันทึกอัตโนมัติหลังทุกการกระทำ ส่งออกไฟล์ที่ตรวจความถูกต้องได้ หรือกู้ความทรงจำก่อนหน้า');controls();return;}
 if(screen==='inventory'){section('กระเป๋าของผู้มาเยือน','วัตถุดิบสามชนิด สร้างคาถาที่เป็นของคุณ ของภารกิจจะไม่ถูกใช้ในการผสม');for(const [id,n] of Object.entries(s.inventory).filter(([,n])=>n>0)){content.append(el('p',`${itemNames[id]||id} × ${n}`));}return;}
 if(screen==='journal'){memoryPanel(content,s);return;}
 if(screen==='craft'){section('โต๊ะผสมเมล็ดเวท','แก่นธาตุ + รูปแบบ + ตัวปรับ ใช้อย่างละหนึ่งชิ้นเมื่อค้นพบครั้งแรก ร่ายครั้งถัดไปใช้ MP');craftingPanel(content,s,button,(c,f,m)=>void act(()=>craft(s,c,f,m),'craft',`SPELL_${c}_${f}_${m}`));return;}
 if(screen==='book'){section('สมุดเวทมนตร์',`${s.known.length} สูตรที่ค้นพบ · ติดตั้งได้ 4 ช่อง · เปลี่ยนเวทได้เมื่อนอกการต่อสู้`);spellbookPanel(content,s,button,(id,slot)=>void act(()=>equip(s,id,slot)),slot=>void act(()=>unequip(s,slot)),bookFilter);return;}
 if(s.battle){screen='battle';combatPanel(content,s,button,(id,cue,spellId)=>void act(()=>fight(s,id),cue,spellId,id));return;}
 const scene=scenes[s.scene];section(scene.title,scene.text);if(s.flags.slice_complete&&s.scene==='S02_HUB')content.append(el('p','คุณนำโน้ตจากป่ากลับมาแล้ว — จบช่วงทดลองเมล็ดแรก! ยังสำรวจ ผสมเวท และฝึกสู้ต่อได้ ยังมีหอสมุดของไอรากับลำธารให้ตามทำนองต่อ เทศกาลและบทสรุปทั้งสามยังไม่เปิดในฉบับนี้'));
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
game.events.on('art-warning',(message:string)=>{const notice=document.querySelector<HTMLElement>('#render-notice')!;notice.hidden=false;notice.textContent=message;});
applyMotion();
void storage.initialize().then(()=>{saved=storage.current;busy=false;render();});render();
