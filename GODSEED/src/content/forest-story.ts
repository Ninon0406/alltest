import type {Choice,StoryScene} from './story';
const c=(id:string,label:string,next:string,anchor:string,extra:Partial<Choice>={}):Choice=>({id,label,next,cue:'walk',cinematic:{anchor,pose:'talk'},...extra});
const interact=(anchor:string,pose:'pick_up'|'cast'|'rest'|'talk'='pick_up',effect?:'leaf'|'song')=>({anchor,pose,...effect?{effect}:{}});

export const pipScenes:StoryScene[]=[
 {id:'S29_PIP_SIDEQUEST',title:'พิพกับผลไม้ที่ไม่ยอมหยุด',stage:'forest_road',npc:'pip',entryFlags:['pip_fruit_started'],staging:{location:'forest_road',anchor:'path_entry'},variants:[{"flag":"pip_fruit_helped","text":"ผลไม้ถูกเก็บไปแล้ว ถนนกลับมาสงบ พิพจำวิธีที่คุณเลือกช่วยได้ ครั้งนี้คุณกับมันย้อนนึกถึงเรื่องที่ทำด้วยกัน ไม่ต้องเริ่มไล่ผลไม้ใหม่อีกครั้ง"}],text:'ถนนหินเส้นนี้เป็นที่ที่พิพเคยไล่ตามผลไม้ลูกใหญ่กว่าตัวเอง ข้างทางมีที่ให้ยืนดูและช่วยกันคิด คุณจะลองช่วยเพื่อนตัวเล็ก หรือทบทวนสิ่งที่ทำด้วยกันก็ได้ โดยไม่ต้องแย่งหน้าที่ของมันทั้งหมด',choices:[
  c('CH2901','เดินไปดักแล้วช่วยประคองผลไม้','PIP_FRUIT_RESULT','fruit_front',{cue:'pick',when:[{kind:'notFlag',id:'pip_fruit_helped'}],lockedHint:'ช่วยเก็บครั้งนี้แล้ว เลือกคุยเรื่องผลไม้ต่อได้',flags:['pip_fruit_helped','pip_fed','pip_caught_fruit'],onceFlag:'pip_fruit_helped',items:{IT_FOREST_FRUIT:2},trust:'PIP',trustAmount:2,cinematic:interact('fruit_front')}),
  c('CH2902','รอดูจากหลังต้นไม้ ให้พิพลองหาวิธีหยุดเอง','PIP_FRUIT_RESULT','oak_back',{when:[{kind:'notFlag',id:'pip_fruit_helped'}],lockedHint:'ช่วยเก็บครั้งนี้แล้ว เลือกคุยเรื่องผลไม้ต่อได้',flags:['pip_fruit_helped','pip_fed','pip_solved_fruit'],onceFlag:'pip_fruit_helped',items:{IT_FOREST_FRUIT:1},trust:'PIP',cinematic:interact('oak_back','talk','leaf')}),
  c('CH2903','ชวนพิพเก็บผลไม้แล้วไปสวนมาเรนด้วยกัน','PIP_FRUIT_RESULT','fruit_front',{cue:'pick',when:[{kind:'notFlag',id:'pip_fruit_helped'}],lockedHint:'ช่วยเก็บครั้งนี้แล้ว เลือกคุยเรื่องผลไม้ต่อได้',flags:['pip_fruit_helped','pip_fed','pip_joined'],onceFlag:'pip_fruit_helped',items:{IT_FOREST_FRUIT:1},trust:'PIP',cinematic:interact('fruit_front')}),
  c('CHPIP_REMEMBER','กลับไปคุยเรื่องผลไม้ที่ช่วยกันเก็บ','PIP_FRUIT_RESULT','fruit_front',{requires:'pip_fruit_helped',lockedHint:'ช่วยพิพเก็บผลไม้ก่อน'}),
  c('CHPIP_WAIT','กลับหมู่บ้านก่อน พิพยังมีที่ปลอดภัยให้ลอง','S02_HUB','path_entry'),
 ]},
 {id:'PIP_FRUIT_RESULT',title:'ขนาดของความช่วยเหลือ',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'fruit_front'},variants:[{"flag":"pip_shared_fruit","text":"คุณแบ่งผลไม้หนึ่งชิ้นให้พิพแล้ว เพื่อนตัวเล็กจำความช่วยเหลือนั้นได้ เรื่องที่เหลือให้ทำคือจดวันนี้ไว้และกลับไปใช้ชีวิตร่วมกัน"},{"flag":"pip_kept_fruit","text":"คุณเลือกเก็บผลไม้ไว้เดินทางและขอบคุณพิพ มันไม่ได้ทวงของจากคุณ ความช่วยเหลือวันนี้ยังเป็นเรื่องของเพื่อนสองคนที่นำกลับไปเล่าได้"}],text:'ผลไม้ถูกเก็บเรียบร้อยแล้ว พิพดูพอใจกับวิธีที่ช่วยกัน การช่วยไม่ได้แปลว่าต้องทำเหมือนกันทุกครั้ง คุณเลือกได้ว่าจะเก็บผลไม้ไว้เดินทางหรือแบ่งให้เพื่อนตัวเล็ก',choices:[
  c('CHPIP_SHARE','แบ่งผลไม้หนึ่งชิ้นให้พิพ','PIP_PROMISE','fruit_front',{cue:'pick',costs:{IT_FOREST_FRUIT:1},when:[{kind:'notFlag',id:'pip_fruit_decided'}],lockedHint:'เลือกแล้ว กลับไปจดเรื่องของเพื่อนต่อได้',flags:['pip_fruit_decided','pip_shared_fruit'],trust:'PIP',cinematic:interact('fruit_front')}),
  c('CHPIP_KEEP','เก็บผลไม้ไว้ และขอบคุณพิพที่สอนวิธีหยุดมัน','PIP_PROMISE','marker_front',{when:[{kind:'notFlag',id:'pip_fruit_decided'}],lockedHint:'เลือกแล้ว กลับไปจดเรื่องของเพื่อนต่อได้',flags:['pip_fruit_decided','pip_kept_fruit'],trust:'PIP'}),
  c('CHPIP_RECALL','นึกถึงสิ่งที่เคยเลือก แล้วกลับไปทักเพื่อน','PIP_PROMISE','marker_front',{requires:'pip_fruit_decided',lockedHint:'เลือกแบ่งหรือเก็บผลไม้ก่อน'}),
 ]},
 {id:'PIP_PROMISE',title:'เพื่อนร่วมทางที่ไม่ต้องถือเชือก',stage:'village',npc:'pip',staging:{location:'under_tree',anchor:'under_tree_seat'},text:'พิพเอาหางวางข้างสมุดเหมือนที่คั่นหน้า มันไม่ได้สัญญาว่าจะรู้ทางทุกแห่ง แต่จะหยุดรอเมื่อคุณต้องดูแผนที่ เรื่องเล็กวันนี้อาจช่วยให้เข้าใจสิ่งมีชีวิตในป่าได้อีกวันหนึ่ง',choices:[
  c('CHPIP_FINISH','จดเรื่องของพิพแล้วกลับจัตุรัส','S02_HUB','exit_path',{flags:['pip_sidequest_complete'],onceFlag:'pip_sidequest_complete'}),
  c('CHPIP_GARDEN','พาพิพไปทักยายมาเรน','S06_GARDEN','exit_path',{flags:['pip_sidequest_complete','pip_joined'],onceFlag:'pip_sidequest_complete',trust:'MAREN'}),
 ]},
];

/** ARC 2 opening expedition: finite, revisitable and connected to earned chapter-one facts. */
export const forestScenes:StoryScene[]=[
 {id:'A2_CALL',title:'จังหวะที่ตอบกลับจากรากไม้',stage:'village',npc:'pip',entryFlags:['a2_started'],staging:{location:'under_tree',anchor:'under_tree_seat'},text:'หลังเพลงกลับมา ใต้รากต้นเมล็ดมีเสียงเคาะตอบสามครั้ง พิพไม่รีบลากคุณไป มันวางใบไม้จากถนนป่าข้างสมุด ใบเดียวมีรอยของหลายฤดูซ้อนกัน คุณตกลงจะไปดูและกลับมาเล่า โดยยังไม่ตั้งชื่อให้สิ่งที่ไม่รู้',choices:[
  c('CHA2_CALL_PACK','เตรียมของกับคุโรก่อนออกไป','A2_PACK','exit_path'),
  c('CHA2_CALL_RESUME','กลับไปนำผลที่เลือกมาเล่าให้หมู่บ้าน','A2_RETURN','exit_path',{requires:'a2_decided',lockedHint:'เลือกสิ่งที่จะฝากไว้ที่ถนนป่าก่อน'}),
  c('CHA2_CALL_LATER','ฟังให้จบก่อน แล้วค่อยออกเดินทางวันอื่น','S02_HUB','exit_path'),
 ]},
 {id:'A2_PACK',title:'เชือกที่ใช้ผูกสมุด ไม่ใช่ผูกเพื่อน',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'recipe_front'},text:'คุโรเตรียมชิ้นส่วนสำหรับปราการพฤกษา แก่นน้ำ และยาสองขวด “ถ้ารากไม้ตื่นกลัว อย่าเพิ่งตัดสินว่ามันอยากสู้” เขาให้ชุดนี้ครั้งเดียว ส่วนของที่หาเพิ่มยังเก็บจากเส้นทางเดิมได้',choices:[
  c('CHA2_PACK_TAKE','รับชุดเดินทางและส่วนผสมเวทคุ้มกัน','A2_RECIPE','recipe_front',{cue:'pick',flags:['a2_kit_taken'],onceFlag:'a2_kit_taken',items:{CORE_BLOOM:1,FORM_WARD:1,MOD_GUARD:1,CORE_WATER:1,FORM_ORB:1,MOD_SEEK:1,IT_POTION_DEW:2,IT_MANA_LEAF:1},cinematic:interact('recipe_front')}),
  c('CHA2_PACK_BACK','กลับจัตุรัสก่อน','S02_HUB','exit_path'),
 ]},
 {id:'A2_RECIPE',title:'ที่ว่างใต้ร่มเวท',stage:'workshop',npc:'koro',staging:{location:'spell_workshop',anchor:'craft_front'},text:'พฤกษา + ปราการ + คุ้มครอง สร้างโล่ที่ใช้ตั้งหลักได้จริง ส่วนน้ำ + ลูกแก้ว + นำวิถีช่วยทดลองกับรากที่แห้ง คุณผสมด้วยชิ้นส่วนในกระเป๋าได้ก่อนออกไป ไม่มีการเรียนสูตรแทนคุณเพียงเพราะอ่านคำแนะนำ',choices:[
  c('CHA2_RECIPE_OPEN','เปิดโต๊ะผสมเวท','A2_RECIPE','craft_front',{route:'craft',cue:'cast',cinematic:interact('craft_front','cast')}),
  c('CHA2_RECIPE_LEAVE','ตรวจช่องเวทแล้วไปบอกลาลูมิ','A2_GOODBYE','exit_path'),
 ]},
 {id:'A2_GOODBYE',title:'คนที่รอฟัง ไม่ใช่รอคำตอบใหญ่',stage:'village',npc:'lumi',staging:{location:'village_center',anchor:'fountain_front'},text:'ลูมิยื่นกระดาษเปล่าให้ “ถ้าเจอเรื่องที่ยังไม่เข้าใจ เว้นที่ไว้ให้หนูวาดได้ไหม?” เธอไม่ได้ขอให้คุณไปเอาเพลงใหม่มาอีก แค่กลับมาเล่าเรื่องของถนนที่คนในหมู่บ้านเคยเดินผ่านทุกวัน',choices:[
  c('CHA2_GOODBYE_PROMISE','รับปากว่าจะเล่าทั้งสิ่งที่รู้และสิ่งที่ยังสงสัย','A2_EDGE','village_exit',{flags:['a2_return_promise'],trust:'LUMI'}),
  c('CHA2_GOODBYE_SKETCH','ชวนลูมิวาดต้นทางไว้ก่อน แล้วค่อยไปเติมปลายทาง','A2_EDGE','market_entrance',{flags:['a2_lumi_sketch'],trust:'LUMI'}),
 ]},
 {id:'A2_EDGE',title:'ถนนที่เสียงเพลงเดินมาไม่ถึง',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'path_entry'},text:'ถนนหินคดผ่านต้นโอ๊กเก่า น้ำไหลอยู่ทางขวา แต่เสียงเคาะมาจากรากกลางทาง แสงอุ่นเผยรอยป้ายซ้อนกันสองยุค คุณเลือกดูจากขอบทางก่อน ไม่มีเหตุให้รีบตามแสงเข้าไปทุกดวง',choices:[
  c('CHA2_EDGE_MARK','อ่านป้ายโดยยืนอยู่นอกแนวราก','A2_MARKER','marker_front',{flags:['a2_marker_seen']}),
  c('CHA2_EDGE_PIP','ให้พิพพาดูรอยเล็กข้างลำธารก่อน','A2_PIP','water_front',{flags:['a2_small_tracks']}),
  c('CHA2_EDGE_HOME','กลับหมู่บ้านเตรียมตัวเพิ่มเติม','S02_HUB','path_entry'),
 ]},
 {id:'A2_MARKER',title:'ป้ายที่ไม่ได้ชี้ให้เดินเร็วขึ้น',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'marker_front'},text:'รอยเก่าชี้เข้าป่า รอยใหม่เว้นลูกศรไว้ตรงที่มีรากโผล่ คุณจำบทเรียนที่แผนที่ต้องบอกข้อจำกัดด้วยได้ พิพใช้อุ้งเท้าปัดฝุ่นออก เผยรูปใบไม้ที่มีช่องว่างตรงกลาง',choices:[
  c('CHA2_MARK_NOTE','จดรอยเก่าและรอยใหม่แยกกัน','A2_ROOT','root_front',{cue:'pick',flags:['a2_markers_compared'],cinematic:interact('marker_front')}),
  c('CHA2_MARK_SCOUT','ใช้หลักสูตรนักสำรวจหาจุดพักระหว่างป้าย','A2_HOLLOW','hollow_front',{requires:'lp_explorer_rank2',flags:['a2_explorer_detour'],trust:'PIP',lockedHint:'จบหลักสูตรนักสำรวจระดับ 2 หรือเดินตามรากไปดูได้'}),
 ]},
 {id:'A2_ROOT',title:'รากที่ตอบทุกคำถามด้วยเสียงเดียว',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'root_front'},variants:[{"flag":"a2_root_restored","text":"รากที่คุณประคองไว้แตกใบเล็กแล้ว จังหวะที่เคยทวนซ้ำมีช่วงว่างให้ฟัง พิพชี้จากดินไปทางน้ำ คุณกลับมาเทียบสิ่งที่เปลี่ยนกับสมุดได้ โดยไม่ต้องถอนรากออกจากดิน"}],text:'รากที่แห้งขยับเหมือนกำลังทวนจังหวะเดียวซ้ำ ไม่ว่าคุณจะเคาะเร็วหรือช้า พิพหยุดเลียนเสียงมันแล้วชี้ไปยังดินแตกระแหง คำถามแรกอาจเป็นเรื่องน้ำ ไม่ใช่เรื่องคาถาที่เก่งกว่า',choices:[
  c('CHA2_ROOT_SOIL','ก้มตรวจดินก่อนลองใช้เวท','A2_DRY','root_front',{cue:'pick',flags:['a2_dry_soil'],cinematic:interact('root_front')}),
  c('CHA2_ROOT_LISTEN','ลองฟังเสียงก้องในโพรงข้างทาง','A2_HOLLOW','hollow_front',{flags:['a2_root_listened']}),
 ]},
 {id:'A2_DRY',title:'พื้นดินที่ยังเก็บรอยฝน',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'root_front'},variants:[{"flag":"a2_water_channel","text":"ร่องน้ำที่คุณเปิดยังมีทางไหล คุณตรวจระดับน้ำกับเศษใบไม้ที่ลอยมาใหม่ได้ การกลับมาดูช่วยให้รู้ว่าวิธีเดิมยังเหมาะอยู่หรือควรประคองเพิ่ม"}],text:'ใต้ผิวแห้งมีดินชื้นเหลืออยู่ น้ำจากลำธารไม่ได้หายไป เพียงมีเศษใบไม้อุดทางไหลเล็ก ๆ คุณเลือกใช้มือหรือเวทเปิดร่องน้ำได้ โดยไม่ต้องดึงรากออกจากดิน',choices:[
  c('CHA2_DRY_HAND','เก็บใบไม้ริมร่อง ให้น้ำไหลต่อได้','A2_BROOK','water_front',{cue:'pick',flags:['a2_water_channel','a2_channel_by_hand'],cinematic:interact('water_front')}),
  c('CHA2_DRY_WATER','ใช้เวทน้ำตรวจแนวร่องและประคองทางไหล','A2_BROOK','root_front',{cue:'cast',when:[{kind:'knownCore',core:'WATER'}],spellCore:'WATER',target:'scene',flags:['a2_water_channel','a2_channel_by_water'],cinematic:{...interact('root_front','cast'),effectTarget:'memory_root'},lockedHint:'ค้นพบเวทน้ำ หรือใช้มือเก็บใบไม้ได้'}),
 ]},
 {id:'A2_BROOK',title:'แบ่งน้ำโดยเหลือทางให้ปลา',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'water_front'},text:'น้ำเส้นเล็กพอหล่อเลี้ยงรากโดยไม่กั้นลำธาร คุณเก็บตัวอย่างเพียงหยดเดียวและทำเครื่องหมายระดับน้ำไว้ การทดลองที่ดีต้องบอกได้ว่าคุณเอาอะไรไปและเหลืออะไรไว้',choices:[
  c('CHA2_BROOK_SAMPLE','เก็บหยดธาราและจดระดับน้ำ','A2_PIP','water_front',{cue:'pick',flags:['a2_water_sampled'],onceFlag:'a2_water_sampled',items:{CORE_WATER:1,MOD_HEAL:1},cinematic:interact('water_front')}),
  c('CHA2_BROOK_LEAVE','ปล่อยตัวอย่างไว้ แล้วจำตำแหน่งแทน','A2_PIP','root_east',{flags:['a2_water_observed']}),
 ]},
 {id:'A2_PIP',title:'เสียงที่เพื่อนตัวเล็กแปลไม่ได้',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'root_east'},text:'สิ่งมีชีวิตในโพรงไม่ตอบเสียงของคน พิพเคาะสามครั้งแล้วรอ มันไม่ได้แปลคำพูดให้คุณ แต่แสดงให้เห็นว่าการรอเป็นส่วนหนึ่งของบทสนทนา ทางไปรากยังเปิดอยู่ แม้วันนี้คุณกับพิพเพิ่งรู้จักกัน',choices:[
  c('CHA2_PIP_WAIT','รอหนึ่งจังหวะเหมือนพิพ แล้วดูโพรงด้วยกัน','A2_HOLLOW','hollow_front',{flags:['a2_patient_listener']}),
  c('CHA2_PIP_MEMORY','นึกถึงวันที่แบ่งผลไม้ แล้วเว้นระยะให้เจ้าของโพรง','A2_HOLLOW','hollow_front',{requires:'pip_shared_fruit',flags:['a2_pip_trusted'],trust:'PIP',lockedHint:'แบ่งผลไม้กับพิพในภารกิจข้างทางก่อน หรือรอฟังได้เสมอ'}),
 ]},
 {id:'A2_HOLLOW',title:'โพรงที่มีมากกว่าหนึ่งเสียง',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'hollow_front'},text:'ข้างในมีรอยรากหลายเส้นซ้อนกัน บางเส้นจำฝน บางเส้นจำฝีเท้า เสียงที่คุณได้ยินจึงอาจไม่ได้เป็นของต้นไม้ต้นเดียว นี่เป็นข้อสังเกตแรก ยังไม่ใช่คำตอบเรื่องกำเนิดของโลก',choices:[
  c('CHA2_HOLLOW_TRACE','วาดเส้นที่แยกได้ โดยไม่เติมส่วนที่หาย','A2_RING','hollow_front',{cue:'pick',flags:['a2_hollow_recorded'],cinematic:interact('hollow_front')}),
  c('CHA2_HOLLOW_ECHO','ใช้เวทเสียงสะท้อนแยกจังหวะที่ทวนกัน','A2_RING','hollow_front',{cue:'cast',when:[{kind:'knownCore',core:'ECHO'}],spellCore:'ECHO',target:'scene',flags:['a2_hollow_recorded','a2_echo_layers'],cinematic:{...interact('hollow_front','cast','song'),effectTarget:'memory_root'},lockedHint:'ค้นพบเวทเสียงสะท้อน หรือวาดรอยที่เห็นได้'}),
 ]},
 {id:'A2_RING',title:'ให้รากได้ลองตอบใหม่',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'root_front'},variants:[{"flag":"a2_root_restored","text":"ต้นอ่อนบนรากที่ช่วยไว้เริ่มเติบโต คุณกลับมาตรวจว่าดินยังมีช่องให้น้ำและอากาศผ่าน จะประคองเพิ่มหรือรักษาที่พักเดิมก็ได้ โดยไม่รื้อสิ่งที่ทำไว้"}],text:'เมื่อมีที่ว่างและน้ำ รากไม่ต้องทวนจังหวะเดิมอีก คุณจะช่วยมันค่อย ๆ เติบโตหรือทำร่มเงาชั่วคราวก็ได้ สิ่งที่เปลี่ยนจะมองเห็นได้เมื่อกลับมา และยังบอกได้ว่าคุณช่วยด้วยวิธีใด',choices:[
  c('CHA2_RING_HAND','คลุมดินด้วยใบไม้โดยเว้นช่องน้ำไว้','A2_ENCOUNTER','root_front',{cue:'pick',flags:['a2_root_restored','a2_root_mulched'],cinematic:interact('root_front','pick_up','leaf')}),
  c('CHA2_RING_BLOOM','ใช้เวทพฤกษาประคองต้นอ่อนที่ราก','A2_ENCOUNTER','root_front',{cue:'cast',when:[{kind:'knownCore',core:'BLOOM'}],spellCore:'BLOOM',target:'scene',flags:['a2_root_restored','a2_root_bloomed'],cinematic:{...interact('root_front','cast','leaf'),effectTarget:'memory_root'},lockedHint:'ค้นพบเวทพฤกษา หรือคลุมดินด้วยมือได้'}),
  c('CHA2_RING_NATURE','ใช้บทเรียนผู้พิทักษ์ธรรมชาติทำร่มพักให้สิ่งมีชีวิต','A2_ENCOUNTER','root_front',{requires:'lp_nature_rank2',flags:['a2_root_restored','a2_nature_shelter'],cinematic:interact('root_front','pick_up','leaf'),lockedHint:'จบหลักสูตรผู้พิทักษ์ธรรมชาติระดับ 2 ก่อน'}),
 ]},
 {id:'A2_ENCOUNTER',title:'คนเฝ้ารากที่กำลังตื่น',stage:'forest_road',npc:'root-weaver-v17',staging:{location:'forest_road',anchor:'player_battle'},text:'ผู้ถักรากโผล่พ้นดินและรวบเถาเข้าหาตัว มันกำลังกันพื้นที่ใหม่ให้ต้นอ่อน ไอราเคยบอกว่าอาการเตรียมตัวคือข้อมูล: มันพักรวบรากหนึ่งจังหวะ ก่อนปล่อยเมล็ด และกวาดเถาแรงในจังหวะที่สาม',choices:[
  c('CHA2_TRIAL_FIGHT','ทดสอบเวทกับผู้ถักราก แล้วเปิดทางอย่างระวัง','A2_TRIAL_RESULT','player_battle',{cue:'cast',battle:'B06_ROOT_WEAVER'}),
  c('CHA2_TRIAL_PATIENCE','ถอยไปนั่งรอให้มันพาต้นอ่อนผ่านก่อน','A2_PATIENCE','resting_seat',{cue:'rest',flags:['a2_waited_for_wildlife'],cinematic:interact('resting_seat','rest','leaf')}),
  c('CHA2_TRIAL_FRIEND','ให้พิพช่วยบอกระยะปลอดภัย แล้วอ้อมแนวราก','A2_TRIAL_RESULT','root_east',{requires:'a2_pip_trusted',flags:['a2_passed_with_pip'],trust:'PIP',lockedHint:'ฟังพิพโดยใช้ความทรงจำการแบ่งผลไม้ก่อน หรือเลือกนั่งรอได้'}),
  c('CHA2_TRIAL_BACK','กลับมาเตรียมเวทและพักก่อน','S02_HUB','path_entry'),
 ]},
 {id:'A2_PATIENCE',title:'ที่นั่งสำหรับผู้ที่ไม่อยากแย่งทาง',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'resting_seat'},text:'เมื่อคุณหยุดก้าว ผู้ถักรากก็ลดเถาลง มันคาบต้นอ่อนผ่านไปช้า ๆ การเปิดทางครั้งนี้ไม่ให้รางวัลการต่อสู้ แต่พาคุณไปถึงร่องรอยเดียวกันได้ พิพวางใบไม้ลงตรงที่นั่งเป็นเครื่องหมายว่าควรเหลือที่พักไว้',choices:[
  c('CHA2_PATIENCE_PASS','ลุกเมื่อทางว่างแล้วตามดูรอยอย่างห่าง ๆ','A2_TRIAL_RESULT','root_east',{flags:['a2_peaceful_passage']}),
 ]},
 {id:'A2_TRIAL_RESULT',title:'รอยที่ไม่ได้มีไว้ให้ยึดครอง',stage:'forest_road',npc:'pip',entryFlags:['a2_trial_resolved'],staging:{location:'forest_road',anchor:'root_east'},text:'ใต้แนวเถามีใบไม้เรียงกันเป็นวงเล็ก แต่ละใบมาจากคนละต้น ลายนี้ไม่ตรงกับผนึกที่หมู่บ้านทุกส่วน สิ่งใหม่ทำให้คุณต้องกลับไปถามความรู้เก่าอีกครั้ง แทนที่จะตั้งชื่อมันตามสิ่งแรกที่คุ้นเคย',choices:[
  c('CHA2_RESULT_COMPARE','เทียบรอยนี้กับบทเพลงที่คุณเลือกดูแล','A2_TRACE','marker_front',{flags:['a2_comparison_started']}),
  c('CHA2_RESULT_REST','พักให้หายเหนื่อยแล้วค่อยจด','A2_TRACE','resting_seat',{cue:'rest',cinematic:interact('resting_seat','rest','leaf')}),
 ]},
 {id:'A2_TRACE',title:'สิ่งที่หมู่บ้านสอนให้มองเห็น',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'marker_front'},text:'สมุดของคุณมีทั้งเสียงคนและรอยธรรมชาติ การเลือกดูแลเพลงในหมู่บ้านทำให้คุณเริ่มเปรียบเทียบจากคนละมุม ไม่มีมุมใดแทนใบไม้จริงตรงหน้าได้ทั้งหมด',choices:[
  c('CHA2_TRACE_FAMILY','จดว่าเสียงของต้นเล็กอาศัยต้นใหญ่บังลมอย่างไร','A2_LEGACY','hollow_front',{requires:'chapter1_family',lockedHint:'บทแรกเลือกคืนเพลงให้ครอบครัว จึงใช้ข้อสังเกตนี้ได้ หรือจดสิ่งที่เห็นด้วยตัวเองได้',flags:['a2_learned_shelter'],trust:'MAREN'}),
  c('CHA2_TRACE_COMMUNITY','ทำเครื่องหมายว่ารากแต่ละเส้นเว้นช่องให้อีกเส้นอย่างไร','A2_LEGACY','hollow_front',{requires:'chapter1_community',lockedHint:'บทแรกเลือกให้ชุมชนเติมเพลงร่วมกัน จึงใช้ข้อสังเกตนี้ได้ หรือจดสิ่งที่เห็นด้วยตัวเองได้',flags:['a2_learned_shared_space'],trust:'PIP'}),
  c('CHA2_TRACE_ARCHIVE','เทียบสำเนาเก่ากับใบไม้ โดยใส่วันที่ของทั้งสอง','A2_LEGACY','hollow_front',{requires:'chapter1_archive',lockedHint:'บทแรกเลือกหอสมุดเก็บต้นฉบับ จึงใช้ข้อสังเกตนี้ได้ หรือจดสิ่งที่เห็นด้วยตัวเองได้',flags:['a2_learned_provenance'],trust:'EIRA'}),
  c('CHA2_TRACE_OBSERVE','เริ่มวาดจากสิ่งที่เห็น แล้วเว้นข้อสรุปไว้ก่อน','A2_LEGACY','hollow_front',{flags:['a2_learned_uncertainty']}),
 ]},
 {id:'A2_LEGACY',title:'ความทรงจำที่ไม่มีคนเขียนชื่อไว้',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'hollow_front'},text:'รอยของหลายฤดูอาจหมายถึงความทรงจำที่ส่งต่อกันผ่านราก ไม่ใช่เสียงจากผู้วิเศษเพียงคนเดียว นี่เป็นสมมติฐานที่ต้องกลับมาตรวจเมื่อฝนเปลี่ยน คุณยังเลือกได้ว่าจะเหลืออะไรไว้ให้ผู้มาทีหลัง',choices:[
  c('CHA2_LEGACY_LIMIT','เขียนข้อจำกัดของการทดลองไว้ข้างคำถาม','A2_DECISION','marker_front',{flags:['a2_research_limits'],trust:'EIRA'}),
  c('CHA2_LEGACY_CARE','ดูว่าการเดินทางของคุณทำให้ดินเปลี่ยนตรงไหน','A2_DECISION','root_front',{flags:['a2_footprint_checked'],trust:'MAREN'}),
 ]},
 {id:'A2_DECISION',title:'ถนนเส้นเดิมจะต้อนรับใคร',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'root_front'},text:'ก่อนกลับ คุณมีเวลาแก้สิ่งเล็ก ๆ หนึ่งอย่าง การดูแลราก การทำป้าย และการแบ่งข้อมูลล้วนมีประโยชน์ แต่แต่ละทางทำให้คนที่เดินมาวันหน้ามีประสบการณ์ต่างกัน เลือกสิ่งที่จะฝากไว้เป็นหลักในวันนี้',choices:[
  c('CHA2_DECIDE_CARE','ทำเขตพักให้รากฟื้นตัว โดยเหลือทางเดินเดิม','A2_CARE','root_front',{when:[{kind:'notFlag',id:'a2_decided'}],flags:['a2_decided','a2_resolution_care'],cinematic:interact('root_front','pick_up','leaf')}),
  c('CHA2_DECIDE_PATH','ทำป้ายจุดพักและทางอ้อมให้คนเดินช้า','A2_PATH','marker_front',{when:[{kind:'notFlag',id:'a2_decided'}],flags:['a2_decided','a2_resolution_path'],cinematic:interact('marker_front')}),
  c('CHA2_DECIDE_RECORD','วางสำเนาบันทึกที่แยกสิ่งที่รู้จากสิ่งที่ยังเดา','A2_RECORD','hollow_front',{when:[{kind:'notFlag',id:'a2_decided'}],flags:['a2_decided','a2_resolution_record'],cinematic:interact('hollow_front')}),
  c('CHA2_DECIDE_RECALL','รักษาสิ่งที่เคยเลือก แล้วนำเรื่องกลับไปเล่า','A2_RETURN','exit_path',{requires:'a2_decided',lockedHint:'เลือกสิ่งที่จะฝากไว้ที่ถนนป่าก่อน'}),
 ]},
 {id:'A2_CARE',title:'ร่มที่ไม่ต้องมีคนเฝ้า',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'root_front'},text:'คุณวางกิ่งไม้เป็นขอบเตี้ยให้คนเห็นแนวราก แสงผ่านช่องใบไม้พอดี ต้นอ่อนไม่ต้องถูกขุดไปอยู่ในกระถางเพื่อให้ใครแน่ใจว่ามันปลอดภัย ถนนยังอยู่ และที่พักของมันก็อยู่ด้วย',choices:[
  c('CHA2_CARE_RETURN','จำตำแหน่งไว้ตรวจวันหน้า แล้วกลับไปบอกยาย','A2_RETURN','exit_path',{flags:['a2_care_report'],trust:'MAREN'}),
 ]},
 {id:'A2_PATH',title:'ลูกศรที่มีที่นั่งอยู่ปลายทาง',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'marker_front'},text:'พิพลองเดินตามลูกศรแล้วหยุดตรงก้อนหินที่นั่งพักได้ คุณแก้ป้ายให้บอกระยะระหว่างจุดพักด้วย ทางลัดอาจเร็วกว่า แต่เส้นทางที่ชัดช่วยให้คนหลายแบบกลับถึงบ้านได้',choices:[
  c('CHA2_PATH_RETURN','เก็บสำเนาป้ายไปให้ลูมิลองอ่าน','A2_RETURN','exit_path',{flags:['a2_path_report'],trust:'LUMI'}),
 ]},
 {id:'A2_RECORD',title:'หน้ากระดาษที่ยอมมีช่องว่าง',stage:'forest_road',npc:'pip',staging:{location:'forest_road',anchor:'hollow_front'},text:'สำเนาเล่มเล็กมีวันที่ ระดับน้ำ และรอยใบไม้ ส่วนที่ยังไม่แน่ใจไม่ได้ถูกเขียนทับให้ดูสมบูรณ์ คนถัดไปจึงรู้ว่าควรเริ่มตรวจตรงไหน แทนที่จะต้องเชื่อคุณทุกคำ',choices:[
  c('CHA2_RECORD_RETURN','นำต้นฉบับไปตรวจร่วมกับไอรา','A2_RETURN','exit_path',{flags:['a2_record_report'],trust:'EIRA'}),
 ]},
 {id:'A2_RETURN',title:'ข่าวจากถนนเส้นใกล้บ้าน',stage:'village',npc:'lumi',staging:{location:'village_center',anchor:'fountain_front'},text:'ลูมิรออยู่ข้างน้ำพุ กระดาษของเธอยังเหลือที่ว่าง คราวนี้คุณมีทั้งสิ่งที่ทำได้กับเรื่องที่ยังตอบไม่ได้ เธอขอวาดพิพตัวใหญ่กว่าผลไม้ คุณกับพิพลงความเห็นตรงกันว่าเรื่องนี้ควรมีหมายเหตุ',choices:[
  c('CHA2_RETURN_MAREN','แวะเล่าเรื่องน้ำและรากให้มาเรนฟัง','A2_MAREN','tree_path',{flags:['a2_returned_to_people'],trust:'LUMI'}),
  c('CHA2_RETURN_EIRA','ให้ไอราตรวจบันทึกก่อนแบ่งสำเนา','A2_EIRA','village_exit',{flags:['a2_returned_to_people'],trust:'LUMI'}),
  c('CHA2_RETURN_PAUSE','พักเรื่องรายงานไว้ แล้วกลับไปทำธุระในหมู่บ้าน','S02_HUB','village_road',{flags:['a2_report_paused']}),
 ]},
 {id:'A2_MAREN',title:'คำถามที่ปลูกไว้ต่อได้',stage:'garden',npc:'maren',staging:{location:'elder_garden',anchor:'maren_listen_seat'},text:'มาเรนฟังจนจบก่อนถามว่าคุณทิ้งน้ำไว้ให้ต้นอื่นเท่าไร เธอไม่รีบเรียกเสียงรากว่าเวทชนิดใหม่ “กลับไปดูเมื่อฤดูเปลี่ยนสิ การดูแลก็เป็นวิธีทดลองอย่างหนึ่ง” คุณพักได้ก่อนนำสมุดไปหอสมุด',choices:[
  c('CHA2_MAREN_LISTEN','นั่งฟังคำถามของยาย แล้วแบ่งบันทึกให้ไอรา','A2_EIRA','maren_listen_seat',{cue:'rest',flags:['a2_maren_heard'],trust:'MAREN',cinematic:interact('maren_listen_seat','rest','leaf')}),
 ]},
 {id:'A2_EIRA',title:'หลักฐานที่กลับมาพร้อมคน',stage:'archive',npc:'eira-v3',text:'ไอราอ่านช่องว่างก่อนข้อความ เธอเก็บสำเนาคู่กับบันทึกผนึกหมู่บ้าน รอยที่ไม่ตรงกันช่วยให้เห็นคำถามใหม่: ความทรงจำอาจมีวิธีเดินทางมากกว่าที่ตำราเหลืออยู่ เธอให้วัสดุทดลองต่อ โดยไม่ลงชื่อรับรองคำตอบที่ยังไม่มี',choices:[
  {id:'CHA2_EIRA_SHARE',label:'บอกทั้งวิธีที่ใช้และข้อจำกัด แล้วกลับลาน',next:'A2_EPILOGUE',cue:'talk',flags:['a2_eira_reported'],trust:'EIRA'},
 ]},
 {id:'A2_EPILOGUE',title:'ถนนยังจำฝีเท้า',stage:'village',npc:'pip',staging:{location:'village_center',anchor:'fountain_front'},text:'การสำรวจครั้งแรกจบแล้ว ราก ป้าย หรือสำเนาที่คุณฝากไว้ยังอยู่ที่ถนนป่า หมู่บ้านมีคำถามใหม่ให้ตามต่อ แต่วันนี้คุณกลับมาหาคนที่รอฟังได้สำเร็จ ไอราฝากข้อเชื่อมประกายกับเศษเสียงสะท้อนสำหรับการทดลองครั้งหน้า',choices:[
  c('CHA2_EPILOGUE_FINISH','รับวัสดุและกลับไปใช้ชีวิตในหมู่บ้าน','S02_HUB','village_road',{flags:['a2_returned'],onceFlag:'a2_returned',items:{FORM_CHAIN:1,CORE_ECHO:1}}),
  c('CHA2_EPILOGUE_TREE','รับวัสดุแล้วไปนั่งคิดใต้ต้นเมล็ด','S02_TREE','tree_path',{flags:['a2_returned'],onceFlag:'a2_returned',items:{FORM_CHAIN:1,CORE_ECHO:1}}),
 ]},
];
