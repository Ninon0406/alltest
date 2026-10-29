import {seededRandom} from '../engine/random.js';
import {traitGroups} from '../data/appearance-v2.js';
export const inheritedTraits=Object.keys(traitGroups);
const phenotype=value=>value&&inheritedTraits.every(k=>Number.isSafeInteger(value[k])&&value[k]>=0&&value[k]<20);
export function createInheritedAppearance(seed){
 const random=seededRandom(seed^0x79f23a46),make=()=>Object.fromEntries(inheritedTraits.map(k=>[k,Math.floor(random()*20)]));
 const parents={mother:make(),father:make()},mutation=random()<.2?inheritedTraits[Math.floor(random()*5)]:null;
 const result={version:2,parents,inheritance:{}};
 for(const key of inheritedTraits){
  const from=random()<.5?'mother':'father',base=parents[from][key],variation=key===mutation;
  result[key]=variation?(base===0?1:base===19?18:base+(random()<.5?-1:1)):base;
  result.inheritance[key]={from,variation};
 }
 return result;
}
export function validInheritedAppearance(a){
 if(a?.version!==2||!phenotype(a)||!phenotype(a.parents?.mother)||!phenotype(a.parents?.father))return false;
 let variations=0;
 for(const key of inheritedTraits){const origin=a.inheritance?.[key];if(!origin||!['mother','father'].includes(origin.from)||typeof origin.variation!=='boolean')return false;
  const delta=Math.abs(a[key]-a.parents[origin.from][key]);if(origin.variation){if(delta!==1)return false;variations++;}else if(delta!==0)return false;
 }
 return variations<=1;
}
export function appearanceSnapshot(a){
 if(a?.version===2){
  if(!validInheritedAppearance(a))throw Error('ข้อมูลรูปลักษณ์ไม่ถูกต้อง');
  const traits=p=>Object.fromEntries(inheritedTraits.map(k=>[k,p[k]]));
  return {version:2,...traits(a),parents:{mother:traits(a.parents.mother),father:traits(a.parents.father)},inheritance:Object.fromEntries(inheritedTraits.map(k=>[k,{from:a.inheritance[k].from,variation:a.inheritance[k].variation}]))};
 }
 return a?Object.fromEntries(['version',...inheritedTraits].filter(k=>Number.isSafeInteger(a[k])).map(k=>[k,a[k]])):null;
}
