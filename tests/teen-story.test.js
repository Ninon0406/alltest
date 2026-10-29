import {it,expect} from 'vitest';
import {act,simulateV7} from '../scripts/v7-simulation.mjs';
import {pendingDecision,nextDecisionDay} from '../src/engine/decisions.js';
import {storyEvents,storyGoldCost} from '../src/engine/development.js';
import {trainingQuote,jobQuote} from '../src/progression/engine.js';
const choose=(s,index=0)=>{const d=pendingDecision(s);return act(s,{type:'majorChoice',decisionId:d.id,choiceId:d.choices.filter(c=>!c.disabled)[index].id});};
function until(id,{policy=0,career=false,practice=false}={}){
 let s=simulateV7(8,{targetAge:12,ceremony:true,practiceAtEight:practice}).state;
 if(career)s=act(s,{type:'chooseCareer',careerId:'farmer'});
 for(let steps=0;steps<100;steps++){
  const d=pendingDecision(s);if(d?.id===id)return s;
  s=d?choose(s,policy%d.choices.filter(c=>!c.disabled).length):act(s,{type:'advanceDays',days:3600});
 }
 throw Error('Unreached story '+id);
}
it('keeps delayed ceremony free of scholarship deadlocks, gives ceremony priority, and unlocks eligible followups immediately',()=>{
 let s=simulateV7(8,{targetAge:12}).state;s=choose(s,2);expect(s.progression.awakening.paused).toBe(true);
 s=act(s,{type:'advanceYears',years:5});expect(s.time.absoluteDay).toBe(162*30);expect(pendingDecision(s).id).toBe('teen.lessons');s=choose(s);
 expect(nextDecisionDay(s)).toBeGreaterThan(s.time.absoluteDay);s=act(s,{type:'beginAwakening'});
 for(let step=0;step<7;step++){expect(pendingDecision(s).kind).toBe('awakening');s=choose(s);}
 expect(pendingDecision(s).id).toBe('teen.application');s=choose(s);expect(pendingDecision(s).id).toBe('teen.funding');
});
it('charges the actual tuition discount once, rejects stale/poor purchases atomically and preserves free alternatives',()=>{
 let s=until('teen.funding');const d=pendingDecision(s),cost=storyGoldCost(s,d.choices[0]);expect(cost).toBe(4);
 const noGrant=structuredClone(s);delete noGrant.story.flags.scholarship_offer;expect(storyGoldCost(noGrant,d.choices[0])).toBe(12);
 const poor=structuredClone(s);poor.gold=0;const before=structuredClone(poor);expect(pendingDecision(poor).choices[0].disabled).toBe(true);
 expect(()=>act(poor,{type:'majorChoice',decisionId:d.id,choiceId:d.choices[0].id})).toThrow();expect(poor).toEqual(before);
 const free=choose(poor);expect(free.gold).toBe(0);expect(free.story.flags.local_apprentice).toBe(true);
 const gold=s.gold,day=s.time.absoluteDay,ledger=s.world.ledger.length;s=choose(s);expect(s.gold).toBe(gold-cost);expect(s.time.absoluteDay).toBe(day);expect(s.world.ledger).toHaveLength(ledger+1);expect(s.world.ledger.at(-1).amount).toBe(-cost);expect(s.story.lastOutcome.goldDelta).toBe(-cost);
 expect(()=>act(s,{type:'majorChoice',decisionId:d.id,choiceId:d.choices[0].id})).toThrow();
});
it('turns guidance into a stat-specific bonus only on actual seven-day practice, without gifting XP or power',()=>{
 let s=until('teen.application');const old=structuredClone(s),base=trainingQuote(s,'int').xp;s=choose(s,1);
 expect(s.progression.practice).toEqual(old.progression.practice);expect(s.stats).toEqual(old.stats);expect(s.gold).toBe(old.gold);expect(s.power.level).toBe(1);
 expect(trainingQuote(s,'int').xp).toBe(base+1);expect(trainingQuote(s,'dex').learningBonus).toBe(0);
 const q=trainingQuote(s,'int'),day=s.time.absoluteDay,xp=s.progression.practice.int??0;s=act(s,{type:'train',stat:'int'});expect(s.time.absoluteDay).toBe(day+7);expect(s.progression.practice.int).toBe(xp+q.xp);
});
it('pays networking rewards only with real career work and records actual wages',()=>{
 let s=until('teen.mentor',{career:true});const quote=jobQuote(s),gold=s.gold;s=choose(s,2);
 expect(s.gold).toBe(gold);expect(jobQuote(s).gold).toBe(quote.gold+1);const before=jobQuote(s),day=s.time.absoluteDay;s=act(s,{type:'careerJob'});
 expect(s.gold).toBe(gold+before.gold);expect(s.time.absoluteDay).toBe(day+7);expect(s.world.ledger.at(-1).amount).toBe(before.gold);
});
it('requires real practice for exhibition and carries school/family decisions into later options and feedback',()=>{
 const untrained=until('teen.exhibition'),trained=until('teen.exhibition',{practice:true});expect(pendingDecision(untrained).choices[0].disabled).toBe(true);expect(pendingDecision(trained).choices[0].disabled).toBe(false);
 const family=until('teen.family');expect(family.story.flags.family_budget).toBe(true);const after=choose(family);expect(after.story.relationships.caregivers).toBe(family.story.relationships.caregivers+3);
 const letter=until('teen.letter');expect(letter.story.flags.study_direction).toBe(true);expect(pendingDecision(letter).choices[0].disabled).toBe(false);
 const alternative=until('teen.letter',{policy:1});expect(pendingDecision(alternative).choices[0].disabled).toBe(true);
});
it('expires unmet application windows without blocking routine life and never teleports during conversations',()=>{
 let s=simulateV7(8,{targetAge:12}).state;s=choose(s,2);const location=s.world.currentLocationId;
 for(let i=0;i<50&&s.age<20;i++){s=pendingDecision(s)?choose(s):act(s,{type:'advanceYears',years:5});}
 expect(s.age).toBeGreaterThanOrEqual(20);expect(s.story.completed).not.toContain('teen.application');expect(s.story.completed).not.toContain('teen.funding');expect(s.world.currentLocationId).toBe(location);
});
it('reaches all authored V7 forks and choices through real deterministic actions',()=>{
 const events=new Set(),choices=new Set();for(let policy=0;policy<3;policy++){const r=simulateV7(8,{targetAge:20,policy,ceremony:true,practiceAtEight:true});for(const id of r.events)events.add(id);for(const id of r.choices)choices.add(id);expect(r.state.story.wageBonus??0).toBeLessThanOrEqual(3);expect(Object.values(r.state.story.learning).every(x=>x<=3)).toBe(true);}
 for(const e of storyEvents){expect(events.has(e.id),e.id).toBe(true);for(const c of e.choices)expect(choices.has(c.id),c.id).toBe(true);}
});
