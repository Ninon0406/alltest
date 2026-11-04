import {z} from 'zod';
import {schema,type State} from './state';
const envelope=z.object({format:z.literal('GODSEED_SAVE'),formatVersion:z.literal(1),checksum:z.string().regex(/^[a-f0-9]{64}$/),state:z.unknown()}).strict();
function canonical(value:unknown):string {
 if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';
 if(value!==null&&typeof value==='object')return '{'+Object.entries(value).filter(([,v])=>v!==undefined).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([key,v])=>JSON.stringify(key)+':'+canonical(v)).join(',')+'}';
 return JSON.stringify(value)??'null';
}
async function checksum(state:unknown){const bytes=new TextEncoder().encode(canonical(state));const hash=await crypto.subtle.digest('SHA-256',bytes);return Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join('');}
export async function encodeSave(state:State){const valid=schema.parse(state);return JSON.stringify({format:'GODSEED_SAVE',formatVersion:1,checksum:await checksum(valid),state:valid},null,2);}
export async function decodeSave(text:string){
 if(new TextEncoder().encode(text).length>1_000_000)throw Error('ไฟล์เซฟมีขนาดใหญ่เกินไป');
 let raw:unknown;try{raw=JSON.parse(text);}catch{throw Error('อ่านไฟล์เซฟไม่ได้');}
 if(raw!==null&&typeof raw==='object'&&'format' in raw){
  const parsed=envelope.safeParse(raw);if(!parsed.success)throw Error('รูปแบบไฟล์เซฟนี้ยังไม่รองรับ');
  if(await checksum(parsed.data.state)!==parsed.data.checksum)throw Error('ไฟล์เซฟเปลี่ยนแปลงหรือเสียหาย ตรวจสอบความถูกต้องไม่ผ่าน');
  const state=schema.safeParse(parsed.data.state);if(!state.success)throw Error('ข้อมูลภายในเซฟไม่ถูกต้อง');
  return {state:state.data,legacy:false};
 }
 const legacy=schema.safeParse(raw);if(!legacy.success)throw Error('ไฟล์เซฟรุ่นเดิมไม่ถูกต้อง');
 return {state:legacy.data,legacy:true};
}
