import type {Facing} from './directional-art';
import type {Point} from './cinematic-paths';
import {workshopMap} from './workshop-map';
import {ruinsMap} from './ruins-map';
import {gardenMap} from './garden-map';

/** Coordinates are feet on our authored source maps, never reference-image pixels.
 * Overhead branches are occluders, not ground colliders. No free roaming. */
export type LocationId='village_center'|'under_tree'|'elder_garden'|'spell_workshop'|'ancient_shrine';
type Anchor=Point&{facing?:Facing};
type Solid={id:string;x:number;y:number;width:number;height:number};
export type SceneDefinition={
 id:LocationId;reference:string;anchors:Record<string,Anchor>;links:readonly (readonly [string,string])[];
 junctions:readonly string[];solids:readonly Solid[];occluders:readonly {id:string;footY:number}[];
};
const sharedSolids:Solid[]=[
 {id:'west-house',x:0,y:0,width:144,height:180},
 {id:'east-house',x:333,y:0,width:147,height:180},
 {id:'north-stairs',x:157,y:0,width:166,height:178},
 // Footprints of bench legs; the clear center permits the authored seat mount.
 {id:'bench-west-leg',x:52,y:231,width:7,height:8},
 {id:'bench-east-leg',x:101,y:231,width:6,height:8},
];
export const sceneDefinitions:Record<LocationId,SceneDefinition>={
 ancient_shrine:{id:'ancient_shrine',reference:'09_ancient_shrine.webp',...ruinsMap},
 spell_workshop:{id:'spell_workshop',reference:'08_spell_workshop.webp',...workshopMap},
 elder_garden:{id:'elder_garden',reference:'05_elder_herb_garden.webp',...gardenMap},
 village_center:{id:'village_center',reference:'01_village_center.webp',
  anchors:{village_road:{x:154,y:239},plaza_south:{x:190,y:257},fountain_approach:{x:254,y:257},
   fountain_front:{x:254,y:231,facing:'north'},plaza_north:{x:310,y:190},market_entrance:{x:310,y:214},
   east_junction:{x:310,y:239},tree_path:{x:126,y:239},village_exit:{x:405,y:239},bench_approach:{x:121,y:226},bench_seat:{x:79,y:213,facing:'south'}},
  links:[['village_road','plaza_south'],['village_road','tree_path'],['plaza_south','fountain_approach'],
   ['fountain_approach','fountain_front'],['fountain_approach','east_junction'],['east_junction','market_entrance'],
   ['market_entrance','plaza_north'],['east_junction','village_exit'],['tree_path','bench_approach'],['bench_approach','bench_seat']],
  junctions:['village_road','plaza_south','east_junction','tree_path'],
  solids:[...sharedSolids,{id:'fountain-basin',x:220,y:178,width:68,height:26}],
  occluders:[{id:'fountain',footY:204},{id:'bench',footY:238}],
 },
 under_tree:{id:'under_tree',reference:'03_ancient_tree.webp',
  anchors:{tree_entrance:{x:154,y:239},exit_south:{x:154,y:257},exit_path:{x:190,y:257},tree_front:{x:184,y:257},
   behind_branch:{x:184,y:186},tree_path:{x:121,y:186},seat_approach:{x:121,y:226},
   under_tree_seat:{x:79,y:213,facing:'south'},resting_bench:{x:79,y:213,facing:'south'},leaf_fall_area:{x:79,y:213}},
  links:[['tree_entrance','exit_south'],['exit_south','exit_path'],['exit_path','tree_front'],['tree_front','behind_branch'],
   ['behind_branch','tree_path'],['tree_path','seat_approach'],['seat_approach','under_tree_seat']],
  junctions:['tree_entrance','exit_path'],
  solids:[...sharedSolids,{id:'ancient-tree-trunk',x:252,y:163,width:55,height:38}],
  occluders:[{id:'ancient-tree',footY:201},{id:'bench',footY:238}],
 },
};
export const locationFor=(scene?:string):LocationId=>scene==='S15_RUINS'||scene==='S16_RUINS_RESULT'||scene==='S17_ECHO_TABLET'?'ancient_shrine':scene==='S04_KORO'||scene==='S05_CRAFT_TUTORIAL'?'spell_workshop':scene==='S00_WAKE'||scene==='S02_TREE'?'under_tree':scene==='S06_GARDEN'||scene==='S03B_MAREN'?'elder_garden':'village_center';
/** Actor footprint is 10x4 at the feet, smaller than the coat/overhead canopy. */
export function walkable(def:SceneDefinition,p:Point){
 return p.x>=40&&p.x<=438&&p.y>=183&&p.y<=259&&!def.solids.some(s=>p.x+5>s.x&&p.x-5<s.x+s.width&&p.y+2>s.y&&p.y-2<s.y+s.height);
}
export function clearSegment(def:SceneDefinition,a:Point,b:Point){
 const steps=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/2));
 return Array.from({length:steps+1},(_,i)=>({x:a.x+(b.x-a.x)*i/steps,y:a.y+(b.y-a.y)*i/steps})).every(p=>walkable(def,p));
}
/** Dijkstra on designer-authored road links. Disconnected/blocked targets fail
 * closed; never make a straight line through scenery as a fallback. */
export function routeTo(def:SceneDefinition,start:Point,target:string):Point[]|undefined {
 if(!def.anchors[target]||!walkable(def,start))return;
 const exact=Object.keys(def.anchors).find(id=>Math.hypot(def.anchors[id].x-start.x,def.anchors[id].y-start.y)<1);
 const entry=exact||[...def.junctions].filter(id=>clearSegment(def,start,def.anchors[id])).sort((a,b)=>Math.hypot(def.anchors[a].x-start.x,def.anchors[a].y-start.y)-Math.hypot(def.anchors[b].x-start.x,def.anchors[b].y-start.y))[0];
 if(!entry)return;
 const distances=new Map<string,number>([[entry,0]]),previous=new Map<string,string>(),open=new Set([entry]);
 while(open.size){
  const id=[...open].sort((a,b)=>distances.get(a)!-distances.get(b)!)[0];open.delete(id);
  if(id===target){const ids=[id];while(previous.has(ids[0]))ids.unshift(previous.get(ids[0])!);return [start,...ids.map(n=>def.anchors[n])].filter((p,i,a)=>!i||p.x!==a[i-1].x||p.y!==a[i-1].y);}
  for(const [a,b] of def.links){const next=a===id?b:b===id?a:undefined;if(!next||!clearSegment(def,def.anchors[id],def.anchors[next]))continue;
   const cost=distances.get(id)!+Math.hypot(def.anchors[next].x-def.anchors[id].x,def.anchors[next].y-def.anchors[id].y);
   if(cost<(distances.get(next)??Infinity)){distances.set(next,cost);previous.set(next,id);open.add(next);}
  }
 }
}
