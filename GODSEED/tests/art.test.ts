import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {describe,expect,it} from 'vitest';
import {actorFrame,playerAnimations,trainingAnimations} from '../src/scenes/actor-art';
import {STAGES,stageLayouts,stageFolder} from '../src/scenes/stage-layout';

type PixelImage={width:number;height:number;data:Buffer};
const {PNG}=createRequire(import.meta.url)('pngjs') as {PNG:{sync:{read:(source:Buffer)=>PixelImage}}};
function image(relative:string):PixelImage {
 return PNG.sync.read(readFileSync(fileURLToPath(new URL('../public/assets/'+relative,import.meta.url))));
}
function frame(image:PixelImage,index:number,width:number,height:number):Buffer {
 const columns=image.width/width,x=(index%columns)*width,y=Math.floor(index/columns)*height;
 const pixels=Buffer.alloc(width*height*4);
 for(let row=0;row<height;row++)image.data.copy(pixels,row*width*4,((y+row)*image.width+x)*4,((y+row)*image.width+x+width)*4);
 return pixels;
}
const digest=(pixels:Buffer)=>createHash('sha256').update(pixels).digest('hex');
const visible=(pixels:Buffer)=>{let count=0;for(let i=3;i<pixels.length;i+=4)if(pixels[i]>0)count++;return count;};

describe('original layered-stage assets and layout bounds',()=>{
 it('contains three distinct nonempty full-size layers for each reachable stage',()=>{
  expect([...STAGES].sort()).toEqual(['archive','forest','garden','stream','village','workshop']);
  for(const stage of STAGES){
   const hashes=[];
   for(const layer of ['rear','ground','front']){
    const picture=image(`${stageFolder(stage)}/${stage}-${layer}.png`);
    expect([picture.width,picture.height],`${stage}-${layer}`).toEqual([480,270]);
    expect(visible(picture.data),`${stage}-${layer}`).toBeGreaterThan(100);
    if(layer==='front')expect(visible(picture.data),`${stage} foreground permits actor visibility`).toBeLessThan(480*270);
    hashes.push(digest(picture.data));
   }
   expect(new Set(hashes).size,`${stage} layers must carry different content`).toBe(3);
  }
 });

 it('supplies nonempty prop/ambient cells and stage anchors within the logical canvas',()=>{
  const props=image('art-v2/props.png'),ambient=image('art-v2/ambient.png');
  expect([props.width,props.height]).toEqual([512,96]);
  expect([ambient.width,ambient.height]).toEqual([512,32]);
  for(let index=0;index<8;index++)expect(visible(frame(props,index,64,96)),`prop ${index}`).toBeGreaterThan(0);
  for(let index=0;index<16;index++)expect(visible(frame(ambient,index,32,32)),`ambient ${index}`).toBeGreaterThan(0);
  for(const stage of STAGES){
   const layout=stageLayouts[stage];
   expect(layout.props.length,`${stage} interactive scenery`).toBeGreaterThan(0);
   expect(layout.ambient.length,`${stage} animated atmosphere`).toBeGreaterThan(0);
   for(const prop of layout.props){
    expect(Number.isInteger(prop.frame)).toBe(true);
    expect(prop.frame).toBeGreaterThanOrEqual(0);expect(prop.frame).toBeLessThan(8);
   }
   for(const anchor of [...layout.props,...layout.ambient]){
    expect(anchor.x,`${stage} anchor x`).toBeGreaterThanOrEqual(0);expect(anchor.x).toBeLessThanOrEqual(480);
    expect(anchor.y,`${stage} anchor y`).toBeGreaterThanOrEqual(0);expect(anchor.y).toBeLessThanOrEqual(270);
   }
  }
 });
});

describe('original actor sheets and animation manifest',()=>{
 it('bounds every used animation frame and leaves unused atlas cells transparent',()=>{
  expect(actorFrame).toMatchObject({width:32,height:48,columns:8});
  expect(actorFrame.footY).toBeGreaterThan(0);expect(actorFrame.footY).toBeLessThan(actorFrame.height);
  expect(Object.keys(playerAnimations)).toEqual(['idle','walk','run','interact','pick_up','craft','cast','guard','hit','victory','rest']);
  for(const [name,animations,height] of [['player',playerAnimations,528],['training',trainingAnimations,144]] as const){
   const sheet=image(`art-v2/${name}.png`),used=new Set<number>();
   expect([sheet.width,sheet.height]).toEqual([256,height]);
   const cells=sheet.width/actorFrame.width*sheet.height/actorFrame.height;
   for(const [action,animation] of Object.entries(animations)){
    expect(animation.frames.length,`${name}/${action}`).toBeGreaterThan(1);
    expect(animation.frameRate,`${name}/${action}`).toBeGreaterThan(0);
    const poseHashes=new Set<string>();
    for(const index of animation.frames){
     expect(Number.isInteger(index)).toBe(true);expect(index).toBeGreaterThanOrEqual(0);expect(index).toBeLessThan(cells);
     used.add(index);
     const pixels=frame(sheet,index,actorFrame.width,actorFrame.height);
     expect(visible(pixels),`${name}/${action}/${index}`).toBeGreaterThan(20);
     poseHashes.add(digest(pixels));
    }
    expect(poseHashes.size,`${name}/${action} must actually animate`).toBeGreaterThan(1);
   }
   for(let index=0;index<cells;index++)if(!used.has(index))expect(visible(frame(sheet,index,32,48)),`${name} unused cell ${index}`).toBe(0);
  }
 });

 it('uses distinct protagonist poses and a practice-spirit silhouette different from Pip',()=>{
  const player=image('art-v2/player.png');
  const poses=Object.values(playerAnimations).map(animation=>digest(frame(player,animation.frames[0],32,48)));
  expect(new Set(poses).size).toBeGreaterThanOrEqual(8);
  const spirit=frame(image('art-v2/training.png'),trainingAnimations.idle.frames[0],32,48);
  const pip=frame(image('pip.png'),0,32,48);
  let silhouetteDifference=0;
  for(let i=3;i<spirit.length;i+=4)if((spirit[i]>0)!==(pip[i]>0))silhouetteDifference++;
  expect(silhouetteDifference,'a new spirit requires more than recoloring Pip').toBeGreaterThan(20);
 });
});

it('new archive/stream fallback images and mist/water atlas have usable alpha and real motion',()=>{
 for(const stage of ['archive','stream']){
  const fallback=image(`art-v3/${stage}-fallback.png`);
  expect([fallback.width,fallback.height]).toEqual([480,270]);expect(visible(fallback.data)).toBe(480*270);
 }
 const mist=image('art-v3/stream-mist.png');expect([mist.width,mist.height]).toEqual([480,270]);
 expect(visible(mist.data)).toBeGreaterThan(1000);expect(visible(mist.data)).toBeLessThan(480*270/3);
 const water=image('art-v3/water.png');expect([water.width,water.height]).toEqual([192,32]);
 const hashes=[];for(let index=0;index<6;index++){const cell=frame(water,index,32,32);expect(visible(cell)).toBeGreaterThan(10);hashes.push(digest(cell));}
 expect(new Set(hashes).size).toBe(6);
});

it('Eira and the water spirit are original animated silhouettes with transparent unused cells',async()=>{
 const {explorationAnimations}=await import('../src/scenes/exploration-art');
 for(const [texture,animations] of Object.entries(explorationAnimations)){
  const name=texture.replace('-v3',''),sheet=image(`art-v3/${name}.png`),used=new Set<number>();
  expect([sheet.width,sheet.height]).toEqual([256,name==='eira'?96:144]);
  for(const animation of Object.values(animations)){
   const hashes=[];for(const index of animation.frames){used.add(index);const cell=frame(sheet,index,32,48);expect(visible(cell)).toBeGreaterThan(20);hashes.push(digest(cell));}
   expect(new Set(hashes).size).toBeGreaterThan(1);
  }
  for(let i=0;i<sheet.width/32*sheet.height/48;i++)if(!used.has(i))expect(visible(frame(sheet,i,32,48))).toBe(0);
  const actual=frame(sheet,0,32,48),legacy=frame(image(name==='eira'?'maren.png':'sprout.png'),0,32,48);let difference=0;
  for(let i=3;i<actual.length;i+=4)if((actual[i]>0)!==(legacy[i]>0))difference++;
  expect(difference,'new art must change the silhouette, not just its palette').toBeGreaterThan(20);
 }
});
