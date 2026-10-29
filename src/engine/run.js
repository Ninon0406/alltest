import { generateBirth } from '../character/rebirth.js';
import {createStory} from './development.js';
import {createInheritedAppearance} from '../character/inheritance.js';
import {createWardrobe} from '../character/wardrobe.js';
export function createRun(seed,{id,startedAt}){
 if(typeof id!=='string'||!id||!Number.isFinite(Date.parse(startedAt)))throw Error('Invalid run identity');
 const state=generateBirth(seed);state.appearance=createInheritedAppearance(seed);state.wardrobe=createWardrobe(seed);state.power={version:1,level:1};state.story=createStory();state.yearly.focus='care';state.run={id,startedAt,status:'active',activeMs:0};
 return state;
}
// Only visible time within 15 seconds of a real interaction counts as engagement.
export class ActivePlayClock{
 constructor(){this.total=0;this.last=0;this.until=0;this.visible=false;}
 start(now){this.total=0;this.last=now;this.until=now+15000;this.visible=true;}
 sample(now){if(this.visible)this.total+=Math.max(0,Math.min(now,this.until)-this.last);this.last=now;return Math.floor(this.total);}
 interact(now){this.sample(now);if(this.visible)this.until=now+15000;}
 pause(now){this.sample(now);this.visible=false;this.until=0;}
 resume(now){this.last=now;this.visible=true;this.until=0;}
}
