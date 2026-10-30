import {readdir,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
export async function checkPublishedBuilds(page){
 const files=(await readdir('assets')).filter(name=>/\.(js|css)$/.test(name));
 if(!files.length)throw Error('No staged build files to verify');
 const expected=await Promise.all(files.map(async name=>({path:`assets/${name}`,sha256:hash(await readFile(`assets/${name}`))})));
 // Use the same browser/network path as the existing PNG verifiers, including managed proxies.
 return page.evaluate(async files=>{
  for(let offset=0;offset<files.length;offset+=6)await Promise.all(files.slice(offset,offset+6).map(async file=>{
   const response=await fetch(new URL(file.path,location.href),{signal:AbortSignal.timeout(30000)});
   if(!response.ok)throw Error(`Published current/cached build missing: ${file.path} (${response.status})`);
   const actual=[...new Uint8Array(await crypto.subtle.digest('SHA-256',await response.arrayBuffer()))].map(n=>n.toString(16).padStart(2,'0')).join('');
   if(actual!==file.sha256)throw Error(`Published current/cached build mismatch: ${file.path}`);
  }));
  return files.length;
 },expected);
}
