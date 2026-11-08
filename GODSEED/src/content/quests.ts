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
 {id:'Q_PIP_FRUIT',title:'พิพกับผลไม้ประหลาด',description:'ช่วยเพื่อนตัวเล็ก เลือกว่าจะใช้ผลไม้อย่างไร แล้วกลับไปใช้ชีวิตด้วยกัน',startScene:'S29_PIP_SIDEQUEST',activationFlags:['pip_fruit_started'],completionFlag:'pip_sidequest_complete',rewardGuard:'pip_fruit_helped',rewardChoiceIds:['CH2901','CH2902','CH2903'],rewardText:'ผลไม้ป่า 1–2 ชิ้นตามวิธีช่วย ได้ครั้งเดียว;การแบ่งผลไม้ใช้ของจริงหนึ่งชิ้น',entrySteps:['help'],steps:[
  {id:'help',label:'ช่วยหรือให้พิพหาวิธีหยุดผลไม้',flag:'pip_fruit_helped',scene:'S29_PIP_SIDEQUEST',choices:['CH2901','CH2902','CH2903'],next:['decide']},
  {id:'decide',label:'เลือกแบ่งผลไม้หรือเก็บไว้พร้อมขอบคุณ',flag:'pip_fruit_decided',scene:'PIP_FRUIT_RESULT',choices:['CHPIP_SHARE','CHPIP_KEEP'],requiresFlags:['pip_fruit_helped'],next:['return']},
  {id:'return',label:'จดเรื่องของเพื่อนแล้วกลับหมู่บ้าน',flag:'pip_sidequest_complete',scene:'PIP_PROMISE',choices:['CHPIP_FINISH','CHPIP_GARDEN'],requiresFlags:['pip_fruit_decided'],next:[]},
 ]},
 {id:'Q_FOREST_RETURN',title:'ถนนที่กลับมาเล่าได้',description:'เตรียมเวท ดูแลราก แยกเสียงในโพรง และนำข้อสังเกตกลับไปให้ผู้คน',startScene:'A2_CALL',activationFlags:['a2_started'],completionFlag:'a2_returned',rewardGuard:'a2_returned',rewardChoiceIds:['CHA2_EPILOGUE_FINISH','CHA2_EPILOGUE_TREE'],rewardText:'ข้อเชื่อมประกาย 1 และเศษเสียงสะท้อน 1 รับครั้งเดียวร่วมกันทุกทางเลือก',entrySteps:['pack'],steps:[
  {id:'pack',label:'เตรียมชุดทดลองและช่องเวทกับคุโร',flag:'a2_kit_taken',scene:'A2_PACK',choices:['CHA2_PACK_TAKE'],next:['listen']},
  {id:'listen',label:'แยกรอยในโพรง โดยไม่เติมคำตอบที่ยังไม่รู้',flag:'a2_hollow_recorded',scene:'A2_HOLLOW',choices:['CHA2_HOLLOW_TRACE','CHA2_HOLLOW_ECHO'],requiresFlags:['a2_kit_taken'],next:['care']},
  {id:'care',label:'ประคองรากด้วยมือหรือความรู้ที่เรียนมา',flag:'a2_root_restored',scene:'A2_RING',choices:['CHA2_RING_HAND','CHA2_RING_BLOOM','CHA2_RING_NATURE'],requiresFlags:['a2_hollow_recorded'],next:['pass']},
  {id:'pass',label:'ผ่านผู้ถักรากด้วยเวท ความอดทน หรือมิตรภาพ',flag:'a2_trial_resolved',scene:'A2_ENCOUNTER',choices:['CHA2_TRIAL_FIGHT','CHA2_TRIAL_PATIENCE','CHA2_TRIAL_FRIEND'],requiresFlags:['a2_root_restored'],next:['share']},
  {id:'share',label:'กลับไปหาผู้ที่รอฟัง',flag:'a2_returned_to_people',scene:'A2_RETURN',choices:['CHA2_RETURN_MAREN','CHA2_RETURN_EIRA'],requiresFlags:['a2_trial_resolved'],next:['return']},
  {id:'return',label:'รับวัสดุทดลองต่อและจบการสำรวจครั้งแรก',flag:'a2_returned',scene:'A2_EPILOGUE',choices:['CHA2_EPILOGUE_FINISH','CHA2_EPILOGUE_TREE'],requiresFlags:['a2_eira_reported','a2_root_restored','a2_trial_resolved'],next:[]},
 ]},

 {id:'Q_GUARDIAN_SONG',title:'บทเพลงที่เลือกเดินทางต่อ',description:'เรียนจังหวะผู้พิทักษ์ ผ่านบททดสอบ และเลือกวิธีดูแลเพลงของหมู่บ้าน',startScene:'G_CALL',activationFlags:['guardian_journey_started'],completionFlag:'guardian_chapter_reward',rewardGuard:'guardian_chapter_reward',rewardChoiceIds:['CH2701','CH2702'],rewardText:'เส้นใยดารา 1 และประกายขยายเสียง 1 รับครั้งเดียวร่วมกันทุกบทสรุป',entrySteps:['prepare'],steps:[
  {id:'prepare',label:'เตรียมของกับคุโร',flag:'guardian_kit_taken',scene:'G_KIT',choices:['CHG_KIT_TAKE'],next:['understand']},
  {id:'understand',label:'อ่านจังหวะและข้อจำกัดของผนึก',flag:'guardian_pattern_understood',scene:'G_INSCRIPTION',choices:['CHG_READ_PATTERN','CHG_READ_LISTEN'],requiresFlags:['guardian_kit_taken'],next:['trial']},
  {id:'trial',label:'ผ่านบททดสอบผู้พิทักษ์ทั้งสามระยะ',flag:'guardian_trial_complete',scene:'S22_GUARDIAN',choices:['CH2201'],requiresFlags:['guardian_pattern_understood'],next:['resolve']},
  {id:'resolve',label:'เลือกวิธีคืนเพลงให้ผู้คน',flag:'song_restored',scene:'S23_DECISION',choices:['CH2301','CH2302','CH2303'],requiresFlags:['guardian_trial_complete'],next:['return']},
  {id:'return',label:'จบบทแรกและนำสิ่งที่เรียนรู้กลับไปใช้',flag:'guardian_chapter_reward',scene:'S27_EPILOGUE',choices:['CH2701','CH2702'],requiresFlags:['song_restored'],next:[]},
 ]},
 {id:'Q_ECHO_EXPEDITION',title:'เสียงที่ยอมฟังเสียงอื่น',description:'เตรียมของ อ่านรูปแบบเสียง คลี่ปม แล้วนำเรื่องกลับมาแบ่งปัน',startScene:'ECHO_CALL',activationFlags:['echo_expedition_started'],completionFlag:'echo_expedition_complete',rewardGuard:'echo_report_reward',rewardChoiceIds:['CHE_CLOSE_PIERCE','CHE_CLOSE_LINGER'],rewardText:'เลือกเขี้ยวผลึกเจาะหรือทรายเวลาอ่อนหนึ่งชิ้น รับครั้งเดียวร่วมกันทั้งสองทาง',entrySteps:['pack'],steps:[
  {id:'pack',label:'รับอุปกรณ์จากคุโรและเตรียมช่องเวท',flag:'echo_kit_taken',scene:'ECHO_PACK',choices:['CHE_PACK_TAKE'],next:['listen']},
  {id:'listen',label:'สังเกตรูปแบบธาตุที่ปมเสียงจดจำ',flag:'echo_pattern_observed',scene:'ECHO_LISTEN',choices:['CHE_LISTEN_PAUSE','CHE_LISTEN_NOTE'],requiresFlags:['echo_kit_taken'],next:['resolve']},
  {id:'resolve',label:'คลี่ปมด้วยการต่อสู้หรือร่วมมือกับไอรา',flag:'echo_trial_resolved',scene:'S21_ECHO_TRIAL',choices:['CH2101','CH2102'],requiresFlags:['echo_pattern_observed'],next:['share']},
  {id:'share',label:'แบ่งปันสิ่งที่พบและรับของสำหรับทดลองต่อ',flag:'echo_expedition_complete',scene:'ECHO_CLOSURE',choices:['CHE_CLOSE_PIERCE','CHE_CLOSE_LINGER'],requiresFlags:['echo_trial_resolved'],next:[]},
 ]},
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
