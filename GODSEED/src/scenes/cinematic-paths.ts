import type {StageId} from './stage-layout';
export type Point={x:number;y:number};
export type CinematicPath={id:string;stage:StageId;points:readonly Point[];seatDepth?:number};
// Sprite centers, foot anchor y+20. Authored lanes avoid solid prop bases;
// these routes are presentation data, never free-roam or serialized progress.
export const travelPaths:Record<StageId,readonly Point[]>={
 village:[{x:184,y:225},{x:230,y:219}],
 garden:[{x:185,y:228},{x:230,y:219}],
 workshop:[{x:190,y:230},{x:230,y:219}],
 forest:[{x:184,y:229},{x:230,y:219}],
 archive:[{x:187,y:224},{x:230,y:219}],
 stream:[{x:188,y:229},{x:230,y:219}],
};
export const choicePaths:Record<string,CinematicPath>={
 CH0102:{id:'village-feather',stage:'village',points:[{x:180,y:226},{x:208,y:219}]},
 CH0210:{id:'village-bench',stage:'village',points:[{x:121,y:224},{x:79,y:193}],seatDepth:239},
 CH0601:{id:'garden-seeds',stage:'garden',points:[{x:179,y:227},{x:214,y:220}]},
 CH0603:{id:'garden-dew',stage:'garden',points:[{x:126,y:228},{x:98,y:218}]},
 CH0701:{id:'archive-manuscript',stage:'archive',points:[{x:187,y:217},{x:212,y:184}]},
 CH0703:{id:'archive-books',stage:'archive',points:[{x:123,y:226},{x:99,y:224}]},
 CH1401:{id:'archive-notes',stage:'archive',points:[{x:187,y:217},{x:212,y:184}]},
 CH1201:{id:'stream-bell',stage:'stream',points:[{x:195,y:231},{x:248,y:226}]},
};
export function cinematicPath(stage:StageId,cue:string,command?:string):CinematicPath|undefined {
 const authored=command?choicePaths[command]:undefined;
 if(authored?.stage===stage)return authored;
 if(cue==='walk')return {id:command==='FLEE'?'battle-retreat':stage+'-travel',stage,points:command==='FLEE'?[{x:105,y:225},{x:80,y:219}]:travelPaths[stage]};
 return undefined;
}
