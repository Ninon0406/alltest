import type {State} from '../engine/state';
import {byId,cores,forms,mods,coreNames,formNames,modNames,itemNames,type Core,type Form,type Mod} from '../systems/spells';
import {recipePreview,filterKnown,type BookFilter} from '../systems/alchemy';
type Button=(label:string,fn:()=>void,disabled?:boolean)=>HTMLButtonElement;
const el=(tag:string,text:string)=>{const node=document.createElement(tag);node.textContent=text;return node;};
function select(host:HTMLElement,label:string,values:readonly string[],names:string[]){const wrap=el('label',label),input=document.createElement('select');input.setAttribute('aria-label',label);values.forEach((v,i)=>{const option=document.createElement('option');option.value=v;option.textContent=names[i];input.append(option);});wrap.append(input);host.append(wrap);return input;}
export function craftingPanel(host:HTMLElement,s:State,button:Button,confirm:(c:Core,f:Form,m:Mod)=>void){
 const c=select(host,'แก่นธาตุ',cores,coreNames.map((n,i)=>`${n} · มี ${s.inventory['CORE_'+cores[i]]||0}`));c.value='WIND';
 const f=select(host,'รูปแบบ',forms,formNames.map((n,i)=>`${n} · มี ${s.inventory['FORM_'+forms[i]]||0}`));
 const m=select(host,'ตัวปรับ',mods,modNames.map((n,i)=>`${n} · มี ${s.inventory['MOD_'+mods[i]]||0}`));m.value='SEEK';
 const preview=document.createElement('section');preview.className='recipe-preview';preview.setAttribute('aria-label','ตัวอย่างสูตร');preview.setAttribute('role','status');
 const submit=button('ผสมและค้นพบเวท',()=>confirm(c.value as Core,f.value as Form,m.value as Mod));
 // The panel can update during an in-flight transaction, but never release its lock.
 const locked=submit.disabled;c.disabled=f.disabled=m.disabled=locked;
 const update=()=>{const p=recipePreview(s,c.value as Core,f.value as Form,m.value as Mod);preview.replaceChildren(el('h2',p.title),el('p',p.detail));if(p.missing.length)preview.append(el('p','ขาด: '+p.missing.map(id=>itemNames[id]).join(' · ')));submit.disabled=locked||!p.ready;};
 c.onchange=f.onchange=m.onchange=update;host.append(preview,submit);update();
}
export function spellbookPanel(host:HTMLElement,s:State,button:Button,install:(id:string,slot:number)=>void,remove:(slot:number)=>void,filter:BookFilter){
 host.append(el('p','ถอดเวทแล้วช่องที่เหลือจะเลื่อนขึ้น สูตรที่ค้นพบยังอยู่ครบ'));
 const slots=document.createElement('section');slots.setAttribute('aria-label','ช่องเวทที่ติดตั้ง');
 for(let i=0;i<4;i++){slots.append(el('p',`ช่อง ${i+1}: ${byId[s.equipped[i]]?.name||'ว่าง'}`));if(s.equipped[i])slots.append(button(`ถอดเวทช่อง ${i+1}`,()=>remove(i)));}host.append(slots);
 const controls=document.createElement('div');controls.className='book-filters';host.append(controls);
 const c=select(controls,'กรองธาตุ',['',...cores],['ทุกธาตุ',...coreNames]);c.value=filter.core;
 const k=select(controls,'กรองประเภท',['','attack','heal','shield'],['ทุกประเภท','โจมตี','เยียวยา','โล่ป้องกัน']);k.value=filter.kind;
 const mp=select(controls,'กรอง MP',['','10','14','20'],['ทุกค่า MP','ไม่เกิน 10','ไม่เกิน 14','ไม่เกิน 20']);mp.value=filter.mp;
 const list=document.createElement('section');list.setAttribute('aria-label','เวทที่ค้นพบ');host.append(list);
 const update=()=>{filter.core=c.value;filter.kind=k.value;filter.mp=mp.value;const spells=filterKnown(s,filter);list.replaceChildren(el('p',`พบ ${spells.length} จาก ${s.known.length} สูตรที่ค้นพบ`));if(!spells.length)list.append(el('p','ยังไม่มีเวทที่ตรงกับตัวกรอง'));for(const sp of spells){list.append(el('h2',sp.name),el('p',`MP ${sp.mp} · ${sp.heal?'ฟื้น HP '+sp.heal:sp.shield?'สร้างโล่ '+sp.shield:'พลัง '+sp.power+' · '+sp.hits+' ครั้ง'}`));for(let i=0;i<4;i++)list.append(button(`ติดตั้ง ${sp.name} ช่อง ${i+1}`,()=>install(sp.id,i),s.equipped.includes(sp.id)||i>s.equipped.length));}};
 c.onchange=k.onchange=mp.onchange=update;update();
}
