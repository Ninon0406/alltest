import type {QuestDefinition} from './quests';
export const alchemistQuests:readonly QuestDefinition[]=[
 {id:'Q_PATH_ALCHEMIST',title:'สูตรที่เตรียมให้คนถัดไป',description:'ตรวจแหล่ง ผสมสูตร ทดลองจังหวะ และนำสิ่งที่เรียนกลับไปใช้',startScene:'ALC_CALL',activationFlags:['lp_alchemist_started'],completionFlag:'alc_completed',rewardGuard:'alc_thankyou_once',rewardChoiceIds:['CHALC_FINISH'],rewardText:'ใบฟื้นเวท 1 และความสามารถกลั่นน้ำค้างจากบทเรียน รับของขอบคุณครั้งเดียว',entrySteps:['source'],steps:[
  {id:'source',label:'ตรวจต้นทางน้ำก่อนนำส่วนผสมไปใช้',flag:'alc_source_checked',scene:'ALC_SOURCE',choices:['CHALC_SOURCE_EDGE','CHALC_SOURCE_WAIT'],next:['filter']},
  {id:'filter',label:'กรองและจดขั้นตอนที่ทำจริง',flag:'alc_water_filtered',scene:'ALC_WASH',choices:['CHALC_WASH_SLOW','CHALC_WASH_HELP'],requiresFlags:['alc_source_checked'],next:['material']},
  {id:'material',label:'ตรวจและรับส่วนผสมสำหรับทดลอง',flag:'alc_material_examined',scene:'ALC_LEAF',choices:['CHALC_LEAF_CHECK'],requiresFlags:['alc_water_filtered'],next:['measure']},
  {id:'measure',label:'กำหนดขนาดส่วนผสมให้เทียบผลได้',flag:'alc_measured',scene:'ALC_OBSERVE',choices:['CHALC_MEASURE'],requiresFlags:['alc_material_examined'],next:['test']},
  {id:'test',label:'ผสมและสาธิตน้ำ/วงแหวน/ฟื้นพลัง',flag:'alc_support_tested',scene:'ALC_SAMPLE',choices:['CHALC_SAMPLE_CAST'],requiresFlags:['alc_measured'],next:['rank1']},
  {id:'rank1',label:'ให้ทาลารับรองพื้นฐานขั้นแรก',flag:'lp_alchemist_rank1',scene:'ALC_RANK1',choices:['CHALC_RANK1'],requiresFlags:['alc_support_tested'],next:['trial']},
  {id:'trial',label:'ชนะบททดสอบกับภูตจำลองจริง',flag:'lp_alchemist_trial_passed',scene:'ALC_TRIAL',choices:['CHALC_TRIAL_START'],requiresFlags:['lp_alchemist_rank1'],next:['rank2']},
  {id:'rank2',label:'รับความสามารถขั้นสองจากทาลา',flag:'lp_alchemist_rank2',scene:'ALC_RANK2',choices:['CHALC_RANK2'],requiresFlags:['lp_alchemist_trial_passed'],next:['share']},
  {id:'share',label:'เลือกฝากน้ำค้างจริงหรือสอนที่โรงช่าง',flag:'alc_destination_chosen',scene:'ALC_PACK',choices:['CHALC_PACK_FIELD','CHALC_PACK_TEACH'],requiresFlags:['lp_alchemist_rank2','alc_route_checked'],next:['finish']},
  {id:'finish',label:'จบบทเรียนและกลับไปใช้ความรู้',flag:'alc_completed',scene:'ALC_EPILOGUE',choices:['CHALC_FINISH'],requiresFlags:['alc_destination_chosen'],next:[]},
 ]},
];
