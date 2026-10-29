import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {PNG} from 'pngjs';
import {appearanceCatalog,groups} from '../src/data/appearance-v2.js';
const hash=b=>createHash('sha256').update(b).digest('hex');
export async function verifyCharacterAssets(root='public'){
 const manifest=JSON.parse(await readFile(`${root}/assets/sprites/manifest.json`,'utf8')),ids=new Set(),byGroup={};
 if(manifest.version!==2||manifest.files.length!==183)throw Error('Missing character catalog');
 for(const file of manifest.files){
  const expected=appearanceCatalog.find(v=>v.id===file.id);if(ids.has(file.id)||!file.path.startsWith('assets/sprites/characters/')||file.path.includes('..')||expected&&(expected.path!==file.path||expected.group!==file.group))throw Error('Invalid character mapping');
  const bytes=await readFile(`${root}/${file.path}`),png=PNG.sync.read(bytes);
  if(png.width!==64||png.height!==80||file.width!==64||file.height!==80||file.anchor?.[0]!==32||file.anchor?.[1]!==77||hash(bytes)!==file.sha256||hash(png.data)!==file.pixelSha256)throw Error('Invalid character PNG: '+file.id);
  const alpha=png.data.filter((_,i)=>i%4===3),visible=alpha.filter(a=>a>0).length;
  if(!visible||visible===64*80||alpha.some(a=>a!==0&&a!==255))throw Error('Non-pixel/opaque sprite: '+file.id);
  (byGroup[file.group]??=new Set()).add(file.pixelSha256);ids.add(file.id);
 }
 for(const [group,values]of Object.entries(groups))if(values.length!==20||byGroup[group]?.size!==20||values.some(v=>!ids.has(v.id)))throw Error('Missing/duplicate visible variants: '+group);
 for(const id of ['body','infant-wrap','infant-hair'])if(!ids.has(id))throw Error('Missing age/body layer');
 const bg=await readFile(`${root}/${manifest.background.path}`);if(hash(bg)!==manifest.background.sha256||bg.toString('ascii',8,12)!=='WEBP')throw Error('Invalid family room');
 if(root==='public'){const source=await readFile('docs/art/family-room-source.png'),png=PNG.sync.read(source);if(hash(source)!==manifest.background.sourceSha256||png.width!==manifest.background.width||png.height!==manifest.background.height)throw Error('Invalid original family artwork');}
 return {catalogVariants:180,groups:9,variantsPerGroup:20,transparentPartFiles:183,aiFamilyBackgrounds:1,logicalWidth:64,logicalHeight:80};
}
if(process.argv[1]?.endsWith('verify-character-assets.mjs'))console.log(JSON.stringify(await verifyCharacterAssets(process.argv[2]),null,2));
