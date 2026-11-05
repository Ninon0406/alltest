import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {describe,expect,it} from 'vitest';
import {actorFrame,playerAnimations,trainingAnimations} from '../src/scenes/actor-art';
import {STAGES,stageLayouts} from '../src/scenes/stage-layout';

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
  expect([...STAGES].sort()).toEqual(['forest','garden','village','workshop']);
  for(const stage of STAGES){
   const hashes=[];
   for(const layer of ['rear','ground','front']){
    const picture=image(`art-v2/${stage}-${layer}.png`);
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
