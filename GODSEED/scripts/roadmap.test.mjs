import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validate,totals,render,board,domainTotals} from './roadmap.mjs';
const data=()=>JSON.parse(readFileSync(new URL('../docs/roadmap.json',import.meta.url),'utf8'));
test('counts only DONE, including zero/all and each non-done state',()=>{
 assert.deepEqual(totals([]),{done:0,in_progress:0,not_started:0,problem:0,blocked:0,total:0,percent:0});
 assert.equal(totals(['done','in_progress','not_started','problem','blocked'].map(status=>({status}))).percent,20);
 assert.equal(totals([{status:'done'}]).percent,100);
});
test('current audit has valid references, deterministic checklist and checked boxes only for DONE',()=>{
 const d=validate(data());assert.equal(render(d),render(structuredClone(d)));
 const all=[...d.tasks,...(d.tasks.find(t=>t.id==='FND-005')?.subtasks||[])];assert.equal((render(d).match(/- \[x\]/g)||[]).length,totals(all).done);
});
test('duplicate and unknown dependency IDs reject',()=>{
 const d=data();d.tasks.push(d.tasks[0]);assert.throws(()=>validate(d),/duplicate/);
 const e=data();e.tasks[0].dependsOn=['NO-999'];assert.throws(()=>validate(e),/unknown/);
});
test('cycles and missing source evidence reject',()=>{
 const d=data();d.tasks[0].dependsOn=['FND-002'];assert.throws(()=>validate(d),/cycle/);
 assert.throws(()=>validate(data(),()=>false),/source file/);
});
test('unsupported status and DONE without actual verification record reject',()=>{
 const d=data();d.tasks[0].status='designed';assert.throws(()=>validate(d),/status/);
 const e=data();e.tasks[0].verification='';assert.throws(()=>validate(e),/DONE/);
});

test('next-work list excludes done/blocked tasks and promotes actual regressions',()=>{
 const d=data();for(const t of d.tasks)if(t.status==='problem')t.status='in_progress'; // Isolate this queue fixture from current project regressions.
 d.workQueue=['FND-005','VIS-014','VIS-008','VIS-004','VIS-005','CMB-006','STO-001','MAG-006']; // Queue behavior is independent of the current batch's priorities.
 d.tasks.find(t=>t.id==='VIS-003').status='done';
 d.tasks.find(t=>t.id==='VIS-014').status='done';d.tasks.find(t=>t.id==='VIS-008').status='in_progress';
 const save=d.tasks.find(t=>t.id==='FND-005');save.status='in_progress'; // Queue fixture must not inherit a changing hardware gate.
 assert.match(board(d),/^1\. FND-005 /m);
 save.status='done';assert.match(board(d),/^1\. VIS-008 /m);assert.doesNotMatch(board(d),/^\d+\. FND-005 /m);
 save.status='blocked';assert.match(board(d),/^1\. VIS-008 /m);assert.doesNotMatch(board(d),/^\d+\. FND-005 /m);
 d.tasks.find(t=>t.id==='CMB-006').status='problem';
 assert.match(board(d),/^1\. CMB-006 /m);
});

test('location records reject missing aspects, duplicate locations and premature final readiness',()=>{
 const d=data();delete d.locations[0].readiness.collision;assert.throws(()=>validate(d),/location readiness/);
 const e=data();e.locations[1].id=e.locations[0].id;assert.throws(()=>validate(e),/unique location/);
 const f=data();f.locations[0].readiness.ready='done';f.locations[0].readiness.effects='in_progress';assert.throws(()=>validate(f),/requires every aspect/);
});

test('manual save subtasks have stable IDs, evidence and do not inflate the main denominator',()=>{
 const d=data(),parent=d.tasks.find(t=>t.id==='FND-005');assert.equal(parent.subtasks.length,14);assert.equal(d.tasks.filter(t=>/^SAVE-/.test(t.id)).length,0);assert.equal(totals(d.tasks).total,d.tasks.length);
 const bad=data();bad.tasks.find(t=>t.id==='FND-005').subtasks[0].id='SAVE-002';assert.throws(()=>validate(bad),/SAVE/);
 const premature=data(),parentFixture=premature.tasks.find(t=>t.id==='FND-005');parentFixture.status='done';parentFixture.verification='fixture';parentFixture.evidenceFiles=['GODSEED/docs/TEST_REPORT.md'];assert.throws(()=>validate(premature),/rollup/);
});

test('V6 preserves legacy IDs/phase/scope history while allowing unfinished expanded scope',()=>{
 const d=validate(data()),history=d.scopeHistory.find(h=>h.directive==='V6.0');
 assert.equal(history.previousTasks.length,76);assert.deepEqual(history.previousChecklist,{done:21,total:76,percent:27.6});
 for(const old of history.previousTasks){const now=d.tasks.find(t=>t.id===old.id);assert.equal(now.legacyPhase,old.phase);assert.equal(now.legacyScope,old.scope);}
 assert.deepEqual(d.phases.map(p=>p.id),Array.from({length:14},(_,i)=>i));
 const lost=data();lost.tasks=lost.tasks.filter(t=>t.id!=='VIS-013');assert.throws(()=>validate(lost),/legacy task/);
 const renamed=data();renamed.tasks.find(t=>t.id==='FND-001').legacyPhase=3;assert.throws(()=>validate(renamed),/legacy task/);
 const missing=data();missing.phases.shift();assert.throws(()=>validate(missing),/fourteen/);
 const invented=data();invented.scopeHistory[0].previousChecklist.percent=99;assert.throws(()=>validate(invented),/legacy checklist/);
});

test('six domains partition milestones exactly once; designs and save substeps add no completion credit',()=>{
 const d=validate(data()),parts=domainTotals(d),all=totals(d.tasks);
 assert.equal(parts.length,6);assert.equal(parts.reduce((n,p)=>n+p.total,0),all.total);assert.equal(parts.reduce((n,p)=>n+p.done,0),all.done);
 assert.equal(d.tasks.filter(t=>/^LIFE-/.test(t.id)).length,9);assert.equal(d.tasks.filter(t=>/^ARC-/.test(t.id)).length,12);
 const targetsOnly=structuredClone(d);targetsOnly.designTargets.storyNodes=9999;targetsOnly.designTargets.usableSpells=9999;
 assert.deepEqual(domainTotals(targetsOnly),parts);assert.deepEqual(totals(targetsOnly.tasks),all);
 const bad=data();bad.tasks[0].domain='estimated';assert.throws(()=>validate(bad),/domain/);
 const duplicate=data();duplicate.progressDomains[1].id='systems';assert.throws(()=>validate(duplicate),/six progress/);
});
