import type {State} from '../engine/state';
export function downloadSave(file:{name:string;text:string}){
 const url=URL.createObjectURL(new Blob([file.text],{type:'application/json'}));
 const a=document.createElement('a');a.href=url;a.download=file.name;document.body.append(a);a.click();a.remove();
 // Safari may still be presenting a preview; do not revoke its Blob immediately.
 const cleanup=()=>URL.revokeObjectURL(url);setTimeout(cleanup,60_000);window.addEventListener('pagehide',cleanup,{once:true});
}
type Controls={current:State|null;busy:boolean;canConfirm:boolean;button:(label:string,fn:()=>void,disabled?:boolean)=>HTMLButtonElement;importFile:(file:File)=>void;download:()=>void;confirm:()=>void};
export function saveControls(parent:HTMLElement,options:Controls){
 const {current,busy,canConfirm,button,importFile,download,confirm}=options;
 parent.append(button('บันทึกเกมเป็นไฟล์',download,!current));
 if(canConfirm)parent.append(button('ยืนยันว่าเก็บไฟล์แล้ว',confirm));
 const label=document.createElement('label');label.textContent='โหลดเกมจากไฟล์';const input=document.createElement('input');input.type='file';input.accept='.godseed,.json,application/json';input.disabled=busy;input.hidden=true;input.setAttribute('aria-label','โหลดเกมจากไฟล์');input.onchange=()=>{const file=input.files?.[0];input.value='';if(file)importFile(file);};label.append(input);parent.append(label,button('โหลดเกมจากไฟล์',()=>input.click()));
 const help=document.createElement('p');help.className='save-help';help.textContent=busy?'กำลังดำเนินเหตุการณ์ จึงยังบันทึกหรือโหลดไฟล์ไม่ได้':'เกมเก็บความคืบหน้าใน RAM เท่านั้น รีเฟรชหรือปิดเว็บแล้วต้องเลือกไฟล์เพื่อเล่นต่อ บน iPhone/iPad หากเปิดหน้าตัวอย่าง ให้ใช้ แชร์ → บันทึกไปยังแอปไฟล์ บน Android/คอมพิวเตอร์ให้ตรวจ Downloads';parent.append(help);
}
