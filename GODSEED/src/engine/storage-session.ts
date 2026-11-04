import * as disk from './save';
import {schema,type State} from './state';

// Storage failures never invent a successful disk save. Gameplay can explicitly
// continue in memory; only a successful retry restores the persistent indicator.
export class StorageSession {
 current:State|null=null;
 recovery:State|null=null;
 memory=false;
 warning='';
 archives:State[]=[];
 constructor(private backend=disk){}
 async initialize(){
  try{const result=await this.backend.inspect();this.current=result.current;this.recovery=result.backup;this.archives=result.archives;if(result.corrupt)this.warning='เซฟหลักเสียหาย กรุณากู้สำเนาก่อนหน้าหรือนำเข้าไฟล์ เซฟเดิมยังไม่ถูกลบ';}
  catch{this.useMemory();}
 }
 private useMemory(){this.memory=true;this.warning='เล่นชั่วคราวในหน่วยความจำ — ปิดหรือรีโหลดหน้าแล้วความคืบหน้าอาจหาย กรุณาดาวน์โหลดสำเนาเซฟ';}
 async persist(state:State){
  const next=schema.parse(state);
  if(!this.memory){try{await this.backend.save(next);}catch{this.useMemory();}}
  if(this.current&&JSON.stringify(this.current)!==JSON.stringify(next))this.recovery=structuredClone(this.current);
  this.current=next;
  if(!this.memory)this.warning='';
 }
 async archiveCurrent(){
  if(!this.current)return;
  if(!this.memory){try{await this.backend.archive(this.current);}catch{this.useMemory();}}
  this.archives=[...this.archives.filter(s=>s.runId!==this.current!.runId),structuredClone(this.current)];this.recovery=structuredClone(this.current);
 }
 async retry(){
  if(!this.current)throw Error('ยังไม่มีความทรงจำให้บันทึก');
  for(const archived of this.archives)await this.backend.archive(archived);
  await this.backend.save(this.current);
  const result=await this.backend.inspect();
  this.recovery=result.backup;this.archives=result.archives;this.memory=false;this.warning='';
 }
}
