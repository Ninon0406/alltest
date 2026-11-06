import type {ActorAnimation} from './actor-art';
/** Authored prop coordinates on the existing workshop floor; never save data. */
export const workshopAnvil={x:321,y:237,width:48,height:32,hit:{x:324,y:217}} as const;
export const koroAnimations={
 idle:{frames:[0,1,2,3],frameRate:4,repeat:-1},
 hammer:{frames:[4,5,6,7],frameRate:6,repeat:-1},
 show_recipe:{frames:[8,9,10,11],frameRate:5,repeat:-1},
 talk:{frames:[8,9,10,11],frameRate:5,repeat:-1},
} satisfies Record<string,ActorAnimation>;
