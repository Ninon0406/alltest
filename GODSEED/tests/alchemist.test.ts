import {cinematicPath} from '../src/scenes/cinematic-paths';
import {describe,it,expect} from 'vitest';
import {fresh,schema} from '../src/engine/state';
import {choose,craft,fight} from '../src/systems/game';
import {distillAvailability,createBattle} from '../src/systems/combat';
import {hasPathAbility,pathProgress,pathStartAvailability} from '../src/systems/life-paths';
import {decodeSave,encodeSave} from '../src/engine/save-file';
import {choiceAvailability,rememberedLines} from '../src/systems/story';
import {scenes} from '../src/content/story';
import {questSummary} from '../src/content/quests';
import {alchemistReady,alchemistTrial,finishAlchemy,startPractice,take} from './alchemist-model';
import {finishForest,forestReady} from './forest-model';

describe('The travelling alchemist: earned course and remembered forest',()=>{
 it('requires the actual forest return and respects cross-learning foundations',()=>{
  expect(pathStartAvailability(fresh(),'ALCHEMIST').enabled).toBe(false);
  const s=finishForest(forestReady());expect(pathStartAvailability(s,'ALCHEMIST').enabled).toBe(true);
  const pending=take(s,'CHLP_HUB','CHLP_START_EXPLORER');expect(pathStartAvailability(pending,'ALCHEMIST').reason).toContain('พื้นฐาน');
 });
 it('does not certify a recipe merely from reading its name or seeing another Water spell',()=>{
  let s=take(finishForest(forestReady()),'CHALC_HUB','CHALC_CALL_MEET','CHALC_MEET_SHOW','CHALC_TABLE_USER','CHALC_START','CHALC_GARDEN_ASK','CHALC_SOURCE_WAIT','CHALC_WASH_HELP','CHALC_LEAF_CHECK','CHALC_MEASURE');
  expect(s.known).toContain('SPELL_WATER_ORB_SEEK');const copy=structuredClone(s);expect(choiceAvailability(s,scenes.ALC_RECIPE.choices.find(c=>c.id==='CHALC_RECIPE_TEST')!).enabled).toBe(false);expect(()=>choose(s,'CHALC_RECIPE_TEST')).toThrow();expect(s).toEqual(copy);
  const materials={...s.inventory};s=craft(s,'WATER','RING','HEAL');expect(s.inventory.MOD_HEAL).toBe(materials.MOD_HEAL-1);s=take(s,'CHALC_RECIPE_TEST','CHALC_SAMPLE_CAST');expect(s.flags.alc_support_tested).toBe(true);expect(hasPathAbility(s,'DISTILL')).toBe(false);
 });
 for(const branch of ['care','path','record'] as const)for(const delivery of ['field','teach'] as const)it(`${branch}/${delivery} reaches a real course conclusion and keeps costs, gifts and old choices on replay`,async()=>{
  const ready=alchemistReady(179,branch),before=ready.inventory.IT_POTION_DEW;expect(hasPathAbility(ready,'DISTILL')).toBe(true);expect(pathProgress(ready).find(p=>p.id==='ALCHEMIST')!.rank).toBe(2);expect(pathProgress(ready).find(p=>p.id==='EXPLORER')!.rank).toBe(0);
  const done=finishAlchemy(ready,branch,delivery);expect(done.inventory.IT_POTION_DEW).toBe(before-(delivery==='field'?1:0));expect(done.flags.alc_completed).toBe(true);expect(done.flags['a2_resolution_'+branch]).toBe(true);expect(questSummary(done).find(q=>q.id==='Q_PATH_ALCHEMIST')!.status).toBe('completed');expect((await decodeSave(await encodeSave(done))).state).toEqual(done);
  const again=take(done,'CHALC_REVISIT','CHALC_FINISH');expect(again.inventory).toEqual(done.inventory);expect(rememberedLines(done,scenes.ALC_EPILOGUE).join(' ')).toContain(delivery==='field'?'น้ำค้างจริง':'วิธีสอน');
  const replay=take(done,'CHALC_REVISIT');expect(replay.flags.alc_field_delivery).toBe(delivery==='field'?true:undefined);expect(replay.flags.alc_workshop_lesson).toBe(delivery==='teach'?true:undefined);
 });
 for(const delivery of ['field','teach'] as const)it('pauses '+delivery+' without rewriting its decision or skipping the promised action',async()=>{
  let s=take(alchemistReady(),'CHALC_RETURN_ROOT','CHALC_ROOT_SPACE','CHALC_PLAN_PACK',delivery==='field'?'CHALC_PACK_FIELD':'CHALC_PACK_TEACH',delivery==='field'?'CHALC_DELIVER_PAUSE':'CHALC_TEACH_PAUSE');
  const items={...s.inventory},file=await encodeSave(s);expect(JSON.parse(file).chapterId).toBe('CHAPTER_2');expect((await decodeSave(file)).state).toEqual(s);
  s=take(s,'CHALC_HUB','CHALC_CALL_RESUME','CHALC_RETURN_ROOT','CHALC_ROOT_SPACE','CHALC_PLAN_PACK');expect(()=>choose(s,delivery==='field'?'CHALC_PACK_TEACH':'CHALC_PACK_FIELD')).toThrow();s=choose(s,'CHALC_PACK_RECALL');expect(s.inventory).toEqual(items);expect(()=>choose(s,'CHALC_FINISH')).toThrow();
  s=take(s,delivery==='field'?'CHALC_EPILOGUE_FIELD':'CHALC_EPILOGUE_TEACH',delivery==='field'?'CHALC_DELIVER_CHECK':'CHALC_TEACH_LIMIT','CHALC_FINISH');expect(s.flags.alc_completed).toBe(true);expect(s.inventory.IT_POTION_DEW).toBe(items.IT_POTION_DEW);
 });
 it('resumes the earned rank-one trial from the hub without repeating material rewards',()=>{let s=fight(alchemistTrial(),'SURRENDER');s=take(s,'CHALC_TRIAL_HOME');const items={...s.inventory};s=take(s,'CHALC_HUB','CHALC_CALL_TRIAL');expect(s.scene).toBe('ALC_TRIAL');expect(s.inventory).toEqual(items);expect(hasPathAbility(s,'DISTILL')).toBe(false);});
 it('training surrender does not fabricate the trial or ability',()=>{
  const trial=alchemistTrial(),back=fight(trial,'SURRENDER');expect(back.scene).toBe('ALC_TRIAL');expect(back.flags.lp_alchemist_trial_passed).toBeUndefined();expect(hasPathAbility(back,'DISTILL')).toBe(false);
 });
});

describe('Distill: item tradeoff, one turn and one use, separate from spell damage',()=>{
 it('rejects an unearned ability, missing potion and repeated use atomically',()=>{
  let s=startPractice(finishAlchemy(alchemistReady()));const none=structuredClone(s);none.inventory.IT_POTION_DEW=0;for(const bad of [none]){const copy=structuredClone(bad);expect(()=>fight(bad,'DISTILL')).toThrow();expect(bad).toEqual(copy);}
  const unearned=fresh();unearned.scene='S04_KORO';unearned.battle=createBattle('BT_TRAINING','S04_KORO','S04_KORO');expect(distillAvailability(unearned).enabled).toBe(false);expect(()=>fight(unearned,'DISTILL')).toThrow();
  s=fight(s,'DISTILL');const copy=structuredClone(s);expect(distillAvailability(s).reason).toContain('แล้ว');expect(()=>fight(s,'DISTILL')).toThrow();expect(s).toEqual(copy);
 });
 it('uses a real potion, restores capped resources, cleanses only its two ailments and still takes the enemy turn',async()=>{
  const s=startPractice(finishAlchemy(alchemistReady()));s.hp=50;s.mp=20;s.battle!.playerStatus={VEIL:2,SEAR:2,GROUNDED:2};const before=structuredClone(s),out=fight(s,'DISTILL');expect(s).toEqual(before);expect(out.inventory.IT_POTION_DEW).toBe(s.inventory.IT_POTION_DEW-1);expect(out.hp).toBe(59);expect(out.mp).toBe(26);expect(out.battle!.enemyHp).toBe(s.battle!.enemyHp);expect(out.battle!.turn).toBe(s.battle!.turn+1);expect(out.battle!.playerStatus).toEqual({GROUNDED:1});expect(out.battle!.pathActions!.distilled).toBe(true);expect(out.flags.lp_alchemist_distilled).toBe(true);expect((await decodeSave(await encodeSave(out))).state).toEqual(out);
  const capped=structuredClone(s);capped.hp=98;capped.mp=39;expect(fight(capped,'DISTILL')).toMatchObject({hp:97,mp:40});
 });
 it('does not teach the Echo an offensive core or count as a Water hit against the Weaver',()=>{
  const ready=finishAlchemy(alchemistReady());for(const id of ['B04_ECHO_KNOT','B06_ROOT_WEAVER'] as const){const s=structuredClone(ready);s.scene='A2_ENCOUNTER';s.battle=createBattle(id,'A2_ENCOUNTER','A2_TRIAL_RESULT');s.battle.turn=3;s.hp=100;const out=fight(s,'DISTILL');expect(out.battle!.echo).toBeUndefined();if(id==='B06_ROOT_WEAVER'){expect(out.hp).toBe(82);expect(out.battle!.log.join(' ')).not.toContain('คลายแนวเถา');}}
 });
 it('resets only with a new battle and never adds defaults to older battle snapshots',()=>{
  const s=startPractice(finishAlchemy(alchemistReady())),before=structuredClone(s);expect(schema.parse(s)).toEqual(before);expect(s.battle!.pathActions).toBeUndefined();const used=fight(s,'DISTILL'),exit=fight(used,'SURRENDER'),next=choose(exit,'CH0404');expect(next.battle!.pathActions).toBeUndefined();expect(distillAvailability(next).enabled).toBe(true);
 });
 it('rejects a completed support lesson whose learned recipe is missing',()=>{const s=alchemistReady();s.known=s.known.filter(id=>id!=='SPELL_WATER_RING_HEAL');s.equipped=s.equipped.filter(id=>id!=='SPELL_WATER_RING_HEAL');expect(()=>schema.parse(s)).toThrow();});
 it('rejects forged progression or distilled-turn claims without an earned course',()=>{
  const s=fresh();s.flags.lp_alchemist_rank2=true;expect(()=>schema.parse(s)).toThrow();const old=fresh();old.scene='S04_KORO';old.battle=createBattle('BT_TRAINING','S04_KORO','S04_KORO');old.battle.pathActions={distilled:true};expect(()=>schema.parse(old)).toThrow();
 });
});

it('the support demonstration walks to the authored cauldron and targets its actual mouth',()=>{const p=cinematicPath('workshop','cast','CHALC_SAMPLE_CAST',{x:291,y:212},'spell_workshop')!;expect(p.targetAnchor).toBe('craft_front');expect(p.effectTarget).toEqual({x:240,y:170});expect(p.points.at(-1)).toEqual({x:240,y:212});});

it('packing and delivery stand on the road in front of the kit, while the original sitting anchor stays separate',()=>{expect(scenes.ALC_PACK.staging!.anchor).toBe('kit_front');const p=cinematicPath('forest_road','talk','CHALC_PLAN_PACK',{x:285,y:219},'forest_road')!;expect(p.points.at(-1)).toEqual({x:139,y:219});expect(p.targetAnchor).toBe('kit_front');expect(p.seatDepth).toBeUndefined();});
