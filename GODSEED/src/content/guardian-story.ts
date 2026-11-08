import type {Choice,StoryScene} from './story';
const shot=(anchor:string,pose:NonNullable<Choice['cinematic']>['pose']='talk',effect?:NonNullable<Choice['cinematic']>['effect']):NonNullable<Choice['cinematic']>=>({anchor,pose,...effect?{effect}:{}});
const c=(id:string,label:string,next:string,cue:Choice['cue']='talk',extra:Partial<Choice>={}):Choice=>({id,label,next,cue,...extra});
const shrine=(anchor:string)=>({location:'ancient_shrine' as const,anchor});
const routes=['chapter1_family','chapter1_community','chapter1_archive'];
const resolution=(route:string):Partial<Choice>=>({flags:['guardian_resolved','song_restored',route],clearFlags:routes.filter(r=>r!==route)});
/** A chapter conclusion, never a full-game ending. All resources are earned choices. */
export const guardianScenes:StoryScene[]=[
 {id:'G_CALL',title:'ประตูที่รอเสียงตอบ',stage:'village',npc:'eira-v3',staging:{location:'village_center',anchor:'market_entrance'},entryFlags:['guardian_journey_started'],text:'ไอราวางสำเนาวงโลหะจากลานเสียงย้อนข้างกล่องดนตรี ช่องว่างทั้งสองตรงกันพอดี “ข้างในอาจไม่ได้ขังเพลงไว้ แต่อาจมีใครเฝ้ามันจนไม่กล้าปล่อย” เธอชวนคุณกลับไปโดยนำเรื่องของคนที่รออยู่ไปด้วย',choices:[
  c('CHG_CALL_LUMI','ฟังว่าลูมิอยากได้อะไรกลับมา','G_LUMI','walk',{cinematic:shot('fountain_front')}),
  c('CHG_CALL_PREP','เตรียมของกับคุโรก่อน','G_KIT','walk',{cinematic:shot('market_entrance')}),
  c('CHG_CALL_BACK','ยังไม่เข้าประตู กลับจัตุรัส','S02_HUB','walk',{cinematic:shot('village_road')}),
 ]},
 {id:'G_LUMI',title:'เพลงที่ไม่ต้องร้องให้เหมือนเดิม',stage:'village',npc:'lumi',staging:{location:'village_center',anchor:'fountain_front'},text:'ลูมิลองฮัมท่อนที่ยายยังร้องไม่จบ “ถ้ายายจำเสียงของหนูตอนโตไม่ได้ หนูจะสอนใหม่ก็ได้” เธอไม่ได้ฝากคำขอให้คุณชนะ ฝากเพียงว่าอย่าทิ้งใครไว้คนเดียวกับความทรงจำ',choices:[
  c('CHG_LUMI_PROMISE','สัญญาว่าจะถามผู้เฝ้าประตูด้วยว่าเขากลัวอะไร','G_KIT','talk',{flags:['guardian_family_promise'],trust:'LUMI',cinematic:shot('fountain_front','talk','song')}),
  c('CHG_LUMI_COPY','ขอจดทำนองใหม่ของลูมิไว้คู่ทำนองเก่า','G_KIT','pick',{flags:['guardian_new_verse'],trust:'EIRA',cinematic:shot('fountain_front','interact')}),
 ]},
 {id:'G_KIT',title:'เตรียมกลับมา ไม่ใช่เตรียมให้ไร้พลาด',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'recipe_front'},text:'คุโรวางน้ำค้างสามขวด ใบฟื้นเวทสองใบ และส่วนผสมพฤกษาเยียวยาหนึ่งสูตร “ตั้งรับแล้วได้ MP กลับ ไม่จำเป็นต้องเร่งใช้ทุกเทิร์น” ชุดนี้รับได้ครั้งเดียว ของใช้ที่ใช้ระหว่างทดสอบจะคืนให้เมื่อแพ้ แต่ถ้าชนะจะใช้ไปตามจริง',choices:[
  c('CHG_KIT_TAKE','รับชุดเตรียมตัวแล้วตรวจสูตร','G_CRAFT','pick',{flags:['guardian_kit_taken'],onceFlag:'guardian_kit_taken',items:{IT_POTION_DEW:3,IT_MANA_LEAF:2,CORE_BLOOM:1,FORM_RING:1,MOD_HEAL:1},cinematic:shot('recipe_front','interact')}),
  c('CHG_KIT_HOME','กลับไปจัดสมุดเวทที่จัตุรัส','S02_HUB','walk',{cinematic:shot('exit_path')}),
 ]},
 {id:'G_CRAFT',title:'เวทที่ช่วยให้รอได้',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'craft_front'},text:'เมล็ดผลิบาน + ห่วงใบไม้เงิน + น้ำค้างเยียวยา สร้างวงแหวนพฤกษาชีวา ใช้ฟื้น HP ให้ตนเองได้จริงระหว่างสู้ คุณเลือกผสมตอนนี้หรือเก็บไว้ทีหลังได้ บททดสอบไม่บังคับเวทหายาก',choices:[
  c('CHG_CRAFT_OPEN','ทดลองสูตรเยียวยาที่โต๊ะผสม','G_CRAFT','cast',{route:'craft',cinematic:shot('craft_front','interact')}),
  c('CHG_CRAFT_MAREN','ไปขอคำแนะนำจากมาเรน','G_MAREN','walk',{cinematic:shot('exit_path')}),
  c('CHG_CRAFT_ROAD','พร้อมแล้ว ออกเดินทางกับไอรา','G_SEAL_INNER','walk',{cinematic:shot('exit_path')}),
 ]},
 {id:'G_MAREN',title:'คนที่อยู่ข้างนอกวงทดสอบ',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'maren_front'},text:'มาเรนจำวิธีที่คุณนั่งฟังเธอได้ “คนเฝ้าความทรงจำคงเหนื่อยมาก หากต้องรับทุกเสียงไว้คนเดียว” เธอจะรออยู่ข้างประตู หากคุณเคยช่วยลูมิหรือดูแลสวน เสียงของเพื่อนจะคุ้มกันหนึ่งครั้งเมื่อบททดสอบเข้าระยะสุดท้าย',choices:[
  c('CHG_MAREN_REST','นั่งฟังและพักให้พร้อมก่อนออกเดินทาง','G_SEAL_INNER','rest',{flags:['guardian_companions_ready'],trust:'MAREN',cinematic:shot('maren_listen_seat','rest','leaf')}),
  c('CHG_MAREN_THANK','ขอบคุณแล้วไปอ่านประตูด้วยกัน','G_SEAL_INNER','walk',{flags:['guardian_companions_ready'],cinematic:shot('exit_path')}),
 ]},
 {id:'G_SEAL_INNER',title:'ทางผ่านผนึก',stage:'ruins',npc:'eira-v3',staging:shrine('shrine_entrance'),text:'ช่องว่างในรูนเปิดตรงจังหวะที่คุณหยุดร้อง ภายในไม่มีคลังสมบัติ มีเพียงที่ว่างสำหรับผู้ที่รออยู่ คุณยังกลับไปเตรียมตัวได้ทุกเมื่อก่อนเริ่มบททดสอบ',choices:[
  c('CHG_PASSAGE_READ','ตรวจผนึกที่วงหินด้านใน','G_INSCRIPTION','walk',{cinematic:shot('rune_front','interact','song')}),
  c('CHG_PASSAGE_SAMPLE','เก็บแร่ม่านค่ำที่หลุดจากช่องผนึก','G_INSCRIPTION','pick',{flags:['guardian_passage_sample'],onceFlag:'guardian_passage_sample',items:{CORE_SHADOW:1},cinematic:shot('crystal_front','pick_up','song')}),
  c('CHG_PASSAGE_BACK','กลับหมู่บ้านเพื่อเตรียมของ','S02_HUB','walk',{cinematic:shot('exit_path')}),
 ]},
 {id:'G_INSCRIPTION',title:'สามจังหวะของผู้เฝ้า',stage:'ruins',npc:'eira-v3',staging:shrine('rune_front'),text:'ไอราอ่านรอยจารึก: ช่วงแรกกางผนึก สะท้อนพลัง แล้วหยุดให้ฟัง ช่วงกลางป้องกันแน่นขึ้น เวททะลวงช่วยผ่านเกราะได้ พฤกษาหรือเสียงสะท้อนที่ใช้ด้วยความเข้าใจจะคลายเกราะ ช่วงสุดท้ายเศษความทรงจำจะมาก่อนคลื่นหนัก ตั้งรับในจังหวะนั้น',choices:[
  c('CHG_READ_PATTERN','จดสามจังหวะและความหมายของช่องว่าง','G_PACT','pick',{flags:['guardian_pattern_understood'],cinematic:shot('rune_front','interact','song')}),
  c('CHG_READ_LISTEN','ฟังไอราอธิบายจนจบก่อนเข้าไป','G_PACT','talk',{flags:['guardian_pattern_understood'],trust:'EIRA',cinematic:shot('tablet_front','talk','song')}),
 ]},
 {id:'G_PACT',title:'ตกลงขอบเขตก่อนทดสอบ',stage:'ruins',npc:'eira-v3',staging:shrine('circle_front'),text:'ผู้พิทักษ์ตอบรับว่าคุณมาเรียนรู้ ไม่ได้มาแย่งเพลง คุณเลือกรูปแบบทดสอบได้โดยไม่มีผลตัดสิทธิ์บทสรุป โหมดผ่อนแรงลดการโจมตีของเขา 25% และกลับมาเลือกใหม่ได้ก่อนเริ่ม',choices:[
  c('CHG_PACT_STANDARD','รับบททดสอบตามจังหวะเดิม','S22_GUARDIAN','talk',{flags:['guardian_pact_ready'],clearFlags:['guardian_gentle_test'],cinematic:shot('sentinel_front')}),
  c('CHG_PACT_GENTLE','ขอทดสอบแบบผ่อนแรงเพื่ออ่านจังหวะ','S22_GUARDIAN','talk',{flags:['guardian_pact_ready','guardian_gentle_test'],cinematic:shot('sentinel_front','talk','song')}),
 ]},
 {id:'S22_GUARDIAN',title:'ผู้พิทักษ์รอยลืม',stage:'ruins',npc:'guardian-v16',staging:shrine('sentinel_front'),text:'วงหินลอยแยกออกเป็นร่างผู้พิทักษ์ “ข้าเฝ้าเก็บเสียงไว้ เพราะกลัวมันสูญไปอีกครั้ง” บอสมี 150 HP และสามระยะ ระหว่างสู้หนีหรือยอมแพ้ไม่ได้ แพ้แล้วกลับมาลองใหม่ได้พร้อมของใช้ก่อนเข้าทดสอบ บันทึกไฟล์ระหว่างเทิร์นได้ตามปกติ',choices:[
  c('CH2201','ยืนยันเข้าทดสอบผนึก','S23_DECISION','cast',{battle:'B05_MEMORY_GUARDIAN',requires:'guardian_pact_ready',lockedHint:'อ่านจารึกและตกลงรูปแบบทดสอบกับไอราก่อน',cinematic:shot('sentinel_front','cast','song')}),
  c('CH2202','ทบทวนจังหวะและการเตรียมเวท','G_REVIEW','pick',{cinematic:shot('rune_front','interact')}),
  c('CH2203','กลับหมู่บ้านก่อนเริ่มบททดสอบ','S02_HUB','walk',{cinematic:shot('exit_path')}),
 ]},
 {id:'G_REVIEW',title:'มีทางรับมือเสมอ',stage:'ruins',npc:'eira-v3',staging:shrine('rune_front'),text:'ตั้งรับลดแรงโจมตี 40% และคืน 6 MP ผนึกลดความเสียหาย 50% สองจังหวะ พลังทะลวงลดผลเกราะ ช่วงแรกแพ้แสง ช่วงกลางแพ้เสียงสะท้อน ช่วงสุดท้ายแพ้พฤกษา แต่ใช้เวทที่มีอยู่และของเตรียมตัวก็ผ่านได้ อย่าใช้ของฟื้นพลังตอน HP เต็ม',choices:[
  c('CHG_REVIEW_BACK','กลับไปยังวงทดสอบ','S22_GUARDIAN','walk',{cinematic:shot('sentinel_front')}),
  c('CHG_REVIEW_MODE','เปลี่ยนรูปแบบทดสอบก่อนเริ่ม','G_PACT','talk',{cinematic:shot('circle_front')}),
  c('CHG_REVIEW_CRAFT','กลับโรงช่างเพื่อผสมและติดตั้งเวท','G_CRAFT','walk',{cinematic:shot('exit_path')}),
 ]},
 {id:'S23_DECISION',title:'ทางเลือกของเมล็ด',stage:'ruins',npc:'guardian-v16',entryFlags:['guardian_trial_complete'],staging:shrine('circle_front'),text:'วงหินสงบลงโดยไม่มีชิ้นใดถูกทำลาย “ข้าเก็บได้ทุกเสียง แต่ไม่รู้ว่าควรให้เสียงไหนเดินทางต่อ” เมล็ดความทรงจำวางตัวลงบนแท่น ทั้งสามทางคืนทำนองพื้นฐานให้หมู่บ้าน ต่างกันเพียงว่าจะดูแลมันร่วมกันอย่างไร',choices:[
  c('CH2301','คืนเพลงให้ลูมิและยายด้วยตนเอง','S24_END_FAMILY','pick',{...resolution('chapter1_family'),trust:'LUMI',cinematic:shot('tablet_front','pick_up','song')}),
  c('CH2302','ชวนคนทั้งหมู่บ้านร้องและเติมเพลงร่วมกัน','S25_END_COMMUNITY','cast',{...resolution('chapter1_community'),trust:'MAREN',cinematic:shot('circle_front','cast','song')}),
  c('CH2303','เก็บต้นฉบับในหอสมุดและส่งสำเนาให้ทุกคน','S26_END_ARCHIVE','pick',{...resolution('chapter1_archive'),trust:'EIRA',cinematic:shot('rune_front','interact','song')}),
 ]},
 {id:'S24_END_FAMILY',conclusion:'chapter',title:'เพลงของบ้านหลังหนึ่ง',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'maren_front'},text:'ลูมิรอให้ยายเริ่มก่อน ท่อนที่หายไปกลับมา แต่เสียงของวันนี้ไม่เหมือนเมื่อหลายปีก่อน และไม่จำเป็นต้องเหมือน คุโรขยับแว่นแล้วอ้างว่ามีฝุ่นเข้าตา คุณเหลือที่ว่างในสมุดไว้ให้ลูมิเขียนท่อนของเธอ',choices:[
  c('CH2401','นั่งฟังสองคนร้องจนจบแล้วจดวันนี้ไว้','G_AFTER_FAMILY','rest',{flags:['chapter1_resolution_recorded'],cinematic:shot('maren_listen_seat','rest','song')}),
 ]},
 {id:'S25_END_COMMUNITY',conclusion:'chapter',title:'จัตุรัสแห่งเสียงที่ต่างกัน',stage:'village',npc:'lumi',staging:{location:'village_center',anchor:'fountain_front'},text:'คนข้างน้ำพุเริ่มคนละคีย์จนพิพต้องกระโดดเคาะจังหวะ ลูมิหัวเราะก่อนร้องใหม่ คราวนี้ไม่มีต้นฉบับเสียงเดียวให้ทุกคนเลียนแบบ มีทำนองที่คนเดินช้าก็เข้าวงทัน',choices:[
  c('CH2501','รักษาจังหวะให้ทุกคนได้ร้องท่อนของตัวเอง','G_AFTER_COMMUNITY','talk',{flags:['chapter1_resolution_recorded'],cinematic:shot('fountain_front','talk','song')}),
 ]},
 {id:'S26_END_ARCHIVE',conclusion:'chapter',title:'สมุดที่ไม่ปิดเล่ม',stage:'archive',npc:'eira-v3',text:'ไอราไม่ได้ล็อกต้นฉบับไว้ในตู้ เธอวางสำเนาคู่กัน พร้อมวัน เวลา และสิ่งที่ผู้จดอาจจำคลาด ลูมิวาดรูปกล่องดนตรีบนปก หน้าสุดท้ายมีรอยหอคอยเจ็ดแห่ง แต่ยังไม่มีใครเติมคำอธิบายแทนหลักฐาน',choices:[
  c('CH2601','เขียนชื่อผู้เล่าทุกคนไว้ข้างทำนอง','G_AFTER_ARCHIVE','pick',{flags:['chapter1_resolution_recorded','chapter1_archive_credit']}),
 ]},
 {id:'G_AFTER_FAMILY',title:'ที่นั่งเผื่อคนกลับบ้าน',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'maren_listen_seat'},text:'มาเรนเลื่อนเก้าอี้มาอีกตัว “เพลงช่วยให้จำได้ว่าเคยมีความสุข แต่คนที่ยอมนั่งฟังทำให้วันนี้มีความสุขด้วย” เธอชวนให้คุณกลับมาได้ แม้ครั้งหน้าจะไม่มีเรื่องยิ่งใหญ่ให้เล่า',choices:[
  c('CHG_FAMILY_STAY','สัญญาว่าจะกลับมาในวันธรรมดาด้วย','S27_EPILOGUE','talk',{flags:['chapter1_home_promise'],trust:'MAREN',cinematic:shot('maren_listen_seat','talk','leaf')}),
  c('CHG_FAMILY_COPY','ขออนุญาตแบ่งทำนองให้เพื่อนบ้านเรียน','S27_EPILOGUE','pick',{flags:['chapter1_home_shared'],trust:'LUMI',cinematic:shot('maren_front','interact','song')}),
 ]},
 {id:'G_AFTER_COMMUNITY',title:'เพลงที่มีทางเข้าอีกหลายทาง',stage:'village',npc:'pip',staging:{location:'village_center',anchor:'market_entrance'},text:'พิพคาบป้ายเชิญมาผิดด้านจนทุกคนต้องช่วยกันกลับหัว ไอราถามว่าจะชวนผู้คนที่ยังมาไม่ถึงวงนี้อย่างไร การคืนเพลงครั้งนี้ไม่ได้จบที่คืนฉลอง',choices:[
  c('CHG_COMMUNITY_PATH','ทำป้ายทางเข้าวงให้คนเดินช้า','S27_EPILOGUE','pick',{flags:['chapter1_accessible_circle'],trust:'PIP',cinematic:shot('market_entrance','interact','lantern')}),
  c('CHG_COMMUNITY_TEACH','ให้แต่ละครอบครัวผลัดกันสอนท่อนใหม่','S27_EPILOGUE','talk',{flags:['chapter1_shared_teachers'],trust:'MAREN',cinematic:shot('fountain_front','talk','song')}),
 ]},
 {id:'G_AFTER_ARCHIVE',title:'สิ่งที่ยังไม่เขียนให้เป็นความจริง',stage:'archive',npc:'eira-v3',text:'รอยหอคอยอาจหมายถึงเมือง สถานีเฝ้าดู หรือเพียงชื่อเพลงเก่า ไอราทำกรอบว่า “ยังไม่ยืนยัน” แทนการเติมเรื่องให้สมบูรณ์ เธอถามว่าคุณอยากฝากคำถามไหนให้คนรุ่นต่อไป',choices:[
  c('CHG_ARCHIVE_QUESTION','ฝากคำถามว่าผู้สร้างผนึกเคยสูญเสียอะไร','S27_EPILOGUE','pick',{flags:['chapter1_origin_question'],trust:'EIRA'}),
  c('CHG_ARCHIVE_LESSON','เปิดบทเรียนให้คนอื่นตรวจสำเนาร่วมกัน','S27_EPILOGUE','talk',{flags:['chapter1_open_lessons'],trust:'KORO'}),
 ]},
 {id:'S27_EPILOGUE',title:'โลกยังจดจำ',stage:'village',npc:'lumi',entryFlags:['chapter1_complete','village_changed'],staging:{location:'village_center',anchor:'fountain_front'},text:'เสียงน้ำพุยังดังเท่าเดิม แต่คราวนี้มีคนฟังอยู่รอบมัน บทแรกของการเดินทางจบลงแล้ว ความทรงจำ วิธีแก้ปัญหา และบทเรียนที่คุณเลือกยังอยู่ครบ หมู่บ้านเปิดให้กลับไปช่วยผู้คน ทดลองเวท และเรียนอีกสายได้ ถนนป่ามีเสียงตอบจากรากไม้ให้เริ่มสำรวจต่อได้ ส่วนเรื่องราวโลกที่ไกลกว่านั้นยังอยู่ระหว่างพัฒนา',choices:[
  c('CH2701','กลับไปใช้ชีวิตในหมู่บ้านหลังจบบท','S02_HUB','walk',{flags:['guardian_chapter_reward'],onceFlag:'guardian_chapter_reward',items:{FORM_RAY:1,MOD_AMPLIFY:1},cinematic:shot('village_road')}),
  c('CH2702','กลับไปใต้ต้นไม้และคิดถึงสิ่งที่เลือก','S02_TREE','walk',{flags:['guardian_chapter_reward'],onceFlag:'guardian_chapter_reward',items:{FORM_RAY:1,MOD_AMPLIFY:1},cinematic:shot('tree_path','talk','leaf')}),
 ]},
];
