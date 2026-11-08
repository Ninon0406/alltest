import {it,expect} from 'vitest';
import {fresh,type State} from '../src/engine/state';
import {choose,craft} from '../src/systems/game';
import {encodeSave,decodeSave} from '../src/engine/save-file';
import {questSummary} from '../src/content/quests';

const take=(s:State,...ids:string[])=>ids.reduce((state,id)=>choose(state,id),s);
const summary=(s:Pick<State,'flags'>,id:string)=>questSummary(s).find(q=>q.id===id)!;
function preparation(){
 let s=take(fresh('คนช่วยเตรียมงาน',261),'CH0001','CH0101','CH0202','CH0401');
 s=craft(s,'WIND','ORB','SEEK');
 return take(s,'CH0201','CH0301','CH03B1','CH0204','CH0701','CH1401','CH0205','CH0802','CH0903','CH1301','CH0208');
}
const tasks=(s=preparation())=>take(s,'CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND','CH1802','CHV6_NOTES_MARK','CHV6_NOTES_COPY','CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_RECORD');
const morning=(s=tasks())=>take(s,'CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW','CH1903','CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER');

it('journal distinguishes available quests from completed gameplay without adding state',()=>{
 const state=fresh(),before=structuredClone(state),views=questSummary(state);
 expect(views).toHaveLength(6);expect(views.every(q=>q.status==='available')).toBe(true);
 expect(views.every(q=>q.completedObjectives===0&&q.nextObjective.length>0)).toBe(true);
 expect(state).toEqual(before);expect('quests' in state).toBe(false);
});
it('archive study, tablet and shared completion are derived from real choices',()=>{
 let s=take(fresh(),'CH0001','CH0101','CH0204','CH0701','CH1401');
 expect(summary(s,'Q_ARCHIVE_NOTES')).toMatchObject({status:'active',completedObjectives:1,totalObjectives:3});
 s=take(s,'CH0207','CH1501','CH1702');
 expect(summary(s,'Q_ARCHIVE_NOTES')).toMatchObject({status:'completed',completedObjectives:3,nextObjective:''});
 const ray=s.inventory.FORM_RAY,trust=s.trust.EIRA;
 s=take(s,'CH0701','CH1401','CH0207','CH1501','CH1703');
 expect(summary(s,'Q_ARCHIVE_NOTES').status).toBe('completed');
 expect(s.inventory.FORM_RAY).toBe(ray);expect(s.trust.EIRA).toBe(trust);
});
it('three completed preparations are not reported as a completed evening',()=>{
 const before=preparation();expect(summary(before,'Q_FESTIVAL_OPENING')).toMatchObject({status:'active',completedObjectives:0,totalObjectives:4});
 const prepared=tasks(before),view=summary(prepared,'Q_FESTIVAL_OPENING');
 expect(view.status).toBe('active');expect(view.completedObjectives).toBe(3);
 expect(view.nextObjective).toContain('เช้าวันใหม่');
 expect(summary(morning(prepared),'Q_FESTIVAL_OPENING').status).toBe('active');
});
it('actual morning completion grants once across both reward exits and the journal follows it',()=>{
 const s=choose(morning(),'CHV6_MORNING_FINISH');
 expect(summary(s,'Q_FESTIVAL_OPENING')).toMatchObject({status:'completed',completedObjectives:4,nextObjective:''});
 const amplify=s.inventory.MOD_AMPLIFY,potion=s.inventory.IT_POTION_DEW;
 const repeated=take(s,'CH0208','CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW','CH1903','CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER','CHV6_MORNING_LEARN');
 expect(repeated.inventory.MOD_AMPLIFY).toBe(amplify);expect(repeated.inventory.IT_POTION_DEW).toBe(potion);
 expect(summary(repeated,'Q_FESTIVAL_OPENING').status).toBe('completed');
});
it('a completion marker alone cannot claim missing quest objectives were completed',()=>{
 const view=summary({flags:{festival_ready:true,a1_festival_quest_complete:true}},'Q_FESTIVAL_OPENING');
 expect(view.status).toBe('active');expect(view.completedObjectives).toBe(1);
 expect(view.nextObjective).toContain('กล่องดนตรี');
});
it('manual file round trip preserves derived quest objectives without a save schema change',async()=>{
 const original=choose(morning(),'CHV6_MORNING_LEARN'),file=await encodeSave(original),restored=(await decodeSave(file)).state;
 expect(restored).toEqual(original);expect(restored.version).toBe(2);
 expect(questSummary(restored)).toEqual(questSummary(original));
 expect(JSON.parse(file).formatVersion).toBe(2);expect('quests' in restored).toBe(false);
});
