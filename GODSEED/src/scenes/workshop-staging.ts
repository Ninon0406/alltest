import type {State} from '../engine/state';
import {cores,forms,mods,type Spell} from '../systems/spells';
import type {ActorAnimation} from './actor-art';
/** Authored prop coordinates on the existing workshop floor; never save data. */
export const workshopAnvil={x:321,y:237,width:48,height:32,hit:{x:324,y:217}} as const;
export const koroAnimations={
 idle:{frames:[0,1,2,3],frameRate:4,repeat:-1},
 hammer:{frames:[4,5,6,7],frameRate:6,repeat:-1},
 show_recipe:{frames:[8,9,10,11],frameRate:5,repeat:-1},
 talk:{frames:[8,9,10,11],frameRate:5,repeat:-1},
} satisfies Record<string,ActorAnimation>;

export const workshopChoiceTargets:Record<string,string>={CH0401:'tutor_front',CH0402:'toolbox_front',CH0403:'tutor_front',CH0405:'tutor_front',CH0502:'tutor_front'};
export function workshopCheckpoint(state:State|null){if(!state||state.battle||state.scene!=='S05_CRAFT_TUTORIAL')return 'workshop_entrance';return workshopChoiceTargets[state.choices.at(-1)||'']||'tutor_front';}
/** Ingredient atlas cell indices correspond to real recipe components. */
export function workshopRecipe(spell:Spell){return [cores.indexOf(spell.core),cores.length+forms.indexOf(spell.form),cores.length+forms.length+mods.indexOf(spell.mod)];}
