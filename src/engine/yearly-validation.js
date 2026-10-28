import { yearlyActivities,lifeMilestones } from '../data/yearly.js';
import { careerEvents } from '../data/events/careers.js';
import { statKeys } from '../data/careers.js';
const integer=n=>Number.isSafeInteger(n)&&n>=0;
export function validateYearly(state){
 const y=state.yearly;
 if(!y||!['yearly','detailed'].includes(y.view)||!yearlyActivities.some(a=>a.id===y.focus)||!statKeys.includes(y.stat)||!Array.isArray(y.completed)||!y.completed.every(id=>id==='turn.awakening'||lifeMilestones.some(e=>e.id===id)))throw Error('Invalid yearly plan');
 for(const key of ['lastMajorAge','lastCareerAge'])if(y[key]!==null&&!integer(y[key]))throw Error('Invalid yearly checkpoint');
 if(!y.cooldowns||Array.isArray(y.cooldowns)||!Object.entries(y.cooldowns).every(([id,age])=>careerEvents.some(e=>e.id===id)&&integer(age)))throw Error('Invalid yearly cooldown');
 if(!Array.isArray(y.reports)||y.reports.length>200||!y.reports.every(r=>integer(r.age)&&yearlyActivities.some(a=>a.id===r.focusId)&&integer(r.startDay)&&integer(r.endDay)&&r.endDay>r.startDay&&integer(r.days)&&r.days===r.endDay-r.startDay&&Number.isFinite(r.goldDelta)&&r.counts&&Object.values(r.counts).every(integer)&&r.statDeltas&&Object.entries(r.statDeltas).every(([key,n])=>statKeys.includes(key)&&Number.isFinite(n))&&typeof r.location==='string'))throw Error('Invalid yearly report');
}
