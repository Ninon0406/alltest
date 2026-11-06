import {z} from 'zod';
import {schema,type State} from './state';
import {scenes} from '../content/story';
import {encounters} from '../content/encounters';
import {byId,itemNames} from '../systems/spells';
export const SAVE_LIMIT=1_000_000;
export const GAME_VERSION='0.10.0';
const digest=z.string().regex(/^[a-f0-9]{64}$/);
const oldEnvelope=z.object({format:z.literal('GODSEED_SAVE'),formatVersion:z.literal(1),checksum:digest,state:z.unknown()}).strict();
const fileSchema=z.object({format:z.literal('GODSEED_SAVE'),formatVersion:z.literal(2),gameVersion:z.string().regex(/^\d+\.\d+\.\d+$/),exportedAt:z.iso.datetime(),chapterId:z.literal('CHAPTER_1'),checkpoint:z.object({sceneId:z.string(),storyNodeId:z.string(),kind:z.enum(['story_choice','battle_turn'])}).strict(),checksum:digest,state:z.unknown()}).strict();
const choiceIds=new Set(Object.values(scenes).flatMap(s=>s.choices.map(c=>c.id)));
const npcIds=new Set(['LUMI','MAREN','KORO','EIRA','PIP']);
const statuses=new Set(['SEAR','WET','SWIRL','GROUNDED','GLEAM','VEIL','ROOTED','RESONANCE','RUNE_WARD']);
function canonical(value:unknown):string {
 if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';
 if(value!==null&&typeof value==='object')return '{'+Object.entries(value).filter(([,v])=>v!==undefined).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([key,v])=>JSON.stringify(key)+':'+canonical(v)).join(',')+'}';
 return JSON.stringify(value)??'null';
}
async function checksum(value:unknown){const bytes=new TextEncoder().encode(canonical(value));const hash=await crypto.subtle.digest('SHA-256',bytes);return Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join('');}
export function validateSaveState(value:unknown):State {
 const result=schema.safeParse(value);if(!result.success)throw Error('ข้อมูลภายในเซฟไม่ถูกต้อง หรือเป็นเวอร์ชันที่ยังไม่รองรับ');
 const s=result.data;
 if(!Object.hasOwn(scenes,s.scene)||!Object.hasOwn(scenes,s.recoveryScene)||s.battle&&(!Object.hasOwn(scenes,s.battle.next)||!Object.hasOwn(scenes,s.battle.checkpoint)))throw Error('เซฟอ้างอิงฉากที่ไม่มีในเกม');
 if(Object.keys(s.inventory).some(id=>!Object.hasOwn(itemNames,id)))throw Error('เซฟอ้างอิงไอเทมที่ไม่มีในเกม');
 if(s.known.some(id=>!Object.hasOwn(byId,id))||s.equipped.some(id=>!Object.hasOwn(byId,id)))throw Error('เซฟอ้างอิงเวทที่ไม่มีในเกม');
 if(s.choices.some(id=>!choiceIds.has(id))||Object.keys(s.gathered).some(id=>!choiceIds.has(id)))throw Error('เซฟอ้างอิงตัวเลือกที่ไม่มีในเกม');
 if(Object.keys(s.trust).some(id=>!npcIds.has(id)))throw Error('เซฟอ้างอิง NPC ที่ไม่มีในเกม');
 if(s.rewarded.some(id=>!id.startsWith('win:')||!Object.hasOwn(encounters,id.slice(4))))throw Error('เซฟอ้างอิงผลการต่อสู้ที่ไม่มีในเกม');
 if(s.battle&&[...Object.keys(s.battle.status),...Object.keys(s.battle.playerStatus)].some(id=>!statuses.has(id)))throw Error('เซฟมีสถานะต่อสู้ที่ไม่รองรับ');
 return s;
}
export async function encodeSave(state:State){
 const valid=validateSaveState(state),body={format:'GODSEED_SAVE',formatVersion:2,gameVersion:GAME_VERSION,exportedAt:new Date().toISOString(),chapterId:'CHAPTER_1',checkpoint:{sceneId:valid.scene,storyNodeId:valid.scene,kind:valid.battle?'battle_turn':'story_choice'},state:valid};
 const text=JSON.stringify({...body,checksum:await checksum(body)},null,2);if(new TextEncoder().encode(text).length>SAVE_LIMIT)throw Error('ข้อมูลเซฟมีขนาดใหญ่เกินไป');return text;
}
export async function decodeSave(text:string){
 if(new TextEncoder().encode(text).length>SAVE_LIMIT)throw Error('ไฟล์เซฟมีขนาดใหญ่เกินไป');
 let raw:unknown;try{raw=JSON.parse(text);}catch{throw Error('อ่านไฟล์เซฟไม่ได้ กรุณาเลือกไฟล์ GODSEED');}
 if(raw!==null&&typeof raw==='object'&&'format' in raw){
  if('formatVersion' in raw&&raw.formatVersion===1){const parsed=oldEnvelope.safeParse(raw);if(!parsed.success)throw Error('รูปแบบไฟล์เซฟรุ่นเดิมไม่ถูกต้อง');if(await checksum(parsed.data.state)!==parsed.data.checksum)throw Error('ไฟล์เซฟเปลี่ยนแปลงหรือเสียหาย ตรวจสอบความถูกต้องไม่ผ่าน');return {state:validateSaveState(parsed.data.state),legacy:true};}
  const parsed=fileSchema.safeParse(raw);if(!parsed.success)throw Error('รูปแบบหรือเวอร์ชันไฟล์เซฟนี้ยังไม่รองรับ');
  const {checksum:expected,...body}=parsed.data;if(await checksum(body)!==expected)throw Error('ไฟล์เซฟเปลี่ยนแปลงหรือเสียหาย ตรวจสอบความถูกต้องไม่ผ่าน');
  const a=body.gameVersion.split('.').map(Number),b=GAME_VERSION.split('.').map(Number);for(let i=0;i<3;i++){if(a[i]>b[i])throw Error('ไฟล์นี้มาจากเกมเวอร์ชันใหม่กว่า กรุณาอัปเดตเกม');if(a[i]<b[i])break;}
  const state=validateSaveState(body.state);if(body.checkpoint.sceneId!==state.scene||body.checkpoint.storyNodeId!==state.scene||body.checkpoint.kind!==(state.battle?'battle_turn':'story_choice'))throw Error('จุดบันทึกไม่สอดคล้องกับข้อมูลเกม');
  return {state,legacy:false};
 }
 return {state:validateSaveState(raw),legacy:true};
}
export async function readSaveFile(file:File){
 if(!/\.(godseed|json)$/i.test(file.name))throw Error('กรุณาเลือกไฟล์ .godseed หรือไฟล์ .json รุ่นเดิม');
 if(file.size>SAVE_LIMIT)throw Error('ไฟล์เซฟมีขนาดใหญ่เกินไป');
 const result=await decodeSave(await file.text());if(!result.legacy&&!/\.godseed$/i.test(file.name))throw Error('ไฟล์รุ่นใหม่ต้องใช้นามสกุล .godseed');return {...result,fileName:file.name.slice(0,80)};
}
