import type {QuestDefinition} from './quests';
/** Introductory courses are finite quests, not completion of a v1 life path. */
export const lifeQuests:readonly QuestDefinition[]=[
 {id:'Q_PATH_EXPLORER',title:'แผนที่สำหรับคนที่เดินตาม',startScene:'LP_EXPLORER_BRIEF',description:'ตรวจทาง ทำเครื่องหมาย และทดสอบการอ่านจังหวะอย่างปลอดภัย',activationFlags:['lp_explorer_started'],completionFlag:'lp_explorer_rank2',rewardGuard:'lp_explorer_rank2',rewardChoiceIds:['CHLP_E_RANK2_SHARE','CHLP_E_RANK2_SAFE'],rewardText:'เส้นสายฟ้าและประกายทะลวงอย่างละ1 พร้อมความสามารถสำรวจจังหวะ — รางวัลครั้งเดียว',entrySteps:['survey'],steps:[
  {id:'survey',label:'ตรวจทางลอดกิ่ง',flag:'lp_explorer_surveyed',scene:'LP_EXPLORER_SURVEY',choices:['CHLP_E_SURVEY_FEET','CHLP_E_SURVEY_WIND'],next:['markers']},
  {id:'markers',label:'ทำป้ายที่ไม่ทำร้ายต้นไม้',flag:'lp_explorer_marked',scene:'LP_EXPLORER_MARKERS',choices:['CHLP_E_MARK_RIBBON','CHLP_E_MARK_STONES'],next:['rank1']},
  {id:'rank1',label:'รับรองภาคสนาม',flag:'lp_explorer_rank1',scene:'LP_EXPLORER_ACK',choices:['CHLP_E_ACK_MAP','CHLP_E_ACK_SHOW'],next:['trial']},
  {id:'trial',label:'ชนะการฝึกจริง',flag:'lp_explorer_trial_passed',scene:'LP_EXPLORER_TRIAL',choices:['CHLP_E_TRIAL_START'],next:['rank2']},
  {id:'rank2',label:'รับรองความสามารถขั้นต้น',flag:'lp_explorer_rank2',scene:'LP_EXPLORER_RESULT',choices:['CHLP_E_RANK2_SHARE','CHLP_E_RANK2_SAFE'],requiresFlags:['lp_explorer_rank1','lp_explorer_trial_passed'],next:[]},
 ]},
 {id:'Q_PATH_NATURE',title:'น้ำหนึ่งบัวที่ถึงราก',startScene:'LP_NATURE_BRIEF',description:'ดูต้นทางน้ำ ลงมือดูแลแปลง และฝึกการตั้งรับอย่างมีจังหวะ',activationFlags:['lp_nature_started'],completionFlag:'lp_nature_rank2',rewardGuard:'lp_nature_rank2',rewardChoiceIds:['CHLP_N_RANK2_REFUGE','CHLP_N_RANK2_NEIGHBOR'],rewardText:'แก่นดิน รูปแบบโล่ และประกายคุ้มกันอย่างละ1 พร้อมรากคุ้มภัย — รางวัลครั้งเดียว',entrySteps:['source'],steps:[
  {id:'source',label:'ตรวจต้นทางน้ำ',flag:'lp_nature_source_found',scene:'LP_NATURE_SOURCE',choices:['CHLP_N_SOURCE_CLEAR','CHLP_N_SOURCE_LISTEN'],next:['water']},
  {id:'water',label:'ให้น้ำถึงแปลงจริง',flag:'lp_nature_watered',scene:'LP_NATURE_FIELD',choices:['CHLP_N_WATER_BUCKET','CHLP_N_WATER_SPELL'],next:['rank1']},
  {id:'rank1',label:'รับรองภาคสนาม',flag:'lp_nature_rank1',scene:'LP_NATURE_ACK',choices:['CHLP_N_ACK_PATIENCE','CHLP_N_ACK_BALANCE'],next:['trial']},
  {id:'trial',label:'ชนะการฝึกจริง',flag:'lp_nature_trial_passed',scene:'LP_NATURE_TRIAL',choices:['CHLP_N_TRIAL_START'],next:['rank2']},
  {id:'rank2',label:'รับรองความสามารถขั้นต้น',flag:'lp_nature_rank2',scene:'LP_NATURE_RESULT',choices:['CHLP_N_RANK2_REFUGE','CHLP_N_RANK2_NEIGHBOR'],requiresFlags:['garden_tended','lp_nature_rank1','lp_nature_trial_passed'],next:[]},
 ]},
];
