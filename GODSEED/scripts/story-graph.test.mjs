import test from 'node:test';
import assert from 'node:assert/strict';
import {analyzeStoryGraph,loadGameCatalog,exploreRealChoices} from './story-graph.mjs';

const c=(id,next,extra={})=>({id,label:id,next,cue:'talk',...extra});
const s=(id,choices,extra={})=>({id,title:id,text:'Authored scene',stage:'village',npc:'pip',choices,...extra});
const fixture=()=>({
 scenes:[s('S00_WAKE',[c('CH0001','S02_HUB')]),s('S02_HUB',[c('CH0201','S02_HUB',{cue:'rest'})])],
 stages:['village'],actors:['pip'],items:{IT_SEED:'seed'},cores:['WIND'],encounters:{},engineFlags:[],npcIds:['PIP'],
 spells:[{id:'SPELL_WIND_ORB_SEEK',power:10,mp:6,vfx:{identity:'WIND/ORB/SEEK'}}],
});
const codes=report=>report.errors.map(e=>e.code);

test('static graph reports structural counts without claiming executable quests or life paths',()=>{
 const report=analyzeStoryGraph(fixture());
 assert.equal(report.result,'PASS');assert.equal(report.counts.storyNodes,2);
 assert.equal(report.counts.structurallyReachableNodes,2);assert.equal(report.counts.declaredEffectChoices,2);
 assert.equal(report.counts.completableQuests,null);assert.equal(report.counts.implementedLifePaths,null);
 assert.ok(report.warnings.some(w=>w.code==='NO_QUEST_CATALOG'));
});
test('missing transitions and duplicated global choice IDs fail',()=>{
 const x=fixture();x.scenes[1].choices.push(c('CH0001','S_TYPO'));
 assert.ok(codes(analyzeStoryGraph(x)).includes('MISSING_NEXT_SCENE'));
 assert.ok(codes(analyzeStoryGraph(x)).includes('DUPLICATE_CHOICE_ID'));
});
test('duplicate source definitions cannot hide behind Object.fromEntries',()=>{
 const x=fixture();x.declaredSceneIds=['S00_WAKE','S02_HUB','S02_HUB'];
 assert.ok(codes(analyzeStoryGraph(x)).includes('DUPLICATE_SCENE_SOURCE'));
});
test('unlinked story nodes and closed non-ending loops fail',()=>{
 const x=fixture();x.scenes.push(s('S_LOST',[c('CHL1','S_LOST')]));
 const report=analyzeStoryGraph(x);
 assert.ok(codes(report).includes('STRUCTURALLY_UNREACHABLE'));
 assert.ok(codes(report).includes('CLOSED_STORY_COMPONENT'));
});
test('reaching a self loop still fails when it cannot escape to a safe hub or ending',()=>{
 const x=fixture();x.scenes[1].choices.push(c('CHLOOP','S_LOOP'));x.scenes.push(s('S_LOOP',[c('CHSTUCK','S_LOOP')]));
 const report=analyzeStoryGraph(x);
 assert.equal(report.counts.structurallyReachableNodes,3);
 assert.ok(codes(report).includes('CLOSED_STORY_COMPONENT'));
});
test('authored ending is allowed to terminate and is distinct from an accidental dead end',()=>{
 const x=fixture();x.scenes[1].choices.push(c('CHEND','V6_END_ORIGINAL'));x.scenes.push(s('V6_END_ORIGINAL',[]));
 assert.equal(analyzeStoryGraph(x).result,'PASS');
 x.scenes[2].id='S_BROKEN';x.scenes[1].choices[1].next='S_BROKEN';
 assert.ok(codes(analyzeStoryGraph(x)).includes('NON_ENDING_DEAD_END'));
});
test('condition typos, impossible flag sources and unknown spell cores fail',()=>{
 const x=fixture();x.scenes[1].choices.push(c('CHBAD','S02_HUB',{requires:'never_produced',when:[{kind:'anyFlag',ids:[]},{kind:'knownCore',core:'FIREE'},{kind:'typo'}]}));
 const result=codes(analyzeStoryGraph(x));
 for(const code of ['UNPRODUCED_FLAG','EMPTY_ANY_FLAG','INVALID_CORE_CONDITION','UNKNOWN_CONDITION'])assert.ok(result.includes(code),code);
});
test('flag produced on an entry or literal engine action is a legal prerequisite',()=>{
 const x=fixture();x.engineFlags.push('crafted_first');x.scenes[1].entryFlags=['entered_hub'];
 x.scenes[1].choices.push(c('CHGATE','S02_HUB',{requires:'entered_hub',when:[{kind:'flag',id:'crafted_first'}]}));
 assert.equal(analyzeStoryGraph(x).result,'PASS');
});
test('reward IDs, quantities, relationship IDs and shared onceFlag guards are checked',()=>{
 const x=fixture();x.scenes[1].choices.push(c('CHREWARD','S02_HUB',{items:{IT_SEEED:-1},trust:'UNKNOWN',trustAmount:-99,onceFlag:'reward_done',flags:['other'],clearFlags:['other'],daily:true}));
 const result=codes(analyzeStoryGraph(x));
 for(const code of ['MISSING_ITEM','INVALID_REWARD_QUANTITY','MISSING_NPC','INVALID_TRUST_AMOUNT','UNSET_ONCE_FLAG','CONFLICTING_FLAGS','CONFLICTING_REWARD_POLICY'])assert.ok(result.includes(code),code);
});
test('battle victory, defeat and dynamic checkpoint recovery are explicit graph edges',()=>{
 const x=fixture();x.scenes[1].choices.push(c('CHFIGHT','S_RESULT',{battle:'B_TEST'}));
 x.scenes.push(s('S_RESULT',[c('CHRETURN','S02_HUB')]),s('S28_RECOVER',[c('CH2801','S02_HUB')]));
 x.encounters.B_TEST={stage:'village',actor:'pip',reward:'IT_SEED',hp:12,power:2,canFlee:true};
 const report=analyzeStoryGraph(x);assert.equal(report.result,'PASS');assert.equal(report.counts.structurallyReachableNodes,4);
 assert.ok(report.edges.some(e=>e.kind==='battleDefeat'&&e.to==='S28_RECOVER'));
 assert.ok(report.edges.some(e=>e.kind==='dynamicRecovery'&&e.to==='S02_HUB'));
});
test('scene staging and source choice cinematic anchors resolve against real map metadata',()=>{
 const x=fixture();x.locations={village_center:{anchors:{fountain:{x:100,y:200},wall:{x:0,y:0}}}};
 x.locationFor=()=> 'village_center';x.walkable=(_,p)=>p.x>0;
 x.scenes[1].staging={location:'village_center',anchor:'fountain'};
 x.scenes[1].choices[0].cinematic={anchor:'fountain',pose:'interact',effect:'lantern'};
 assert.equal(analyzeStoryGraph(x).result,'PASS');
 x.scenes[1].choices[0].cinematic={anchor:'wall',pose:'fly',effect:'explosion'};
 const result=codes(analyzeStoryGraph(x));
 for(const code of ['BLOCKED_ANCHOR','INVALID_CINEMATIC_POSE','INVALID_CINEMATIC_EFFECT'])assert.ok(result.includes(code));
 x.scenes[1].staging.location='typo';
 assert.ok(codes(analyzeStoryGraph(x)).includes('MISSING_LOCATION'));
});
test('authored time cuts accept supported boundaries and reject misspelled phases',()=>{
 const x=fixture();x.scenes[1].choices[0].time='evening';assert.equal(analyzeStoryGraph(x).result,'PASS');x.scenes[1].choices[0].time='next-morning';assert.equal(analyzeStoryGraph(x).result,'PASS');x.scenes[1].choices[0].time='yesterday';assert.ok(codes(analyzeStoryGraph(x)).includes('INVALID_STORY_TIME'));
});
test('structured quest chains reject wrong scene references and unconnected steps',()=>{
 const x=fixture();x.engineFlags.push('quest_done');
 x.quests=[{id:'Q_ORIGINAL',startScene:'S00_WAKE',completionFlag:'quest_done',steps:[{id:'start',scene:'S00_WAKE',choice:'CH0001',next:['end']},{id:'end',scene:'S02_HUB',choice:'CH0201'}]}];
 assert.equal(analyzeStoryGraph(x).result,'PASS');
 x.quests[0].steps.push({id:'lost',scene:'S02_HUB',choice:'CH0001',next:['typo']});
 const result=codes(analyzeStoryGraph(x));
 for(const code of ['MISSING_QUEST_CHOICE','MISSING_QUEST_STEP','UNREACHABLE_QUEST_STEP'])assert.ok(result.includes(code));
});
test('invalid recipe definitions fail instead of inflating usable spell counts',()=>{
 const x=fixture();x.spells.push({...x.spells[0],power:NaN,mp:-1,vfx:null});
 const result=codes(analyzeStoryGraph(x));
 for(const code of ['DUPLICATE_RECIPE_ID','INVALID_RECIPE_STATS','MISSING_RECIPE_VFX'])assert.ok(result.includes(code));
});
test('actual catalog and bounded real reducer exploration remain separate proof levels',async()=>{
 const catalog=await loadGameCatalog(),report=analyzeStoryGraph(catalog);
 assert.equal(report.result,'PASS',JSON.stringify(report.errors));
 assert.ok(report.counts.storyNodes>=21);assert.ok(report.counts.choices>=70);assert.equal(report.counts.uniqueRecipes,234);
 const witnesses=exploreRealChoices(catalog,{maxStates:200,maxMs:3000});
 assert.equal(witnesses.result,'PASS_BOUNDED',JSON.stringify(witnesses.failures));
 assert.ok(witnesses.counts.witnessedNodes>1);assert.ok(witnesses.counts.successfulChoices>1);
 assert.equal(witnesses.counts.witnessedNodes+witnesses.unverifiedNodes.length,report.counts.storyNodes);
});
