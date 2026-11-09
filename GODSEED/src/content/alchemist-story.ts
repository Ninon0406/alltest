import type {Choice,StoryScene} from './story';
const shot=(anchor:string,pose:NonNullable<Choice['cinematic']>['pose']='talk',effect?:'leaf'|'song')=>({anchor,pose,...effect?{effect}:{}});
const c=(id:string,label:string,next:string,anchor:string,extra:Partial<Choice>={}):Choice=>({id,label,next,cue:'talk',cinematic:shot(anchor),...extra});
const knownWater={kind:'knownSpell' as const,id:'SPELL_WATER_RING_HEAL'};
const field=[{kind:'flag' as const,id:'lp_alchemist_started'},{kind:'flag' as const,id:'alc_source_checked'},{kind:'flag' as const,id:'alc_water_filtered'},{kind:'flag' as const,id:'alc_material_examined'},{kind:'flag' as const,id:'alc_measured'},{kind:'flag' as const,id:'alc_support_tested'}];

/** An original, finite introductory course. No recipe is learned by reading dialogue. */
export const alchemistScenes:StoryScene[]=[
 {id:'ALC_CALL',title:'คนที่เดินตามรอยของคุณ',stage:'workshop',npc:'tala-v18',entryFlags:['alchemist_invited'],staging:{location:'spell_workshop',anchor:'tutor_front'},variants:[{flag:'lp_alchemist_started',text:'ทาลายังรออยู่ที่โรงช่างพร้อมสมุดบทเรียน เธอจำสิ่งที่คุณลองไว้ได้ คุณกลับไปทดสอบพื้นฐานที่พร้อมแล้ว หรือทำสิ่งที่เลือกฝากผู้เดินทางต่อให้เสร็จได้ ไม่จำเป็นต้องเริ่มนับวัตถุดิบใหม่'}],text:'หญิงผู้หนึ่งวางกระเป๋าขวดลงข้างคุโร เธอชื่อทาลา เป็นผู้ปรุงเวทที่เดินทางมาจากเมือง เธอผ่านถนนป่าที่คุณเพิ่งกลับมา แต่สิ่งที่อยากถามไม่ใช่ว่าใครเก่งที่สุด “ถ้าคนถัดไปเหนื่อย เราจะเตรียมอะไรให้เขาได้บ้าง?”',choices:[
  c('CHALC_CALL_MEET','ฟังว่าทาลาพบอะไรระหว่างทาง','ALC_MEET','tutor_front'),
  c('CHALC_CALL_TRIAL','กลับไปทดสอบพื้นฐานที่รับรองแล้ว','ALC_TRIAL','tutor_front',{when:[{kind:'flag',id:'lp_alchemist_rank1'},{kind:'notFlag',id:'lp_alchemist_rank2'}],lockedHint:'ใช้เมื่อรับรองขั้นหนึ่งแล้วแต่ยังไม่ได้ขั้นสอง'}),
  c('CHALC_CALL_RESUME','นำสิ่งที่เรียนแล้วไปดูแลเส้นทางต่อ','ALC_RETURN','exit_path',{requires:'lp_alchemist_rank2',lockedHint:'รับรองความสามารถขั้นต้นก่อน'}),
  c('CHALC_CALL_HOME','ขอเวลาก่อนแล้วกลับหมู่บ้าน','S02_HUB','exit_path'),
 ]},
 {id:'ALC_MEET',title:'ขวดเปล่าที่ไม่ใช่คำตอบ',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'tutor_front'},text:'ทาลาเคาะขวดเปล่า มันร้องดังจนพิพสะดุ้ง “เมื่อก่อนฉันชอบขวดที่ดูน่าประทับใจ จนคนที่ต้องใช้เปิดฝาไม่ออก” เธออยากสอนวิธีเตรียมเวทที่อ่านผลได้ และอยากฟังสิ่งที่คุณเคยเลือกทำกับป่า',choices:[
  c('CHALC_MEET_ASK','ถามถึงสิ่งที่เคยปรุงพลาด','ALC_TABLE','recipe_front',{trust:'TALA',flags:['alc_mistake_heard']}),
  c('CHALC_MEET_SHOW','เล่าการเดินทางตามสิ่งที่เห็นจริง','ALC_TABLE','recipe_front',{flags:['alc_journey_shared']}),
 ]},
 {id:'ALC_TABLE',title:'โต๊ะสำหรับคำถามที่ยังตอบไม่ได้',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'recipe_front'},text:'มีพื้นที่ว่างบนโต๊ะให้วางสมุด คุณกับทาลาแยกสิ่งที่เกิดจริงออกจากคำอธิบายที่ยังต้องทดลอง คุโรขอให้ทุกคนใช้หม้อใบเดิมและเก็บทางเดินให้โล่ง บทเรียนนี้จึงเริ่มด้วยข้อจำกัด ไม่ใช่คำสัญญาว่าจะรักษาได้ทุกอย่าง',choices:[
  c('CHALC_TABLE_LIMIT','จดสิ่งที่สูตรหนึ่งสูตรทำไม่ได้','ALC_CONSENT','recipe_front',{cue:'pick',flags:['alc_limits_written'],cinematic:shot('recipe_front','interact')}),
  c('CHALC_TABLE_USER','เริ่มจากคนที่จะใช้สิ่งที่เราปรุง','ALC_CONSENT','recipe_front',{flags:['alc_user_considered'],trust:'TALA'}),
 ]},
 {id:'ALC_CONSENT',title:'เรียนด้วยมือของตัวเอง',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'recipe_front'},text:'นักปรุงเวทต้องรู้จักแหล่งวัตถุดิบ ทดลองสูตรจริง และรับผลของการเตรียมตัว ทาลาไม่ให้ตำแหน่งจากจำนวนขวดที่ถือ หากกำลังเริ่มพื้นฐานสายอื่นอยู่ คุณกลับไปทำขั้นแรกของสายนั้นให้ครบก่อนเรียนข้ามสายได้',choices:[
  c('CHALC_START','เริ่มเรียนสายนักปรุงเวทกับทาลา','ALC_GARDEN','exit_path',{when:[{kind:'pathStart',id:'ALCHEMIST'}],lockedHint:'กลับจากถนนป่าและจบพื้นฐานขั้นหนึ่งของสายที่ค้างก่อน แล้วพบผู้ปรุงเวทได้',flags:['lp_alchemist_started'],trust:'TALA'}),
  c('CHALC_CONSENT_PATHS','กลับไปทบทวนพื้นฐานเส้นทางชีวิตเดิม','LP_CROSSROADS','exit_path'),
  c('CHALC_CONSENT_HOME','เก็บคำชวนไว้แล้วกลับหมู่บ้าน','S02_HUB','exit_path'),
 ]},
 {id:'ALC_GARDEN',title:'มาเรนไม่ยอมให้เด็ดทั้งแปลง',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'maren_front'},text:'มาเรนยกมือห้ามก่อนพิพจะคาบทั้งกระถาง “เอาเฉพาะส่วนที่พืชยอมให้ก็พอ” คุณจะเก็บส่วนผสมสำหรับทดลองวงแหวนฟื้นพลัง และต้องบอกแหล่งที่มาก่อนลงหม้อ ทาลารอให้คุณกลับมาพร้อมข้อสังเกตของตัวเอง',choices:[
  c('CHALC_GARDEN_SOURCE','เดินตรวจต้นทางน้ำก่อนเก็บใบ','ALC_SOURCE','water_approach',{cue:'walk'}),
  c('CHALC_GARDEN_ASK','ถามว่าควรปล่อยใบใดให้เติบโตต่อ','ALC_SOURCE','herb_bed_front',{flags:['alc_harvest_limit'],trust:'MAREN'}),
 ]},
 {id:'ALC_SOURCE',title:'น้ำใสกับน้ำที่ใช้ได้',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'water_approach'},text:'แสงสะท้อนทำให้น้ำดูใสกว่าที่เป็น ใต้ผิวมีเศษใบไม้ลอยอยู่ มาเรนให้คุณสังเกตขอบทางน้ำก่อนพูดถึงคุณสมบัติของมัน สิ่งที่มองเห็นง่ายไม่ได้แทนสิ่งที่ตรวจแล้ว',choices:[
  c('CHALC_SOURCE_EDGE','ก้มดูตะกอนและรอยที่ขอบน้ำ','ALC_WASH','water_approach',{cue:'pick',flags:['alc_source_checked','alc_sediment_seen'],cinematic:shot('water_approach','pick_up')}),
  c('CHALC_SOURCE_WAIT','รอให้น้ำหยุดไหวแล้วเทียบสี','ALC_WASH','water_approach',{flags:['alc_source_checked','alc_surface_compared']}),
 ]},
 {id:'ALC_WASH',title:'กรองก่อนตั้งชื่อ',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'water_approach'},text:'คุณใช้ผ้าสะอาดประคองเศษใบไม้ให้ออกจากทางน้ำ งานเล็กนี้ยังไม่ใช่เวทเยียวยา แต่มันทำให้ส่วนผสมที่นำกลับไปทดลองตรวจซ้ำได้ มาเรนขอให้เขียนขั้นตอนตามที่ทำจริง',choices:[
  c('CHALC_WASH_SLOW','ค่อย ๆ ยกเศษใบออกและจดขั้นตอน','ALC_LEAF','herb_bed_front',{cue:'pick',flags:['alc_water_filtered','alc_filter_recorded'],cinematic:shot('water_approach','pick_up')}),
  c('CHALC_WASH_HELP','แบ่งหน้าที่กับมาเรนแล้วตรวจน้ำอีกครั้ง','ALC_LEAF','herb_bed_front',{cue:'pick',flags:['alc_water_filtered','alc_filter_shared'],trust:'MAREN',cinematic:shot('water_approach','interact')}),
 ]},
 {id:'ALC_LEAF',title:'ส่วนที่ใช้และส่วนที่คืน',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'herb_bed_front'},variants:[{flag:'alc_material_examined',text:'คุณตรวจและรับส่วนผสมครั้งแรกแล้ว มาเรนยังจำขอบเขตที่ตกลงกันได้ การกลับมาครั้งนี้เป็นการทบทวน ไม่ได้ทำให้ของทดลองเกิดขึ้นใหม่'}],text:'มาเรนจัดแก่นน้ำ วงแหวน และเกสรฟื้นพลังไว้สำหรับบทเรียน คุณเทียบรอยใบกับสิ่งที่เขียน แยกชิ้นที่ช้ำออกจากส่วนที่จะใช้ แล้วคืนเศษพืชให้ดิน',choices:[
  c('CHALC_LEAF_CHECK','ตรวจแหล่งที่มาและรับชุดทดลองหนึ่งชุด','ALC_OBSERVE','herb_bed_front',{cue:'pick',flags:['alc_material_examined'],onceFlag:'alc_material_examined',items:{CORE_WATER:1,FORM_RING:1,MOD_HEAL:1,IT_POTION_DEW:1,IT_MANA_LEAF:1},cinematic:shot('herb_bed_front','pick_up')}),
  c('CHALC_LEAF_BACK','กลับไปดูวิธีกรองให้แน่ใจก่อน','ALC_WASH','water_approach'),
 ]},
 {id:'ALC_OBSERVE',title:'ช้อนหนึ่งคันกับสมุดสองบรรทัด',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'recipe_front'},text:'ทาลาวางช้อนลงแล้วถามว่าคุณจะเปรียบเทียบสองครั้งอย่างไรโดยไม่เปลี่ยนทุกอย่างพร้อมกัน คุณเขียนขนาดส่วนผสมไว้หนึ่งบรรทัด อีกบรรทัดเว้นไว้ให้ผลที่สังเกตจริง คำตอบที่ไม่ตรงสมมติฐานก็มีที่อยู่ในสมุด',choices:[
  c('CHALC_MEASURE','กำหนดส่วนผสมให้เทียบกันได้ก่อนปรุง','ALC_RECIPE','craft_front',{cue:'pick',flags:['alc_measured'],cinematic:shot('recipe_front','interact')}),
  c('CHALC_OBSERVE_SOURCE','กลับไปตรวจส่วนผสมกับมาเรนอีกครั้ง','ALC_GARDEN','exit_path'),
 ]},
 {id:'ALC_RECIPE',title:'น้ำ วงแหวน และการฟื้นพลัง',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'craft_front'},text:'ทดลองสูตร น้ำ + วงแหวน + ฟื้นพลัง ที่โต๊ะผสมจริง สูตรนี้ฟื้น HP ให้ผู้ร่าย ไม่ใช่การโจมตี ทาลารอให้คุณเป็นคนเลือกและผสม หากรู้สูตรนี้แล้ว ใช้ความรู้เดิมไปตรวจผลได้โดยไม่เสียส่วนผสมซ้ำ',choices:[
  c('CHALC_CRAFT','เปิดโต๊ะผสมสูตรวงแหวนฟื้นพลัง','ALC_RECIPE','craft_front',{route:'craft',cue:'cast',cinematic:shot('craft_front','cast')}),
  c('CHALC_RECIPE_TEST','นำสูตรที่ค้นพบไปตรวจผลกับทาลา','ALC_SAMPLE','craft_front',{when:[knownWater],lockedHint:'ผสมน้ำ + วงแหวน + ฟื้นพลัง หรือใช้สูตรนี้ที่รู้แล้ว'}),
  c('CHALC_RECIPE_BACK','กลับไปดูบันทึกขนาดส่วนผสม','ALC_OBSERVE','recipe_front'),
 ]},
 {id:'ALC_SAMPLE',title:'วงแหวนที่กลับหาผู้ร่าย',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'craft_front'},text:'คุณยืนหน้าหม้อและเปิดบันทึกสูตรที่ค้นพบ วงแหวนฟื้นพลังมีรูปแบบต่างจากลูกแก้วโจมตี ทาลาขอให้คุณสาธิตสูตรที่ระบุไว้ตรง ๆ แล้วจดขอบเขตผลของมัน ก่อนนำไปทดสอบในลานฝึก',choices:[
  c('CHALC_SAMPLE_CAST','สาธิตวงแหวนฟื้นพลังที่ค้นพบแล้ว','ALC_COMPARE','craft_front',{cue:'cast',spellId:'SPELL_WATER_RING_HEAL',target:'scene',when:[knownWater],flags:['alc_support_tested'],cinematic:{...shot('craft_front','cast'),effectTarget:'cauldron'}}),
  c('CHALC_SAMPLE_RECIPE','กลับไปตรวจสูตรที่โต๊ะผสม','ALC_RECIPE','craft_front'),
 ]},
 {id:'ALC_COMPARE',title:'มีผลไม่ได้แปลว่าใช้ได้ทุกเวลา',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'recipe_front'},text:'วงแหวนไม่ทำให้ศัตรูเสีย HP และยังต้องใช้ MP ถ้าใช้โดยไม่ดูจังหวะ คุณอาจฟื้นไม่ทันสิ่งที่ตามมา ทาลาให้คุณบันทึกสิ่งที่มันทำได้คู่กับสิ่งที่มันทำไม่ได้ นี่คือความรู้ที่คนอื่นนำไปใช้ต่อได้',choices:[
  c('CHALC_COMPARE_LIMIT','จดต้นทุนและข้อจำกัดไว้คู่กับผลทดลอง','ALC_RANK1','recipe_front',{flags:['alc_result_compared','alc_cost_noted'],trust:'TALA'}),
  c('CHALC_COMPARE_USER','อธิบายผลตามความต้องการของผู้ใช้','ALC_RANK1','recipe_front',{flags:['alc_result_compared','alc_use_noted'],trust:'TALA'}),
 ]},
 {id:'ALC_RANK1',title:'พื้นฐานของผู้ที่เตรียมให้คนอื่น',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'tutor_front'},text:'ทาลาตรวจทั้งแหล่งวัตถุดิบ การกรอง การวัด และสูตรที่คุณทดลอง ไม่มีขั้นใดถูกแทนด้วยจำนวนประสบการณ์เพียงอย่างเดียว คุโรเปิดลานฝึกให้ทดสอบว่าเมื่ออีกฝ่ายยังลงมือ คุณจะเตรียมตัวอย่างไร',choices:[
  c('CHALC_RANK1','รับรองพื้นฐานนักปรุงเวทขั้นหนึ่ง','ALC_TRIAL','tutor_front',{when:field,flags:['lp_alchemist_rank1'],onceFlag:'lp_alchemist_rank1',trust:'TALA',lockedHint:'เริ่มเรียน ตรวจแหล่ง กรอง วัด และทดลองสูตรจริงให้ครบ'}),
  c('CHALC_RANK1_REVIEW','กลับไปตรวจผลกับสมุด','ALC_COMPARE','recipe_front'),
 ]},
 {id:'ALC_TRIAL',title:'ภูตจำลองไม่รอให้เปิดขวดเสร็จ',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'tutor_front'},text:'คุโรเรียกภูตฝึกตัวเดิม ทาลาย้ำว่าการเตรียมของใช้หนึ่งเทิร์นและศัตรูยังทำตามจังหวะ การทดสอบยุติหรือถอยได้โดยไม่เสียบทเรียน แต่ต้องชนะจริงก่อนรับรองขั้นสอง คุณใช้ประกายพื้นฐานได้หากไม่อยากเสี่ยง MP',choices:[
  c('CHALC_TRIAL_START','เริ่มบททดสอบนักปรุงเวท','ALC_RESULT','tutor_front',{battle:'BT_TRAINING',requires:'lp_alchemist_rank1',when:field,cue:'cast',cinematic:shot('tutor_front','cast')}),
  c('CHALC_TRIAL_PREP','กลับไปจัดสูตรและส่วนผสมก่อน','ALC_RECIPE','craft_front'),
  c('CHALC_TRIAL_HOME','พักบทเรียนไว้แล้วกลับหมู่บ้าน','S02_HUB','exit_path'),
 ]},
 {id:'ALC_RESULT',title:'ขวดที่เปิดทันเวลา',stage:'workshop',npc:'tala-v18',entryFlags:['lp_alchemist_trial_passed'],staging:{location:'spell_workshop',anchor:'tutor_front'},text:'แสงของภูตจำลองดับลง ทาลาไม่ได้ถามว่าจบในกี่ครั้ง เธอถามว่าจังหวะใดที่คุณเลือกฟื้นพลัง คุโรหัวเราะเมื่อพิพพยายามจับช้อนเหมือนอาวุธ แล้วเลื่อนสมุดกลับมาให้จดสิ่งที่ลองจริง',choices:[
  c('CHALC_RESULT_NOTE','สรุปจังหวะที่เลือกใช้ทรัพยากร','ALC_RANK2','recipe_front',{flags:['alc_trial_reflected']}),
  c('CHALC_RESULT_ASK','ถามถึงข้อจำกัดเมื่อออกจากลานฝึก','ALC_RANK2','recipe_front',{flags:['alc_trial_reflected','alc_real_world_limit'],trust:'TALA'}),
 ]},
 {id:'ALC_RANK2',title:'กลั่นโดยไม่สร้างของจากอากาศ',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'recipe_front'},text:'กลั่นน้ำค้างใช้ไอเทมน้ำค้างหนึ่งชิ้น ฟื้น HP 12 และ MP 6 พร้อมล้างเพลิงคุกรุ่นกับม่านพร่า ใช้ได้ครั้งเดียวต่อการต่อสู้ ใช้หนึ่งเทิร์นและไม่หยุดการโจมตีศัตรู ถ้าต้องการ HP มากอย่างเดียว ดื่มปกติอาจเหมาะกว่า',choices:[
  c('CHALC_RANK2','รับรองขั้นสองและฝึกกลั่นน้ำค้าง','ALC_RETURN','recipe_front',{requires:'lp_alchemist_trial_passed',when:field,flags:['lp_alchemist_rank2'],onceFlag:'lp_alchemist_rank2',items:{IT_POTION_DEW:2},trust:'TALA'}),
  c('CHALC_RANK2_REVIEW','กลับไปเทียบผลและข้อจำกัดอีกครั้ง','ALC_COMPARE','recipe_front'),
 ]},
 {id:'ALC_RETURN',title:'ความรู้ต้องเดินตามรอยเท้าได้',stage:'forest_road',npc:'tala-v18',staging:{location:'forest_road',anchor:'path_entry'},text:'ทาลาขอเดินไปดูถนนกับคุณก่อนตัดสินว่าจะใช้บทเรียนที่ใด ราก ป้าย และบันทึกที่คุณเลือกไว้ตั้งแต่ครั้งก่อนยังมีผล คุณจะตรวจสิ่งที่มีอยู่จริง ไม่เปลี่ยนอดีตให้ตรงกับแผนใหม่',choices:[
  c('CHALC_RETURN_ROOT','ดูจุดพักที่เกิดจากการประคองราก','ALC_ROOTS','root_front',{requires:'a2_resolution_care',lockedHint:'เส้นทางนี้เกิดจากการเลือกประคองราก'}),
  c('CHALC_RETURN_SIGN','เดินตรวจป้ายที่ช่วยคนตามทาง','ALC_SIGN','marker_front',{requires:'a2_resolution_path',lockedHint:'เส้นทางนี้เกิดจากการเลือกทำป้าย'}),
  c('CHALC_RETURN_NOTES','เทียบบันทึกที่คุณฝากไว้ให้คนถัดไป','ALC_NOTES','hollow_front',{requires:'a2_resolution_record',lockedHint:'เส้นทางนี้เกิดจากการเลือกทำบันทึก'}),
  c('CHALC_RETURN_HOME','พักการส่งของไว้แล้วกลับหมู่บ้าน','S02_HUB','path_entry'),
 ]},
 {id:'ALC_ROOTS',title:'ที่พักที่ไม่ต้องถอนใครออกจากดิน',stage:'forest_road',npc:'tala-v18',staging:{location:'forest_road',anchor:'root_front'},text:'ใบเล็กบนรากช่วยบังแสงตรงที่พัก ทาลาวัดที่วางขวดโดยเว้นพื้นที่ให้รากโต มาเรนเคยสอนว่าการคุ้มกันกับการขัดขวางอาจดูคล้ายกัน จึงต้องกลับมาตรวจสิ่งที่เราเหลือไว้ด้วย',choices:[
  c('CHALC_ROOT_SPACE','เว้นพื้นที่แล้วจดขนาดที่ใช้ได้','ALC_PLAN','kit_front',{flags:['alc_route_checked','alc_root_space']}),
  c('CHALC_ROOT_NATURE','ใช้บทเรียนผู้พิทักษ์เลือกที่ไม่ทับราก','ALC_PLAN','kit_front',{requires:'lp_nature_rank2',flags:['alc_route_checked','alc_nature_applied'],lockedHint:'ผ่านขั้นสองผู้พิทักษ์ธรรมชาติก่อน',cinematic:shot('root_front','interact','leaf')}),
 ]},
 {id:'ALC_SIGN',title:'คนที่อ่านป้ายกับคนที่ถือขวด',stage:'forest_road',npc:'tala-v18',staging:{location:'forest_road',anchor:'marker_front'},text:'ป้ายเก่าที่คุณทำช่วยให้ทาลาหยุดถูกจุด แต่การถือกระเป๋าหนักทำให้ทางช่วงสั้นรู้สึกยาวขึ้น คุณมองเส้นทางจากคนละหน้าที่ และพบว่าที่พักกับคำอธิบายต้องใช้คู่กัน',choices:[
  c('CHALC_SIGN_WALK','เดินตามทางจริงแล้วจดจุดพัก','ALC_PLAN','kit_front',{cue:'walk',flags:['alc_route_checked','alc_access_checked']}),
  c('CHALC_SIGN_SCOUT','ใช้แผนที่นักสำรวจเทียบจุดพักกับป้าย','ALC_PLAN','kit_front',{requires:'lp_explorer_rank2',flags:['alc_route_checked','alc_explorer_applied'],lockedHint:'ผ่านขั้นสองนักสำรวจก่อน',cinematic:shot('marker_front','interact')}),
 ]},
 {id:'ALC_NOTES',title:'บรรทัดที่ยังมีที่ให้แก้',stage:'forest_road',npc:'tala-v18',staging:{location:'forest_road',anchor:'hollow_front'},text:'บันทึกครั้งก่อนแยกสิ่งที่เห็นกับคำอธิบายไว้ คนถัดมาเขียนต่อได้โดยไม่จำเป็นต้องเชื่อทุกบรรทัด ทาลาขอเพิ่มวิธีใช้ของเตรียมเดินทาง พร้อมคำเตือนว่าขวดหนึ่งใบไม่ได้แก้ทุกอาการ',choices:[
  c('CHALC_NOTES_LIMIT','เพิ่มขอบเขตการใช้ตามผลทดลอง','ALC_PLAN','kit_front',{cue:'pick',flags:['alc_route_checked','alc_notes_extended'],cinematic:shot('hollow_front','interact')}),
  c('CHALC_NOTES_EIRA','ใช้วิธีตรวจแหล่งของไอราเทียบบันทึก','ALC_PLAN','kit_front',{when:[{kind:'trust',npc:'EIRA',min:2}],flags:['alc_route_checked','alc_sources_compared'],lockedHint:'สร้างความไว้วางใจกับไอราอย่างน้อย 2 ก่อน'}),
 ]},
 {id:'ALC_PLAN',title:'เตรียมให้เขา หรือสอนให้ทำเอง',stage:'forest_road',npc:'tala-v18',staging:{location:'forest_road',anchor:'kit_front'},text:'คุณกับทาลาพบที่ที่ของเตรียมเดินทางจะมีประโยชน์แล้ว จะฝากน้ำค้างจริงหนึ่งชิ้นไว้สำหรับคนผ่านทาง หรือเก็บของไว้และนำวิธีปรุงกลับไปสอนที่โรงช่างก็ได้ ทาลาขอเพียงให้คำอธิบายตรงกับสิ่งที่เลือก',choices:[
  c('CHALC_PLAN_PACK','จัดของและคำแนะนำก่อนตัดสินใจ','ALC_PACK','kit_front',{requires:'alc_route_checked'}),
  c('CHALC_PLAN_REVIEW','กลับไปตรวจสถานที่ตามผลที่เคยเลือก','ALC_RETURN','path_entry'),
 ]},
 {id:'ALC_PACK',title:'หนึ่งชิ้นที่นับได้',stage:'forest_road',npc:'tala-v18',staging:{location:'forest_road',anchor:'kit_front'},variants:[{flag:'alc_destination_chosen',text:'คุณเลือกวิธีใช้ความรู้นี้ไว้แล้ว กลับไปตรวจสิ่งที่ฝากหรือสรุปบทเรียนได้ โดยไม่เปลี่ยนคำตอบเดิมและไม่หักของซ้ำ'}],text:'ทาลาเปิดช่องว่างในกระเป๋า การฝากน้ำค้างจะหักหนึ่งชิ้นจากของคุณ ส่วนการสอนไม่หักของชิ้นนั้น ทั้งสองทางยังต้องอธิบายว่ากลั่นแล้วฟื้นได้น้อยกว่าดื่มปกติ แต่ช่วยคลายอาการและฟื้น MP ได้',choices:[
  c('CHALC_PACK_FIELD','ฝากน้ำค้างหนึ่งชิ้นพร้อมวิธีใช้ที่จุดพัก','ALC_DELIVER','kit_front',{cue:'pick',when:[{kind:'notFlag',id:'alc_destination_chosen'}],costs:{IT_POTION_DEW:1},flags:['alc_destination_chosen','alc_field_delivery'],trust:'TALA',cinematic:shot('kit_front','interact')}),
  c('CHALC_PACK_TEACH','เก็บน้ำค้างไว้และกลับไปสอนที่โรงช่าง','ALC_TEACH','path_entry',{when:[{kind:'notFlag',id:'alc_destination_chosen'}],flags:['alc_destination_chosen','alc_workshop_lesson'],trust:'TALA'}),
  c('CHALC_PACK_RECALL','รักษาสิ่งที่เลือกไว้แล้วกลับไปสรุป','ALC_EPILOGUE','path_entry',{requires:'alc_destination_chosen',lockedHint:'เลือกฝากของหรือกลับไปสอนก่อน'}),
 ]},
 {id:'ALC_DELIVER',title:'กระเป๋าที่ไม่ได้มีแต่คำสัญญา',stage:'forest_road',npc:'tala-v18',staging:{location:'forest_road',anchor:'kit_front'},text:'กระเป๋าใบเล็กอยู่ข้างม้านั่งแล้ว ข้างในมีน้ำค้างที่คุณฝากจริงหนึ่งชิ้น ทาลาจดชื่อผู้เตรียมและข้อจำกัดไว้ คนผ่านทางไม่จำเป็นต้องรู้ว่าคุณต่อสู้เก่งแค่ไหนเพื่ออ่านวิธีใช้ได้',choices:[
  c('CHALC_DELIVER_PAUSE','พักการตรวจของไว้แล้วกลับหมู่บ้าน','S02_HUB','path_entry'),
  c('CHALC_DELIVER_CHECK','ตรวจว่าคำแนะนำอ่านได้ก่อนกลับ','ALC_EPILOGUE','path_entry',{flags:['alc_delivery_checked']}),
  c('CHALC_DELIVER_TALA','ขอให้ทาลารับผิดชอบตรวจของเมื่อกลับมา','ALC_EPILOGUE','path_entry',{flags:['alc_delivery_checked','alc_followup_promised'],trust:'TALA'}),
 ]},
 {id:'ALC_TEACH',title:'ช้อนที่มีคนส่งต่อ',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'recipe_front'},text:'คุณเปิดสมุดบนโต๊ะสูตรและอธิบายวิธีแยกผลที่เห็นออกจากสิ่งที่คาด ทาลาเป็นผู้ฟังคนแรก คราวนี้เธอถามเพื่อให้คนอื่นทำต่อได้ ไม่ได้ถามเพื่อจับผิด น้ำค้างที่คุณเลือกเก็บยังอยู่ในกระเป๋า',choices:[
  c('CHALC_TEACH_PAUSE','พักการสอนไว้แล้วกลับหมู่บ้าน','S02_HUB','exit_path'),
  c('CHALC_TEACH_LIMIT','สอนทั้งสิ่งที่ทำได้และสิ่งที่ไม่ควรเดา','ALC_EPILOGUE','recipe_front',{flags:['alc_lesson_shared','alc_teaching_limits'],cinematic:shot('recipe_front','interact','song')}),
  c('CHALC_TEACH_QUESTION','ให้ทาลาลองอธิบายแล้วช่วยกันตรวจ','ALC_EPILOGUE','recipe_front',{flags:['alc_lesson_shared','alc_teaching_questions'],trust:'TALA'}),
 ]},
 {id:'ALC_EPILOGUE',title:'ผู้ปรุงเวทที่ยังเก็บคำถามไว้',stage:'workshop',npc:'tala-v18',staging:{location:'spell_workshop',anchor:'tutor_front'},variants:[{flag:'alc_completed',text:'บทเรียนครั้งแรกจบแล้ว คุณยังรู้สูตรเดิมและกลั่นน้ำค้างได้ ทาลาจำสิ่งที่คุณฝากหรือสอนไว้ การกลับมาคุยไม่ทำให้ของขอบคุณเกิดซ้ำ และไม่ได้เปลี่ยนการตัดสินใจครั้งก่อน'}],text:'ทาลาฝากใบฟื้นเวทไว้ให้หนึ่งใบและขอให้คุณเก็บคำถามที่ยังตอบไม่ได้ไว้ด้วย การเริ่มเป็นนักปรุงเวทไม่ใช่ใบรับรองว่าจะช่วยได้ทุกคน แต่มันทำให้คุณรู้ว่าจะเตรียม ตรวจ และแบ่งปันอย่างไร',choices:[
  c('CHALC_EPILOGUE_FIELD','กลับไปตรวจของที่เลือกฝากไว้','ALC_DELIVER','exit_path',{when:[{kind:'flag',id:'alc_field_delivery'},{kind:'notFlag',id:'alc_delivery_checked'}],lockedHint:'ใช้เมื่อตรวจของที่ฝากยังไม่เสร็จ'}),
  c('CHALC_EPILOGUE_TEACH','กลับไปสอนบทเรียนที่เลือกไว้','ALC_TEACH','recipe_front',{when:[{kind:'flag',id:'alc_workshop_lesson'},{kind:'notFlag',id:'alc_lesson_shared'}],lockedHint:'ใช้เมื่อยังไม่ได้แบ่งปันบทเรียน'}),
  c('CHALC_FINISH','รับของขอบคุณแล้วกลับไปใช้สิ่งที่เรียน','S02_HUB','exit_path',{requires:'alc_destination_chosen',when:[{kind:'anyFlag',ids:['alc_delivery_checked','alc_lesson_shared']}],lockedHint:'ตรวจของที่ฝากหรือสอนบทเรียนตามที่เลือกให้เสร็จก่อน',flags:['alc_completed','alc_thankyou_once'],onceFlag:'alc_thankyou_once',items:{IT_MANA_LEAF:1}}),
 ]},
];
