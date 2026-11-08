import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {loadGameCatalog} from '../../../scripts/story-graph.mjs';
const folder=new URL('./',import.meta.url),report=JSON.parse(await readFile(new URL('after-graph.json',folder))),prior=JSON.parse(await readFile(new URL('../session23/after-graph.json',folder))),special=JSON.parse(await readFile(new URL('../session23/extra-choice-witnesses.json',folder))),catalog=await loadGameCatalog(),rt=catalog.runtime;
assert.equal(report.result,'PASS');assert.equal(report.playableWitnesses.result,'PASS_BOUNDED');
const choices=new Set(report.playableWitnesses.successfulChoiceIds),changed=new Set(report.playableWitnesses.stateChangingChoiceIds),recipes=new Set(Object.keys(report.playableWitnesses.craftedRecipeWitnesses)),records=[];
const effects=s=>JSON.stringify([s.hp,s.mp,s.xp,s.inventory,s.known,s.equipped,s.flags,s.trust,s.battle,s.recoveryScene]);
function runner(path=[],seed=12345){
 let s=rt.fresh('Replay witness',seed),steps=[];
 function step(command){
  const before=s;
  if(command.choice){const c=catalog.scenes[s.scene].choices.find(c=>c.id===command.choice);assert.ok(c,command.choice+' in '+s.scene);assert.ok(rt.choiceAvailability(s,c).enabled,command.choice);s=rt.choose(s,c.id);choices.add(c.id);if(effects(before)!==effects(s))changed.add(c.id);}
  else if(command.craft){const sp=rt.spells.find(sp=>sp.id===command.craft);s=rt.craft(s,sp.core,sp.form,sp.mod);assert.ok(s.known.includes(sp.id));recipes.add(sp.id);}
  else if(command.fight)s=rt.fight(s,command.fight);
  else if(command.battlePolicy){for(const a of command.actions)s=rt.fight(s,a);assert.equal(s.battle,undefined);}
  else throw Error('Unknown replay step');steps.push(command);return s;
 }
 for(const command of path)step(command);
 const take=(...ids)=>{for(const choice of ids)step({choice});return s;};
 function win(){const actions=[];for(let i=0;s.battle&&i<120;i++){
  const sp=s.equipped.map(id=>rt.spells.find(sp=>sp.id===id)).filter(sp=>sp.mp<=s.mp&&!sp.heal&&!sp.shield).sort((a,b)=>b.power*b.hits-a.power*a.hits)[0];
  const action=s.hp<=25&&s.inventory.IT_POTION_DEW?'IT_POTION_DEW':sp?.id||'GUARD';s=rt.fight(s,action);actions.push(action);
 }assert.equal(s.battle,undefined);assert.notEqual(s.scene,'S28_RECOVER');steps.push({battlePolicy:'recorded',actions});}
 const record=id=>records.push({id,seed,result:'PASS',scene:s.scene,path:structuredClone(steps)});
 return {get state(){return s;},take,step,win,record};
}
// Re-execute every previously earned recipe path against the current reducers.
for(const [id,w] of Object.entries(prior.playableWitnesses.craftedRecipeWitnesses)){const r=runner(w.path);assert.ok(r.state.known.includes(id));recipes.add(id);}
for(const w of special.witnesses){const r=runner(w.path,w.seed);r.record(w.id);}
const decisionPath=report.playableWitnesses.nodeWitnesses.S23_DECISION;
for(const [kind,ending,after,trace] of [['family','CH2401','CHG_FAMILY_STAY','CHA2_TRACE_FAMILY'],['community','CH2501','CHG_COMMUNITY_PATH','CHA2_TRACE_COMMUNITY'],['archive','CH2601','CHG_ARCHIVE_QUESTION','CHA2_TRACE_ARCHIVE']]){
 // This changes an actual earlier choice, never a saved flag or inventory value.
 const path=decisionPath.map(step=>step.choice==='CHPIP_KEEP'?{choice:'CHPIP_SHARE'}:step);
 const r=runner(path);r.take(kind==='family'?'CH2301':kind==='community'?'CH2302':'CH2303',ending,after,'CH2701');
 if(!r.state.flags.pip_shared_fruit){assert.ok(!r.state.flags.pip_fruit_decided);r.take('CHPIP_HUB');if(!r.state.flags.pip_fruit_helped)r.take('CH2901');else r.take('CHPIP_REMEMBER');r.take('CHPIP_SHARE','CHPIP_FINISH');}
 r.take(...Array(7).fill('CH0210'));
 if(!r.state.flags.lp_explorer_rank2){r.take('CHLP_HUB','CHLP_START_EXPLORER','CHLP_E_BEGIN','CHLP_E_SURVEY_FEET','CHLP_E_MARK_RIBBON','CHLP_E_ACK_MAP','CHLP_E_TRIAL_START');r.win();r.take('CHLP_E_RANK2_SHARE','CHLP_E_HOME_REST');}
 if(!r.state.flags.lp_nature_rank2){r.take('CHLP_HUB','CHLP_START_NATURE','CHLP_N_BEGIN','CHLP_N_SOURCE_CLEAR','CHLP_N_WATER_BUCKET','CHLP_N_ACK_PATIENCE','CHLP_N_TRIAL_START');r.win();r.take('CHLP_N_RANK2_REFUGE','CHLP_N_HOME_REST');}
 // Get an authored Echo core if the earlier path did not collect one.
 if(!r.state.inventory.CORE_ECHO&&!r.state.known.some(id=>id.startsWith('SPELL_ECHO_')))r.take('CH0204','CH0703','CH1402');
 r.take('CHA2_HUB','CHA2_CALL_PACK','CHA2_PACK_TAKE');
 for(const core of ['WATER','BLOOM','ECHO'])if(!r.state.known.some(id=>rt.spells.find(sp=>sp.id===id)?.core===core)){
  const sp=rt.spells.find(sp=>sp.core===core&&['CORE_'+core,'FORM_'+sp.form,'MOD_'+sp.mod].every(id=>r.state.inventory[id]>0));assert.ok(sp,'earned '+core+' recipe');r.step({craft:sp.id});
 }
 r.take('CHA2_RECIPE_LEAVE','CHA2_GOODBYE_PROMISE','CHA2_EDGE_MARK','CHA2_MARK_NOTE','CHA2_ROOT_SOIL','CHA2_DRY_WATER','CHA2_BROOK_SAMPLE','CHA2_PIP_MEMORY','CHA2_HOLLOW_ECHO','CHA2_RING_NATURE','CHA2_TRIAL_FRIEND','CHA2_RESULT_COMPARE',trace,'CHA2_LEGACY_LIMIT','CHA2_DECIDE_CARE','CHA2_CARE_RETURN','CHA2_RETURN_PAUSE','CHA2_HUB','CHA2_CALL_RESUME','CHA2_RETURN_PAUSE','CHA2_HUB','CHA2_CALL_PACK','CHA2_PACK_TAKE','CHA2_RECIPE_LEAVE','CHA2_GOODBYE_SKETCH','CHA2_EDGE_MARK','CHA2_MARK_SCOUT','CHA2_HOLLOW_ECHO','CHA2_RING_BLOOM','CHA2_TRIAL_FRIEND','CHA2_RESULT_COMPARE','CHA2_TRACE_OBSERVE','CHA2_LEGACY_CARE','CHA2_DECIDE_RECALL','CHA2_RETURN_EIRA','CHA2_EIRA_SHARE','CHA2_EPILOGUE_FINISH');
 assert.ok(r.state.flags.a2_returned);assert.ok(r.state.flags.a2_resolution_care);assert.ok(!r.state.flags.a2_resolution_path);r.record('ARC2_'+kind+'_knowledge_paths_and_pause');
}
const all=Object.values(catalog.scenes).flatMap(s=>s.choices.map(c=>c.id)),missing=all.filter(id=>!choices.has(id));assert.deepEqual(missing,[]);assert.equal(recipes.size,234);
const summary={result:'PASS',at:new Date().toISOString(),scope:'Current bounded reducer search plus re-executed historical recipe/choice paths and original ARC2 paths. Fresh states and earned commands only; no injected flags/items; not an all-seed or browser proof.',nodeCount:report.playableWitnesses.counts.witnessedNodes,successfulChoiceCount:choices.size,stateChangingChoiceCount:changed.size,craftedRecipeCount:recipes.size,missingChoiceIds:missing,successfulChoiceIds:[...choices].sort(),stateChangingChoiceIds:[...changed].sort(),recipeIds:[...recipes].sort(),witnesses:records};
await writeFile(new URL('combined-witnesses.json',folder),JSON.stringify(summary,null,2)+'\n');await writeFile(new URL('node-contracts.json',folder),JSON.stringify(report.nodeContracts)+'\n');console.log(JSON.stringify({result:summary.result,nodes:summary.nodeCount,choices:summary.successfulChoiceCount,stateChangingChoices:summary.stateChangingChoiceCount,recipes:summary.craftedRecipeCount}));
