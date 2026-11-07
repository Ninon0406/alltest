import type {Choice,StoryScene} from './story';
const shot=(anchor:string,pose:NonNullable<Choice['cinematic']>['pose']='talk',effect?:NonNullable<Choice['cinematic']>['effect']):NonNullable<Choice['cinematic']>=>({anchor,pose,...effect?{effect}:{}});
const c=(id:string,label:string,next:string,cue:Choice['cue']='talk',extra:Partial<Choice>={}):Choice=>({id,label,next,cue,...extra});
const at=(anchor:string)=>({location:'battle_glade' as const,anchor});
/** A finite chapter-one expedition. The guardian and full-song endings remain unbuilt. */
export const echoScenes:StoryScene[]=[
 {id:'ECHO_CALL',title:'เสียงที่ตามกลับมาจากงานฉลอง',stage:'village',npc:'eira-v3',staging:{location:'village_center',anchor:'market_entrance'},entryFlags:['echo_expedition_started'],
  text:'เช้าวันต่อมา ไอราได้ยินปลายเพลงจากลานหินหลังศาลเจ้า มันร้องตามคนที่เดินผ่าน แต่ไม่ยอมเว้นจังหวะให้ใครตอบ “คราวนี้เราไม่ต้องเอาคำตอบกลับมาทั้งหมด ขอแค่รู้ว่ามันกำลังฟังอะไร” ลูมิฝากคำถามสั้น ๆ มากับคุณ',choices:[
   c('CHE_CALL_PROMISE','ไปฟังคำฝากของลูมิก่อนออกเดินทาง','ECHO_PROMISE','walk',{cinematic:shot('fountain_front')}),
   c('CHE_CALL_PREP','ขอดูอุปกรณ์กับคุโรก่อน','ECHO_PACK','walk',{cinematic:shot('market_entrance')}),
   c('CHE_CALL_HOME','ยังไม่ไปตอนนี้ กลับจัตุรัสก่อน','S02_HUB','walk',{cinematic:shot('village_road')}),
  ]},
 {id:'ECHO_PROMISE',title:'ฝากช่วงเงียบไปด้วย',stage:'village',npc:'lumi',staging:{location:'village_center',anchor:'fountain_front'},
  text:'ลูมิไม่ได้ขอให้คุณจับเสียงกลับใส่กล่อง “ถ้ามันร้องไม่จบ อย่าเร่งมันนะ ยายก็เป็นแบบนั้นบางวัน” เธอผูกริบบิ้นชิ้นเล็กไว้ที่สมุด เพื่อให้คุณจำได้ว่าเสียงหนึ่งไม่ได้สำคัญเพราะดังที่สุด',choices:[
   c('CHE_PROMISE_LISTEN','สัญญาว่าจะฟังก่อนตอบ','ECHO_PACK','talk',{flags:['echo_vow_listen'],clearFlags:['echo_vow_record'],trust:'LUMI',cinematic:shot('fountain_front','talk','song')}),
   c('CHE_PROMISE_RECORD','สัญญาว่าจะจดทั้งสิ่งที่รู้และสิ่งที่ยังไม่รู้','ECHO_PACK','pick',{flags:['echo_vow_record'],clearFlags:['echo_vow_listen'],trust:'EIRA',cinematic:shot('fountain_front','interact')}),
  ]},
 {id:'ECHO_PACK',title:'ของที่ช่วยให้กลับมาได้',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'recipe_front'},
  text:'คุโรเตรียมเกสรอรุณ ลูกแก้ว และเข็มทิศแมลงแสงไว้ให้ทดลองเวทแสงหนึ่งสูตร พร้อมน้ำค้างหนึ่งขวด “ไม่ใช่ของให้ชนะทุกอย่าง แต่เป็นของให้ลองแล้วกลับมาเล่าได้” รับชุดนี้ได้ครั้งเดียว แล้วเลือกผสมหรือใช้เวทที่รู้จักอยู่แล้ว',choices:[
   c('CHE_PACK_TAKE','รับชุดทดลองแสงและตรวจตำราสูตร','ECHO_RECIPE','pick',{flags:['echo_kit_taken'],onceFlag:'echo_kit_taken',items:{CORE_LIGHT:1,FORM_ORB:1,MOD_SEEK:1,IT_POTION_DEW:1},trust:'KORO',cinematic:shot('recipe_front','interact')}),
   c('CHE_PACK_BACK','กลับไปคุยกับไอราก่อน','ECHO_CALL','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'ECHO_RECIPE',title:'แสงไม่ได้มีไว้แรงกว่าเสมอ',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'craft_front'},
  text:'ตำราเปิดที่เกสรอรุณ + ลูกแก้วมณี + เข็มทิศแมลงแสง เป็นเวทแสงนำวิถีที่อ่านเป้าได้แน่นอน คุโรบอกว่าปมเสียงแพ้แสง แต่ถ้าทวนธาตุเดิมซ้ำ ๆ มันจะตอบแรงขึ้น คุณเตรียมเวทหลายธาตุได้ หรือใช้ประกายพื้นฐานกับการตั้งรับ',choices:[
   c('CHE_RECIPE_CRAFT','เปิดโต๊ะผสมเวทและทดลองสูตร','ECHO_RECIPE','cast',{route:'craft',cinematic:shot('craft_front','interact')}),
   c('CHE_RECIPE_LIGHT','จดวิธีใช้เวทแสงแล้วออกเดินทาง','ECHO_ROAD','talk',{when:[{kind:'knownCore',core:'LIGHT'}],lockedHint:'ผสมเวทแสงก่อน หรือเลือกเตรียมด้วยเวทที่มีด้านล่าง',flags:['echo_light_prepared'],cinematic:shot('recipe_front')}),
   c('CHE_RECIPE_READY','ใช้เวทที่มีและออกเดินทางอย่างระวัง','ECHO_ROAD','walk',{flags:['echo_existing_spells'],cinematic:shot('exit_path')}),
   c('CHE_RECIPE_HOME','กลับหมู่บ้านเพื่อจัดช่องเวทก่อน','S02_HUB','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'ECHO_ROAD',title:'ลานที่มีที่ว่างให้ตอบ',stage:'glade',npc:'pip',staging:at('glade_entrance'),
  text:'ทางหินเลี้ยวผ่านต้นไม้เก่าเข้าสู่ลานเปิด ลำธารไหลอยู่ขอบขวา ซุ้มด้านเหนือมีวงโลหะขาดช่วง พิพกระโดดข้ามเงาเสาแล้วหยุดรอ คุณเห็นรอยเท้าใหม่กับรอยหินสึกซึ่งพาไปคนละด้าน',choices:[
   c('CHE_ROAD_TRACK','ตรวจรอยเท้าตามขอบต้นไม้','ECHO_TRACKS','walk',{cinematic:shot('listening_stone','interact')}),
   c('CHE_ROAD_WATER','ฟังเสียงลำธารก่อนเข้าใกล้วงเวท','ECHO_WATER','walk',{cinematic:shot('water_front','interact')}),
   c('CHE_ROAD_MAP','ใช้แผนที่นักสำรวจเลือกทางที่คนอื่นตามได้','ECHO_TRACKS','walk',{requires:'lp_explorer_rank1',lockedHint:'ผ่านบทเรียนแผนที่นักสำรวจระดับ 1 ก่อน หรือสำรวจรอยเท้าด้วยกันได้',flags:['echo_explorer_route'],cinematic:shot('listening_stone','interact','leaf')}),
   c('CHE_ROAD_BACK','กลับไปเตรียมของที่โรงช่าง','ECHO_PACK','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'ECHO_TRACKS',title:'รอยเท้าที่จงใจเว้นระยะ',stage:'glade',npc:'pip',staging:at('listening_stone'),
  text:'รอยเล็กหยุดตรงหินทุกก้อนราวกับผู้เดินกำลังรอเสียงตอบ คุณไม่พบร่องรอยไล่ล่า ไอราขีดลูกศรไว้ด้านที่ปลอดภัย ส่วนพิพพยายามเลียนรอยเท้าจนต้องหยุดรอขาสั้น ๆ ของตัวเอง',choices:[
   c('CHE_TRACK_MARK','ทำเครื่องหมายทางกลับไว้ก่อน','ECHO_ARCH','pick',{flags:['echo_route_marked'],cinematic:shot('listening_stone','interact')}),
   c('CHE_TRACK_WAIT','รอพิพแล้วบอกให้ทุกคนเดินพร้อมกัน','ECHO_ARCH','talk',{flags:['echo_waited_for_pip'],trust:'PIP',cinematic:shot('listening_stone','talk','leaf')}),
   c('CHE_TRACK_WATER','แวะตรวจเสียงข้างลำธารด้วย','ECHO_WATER','walk',{cinematic:shot('water_front')}),
  ]},
 {id:'ECHO_WATER',title:'โน้ตที่ติดอยู่ใต้กิ่งไม้',stage:'glade',npc:'eira-v3',staging:at('water_front'),
  text:'กิ่งไม้เล็กติดช่องน้ำจนเกิดเสียงซ้ำเดิม ไม่มีอะไรต้องถูกทำลาย แค่เปิดทางให้น้ำ ไอราขอให้คุณฟังความต่างหลังขยับกิ่ง และเก็บละอองที่ตกค้างไว้ทดลองโดยไม่ตักลำธารจนแห้ง',choices:[
   c('CHE_WATER_HAND','ยกกิ่งไม้ออกด้วยมือแล้วฟังจังหวะใหม่','ECHO_ARCH','pick',{flags:['echo_water_open','echo_water_sample'],onceFlag:'echo_water_sample',items:{FORM_RAIN:1,MOD_LINGER:1},cinematic:shot('water_front','interact','song')}),
   c('CHE_WATER_WIND','ใช้เวทลมพากิ่งไม้ออกจากช่องน้ำ','ECHO_ARCH','cast',{when:[{kind:'knownCore',core:'WIND'}],lockedHint:'ค้นพบเวทวายุก่อน หรือยกกิ่งด้วยมือได้',spellCore:'WIND',target:'scene',flags:['echo_water_open','echo_water_sample'],onceFlag:'echo_water_sample',items:{FORM_RAIN:1,MOD_LINGER:1},cinematic:shot('water_front','cast','song')}),
   c('CHE_WATER_ROOT','ใช้บทเรียนดูแลรากจัดกิ่งให้เป็นที่หลบของปลา','ECHO_ARCH','pick',{requires:'lp_nature_rank1',lockedHint:'ผ่านบทเรียนผู้พิทักษ์ธรรมชาติระดับ 1 ก่อน หรือใช้มือเปิดช่องน้ำได้',flags:['echo_water_open','echo_water_sample','echo_nature_shelter'],onceFlag:'echo_water_sample',items:{FORM_RAIN:1,MOD_LINGER:1},cinematic:shot('water_front','interact','leaf')}),
  ]},
 {id:'ECHO_ARCH',title:'วงที่ไม่ได้ปิดสนิท',stage:'glade',npc:'eira-v3',staging:at('arch_front'),
  text:'วงโลหะเหนือแท่นมีช่องว่างหนึ่งช่วง ไม่ใช่ชิ้นส่วนที่พัง แต่เป็นที่ให้เสียงเดินออกไป ไอราพบรอยเขียนว่า “ตอบได้ แต่อย่าตอบแทนทั้งหมด” แสงตรงกลางยังทวนเสียงโดยไม่ยอมหยุด',choices:[
   c('CHE_ARCH_READ','เทียบรอยเขียนกับสมุดโดยไม่เติมคำที่หายไป','ECHO_LISTEN','pick',{flags:['echo_inscription_read'],cinematic:shot('sample_front','interact','song')}),
   c('CHE_ARCH_GAP','ยืนฟังตรงช่องว่างของวงโลหะ','ECHO_LISTEN','talk',{flags:['echo_gap_heard'],cinematic:shot('arch_front','talk','song')}),
   c('CHE_ARCH_RETREAT','กลับต้นทางลานก่อน','ECHO_ROAD','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'ECHO_LISTEN',title:'สิ่งที่มันทำได้เพียงอย่างเดียว',stage:'glade',npc:'eira-v3',staging:at('sample_front'),
  text:'ไอราเคาะหินหนึ่งครั้ง ปมแสงเคาะตอบหนึ่งครั้ง เมื่อเธอเงียบ มันกลับทวนเสียงเก่าซ้ำ “มันจำได้ แต่ยังไม่รู้ว่าจะรอคนอื่นอย่างไร” คุณเห็นว่าการใช้เวทธาตุเดิมติดกันจะทำให้มันรวมเสียงแรงขึ้น',choices:[
   c('CHE_LISTEN_PAUSE','ลองเว้นจังหวะให้มันตอบจนจบ','ECHO_SIGNAL','talk',{flags:['echo_pattern_observed','echo_paused'],cinematic:shot('sample_front','talk','song')}),
   c('CHE_LISTEN_NOTE','จดว่าเสียงใดเกิดก่อนและเสียงใดตามมา','ECHO_SIGNAL','pick',{flags:['echo_pattern_observed','echo_sequence_noted'],cinematic:shot('sample_front','interact')}),
  ]},
 {id:'ECHO_SIGNAL',title:'ข้อตกลงก่อนเข้าใกล้',stage:'glade',npc:'eira-v3',staging:at('battle_center'),
  text:'คุณกับไอราตกลงสัญญาณถอย ถ้ารู้ใจกันพอและเวทวายุเปิดช่องลมระหว่างสู้ได้ เธอจะช่วยกันเสียงให้คุณออกมา อีกทางหนึ่งคือให้เธอแยกรูนอย่างช้า ๆ ทั้งสองวิธีเปิดทางได้ แต่การฟังไม่ใช่ชัยชนะในการต่อสู้และไม่ได้รางวัลของคู่ต่อสู้',choices:[
   c('CHE_SIGNAL_TEAM','บอกไอราว่าจะฟังสัญญาณของเธอ','S21_ECHO_TRIAL','talk',{flags:['echo_signal_agreed'],trust:'EIRA',cinematic:shot('player_battle')}),
   c('CHE_SIGNAL_SOLO','ขอทดลองอ่านจังหวะด้วยตัวเองก่อน','S21_ECHO_TRIAL','walk',{flags:['echo_self_reliant'],cinematic:shot('player_battle')}),
  ]},
 {id:'S21_ECHO_TRIAL',title:'ปมเสียงย้อน',stage:'glade',npc:'echo-knot-v15',staging:at('player_battle'),
  text:'ปมแสงลอยขึ้นฝั่งตรงข้ามของวงหิน มันจะฟังก่อนหนึ่งจังหวะ แล้วประกาศธาตุที่จำได้ก่อนทวนกลับ การใช้เวทโจมตีธาตุเดิมซ้ำทำให้แรงตอบเป็น 16 แทน 11 สลับธาตุ ตั้งรับ หรือใช้ประกายพื้นฐานเพื่อไม่เติมเสียงเดิม คุณยังถอยกลับไปเตรียมตัวได้ก่อนเริ่ม',choices:[
   c('CH2101','เลือกต่อสู้กับปมเสียงย้อน','ECHO_RESULT','cast',{battle:'B04_ECHO_KNOT',requires:'echo_pattern_observed',lockedHint:'ฟังรูปแบบที่แท่นหินกับไอราก่อน',cinematic:shot('player_battle','cast','song')}),
   c('CH2102','ให้ไอราลองแยกรูนก่อน','ECHO_BYPASS','talk',{when:[{kind:'trust',npc:'EIRA',min:2},{kind:'flag',id:'echo_pattern_observed'}],lockedHint:'ไอราต้องไว้วางใจอย่างน้อย 2 และคุณต้องสังเกตรูปแบบเสียงก่อน',cinematic:shot('sample_front','interact','song')}),
   c('CH2103','ย้อนกลับไปเตรียมตัว','ECHO_ROAD','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'ECHO_BYPASS',title:'เปิดช่องให้มันฟัง',stage:'glade',npc:'eira-v3',staging:at('sample_front'),
  text:'ไอราไม่ลบรูนเก่า เธอหมุนวงหนึ่งให้มีช่องว่าง คุณรอจนเสียงครั้งก่อนจบก่อนเคาะตอบ แสงค่อย ๆ คลายออก วิธีนี้ไม่ได้ปราบปมเสียง แต่ทำให้มันยอมรับเสียงที่ไม่ได้เหมือนตัวเอง',choices:[
   c('CHE_BYPASS_WAIT','รอจนวงรูนหยุดทวนแล้วจึงเข้าใกล้','ECHO_RESULT','talk',{flags:['echo_knot_cleared','echo_resolved_by_listening'],trust:'EIRA',cinematic:shot('sample_front','talk','song')}),
  ]},
 {id:'ECHO_RESULT',title:'เสียงแรกที่ไม่ตอบซ้ำ',stage:'glade',npc:'eira-v3',entryFlags:['echo_trial_resolved'],staging:at('echo_front'),
  text:'ปมแสงลดตัวลง ไม่ได้หายไป มันปล่อยให้เสียงน้ำดังจนจบก่อนร้องโน้ตสั้นที่คุณไม่เคยได้ยิน วงหินเปิดไปถึงประตูที่ยังปิดอยู่ คุณไม่จำเป็นต้องทดสอบประตูนั้นวันนี้ สิ่งที่เรียนรู้ตรงนี้ควรกลับไปถึงคนที่รออยู่',choices:[
   c('CHE_RESULT_SAMPLE','ตรวจเศษวงโลหะที่หลุดอยู่ข้างแท่น','ECHO_SAMPLE','walk',{cinematic:shot('sample_front','interact')}),
   c('CHE_RESULT_RECORD','เขียนสิ่งที่เกิดขึ้นขณะยังจำได้ชัด','ECHO_RECORD','pick',{flags:['echo_result_recorded'],cinematic:shot('listening_stone','interact')}),
  ]},
 {id:'ECHO_SAMPLE',title:'เก็บเพียงสิ่งที่หลุดแล้ว',stage:'glade',npc:'pip',staging:at('sample_front'),
  text:'ข้อเชื่อมประกายหลุดอยู่บนพื้น ไม่ต้องดึงชิ้นส่วนจากวงที่ยังทำงาน ไอราขอให้เหลือสัญลักษณ์ต้นฉบับไว้ให้คนถัดมา ส่วนพิพคาบกิ่งไม้มาแทนของที่คุณตั้งใจไม่หยิบ',choices:[
   c('CHE_SAMPLE_TAKE','เก็บข้อเชื่อมที่หลุดไว้ทดลองและทำบันทึก','ECHO_RECORD','pick',{flags:['echo_sample_taken'],onceFlag:'echo_sample_taken',items:{FORM_CHAIN:1},cinematic:shot('sample_front','interact','song')}),
   c('CHE_SAMPLE_LEAVE','วาดรูปชิ้นส่วนแล้ววางไว้ให้ผู้ศึกษาคนต่อไป','ECHO_RECORD','pick',{flags:['echo_sample_left'],trust:'EIRA',cinematic:shot('sample_front','interact')}),
  ]},
 {id:'ECHO_RECORD',title:'ความรู้ควรกลับไปหาใคร',stage:'glade',npc:'eira-v3',staging:at('listening_stone'),
  text:'ในสมุดมีทั้งจังหวะของปมเสียงและสัญญาณที่คนสองคนใช้รอกัน ไอราไม่อยากให้รายงานกลายเป็นเพียงวิธีชนะ คุณเลือกว่าจะกลับไปเล่าเรื่องให้ใครฟังก่อน บันทึกการทดลองยังอยู่ครบทั้งสองทาง',choices:[
   c('CHE_RECORD_CARE','นำเรื่องการรอไปเล่าให้มาเรนฟัง','ECHO_MAREN','walk',{flags:['echo_report_care','echo_result_recorded'],clearFlags:['echo_report_knowledge'],cinematic:shot('exit_path')}),
   c('CHE_RECORD_KNOWLEDGE','ช่วยไอราเรียบเรียงกฎที่ตรวจสอบได้','ECHO_REPORT','walk',{flags:['echo_report_knowledge','echo_result_recorded'],clearFlags:['echo_report_care'],cinematic:shot('exit_path')}),
  ]},
 {id:'ECHO_MAREN',title:'ไม่ต้องตอบในทันที',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'maren_front'},
  text:'มาเรนฟังจนคุณเล่าจบ แล้วเว้นช่วงเงียบไว้หนึ่งอึดใจ “คนแก่บางคนก็ทวนเรื่องเดิมเพราะกลัวคนอื่นลืม ไม่ได้อยากให้โลกหยุดฟังเรื่องใหม่” เธอฝากคุณไปบอกลูมิว่าเพลงสั้น ๆ เมื่อคืนยังอยู่กับเธอ',choices:[
   c('CHE_MAREN_STAY','นั่งอยู่ด้วยจนยายพร้อมเล่าต่อ','ECHO_LUMI','rest',{flags:['echo_maren_heard'],trust:'MAREN',cinematic:shot('maren_listen_seat','rest','leaf')}),
   c('CHE_MAREN_NOTE','จดคำฝากด้วยถ้อยคำที่ยายเลือกเอง','ECHO_LUMI','pick',{flags:['echo_maren_heard','echo_maren_words'],trust:'MAREN',cinematic:shot('maren_front','interact')}),
  ]},
 {id:'ECHO_REPORT',title:'เว้นที่ให้ตรวจซ้ำ',stage:'archive',npc:'eira-v3',
  text:'ไอราเขียนแยกข้อสังเกตออกจากคำอธิบาย สิ่งที่เห็นคือปมเสียงจำธาตุ สิ่งที่ยังไม่รู้คือใครสร้างมันและทำไมประตูด้านในยังปิด “คำถามที่ดีควรช่วยคนต่อไปเริ่มจากที่เราไปถึง ไม่ใช่เชื่อเราทุกคำ”',choices:[
   c('CHE_REPORT_COPY','ทำสำเนาเปิดให้นักเรียนคนต่อไปทดลอง','ECHO_LUMI','pick',{flags:['echo_public_record'],trust:'EIRA'}),
   c('CHE_REPORT_LIMIT','ระบุข้อจำกัดและทางถอยไว้หน้ารายงาน','ECHO_LUMI','talk',{flags:['echo_safety_record'],trust:'EIRA'}),
  ]},
 {id:'ECHO_LUMI',title:'กล่องที่ไม่จำเป็นต้องเก็บทุกเสียง',stage:'village',npc:'lumi',staging:{location:'village_center',anchor:'fountain_front'},
  text:'ลูมิฟังว่าปมแสงยอมรอเสียงน้ำได้อย่างไร แล้วลองเปิดกล่องดนตรีเพียงครึ่งรอบ “งั้นวันนี้หนูเล่นแค่นี้ก่อน ที่เหลือให้เสียงน้ำพุร้องต่อ” คุณได้กลับมาพร้อมเรื่องหนึ่งที่เล่าจบ ไม่ใช่คำตอบของทั้งโลก',choices:[
   c('CHE_LUMI_PAUSE','ฟังเสียงน้ำพุจนกล่องหยุดหมุน','ECHO_CLOSURE','talk',{flags:['echo_lumi_shared'],trust:'LUMI',cinematic:shot('fountain_front','talk','song')}),
   c('CHE_LUMI_TRY','ให้ลูมิลองเว้นจังหวะเอง','ECHO_CLOSURE','pick',{flags:['echo_lumi_shared','echo_lumi_tried'],trust:'LUMI',cinematic:shot('fountain_front','interact','song')}),
  ]},
 {id:'ECHO_CLOSURE',title:'กลับมาพร้อมช่องว่างหนึ่งช่วง',stage:'village',npc:'pip',staging:{location:'village_center',anchor:'village_road'},
  text:'การเดินทางไปลานเสียงย้อนจบลงแล้ว คุโรให้เลือกวัสดุสำหรับทดลองครั้งถัดไปเพียงหนึ่งอย่าง เศษผลึกช่วยให้เวททะลวงแนวป้องกัน ส่วนทรายเวลาอ่อนช่วยคงผลเวท ประตูชั้นในยังเป็นงานที่ต้องเตรียมต่อ ไม่มีใครเรียกวันนี้ว่าจุดจบของเพลง',choices:[
   c('CHE_CLOSE_PIERCE','เลือกเขี้ยวผลึกเจาะแล้วกลับจัตุรัส','S02_HUB','pick',{flags:['echo_expedition_complete','echo_report_reward','echo_gift_pierce'],clearFlags:['echo_gift_linger'],onceFlag:'echo_report_reward',items:{MOD_PIERCE:1},cinematic:shot('market_entrance','interact','song')}),
   c('CHE_CLOSE_LINGER','เลือกทรายเวลาอ่อนแล้วกลับโรงช่าง','S04_KORO','walk',{flags:['echo_expedition_complete','echo_report_reward','echo_gift_linger'],clearFlags:['echo_gift_pierce'],onceFlag:'echo_report_reward',items:{MOD_LINGER:1},cinematic:shot('market_entrance','interact','song')}),
  ]},
];
