import {v8CommunityEvents} from '../src/data/v8-community-events.js';
const communityIds=new Set(v8CommunityEvents.map(e=>e.id));
export const v8CallbackPaths={
 'family-table':'family','hard-assignment':'library','public-project':'library','open-study':'library',
 'family-reunion':'family','family-letter':'family','workshop-commission':'fairwork','delayed-payment':'fairwork','payment-followup':'fairwork',
 'archive-review':'library','community-library':'library','school-return':'library',
 'unfair-request':'fairwork','rival-alliance':'fairwork','alliance-review':'fairwork','work-handover':'fairwork',
 'care-circle':'circle','care-handover':'circle',
};
// Test policies select through the real reducer/UI, never write flags, age or money.
const paths={
 library:{'v8.hard-assignment':'revise','v8.study-funds':'self','v8.open-study':'notebook','v8.archive-review':'verify','v8.community-library':'publish','v8.school-return':'pass'},
 family:{'v8.family-table':'listen','v8.family-reunion':'reconcile','v8.family-letter':'exchange'},
 circle:{'v8.care-circle':'organize','v8.care-handover':'share'},
 fairwork:{'v8.first-contract':'work','v8.workshop-commission':'partner','v8.delayed-payment':'collect','v8.unfair-request':'document','v8.rival-alliance':'trial','v8.alliance-review':'audit','v8.work-handover':'records'},
};
export function chooseV8StoryPath(d,path='quiet'){
 if(path==='varied')return null;
 const id=paths[path]?.[d.id];
 if(id){const choice=d.choices.find(c=>c.id===id);if(!choice||choice.disabled)throw Error(`Story path ${path} cannot choose ${d.id}:${id}: ${choice?.unavailable}`);return choice;}
 return communityIds.has(d.id)?d.choices.at(-1):null;
}
