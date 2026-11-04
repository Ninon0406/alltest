import type {State} from '../engine/state';
import {encodeSave} from '../engine/save-file';
export async function downloadSave(state:State){
 const url=URL.createObjectURL(new Blob([await encodeSave(state)],{type:'application/json'}));
 try{const a=document.createElement('a');a.href=url;a.download='godseed-save.json';document.body.append(a);a.click();a.remove();}finally{setTimeout(()=>URL.revokeObjectURL(url),1000);}
}
type Controls={current:State|null;recovery:State|null;archives:State[];busy:boolean;button:(label:string,fn:()=>void,disabled?:boolean)=>HTMLButtonElement;restore:(s:State)=>void;importFile:(file:File)=>void;download:(s:State)=>void};
export function saveControls(parent:HTMLElement,options:Controls){
 const {current,recovery,archives,busy,button,restore,importFile,download}=options;
 parent.append(button('ส่งออกเซฟ',()=>{if(current)download(current);},!current));
 parent.append(button('กู้สำเนาก่อนหน้า',()=>{if(recovery)restore(recovery);},!recovery));
 const label=document.createElement('label');label.textContent='นำเข้าเซฟจากไฟล์';const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.disabled=busy;input.setAttribute('aria-label','นำเข้าเซฟ');input.onchange=()=>{const file=input.files?.[0];if(file)importFile(file);};label.append(input);parent.append(label);
 if(archives.length){const heading=document.createElement('h2');heading.textContent='เรื่องราวที่เก็บไว้ก่อนเริ่มใหม่';parent.append(heading);for(const run of archives){
  const line=document.createElement('p');line.textContent=`${run.name} · วันที่ ${Math.floor(run.ticks/3)+1} · ทางเลือก ${run.choices.length} ครั้ง`;parent.append(line,button(`เล่นต่อเรื่องราวของ ${run.name}`,()=>restore(run)),button(`ส่งออกเรื่องราวของ ${run.name}`,()=>download(run)));
 }}
}
