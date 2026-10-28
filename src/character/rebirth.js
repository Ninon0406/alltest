import { selectOrigin } from '../data/archetypes.js';
import { upgradeState } from '../engine/migrate.js';
import { createAppearance } from './appearance.js';
import { initialCharacter } from './initial.js';
import { seededRandom } from '../engine/random.js';
import { names, rarities, races, households, histories, homelands, talents, hiddenAbilities } from '../data/birth.js';
export function weightedPick(random, table) {
  if (!table.length || table.some(item => !Number.isFinite(item.weight) || item.weight <= 0)) throw new Error('Invalid weights');
  let cursor = random() * table.reduce((sum,item) => sum + item.weight, 0);
  for (const item of table) { cursor -= item.weight; if (cursor < 0) return item; }
  return table.at(-1);
}
export function generateBirthV1(seed) {
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) throw new Error('Invalid seed');
  const random = seededRandom(seed);
  const pick = items => items[Math.floor(random() * items.length)];
  const roll = (min,max) => min + Math.floor(random() * (max-min+1));
  const state = structuredClone(initialCharacter);
  const rarity = weightedPick(random, rarities), race = weightedPick(random, races);
  state.name = pick(names); state.race = race.label; state.family = pick(households);
  state.location = pick(homelands); state.gold = roll(...rarity.gold);
  // Talent, each attribute and hidden potential have independent draws. No player selection.
  for (const key of Object.keys(state.stats)) state.stats[key] = roll(9,15);
  const talent = weightedPick(random, talents);
  const maxKey = { hp:'maxHp', stamina:'maxStamina', mana:'maxMana' }[talent.resource];
  state[maxKey] += talent.bonus; state[talent.resource] = state[maxKey];
  state.traits.push(talent.label);
  const parentNames = names.filter(name => name !== state.name);
  const mother = pick(parentNames), father = pick(parentNames.filter(name => name !== mother));
  state.birth = {
    generatorVersion:1, seed, rarity:rarity.id, raceId:race.id, talent:talent.id,
    parents:{mother, father, motherOccupation:pick(households), fatherOccupation:pick(households)},
    history:pick(histories), lifespan:roll(...race.lifespan), potential:roll(1,100),
    hiddenAbility:weightedPick(random, hiddenAbilities).id,
    initial:{name:state.name,race:state.race,family:state.family,location:state.location,gold:state.gold,stats:{...state.stats},maxHp:state.maxHp,maxMana:state.maxMana,maxStamina:state.maxStamina},
  };
  state.appearance = createAppearance(state);
  return state;
}

export function generateBirth(seed,version=2) {
 if(version===1)return generateBirthV1(seed);
 if(version!==2)throw Error('Unsupported birth generator');
 const state=generateBirthV1(seed),random=seededRandom(seed ^ 0xb175eed);
 const {archetype,location}=selectOrigin(random);
 state.family=archetype.label;state.gold=archetype.socioeconomicProfile.gold;state.reputation=archetype.familyReputation;state.location=location.name;
 state.birth={...state.birth,generatorVersion:2,appearanceSeed:(seed ^ 0xa71a5)>>>0,archetypeId:archetype.id,locationId:location.id,
  initial:{...state.birth.initial,family:state.family,gold:state.gold,location:state.location}};
 delete state.birth.rarity;
 return upgradeState(state,{fresh:true});
}
