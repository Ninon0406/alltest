import {schema,type State} from './state';

// Database/storage version stays 1: existing raw state-v1 records remain readable.
function openDatabase():Promise<IDBDatabase> {
 return new Promise((resolve,reject)=>{
  let settled=false;
  const request=indexedDB.open('godseed-saves',1);
  const fail=(reason:unknown)=>{if(!settled){settled=true;clearTimeout(timer);reject(reason);}};
  const timer=setTimeout(()=>fail(Error('เปิดพื้นที่บันทึกไม่สำเร็จ')),3000);
  request.onblocked=()=>fail(Error('พื้นที่บันทึกถูกเปิดค้างในอีกหน้าต่าง'));
  request.onerror=()=>fail(request.error);
  request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('slots'))request.result.createObjectStore('slots');};
  request.onsuccess=()=>{
   if(settled){request.result.close();return;}
   settled=true;clearTimeout(timer);request.result.onversionchange=()=>request.result.close();resolve(request.result);
  };
 });
}
async function transaction<T>(mode:IDBTransactionMode,work:(store:IDBObjectStore,result:(value:T)=>void)=>void):Promise<T>{
 const conn=await openDatabase();
 try{return await new Promise<T>((resolve,reject)=>{
  const tx=conn.transaction('slots',mode);let value:T;
  tx.oncomplete=()=>resolve(value);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('ยกเลิกการบันทึก'));
  try{work(tx.objectStore('slots'),v=>value=v);}catch(error){tx.abort();reject(error);}
 });}finally{conn.close();}
}
export async function inspect(){
 const raw=await transaction<{current?:unknown;backup?:unknown;archives:unknown[]}>('readonly',(store,result)=>{
  const values:{current?:unknown;backup?:unknown;archives:unknown[]}={archives:[]};
  const cursor=store.openCursor();cursor.onsuccess=()=>{const item=cursor.result;if(item){if(String(item.key).startsWith('archive:'))values.archives.push(item.value);item.continue();}result(values);};
  const current=store.get('current'),backup=store.get('backup');
  current.onsuccess=()=>{values.current=current.result;result(values);};backup.onsuccess=()=>{values.backup=backup.result;result(values);};
 });
 const current=schema.safeParse(raw.current),backup=schema.safeParse(raw.backup);
 return {current:current.success?current.data:null,backup:backup.success?backup.data:null,corrupt:raw.current!==undefined&&!current.success,archives:raw.archives.flatMap(value=>{const parsed=schema.safeParse(value);return parsed.success?[parsed.data]:[];})};
}
export async function save(state:State){
 const valid=schema.parse(state);
 await transaction<void>('readwrite',(store)=>{
  const current=store.get('current');
  current.onsuccess=()=>{
   try{
    const previous=schema.safeParse(current.result);
    if(previous.success&&current.result?.version===1)store.put(current.result,'legacy-v1:'+previous.data.runId);
    // A corrupt primary must never replace a valid recovery copy. Duplicate writes
    // also leave the previous action's backup intact. Both puts share one commit.
    if(previous.success&&JSON.stringify(previous.data)!==JSON.stringify(valid)){
     store.put(previous.data,'backup');
     // A startup read may have failed before memory play began. Preserve any
     // unseen older run at the durable boundary, including later retry.
     if(previous.data.runId!==valid.runId)store.put(previous.data,'archive:'+previous.data.runId);
    }
    store.put(valid,'current');
   }catch{store.transaction.abort();}
  };
 });
}
export async function load(){const result=await inspect();if(result.corrupt)throw Error('ข้อมูลบันทึกหลักไม่ถูกต้อง');return result.current;}
export async function backup(){const result=await inspect();if(!result.backup)throw Error('ไม่มีสำเนาที่ใช้ได้');return result.backup;}
export async function archive(state:State){const valid=schema.parse(state);await transaction<void>('readwrite',store=>{store.put(valid,'archive:'+valid.runId);});}
