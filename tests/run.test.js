import {it,expect} from 'vitest';
import {createRun,ActivePlayClock} from '../src/engine/run.js';
import {dispatch} from '../src/engine/actions.js';
import {storyToken} from '../src/engine/life.js';
import {archiveCompleted,completedSummary,readArchive,ARCHIVE_KEY} from '../src/save/archive.js';
const act=(s,a)=>dispatch(s,{...a,token:storyToken(s)});
const fresh=(id='run-1')=>createRun(8,{id,startedAt:'2026-10-29T00:00:00.000Z'});
function finish(){let s=fresh();s=act(s,{type:'advanceYears',years:10});s=act(s,{type:'majorChoice',decisionId:'turn.school',choiceId:'turn.school.1'});s=act(s,{type:'advanceYears',years:5});s=act(s,{type:'majorChoice',decisionId:'turn.direction',choiceId:'turn.direction.1'});s=act(s,{type:'advanceYears',years:5});s=act(s,{type:'legacyArc'});for(const choiceId of ['c_path_peasant','c_peasant_farm','c_end_peasant'])s=act(s,{type:'legacyChoice',choiceId});return s;}
const storage=()=>{const data=new Map(),writes=[];return {data,writes,getItem:k=>data.get(k)??null,setItem:(k,v)=>{writes.push(k);data.set(k,v);}};};
it('keeps action validation pure and prevents tokens from a previous run',()=>{
 const s=fresh(),before=structuredClone(s),action={type:'advanceYears',years:1,token:storyToken(s)};
 expect(()=>dispatch(fresh('another-run'),action)).toThrow();expect(s).toEqual(before);
 const next=dispatch(s,action);expect(next.age).toBe(1);expect(next.run.id).toBe(s.run.id);expect(s).toEqual(before);
 expect(()=>dispatch(next,action)).toThrow();
});
it('executes the original peaceful ending atomically and closes its run against every further action',()=>{
 const s=finish();expect(s.age).toBe(60);expect(s.run.status).toBe('ended');expect(s.run.endingId).toBe('end_peasant');expect(s.unlockedEndings).toContain('end_peasant');
 expect(()=>act(s,{type:'advanceYears',years:1})).toThrow(/จบแล้ว/);expect(()=>act(s,{type:'dailyLife'})).toThrow();
});
it('archives only a terminal summary, with no resumable character, birth RNG or journal',()=>{
 expect(()=>completedSummary(fresh(),'2026-10-29T01:00:00Z')).toThrow();
 const s=finish(),summary=completedSummary(s,'2026-10-29T01:00:00Z'),disk=storage();archiveCompleted(disk,summary);
 expect(disk.writes).toEqual([ARCHIVE_KEY]);expect(readArchive(disk)[0].age).toBe(s.age);expect(summary.events.length).toBeLessThanOrEqual(12);expect(summary.appearance).toEqual(s.appearance);
 for(const key of ['state','time','birth','world','progression','yearly','inventory','seed','journal','stats'])expect(summary).not.toHaveProperty(key);
});
it('writes an ending once by run identity and retains up to 100 genuine life summaries',()=>{
 const summary=completedSummary(finish(),'2026-10-29T01:00:00Z'),disk=storage();archiveCompleted(disk,summary);archiveCompleted(disk,summary);expect(disk.writes).toHaveLength(1);
 for(let n=0;n<105;n++)archiveCompleted(disk,{...summary,runId:`completed-${n}`});expect(readArchive(disk)).toHaveLength(100);expect(readArchive(disk).at(-1).runId).toBe('completed-104');
});
it('preserves legacy keys and corrupt archives and does not fake success on storage failure',()=>{
 const disk=storage(),summary=completedSummary(finish(),'2026-10-29T01:00:00Z');disk.data.set('reborn_save','old');disk.data.set('reborn_ending_gallery','["end_hero"]');archiveCompleted(disk,summary);expect(disk.data.get('reborn_save')).toBe('old');expect(disk.data.get('reborn_ending_gallery')).toBe('["end_hero"]');
 disk.data.set(ARCHIVE_KEY,'broken');expect(()=>archiveCompleted(disk,summary)).toThrow();expect(disk.data.get(ARCHIVE_KEY)).toBe('broken');
 expect(()=>archiveCompleted({getItem:()=>null,setItem:()=>{throw Error('full');}},summary)).toThrow('full');
});
it('counts only visible engagement windows, excludes idle/autoplay waiting and pauses without time inflation',()=>{
 const c=new ActivePlayClock();c.start(1000);expect(c.sample(61000)).toBe(15000);c.interact(61000);expect(c.sample(65000)).toBe(19000);c.pause(66000);expect(c.sample(1000000)).toBe(20000);c.resume(1000000);expect(c.sample(1010000)).toBe(20000);c.interact(1010000);expect(c.sample(1011000)).toBe(21000);
});
