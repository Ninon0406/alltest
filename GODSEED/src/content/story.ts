import type {Condition} from '../engine/conditions';
import type {EncounterId} from './encounters';
import type {Core} from '../systems/spells';
import {lifeScenes} from './life-story.ts';
import {echoScenes} from './echo-story.ts';
import type {StageId} from '../scenes/stage-layout';
export type StoryLocation='village_center'|'under_tree'|'elder_garden'|'spell_workshop'|'ancient_shrine'|'battle_glade';
export type Choice={id:string;label:string;next:string;cue:'walk'|'talk'|'pick'|'cast'|'rest';flags?:string[];clearFlags?:string[];items?:Record<string,number>;trust?:string;trustAmount?:number;requires?:string;when?:Condition[];lockedHint?:string;daily?:boolean;onceFlag?:string;group?:'other';spellCore?:Core;target?:'scene';route?:'craft';battle?:EncounterId;time?:'evening'|'next-morning';cinematic?:{anchor:string;effectTarget?:string;pose?:'interact'|'talk'|'pick_up'|'cast'|'rest'|'water';effect?:'lantern'|'song'|'leaf'}};
export type StoryScene={id:string;title:string;stage:StageId;npc:string;text:string;entryFlags?:string[];staging?:{location?:StoryLocation;anchor:string};choices:Choice[]};
const c=(id:string,label:string,next:string,cue:Choice['cue']='talk',extra:Partial<Choice>={}):Choice=>({id,label,next,cue,...extra});
const shot=(anchor:string,pose:NonNullable<Choice['cinematic']>['pose']='talk',effect?:NonNullable<Choice['cinematic']>['effect']):NonNullable<Choice['cinematic']>=>({anchor,pose,...effect?{effect}:{}});
// V6 expands the opening without claiming the still-unbuilt guardian endings.
// Sub-beat IDs are namespaced; canonical S21–S29 remain available to later work.
const openingScenes:StoryScene[]=[
 {id:'S18_FESTIVAL_PREP',title:'งานฉลองที่ยังไม่มีเพลง',stage:'village',npc:'lumi',entryFlags:['festival_ready'],staging:{location:'village_center',anchor:'fountain_front'},
  text:'ลูมิผูกริบบิ้นเส้นสุดท้ายไว้ข้างน้ำพุ แต่ยังไม่มีใครกล้าเริ่มร้อง “เราไม่ต้องจำทั้งเพลงในคืนนี้ก็ได้ใช่ไหม?” คุโรต้องการมือช่วยซ่อมกล่อง ไอรารอเรียงโน้ต และโคมไฟยังมืดอยู่ คุณเลือกเตรียมแต่ละอย่างตามจังหวะของตัวเองได้',choices:[
   c('CH1801','ช่วยลูมิซ่อมกล่องดนตรีที่โรงช่าง','V6_A1_MUSICBOX','walk',{cinematic:shot('market_entrance','interact')}),
   c('CH1802','ช่วยไอราเรียบเรียงโน้ต','V6_A1_NOTES','walk',{cinematic:shot('village_exit')}),
   c('CH1803','ช่วยคุโรเตรียมแสงสำหรับงาน','V6_A1_WORKSHOP_LIGHT','walk',{cinematic:shot('market_entrance','interact')}),
   c('CH1810','รวมวงเพื่อซ้อมทำนองแรก','V6_A1_CIRCLE','walk',{when:[{kind:'flag',id:'a1_musicbox_ready'},{kind:'flag',id:'a1_notes_ready'},{kind:'flag',id:'a1_lights_ready'}],lockedHint:'ซ่อมกล่อง เรียงโน้ต และเตรียมโคมไฟก่อน ทุกอย่างยังรอคุณได้',cinematic:shot('fountain_front','talk','song')}),
   c('CH1805','แวะช่วยยายเตรียมสวนรับแขก','V6_A1_GARDEN','walk',{group:'other',cinematic:shot('tree_path')}),
   c('CH1806','ฟังจังหวะจากลำธารมาเติมเพลง','V6_A1_STREAM','walk',{group:'other',cinematic:shot('village_exit')}),
   c('CH1807','กลับไปฟังคำตอบจากต้นอ่อน','V6_A1_FOREST','walk',{group:'other',cinematic:shot('village_exit')}),
   c('CH1808','ขอให้ไอราตรวจสำเนารูนด้วยกัน','V6_A1_RUINS_RETURN','walk',{group:'other',requires:'ruins_clue',lockedHint:'ค้นพบจารึกในโบราณสถานก่อน',cinematic:shot('village_exit')}),
   c('CH1809','ชวนเพื่อนบ้านมาร่วมวง','V6_A1_INVITATION','walk',{group:'other',cinematic:shot('market_entrance')}),
   c('CH1804','กลับไปตรวจสิ่งที่ยังสงสัย','S02_HUB','walk',{group:'other',cinematic:shot('village_road')}),
  ]},
 {id:'V6_A1_MUSICBOX',title:'ฝุ่นในเฟืองเล็ก',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'recipe_front'},
  text:'คุโรเปิดฝากล่องบนโต๊ะสูตร เฟืองชิ้นหนึ่งฝืดเพราะเกสรติดอยู่ ไม่ใช่เพราะเวทเสื่อม “ก่อนใช้พลัง ลองดูว่าสิ่งเล็ก ๆ กำลังติดขัดตรงไหน” ลูมิยื่นผ้านุ่มให้และขอเป็นคนหมุนกุญแจเอง',choices:[
   c('CHV6_BOX_LOOK','ก้มดูรอยเฟืองกับคุโรก่อน','V6_A1_GEARS','pick',{flags:['a1_gears_observed'],cinematic:shot('recipe_front','interact')}),
   c('CHV6_BOX_ASK','ฟังลูมิเล่าว่ากล่องหยุดตรงเสียงใด','V6_A1_GEARS','talk',{flags:['a1_lumi_heard'],trust:'LUMI',cinematic:shot('recipe_front')}),
   c('CHV6_BOX_BACK','พักงานซ่อมไว้แล้วกลับลาน','S18_FESTIVAL_PREP','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'V6_A1_GEARS',title:'ให้มือเล็กได้ลองอีกครั้ง',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'recipe_front'},
  text:'ใต้เกสรมีร่องเฟืองที่ยังสมบูรณ์ คุณไม่จำเป็นต้องซ่อมแทนลูมิทั้งหมด คุโรวางลูกแก้วสำรองไว้เป็นของขอบคุณสำหรับคนที่ช่วยดูแลของชิ้นเล็ก ๆ อย่างตั้งใจ',choices:[
   c('CHV6_BOX_HAND','ประคองกล่องให้ลูมิเช็ดเฟืองเอง','S18_FESTIVAL_PREP','pick',{flags:['a1_musicbox_ready','a1_box_handmade'],clearFlags:['a1_box_wind_tuned'],onceFlag:'a1_musicbox_ready',items:{FORM_ORB:1},trust:'LUMI',cinematic:shot('recipe_front','interact','song')}),
   c('CHV6_BOX_WIND','ใช้เวทลมเบา ๆ พาเกสรออกจากเฟือง','S18_FESTIVAL_PREP','cast',{when:[{kind:'knownCore',core:'WIND'}],lockedHint:'ค้นพบเวทธาตุลมก่อน หรือใช้ผ้านุ่มช่วยลูมิได้เสมอ',spellCore:'WIND',target:'scene',flags:['a1_musicbox_ready','a1_box_wind_tuned'],clearFlags:['a1_box_handmade'],onceFlag:'a1_musicbox_ready',items:{FORM_ORB:1},trust:'KORO',cinematic:shot('recipe_front','cast','song')}),
  ]},
 {id:'V6_A1_NOTES',title:'โน้ตที่ไม่มีเจ้าของคนเดียว',stage:'archive',npc:'eira-v3',
  text:'ไอราแยกสมุดออกเป็นสองกอง กองแรกเป็นสิ่งที่ผู้คนจำได้ อีกกองเป็นสิ่งที่ยังสงสัย “ถ้าเขียนคำเดาเหมือนความจริง คนที่มาต่อจากเราจะหลงทาง” คุณช่วยเลือกว่าจะเริ่มจากเสียงหรือรอยหมึก',choices:[
   c('CHV6_NOTES_MARK','เทียบบันทึกหอสมุดกับจังหวะที่พบ','V6_A1_MARGIN','pick',{requires:'archive_read',lockedHint:'อ่านบันทึกของไอราก่อน',flags:['a1_notes_checked']}),
   c('CHV6_NOTES_LISTEN','เคาะจังหวะสั้น ๆ ให้ไอราจดตาม','V6_A1_MARGIN','talk',{flags:['a1_notes_performed'],trust:'EIRA'}),
   c('CHV6_NOTES_BACK','เก็บสมุดไว้ก่อนแล้วกลับลาน','S18_FESTIVAL_PREP','walk'),
  ]},
 {id:'V6_A1_MARGIN',title:'ช่องว่างข้างบรรทัด',stage:'archive',npc:'eira-v3',
  text:'สองท่อนตรงกัน แต่ปลายเพลงยังเว้นว่าง ไอราไม่เติมมันด้วยคำตอบสำเร็จรูป เธอให้เส้นใยดาราเส้นหนึ่งสำหรับการทดลองครั้งถัดไป และขอให้คุณเลือกว่าจะรักษาความไม่รู้นี้ไว้อย่างไร',choices:[
   c('CHV6_NOTES_COPY','เขียนกำกับว่ายังไม่พบท่อนสุดท้าย','S18_FESTIVAL_PREP','pick',{flags:['a1_notes_ready','a1_honest_record'],onceFlag:'a1_notes_ready',items:{FORM_RAY:1},trust:'EIRA'}),
   c('CHV6_NOTES_ECHO','ใช้เวทเสียงสะท้อนเทียบความยาวสองท่อน','S18_FESTIVAL_PREP','cast',{when:[{kind:'knownCore',core:'ECHO'}],lockedHint:'ค้นพบเวทเสียงสะท้อนก่อน หรือเขียนกำกับสิ่งที่ยังไม่รู้ได้',spellCore:'ECHO',target:'scene',flags:['a1_notes_ready','a1_echo_compared'],onceFlag:'a1_notes_ready',items:{FORM_RAY:1},trust:'EIRA'}),
  ]},
 {id:'V6_A1_GARDEN',title:'ที่ว่างสำหรับคนมาเยือน',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'maren_front'},
  text:'มาเรนกำลังหามุมให้คนที่ไม่ชอบเสียงดังนั่งพัก ดอกไม้ไม่จำเป็นต้องอยู่หน้าเวทีทุกดอก บางดอกมีหน้าที่ทำให้ใครสักคนรู้ว่ายังมีที่ให้กลับมานั่งเงียบ ๆ',choices:[
   c('CHV6_GARDEN_KNOWN','ถามถึงดอกที่เคยช่วยรดน้ำ','V6_A1_SEEDBEDS','talk',{requires:'garden_tended',lockedHint:'ช่วยรดน้ำสวนมาเรนก่อนจึงจะจำแปลงนี้ร่วมกันได้',flags:['a1_garden_recalled'],trust:'MAREN',cinematic:shot('herb_bed_front')}),
   c('CHV6_GARDEN_HELP','เดินดูแปลงกับยายว่าควรเว้นทางตรงไหน','V6_A1_SEEDBEDS','walk',{flags:['a1_garden_room'],cinematic:shot('herb_bed_front','interact')}),
   c('CHV6_GARDEN_BACK','กลับไปช่วยเตรียมงานก่อน','S18_FESTIVAL_PREP','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'V6_A1_SEEDBEDS',title:'ดอกไม้ที่ไม่ต้องเร่งบาน',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'herb_bed_front'},
  text:'คุณพบต้นที่แข็งแรงพอแบ่งเมล็ดได้ มาเรนขอไม่ให้เร่งดอกที่ยังอ่อน “คืนนี้เราแค่ดูแลให้มันมีวันพรุ่งนี้” เธอฝากเมล็ดและห่วงใบไม้เงินสำหรับทดลองเวทเยียวยา',choices:[
   c('CHV6_GARDEN_HAND','จัดดินและย้ายใบไม้ที่บังทางน้ำ','S18_FESTIVAL_PREP','pick',{flags:['a1_garden_helped','a1_garden_by_hand'],onceFlag:'a1_garden_helped',items:{CORE_BLOOM:1,FORM_RING:1},trust:'MAREN',cinematic:shot('herb_bed_front','interact','leaf')}),
   c('CHV6_GARDEN_WATER','ใช้เวทน้ำรินลงดินโดยไม่เร่งดอก','S18_FESTIVAL_PREP','cast',{when:[{kind:'knownCore',core:'WATER'}],lockedHint:'ค้นพบเวทธาตุน้ำก่อน หรือจัดดินด้วยมือได้',spellCore:'WATER',target:'scene',flags:['a1_garden_helped','a1_garden_watered'],onceFlag:'a1_garden_helped',items:{CORE_BLOOM:1,FORM_RING:1},trust:'MAREN',cinematic:shot('herb_bed_front','cast','leaf')}),
  ]},
 {id:'V6_A1_STREAM',title:'จังหวะที่ไม่ขึ้นเวที',stage:'stream',npc:'pip',
  text:'พิพหยุดจามทันทีที่ได้ยินน้ำตกกระทบหิน เสียงสั้นยาวไม่เท่ากันเหมือนลมหายใจของคนกำลังตื่นเต้น คุณมาที่นี่เพื่อฟัง ไม่ได้ต้องนำทุกอย่างกลับไปเป็นของตัวเอง',choices:[
   c('CHV6_STREAM_CLEAR','ฟังปลาตัวเล็กในน้ำที่เคยช่วยให้ใส','V6_A1_BELL','talk',{requires:'stream_clean',lockedHint:'ช่วยฟื้นสภาพลำธารก่อนจึงจะเห็นปลากลับมา',flags:['a1_clear_stream_heard']}),
   c('CHV6_STREAM_RHYTHM','นับจังหวะน้ำกับพิพทีละช่วง','V6_A1_BELL','talk',{flags:['a1_water_rhythm'],trust:'PIP'}),
   c('CHV6_STREAM_BACK','กลับไปเตรียมงานที่หมู่บ้าน','S18_FESTIVAL_PREP','walk'),
  ]},
 {id:'V6_A1_BELL',title:'เว้นที่ให้เสียงน้ำ',stage:'stream',npc:'pip',
  text:'ใต้เสียงกระดิ่งมีจังหวะเงียบที่คุณเคยมองข้าม ถ้าเพลงต้องดังตลอด คนตัวเล็กอย่างพิพคงไม่มีช่องร้องแทรก น้ำหยกกับน้ำค้างที่เก็บได้จะช่วยให้คุณลองสร้างเวทเยียวยาจริงหลังกลับไป',choices:[
   c('CHV6_BELL_KEEP','จดช่วงเงียบแล้วเก็บน้ำหยกที่ริมทาง','S18_FESTIVAL_PREP','pick',{flags:['a1_stream_recorded','a1_silence_kept'],onceFlag:'a1_stream_recorded',items:{CORE_WATER:1,MOD_HEAL:1}}),
   c('CHV6_BELL_SHARE','ฮัมจังหวะให้พิพตอบแล้วเก็บน้ำค้าง','S18_FESTIVAL_PREP','talk',{flags:['a1_stream_recorded','a1_pip_rhythm'],onceFlag:'a1_stream_recorded',items:{CORE_WATER:1,MOD_HEAL:1},trust:'PIP'}),
  ]},
 {id:'V6_A1_FOREST',title:'ผู้เฝ้าสวนที่สูงแค่เข่า',stage:'forest',npc:'sprout',
  text:'ต้นอ่อนเอนตัวตามเพลงที่พิพฮัม แต่ยังปิดทางไปยังรังเล็ก ๆ คุณไม่จำเป็นต้องชนะมันเพื่อเป็นแขกที่ดีของป่า คราวนี้คำถามคือจะทำอย่างไรให้ทั้งเพลงและรังยังอยู่ด้วยกัน',choices:[
   c('CHV6_FOREST_REMEMBER','แสดงลายโน้ตที่เคยจดโดยไม่แตะรัง','V6_A1_FOREST_ECHO','talk',{requires:'forest_clue',lockedHint:'ค้นพบลายโน้ตในป่าก่อน',flags:['a1_forest_recalled']}),
   c('CHV6_FOREST_WAIT','หยุดรอให้เจ้าของรังเดินผ่านก่อน','V6_A1_FOREST_ECHO','rest',{flags:['a1_forest_waited'],trust:'PIP'}),
   c('CHV6_FOREST_BACK','กลับหมู่บ้านโดยไม่รบกวนรัง','S18_FESTIVAL_PREP','walk'),
  ]},
 {id:'V6_A1_FOREST_ECHO',title:'คำตอบจากใบไม้',stage:'forest',npc:'pip',
  text:'ต้นอ่อนหลีกทางให้ขนนกกับละอองเมฆที่ปลิวอยู่บนทางเก่า มันไม่ได้มอบป่าทั้งผืนให้คุณ แต่ยอมให้คุณนำคำตอบเล็ก ๆ กลับไปเล่า ถ้าลมเบาพอ ใบไม้จะตอบโดยไม่ต้องฉีกกิ่ง',choices:[
   c('CHV6_FOREST_FALLEN','เก็บเฉพาะขนนกและละอองที่ตกอยู่','S18_FESTIVAL_PREP','pick',{flags:['a1_forest_recorded','a1_forest_respected'],onceFlag:'a1_forest_recorded',items:{CORE_WIND:1,FORM_RAIN:1}}),
   c('CHV6_FOREST_WIND','ใช้เวทลมรับจังหวะใบไม้เบา ๆ','S18_FESTIVAL_PREP','cast',{when:[{kind:'knownCore',core:'WIND'}],lockedHint:'ค้นพบเวทธาตุลมก่อน หรือเก็บของที่ตกอยู่ได้',spellCore:'WIND',target:'scene',flags:['a1_forest_recorded','a1_forest_answered'],onceFlag:'a1_forest_recorded',items:{CORE_WIND:1,FORM_RAIN:1},trust:'PIP'}),
  ]},
 {id:'V6_A1_RUINS_RETURN',title:'สำเนาที่กลับมาหาต้นฉบับ',stage:'ruins',npc:'eira-v3',staging:{location:'ancient_shrine',anchor:'rune_front'},
  text:'รูนเดิมยังอยู่ตรงที่คุณเคยพบ แต่ครั้งนี้ไอรามีคนช่วยเทียบสำเนา เสียงจากกล่องเพลงไม่ได้แปลว่าคุณเข้าใจคำจารึกทั้งหมด เธอชวนตรวจทีละรอยก่อนนำความรู้ไปสอนผู้อื่น',choices:[
   c('CHV6_RUIN_TRACE','เทียบรอยขาดของรูนกับสำเนา','V6_A1_RUNE_COPY','pick',{flags:['a1_rune_compared'],cinematic:shot('rune_front','interact','song')}),
   c('CHV6_RUIN_LISTEN','ฟังจังหวะจารึกก่อนเปิดสมุด','V6_A1_RUNE_COPY','talk',{flags:['a1_rune_listened'],cinematic:shot('tablet_front','talk','song')}),
   c('CHV6_RUIN_BACK','เก็บสมุดแล้วกลับลานหมู่บ้าน','S18_FESTIVAL_PREP','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'V6_A1_RUNE_COPY',title:'ผู้มาหลังเราจะอ่านอะไร',stage:'ruins',npc:'eira-v3',staging:{location:'ancient_shrine',anchor:'tablet_front'},
  text:'บางขีดอาจเป็นตัวอักษร บางขีดเป็นรอยซ่อมจากคนที่ไม่เคยทิ้งชื่อไว้ ไอราแบ่งทรายเวลาอ่อนให้คุณหนึ่งหยิบมือ “การส่งต่อความรู้เริ่มจากบอกให้ชัดว่าอะไรที่เรายังไม่แน่ใจ”',choices:[
   c('CHV6_RUNE_COPY','คัดสำเนาและทำเครื่องหมายจุดที่ยังอ่านไม่ออก','S18_FESTIVAL_PREP','pick',{flags:['a1_rune_copy','a1_rune_cautious'],onceFlag:'a1_rune_copy',items:{MOD_LINGER:1},trust:'EIRA',cinematic:shot('tablet_front','interact','song')}),
   c('CHV6_RUNE_ECHO','เทียบเสียงสะท้อนแล้วบันทึกส่วนที่ตรวจได้','S18_FESTIVAL_PREP','cast',{when:[{kind:'knownCore',core:'ECHO'}],lockedHint:'ค้นพบเวทเสียงสะท้อนก่อน หรือคัดสำเนาด้วยมือได้',spellCore:'ECHO',target:'scene',flags:['a1_rune_copy','a1_rune_echo'],onceFlag:'a1_rune_copy',items:{MOD_LINGER:1},trust:'EIRA',cinematic:shot('tablet_front','cast','song')}),
  ]},
 {id:'V6_A1_WORKSHOP_LIGHT',title:'แสงที่ไม่แย่งเสียงเพลง',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'craft_front'},
  text:'คุโรอยากให้โคมสว่างพอเห็นหน้ากัน แต่ไม่จ้าจนมองไม่เห็นดาว เขาวางเกสรอรุณให้ผู้ช่วยเก็บกลับไปทดลอง ไม่ว่าคุณจะใช้เวทแบบใด ความพอดีต่างหากที่ทำให้แสงนี้น่าอยู่',choices:[
   c('CHV6_LIGHT_HAND','จัดแผ่นสะท้อนให้โคมรับแสงอุ่น','V6_A1_LIGHT_RESULT','pick',{flags:['a1_lights_ready','a1_light_reflected'],clearFlags:['a1_light_fire','a1_light_wind'],onceFlag:'a1_lights_ready',items:{CORE_LIGHT:1},trust:'KORO',cinematic:shot('craft_front','interact','lantern')}),
   c('CHV6_LIGHT_FIRE','ใช้เวทไฟจุดโคมจากระยะปลอดภัย','V6_A1_LIGHT_RESULT','cast',{when:[{kind:'knownCore',core:'FIRE'}],lockedHint:'ค้นพบเวทไฟก่อน หรือจัดแผ่นสะท้อนด้วยมือได้',spellCore:'FIRE',target:'scene',flags:['a1_lights_ready','a1_light_fire'],clearFlags:['a1_light_reflected','a1_light_wind'],onceFlag:'a1_lights_ready',items:{CORE_LIGHT:1},trust:'KORO',cinematic:shot('craft_front','cast','lantern')}),
   c('CHV6_LIGHT_WIND','ใช้เวทลมหมุนแผ่นสะท้อนอย่างช้า ๆ','V6_A1_LIGHT_RESULT','cast',{when:[{kind:'knownCore',core:'WIND'}],lockedHint:'ค้นพบเวทลมก่อน หรือจัดแผ่นสะท้อนด้วยมือได้',spellCore:'WIND',target:'scene',flags:['a1_lights_ready','a1_light_wind'],clearFlags:['a1_light_reflected','a1_light_fire'],onceFlag:'a1_lights_ready',items:{CORE_LIGHT:1},trust:'KORO',cinematic:shot('craft_front','cast','lantern')}),
   c('CHV6_LIGHT_BACK','กลับไปช่วยงานอื่นก่อน','S18_FESTIVAL_PREP','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'V6_A1_LIGHT_RESULT',title:'คนถือโคมคนถัดไป',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'tutor_front'},
  text:'คุโรทดลองหมุนโคมครั้งสุดท้าย แสงไม่ดับแม้เขาปล่อยมือ “ของที่ดีควรใช้ต่อได้ในวันที่คนสร้างไม่อยู่เฝ้า” คุณเลือกได้ว่าจะเก็บขั้นตอนเป็นบันทึกหรือชวนลูมิลองทำเอง',choices:[
   c('CHV6_LIGHT_RECORD','จดวิธีเตรียมโคมไว้ให้คนมาทีหลัง','S18_FESTIVAL_PREP','pick',{flags:['a1_light_instructions'],cinematic:shot('recipe_front','interact')}),
   c('CHV6_LIGHT_TEACH','ให้ลูมิเป็นคนทดสอบโคมด้วยตัวเอง','S18_FESTIVAL_PREP','talk',{flags:['a1_lumi_confident'],trust:'LUMI',cinematic:shot('tutor_front','talk','lantern')}),
  ]},
 {id:'V6_A1_INVITATION',title:'ใครจะอยู่ในวงคืนนี้',stage:'village',npc:'lumi',staging:{location:'village_center',anchor:'market_entrance'},
  text:'ลูมิมองรายชื่อบนกระดาษ ไม่มีที่นั่งพิเศษสำหรับคนที่เก่งเวทที่สุด เธอเว้นแถวหนึ่งให้คนที่มาช้าและคนที่อยากนั่งฟังเฉย ๆ “ถ้าเรียกชื่อเขา เขาจะรู้ไหมว่าเรารออยู่?”',choices:[
   c('CHV6_INVITE_MAREN','ชวนยายมาเรนและเว้นที่เงียบไว้ข้างวง','S18_FESTIVAL_PREP','talk',{flags:['a1_maren_invited'],trust:'MAREN',cinematic:shot('bench_approach','talk','leaf')}),
   c('CHV6_INVITE_EIRA','ชวนไอรานำสมุดมาฟังเพลงด้วยกัน','S18_FESTIVAL_PREP','talk',{requires:'archive_read',lockedHint:'รู้จักบันทึกของไอราก่อน',flags:['a1_eira_invited'],trust:'EIRA',cinematic:shot('market_entrance')}),
   c('CHV6_INVITE_PIP','ให้พิพเลือกที่นั่งและทักแขกใหม่','S18_FESTIVAL_PREP','talk',{flags:['a1_pip_invited'],trust:'PIP',cinematic:shot('fountain_front')}),
  ]},
 {id:'V6_A1_CIRCLE',title:'คำสัญญาก่อนเสียงแรก',stage:'village',npc:'lumi',staging:{location:'village_center',anchor:'fountain_front'},
  text:'กล่องหมุนได้ โน้ตอ่านได้ และแสงอุ่นอยู่ในระดับสายตา ลูมิถามคำถามที่ไม่มีอยู่ในตำรา “ถ้าเพลงดังขึ้นแล้ว คุณอยากทำอะไรกับสิ่งที่ได้เรียนรู้?” นี่เป็นคำตั้งใจสำหรับคืนนี้ ไม่ใช่การเลือกอาชีพที่ผูกมัดคุณตลอดชีวิต',choices:[
   c('CHV6_VOW_SHARE','อยากให้คนที่ไม่กล้าร้องมีเสียงของตัวเอง','V6_A1_REHEARSAL','talk',{flags:['a1_vow_share'],clearFlags:['a1_vow_care','a1_vow_learn'],cinematic:shot('fountain_front','talk','song')}),
   c('CHV6_VOW_CARE','อยากให้สิ่งเล็ก ๆ ในหมู่บ้านยังเติบโตได้','V6_A1_REHEARSAL','talk',{flags:['a1_vow_care'],clearFlags:['a1_vow_share','a1_vow_learn'],cinematic:shot('fountain_front','talk','leaf')}),
   c('CHV6_VOW_LEARN','อยากส่งต่อสิ่งที่รู้โดยไม่ซ่อนสิ่งที่ยังสงสัย','V6_A1_REHEARSAL','talk',{flags:['a1_vow_learn'],clearFlags:['a1_vow_share','a1_vow_care'],cinematic:shot('fountain_front','talk','song')}),
  ]},
 {id:'V6_A1_REHEARSAL',title:'ผิดจังหวะด้วยกันได้',stage:'village',npc:'pip',staging:{location:'village_center',anchor:'fountain_front'},
  text:'พิพร้องเข้าเร็วไปหนึ่งจังหวะ ลูมิหัวเราะจนต้องเริ่มใหม่ ไม่มีใครเดินหนี เพลงยังไม่สมบูรณ์ แต่คราวนี้ความผิดพลาดไม่ได้ทำให้ใครต้องหยุดร้องคนเดียว',choices:[
   c('CHV6_REHEARSE_SLOW','เริ่มช้า ๆ แล้วให้ทุกคนค่อยเข้าจังหวะ','S19_FESTIVAL','talk',{flags:['a1_rehearsed','a1_patient_rehearsal'],trust:'PIP',cinematic:shot('fountain_front','talk','song')}),
   c('CHV6_REHEARSE_REST','พักหายใจด้วยกันก่อนเริ่มเพลง','S19_FESTIVAL','rest',{flags:['a1_rehearsed','a1_restful_rehearsal'],cinematic:shot('bench_seat','rest','song')}),
  ]},
 {id:'S19_FESTIVAL',title:'เพลงที่ขาดท่อนสุดท้าย',stage:'village',npc:'lumi',staging:{location:'village_center',anchor:'fountain_front'},
  text:'โคมสว่างขึ้นพร้อมเสียงแรกจากกล่อง ลูมิร้องต่อได้สองท่อนแล้วหยุดตรงช่องว่างเดิม แต่แทนที่จะปิดฝากล่อง เธอกลับยิ้ม “ยังมีส่วนที่หายไป แต่ตอนนี้หนูรู้แล้วว่าต้องไปถามใคร” ประกายรูนลอยไปทางศาลเจ้า',choices:[
   c('CH1901','ตามประกายไปดูผนึกแล้วกลับมาเล่าให้วงฟัง','S20_SEAL_PASSAGE','walk',{flags:['seal_gate_found'],cinematic:shot('village_exit','interact','song')}),
   c('CH1902','ปรึกษาไอราและจดทางไปผนึกไว้สำหรับวันหน้า','V6_A1_FIRST_SONG','talk',{flags:['seal_gate_found','a1_mystery_recorded'],trust:'EIRA',cinematic:shot('market_entrance','talk','song')}),
   c('CH1903','บอกลูมิว่าท่อนที่ร้องได้คืนนี้มีความหมายแล้ว','V6_A1_FIRST_SONG','talk',{flags:['seal_gate_found','a1_lumi_reassured'],trust:'LUMI',cinematic:shot('fountain_front','talk','song')}),
  ]},
 {id:'S20_SEAL_PASSAGE',title:'ทางผ่านที่ยังไม่ต้องรีบก้าว',stage:'ruins',npc:'eira-v3',staging:{location:'ancient_shrine',anchor:'circle_front'},
  text:'ประกายจากเพลงตอบกับรูนบนผนึก เสียงที่หายไปยังอยู่ลึกกว่าเส้นทางที่คุณรู้จัก ไอราไม่เร่งให้ทุกคนเข้าไปทั้งที่งานในหมู่บ้านยังรอ “เราจดไว้แล้วกลับมาด้วยความพร้อมได้ ความกล้าไม่จำเป็นต้องรีบร้อน”',choices:[
   c('CH2001','ฟังเสียงที่ลอดผนึกแล้วกลับไปบอกทุกคน','V6_A1_FIRST_SONG','talk',{flags:['a1_seal_heard'],cinematic:shot('tablet_front','talk','song')}),
   c('CH2002','ตรวจเศษแร่ม่านค่ำที่หลุดจากช่องผนึก','V6_A1_FIRST_SONG','pick',{flags:['a1_seal_sample'],onceFlag:'a1_seal_sample',items:{CORE_SHADOW:1},cinematic:shot('crystal_front','interact','song')}),
   c('CH2003','กลับไปเตรียมเวทและของที่หมู่บ้าน','S02_HUB','walk',{cinematic:shot('exit_path')}),
  ]},
 {id:'V6_A1_FIRST_SONG',title:'จะเก็บคืนแรกไว้อย่างไร',stage:'village',npc:'lumi',staging:{location:'village_center',anchor:'fountain_front'},
  text:'ท่อนสุดท้ายยังเป็นคำถาม แต่ท่อนแรกไม่เงียบอีกแล้ว ลูมิหมุนกุญแจช้าลงเพื่อให้ทุกคนเลือกว่าจะอยู่กับบทเพลงนี้อย่างไร สิ่งที่คุณเคยทำและคนที่คุณชวนมาทำให้คืนนี้มีทางมากกว่าหนึ่งทาง',choices:[
   c('CHV6_CLOSE_SHARE','ร้องท่อนแรกให้คนทั้งวงช่วยเติมจังหวะ','V6_A1_CLOSE_CIRCLE','talk',{flags:['a1_resolution_shared'],clearFlags:['a1_resolution_care','a1_resolution_knowledge'],trust:'LUMI',cinematic:shot('fountain_front','talk','song')}),
   c('CHV6_CLOSE_CARE','พาเพลงไปนั่งฟังกับยายที่สวน','V6_A1_CLOSE_GARDEN','walk',{requires:'a1_maren_invited',when:[{kind:'anyFlag',ids:['maren_listened','garden_tended','a1_garden_helped']}],lockedHint:'ชวนยายมาเรนและใช้เวลาฟังหรือดูแลสวนกับเธอก่อน',flags:['a1_resolution_care'],clearFlags:['a1_resolution_shared','a1_resolution_knowledge'],trust:'MAREN',cinematic:shot('tree_path','talk','leaf')}),
   c('CHV6_CLOSE_KNOWLEDGE','นำสำเนาเพลงไปวางคู่จารึกในหอสมุด','V6_A1_CLOSE_ARCHIVE','walk',{when:[{kind:'anyFlag',ids:['archive_notes_complete','a1_rune_copy']}],lockedHint:'ส่งสำเนาจารึกให้ไอราหรือช่วยเทียบรูนระหว่างเตรียมงานก่อน',flags:['a1_resolution_knowledge'],clearFlags:['a1_resolution_shared','a1_resolution_care'],trust:'EIRA',cinematic:shot('village_exit','talk','song')}),
  ]},
 {id:'V6_A1_CLOSE_CIRCLE',title:'เสียงของคนที่เพิ่งกล้าร้อง',stage:'village',npc:'lumi',staging:{location:'village_center',anchor:'fountain_front'},
  text:'มีคนร้องไม่ตรงโน้ต มีคนเคาะจังหวะด้วยตะกร้า พิพแทรกเสียงสั้นจนลูมิต้องหัวเราะ ท่อนที่ขาดยังไม่ถูกแทนด้วยคำตอบมั่ว ๆ แต่ช่องว่างระหว่างคนในวงกลับแคบลง',choices:[
   c('CHV6_SHARED_REMEMBER','จดจำว่าใครเริ่มร้องเป็นคนแรก','V6_A1_MORNING','talk',{flags:['a1_names_remembered'],cinematic:shot('fountain_front','talk','song')}),
   c('CHV6_SHARED_REST','นั่งฟังคนที่เหลือร้องต่อจนจบคืน','V6_A1_MORNING','rest',{flags:['a1_shared_silence'],cinematic:shot('bench_seat','rest','song')}),
  ]},
 {id:'V6_A1_CLOSE_GARDEN',title:'เพลงที่ดังพอสำหรับม้านั่งหนึ่งตัว',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'maren_front'},
  text:'มาเรนร้องได้เพียงบางคำ ลูมิไม่รีบเติมคำที่หายไปให้เธอ สวนมีที่ว่างให้ทั้งเสียงและช่วงเงียบ “ขอบใจที่ไม่ทำให้ยายต้องจำทุกอย่างในคืนเดียว” เธอขยับที่บนม้านั่งให้คุณ',choices:[
   c('CHV6_CARE_STAY','นั่งอยู่ด้วยโดยไม่ถามหาท่อนที่หายไป','V6_A1_MORNING','rest',{flags:['a1_maren_comforted'],cinematic:shot('maren_listen_seat','rest','leaf')}),
   c('CHV6_CARE_NOTE','จดคำที่ยายเลือกเล่าไว้ให้ลูมิ','V6_A1_MORNING','pick',{flags:['a1_family_note'],cinematic:shot('maren_front','interact','song')}),
  ]},
 {id:'V6_A1_CLOSE_ARCHIVE',title:'หน้าที่เว้นไว้ให้คนอ่าน',stage:'archive',npc:'eira-v3',
  text:'ไอราวางบันทึกของคุณไว้ใกล้สำเนาจารึก ไม่ใช่ในชั้นคำตอบสมบูรณ์ “คนที่มาทีหลังอาจได้ยินสิ่งที่เราไม่ได้ยิน” ลูมิวาดกล่องดนตรีเล็ก ๆ ตรงมุมกระดาษเพื่อให้จำได้ว่าเรื่องเริ่มจากใคร',choices:[
   c('CHV6_KNOWLEDGE_SHARE','ทำสำเนาสำหรับคนที่อยากลองต่อ','V6_A1_MORNING','pick',{flags:['a1_public_copy']}),
   c('CHV6_KNOWLEDGE_QUESTION','เขียนคำถามที่อยากพาไปสำรวจครั้งหน้า','V6_A1_MORNING','talk',{flags:['a1_next_question']}),
  ]},
 {id:'V6_A1_MORNING',title:'เช้าที่มีคนรอคำทักทาย',stage:'village',npc:'pip',entryFlags:['a1_first_evening_seen'],staging:{location:'village_center',anchor:'village_road'},
  text:'เช้าวันใหม่ยังมีงานเล็ก ๆ เหมือนเดิม แต่ลูมิทักชื่อคุณก่อนถามถึงเพลง คุโรฝากประกายขยายเสียงไว้ให้การทดลองครั้งหน้า ไอรารอคำถามใหม่ และพิพเผลอหลับข้างริบบิ้น คืนแรกของการเตรียมงานจบลงแล้ว ส่วนผนึกกับท่อนสุดท้ายยังรอการเดินทางถัดไป',choices:[
   c('CHV6_MORNING_FINISH','รับของขอบคุณแล้วกลับไปใช้ชีวิตในหมู่บ้าน','S02_HUB','pick',{flags:['arc1_opening_complete','a1_festival_quest_complete'],onceFlag:'arc1_opening_complete',items:{MOD_AMPLIFY:1,IT_POTION_DEW:1},cinematic:shot('market_entrance','interact','lantern')}),
   c('CHV6_MORNING_LEARN','รับของขอบคุณแล้วนำความรู้ไปทดลองที่โรงช่าง','S04_KORO','walk',{flags:['arc1_opening_complete','a1_festival_quest_complete'],onceFlag:'arc1_opening_complete',items:{MOD_AMPLIFY:1,IT_POTION_DEW:1},cinematic:shot('market_entrance','interact','lantern')}),
  ]},
];
const eveningScenes=new Set(['S19_FESTIVAL','S20_SEAL_PASSAGE','V6_A1_FIRST_SONG','V6_A1_CLOSE_CIRCLE','V6_A1_CLOSE_GARDEN','V6_A1_CLOSE_ARCHIVE']);
// Explicit story timeline overrides travel tick costs at evening/morning cuts.
for(const scene of openingScenes)for(const choice of scene.choices){if(eveningScenes.has(choice.next))choice.time='evening';else if(choice.next==='V6_A1_MORNING')choice.time='next-morning';}
export const openingSceneIds=openingScenes.map(scene=>scene.id);
export const festivalEvening=(scene?:string)=>!!scene&&eveningScenes.has(scene);
const authoredScenes:StoryScene[]=[
{id:'S00_WAKE',title:'ตื่นใต้ต้นเมล็ด',stage:'village',npc:'pip',text:'ลมอุ่นพัดผ่านใบหญ้า ราวกับโลกกำลังสูดหายใจครั้งแรก คุณลืมตาขึ้นใต้ต้นไม้ที่มีเมล็ดแสงลอยอยู่ระหว่างกิ่ง พิพ: “ปิ๊บ...?”',choices:[c('CH0001','ลุกขึ้นสำรวจรอบตัว','S01_FIRST_STEPS','walk',{flags:['intro_observe']}),c('CH0002','ลองฟังเสียงจากเมล็ดแสง','S01_FIRST_STEPS','cast',{flags:['intro_listened']}),c('CH0003','เรียกหาใครสักคน','S01_FIRST_STEPS','talk',{flags:['intro_called'],trust:'PIP'}),c('CH0004','นั่งพักใต้ต้นเมล็ด','S00_WAKE','rest',{flags:['tree_memory'],trust:'PIP'})]},
{id:'S01_FIRST_STEPS',title:'เส้นทางสู่หมู่บ้าน',stage:'village',npc:'pip',text:'ปลายทางเดินมีเสียงฆ้องเบา ๆ จากหมู่บ้านพฤกษารุ่ง พิพชี้ป้ายไม้ข้างทาง',choices:[c('CH0101','เดินตามป้ายไม้ไปที่จัตุรัส','S02_HUB','walk'),c('CH0102','เก็บขนนกสีฟ้าที่ข้างทางก่อน','S02_HUB','pick',{items:{CORE_WIND:1}}),c('CH0103','ยื่นมือให้พิพเดินตาม','S02_HUB','talk',{trust:'PIP'})]},
{id:'S02_HUB',title:'จัตุรัสของเรื่องราว',stage:'village',npc:'lumi',text:'ชาวบ้านเดินผ่านพร้อมถือตะกร้าผลไม้ กลิ่นขนมลอยมากับลม วันนี้คุณจะฝากเรื่องราวอะไรไว้กับหมู่บ้าน?',choices:[c('CHE_HUB','ตามไอราไปสำรวจลานเสียงย้อน','ECHO_CALL','walk',{group:'other',requires:'arc1_opening_complete',lockedHint:'จบงานเพลงคืนแรกและรับของขอบคุณก่อน',cinematic:shot('market_entrance')}),c('CH0201','ไปหาลูมิที่บ่อน้ำ','S03_LUMI','walk'),c('CH0202','ไปโรงช่างของคุโร','S04_KORO','walk'),c('CH0203','แวะสวนดอกไม้ของยายมาเรน','S06_GARDEN','walk'),c('CH0204','เข้าหอสมุดของไอรา','S07_ARCHIVE','walk',{group:'other'}),c('CH0206','สำรวจลำธารสีหยก','S11_STREAM','walk',{group:'other',when:[{kind:'anyFlag',ids:['lumi_met','crafted_first']}],lockedHint:'คุยกับลูมิหรือผสมเวทแรกก่อน'}),c('CHLP_HUB','เลือกแนวทางเติบโตหลังคืนแรก','LP_CROSSROADS','walk',{group:'other',requires:'arc1_opening_complete',lockedHint:'จบงานเพลงคืนแรกและรับของขอบคุณในเช้าวันใหม่ก่อน',cinematic:shot('fountain_front','talk','leaf')}),c('CH0208','ช่วยเตรียมเทศกาลเสียงเพลง','S18_FESTIVAL_PREP','walk',{group:'other',when:[{kind:'flag',id:'lumi_helped'},{kind:'flag',id:'crafted_first'},{kind:'flag',id:'archive_read'},{kind:'anyFlag',ids:['forest_clue','stream_clue','ruins_clue']}],lockedHint:'ช่วยลูมิ ผสมเวทแรก อ่านบันทึกไอรา และหาเบาะแสจากป่า ลำธาร หรือศาลเจ้าอีกหนึ่งแห่งก่อน',cinematic:shot('fountain_front','talk','song')}),c('CH0207','เข้าโบราณสถานเสียงสะท้อน','S15_RUINS','walk',{group:'other',requires:'ruins_open',lockedHint:'จดพิกัดหรือขอคำแนะนำจากไอราในหอสมุดก่อน'}),c('CH0211','แวะใต้ต้นเมล็ด','S02_TREE','walk',{group:'other'}),c('CH0205','เดินทางสู่ชายป่า','S08_FOREST_GATE','walk',{when:[{kind:'anyFlag',ids:['forest_open','crafted_first']}],lockedHint:'คุยกับคุโรหรือผสมเวทแรกก่อน'}),c('CH0209','ดูสมุดเวทและทดลองผสม','S02_HUB','cast',{route:'craft'}),c('CH0210','พักผ่อนที่ม้านั่ง','S02_HUB','rest')]},
{id:'S02_TREE',title:'ความทรงจำใต้ต้นเมล็ด',stage:'village',npc:'pip',text:'ทางหินเล็ก ๆ พาคุณกลับมายังเงากิ่งเดิม จากที่นี่เสียงน้ำพุดูไกลออกไปเล็กน้อย พิพส่งเสียงทักใบไม้ที่ไหวเหนือม้านั่ง',choices:[c('CH02T1','นั่งพักใต้ต้นเมล็ด','S02_TREE','rest',{flags:['tree_memory']}),c('CH02T2','เดินกลับจัตุรัส','S02_HUB','walk')]},
{id:'S03_LUMI',title:'กล่องดนตรีที่เงียบงัน',stage:'village',npc:'lumi',text:'ลูมิเขย่ากล่องดนตรีอย่างระวัง “เมื่อก่อนยายร้องเพลงกับหนูทุกเย็น แต่ตอนนี้ทำนองหายไปแล้ว...”',choices:[c('CH0301','ช่วยดูว่ากล่องดนตรีเสียตรงไหน','S03B_MAREN','pick',{flags:['lumi_helped','musicbox_found'],trust:'LUMI',items:{IT_MUSICBOX:1}}),c('CH0302','ถามถึงเรื่องราวของเพลง','S03B_MAREN','talk',{flags:['story_song_question'],trust:'LUMI'}),c('CH0303','ชวนลูมิหายใจลึก ๆ แล้วค่อยหาวิธี','S03B_MAREN','talk',{flags:['lumi_helped'],trust:'LUMI'})]},
{id:'S03B_MAREN',title:'เสียงที่คุณยายจำได้',stage:'garden',npc:'maren',text:'มาเรนมองกล่องดนตรีแล้วเงียบไป “ทำนองอยู่ตรงปลายลิ้น...แต่เหมือนมีใครพับกระดาษเพลงเก็บไว้”',choices:[c('CH03B1','ฟังคุณยายเล่าเรื่องในอดีต','S02_HUB','talk',{flags:['maren_listened'],trust:'MAREN',items:{CORE_BLOOM:1}}),c('CH03B2','ขอลองนำกล่องดนตรีไปให้ช่างดู','S04_KORO','pick',{flags:['lumi_helped','musicbox_found']}),c('CH03B3','บอกลูมิว่าจะช่วยตามหาทำนอง','S02_HUB','talk',{flags:['lumi_helped'],trust:'LUMI'})]},
{id:'S04_KORO',title:'โรงช่างที่กลิ่นเหล็กกับดอกไม้',stage:'workshop',npc:'koro',text:'คุโรยกแว่นขึ้น “ข้าซ่อมล้อเกวียนได้ แต่ซ่อมความคิดถึงของคน ต้องใช้เวทกับความตั้งใจ”',choices:[c('CH0401','ขอเรียนการผสมเวท','S05_CRAFT_TUTORIAL','talk',{flags:['koro_trained']}),c('CH0402','ช่วยยกกล่องเครื่องมือ','S05_CRAFT_TUTORIAL','pick',{items:{FORM_ORB:1},trust:'KORO',flags:['workshop_help']}),c('CH0403','ถามวิธีซ่อมกล่องดนตรี','S05_CRAFT_TUTORIAL','talk'),c('CH0404','ฝึกต่อสู้กับภูตจำลอง','S04_KORO','cast',{requires:'crafted_first',lockedHint:'ผสมเวทแรกก่อน',battle:'BT_TRAINING'}),c('CH0405','นำเบาะแสจากป่าให้คุโรดู','S05_CRAFT_TUTORIAL','pick',{requires:'forest_clue',lockedHint:'หาเบาะแสจากป่าก่อน',items:{CORE_FIRE:1,FORM_ORB:1,MOD_SPLIT:1},trust:'KORO'})]},
{id:'S05_CRAFT_TUTORIAL',title:'การกำเนิดเวทบทแรก',stage:'workshop',npc:'koro',text:'“แค่เชื่อว่าสองสิ่งเข้ากันได้ยังไม่พอ ต้องรู้ว่าต้องการให้พลังมีรูปแบบอย่างไร” เลือกแก่นธาตุ รูปแบบ และตัวปรับอย่างละหนึ่งชิ้น',choices:[c('CH0501','ทดลองสูตรแรกจากของที่มี','S05_CRAFT_TUTORIAL','cast',{route:'craft'}),c('CH0502','ขอดูตัวอย่างส่วนผสมอีกครั้ง','S05_CRAFT_TUTORIAL','talk',{flags:['tutorial_hint']}),c('CH0503','ออกไปหาของเพิ่มเติมก่อน','S02_HUB','walk')]},
{id:'S06_GARDEN',title:'สวนเมล็ดแห่งความทรงจำ',stage:'garden',npc:'maren',text:'ดอกไม้บางดอกส่งเสียงกรุ๊งกริ๊งแทนกลิ่น มาเรน: “ลองคุยกับต้นไม้ดูสิ บางครั้งมันได้ยินเราดีกว่าคน”',choices:[c('CH0601','ช่วยรดน้ำและเก็บเมล็ด','S02_HUB','pick',{daily:true,flags:['garden_tended'],items:{CORE_BLOOM:1,FORM_RING:1},trust:'MAREN'}),c('CH0602','นั่งฟังเพลงเก่าที่คุณยายจำได้บางส่วน','S02_HUB','talk',{flags:['maren_listened','song_memory_hint']}),c('CH0603','ค้นหาน้ำค้างเยียวยา','S02_HUB','pick',{daily:true,items:{MOD_HEAL:1}})]},
{id:'S07_ARCHIVE',title:'หอสมุดของไอรา',stage:'archive',npc:'eira-v3',text:'ไอราประคองแผนที่เก่าที่มีรูนจางหาย แว่นกลมของเธอสะท้อนแสงดาว “มีคนมาถามเรื่องทำนองที่หายไปอีกแล้วหรือ? หนังสือเก็บเรื่องเล่าได้ แต่หัวใจของเรื่องเล่าต้องมีคนฟัง”',choices:[c('CH0701','ขอดูจารึกเสียงสะท้อน','S14_RESEARCH','pick'),c('CH0702','ถามว่าเศษความทรงจำคืออะไร','S14_RESEARCH','talk',{flags:['echo_hint'],trust:'EIRA'}),c('CH0703','ช่วยจัดหนังสือก่อน','S14_RESEARCH','pick',{trust:'EIRA',items:{FORM_RAY:1}})]},
{id:'S14_RESEARCH',title:'ร่องรอยบนหน้ากระดาษ',stage:'archive',npc:'eira-v3',entryFlags:['archive_read'],text:'เมื่อคุณแตะหน้าแผนที่ รูนก็เรียงเป็นเส้นแสงเหนือสายน้ำ ไอราลากนิ้วตามมัน “เสียงที่หายไปอาจถูกเก็บอยู่เหนือธารา ณ โบราณสถานเก่า ลองฟังสถานที่ก่อนถามว่ามันซ่อนอะไร”',choices:[c('CH1401','จดพิกัดโบราณสถาน','S02_HUB','pick',{flags:['archive_read','ruins_open'],items:{MOD_LINGER:1}}),c('CH1402','ศึกษาเวทเสียงสะท้อน','S02_HUB','cast',{target:'scene',flags:['archive_read','echo_hint','ruins_open'],items:{CORE_ECHO:1}}),c('CH1403','ขอความช่วยเหลือจากไอรา','S02_HUB','talk',{flags:['archive_read','ruins_open'],trust:'EIRA',trustAmount:2})]},
{id:'S11_STREAM',title:'ลำธารหยก',stage:'stream',npc:'pip',text:'สายน้ำวิบวับลอดสะพานไม้ แต่หมอกใต้สะพานทำให้มองไม่เห็นกระดิ่งที่กำลังดัง พิพเอียงหู “ปิ๊บ?” บางทีทำนองอาจอยู่ใกล้กว่าที่คิด',choices:[c('CH1101','ตรวจดูหมอกใต้สะพาน','S12_STREAM_RESULT','walk',{battle:'B02_STREAM_WISP'}),c('CH1102','ใช้เวทลมพัดหมอก','S12_STREAM_RESULT','cast',{when:[{kind:'knownCore',core:'WIND'}],lockedHint:'ค้นพบเวทธาตุลมก่อน',spellCore:'WIND',target:'scene',flags:['stream_clean','stream_clue']}),c('CH1103','เก็บน้ำหยกกับน้ำค้าง','S12_STREAM_RESULT','pick',{daily:true,items:{CORE_WATER:1,MOD_HEAL:1}}),c('CH1104','กลับหมู่บ้าน','S02_HUB','walk')]},
{id:'S12_STREAM_RESULT',title:'ทำนองในสายน้ำ',stage:'stream',npc:'pip',text:'คุณพบกระดิ่งเก่าติดอยู่กับรากไม้ มันขยับตามจังหวะน้ำ รากยังแข็งแรงพอให้ค่อย ๆ ปลดกระดิ่ง หรือคุณจะเก็บทำนองด้วยการฟังก็ได้',choices:[c('CH1201','ช่วยนำกระดิ่งออกจากรากไม้','S02_HUB','pick',{flags:['stream_clean','stream_clue'],items:{IT_OLD_BELL:1,CORE_WATER:1}}),c('CH1202','ปล่อยกระดิ่งไว้และจำจังหวะเสียง','S02_HUB','talk',{flags:['stream_clue']}),c('CH1203','นำหยดน้ำไปให้ยายมาเรน','S03B_MAREN','pick',{flags:['stream_clue'],trust:'MAREN'})]},
{id:'S08_FOREST_GATE',title:'ชายป่าม่านเมฆ',stage:'forest',npc:'pip',text:'ใบไม้ขยับราวกับกำลังบอกทิศทาง ป้ายไม้เก่าชี้ว่าครั้งหนึ่งที่นี่เป็นทางของนักดนตรีเร่',choices:[c('CH0801','เข้าไปตามทางแสง','S09_FOREST','walk'),c('CH0802','เก็บขนนกกับละอองเมฆข้างทาง','S09_FOREST','pick',{daily:true,items:{CORE_WIND:1,FORM_RAIN:1}}),c('CH0803','กลับหมู่บ้านเตรียมเวทก่อน','S02_HUB','walk')]},
{id:'S09_FOREST',title:'ใบไม้ที่จำชื่อคุณได้',stage:'forest',npc:'sprout',text:'ต้นอ่อนตัวหนึ่งขวางทางส่งเสียงกริ๊ง พิพดมใบไม้แล้วจามเป็นประกาย มันกำลังเฝ้าสิ่งใดอยู่นะ?',choices:[c('CH0901','ลองใช้เวทให้มันถอย','S10_FOREST_RESULT','cast',{battle:'B01_FOREST_SPROUT'}),c('CH0903','สังเกตว่ามันกำลังเฝ้าอะไร','S13_FOREST_SHRINE','pick',{flags:['forest_clue']}),c('CH0904','ถอยกลับไปเตรียมตัว','S08_FOREST_GATE','walk')]},
{id:'S10_FOREST_RESULT',title:'เสียงบนใบไม้',stage:'forest',npc:'sprout',text:'ต้นอ่อนกลับมาเคลื่อนไหวอย่างสงบ ลวดลายโน้ตปรากฏบนหินกลางป่า',choices:[c('CH1001','ลอกลายโน้ตเก็บไว้','S13_FOREST_SHRINE','pick',{flags:['forest_clue'],items:{CORE_BLOOM:1}}),c('CH1002','ฟังว่าใบไม้ต้องการบอกอะไร','S13_FOREST_SHRINE','talk',{flags:['forest_clue','forest_verse']})]},
{id:'S13_FOREST_SHRINE',title:'ศาลาเก็บเสียงเก่า',stage:'forest',npc:'pip',text:'ข้างศาลามีเกสรทองไหวทั้งที่ไม่มีลม โน้ตหนึ่งดวงราวกับกำลังรอให้คุณพากลับบ้าน',choices:[c('CH1301','เก็บชิ้นส่วนโน้ตเรืองแสง','S02_HUB','pick',{flags:['forest_clue','slice_complete'],items:{IT_NOTE_LEAF:1}}),c('CH1303','นั่งพักกับพิพ','S02_HUB','rest',{trust:'PIP'})]},
{id:'S15_RUINS',title:'ประตูหินโบราณ',stage:'ruins',npc:'eira-v3',text:'เสาหินมีช่องว่างพอดีกับกล่องดนตรี เถาวัลย์ไหวเหนือรูนที่ขาดไปหนึ่งจังหวะ ไอราลดเสียงลง “ประตูเลือกคนที่ยอมฟัง ไม่ใช่คนที่เสียงดังที่สุด”',choices:[c('CH1501','แก้รูนตามบันทึกหอสมุด','S17_ECHO_TABLET','pick',{requires:'archive_read',lockedHint:'กลับไปอ่านบันทึกเสียงสะท้อนในหอสมุดก่อน',flags:['ruins_clue','ruins_rune_path'],clearFlags:['ruins_box_path','ruins_crystal_path']}),c('CH1502','เข้าท้าทายหุ่นพิทักษ์','S16_RUINS_RESULT','walk',{battle:'B03_RUIN_SENTINEL'}),c('CH1503','ลองใช้เสียงเพลงจากกล่อง','S17_ECHO_TABLET','talk',{requires:'musicbox_found',lockedHint:'ช่วยลูมิตรวจกล่องดนตรีหรือขอนำกล่องไปให้คุโรดูก่อน',flags:['ruins_clue','ruins_box_path'],clearFlags:['ruins_rune_path','ruins_crystal_path']}),c('CH1504','กลับไปเตรียมของ','S02_HUB','walk')]},
{id:'S16_RUINS_RESULT',title:'ผู้เฝ้าประตู',stage:'ruins',npc:'eira-v3',text:'หุ่นรูนลดแขนลงและหลีกทาง ช่องผนังเปิดพร้อมข้อความ “การจดจำเริ่มจากการฟัง” ในรอยต่อหินมีเศษผลึกกับแผ่นบันทึกที่ยังอ่านได้',choices:[c('CH1601','อ่านรูนบนกำแพง','S17_ECHO_TABLET','pick',{flags:['ruins_clue','ruins_rune_path'],clearFlags:['ruins_box_path','ruins_crystal_path'],items:{MOD_PIERCE:1}}),c('CH1602','ตรวจผลึกของหุ่น','S17_ECHO_TABLET','pick',{flags:['ruins_clue','ruins_crystal_path'],clearFlags:['ruins_box_path','ruins_rune_path'],items:{FORM_WARD:1}})]},
{id:'S17_ECHO_TABLET',title:'แผ่นจารึกแห่งคำสัญญา',stage:'ruins',npc:'eira-v3',text:'แผ่นหินบอกว่าเมล็ดแห่งความทรงจำกำลังเงียบลง โน้ตเพลงสามดวงลอยเหนือจารึก ไอราแตะขอบสมุด “บางทีสิ่งที่หายไปอาจกำลังรอให้ใครรับฟังอีกครั้ง”',choices:[c('CH1701','ถอดความหมายด้วยตัวเอง','S02_HUB','pick',{flags:['ruins_clue','song_fragment'],trust:'EIRA'}),c('CH1702','บันทึกภาพจารึกกลับไปให้ไอรา','S07_ARCHIVE','pick',{flags:['ruins_clue','song_fragment','archive_notes_complete'],onceFlag:'archive_notes_complete',items:{FORM_RAY:1},trust:'EIRA'}),c('CH1703','ฟังเสียงที่แทรกอยู่ในรูน','S02_HUB','talk',{flags:['ruins_clue','song_fragment','echo_hint','archive_notes_complete'],onceFlag:'archive_notes_complete',items:{FORM_RAY:1},trust:'EIRA'})]},
...openingScenes,
...lifeScenes,
...echoScenes,
{id:'S28_RECOVER',title:'จุดพักสำหรับคนไม่ยอมแพ้',stage:'village',npc:'pip',text:'พิพเข็นใบไม้ที่เต็มด้วยยาพลังเข้ามา “ปิ๊บ! รอบหน้าเตรียมเวทเพิ่มไหม?” คุณฟื้น HP 70 และ MP 20 แล้ว',choices:[c('CH2801','กลับจุดก่อนสู้และลองใหม่','S09_FOREST','walk'),c('CH2802','กลับโรงช่างเพื่อผสมเวท','S04_KORO','walk')]}
 ];
export const scenes:Record<string,StoryScene>=Object.fromEntries(authoredScenes.map(s=>[s.id,s]));
export type ContentBatch={id:string;chapterId:'CHAPTER_1';arc:'ARC_01';sceneIds:string[];entryScenes:string[];exitScenes:string[];completionFlags:string[]};
const openingIds=new Set(openingSceneIds),lifeIds=new Set(lifeScenes.map(s=>s.id)),echoIds=new Set(echoScenes.map(s=>s.id));
/** Explicit, exhaustive ownership. Adding an ARC requires a deliberate chapter contract. */
export const contentBatches:ContentBatch[]=[
 {id:'CH1_FOUNDATIONS',chapterId:'CHAPTER_1',arc:'ARC_01',sceneIds:authoredScenes.filter(s=>!openingIds.has(s.id)&&!lifeIds.has(s.id)&&!echoIds.has(s.id)).map(s=>s.id),entryScenes:['S00_WAKE'],exitScenes:['S02_HUB'],completionFlags:['crafted_first']},
 {id:'CH1_FIRST_EVENING',chapterId:'CHAPTER_1',arc:'ARC_01',sceneIds:[...openingIds],entryScenes:['S18_FESTIVAL_PREP'],exitScenes:['S02_HUB','S04_KORO'],completionFlags:['arc1_opening_complete']},
 {id:'CH1_LIFE_LESSONS',chapterId:'CHAPTER_1',arc:'ARC_01',sceneIds:[...lifeIds],entryScenes:['LP_CROSSROADS'],exitScenes:['S02_HUB'],completionFlags:['lp_shared_guide']},
 {id:'CH1_ECHO_EXPEDITION',chapterId:'CHAPTER_1',arc:'ARC_01',sceneIds:[...echoIds],entryScenes:['ECHO_CALL'],exitScenes:['S02_HUB','S04_KORO'],completionFlags:['echo_expedition_complete']},
];
