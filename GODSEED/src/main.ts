import './styles/game.css';
import {fresh,type State} from './engine/state';import {StorageSession} from './engine/storage-session';import {decodeSave} from './engine/save-file';import {saveControls,downloadSave} from './ui/save-controls';
import {scenes} from './content/story';import {choose,craft,equip,fight} from './systems/game';import {byId,cores,forms,mods,coreNames,formNames,modNames,itemNames,type Core,type Form,type Mod} from './systems/spells';import {startWorld} from './scenes/world';import {combatPanel} from './ui/combat-panel';
const app=document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML=`<header><a class="brand" href="./">GODSEED<span>THE WORLD THAT REMEMBERS</span></a><span class="edition">เมล็ดแรก · ฉบับทดลอง 0.2.0</span><button id="motion" aria-pressed="false">ลดการเคลื่อนไหว</button></header><aside id="storage" role="status" aria-live="polite" hidden></aside><main><section class="world"><div id="canvas" role="img" aria-label="โลกพิกเซลของ GODSEED"></div><span class="chapter">บทที่หนึ่ง · หมู่บ้านที่ลืมเสียงเพลง</span><div id="hud"></div><button id="skip" hidden>ข้ามแอนิเมชัน</button></section><section class="desk"><nav id="nav" aria-label="เมนูเกม"></nav><div id="content"></div><p id="notice" role="status" aria-live="polite"></p></section></main><footer>ทุกทางเลือกทิ้งความทรงจำไว้ · บันทึกบนอุปกรณ์นี้ · ไม่ใช้ AI ภายนอก</footer>`;
const {world,game}=startWorld(document.querySelector('#canvas')!);const storage=new StorageSession();let state:State|null=null,busy=true,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,screen='title',saved:State|null=null,titleName='';let skip:()=>void=()=>{};
const content=document.querySelector<HTMLDivElement>('#content')!,notice=document.querySelector<HTMLParagraphElement>('#notice')!;
const el=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{const e=document.createElement(tag);if(text)e.textContent=text;return e;};
function msg(s:string){notice.textContent=s;}
function button(text:string,fn:()=>void,disabled=false){const b=el('button',text);b.disabled=busy||disabled;b.onclick=fn;return b;}
function section(title:string,body:string){content.replaceChildren(el('p','เรื่องราวของ '+(state?.name||'ผู้มาเยือน')),el('h1',title),el('p',body));}
async function exclusive(operation:()=>Promise<void>){
 if(busy)return;busy=true;msg('');render();
 try{await operation();}catch(error){msg(error instanceof Error?error.message:'ดำเนินการไม่สำเร็จ');}
 finally{busy=false;render();}
}
function showState(next:State){state=next;saved=next;screen=next.battle?'battle':'story';world.show(next);}
function controls(){saveControls(content,{current:state||saved,recovery:storage.recovery,archives:storage.archives,busy,button,
 restore:next=>{void exclusive(async()=>{if(!confirm('แทนที่เซฟปัจจุบันด้วยความทรงจำที่เลือก?'))return;await storage.archiveCurrent();await storage.persist(next);showState(next);});},
 download:next=>{void exclusive(()=>downloadSave(next));},
 importFile:file=>{void exclusive(async()=>{
  if(file.size>1_000_000)throw Error('ไฟล์เซฟมีขนาดใหญ่เกินไป');
  const result=await decodeSave(await file.text());
  if(!confirm((result.legacy?'ไฟล์เซฟรุ่นเก่ายังไม่มีข้อมูลตรวจสอบความถูกต้อง ':'ตรวจสอบไฟล์เซฟแล้ว ')+ 'นำเข้าและแทนที่เซฟปัจจุบัน?'))return;
  await storage.archiveCurrent();await storage.persist(result.state);showState(result.state);
 });}
 });}
async function act(fn:()=>State,cue='talk',spellId?:string){if(!state)return;await exclusive(async()=>{
 const previous=state!;const next=fn();
 try{
  const anim=world.action(cue,reduced,spellId?byId[spellId]:undefined);document.querySelector<HTMLButtonElement>('#skip')!.hidden=false;
  await Promise.race([anim,new Promise<void>(resolve=>skip=resolve)]);
 }finally{
  world.finishAction();
  document.querySelector<HTMLButtonElement>('#skip')!.hidden=true;
 }
 await storage.persist(next);
 if(world.ready&&(next.scene!==previous.scene||!!next.battle!==!!previous.battle))world.cameras.main.fadeIn(reduced?60:350,20,48,40);
 showState(next);
 if(previous.battle&&!next.battle)msg(next.journal.at(-1)||'จบการต่อสู้แล้ว');
 world.react(previous,next,reduced);
 });}
function render(){
 content.setAttribute('aria-busy',String(busy));
 const banner=document.querySelector<HTMLElement>('#storage')!;banner.replaceChildren();banner.hidden=!storage.warning;
 if(storage.warning){banner.append(el('p',storage.warning));if(state||saved){banner.append(button('ดาวน์โหลดสำเนาเซฟ',()=>{void exclusive(()=>downloadSave((state||saved)!));}));if(storage.memory)banner.append(button('ลองบันทึกลงอุปกรณ์อีกครั้ง',()=>{void exclusive(async()=>{await storage.retry();msg('บันทึกลงอุปกรณ์แล้ว');});}));}}
 const nav=document.querySelector('#nav')!;nav.replaceChildren();const hud=document.querySelector('#hud')!;hud.textContent=state?`${state.name} · HP ${state.hp}/100 · MP ${state.mp}/40 · ประสบการณ์ ${state.xp} · วันที่ ${Math.floor(state.ticks/3)+1} ${['เช้า','บ่าย','เย็น'][state.ticks%3]}`:'โลกที่จดจำทุกทางเลือกของคุณ';
 if(state){for(const [id,label] of [['story','เรื่องราว'],['inventory','กระเป๋า'],['craft','ผสมเวท'],['book','สมุดเวท'],['journal','ความทรงจำ'],['save','บันทึก']])nav.append(button(label,()=>{screen=id;render();},!!state.battle&&id!=='story'&&id!=='save'));}
 if(!state){section('โลกกำลังรอเรื่องราวของคุณ','ใต้เงาต้นเมล็ด มีบทเพลงหนึ่งกำลังเลือนหาย และมีใครบางคนรอให้คุณช่วยฟัง');const label=el('label','ชื่อผู้มาเยือน');const name=el('input');name.placeholder='อาเรน';name.maxLength=30;name.value=titleName;name.disabled=busy;name.oninput=()=>titleName=name.value;label.append(name);content.append(label,button('เริ่มการเดินทาง',()=>{const playerName=name.value;void exclusive(async()=>{
 if(saved&&!confirm('เริ่มเรื่องราวใหม่? จะเก็บเซฟเดิมเป็นสำเนาไว้'))return;
 await storage.archiveCurrent();const next=fresh(playerName,Date.now()%1000000000);await storage.persist(next);showState(next);
 });}),button('เล่นต่อจากความทรงจำ',()=>{if(saved&&!busy){state=saved;screen='story';world.show(state);render();}},!saved));
 if(busy)content.append(el('p','กำลังอ่านความทรงจำ…'));
 controls();return;}
 const s=state;
 if(screen==='save'){section('ความทรงจำบนอุปกรณ์',storage.memory?'กำลังเล่นชั่วคราว กรุณาส่งออกไฟล์ก่อนปิดหรือรีโหลดหน้า':'บันทึกอัตโนมัติหลังทุกการกระทำ ส่งออกไฟล์ที่ตรวจความถูกต้องได้ หรือกู้ความทรงจำก่อนหน้า');controls();return;}
 if(screen==='inventory'){section('กระเป๋าของผู้มาเยือน','วัตถุดิบสามชนิด สร้างคาถาที่เป็นของคุณ ของภารกิจจะไม่ถูกใช้ในการผสม');for(const [id,n] of Object.entries(s.inventory).filter(([,n])=>n>0)){content.append(el('p',`${itemNames[id]||id} × ${n}`));}return;}
 if(screen==='journal'){section('โลกจดจำ','ทุกสิ่งที่ได้ฟังและทุกมือที่ได้ยื่นออกไป');content.append(el('p',Object.entries(s.trust).map(([n,v])=>`${({LUMI:'ลูมิ',MAREN:'มาเรน',KORO:'คุโร',PIP:'พิพ'} as Record<string,string>)[n]||n}: ความไว้วางใจ ${v}`).join(' · ')));for(const line of s.journal.slice(-30))content.append(el('p',line));return;}
 if(screen==='craft'){section('โต๊ะผสมเมล็ดเวท','แก่นธาตุ + รูปแบบ + ตัวปรับ ใช้อย่างละหนึ่งชิ้นเมื่อค้นพบครั้งแรก ร่ายครั้งถัดไปใช้ MP');
 const select=(label:string,values:readonly string[],names:string[],prefix:string,selected:string)=>{const l=el('label',label),sel=el('select');sel.setAttribute('aria-label',label);values.forEach((v,i)=>{const op=el('option',`${names[i]} · มี ${s.inventory[prefix+v]||0}`);op.value=v;sel.append(op);});sel.value=selected;l.append(sel);content.append(l);return sel;};
 const c=select('แก่นธาตุ',cores,coreNames,'CORE_','WIND'),f=select('รูปแบบ',forms,formNames,'FORM_','ORB'),m=select('ตัวปรับ',mods,modNames,'MOD_','SEEK');
 content.append(button('ผสมและค้นพบเวท',()=>void act(()=>craft(s,c.value as Core,f.value as Form,m.value as Mod),'cast')));return;}
 if(screen==='book'){section('สมุดเวทมนตร์',`${s.known.length} สูตรที่ค้นพบ · ติดตั้งได้ 4 ช่อง · เปลี่ยนเวทได้เมื่อนอกการต่อสู้`);for(let i=0;i<4;i++)content.append(el('p',`ช่อง ${i+1}: ${byId[s.equipped[i]]?.name||'ว่าง'}`));for(const id of s.known){const sp=byId[id];content.append(el('h2',sp.name),el('p',`MP ${sp.mp} · พลัง ${sp.power} · ${sp.heal?'เยียวยา '+sp.heal:sp.shield?'โล่ '+sp.shield:'โจมตี '+sp.hits+' ครั้ง'}`));for(let i=0;i<4;i++)content.append(button(`ติดตั้ง ${sp.name} ช่อง ${i+1}`,()=>void act(()=>equip(s,id,i)),s.equipped.includes(id)||i>s.equipped.length));}return;}
 if(s.battle){screen='battle';combatPanel(content,s,button,(id,cue,spellId)=>void act(()=>fight(s,id),cue,spellId));return;}
 const scene=scenes[s.scene];section(scene.title,scene.text);if(s.flags.slice_complete&&s.scene==='S02_HUB')content.append(el('p','คุณนำโน้ตจากป่ากลับมาแล้ว — จบช่วงทดลองเมล็ดแรก! ยังสำรวจ ผสมเวท และฝึกสู้ต่อได้ เทศกาลกับบทสรุปทั้งสามจะมาในรอบถัดไป'));
 if(s.flags.lumi_helped&&s.scene==='S02_HUB')content.append(el('p','ลูมิโบกมือ: “หนูรู้แล้วว่าถ้าหาไม่เจอ ก็ลองฟังให้ดีกว่าเดิม!”'));
 const choices=el('div');choices.className='choices';for(const c of scene.choices){const locked=!!c.requires&&!s.flags[c.requires];choices.append(button(c.label+(locked?' · '+(c.lockedHint||'คุยกับคุโรก่อน'):''),()=>{if(c.route){screen='craft';render();}else void act(()=>choose(s,c.id),c.cue);},locked));}content.append(choices);
}
document.querySelector<HTMLButtonElement>('#skip')!.onclick=()=>skip();document.querySelector<HTMLButtonElement>('#motion')!.onclick=(event)=>{reduced=!reduced;world.motion=!reduced;(event.currentTarget as HTMLButtonElement).setAttribute('aria-pressed',String(reduced));};
game.events.on('world-ready',()=>{world.motion=!reduced;world.show(state);});
void storage.initialize().then(()=>{saved=storage.current;busy=false;render();});render();
