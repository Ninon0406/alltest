import type {StageId} from './stage-layout';
import type {Facing} from './directional-art';
import {routeTo,sceneDefinitions,type LocationId} from './scene-definitions';
import {ruinsScenery} from './ruins-map';
import {ruinsActions} from './ruins-staging';
import {workshopChoiceTargets} from './workshop-staging';
import {gardenMap,gardenScenery} from './garden-map';
import {scenes,type Choice} from '../content/story';
export type Point={x:number;y:number};
export type CinematicPath={id:string;stage:StageId;points:readonly Point[];seatDepth?:number;facing?:Facing;targetAnchor?:string;pose?:string;effect?:string};
export function authoredCinematic(command?:string):Choice['cinematic']{return command?Object.values(scenes).flatMap(s=>s.choices).find(c=>c.id===command)?.cinematic:undefined;}
// Sprite centers, foot anchor y+20. Authored lanes avoid solid prop bases;
// these routes are presentation data, never free-roam or serialized progress.
export const travelPaths:Record<StageId,readonly Point[]>={
 glade:[{x:130,y:219},{x:126,y:231},{x:80,y:231}],
 ruins:[{x:126,y:228},{x:240,y:231},{x:350,y:231}],
 village:[{x:154,y:237},{x:190,y:227},{x:230,y:219}],
 garden:[{x:185,y:228},{x:205,y:238},{x:282,y:238},{x:368,y:238},{x:378,y:219}],
 workshop:[{x:190,y:230},{x:230,y:219}],
 forest:[{x:184,y:229},{x:230,y:219}],
 archive:[{x:187,y:224},{x:230,y:219}],
 stream:[{x:188,y:229},{x:230,y:219}],
};
const gardenListen:CinematicPath={id:'garden-listen',stage:'garden',points:[gardenMap.anchors.south_turn,gardenMap.anchors.bed_south,gardenMap.anchors.bench_south,gardenMap.anchors.bench_approach,gardenMap.anchors.maren_listen_seat].map(p=>({x:p.x,y:p.y-20})),seatDepth:gardenScenery.bench.y+1,facing:'east',targetAnchor:'maren_listen_seat'};
export const choicePaths:Record<string,CinematicPath>={
 CH0102:{id:'village-feather',stage:'village',points:[{x:180,y:226},{x:208,y:219}]},
 CH0601:{id:'garden-seeds',stage:'garden',points:[{x:179,y:227},{x:214,y:220}]},
 CH0602:gardenListen,
 CH03B1:{...gardenListen,id:'garden-history'},
 CH0603:{id:'garden-dew',stage:'garden',points:[{x:126,y:228},{x:98,y:218}]},
 CH0701:{id:'archive-manuscript',stage:'archive',points:[{x:187,y:217},{x:212,y:184}]},
 CH0703:{id:'archive-books',stage:'archive',points:[{x:154,y:237},{x:123,y:233},{x:99,y:225}]},
 CH1401:{id:'archive-notes',stage:'archive',points:[{x:187,y:217},{x:212,y:184}]},
 CH1201:{id:'stream-bell',stage:'stream',points:[{x:195,y:231},{x:248,y:226}]},
};
export function cinematicPath(stage:StageId,cue:string,command?:string,start?:Point,location:LocationId='village_center'):CinematicPath|undefined {
 const authored=authoredCinematic(command);
 if(authored&&start){const def=sceneDefinitions[location],points=routeTo(def,{x:start.x,y:start.y+20},authored.anchor);if(!points)throw Error('ไม่พบเส้นทางที่ปลอดภัยไปยังเหตุการณ์');return {id:'story-'+authored.anchor,stage,points:points.map(p=>({x:p.x,y:p.y-20})),targetAnchor:authored.anchor,facing:def.anchors[authored.anchor].facing,pose:authored.pose,effect:authored.effect,seatDepth:authored.pose==='rest'?(def.occluders.find(o=>o.id.includes('bench'))?.footY??238)+1:undefined};}
 if(stage==='glade'&&cue==='walk'&&command==='FLEE')return {id:'glade-retreat',stage,points:travelPaths.glade};
 if(stage==='ruins'&&cue==='walk'&&command==='FLEE')return {id:'ruins-retreat',stage,points:ruinsScenery.retreat};
 if(stage==='ruins'&&start&&command&&ruinsActions[command]){const targetAnchor=ruinsActions[command].anchor,def=sceneDefinitions.ancient_shrine,feet=routeTo(def,{x:start.x,y:start.y+20},targetAnchor);if(!feet)throw Error('ไม่พบเส้นทางที่ปลอดภัยในโบราณสถาน');return {id:'ruins-'+targetAnchor,stage,points:feet.map(p=>({x:p.x,y:p.y-20})),targetAnchor,facing:def.anchors[targetAnchor].facing};}
 if(stage==='workshop'&&start){
  const targetAnchor=command&&workshopChoiceTargets[command]|| (cue==='craft'?'craft_front':cue==='walk'&&command?.startsWith('CH')?'exit_path':undefined);
  if(targetAnchor){const def=sceneDefinitions.spell_workshop,feet=routeTo(def,{x:start.x,y:start.y+20},targetAnchor);if(!feet)throw Error('ไม่พบเส้นทางที่ปลอดภัยในโรงช่าง');return {id:'workshop-'+targetAnchor,stage,points:feet.map(p=>({x:p.x,y:p.y-20})),targetAnchor,facing:def.anchors[targetAnchor].facing};}
 }
 if(stage==='garden'&&start){
  const authored=command?choicePaths[command]:undefined;
  const targetAnchor=command==='CH0601'?'herb_bed_front':command==='CH0602'||command==='CH03B1'?'maren_listen_seat':command==='CH0603'?'dew_collect':cue==='walk'?'exit_path':undefined;
  if(targetAnchor){const def=sceneDefinitions.elder_garden,feet=routeTo(def,{x:start.x,y:start.y+20},targetAnchor);
   if(!feet)throw Error('ไม่พบเส้นทางที่ปลอดภัยในสวนสมุนไพร');
   return {id:authored?.id||'garden-exit',stage,points:feet.map(p=>({x:p.x,y:p.y-20})),targetAnchor,facing:def.anchors[targetAnchor].facing,seatDepth:authored?.seatDepth};
  }
 }
 const treeRest=command==='CH0004'||command==='CH02T1';
 const benchRest=command==='CH0210';
 if(stage==='village'&&((command==='CH0201'||benchRest)&&location==='village_center'||treeRest&&location==='under_tree'||start&&command?.startsWith('CH')&&cue==='walk')){
  const targetAnchor=treeRest?'under_tree_seat':benchRest?'bench_seat':command==='CH0201'?'fountain_front':command==='CH0211'?'tree_path':location==='under_tree'?'exit_path':'village_exit',definition=sceneDefinitions[location];
  const feet=routeTo(definition,start?{x:start.x,y:start.y+20}:{x:154,y:239},targetAnchor);
  if(!feet)throw Error('ไม่พบเส้นทางที่ปลอดภัยไปยังจุดโต้ตอบ');
  return {id:treeRest?'tree-rest':benchRest?'village-bench':command==='CH0201'?'village-fountain':'village-exit',stage,points:feet.map(p=>({x:p.x,y:p.y-20})),targetAnchor,facing:definition.anchors[targetAnchor].facing,seatDepth:treeRest||benchRest?239:undefined};
 }
 const oldPath=command?choicePaths[command]:undefined;
 if(oldPath?.stage===stage)return oldPath;
 if(cue==='walk')return {id:command==='FLEE'?'battle-retreat':stage+'-travel',stage,points:command==='FLEE'?[{x:105,y:225},{x:80,y:219}]:travelPaths[stage]};
 return undefined;
}
