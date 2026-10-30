import {readdir,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
export async function checkPublishedBuilds(url){
 const files=(await readdir('assets')).filter(name=>/\.(js|css)$/.test(name));
 if(!files.length)throw Error('No staged build files to verify');
 for(let offset=0;offset<files.length;offset+=6)await Promise.all(files.slice(offset,offset+6).map(async name=>{
  const response=await fetch(new URL(`assets/${name}`,url),{signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error(`Published current/cached build missing: ${name} (${response.status})`);
  const actual=Buffer.from(await response.arrayBuffer()),expected=await readFile(`assets/${name}`);
  if(hash(actual)!==hash(expected))throw Error(`Published current/cached build mismatch: ${name}`);
 }));
 return files.length;
}
