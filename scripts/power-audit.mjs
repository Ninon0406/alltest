import assert from 'node:assert/strict';
import {careers} from '../src/data/careers.js';
import {firstRealmTitles} from '../src/data/power-titles.js';
import {simulatePower} from './power-simulation.mjs';
import {hasPower,powerTitle} from '../src/progression/power-model.js';
export function auditPower(){
 const samples=[];assert.equal(Object.keys(firstRealmTitles).length,20);
 for(const c of careers)for(const choice of ['steady','reflect']){
  const {state,ready}=simulatePower(c.id,choice);assert(hasPower(state));assert.equal(state.power.level,10);assert.equal(state.power.certification,choice);assert(powerTitle(state).includes(firstRealmTitles[c.id]));assert.equal(ready.yearly.reports.at(-1).endDay,ready.time.absoluteDay);samples.push(state.power.practiceDays);
 }
 return {implementedLevels:[1,10],manualCertificationChoices:3,earnedCareerTitles:20,proceduralAuraMilestones:[5,10],actualCareerPolicies:samples.length,minPracticeDays:Math.min(...samples),maxPracticeDays:Math.max(...samples),deityRouteImplemented:false};
}
