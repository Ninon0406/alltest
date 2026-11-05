import {readdir,readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../src/',import.meta.url)),files=[];
async function walk(folder){for(const e of await readdir(folder,{withFileTypes:true})){const file=path.join(folder,e.name);if(e.isDirectory())await walk(file);else if(e.name.endsWith('.ts'))files.push(file);}}
await walk(root);
const banned=/\b(?:indexedDB|localStorage|sessionStorage)\b|document\s*\.\s*cookie|\b(?:sendBeacon|serviceWorker)\b|\bfetch\s*\(/;
for(const file of files)if(banned.test(await readFile(file,'utf8')))throw Error('Manual-only contract violated in '+path.relative(root,file));
console.log(JSON.stringify({result:'PASS',applicationFiles:files.length,policy:'RAM only; explicit file export/import; no progress storage or outbound upload API in application source'}));
