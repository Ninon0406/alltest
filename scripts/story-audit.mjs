import {readFileSync} from 'node:fs';
import {storyEvents} from '../src/engine/development.js';
import {statKeys} from '../src/data/careers.js';
export function auditStoryDefinitions(){
 const source=JSON.parse(readFileSync(new URL('../docs/v7/05_STORY_SOURCE.json',import.meta.url),'utf8'));
 const ids=new Map(storyEvents.map(e=>[e.id,e])),flags=new Set();
 const walk=(effects,visit)=>{for(const e of effects){visit(e);if(e.op==='when')walk(e.effects,visit);}};
 for(const event of storyEvents)for(const choice of event.choices)walk(choice.effects,e=>{if(e.op==='flag')flags.add(e.key);});
 function requirements(r={}){
  for(const key of Object.keys(r))if(!['completed','awakeningComplete','allFlags','anyFlags','practiced'].includes(key))throw Error('Unknown story requirement: '+key);
  for(const id of r.completed??[])if(!ids.has(id))throw Error('Missing story prerequisite: '+id);
  for(const key of [...r.allFlags??[],...r.anyFlags??[]])if(!flags.has(key))throw Error('Missing flag producer: '+key);
 }
 for(const event of storyEvents){
  if(event.month>event.maxMonth||event.choices.length!==3)throw Error('Invalid story window/choice count');requirements(event.requirements);
  if(event.sourceId){const brief=source.lifeEvents.find(e=>e.id===event.sourceId);if(!brief||event.month<brief.minMonths||event.maxMonth>brief.maxMonths)throw Error('Source age window mismatch: '+event.id);}
  for(const choice of event.choices){
   requirements(choice.requirements);for(const f of choice.requires??[])if(!flags.has(f))throw Error('Unknown choice flag');
   if(choice.cost&&(!Number.isSafeInteger(choice.cost.gold)||choice.cost.gold<0||choice.cost.discountFlag&&(!flags.has(choice.cost.discountFlag)||!Number.isSafeInteger(choice.cost.discount)||choice.cost.discount<0)))throw Error('Invalid story cost');
   walk(choice.effects,e=>{if(!['when','memory','relationship','flag','learning','wage'].includes(e.op))throw Error('Unknown story effect');if(e.op==='when'&&!flags.has(e.key))throw Error('Missing delayed flag');if(e.op==='learning'&&!statKeys.includes(e.key))throw Error('Unknown learning stat');});
  }
 }
 const visited=new Set(),visiting=new Set();function visit(id){if(visiting.has(id))throw Error('Cyclic story prerequisites');if(visited.has(id))return;visiting.add(id);for(const dep of ids.get(id).requirements?.completed??[])visit(dep);visiting.delete(id);visited.add(id);}for(const id of ids.keys())visit(id);
 return {forkDefinitions:ids.size,adaptedBriefs:storyEvents.filter(e=>e.sourceId).length};
}
