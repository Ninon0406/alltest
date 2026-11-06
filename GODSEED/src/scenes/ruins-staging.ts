import type {State} from '../engine/state';
export const ruinsActions:Record<string,{anchor:string;pose:'trace'|'musicbox'|'pick_up'|'interact'|'idle';beat:string;effect?:'open'|'song'|'crystal';duration:number}>={
 CH1501:{anchor:'rune_front',pose:'trace',beat:'tracing',effect:'open',duration:1100},
 CH1502:{anchor:'sentinel_front',pose:'idle',beat:'challenge',duration:350},
 CH1503:{anchor:'box_front',pose:'musicbox',beat:'offering',effect:'open',duration:1400},
 CH1504:{anchor:'exit_path',pose:'idle',beat:'exit',duration:0},
 CH1601:{anchor:'rune_front',pose:'trace',beat:'reading',effect:'open',duration:1000},
 CH1602:{anchor:'crystal_front',pose:'pick_up',beat:'collecting',effect:'crystal',duration:900},
 CH1701:{anchor:'tablet_front',pose:'trace',beat:'deciphering',effect:'song',duration:1100},
 CH1702:{anchor:'tablet_front',pose:'trace',beat:'copying',effect:'song',duration:1200},
 CH1703:{anchor:'circle_front',pose:'interact',beat:'listening',effect:'song',duration:1500},
};
export const ruinsAnimations={
 'sentinel-v12':{idle:{frames:[0,1,2,3],frameRate:4,repeat:-1},attack:{frames:[4,5,6,7],frameRate:8,repeat:0},hit:{frames:[8,9,10,11],frameRate:8,repeat:0},guard:{frames:[12,13,14,15],frameRate:5,repeat:-1}},
 'hero-ruins-v12':{trace:{frames:[0,1,2,3,4,5],frameRate:7,repeat:-1},musicbox:{frames:[8,9,10,11],frameRate:5,repeat:-1}},
} as const;
export const altarState=(state:State|null)=>state?.flags.song_fragment?2:state?.flags.ruins_clue||state?.flags.battle_B03_done?1:0;
export function ruinsCheckpoint(state:State|null){
 if(state?.scene==='S16_RUINS_RESULT')return 'circle_front';
 if(state?.scene==='S17_ECHO_TABLET')return state.flags.ruins_box_path?'box_front':state.flags.ruins_crystal_path?'crystal_front':'rune_front';
 return 'shrine_entrance';
}
