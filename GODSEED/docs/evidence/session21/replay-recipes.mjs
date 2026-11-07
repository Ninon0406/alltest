// Re-run the stored earned-material paths with real reducers. No fixture items.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {loadGameCatalog} from '../../../scripts/story-graph.mjs';
const dir=new URL('./',import.meta.url),graph=JSON.parse(await readFile(new URL('story-graph.json',dir))),catalog=await loadGameCatalog(),rt=catalog.runtime;
assert.match(graph.playableWitnesses.scope,/seed 12345/);
const records=[],categories={healing:0,shield:0,offensive:0};
for(const [id,witness] of Object.entries(graph.playableWitnesses.craftedRecipeWitnesses)){
 let s=rt.fresh('Recipe witness',12345);
 for(const command of witness.path){
  if(command.choice){const choice=catalog.scenes[s.scene].choices.find(c=>c.id===command.choice);assert.ok(choice,command.choice);assert.equal(rt.choiceAvailability(s,choice).enabled,true,command.choice);s=rt.choose(s,command.choice);}
  else if(command.craft){
   const recipe=catalog.spells.find(sp=>sp.id===command.craft);assert.ok(recipe);assert.equal(s.known.includes(recipe.id),false);
   const components=['CORE_'+recipe.core,'FORM_'+recipe.form,'MOD_'+recipe.mod],before=components.map(id=>s.inventory[id]);assert.ok(before.every(n=>n>0));
   s=rt.craft(s,recipe.core,recipe.form,recipe.mod);assert.ok(s.known.includes(recipe.id));for(const [i,id] of components.entries())assert.equal(s.inventory[id],before[i]-1,id);
  }else if(command.battlePolicy){for(const action of command.actions)s=rt.fight(s,action);assert.equal(s.battle,undefined);}
  else if(command.fight)s=rt.fight(s,command.fight);
  else throw Error('Unrecognized witness command');
 }
 assert.ok(s.known.includes(id),id);const recipe=catalog.spells.find(sp=>sp.id===id);categories[recipe.heal?'healing':recipe.shield?'shield':'offensive']++;
 records.push({id,result:'PASS',pathCommands:witness.path.length,learnedInScene:s.scene});
}
assert.equal(records.length,234);assert.deepEqual(catalog.spells.map(sp=>sp.id).sort(),records.map(r=>r.id).sort());
const sourceFiles=['engine/state.ts','systems/game.ts','systems/combat.ts','systems/spells.ts','systems/life-paths.ts','content/story.ts','content/life-story.ts'],sourceSha256={};for(const file of sourceFiles)sourceSha256[file]=createHash('sha256').update(await readFile(new URL('../../../src/'+file,dir))).digest('hex');
const report={result:'PASS',recordedAt:new Date().toISOString(),scope:'234 independent runs from fresh seed12345, replaying actual choices and battle actions before each craft. Each recipe consumes real earned components exactly once and enters the spell book. No inventory/flags/HP/MP injection, browser state, save export or upload. This does not mean all234 are owned in one run or that all VFX/strategy differences were browser-tested.',recipes:records.length,categories,sourceSha256,records};await writeFile(new URL('recipe-replay.json',dir),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({result:report.result,recipes:records.length,categories}));
