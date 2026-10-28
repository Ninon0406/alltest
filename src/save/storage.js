import { validAppearance } from '../character/appearance.js';
import { initialCharacter } from '../character/initial.js';
import { Scenes } from '../data/scenes.js';
import { generateBirth } from '../character/rebirth.js';
import { upgradeState } from '../engine/migrate.js';
import { locations } from '../world/locations.js';
export const SAVE_VERSION=3;
const canonical=value=>JSON.stringify(value,(_,item)=>item&&typeof item==='object'&&!Array.isArray(item)?Object.fromEntries(Object.entries(item).sort(([a],[b])=>a.localeCompare(b))):item);
const strings=value=>Array.isArray(value)&&value.every(item=>typeof item==='string');
const nonnegative=value=>Number.isSafeInteger(value)&&value>=0;
export function decodeSave(raw){
 if(raw.length>5000000)throw Error('Save too large');
 const parsed=JSON.parse(raw);
 if(!parsed || (parsed.version!==undefined && ![1,2,3].includes(parsed.version)))throw Error('Unsupported save version');
 const state=parsed.version!==undefined?parsed.state:parsed;
 if(!state||!Scenes[state.currentSceneId])throw Error('Unknown scene');
 for(const [key,value] of Object.entries(initialCharacter)){
  if(typeof state[key]!==typeof value || state[key]===null)throw Error('Invalid state');
  if(typeof value==='number'&&!Number.isFinite(state[key]))throw Error('Invalid number');
  if(Array.isArray(value)&&!strings(state[key]))throw Error('Invalid list');
  if(typeof value==='object'&&!Array.isArray(value))for(const field of Object.keys(value))if(!Number.isFinite(state[key][field]))throw Error('Invalid attributes');
 }
 if(state.age<0 || !nonnegative(Math.floor(state.age)) || state.day<1)throw Error('Invalid age');
 for(const max of ['maxHp','maxMana','maxStamina'])if(state[max]<=0)throw Error('Invalid capacity');
 if(state.birth!==undefined && canonical(state.birth)!==canonical(generateBirth(state.birth.seed,state.birth.generatorVersion).birth))throw Error('Invalid birth record');
 if(state.appearance!==undefined&&!validAppearance(state.appearance))throw Error('Invalid appearance');
 if(parsed.version===3){
  const t=state.time,l=state.life,w=state.world;
  if(!t||!nonnegative(t.birthAbsoluteDay)||!nonnegative(t.absoluteDay)||t.absoluteDay<t.birthAbsoluteDay||!Number.isFinite(t.lifespanYears)||t.lifespanYears<=0)throw Error('Invalid calendar');
  if(!l||!['annual','legacy'].includes(l.mode)||!strings(l.completed)||!Array.isArray(l.randomYears)||!l.randomYears.every(y=>nonnegative(y)&&y<12)||!nonnegative(l.revision)||!nonnegative(l.page)||l.page>1)throw Error('Invalid story');
  if(!Number.isFinite(state.morale))throw Error('Invalid morale');
  if(w?.studied!==undefined&&!strings(w.studied))throw Error('Invalid study history');
  if(l.legacySceneId!==undefined&&!Scenes[l.legacySceneId])throw Error('Invalid legacy chapter');
  if(!w||!locations[w.currentLocationId]||!strings(w.visited)||!w.visited.every(id=>locations[id])||!Array.isArray(w.ledger)||!w.ledger.every(e=>Number.isFinite(e.amount)&&locations[e.location]&&typeof e.source==='string'))throw Error('Invalid world');
  if(!w.inventory||!Object.entries(w.inventory).every(([id,qty])=>id==='bread'&&Number.isSafeInteger(qty)&&qty>0&&qty<=20))throw Error('Invalid inventory');
  if(!Array.isArray(state.journal)||!state.journal.every(e=>typeof e.title==='string'&&nonnegative(e.day)&&typeof e.location==='string')||!Array.isArray(state.chronicle)||!state.chronicle.every(e=>nonnegative(e.age)&&Array.isArray(e.actions)&&e.actions.every(a=>typeof a.title==='string')))throw Error('Invalid chronicle');
 }
 return upgradeState(state);
}
export function readSave(storage){
 const raw=storage.getItem('reborn_save');if(!raw)return null;
 const state=decodeSave(raw);
 if(JSON.parse(raw).version!==3 && !storage.getItem('reborn_save_backup_before_v3'))storage.setItem('reborn_save_backup_before_v3',raw);
 return state;
}
export function writeSave(storage,state){storage.setItem('reborn_save',JSON.stringify({version:SAVE_VERSION,state:upgradeState(state)}));}
