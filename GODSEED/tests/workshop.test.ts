import {it,expect} from 'vitest';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {workshopMap,workshopScenery} from '../src/scenes/workshop-map';
import {sceneDefinitions,routeTo,clearSegment,walkable} from '../src/scenes/scene-definitions';
import {cinematicPath} from '../src/scenes/cinematic-paths';
import {workshopCheckpoint,workshopRecipe} from '../src/scenes/workshop-staging';
import {allSpells,cores,forms,mods} from '../src/systems/spells';
import {directionalIdle} from '../src/scenes/directional-art';
import {fresh} from '../src/engine/state';
import {choose} from '../src/systems/game';
const {PNG}=createRequire(import.meta.url)('pngjs');
const image=(name:string)=>PNG.sync.read(readFileSync(fileURLToPath(new URL('../public/assets/art-v11/'+name+'.png',import.meta.url)))) as {width:number;height:number;data:Buffer};
function cell(p:ReturnType<typeof image>,n:number,w:number,h:number){const buf=Buffer.alloc(w*h*4),x=n%(p.width/w)*w,y=Math.floor(n/(p.width/w))*h;for(let row=0;row<h;row++)p.data.copy(buf,row*w*4,((y+row)*p.width+x)*4,((y+row)*p.width+x+w)*4);return buf;}
const digest=(p:Buffer)=>createHash('sha256').update(p).digest('hex');
it('every workshop anchor reaches the lesson, toolbox, cauldron and exit without crossing a solid',()=>{
 const def=sceneDefinitions.spell_workshop;
 for(const start of Object.values(workshopMap.anchors))for(const [command,cue,target] of [['CH0401','talk','tutor_front'],['CH0402','pick','toolbox_front'],['CH0403','talk','tutor_front'],['','craft','craft_front'],['CH0503','walk','exit_path']]){
  const path=cinematicPath('workshop',cue,command,{x:start.x,y:start.y-20})!;expect(path.targetAnchor).toBe(target);
  expect(path.points.at(-1)).toMatchObject({x:def.anchors[target].x,y:def.anchors[target].y-20});
  for(let i=1;i<path.points.length;i++)expect(clearSegment(def,{x:path.points[i-1].x,y:path.points[i-1].y+20},{x:path.points[i].x,y:path.points[i].y+20})).toBe(true);
 }
 for(const p of [{x:240,y:195},{x:81,y:232},{x:320,y:230},{x:90,y:180}])expect(walkable(def,p)).toBe(false);
 expect(routeTo({...def,links:[]},def.anchors.workshop_entrance,'craft_front')).toBeUndefined();expect(()=>cinematicPath('workshop','craft','',{x:240,y:175})).toThrow('ไม่พบเส้นทาง');
});
it('file checkpoints derive from canonical choices without adding state or duplicating lesson rewards',()=>{
 let s=fresh('ผู้มาเยือน',18);for(const id of ['CH0001','CH0101','CH0202','CH0401'])s=choose(s,id);
 const before=structuredClone(s);expect(workshopCheckpoint(s)).toBe('tutor_front');expect(s).toEqual(before);
 s=choose(s,'CH0503');s=choose(s,'CH0202');s=choose(s,'CH0402');expect(workshopCheckpoint(s)).toBe('toolbox_front');expect(s.trust.KORO).toBe(1);expect(s.inventory.FORM_ORB).toBe(2);
});
it('all234 recipe presentations use the actual three ingredient identifiers and bounded distinct atlas cells',()=>{
 const ids=[...cores,...forms,...mods];expect(allSpells).toHaveLength(234);
 for(const spell of allSpells){const frames=workshopRecipe(spell);expect(frames.map(i=>ids[i])).toEqual([spell.core,spell.form,spell.mod]);expect(new Set(frames).size).toBe(3);frames.forEach(i=>expect(i>=0&&i<21).toBe(true));}
});
it('original workshop layers match canvas and leave floor under every authored foot anchor',()=>{
 const ground=image('workshop-ground');
 for(const name of ['rear','ground','front']){const p=image('workshop-'+name);expect([p.width,p.height]).toEqual([480,270]);expect(p.data.some(v=>v!==0)).toBe(true);}
 for(const a of Object.values(workshopMap.anchors))expect(ground.data[(a.y*480+a.x)*4+3]).toBeGreaterThan(0);
 expect(ground.data[(178*480+70)*4+3]).toBe(0);expect(ground.data[(177*480+378)*4+3]).toBe(0);
});
it('cauldron simmers in six real frames with a stable grounded bowl; toolbox has three states',()=>{
 for(const [name,w,h,count] of [['cauldron',96,96,6],['toolbox',56,40,3]] as const){const p=image(name);expect([p.width,p.height]).toEqual([w*count,h]);const cells=Array.from({length:count},(_,i)=>cell(p,i,w,h));expect(new Set(cells.map(digest)).size).toBe(count);if(name==='cauldron')expect(new Set(cells.map(c=>digest(c.subarray(62*w*4)))).size).toBe(1);}
 expect(workshopScenery.cauldron.mouth.y).toBeLessThan(workshopMap.anchors.craft_front.y);
});
it('north brewing and held toolbox preserve source-grid boots and contain real gesture frames',()=>{
 for(const [name,w,count] of [['hero-brew',32,8],['hero-toolbox',64,4]] as const){const p=image(name);expect([p.width,p.height]).toEqual([w*count,48]);const hashes=[];for(let i=0;i<count;i++){const c=cell(p,i,w,48);hashes.push(digest(c));expect(c.subarray(45*w*4).every(v=>v===0)).toBe(true);expect([...c.subarray(44*w*4,45*w*4)].some(v=>v!==0)).toBe(true);}expect(new Set(hashes).size).toBeGreaterThan(2);}
});
it('special gestures retain the actual north/back and west/profile heads from the shared directional manifest',()=>{
 const original=PNG.sync.read(readFileSync(fileURLToPath(new URL('../public/assets/art-v5/hero-idle.png',import.meta.url))));
 for(const [name,width,facing] of [['hero-brew',32,'north'],['hero-toolbox',64,'west']] as const){
  const expected=cell(original,directionalIdle[facing].frames[0],32,48),actual=cell(image(name),0,width,48),offset=(width-32)/2;
  for(let y=4;y<18;y++)for(let x=11;x<21;x++)expect(actual.subarray((y*width+x+offset)*4,(y*width+x+offset+1)*4)).toEqual(expected.subarray((y*32+x)*4,(y*32+x+1)*4));
 }
});
it('ingredient icons are21 independently drawn visible objects; unused cells stay transparent',()=>{
 const p=image('ingredients');expect([p.width,p.height]).toEqual([128,48]);const hashes=[];for(let n=0;n<24;n++){const c=cell(p,n,16,16);if(n>=21)expect(c.every(v=>v===0)).toBe(true);else{expect(c.some(v=>v!==0)).toBe(true);hashes.push(digest(c));}}expect(new Set(hashes).size).toBe(21);
});
