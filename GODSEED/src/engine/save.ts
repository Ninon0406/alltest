import {schema,type State} from './state';
const db=()=>new Promise<IDBDatabase>((resolve,reject)=>{const req=indexedDB.open('godseed-saves',1);req.onupgradeneeded=()=>req.result.createObjectStore('slots');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});
async function request(mode:IDBTransactionMode,fn:(store:IDBObjectStore)=>IDBRequest){const conn=await db();try{return await new Promise<unknown>((resolve,reject)=>{const tx=conn.transaction('slots',mode);const r=fn(tx.objectStore('slots'));let value:unknown;r.onsuccess=()=>value=r.result;tx.oncomplete=()=>resolve(value);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}finally{conn.close();}}
export async function save(s:State){schema.parse(s);const current=await request('readonly',st=>st.get('current'));await request('readwrite',st=>{if(current)st.put(current,'backup');return st.put(s,'current');});}
export async function load(){const raw=await request('readonly',st=>st.get('current'));if(raw===undefined)return null;return schema.parse(raw);}
export async function backup(){const raw=await request('readonly',st=>st.get('backup'));return schema.parse(raw);}
export async function archive(s:State){return request('readwrite',st=>st.put(schema.parse(s),'archive:'+s.runId));}
