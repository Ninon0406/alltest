import {createServer} from 'vite';
import {fileURLToPath} from 'node:url';
const server=await createServer({root:fileURLToPath(new URL('../',import.meta.url)),configFile:false,optimizeDeps:{entries:[],noDiscovery:true},server:{middlewareMode:true},appType:'custom'});
try{
 const {scenes}=await server.ssrLoadModule('/src/content/story.ts');
 const {encounters}=await server.ssrLoadModule('/src/content/encounters.ts');
 const {allSpells,cores,forms,mods}=await server.ssrLoadModule('/src/systems/spells.ts');
 const {STAGES}=await server.ssrLoadModule('/src/scenes/stage-layout.ts');
 const {fresh}=await server.ssrLoadModule('/src/engine/state.ts');
 const {lifePaths}=await server.ssrLoadModule('/src/systems/life-paths.ts'),{quests}=await server.ssrLoadModule('/src/content/quests.ts');
 const sceneIds=Object.keys(scenes),choices=Object.values(scenes).flatMap(scene=>scene.choices),encounterIds=[...new Set(choices.map(c=>c.battle).filter(Boolean))];
 const enemyActors=new Set(Object.values(encounters).map(enemy=>enemy.actor));
 const npcActors=[...new Set(Object.values(scenes).map(scene=>scene.npc))].filter(actor=>!enemyActors.has(actor));
 const endings=sceneIds.filter(id=>scenes[id].conclusion==='game'),chapterConclusions=sceneIds.filter(id=>scenes[id].conclusion==='chapter');
 console.log(JSON.stringify({scenes:sceneIds.length,choices:choices.length,uniqueChoiceIds:new Set(choices.map(c=>c.id)).size,npc:npcActors.length,encounters:encounterIds.length,legalSpells:allSpells.length,uniqueSpellIds:new Set(allSpells.map(s=>s.id)).size,endings:endings.length,chapterConclusions:chapterConclusions.length,stages:STAGES.length,introductoryLifePaths:lifePaths.length,questContracts:quests.length,ingredients:{cores:cores.length,forms:forms.length,mods:mods.length},stateVersion:fresh().version,sceneIds,choiceIds:choices.map(c=>c.id),npcActors,encounterIds,stageIds:STAGES,lifePathIds:lifePaths.map(p=>p.id),questIds:quests.map(q=>q.id)},null,2));
}finally{await server.close();}
