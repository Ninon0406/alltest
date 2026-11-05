import type {StageId} from './stage-layout';
import type {Facing} from './directional-art';
import {routeTo,sceneDefinitions,type LocationId} from './scene-definitions';
export type Point={x:number;y:number};
export type CinematicPath={id:string;stage:StageId;points:readonly Point[];seatDepth?:number;facing?:Facing;targetAnchor?:string};
// Sprite centers, foot anchor y+20. Authored lanes avoid solid prop bases;
// these routes are presentation data, never free-roam or serialized progress.
export const travelPaths:Record<StageId,readonly Point[]>={
 village:[{x:154,y:237},{x:190,y:227},{x:230,y:219}],
 garden:[{x:185,y:228},{x:205,y:238},{x:282,y:238},{x:303,y:219}],
 workshop:[{x:190,y:230},{x:230,y:219}],
 forest:[{x:184,y:229},{x:230,y:219}],
 archive:[{x:187,y:224},{x:230,y:219}],
 stream:[{x:188,y:229},{x:230,y:219}],
};
export const choicePaths:Record<string,CinematicPath>={
 CH0102:{id:'village-feather',stage:'village',points:[{x:180,y:226},{x:208,y:219}]},
 CH0601:{id:'garden-seeds',stage:'garden',points:[{x:179,y:227},{x:214,y:220}]},
 CH0603:{id:'garden-dew',stage:'garden',points:[{x:126,y:228},{x:98,y:218}]},
 CH0701:{id:'archive-manuscript',stage:'archive',points:[{x:187,y:217},{x:212,y:184}]},
 CH0703:{id:'archive-books',stage:'archive',points:[{x:154,y:237},{x:123,y:233},{x:99,y:225}]},
 CH1401:{id:'archive-notes',stage:'archive',points:[{x:187,y:217},{x:212,y:184}]},
 CH1201:{id:'stream-bell',stage:'stream',points:[{x:195,y:231},{x:248,y:226}]},
};
export function cinematicPath(stage:StageId,cue:string,command?:string,start?:Point,location:LocationId='village_center'):CinematicPath|undefined {
 const treeRest=command==='CH0004'||command==='CH02T1';
 const benchRest=command==='CH0210';
 if(stage==='village'&&((command==='CH0201'||benchRest)&&location==='village_center'||treeRest&&location==='under_tree'||start&&command?.startsWith('CH')&&cue==='walk')){
  const targetAnchor=treeRest?'under_tree_seat':benchRest?'bench_seat':command==='CH0201'?'fountain_front':command==='CH0211'?'tree_path':location==='under_tree'?'exit_path':'village_exit',definition=sceneDefinitions[location];
  const feet=routeTo(definition,start?{x:start.x,y:start.y+20}:{x:154,y:239},targetAnchor);
  if(!feet)throw Error('ไม่พบเส้นทางที่ปลอดภัยไปยังจุดโต้ตอบ');
  return {id:treeRest?'tree-rest':benchRest?'village-bench':command==='CH0201'?'village-fountain':'village-exit',stage,points:feet.map(p=>({x:p.x,y:p.y-20})),targetAnchor,facing:definition.anchors[targetAnchor].facing,seatDepth:treeRest||benchRest?239:undefined};
 }
 const authored=command?choicePaths[command]:undefined;
 if(authored?.stage===stage)return authored;
 if(cue==='walk')return {id:command==='FLEE'?'battle-retreat':stage+'-travel',stage,points:command==='FLEE'?[{x:105,y:225},{x:80,y:219}]:travelPaths[stage]};
 return undefined;
}
