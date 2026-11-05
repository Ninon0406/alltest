import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const game=resolve(dirname(fileURLToPath(import.meta.url)),'..'),folder=resolve(game,'../assets/reference/godseed');
const manifest=JSON.parse(readFileSync(resolve(folder,'GODSEED_LOCATIONS_MANIFEST.json'),'utf8'));
const provenance=JSON.parse(readFileSync(resolve(folder,'IMPORT_PROVENANCE.json'),'utf8'));
if(manifest.locations.length!==10||new Set(manifest.locations.map(l=>l.id)).size!==10)throw Error('Expected ten unique concept references');
for(const [name,expected] of Object.entries(provenance.files)){
 if(name.startsWith('/')||name.split('/').includes('..'))throw Error('Unsafe reference path');
 const bytes=readFileSync(resolve(folder,name)),hash=createHash('sha256').update(bytes).digest('hex');if(hash!==expected)throw Error('Reference checksum mismatch: '+name);
}
for(const location of manifest.locations){const bytes=readFileSync(resolve(folder,location.reference_file));if(bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WEBP')throw Error('Invalid WebP: '+location.id);}
for(const runtime of ['public','dist'])if(existsSync(resolve(game,runtime))){const files=readdirSync(resolve(game,runtime),{recursive:true});if(files.some(name=>name.split(/[\\/]/).some(part=>part==='reference'||part==='references')||name.endsWith('.webp')||name.endsWith('CONTACT_SHEET.jpg')))throw Error('Development references leaked into '+runtime);}
console.log(JSON.stringify({result:'PASS',references:10,originalFiles:Object.keys(provenance.files).length,productionReferenceFiles:0,zipSha256:provenance.zipSha256}));
