import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {describe,expect,it} from 'vitest';
import {actorFrame,playerAnimations,trainingAnimations} from '../src/scenes/actor-art';
import {STAGES,stageLayouts,stageFolder} from '../src/scenes/stage-layout';

it('gathering atlas has three distinct grounded silhouettes and four real glint frames',()=>{
 const sheet=image('art-v6/gathering.png');expect([sheet.width,sheet.height]).toEqual([96,72]);const kinds=[];
 for(let kind=0;kind<3;kind++){const hashes=[];for(let f=0;f<4;f++){const pixels=frame(sheet,kind*4+f,24,24);expect(visible(pixels)).toBeGreaterThan(30);hashes.push(digest(pixels));}expect(new Set(hashes).size).toBe(4);kinds.push(hashes[0]);}expect(new Set(kinds).size).toBe(3);
});

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

it('four directional walks use visible independent frames, grounded soles and empty padding',async()=>{
 const {directionalWalk,facings}=await import('../src/scenes/directional-art');
 const picture=image('art-v4/hero-walk.png'),used=new Set<number>();
 expect([picture.width,picture.height]).toEqual([256,192]);
 for(const direction of facings){
  const config=directionalWalk[direction];expect(config.frames).toHaveLength(6);const hashes=new Set();
  for(const i of config.frames){
   used.add(i);const pixels=frame(picture,i,32,48);expect(visible(pixels)).toBeGreaterThan(150);hashes.add(digest(pixels));
   let last=0;for(let y=0;y<48;y++)for(let x=0;x<32;x++)if(pixels[(y*32+x)*4+3])last=y;
   expect(last,`${direction}/${i} planted sole must meet ground44`).toBe(44);
  }
  expect(hashes.size).toBe(6);
 }
 for(let i=0;i<32;i++)if(!used.has(i))expect(visible(frame(picture,i,32,48))).toBe(0);
});

it('front/back heads differ physically and west is not a mirrored east sheet',async()=>{
 const {directionalWalk}=await import('../src/scenes/directional-art');const picture=image('art-v4/hero-walk.png');
 const front=frame(picture,directionalWalk.south.frames[0],32,48),back=frame(picture,directionalWalk.north.frames[0],32,48);
 const skin=(pixels:Buffer)=>{let n=0;for(let y=4;y<22;y++)for(let x=0;x<32;x++){const i=(y*32+x)*4;if(pixels[i]===233&&pixels[i+1]===188&&pixels[i+2]===147)n++;}return n;};
 expect(skin(front)).toBeGreaterThan(20);expect(skin(back)).toBe(0);
 const east=frame(picture,directionalWalk.east.frames[0],32,48),west=frame(picture,directionalWalk.west.frames[0],32,48),mirrored=Buffer.alloc(east.length);
 for(let y=0;y<48;y++)for(let x=0;x<32;x++)east.copy(mirrored,(y*32+x)*4,(y*32+31-x)*4,(y*32+32-x)*4);
 expect(digest(west)).not.toBe(digest(mirrored));expect(digest(back)).not.toBe(digest(front));
});

it('standing views keep grounded feet, asymmetric front/back and real breathing frames',async()=>{
 const {directionalIdle,facings}=await import('../src/scenes/directional-art');const picture=image('art-v5/hero-idle.png');
 expect([picture.width,picture.height]).toEqual([96,192]);const views=[];
 for(const direction of facings){const frames=directionalIdle[direction].frames;const hashes=frames.map(i=>digest(frame(picture,i,32,48)));expect(new Set(hashes).size).toBeGreaterThan(1);views.push(hashes[0]);
  for(const i of frames){const pixels=frame(picture,i,32,48);expect(visible(pixels)).toBeGreaterThan(150);expect(visible(pixels.subarray(45*32*4))).toBe(0);expect(visible(pixels.subarray(44*32*4,45*32*4))).toBeGreaterThan(0);}
 }expect(new Set(views).size).toBe(4);
});
it('original fountain water animates independently of opaque map and depth-sorted tree',()=>{
 const fountain=image('art-v5/fountain.png'),tree=image('art-v5/ancient-tree.png'),leaves=image('art-v5/leaves.png');
 expect([fountain.width,fountain.height]).toEqual([576,112]);expect([tree.width,tree.height]).toEqual([432,208]);expect([leaves.width,leaves.height]).toEqual([128,16]);
 expect(new Set(Array.from({length:6},(_,i)=>digest(frame(fountain,i,96,112)))).size).toBe(6);
 expect(visible(tree.data)).toBeGreaterThan(10_000);expect(visible(tree.data)).toBeLessThan(tree.width*tree.height*.65);
 for(let i=0;i<8;i++)expect(visible(frame(leaves,i,16,16))).toBeGreaterThan(10);
 for(const stage of ['village','tree']){const ground=image(`art-v5/${stage}-ground.png`);expect(ground.data[(170*480+70)*4+3]).toBe(0);expect(ground.data[(240*480+200)*4+3]).toBe(255);}
});

it('garden buds, wet soil and blooms differ; held-can poses keep the original planted soles',()=>{
 const bed=image('art-v7/garden-bed.png'),hero=image('art-v7/hero-water.png');expect([bed.width,bed.height]).toEqual([192,48]);expect([hero.width,hero.height]).toEqual([256,48]);
 expect(new Set([0,1,2].map(i=>digest(frame(bed,i,64,48)))).size).toBe(3);
 expect(new Set([0,1,2,3].map(i=>digest(frame(hero,i,64,48)))).size).toBeGreaterThanOrEqual(3);
 for(let i=0;i<4;i++){const p=frame(hero,i,64,48);expect(visible(p)).toBeGreaterThan(300);expect(visible(p.subarray(45*64*4))).toBe(0);expect(visible(p.subarray(44*64*4,45*64*4))).toBeGreaterThan(0);}
});
