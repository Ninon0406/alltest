import {it,expect} from 'vitest';
import {createRun} from '../src/engine/run.js';
import {generateBirth} from '../src/character/rebirth.js';
import {act,simulateV7} from '../scripts/v7-simulation.mjs';
import {powerStart,simulatePower,settlePowerStory} from '../scripts/power-simulation.mjs';
import {pendingDecision,nextDecisionDay} from '../src/engine/decisions.js';
import {dispatch} from '../src/engine/actions.js';
import {storyToken} from '../src/engine/life.js';
import {powerCost,powerReady,powerTitle,powerPracticeQuote,powerTrainingMissing,hasPower} from '../src/progression/power-model.js';
import {jobQuote,trainingQuote} from '../src/progression/engine.js';
import {sprite} from '../src/ui/avatar/sprite.js';
import {pixelAvatar} from '../src/ui/avatar/pixel-avatar.js';
import {careers} from '../src/data/careers.js';
import {firstRealmTitles} from '../src/data/power-titles.js';
import {completedSummary} from '../src/save/archive.js';
it('starts at one and requires actual awakening and a chosen career, keeping old generation equipment/power-free',()=>{
 const s=createRun(8,{id:'power-birth',startedAt:'2026-10-30T00:00:00Z'});expect(hasPower(s)).toBe(true);expect(s.power.level).toBe(1);expect(generateBirth(8)).not.toHaveProperty('power');expect(()=>act(settlePowerStory(s),{type:'trainPower'})).toThrow(/12 ปี/);expect(()=>act(s,{type:'yearFocus',focus:'cultivate'})).toThrow();
 const grown=simulateV7(8,{targetAge:20,ceremony:true}).state;expect(grown.power).toEqual(s.power);expect(powerTrainingMissing(grown)).toContain('เลือกอาชีพเพื่อฝึกผ่านงานที่ถนัด');expect(sprite(grown)).not.toContain('power-aura');
});
it('uses exactly one real seven-day skill practice and independent bounded power XP with stale/invalid atomicity',()=>{
 const s=powerStart(),before=structuredClone(s),token=storyToken(s),q=powerPracticeQuote(s),skill=trainingQuote(s,'wis');
 const normal=act(s,{type:'train',stat:'wis'});expect(normal.power).toEqual(before.power);
 const trained=act(s,{type:'trainPower'});expect(trained.time.absoluteDay).toBe(s.time.absoluteDay+7);expect(trained.power.xp).toBe(q.xp);expect(trained.power.practiceDays).toBe(7);expect(trained.progression.practice.wis).toBe((s.progression.practice.wis??0)+skill.xp);expect(trained.stamina).toBe(s.stamina-15);expect(trained.gold).toBe(s.gold);expect(trained.birth).toEqual(s.birth);expect(trained.progression.awakening.result).toEqual(s.progression.awakening.result);expect(s).toEqual(before);
 expect(()=>dispatch(trained,{type:'trainPower',token})).toThrow(/เปลี่ยนไป/);const tired=structuredClone(s);tired.stamina=0;const copy=structuredClone(tired);expect(()=>act(tired,{type:'trainPower'})).toThrow(/พัก/);expect(tired).toEqual(copy);
 const malformed=structuredClone(s);malformed.power.level=99;expect(()=>act(malformed,{type:'yearFocus',focus:'balanced'})).toThrow(/พลัง/);expect(()=>act(s,{type:'ascend'})).toThrow();
});
it('rejects practice that would pass an imminent story and never lets an annual plan auto-pick certification',()=>{
 let s=powerStart();s=act(s,{type:'advanceDays',days:nextDecisionDay(s)-s.time.absoluteDay-1});const before=structuredClone(s);expect(()=>act(s,{type:'trainPower'})).toThrow(/ข้ามเหตุการณ์/);expect(s).toEqual(before);
 const {ready}=simulatePower();expect(ready.power.level).toBe(9);expect(ready.power.xp).toBe(powerCost(9));expect(pendingDecision(ready).kind).toBe('power');expect(ready.yearly.reports.at(-1).endDay).toBe(ready.time.absoluteDay);expect(ready.yearly.reports.at(-1).days).toBe(ready.yearly.reports.at(-1).endDay-ready.yearly.reports.at(-1).startDay);expect(ready.time.absoluteDay%30).not.toBe(0);expect(()=>act(ready,{type:'advanceYears',years:5})).toThrow(/ตัดสินใจ/);
 const remaining=structuredClone(ready);remaining.power.xp--;expect(powerPracticeQuote(remaining).xp).toBe(1);
});
it('can defer at zero cost, recover through actual rest, resume manually and cannot farm the one-time reward',()=>{
 const {ready}=simulatePower();let s=act(ready,{type:'majorChoice',decisionId:'power.first-realm',choiceId:'later'});expect(s.time).toEqual(ready.time);expect(s.power.level).toBe(9);expect(s.power.deferred).toBe(true);expect(s.yearly.focus).toBe('balanced');expect(pendingDecision(s)).toBe(null);expect(()=>act(s,{type:'trainPower'})).toThrow(/รับรอง/);
 s=act(s,{type:'trainingRest'});const rested=structuredClone(s);s=act(s,{type:'resumePower'});expect(s.time).toEqual(rested.time);const base=s.maxStamina,current=s.stamina,oldFocus=s.progression.focus;s=act(s,{type:'majorChoice',decisionId:'power.first-realm',choiceId:'steady'});expect(s.power.level).toBe(10);expect(s.maxStamina).toBe(base+5);expect(s.stamina).toBe(current-15);expect(s.progression.focus).toBe(oldFocus-10);expect(s.power.xp).toBe(0);const finished=structuredClone(s);expect(()=>act(s,{type:'majorChoice',decisionId:'power.first-realm',choiceId:'steady'})).toThrow();expect(()=>act(s,{type:'trainPower'})).toThrow(/สมบูรณ์/);expect(s).toEqual(finished);
});
it('has two genuinely different resource outcomes and always leaves a free deferred route when depleted',()=>{
 const steady=simulatePower('farmer','steady').state,mental=simulatePower('farmer','reflect').state;expect(steady.maxStamina-mental.maxStamina).toBe(5);expect(mental.maxMana-steady.maxMana).toBe(5);expect(powerTitle(steady)).toContain('ชีพจรมั่นคง');expect(powerTitle(mental)).toContain('ชีพจรใคร่ครวญ');
 const {ready}=simulatePower();ready.stamina=0;ready.mana=0;ready.progression.focus=0;const d=pendingDecision(ready);expect(d.choices.filter(c=>!c.disabled).map(c=>c.id)).toEqual(['later']);expect(()=>act(ready,{type:'majorChoice',decisionId:d.id,choiceId:'steady'})).toThrow(/พัก/);expect(act(ready,{type:'majorChoice',decisionId:d.id,choiceId:'later'}).power.deferred).toBe(true);
});
it('earns the level-five work benefit and real five/ten aura milestones without granting phantom gear or parent effects',()=>{
 let s=act(powerStart(),{type:'yearFocus',focus:'cultivate'});while(s.power.level<5){s=settlePowerStory(s);s=act(s,{type:'advanceDays',days:30});}expect(s.power.level).toBe(5);expect(jobQuote(s).stamina).toBe(14);expect(sprite(s)).toContain('data-power-milestone="5"');expect(sprite(s)).not.toContain('data-equipment-id');expect(pixelAvatar(s,{role:'mother',headOnly:true})).not.toContain('power-aura');
 const {state}=simulatePower();expect(sprite(state)).toContain('data-power-milestone="10"');expect(state.appearance).toEqual(s.appearance);expect(state.birth).toEqual(s.birth);
});
it('proves all twenty careers reach both first-realm outcomes through real training and story clocks',()=>{
 const days=[];expect(Object.keys(firstRealmTitles)).toHaveLength(20);expect(new Set(Object.values(firstRealmTitles)).size).toBe(20);
 for(const c of careers)for(const choice of ['steady','reflect']){const {state:s,ready}=simulatePower(c.id,choice);expect(s.power.level).toBe(10);expect(s.power.certification).toBe(choice);expect(hasPower(s)).toBe(true);expect(powerTitle(s)).toContain(firstRealmTitles[c.id]);expect(powerReady(ready)).toBe(true);expect(s.power.practiceDays).toBeGreaterThanOrEqual(266);expect(s.power.practiceDays).toBeLessThanOrEqual(420);days.push(s.power.practiceDays);}
 expect(days).toHaveLength(40);
},30000);
it('archives actual earned power/title only after a genuine ending, without a resumable power state',()=>{
 let s=simulatePower().state;while(s.age<60){s=settlePowerStory(s);s=act(s,{type:'advanceYears',years:Math.min(5,60-s.age)});}s=settlePowerStory(s);s=act(s,{type:'legacyArc'});for(const choiceId of ['c_path_peasant','c_peasant_farm','c_end_peasant'])s=act(s,{type:'legacyChoice',choiceId});const summary=completedSummary(s,'2026-10-30T02:00:00Z');expect(summary.powerLevel).toBe(10);expect(summary.powerTier).toBe(powerTitle(s));for(const key of ['power','seed','state','progression'])expect(summary).not.toHaveProperty(key);
});
