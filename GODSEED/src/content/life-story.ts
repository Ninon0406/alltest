import type {Choice,StoryScene} from './story';

const c=(id:string,label:string,next:string,cue:Choice['cue']='talk',extra:Partial<Choice>={}):Choice=>({id,label,next,cue,...extra});
const shot=(anchor:string,pose:NonNullable<Choice['cinematic']>['pose']='talk',effect?:NonNullable<Choice['cinematic']>['effect']):NonNullable<Choice['cinematic']>=>({anchor,pose,...effect?{effect}:{}});
const explorerField=[{kind:'flag' as const,id:'lp_explorer_started'},{kind:'flag' as const,id:'lp_explorer_surveyed'},{kind:'flag' as const,id:'lp_explorer_marked'}];
const natureField=[{kind:'flag' as const,id:'lp_nature_started'},{kind:'flag' as const,id:'lp_nature_source_found'},{kind:'flag' as const,id:'lp_nature_watered'},{kind:'flag' as const,id:'garden_tended'}];

/** Two introductory life paths. Rank acknowledgements are separate from fieldwork
 * and the training result is entered only after a real BT_TRAINING victory. */
export const lifeScenes:StoryScene[]=[
 {id:'LP_CROSSROADS',title:'จะเติบโตไปทางไหน',stage:'village',npc:'pip',staging:{location:'village_center',anchor:'fountain_front'},
  text:'หลังคืนแรกที่ทุกคนมีที่นั่ง พิพวางใบไม้เป็นรูปทางแยก มาเรนฝากคำชวนให้ไปดูร่องน้ำในสวน คุณไม่ต้องเลือกตัวตนเดียวตลอดชีวิต แต่ควรลองทำสิ่งหนึ่งให้เข้าใจก่อนรับคำชวนอีกทาง งานที่ทำไว้แล้วจะยังรออยู่',choices:[
   c('CHLP_START_EXPLORER','ลองเรียนรู้เส้นทางกับพิพใต้ต้นเมล็ด','LP_EXPLORER_BRIEF','walk',{when:[{kind:'pathStart',id:'EXPLORER'}],lockedHint:'จบคืนแรกก่อน และถ้าเริ่มอีกสายแล้วให้ผ่านงานภาคสนามขั้นแรกของสายนั้นก่อน',flags:['lp_explorer_started'],cinematic:shot('tree_path','talk','leaf')}),
   c('CHLP_START_NATURE','ลองดูแลรากและสายน้ำกับยายมาเรน','LP_NATURE_BRIEF','walk',{when:[{kind:'pathStart',id:'NATURE_KEEPER'}],lockedHint:'จบคืนแรกก่อน และถ้าเริ่มอีกสายแล้วให้ผ่านงานภาคสนามขั้นแรกของสายนั้นก่อน',flags:['lp_nature_started'],cinematic:shot('tree_path','talk','leaf')}),
   c('CHLP_RESUME_EXPLORER','กลับไปฝึกนักสำรวจที่ลานโรงช่าง','LP_EXPLORER_TRIAL','walk',{group:'other',requires:'lp_explorer_rank1',when:[...explorerField,{kind:'pathStart',id:'EXPLORER'}],lockedHint:'รับรองงานสำรวจขั้นแรกก่อน จึงกลับไปฝึกต่อได้โดยไม่ต้องทำงานภาคสนามซ้ำ',cinematic:shot('market_entrance')}),
   c('CHLP_RESUME_NATURE','กลับไปฝึกผู้ดูแลธรรมชาติที่ลานโรงช่าง','LP_NATURE_TRIAL','walk',{group:'other',requires:'lp_nature_rank1',when:[...natureField,{kind:'pathStart',id:'NATURE_KEEPER'}],lockedHint:'รับรองงานดูแลแปลงขั้นแรกก่อน จึงกลับไปฝึกต่อได้โดยไม่ต้องทำงานภาคสนามซ้ำ',cinematic:shot('market_entrance')}),
   c('CHLP_SHARED_LESSON','นำสิ่งที่สองสายสอนมาแลกเปลี่ยนกัน','LP_SHARED_ROOTS','walk',{when:[...explorerField,...natureField,{kind:'flag',id:'lp_explorer_rank1'},{kind:'flag',id:'lp_explorer_trial_passed'},{kind:'flag',id:'lp_explorer_rank2'},{kind:'flag',id:'lp_nature_rank1'},{kind:'flag',id:'lp_nature_trial_passed'},{kind:'flag',id:'lp_nature_rank2'}],lockedHint:'จบภาคสนาม การฝึกจริง และการรับรองขั้นสองของทั้งสองสายก่อน',cinematic:shot('tree_path','talk','leaf')}),
   c('CHLP_CROSSROADS_BACK','กลับไปใช้ชีวิตในหมู่บ้านก่อน','S02_HUB','walk',{cinematic:shot('village_road')}),
  ]},
 {id:'LP_EXPLORER_BRIEF',title:'แผนที่เริ่มที่ฝ่าเท้า',stage:'village',npc:'pip',staging:{location:'under_tree',anchor:'tree_entrance'},
  text:'พิพพยายามก้าวตามรอยเท้าคุณแล้วพบว่าขาของตัวเองสั้นเกินไป ป้ายที่ดีจึงไม่ใช่ป้ายสำหรับคนเดินเร็วที่สุด ลองสำรวจทางลอดกิ่งไม้และทำเครื่องหมายที่คนตัวเล็กอ่านได้ โดยไม่ขีดลงบนเปลือกไม้',choices:[
   c('CHLP_E_BEGIN','เดินไปเทียบรอยเท้าที่หน้าต้นไม้','LP_EXPLORER_SURVEY','walk',{cinematic:shot('tree_front','interact')}),
   c('CHLP_E_LISTEN','ฟังพิพชี้ช่วงทางที่เพื่อนตัวเล็กมักหลง','LP_EXPLORER_SURVEY','talk',{flags:['lp_explorer_pip_heard'],cinematic:shot('tree_front')}),
   c('CHLP_E_BRIEF_BACK','เก็บคำชวนไว้แล้วกลับลาน','LP_CROSSROADS','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'LP_EXPLORER_SURVEY',title:'ใต้กิ่งที่บังสายตา',stage:'village',npc:'pip',staging:{location:'under_tree',anchor:'tree_front'},
  text:'ทางที่ดูตรงจากหน้าต้นไม้มีรากนูนซ่อนอยู่ใต้กิ่ง คุณเดินไปตรวจปลายทางจริงก่อนจะวาดเส้นลงสมุด พิพหยุดรอที่ขอบทาง ราวกับกำลังทดสอบว่าคุณจะจำคนที่ตามหลังมาด้วยหรือไม่',choices:[
   c('CHLP_E_SURVEY_FEET','ก้มเทียบรอยเท้ากับช่องทางลอดกิ่ง','LP_EXPLORER_MARKERS','pick',{flags:['lp_explorer_surveyed','lp_explorer_feet_checked'],onceFlag:'lp_explorer_surveyed',trust:'PIP',cinematic:shot('behind_branch','pick_up','leaf')}),
   c('CHLP_E_SURVEY_WIND','ฟังใบไม้แล้วเดินตรวจขอบทางด้วยตัวเอง','LP_EXPLORER_MARKERS','walk',{flags:['lp_explorer_surveyed','lp_explorer_wind_noted'],onceFlag:'lp_explorer_surveyed',trust:'PIP',cinematic:shot('behind_branch','interact','leaf')}),
  ]},
 {id:'LP_EXPLORER_MARKERS',title:'เครื่องหมายที่ไม่ทำให้ใครเจ็บ',stage:'village',npc:'pip',staging:{location:'under_tree',anchor:'behind_branch'},
  text:'จุดเลี้ยวอยู่ใกล้กิ่งที่บังสายตา คุณจะทำให้คนมาทีหลังรู้ทางได้อย่างไรโดยไม่ตอกตะปูลงต้นไม้ พิพคาบใบไม้แห้งมาให้หนึ่งใบแล้วถอยไปดูจากระดับสายตาของตัวเอง',choices:[
   c('CHLP_E_MARK_RIBBON','ผูกป้ายใบไม้กับหลักเก่าแทนเปลือกไม้','LP_EXPLORER_ACK','pick',{requires:'lp_explorer_surveyed',lockedHint:'เดินสำรวจทางลอดกิ่งให้ครบก่อน',flags:['lp_explorer_marked','lp_explorer_leaf_marker'],onceFlag:'lp_explorer_marked',cinematic:shot('tree_path','interact','leaf')}),
   c('CHLP_E_MARK_STONES','เรียงก้อนหินที่หล่นอยู่ให้เห็นจุดเลี้ยว','LP_EXPLORER_ACK','pick',{requires:'lp_explorer_surveyed',lockedHint:'เดินสำรวจทางลอดกิ่งให้ครบก่อน',flags:['lp_explorer_marked','lp_explorer_stone_marker'],onceFlag:'lp_explorer_marked',cinematic:shot('tree_path','pick_up')}),
  ]},
 {id:'LP_EXPLORER_ACK',title:'นักสำรวจฝึกหัดคนใหม่',stage:'village',npc:'pip',staging:{location:'under_tree',anchor:'tree_path'},
  text:'คุณมองป้ายจากตำแหน่งเดียวกับพิพแล้วพบว่ามันอ่านได้จริง ทางไม่ได้สั้นลง แต่คนที่ตามมาจะไม่ต้องเดา พิพฝากขนนก ละอองเมฆ และเข็มทิศแมลงแสงให้ทดลองเวทนำทาง จากนั้นคุโรจะช่วยทดสอบว่าคุณยังอ่านสถานการณ์ได้เมื่อมีแรงกดดัน',choices:[
   c('CHLP_E_ACK_MAP','รับรองเส้นทางที่สำรวจแล้วลงในสมุด','LP_EXPLORER_TRIAL','pick',{when:explorerField,lockedHint:'ต้องเริ่มสาย สำรวจทาง และทำเครื่องหมายให้ครบก่อน',flags:['lp_explorer_rank1','lp_explorer_map_recorded'],onceFlag:'lp_explorer_rank1',items:{CORE_WIND:1,FORM_RAIN:1,MOD_SEEK:1},trust:'PIP',cinematic:shot('tree_path','interact','leaf')}),
   c('CHLP_E_ACK_SHOW','ให้พิพลองนำทาง แล้วรับคำแนะนำของมัน','LP_EXPLORER_TRIAL','talk',{when:explorerField,lockedHint:'ต้องเริ่มสาย สำรวจทาง และทำเครื่องหมายให้ครบก่อน',flags:['lp_explorer_rank1','lp_explorer_small_traveler'],onceFlag:'lp_explorer_rank1',items:{CORE_WIND:1,FORM_RAIN:1,MOD_SEEK:1},trust:'PIP',cinematic:shot('tree_path','talk','leaf')}),
  ]},
 {id:'LP_EXPLORER_TRIAL',title:'อ่านทางในลานฝึก',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'tutor_front'},
  text:'คุโรเก็บเครื่องมือให้พ้นลานฝึกและเรียกภูตจำลองตัวเดิม การทดสอบนี้เกิดที่โรงช่าง ไม่ใช่ในป่า ดูความตั้งใจของคู่ต่อสู้ เตรียมเวทหรือใช้ประกายพื้นฐานจนจบได้ หากถอยหรือยุติการฝึก งานสำรวจของคุณยังอยู่ แต่ยังไม่ได้รับรองขั้นสอง',choices:[
   c('CHLP_E_TRIAL_START','เริ่มทดสอบนักสำรวจกับภูตจำลอง','LP_EXPLORER_RESULT','cast',{requires:'lp_explorer_rank1',when:explorerField,lockedHint:'รับรองงานสำรวจขั้นแรกกับพิพก่อน',battle:'BT_TRAINING',cinematic:shot('tutor_front','cast','song')}),
   c('CHLP_E_TRIAL_PREP','ไปจัดเวทและอุปกรณ์กับคุโรก่อน','S04_KORO','talk',{cinematic:shot('recipe_front','interact')}),
   c('CHLP_E_TRIAL_BACK','กลับไปทบทวนสิ่งที่อยากเรียน','LP_CROSSROADS','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'LP_EXPLORER_RESULT',title:'รู้ว่าเมื่อใดควรหยุดมอง',stage:'workshop',npc:'koro',entryFlags:['lp_explorer_trial_passed'],staging:{location:'spell_workshop',anchor:'tutor_front'},
  text:'ภูตจำลองดับแสงลง คุโรถามว่าคุณเห็นจังหวะใดก่อนตัดสินใจ ไม่ได้ถามเพียงว่าโจมตีแรงเท่าไร ความช่างสังเกตที่ฝึกมาจะช่วยให้คุณเลือกสำรวจจุดอ่อน ก่อนใช้เวทโจมตีในจังหวะถัดไปได้ คุณยังต้องเลือกว่าจะนำความรู้นี้ไปดูแลเส้นทางอย่างไร',choices:[
   c('CHLP_E_RANK2_SHARE','รับรองขั้นสองและแบ่งปันแผนที่ให้คนอื่น','LP_EXPLORER_HOME','pick',{requires:'lp_explorer_trial_passed',when:[...explorerField,{kind:'flag',id:'lp_explorer_rank1'}],lockedHint:'ต้องผ่านการฝึกจริงและรับรองภาคสนามขั้นแรกก่อน',flags:['lp_explorer_rank2','lp_explorer_map_shared'],clearFlags:['lp_explorer_safe_route'],onceFlag:'lp_explorer_rank2',items:{FORM_CHAIN:1,MOD_PIERCE:1},trust:'PIP',cinematic:shot('recipe_front','interact','song')}),
   c('CHLP_E_RANK2_SAFE','รับรองขั้นสองและจดจุดพักที่เดินทางได้ปลอดภัย','LP_EXPLORER_HOME','talk',{requires:'lp_explorer_trial_passed',when:[...explorerField,{kind:'flag',id:'lp_explorer_rank1'}],lockedHint:'ต้องผ่านการฝึกจริงและรับรองภาคสนามขั้นแรกก่อน',flags:['lp_explorer_rank2','lp_explorer_safe_route'],clearFlags:['lp_explorer_map_shared'],onceFlag:'lp_explorer_rank2',items:{FORM_CHAIN:1,MOD_PIERCE:1},trust:'PIP',cinematic:shot('recipe_front','interact','leaf')}),
  ]},
 {id:'LP_EXPLORER_HOME',title:'พิพเดินนำหนึ่งก้าว',stage:'village',npc:'pip',staging:{location:'under_tree',anchor:'tree_path'},
  text:'พิพอ่านเครื่องหมายที่คุณทำแล้วเดินนำไปเองหนึ่งก้าว ก่อนหันมารอให้คุณตาม การเป็นนักสำรวจไม่ได้ทำให้คนตัวเล็กต้องวิ่งให้ทันคุณ คุณเพิ่งเรียนรู้วิธีมองทางให้มีที่สำหรับพวกเขา และยังมีเรื่องอีกมากให้ฝึกต่อ',choices:[
   c('CHLP_E_HOME_CROSS','กลับไปดูคำชวนของอีกสายโดยเก็บงานเดิมไว้','LP_CROSSROADS','walk',{flags:['lp_explorer_homecoming'],cinematic:shot('exit_path')}),
   c('CHLP_E_HOME_REST','พักใต้ต้นไม้กับพิพแล้วกลับหมู่บ้าน','S02_HUB','rest',{flags:['lp_explorer_homecoming'],cinematic:shot('under_tree_seat','rest','leaf')}),
  ]},
 {id:'LP_NATURE_BRIEF',title:'รากไม่ได้ต้องการคำสั่ง',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'maren_front'},
  text:'มาเรนชี้ร่องน้ำที่หยุดอยู่ก่อนถึงแปลง ต้นไม้ไม่ได้ขาดพลัง แต่ขาดทางให้สิ่งที่มีอยู่แล้วไหลมาถึง “ก่อนเพิ่มเวท ลองดูว่ารากต้องการอะไร” เธอชวนคุณหาต้นทางน้ำ แล้วค่อยตัดสินใจว่าจะช่วยอย่างไร',choices:[
   c('CHLP_N_BEGIN','เดินไปตรวจต้นทางน้ำที่ข้างแปลง','LP_NATURE_SOURCE','walk',{cinematic:shot('dew_collect','interact')}),
   c('CHLP_N_REMEMBER','ถามถึงแปลงที่เคยช่วยยายรดน้ำ','LP_NATURE_SOURCE','talk',{requires:'garden_tended',lockedHint:'ช่วยรดน้ำสวนมาก่อนจึงจะนึกถึงแปลงนี้ร่วมกันได้',flags:['lp_nature_old_care_remembered'],cinematic:shot('dew_collect','talk','leaf')}),
   c('CHLP_N_BRIEF_BACK','ขอเก็บคำชวนไว้แล้วกลับลาน','LP_CROSSROADS','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'LP_NATURE_SOURCE',title:'ฟังน้ำก่อนยกถัง',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'dew_collect'},
  text:'ใบไม้ที่สะสมขวางร่องน้ำทำให้ดินด้านหนึ่งชื้น แต่อีกด้านยังแห้ง คุณมีเวลาสังเกตความต่างก่อนลงมือ น้ำที่ต้องใช้มีอยู่ใกล้ ๆ ไม่จำเป็นต้องถอนต้นอ่อนเพื่อทำทางใหม่',choices:[
   c('CHLP_N_SOURCE_CLEAR','ยกใบไม้ที่หล่นขวางร่องน้ำออกอย่างเบามือ','LP_NATURE_FIELD','pick',{flags:['lp_nature_source_found','lp_nature_flow_cleared'],onceFlag:'lp_nature_source_found',trust:'MAREN',cinematic:shot('dew_collect','pick_up','leaf')}),
   c('CHLP_N_SOURCE_LISTEN','ฟังน้ำแล้วจดว่าดินส่วนใดต้องการความชื้น','LP_NATURE_FIELD','talk',{flags:['lp_nature_source_found','lp_nature_soil_observed'],onceFlag:'lp_nature_source_found',trust:'MAREN',cinematic:shot('dew_collect','interact','leaf')}),
  ]},
 {id:'LP_NATURE_FIELD',title:'ให้ความชุ่มชื้นไปถึงราก',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'dew_collect'},
  text:'เมื่อรู้แล้วว่าน้ำควรไปถึงจุดใด คุณนำมันไปให้ดินตรงหน้าแปลง แทนที่จะเร่งให้ดอกบาน มาเรนขอเพียงให้รากได้พักในดินที่พอดี คุณจะใช้ถังรดน้ำหรือเวทน้ำที่เรียนรู้จริงก็ได้',choices:[
   c('CHLP_N_WATER_BUCKET','ยกบัวรดน้ำไปค่อย ๆ รินตรงขอบราก','LP_NATURE_ACK','pick',{requires:'lp_nature_source_found',lockedHint:'ตรวจต้นทางน้ำก่อนจึงจะรู้ว่าต้องรดตรงไหน',flags:['lp_nature_watered','garden_tended','lp_nature_bucket_used'],onceFlag:'lp_nature_watered',cinematic:shot('herb_bed_front','water','leaf')}),
   c('CHLP_N_WATER_SPELL','ใช้เวทน้ำรินลงดินโดยไม่เร่งการเติบโต','LP_NATURE_ACK','cast',{requires:'lp_nature_source_found',when:[{kind:'knownCore',core:'WATER'}],lockedHint:'ตรวจต้นทางน้ำและค้นพบเวทธาตุน้ำก่อน หรือใช้บัวรดน้ำได้เสมอ',spellCore:'WATER',target:'scene',flags:['lp_nature_watered','garden_tended','lp_nature_water_spell'],onceFlag:'lp_nature_watered',cinematic:shot('herb_bed_front','cast','leaf')}),
  ]},
 {id:'LP_NATURE_ACK',title:'ผู้ดูแลธรรมชาติฝึกหัด',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'herb_bed_front'},
  text:'น้ำซึมหายไปในดินแทนที่จะไหลล้นทางเดิน มาเรนแบ่งเมล็ด ห่วงใบไม้เงิน และน้ำค้างเยียวยาให้ทดลองเวทที่ช่วยสิ่งมีชีวิต “การดูแลไม่ได้แปลว่าต้องเฝ้าตลอดเวลา เราต้องทำให้รากอยู่ต่อได้ด้วย” คุโรรอทดสอบการตั้งหลักของคุณที่ลานฝึก',choices:[
   c('CHLP_N_ACK_PATIENCE','รับรองงานภาคสนามและบันทึกการเติบโตอย่างค่อยเป็นค่อยไป','LP_NATURE_TRIAL','pick',{when:natureField,lockedHint:'ต้องเริ่มสาย ตรวจต้นทาง และรดน้ำถึงแปลงให้ครบก่อน',flags:['lp_nature_rank1','lp_nature_slow_growth'],onceFlag:'lp_nature_rank1',items:{CORE_BLOOM:1,FORM_RING:1,MOD_HEAL:1},trust:'MAREN',cinematic:shot('herb_bed_front','interact','leaf')}),
   c('CHLP_N_ACK_BALANCE','รับรองงานภาคสนามและจดวิธีแบ่งน้ำให้แปลงข้างเคียง','LP_NATURE_TRIAL','talk',{when:natureField,lockedHint:'ต้องเริ่มสาย ตรวจต้นทาง และรดน้ำถึงแปลงให้ครบก่อน',flags:['lp_nature_rank1','lp_nature_shared_water'],onceFlag:'lp_nature_rank1',items:{CORE_BLOOM:1,FORM_RING:1,MOD_HEAL:1},trust:'MAREN',cinematic:shot('herb_bed_front','talk','leaf')}),
  ]},
 {id:'LP_NATURE_TRIAL',title:'ตั้งหลักในลานฝึก',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'tutor_front'},
  text:'คุโรเตรียมลานโรงช่างให้ว่างและเรียกภูตจำลอง การฝึกนี้ทดสอบว่าคุณยังเลือกตั้งรับ เตรียมเวท หรือใช้ประกายพื้นฐานได้อย่างใจเย็นหรือไม่ การถอยหรือยุติการฝึกไม่ทำลายสวน แต่ยังไม่ใช่การผ่านบททดสอบ',choices:[
   c('CHLP_N_TRIAL_START','เริ่มทดสอบผู้ดูแลธรรมชาติกับภูตจำลอง','LP_NATURE_RESULT','cast',{requires:'lp_nature_rank1',when:natureField,lockedHint:'รับรองงานดูแลแปลงขั้นแรกกับมาเรนก่อน',battle:'BT_TRAINING',cinematic:shot('tutor_front','cast','leaf')}),
   c('CHLP_N_TRIAL_PREP','ไปผสมเวทหรือเตรียมของกับคุโรก่อน','S04_KORO','talk',{cinematic:shot('recipe_front','interact')}),
   c('CHLP_N_TRIAL_BACK','กลับไปทบทวนคำชวนทั้งสองสาย','LP_CROSSROADS','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'LP_NATURE_RESULT',title:'ที่พักใจไม่ใช่กำแพงตลอดกาล',stage:'workshop',npc:'koro',entryFlags:['lp_nature_trial_passed'],staging:{location:'spell_workshop',anchor:'tutor_front'},
  text:'ภูตจำลองคืนเป็นประกายเล็ก ๆ คุโรจดผลการฝึกให้มาเรน การตั้งหลักของคุณช่วยสร้างที่พักพลังในจังหวะตั้งรับครั้งแรกได้ แต่ไม่ได้ทำให้ทุกการโจมตีหายไป คุณยังต้องอ่านสถานการณ์และเลือกใช้มันให้ถูกเวลา',choices:[
   c('CHLP_N_RANK2_REFUGE','รับรองขั้นสองและจดวิธีเตรียมที่พักให้ราก','LP_NATURE_HOME','pick',{requires:'lp_nature_trial_passed',when:[...natureField,{kind:'flag',id:'lp_nature_rank1'}],lockedHint:'ต้องผ่านการฝึกจริงและรับรองภาคสนามขั้นแรกก่อน',flags:['lp_nature_rank2','lp_nature_refuge_recorded'],clearFlags:['lp_nature_neighbor_care'],onceFlag:'lp_nature_rank2',items:{CORE_EARTH:1,FORM_WARD:1,MOD_GUARD:1},trust:'MAREN',cinematic:shot('recipe_front','interact','leaf')}),
   c('CHLP_N_RANK2_NEIGHBOR','รับรองขั้นสองและเตรียมแบ่งความรู้ให้เพื่อนบ้าน','LP_NATURE_HOME','talk',{requires:'lp_nature_trial_passed',when:[...natureField,{kind:'flag',id:'lp_nature_rank1'}],lockedHint:'ต้องผ่านการฝึกจริงและรับรองภาคสนามขั้นแรกก่อน',flags:['lp_nature_rank2','lp_nature_neighbor_care'],clearFlags:['lp_nature_refuge_recorded'],onceFlag:'lp_nature_rank2',items:{CORE_EARTH:1,FORM_WARD:1,MOD_GUARD:1},trust:'MAREN',cinematic:shot('recipe_front','interact','leaf')}),
  ]},
 {id:'LP_NATURE_HOME',title:'แปลงที่ไม่ต้องมีคุณยืนเฝ้า',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'herb_bed_front'},
  text:'เมื่อกลับมา น้ำยังซึมถึงรากแม้คุณออกไปฝึก มาเรนยิ้มให้ร่องน้ำมากกว่าดอกที่บาน “วันนี้มันพึ่งตัวเองได้อีกนิดแล้ว” เธอจำได้ว่าคุณไม่ได้เริ่มจากการเสกคำตอบ แต่เริ่มจากลงไปดูดินด้วยตัวเอง',choices:[
   c('CHLP_N_HOME_CROSS','กลับไปแลกเปลี่ยนสิ่งที่เรียนกับอีกสาย','LP_CROSSROADS','walk',{flags:['lp_nature_homecoming'],cinematic:shot('exit_path')}),
   c('CHLP_N_HOME_REST','นั่งฟังยายสักครู่แล้วกลับหมู่บ้าน','S02_HUB','rest',{flags:['lp_nature_homecoming'],cinematic:shot('maren_listen_seat','rest','leaf')}),
  ]},
 {id:'LP_SHARED_ROOTS',title:'แผนที่ที่เว้นที่ให้ราก',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'maren_front'},
  text:'มาเรนเทียบแผนที่ที่พิพฝากมากับร่องน้ำในสวน ทางที่อ่านง่ายอาจไม่ใช่ทางที่ควรขยายทับราก และแปลงที่ดีควรเหลือที่ให้คนผ่าน ความรู้สองสายไม่ได้หักล้างกัน คุณเลือกได้ว่าจะส่งต่อสิ่งที่พบร่วมกันในรูปใด',choices:[
   c('CHLP_SHARED_GUIDE','ทำคู่มือทางเดินที่รักษารากและอ่านได้จากหลายระดับสายตา','S02_HUB','pick',{flags:['lp_shared_exchange','lp_shared_guide'],clearFlags:['lp_shared_refuges','lp_shared_neighbors'],onceFlag:'lp_shared_exchange',items:{MOD_GUARD:1,IT_MANA_LEAF:1},cinematic:shot('maren_front','interact','leaf')}),
   c('CHLP_SHARED_REFUGES','บันทึกจุดพักที่ช่วยได้ทั้งคนเดินทางและแปลงต้นอ่อน','S02_HUB','talk',{flags:['lp_shared_exchange','lp_shared_refuges'],clearFlags:['lp_shared_guide','lp_shared_neighbors'],onceFlag:'lp_shared_exchange',items:{MOD_GUARD:1,IT_MANA_LEAF:1},cinematic:shot('maren_front','talk','leaf')}),
   c('CHLP_SHARED_NEIGHBORS','รวบรวมคำแนะนำของคนธรรมดาที่ช่วยสองงานนี้','S02_HUB','talk',{flags:['lp_shared_exchange','lp_shared_neighbors'],clearFlags:['lp_shared_guide','lp_shared_refuges'],onceFlag:'lp_shared_exchange',items:{MOD_GUARD:1,IT_MANA_LEAF:1},cinematic:shot('maren_front','talk','leaf')}),
   c('CHLP_SHARED_LATER','เก็บสมุดไว้ก่อนแล้วกลับไปฝึกสิ่งที่ยังสงสัย','LP_CROSSROADS','walk',{cinematic:shot('exit_path')}),
  ]},
];

export const lifeSceneIds=lifeScenes.map(scene=>scene.id);
export const lifeChoiceIds=lifeScenes.flatMap(scene=>scene.choices.map(choice=>choice.id));
