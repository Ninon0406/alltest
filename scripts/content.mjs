import { Scenes } from '../src/data/scenes.js';
import { names, rarities, races, households, histories, homelands, talents, hiddenAbilities } from '../src/data/birth.js';
const scenes=Object.values(Scenes);
console.log(JSON.stringify({scenes:scenes.length,choices:scenes.reduce((n,s)=>n+(s.choices?.length??0),0),endings:scenes.filter(s=>s.isEnding).length,
  names:new Set(names).size,birthRarities:rarities.length,races:races.length,households:households.length,householdHistories:histories.length,homelands:homelands.length,talents:talents.length,rareHiddenAbilities:hiddenAbilities.filter(a=>a.id!=='none').length},null,2));
