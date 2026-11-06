export const STAGES=['village','garden','workshop','forest','archive','stream'] as const;
export type StageId=typeof STAGES[number];
export type AmbientKind='cloud'|'leaf'|'fire'|'glow'|'water';
export const stageFolder=(stage:StageId)=>stage==='workshop'?'art-v11':stage==='village'?'art-v5':stage==='garden'?'art-v9':stage==='archive'||stage==='stream'?'art-v3':'art-v2';
export const stageFallback=(stage:StageId)=>stage==='archive'||stage==='stream'?`art-v3/${stage}-fallback.png`:`${stage}.png`;
export type StageLayout={
 /** A story spell acts on the scenery; battle spells continue targeting combatants. */
 spellTarget?:{x:number;y:number};
 /** Frame order: well, bench, table, shrub, lantern, planter, banner, rune. Origin .5,1. */
 props:{frame:number;x:number;y:number}[];
 /** Each ambient type has four consecutive 32x32 frames: cloud0, leaf4, fire8, glow12. */
 ambient:{kind:AmbientKind;x:number;y:number}[];
};

// Actor foot anchors stay player(154,239)/NPC(338,232), with walk154→230.
// Props are sorted by their foot y; the actor lane has no blocking foreground prop.
export const stageLayouts:Record<StageId,StageLayout>={
 archive:{
  spellTarget:{x:240,y:142},
  props:[{frame:2,x:77,y:244},{frame:2,x:232,y:178},{frame:4,x:399,y:180},{frame:5,x:438,y:233}],
  ambient:[{kind:'glow',x:278,y:83},{kind:'glow',x:193,y:65},{kind:'glow',x:380,y:105},{kind:'glow',x:108,y:144}],
 },
 stream:{
  spellTarget:{x:330,y:150},
  props:[{frame:3,x:67,y:204},{frame:4,x:282,y:171},{frame:3,x:431,y:211},{frame:7,x:395,y:187}],
  ambient:[{kind:'cloud',x:202,y:33},{kind:'leaf',x:55,y:148},{kind:'water',x:162,y:171},{kind:'water',x:230,y:183},{kind:'water',x:412,y:169},{kind:'glow',x:317,y:132}],
 },
 village:{
  props:[{frame:0,x:254,y:194},{frame:1,x:79,y:238},{frame:3,x:407,y:210},{frame:4,x:112,y:185},{frame:5,x:397,y:190},{frame:6,x:296,y:169}],
  ambient:[{kind:'cloud',x:124,y:33},{kind:'cloud',x:281,y:47},{kind:'leaf',x:30,y:145},{kind:'leaf',x:435,y:151},{kind:'glow',x:254,y:159}],
 },
 garden:{
  props:[{frame:1,x:gardenScenery.bench.x,y:gardenScenery.bench.y},{frame:3,x:96,y:205},{frame:4,x:128,y:175},{frame:5,x:46,y:219},{frame:5,x:430,y:212}],
  ambient:[{kind:'cloud',x:338,y:35},{kind:'leaf',x:32,y:85},{kind:'leaf',x:447,y:210},{kind:'glow',x:414,y:165},{kind:'glow',x:209,y:120}],
 },
 workshop:{
  props:[{frame:2,x:78,y:245},{frame:2,x:240,y:176},{frame:5,x:64,y:167},{frame:4,x:347,y:158},{frame:7,x:304,y:173}],
  ambient:[{kind:'fire',x:408,y:141},{kind:'glow',x:184,y:49},{kind:'glow',x:269,y:94},{kind:'leaf',x:64,y:124},{kind:'glow',x:308,y:143}],
 },
 forest:{
  props:[{frame:3,x:84,y:199},{frame:3,x:417,y:226},{frame:7,x:286,y:190},{frame:3,x:452,y:197}],
  ambient:[{kind:'cloud',x:230,y:60},{kind:'leaf',x:82,y:147},{kind:'leaf',x:393,y:155},{kind:'glow',x:286,y:160},{kind:'glow',x:364,y:196},{kind:'glow',x:117,y:187}],
 },
};
import {gardenScenery} from './garden-map';
