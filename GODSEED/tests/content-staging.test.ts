import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
// @ts-expect-error pngjs is an existing JS-only development asset tool.
import {PNG} from 'pngjs';
import {scenes,openingSceneIds} from '../src/content/story';
import {sceneDefinitions,locationFor,walkable,clearSegment} from '../src/scenes/scene-definitions';
import {cinematicPath} from '../src/scenes/cinematic-paths';

it('every authored content action can approach its real anchor without crossing solids',()=>{
 let count=0;
 for(const id of openingSceneIds){const scene=scenes[id];if(!scene.staging)continue;const location=locationFor(id),def=sceneDefinitions[location];
  for(const choice of scene.choices){if(!choice.cinematic)continue;count++;for(const start of Object.values(def.anchors).filter(p=>walkable(def,p))){const route=cinematicPath(scene.stage,choice.cue,choice.id,{x:start.x,y:start.y-20},location)!;expect(route.targetAnchor).toBe(choice.cinematic.anchor);const feet=route.points.map(p=>({x:p.x,y:p.y+20})),anchor=def.anchors[choice.cinematic.anchor];expect(feet.at(-1)).toEqual({x:anchor.x,y:anchor.y});expect(route.facing).toBe(anchor.facing);for(let i=1;i<feet.length;i++)expect(clearSegment(def,feet[i-1],feet[i])).toBe(true);}}
 }
 expect(count).toBeGreaterThan(35);
});
it('festival scenery has original distinct unlit, flickering, musicbox and promise frames',()=>{
 const png=PNG.sync.read(readFileSync(new URL('../public/assets/art-v13/festival-props.png',import.meta.url)));expect([png.width,png.height]).toEqual([384,96]);const frames=[];
 for(let f=0;f<6;f++){const bytes:number[]=[];for(let y=0;y<96;y++)for(let x=f*64;x<(f+1)*64;x++)bytes.push(...png.data.subarray((y*384+x)*4,(y*384+x)*4+4));expect(bytes.filter((_,i)=>i%4===3&&bytes[i]>0).length).toBeGreaterThan(100);frames.push(Buffer.from(bytes).toString('base64'));}
 expect(new Set(frames).size).toBe(6);
});
