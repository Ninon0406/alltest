import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validate,totals,render,board} from './roadmap.mjs';
const data=()=>JSON.parse(readFileSync(new URL('../docs/roadmap.json',import.meta.url),'utf8'));
test('counts only DONE, including zero/all and each non-done state',()=>{
 assert.deepEqual(totals([]),{done:0,in_progress:0,not_started:0,problem:0,blocked:0,total:0,percent:0});
 assert.equal(totals(['done','in_progress','not_started','problem','blocked'].map(status=>({status}))).percent,20);
 assert.equal(totals([{status:'done'}]).percent,100);
});
test('current audit has valid references, deterministic checklist and checked boxes only for DONE',()=>{
 const d=validate(data());assert.equal(render(d),render(structuredClone(d)));
 assert.equal((render(d).match(/- \[x\]/g)||[]).length,totals(d.tasks).done);
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

test('next-work list excludes completed tasks and promotes actual regressions',()=>{
 const d=data();for(const t of d.tasks)if(t.status==='problem')t.status='in_progress'; // Isolate this queue fixture from current project regressions.
 d.tasks.find(t=>t.id==='VIS-003').status='done';
 assert.match(board(d),/^1\. VIS-004 /m);
 d.tasks.find(t=>t.id==='CMB-006').status='problem';
 assert.match(board(d),/^1\. CMB-006 /m);
});
