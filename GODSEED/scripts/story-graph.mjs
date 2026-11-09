import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const cueKinds=new Set(['walk','talk','pick','cast','rest']);
const poses=new Set(['interact','talk','pick_up','cast','rest','water']);
const effects=new Set(['lantern','song','leaf']);
const present=value=>typeof value==='string'&&value.trim().length>0;
const ending=scene=>scene.conclusion==='game'||scene.conclusion!=='chapter'&&(scene.terminal===true||scene.ending===true);

/** Data validation and graph reachability. Conditions are NOT assumed satisfied. */
export function analyzeStoryGraph(catalog,{start='S00_WAKE',safeHubs=['S02_HUB'],recoveryScene='S28_RECOVER'}={}){
 const rows=Array.isArray(catalog.scenes)?catalog.scenes:Object.values(catalog.scenes||{});
 const scenes=new Map(),choices=new Map(),edges=[],errors=[],warnings=[];
 const error=(code,at,message)=>errors.push({code,at,message});
 const warn=(code,at,message)=>warnings.push({code,at,message});
 const stages=new Set(catalog.stages||[]),actors=new Set(catalog.actors||[]),items=new Set(Object.keys(catalog.items||{}));
 const cores=new Set(catalog.cores||[]),encounters=catalog.encounters||{},locations=catalog.locations||{};
 const lifePathIds=new Set((catalog.lifePaths||[]).map(p=>p.id));
 const flagSources=new Set(catalog.engineFlags||[]);
 for(const scene of rows){
  if(!present(scene.id)){error('INVALID_SCENE_ID','scene','Scene ID must be a nonempty string');continue;}
  if(scenes.has(scene.id))error('DUPLICATE_SCENE_ID',scene.id,'Scene ID occurs more than once');
  scenes.set(scene.id,scene);
  for(const flag of scene.entryFlags||[])flagSources.add(flag);
  for(const choice of scene.choices||[])for(const flag of choice.flags||[])flagSources.add(flag);
 }
 if(catalog.declaredSceneIds){
  const seen=new Set();for(const id of catalog.declaredSceneIds){if(seen.has(id))error('DUPLICATE_SCENE_SOURCE',id,'Duplicate authored scene would be overwritten by Object.fromEntries');seen.add(id);}
 }
 const requireFlag=(flag,at)=>{
  if(!present(flag))error('INVALID_FLAG',at,'Flag ID must be a nonempty string');
  else if(!flagSources.has(flag))error('UNPRODUCED_FLAG',at,'No authored choice, scene entry or literal engine assignment produces '+flag);
 };
 const seenPaths=new Set(),seenAbilities=new Set();
 for(const p of catalog.lifePaths||[]){
  if(!present(p.id)||seenPaths.has(p.id))error('DUPLICATE_LIFE_PATH',p.id,'Life path IDs must be present and unique');seenPaths.add(p.id);
  if(!present(p.ability?.id)||seenAbilities.has(p.ability.id))error('INVALID_PATH_ABILITY',p.id,'Each path needs a distinct ability');seenAbilities.add(p.ability?.id);
  if(catalog.npcIds&&!catalog.npcIds.includes(p.mentorId))error('MISSING_PATH_MENTOR',p.id,'Unknown mentor '+p.mentorId);
  if(!locations[p.locationId])error('MISSING_PATH_LOCATION',p.id,'Unknown lesson location '+p.locationId);
  for(const flag of [p.startedFlag,p.rank1Flag,p.trialFlag,p.rank2Flag,...(p.requirements?.start||[]).map(o=>o.flag),...(p.requirements?.rank1||[]).map(o=>o.flag)])requireFlag(flag,p.id+'.progression');
 }
 const validateAnchor=(location,anchor,at)=>{
  const def=locations[location];
  if(!def){error('MISSING_LOCATION',at,'Unknown scene definition '+location);return;}
  if(!present(anchor)||!Object.hasOwn(def.anchors||{},anchor)){error('MISSING_ANCHOR',at,'Unknown anchor '+anchor+' in '+location);return;}
  if(catalog.walkable&&!catalog.walkable(def,def.anchors[anchor]))error('BLOCKED_ANCHOR',at,'Anchor foot box intersects collision or bounds');
 };
 const edge=(from,to,kind,choice)=>{
  if(scenes.has(to))edges.push({from,to,kind,...choice?{choice}:{}});
 };
 let declaredEffectChoices=0;
 for(const scene of rows){
  const at=scene.id;
  if(scene.conclusion!==undefined&&!['chapter','game'].includes(scene.conclusion))error('INVALID_CONCLUSION',at,'Conclusion must explicitly distinguish chapter from game');
  if(!present(scene.title)||!present(scene.text))error('EMPTY_NARRATIVE',at,'Scene needs authored title and narrative');
  for(const variant of scene.variants||[]){requireFlag(variant.flag,at+'.variants');if(!present(variant.text))error('EMPTY_NARRATIVE',at+'.variants','Conditional narrative must be authored text');}
  if(stages.size&&!stages.has(scene.stage))error('MISSING_STAGE',at,'Unknown stage '+scene.stage);
  if(actors.size&&!actors.has(scene.npc))error('MISSING_ACTOR',at,'Unknown actor asset '+scene.npc);
  if(!Array.isArray(scene.choices)){error('INVALID_CHOICES',at,'choices must be an array');continue;}
  if(!scene.choices.length&&!ending(scene))error('NON_ENDING_DEAD_END',at,'Non-ending scene has no choices');
  const location=scene.staging?.location||catalog.locationFor?.(scene.id);
  if(scene.staging)validateAnchor(location,scene.staging.anchor,at+'.staging');
  for(const choice of scene.choices){
   const ca=at+'/'+choice.id;
   if(!present(choice.id))error('INVALID_CHOICE_ID',ca,'Choice ID must be a nonempty string');
   if(choices.has(choice.id))error('DUPLICATE_CHOICE_ID',ca,'Choice ID also occurs in '+choices.get(choice.id)?.scene);
   choices.set(choice.id,{scene:at,choice});
   if(!present(choice.label))error('EMPTY_LABEL',ca,'Choice needs readable text');
   if(!cueKinds.has(choice.cue))error('INVALID_CUE',ca,'Unknown cinematic cue '+choice.cue);
   if(choice.time&&!['evening','next-morning'].includes(choice.time))error('INVALID_STORY_TIME',ca,'Unsupported authored time transition '+choice.time);
   if(!scenes.has(choice.next))error('MISSING_NEXT_SCENE',ca,'Unknown next scene '+choice.next);
   else edge(at,choice.next,choice.battle?'battleVictory':'choice',choice.id);
   if(choice.battle){
    if(!Object.hasOwn(encounters,choice.battle))error('MISSING_ENCOUNTER',ca,'Unknown encounter '+choice.battle);
    if(scenes.has(recoveryScene))edge(at,recoveryScene,'battleDefeat',choice.id);
    if(encounters[choice.battle]?.canFlee||encounters[choice.battle]?.canSurrender)edge(at,at,'battleExit',choice.id);
   }
   if(choice.requires!==undefined)requireFlag(choice.requires,ca+'.requires');
   if(choice.when!==undefined&&!Array.isArray(choice.when))error('INVALID_CONDITIONS',ca,'when must be an array');
   for(const condition of Array.isArray(choice.when)?choice.when:[]){
    if((condition.kind==='flag'||condition.kind==='notFlag'))requireFlag(condition.id,ca+'.when');
    else if(condition.kind==='anyFlag'){
     if(!Array.isArray(condition.ids)||!condition.ids.length)error('EMPTY_ANY_FLAG',ca,'anyFlag requires at least one flag');
     else condition.ids.forEach(flag=>requireFlag(flag,ca+'.when'));
    }else if(condition.kind==='pathStart'){
     if(!lifePathIds.has(condition.id))error('MISSING_LIFE_PATH',ca,'Unknown introductory life path '+condition.id);
    }else if(condition.kind==='trust'){
     if(!catalog.npcIds?.includes(condition.npc)||!Number.isInteger(condition.min)||condition.min< -2||condition.min>5)error('INVALID_TRUST_CONDITION',ca,'Trust needs a known NPC and integer -2..5');
    }else if(condition.kind==='knownSpell'){
     if(!(catalog.spells||[]).some(sp=>sp.id===condition.id))error('INVALID_SPELL_CONDITION',ca,'Unknown recipe '+condition.id);
    }else if(condition.kind==='knownCore'){
     if(!cores.has(condition.core))error('INVALID_CORE_CONDITION',ca,'Unknown core '+condition.core);
    }else error('UNKNOWN_CONDITION',ca,'Unsupported condition kind '+condition.kind);
   }
   for(const [id,qty] of [...Object.entries(choice.items||{}),...Object.entries(choice.costs||{})]){
    if(items.size&&!items.has(id))error('MISSING_ITEM',ca,'Unknown reward item '+id);
    if(!Number.isInteger(qty)||qty<=0)error('INVALID_REWARD_QUANTITY',ca,'Reward quantities must be positive integers');
   }
   if(choice.trust&&catalog.npcIds&&!catalog.npcIds.includes(choice.trust))error('MISSING_NPC',ca,'Unknown relationship ID '+choice.trust);
   if(choice.trustAmount!==undefined&&(!Number.isInteger(choice.trustAmount)||choice.trustAmount< -2||choice.trustAmount>5))error('INVALID_TRUST_AMOUNT',ca,'Trust change exceeds the current state schema');
   if(choice.onceFlag){
    if(!choice.flags?.includes(choice.onceFlag))error('UNSET_ONCE_FLAG',ca,'One-time reward must set its own shared guard');
    if(choice.daily)error('CONFLICTING_REWARD_POLICY',ca,'daily and onceFlag cannot both control a reward');
   }
   if(choice.clearFlags?.some(flag=>choice.flags?.includes(flag)))error('CONFLICTING_FLAGS',ca,'The same choice both clears and sets a flag');
   if(choice.spellId&&(!(catalog.spells||[]).some(sp=>sp.id===choice.spellId)||!choice.when?.some(c=>c.kind==='knownSpell'&&c.id===choice.spellId)))error('INVALID_NAMED_SPELL',ca,'A named environmental spell needs a real recipe and its exact knowledge condition');
   if(choice.spellCore&&!cores.has(choice.spellCore))error('MISSING_SPELL_CORE',ca,'Unknown environmental spell core');
   if(choice.route&&choice.route!=='craft')error('UNKNOWN_ROUTE',ca,'Unknown UI route '+choice.route);
   if(choice.cinematic){
    if(choice.cinematic.effectTarget){const p=locations[location]?.effectTargets?.[choice.cinematic.effectTarget];if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<0||p.x>480||p.y<0||p.y>270)error('MISSING_EFFECT_TARGET',ca,'Unknown or out-of-bounds source-map effect origin');}
    validateAnchor(location,choice.cinematic.anchor,ca+'.cinematic');
    if(choice.cinematic.pose&&!poses.has(choice.cinematic.pose))error('INVALID_CINEMATIC_POSE',ca,'Unknown pose '+choice.cinematic.pose);
    if(choice.cinematic.effect&&!effects.has(choice.cinematic.effect))error('INVALID_CINEMATIC_EFFECT',ca,'Unknown effect '+choice.cinematic.effect);
   }
   if(choice.next!==at||choice.battle||choice.route||choice.flags?.length||choice.clearFlags?.length||Object.keys(choice.items||{}).length||choice.trust||choice.cue==='rest'||choice.spellCore)declaredEffectChoices++;
   else warn('NO_DECLARED_GAMEPLAY_CHANGE',ca,'Only dialogue/journal/cinematic changes are declared');
  }
 }
 // Runtime CH2801 replaces its literal next with the checkpoint of the lost battle.
 if(scenes.has(recoveryScene)&&choices.has('CH2801'))for(const battle of rows.filter(s=>s.choices?.some(c=>c.battle)))edge(recoveryScene,battle.id,'dynamicRecovery','CH2801');
 for(const [id,encounter] of Object.entries(encounters)){
  if(stages.size&&!stages.has(encounter.stage))error('MISSING_ENCOUNTER_STAGE',id,'Unknown encounter stage');
  if(actors.size&&!actors.has(encounter.actor))error('MISSING_ENCOUNTER_ACTOR',id,'Unknown enemy actor');
  if(items.size&&!items.has(encounter.reward))error('MISSING_ENCOUNTER_REWARD',id,'Unknown enemy reward');
  if(!(encounter.hp>0)||!(encounter.power>=0))error('INVALID_ENCOUNTER_STATS',id,'Enemy HP/power are invalid');
 }
 const spells=catalog.spells||[],spellIds=new Set();
 for(const spell of spells){
  if(spellIds.has(spell.id))error('DUPLICATE_RECIPE_ID',spell.id,'Recipe ID must be unique');spellIds.add(spell.id);
  if(!Number.isFinite(spell.power)||!Number.isFinite(spell.mp)||spell.mp<0)error('INVALID_RECIPE_STATS',spell.id,'Recipe power/MP must be finite');
  if(!spell.vfx||!present(spell.vfx.identity))error('MISSING_RECIPE_VFX',spell.id,'Recipe needs executable VFX metadata');
 }
 const traverse=(initial,reverse=false)=>{
  const seen=new Set(initial.filter(id=>scenes.has(id))),queue=[...seen];
  for(let i=0;i<queue.length;i++)for(const e of edges)if((reverse?e.to:e.from)===queue[i]){
   const to=reverse?e.from:e.to;if(!seen.has(to)){seen.add(to);queue.push(to);}
  }return seen;
 };
 if(!scenes.has(start))error('MISSING_START_SCENE',start,'Start scene does not exist');
 const reachable=traverse([start]),goals=[...safeHubs,...rows.filter(ending).map(s=>s.id)],canExit=traverse(goals,true);
 for(const id of scenes.keys()){
  if(!reachable.has(id))error('STRUCTURALLY_UNREACHABLE',id,'No graph route from start, including battle outcomes');
  if(!canExit.has(id))error('CLOSED_STORY_COMPONENT',id,'No graph route to a declared safe hub or ending');
 }
 const quests=catalog.quests||[];
 if(!quests.length)warn('NO_QUEST_CATALOG','quests','No structured quest-chain catalog exists; quest completion count cannot be inferred from flags or UI text');
 const questIds=new Set();
 for(const quest of quests){
  if(!present(quest.id)||questIds.has(quest.id))error('DUPLICATE_QUEST_ID',quest.id,'Quest ID must be present and unique');questIds.add(quest.id);
  if(!scenes.has(quest.startScene))error('MISSING_QUEST_START',quest.id,'Unknown quest start scene');
  requireFlag(quest.completionFlag,quest.id+'.completionFlag');
  for(const flag of quest.activationFlags||[])requireFlag(flag,quest.id+'.activationFlags');
  if(quest.rewardGuard)requireFlag(quest.rewardGuard,quest.id+'.rewardGuard');
  for(const id of quest.rewardChoiceIds||[]){
   const reward=choices.get(id)?.choice;
   if(!reward)error('MISSING_QUEST_REWARD',quest.id,'Unknown reward choice '+id);
   else if(quest.rewardGuard&&reward.onceFlag!==quest.rewardGuard)error('UNGUARDED_QUEST_REWARD',quest.id,'Reward choices must share the declared onceFlag');
  }
  const steps=new Map((quest.steps||[]).map(s=>[s.id,s]));
  if(!steps.size)error('EMPTY_QUEST_CHAIN',quest.id,'Quest must declare steps');
  if(steps.size!==(quest.steps||[]).length)error('DUPLICATE_QUEST_STEP',quest.id,'Quest step IDs must be unique');
  for(const step of steps.values()){
   if(!scenes.has(step.scene))error('MISSING_QUEST_SCENE',quest.id+'/'+step.id,'Unknown step scene');
   for(const id of [...step.choice?[step.choice]:[],...step.choices||[]])if(choices.get(id)?.scene!==step.scene)error('MISSING_QUEST_CHOICE',quest.id+'/'+step.id,'Step choice does not belong to its scene');
   if(step.flag)requireFlag(step.flag,quest.id+'/'+step.id+'.flag');
   for(const flag of step.requiresFlags||[])requireFlag(flag,quest.id+'/'+step.id+'.requiresFlags');
   for(const next of step.next||[])if(!steps.has(next))error('MISSING_QUEST_STEP',quest.id+'/'+step.id,'Unknown next step '+next);
  }
  const first=quest.steps?.[0]?.id,entries=quest.entrySteps||first&&[first]||[],seen=new Set(entries),queue=[...seen];
  for(const id of entries)if(!steps.has(id))error('MISSING_QUEST_ENTRY_STEP',quest.id,'Unknown entry step '+id);
  for(let i=0;i<queue.length;i++)for(const to of steps.get(queue[i])?.next||[])if(steps.has(to)&&!seen.has(to)){seen.add(to);queue.push(to);}
  for(const id of steps.keys())if(!seen.has(id))error('UNREACHABLE_QUEST_STEP',quest.id+'/'+id,'No chain route from the first quest step');
 }
 const nodeContracts=[];
 if(catalog.contentBatches){
  const owners=new Map(),ids=new Set();
  for(const batch of catalog.contentBatches){
   if(!present(batch.id)||ids.has(batch.id))error('DUPLICATE_CONTENT_BATCH',batch.id,'Batch IDs must be unique');ids.add(batch.id);
   const chapter=catalog.chapters?.[batch.chapterId];
   if(!chapter||chapter.arc!==batch.arc)error('UNSUPPORTED_BATCH_CHAPTER',batch.id,'Batch must match a declared chapter/save contract');
   if(!batch.sceneIds?.length||!batch.entryScenes?.length||!batch.exitScenes?.length||!batch.completionFlags?.length)error('INCOMPLETE_CONTENT_BATCH',batch.id,'Batch needs owned nodes, entries, exits and completion facts');
   for(const id of batch.sceneIds||[]){
    if(!scenes.has(id))error('MISSING_BATCH_NODE',batch.id,'Unknown node '+id);
    if(owners.has(id))error('DUPLICATE_BATCH_NODE',id,'Node belongs to two batches');owners.set(id,batch.id);
    const scene=scenes.get(id);if(!scene)continue;
    nodeContracts.push({nodeId:id,chapterId:batch.chapterId,arc:batch.arc,batchId:batch.id,location:scene.staging?.location||scene.stage,stage:scene.stage,
     narrative:{title:scene.title,text:scene.text,variants:scene.variants||[]},entryEffects:scene.entryFlags||[],relevantNPCs:[scene.npc],
     choices:scene.choices.map(c=>({id:c.id,label:c.label,preconditions:{requires:c.requires||null,when:c.when||[],costs:c.costs||{}},
      characterAction:c.cue,spell:{id:c.spellId||null,core:c.spellCore||null,target:c.target||null},cinematic:c.cinematic||{source:'shared-cue-library',cue:c.cue},stateEffects:{set:c.flags||[],clear:c.clearFlags||[],trust:c.trust||null,trustAmount:c.trustAmount??null,time:c.time||null},
      rewards:c.items||{},rewardPolicy:c.daily?'daily':c.onceFlag||'first-choice',next:c.next,battle:c.battle||null,uiRoute:c.route||null})),nextNodes:[...new Set(scene.choices.map(c=>c.next))]});
   }
   for(const id of batch.entryScenes||[])if(!batch.sceneIds?.includes(id))error('INVALID_BATCH_ENTRY',batch.id,'Entry must be owned by its batch');
   for(const id of batch.exitScenes||[])if(!scenes.has(id)||!canExit.has(id))error('INVALID_BATCH_EXIT',batch.id,'Exit needs a route to a safe hub');
   for(const flag of batch.completionFlags||[])requireFlag(flag,batch.id+'.completionFlags');
  }
  for(const id of scenes.keys())if(!owners.has(id))error('UNOWNED_BATCH_NODE',id,'Every node needs explicit chapter/batch ownership');
 }
 return {result:errors.length?'FAIL':'PASS',scope:'Static catalog validation and structural reachability; conditions and combat wins are not assumed executable',
  counts:{contentBatches:(catalog.contentBatches||[]).length,storyNodes:scenes.size,choices:choices.size,declaredEffectChoices,structurallyReachableNodes:reachable.size,endings:rows.filter(ending).length,chapterConclusions:rows.filter(s=>s.conclusion==='chapter').length,encounters:Object.keys(encounters).length,recipeDefinitions:spells.length,uniqueRecipes:spellIds.size,declaredQuestChains:quests.length,completableQuests:null,implementedLifePaths:null,introductoryLifePathContracts:lifePathIds.size,stages:stages.size},
  structurallyReachable:[...reachable].sort(),nodeContracts,edges,flagProducers:[...flagSources].sort(),errors,warnings};
}

/** Import actual content through the project's existing Vite TS resolver. */
export async function loadGameCatalog(gameRoot=root){
 const {createServer}=await import('vite'),ts=await import('typescript');
 const server=await createServer({root:gameRoot,configFile:false,optimizeDeps:{entries:[],noDiscovery:true},server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
 try{
  const story=await server.ssrLoadModule('/src/content/story.ts'),spells=await server.ssrLoadModule('/src/systems/spells.ts');
  const {encounters}=await server.ssrLoadModule('/src/content/encounters.ts'),{artAssets}=await server.ssrLoadModule('/src/scenes/art-assets.ts');
  const maps=await server.ssrLoadModule('/src/scenes/scene-definitions.ts'),{STAGES}=await server.ssrLoadModule('/src/scenes/stage-layout.ts');
  const state=await server.ssrLoadModule('/src/engine/state.ts'),game=await server.ssrLoadModule('/src/systems/game.ts');
  const availability=await server.ssrLoadModule('/src/systems/story.ts'),combat=await server.ssrLoadModule('/src/systems/combat.ts');
  const engineFlags=new Set(),declaredSceneIds=[],seenFiles=new Set();
  async function inspectFile(file,followContent=false){
   if(seenFiles.has(file))return;seenFiles.add(file);
   const text=await readFile(file,'utf8'),ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true);
   const imports=[];
   function visit(node){
    if(ts.isBinaryExpression(node)&&node.operatorToken.kind===ts.SyntaxKind.EqualsToken){
     const lhs=node.left;if(ts.isPropertyAccessExpression(lhs)&&ts.isPropertyAccessExpression(lhs.expression)&&lhs.expression.name.text==='flags')engineFlags.add(lhs.name.text);
     if(ts.isElementAccessExpression(lhs)&&ts.isPropertyAccessExpression(lhs.expression)&&lhs.expression.name.text==='flags'&&ts.isStringLiteral(lhs.argumentExpression))engineFlags.add(lhs.argumentExpression.text);
    }
    if(followContent&&ts.isObjectLiteralExpression(node)){
     const properties=new Map(node.properties.filter(ts.isPropertyAssignment).map(p=>[p.name?.getText(ast).replace(/['"]/g,''),p.initializer]));
     const id=properties.get('id');if(properties.has('choices')&&properties.has('title')&&id&&ts.isStringLiteral(id))declaredSceneIds.push(id.text);
    }
    if(followContent&&ts.isImportDeclaration(node)&&ts.isStringLiteral(node.moduleSpecifier)&&node.moduleSpecifier.text.startsWith('.')){
     const resolved=path.resolve(path.dirname(file),node.moduleSpecifier.text),candidate=path.extname(resolved)?resolved:resolved+'.ts';
     if(candidate.startsWith(path.join(gameRoot,'src/content/')))imports.push(candidate);
    }
    ts.forEachChild(node,visit);
   }visit(ast);
   for(const file of imports)await inspectFile(file,true);
  }
  for(const file of ['src/systems/game.ts','src/systems/combat.ts','src/engine/state.ts'])await inspectFile(path.join(gameRoot,file));
  await inspectFile(path.join(gameRoot,'src/content/story.ts'),true);
  const saveSource=await readFile(path.join(gameRoot,'src/engine/save-file.ts'),'utf8');
  const npcLiteral=saveSource.match(/const npcIds=new Set\(\[([^\]]*)\]\)/),npcIds=npcLiteral?[...npcLiteral[1].matchAll(/'([^']+)'/g)].map(m=>m[1]):undefined;
  let quests=story.quests||[];
  try{await readFile(path.join(gameRoot,'src/content/quests.ts'));quests=(await server.ssrLoadModule('/src/content/quests.ts')).quests;}catch(e){if(e.code!=='ENOENT')throw e;}
  let life={lifePaths:[]};try{await readFile(path.join(gameRoot,'src/systems/life-paths.ts'));life=await server.ssrLoadModule('/src/systems/life-paths.ts');}catch(e){if(e.code!=='ENOENT')throw e;}
  const {chapters}=await server.ssrLoadModule('/src/content/chapters.ts');
  return {scenes:story.scenes,chapters,contentBatches:story.contentBatches,quests,lifePaths:life.lifePaths,stages:STAGES,actors:artAssets.map(a=>a.key),items:spells.itemNames,cores:spells.cores,spells:spells.allSpells,encounters,locations:maps.sceneDefinitions,locationFor:maps.locationFor,walkable:maps.walkable,npcIds,engineFlags:[...engineFlags],declaredSceneIds,runtime:{...state,...game,...availability,...combat,...life,spells:spells.allSpells}};
 }finally{await server.close();}
}

/** A bounded under-approximation using real reducers and only earned items.
 * Missing witnesses mean UNVERIFIED, never "unreachable". No injected game state.
 */
export function exploreRealChoices(catalog,{maxStates=4000,maxMs=12000,seed=12345}={}){
 const rt=catalog.runtime;if(!rt)throw Error('Actual runtime reducers required');
 const started=performance.now(),queue=[],seen=new Set(),nodes=new Map(),choices=new Set(),stateChanges=new Set(),recipes=new Map(),questWitnesses=new Map(),deadlocks=[],failures=[];
 const effects=s=>JSON.stringify([s.hp,s.mp,s.xp,s.inventory,s.known,s.equipped,s.flags,s.trust,s.battle,s.recoveryScene]);
 const key=s=>JSON.stringify([s.scene,Object.keys(s.flags).filter(f=>s.flags[f]).sort(),s.known.slice().sort(),Object.entries(s.inventory).filter(([,n])=>n>0).sort().map(([id,n])=>[id,Math.min(2,n)]),Math.floor(s.hp/10),Math.floor(s.mp/10),s.ticks%3,Object.entries(s.trust).sort()]);
 function remember(s,path){
  if(!nodes.has(s.scene))nodes.set(s.scene,path);
  for(const quest of catalog.quests||[])if(!questWitnesses.has(quest.id)&&s.flags[quest.completionFlag]&&quest.steps.every(step=>!step.flag||s.flags[step.flag]))questWitnesses.set(quest.id,{scene:s.scene,path});
 }
 function enqueue(state,path){
  const novel=!nodes.has(state.scene);remember(state,path);if(seen.has(key(state)))return;
  const score=(novel?100000:0)+Object.values(state.flags).filter(Boolean).length*1000+state.known.length*100+Object.values(state.inventory).filter(n=>n>0).length*10+Math.floor(state.hp/10)+Math.floor(state.mp/10);
  queue.push({state,path,score});let i=queue.length-1;while(i>0){const p=Math.floor((i-1)/2);if(queue[p].score>=queue[i].score)break;[queue[p],queue[i]]=[queue[i],queue[p]];i=p;}
 }
 function pop(){
  const first=queue[0],last=queue.pop();if(queue.length){queue[0]=last;let i=0;while(true){const a=i*2+1,b=a+1;let best=i;if(a<queue.length&&queue[a].score>queue[best].score)best=a;if(b<queue.length&&queue[b].score>queue[best].score)best=b;if(best===i)break;[queue[i],queue[best]]=[queue[best],queue[i]];i=best;}}return first;
 }
 enqueue(rt.fresh('Graph witness',seed),[]);
 function resolveBattle(initial,policy){
  let s=initial;const actions=[];for(let i=0;i<90&&s.battle;i++){
   let action='GUARD';
   if(policy==='win'){
    const available=s.equipped.map(id=>rt.spells.find(sp=>sp.id===id)).filter(sp=>sp&&sp.mp<=s.mp&&!sp.heal&&!sp.shield).sort((a,b)=>b.power*b.hits-a.power*a.hits);
    const hasAttack=s.equipped.some(id=>{const sp=rt.spells.find(sp=>sp.id===id);return sp&&!sp.heal&&!sp.shield;});
    action=s.hp<=15&&s.inventory.IT_POTION_DEW>0?'IT_POTION_DEW':available[0]?.id||(hasAttack?'GUARD':'BASIC_PULSE');
   }
   s=rt.fight(s,action);actions.push(action);
  }return {state:s,actions};
 }
 let processed=0;
 while(queue.length&&processed<maxStates&&performance.now()-started<maxMs){
  const {state:s,path}=pop(),fingerprint=key(s);if(seen.has(fingerprint))continue;seen.add(fingerprint);processed++;remember(s,path);
  const scene=catalog.scenes[s.scene];if(!scene||s.battle)continue;
  const enabled=scene.choices.filter(c=>rt.choiceAvailability(s,c).enabled);
  if(!enabled.length&&!ending(scene))deadlocks.push({scene:s.scene,path});
  const craftable=rt.spells.filter(sp=>!s.known.includes(sp.id)&&['CORE_'+sp.core,'FORM_'+sp.form,'MOD_'+sp.mod].every(p=>s.inventory[p]>0));
  for(const sp of craftable)if(!recipes.has(sp.id)){
   try{const crafted=rt.craft(s,sp.core,sp.form,sp.mod);if(crafted.known.includes(sp.id))recipes.set(sp.id,{from:s.scene,path:[...path,{craft:sp.id}]});}
   catch(e){failures.push({scene:s.scene,recipe:sp.id,message:e.message,path});}
  }
  // Expand exact recipes requested by the current story contract, without exploring all recipe subsets.
  const neededRecipes=new Set(scene.choices.flatMap(c=>[c.spellId,...(c.when||[]).filter(x=>x.kind==='knownSpell').map(x=>x.id)]).filter(Boolean));
  for(const sp of craftable.filter(sp=>neededRecipes.has(sp.id)))enqueue(rt.craft(s,sp.core,sp.form,sp.mod),[...path,{craft:sp.id}]);
  // One starter craft also expands the queue; every listed recipe above was actually crafted.
  if(!s.flags.crafted_first&&craftable.length){
   const sp=craftable.find(sp=>sp.id==='SPELL_WIND_ORB_SEEK')||craftable[0];
   enqueue(rt.craft(s,sp.core,sp.form,sp.mod),[...path,{craft:sp.id}]);
  }
  for(const c of enabled){
   try{
    const next=rt.choose(s,c.id),nextPath=[...path,{choice:c.id}];choices.add(c.id);if(effects(next)!==effects(s))stateChanges.add(c.id);
    if(next.battle){
     for(const policy of ['win','defeat']){const resolved=resolveBattle(next,policy);if(!resolved.state.battle)enqueue(resolved.state,[...nextPath,{battlePolicy:policy,actions:resolved.actions}]);}
     if(rt.battleRules(next).canFlee)enqueue(rt.fight(next,'FLEE'),[...nextPath,{fight:'FLEE'}]);
    }else enqueue(next,nextPath);
   }catch(e){failures.push({scene:s.scene,choice:c.id,message:e.message,path});}
  }
 }
 const sceneIds=Object.keys(catalog.scenes);
 return {result:failures.length||deadlocks.length?'FAIL':'PASS_BOUNDED',scope:'Real fresh/choose/craft/fight reducers, seed '+seed+'; projected-state bounded search. Coverage is a verified lower bound, not exhaustive solvability or browser proof.',
  limits:{maxStates,maxMs,processed,elapsedMs:Math.round(performance.now()-started)},counts:{witnessedNodes:nodes.size,successfulChoices:choices.size,witnessedStateChangingChoices:stateChanges.size,successfullyCraftedRecipes:recipes.size,endingWitnesses:[...nodes.keys()].filter(id=>ending(catalog.scenes[id])).length,chapterConclusionWitnesses:[...nodes.keys()].filter(id=>catalog.scenes[id].conclusion==='chapter').length},
  nodeWitnesses:Object.fromEntries([...nodes].sort()),successfulChoiceIds:[...choices].sort(),stateChangingChoiceIds:[...stateChanges].sort(),craftedRecipeWitnesses:Object.fromEntries([...recipes].sort()),questCompletionWitnesses:Object.fromEntries([...questWitnesses].sort()),unverifiedQuests:(catalog.quests||[]).map(q=>q.id).filter(id=>!questWitnesses.has(id)),unverifiedNodes:sceneIds.filter(id=>!nodes.has(id)),deadlocks,failures};
}

async function main(){
 const args=process.argv.slice(2),rootIndex=args.indexOf('--root'),catalog=await loadGameCatalog(rootIndex>=0?path.resolve(args[rootIndex+1]):root),report=analyzeStoryGraph(catalog);
 if(args.includes('--explore'))report.playableWitnesses=exploreRealChoices(catalog);
 const outputIndex=args.indexOf('--output');
 if(outputIndex>=0){const {writeFile}=await import('node:fs/promises');await writeFile(path.resolve(args[outputIndex+1]),JSON.stringify(report,null,2)+'\n');}
 console.log(JSON.stringify({...report,nodeContracts:undefined,edges:report.edges.length,flagProducers:report.flagProducers.length,playableWitnesses:report.playableWitnesses?{...report.playableWitnesses,nodeWitnesses:undefined,craftedRecipeWitnesses:undefined}:undefined},null,2));
 if(report.result==='FAIL'||report.playableWitnesses?.result==='FAIL')process.exitCode=1;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))await main();
