import type {State} from '../engine/state';
import {lifeQuests} from './life-quests';

export type QuestStep={
 id:string;label:string;flag:string;scene:string;choices:readonly string[];next:readonly string[];
 requiresFlags?:readonly string[];
};
export type QuestDefinition={
 id:string;title:string;description:string;startScene:string;activationFlags:readonly string[];
 completionFlag:string;rewardGuard:string;rewardChoiceIds:readonly string[];rewardText:string;
 entrySteps:readonly string[];steps:readonly QuestStep[];
};

/** Contracts for quests implemented in the existing story, not future roadmap quests. */
export const quests:readonly QuestDefinition[]=[
 ...lifeQuests,
 {
  id:'Q_ARCHIVE_NOTES',title:'บันทึกที่มีคนกลับมาเล่า',startScene:'S07_ARCHIVE',
  description:'อ่านแผนที่ ฟังจารึก และแบ่งปันทำนองที่พบกับไอรา',
  activationFlags:['archive_read'],completionFlag:'archive_notes_complete',rewardGuard:'archive_notes_complete',
  rewardChoiceIds:['CH1702','CH1703'],rewardText:'เส้นใยดารา 1 และความไว้วางใจไอรา — รับครั้งเดียวร่วมกันทั้งสองทาง',
  entrySteps:['study'],steps:[
   {id:'study',label:'อ่านบันทึกเสียงสะท้อนของไอรา',flag:'archive_read',scene:'S14_RESEARCH',choices:['CH1401','CH1402','CH1403'],next:['trace']},
   {id:'trace',label:'จดทำนองจากแผ่นจารึก',flag:'song_fragment',scene:'S17_ECHO_TABLET',choices:['CH1701','CH1702','CH1703'],next:['share']},
   {id:'share',label:'คัดลอกหรือฟังจารึกให้ครบ',flag:'archive_notes_complete',scene:'S17_ECHO_TABLET',choices:['CH1702','CH1703'],next:[]},
  ],
 },
 {
  id:'Q_FESTIVAL_OPENING',title:'คืนแรกที่ทุกคนมีที่นั่ง',startScene:'S18_FESTIVAL_PREP',
  description:'ช่วยกล่องดนตรี บันทึกเพลง และเตรียมแสง ก่อนเลือกว่าจะเก็บความทรงจำคืนนี้อย่างไร',
  activationFlags:['festival_ready'],completionFlag:'a1_festival_quest_complete',rewardGuard:'arc1_opening_complete',
  rewardChoiceIds:['CHV6_MORNING_FINISH','CHV6_MORNING_LEARN'],rewardText:'ประกายขยายเสียง 1 และน้ำค้างฟื้นพลัง 1 — รับครั้งเดียวร่วมกันทุกบทสรุปย่อย',
  entrySteps:['musicbox','notes','lights'],steps:[
   {id:'musicbox',label:'ช่วยลูมิให้กล่องดนตรีพร้อม',flag:'a1_musicbox_ready',scene:'V6_A1_GEARS',choices:['CHV6_BOX_HAND','CHV6_BOX_WIND'],next:['closing']},
   {id:'notes',label:'บันทึกสิ่งที่รู้และสิ่งที่ยังไม่รู้',flag:'a1_notes_ready',scene:'V6_A1_MARGIN',choices:['CHV6_NOTES_COPY','CHV6_NOTES_ECHO'],next:['closing']},
   {id:'lights',label:'เตรียมโคมที่คนอื่นใช้ต่อได้',flag:'a1_lights_ready',scene:'V6_A1_WORKSHOP_LIGHT',choices:['CHV6_LIGHT_HAND','CHV6_LIGHT_FIRE','CHV6_LIGHT_WIND'],next:['closing']},
   {id:'closing',label:'จบคืนแรกและรับของขอบคุณในเช้าวันใหม่',flag:'a1_festival_quest_complete',scene:'V6_A1_MORNING',choices:['CHV6_MORNING_FINISH','CHV6_MORNING_LEARN'],requiresFlags:['a1_musicbox_ready','a1_notes_ready','a1_lights_ready'],next:[]},
  ],
 },
];

/** Derived views only: no independent quest state, rewards or persistent writes. */
export function questSummary(state:Pick<State,'flags'>){
 return quests.map(quest=>{
  const objectives=quest.steps.map(step=>({id:step.id,label:step.label,flag:step.flag,complete:!!state.flags[step.flag]}));
  const completed=!!state.flags[quest.completionFlag]&&objectives.every(step=>step.complete);
  const active=quest.activationFlags.some(flag=>state.flags[flag])||objectives.some(step=>step.complete);
  const status:'available'|'active'|'completed'=completed?'completed':active?'active':'available';
  return {id:quest.id,title:quest.title,description:quest.description,status,objectives,
   completedObjectives:objectives.filter(step=>step.complete).length,totalObjectives:objectives.length,
   nextObjective:completed?'':objectives.find(step=>!step.complete)?.label||'กลับไปจบบทสรุปของเหตุการณ์',
   rewardText:quest.rewardText};
 });
}
