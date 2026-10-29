// Nine playable V7 adaptations: supervised childhood, then earned preparation.
const flag=key=>({op:'flag',key});
const memory=(key,amount=1)=>({op:'memory',key,amount});
const bond=(key,amount=1)=>({op:'relationship',key,amount});
const learn=(key,amount=1)=>({op:'learning',key,amount});
const when=(key,...effects)=>({op:'when',key,effects});
const c=(id,label,description,effects,extra={})=>({id,label,description,effects,...extra});
export const schoolEvents=[
 {id:'child.seeds',sourceId:'life_evt_029',month:48,maxMonth:59,title:'เมล็ดสองถุงข้างหน้าต่าง',text:'ผู้ดูแลนำเมล็ดสองชนิดมาปลูกในกระถางที่บ้านใน{location.name} คุณช่วยได้เท่าที่สนใจ มีผู้ใหญ่ดูแลน้ำและเครื่องมือ ไม่ต้องอ่านตำราหรือหารายได้จากแปลงเล็กนี้',choices:[
  c('quick','เลือกต้นที่งอกเร็วแล้วชวนกันดูทุกเช้า','การสังเกตสิ่งเล็ก ๆ จะช่วยให้กล้าลองแสดงงานในวัยเรียน',[flag('seeds_quick'),memory('curiosity'),when('safe_exploring',memory('curiosity'))]),
  c('patient','เลือกต้นที่ค่อย ๆ โตและพักเมื่อเหนื่อย','เก็บนิสัยคอยดูการเปลี่ยนแปลงไว้ใช้เมื่อเป็นผู้จดงาน',[flag('seeds_patient'),memory('caution'),when('rest_signals',bond('caregivers'))]),
  c('together','ให้ผู้ดูแลช่วยเลือกแล้วผลัดกันรดน้ำ','การขอความช่วยเหลือทำให้การดูแลสิ่งหนึ่งเป็นเรื่องร่วมกัน',[flag('seeds_together'),bond('caregivers',2),when('asks_help',memory('kindness'))]),
 ]},
 {id:'child.mechanism',sourceId:'life_evt_034',month:60,maxMonth:71,title:'ของเล่นที่หมุนได้ในมือช่าง',text:'ช่างที่มาเยี่ยมชุมชนใน{location.name}นำของเล่นไม้ชิ้นใหญ่ให้ลองกับผู้ดูแล ไม่มีใบมีด ไฟ หรือคำสั่งให้ประกอบเครื่องจักร คุณถาม ลองเล่น หรือวาดรูปได้โดยไม่ต้องซื้อของ',choices:[
  c('ask','ดูช่างหมุนช้า ๆ แล้วถามว่าทำไมจึงขยับ','เก็บคำถามไว้คุยเรื่องเครื่องมือกับช่างอีกครั้งเมื่อโตขึ้น',[flag('mechanism_questions'),memory('curiosity',2),when('patient_play',memory('caution'))]),
  c('play','ลองหมุนของเล่นที่ผู้ใหญ่จับให้นิ่ง','เรียนรู้ขอบเขตของมือและการรอให้ผู้ใหญ่ช่วย',[flag('mechanism_hands'),memory('caution'),when('touch_play',memory('curiosity'))]),
  c('draw','ชวนเพื่อนวาดรูปของเล่นด้วยสีแท่งใหญ่','ภาพร่วมกันกลายเป็นจุดเริ่มของการร่างงานในวัยเรียน',[flag('mechanism_sketch'),bond('community'),when('parallel_play',bond('community',2))]),
 ]},
 {id:'child.rules',sourceId:'life_evt_037',month:84,maxMonth:89,title:'กติกาที่ทุกคนมีเสียง',text:'เพื่อนในชั้นเรียนที่{location.name}อยากเล่นคนละแบบ ครูอยู่ใกล้และไม่ให้เด็กคนใดต้องรับหน้าที่แก้ปัญหาทั้งหมด คุณเลือกช่วยหาวิธีอยู่ร่วมกันได้',choices:[
  c('turns','เสนอให้ผลัดกันเลือกเกมและพักได้','การแบ่งของเล่นในวัยเล็กช่วยให้เพื่อนเชื่อใจ เวลาจัดงานก็ผลัดหน้าที่กันได้',[flag('fair_turns'),bond('community',2),when('shared_toy',bond('community',2))]),
  c('listen','ฟังว่าแต่ละคนชอบหรือไม่สบายใจเรื่องใด','วิธีฟังเหตุผลจะกลับมาช่วยเมื่อเพื่อนขอคำแนะนำในวัยรุ่น',[flag('patient_listener'),memory('caution',2),when('familiar_face',bond('caregivers'))]),
  c('teacher','ชวนครูช่วยคุยแล้วบอกขอบเขตของตน','ไม่ต้องแบกเรื่องไว้คนเดียว ครูช่วยให้เพื่อนสื่อสารกัน',[flag('seeks_mediator'),bond('caregivers',2),when('asks_help',bond('community',2))]),
 ]},
 {id:'child.workshop',sourceId:'life_evt_038',month:90,maxMonth:95,title:'โต๊ะเครื่องมือที่เย็นแล้ว',text:'ช่างนำตัวอย่างเครื่องมือเย็นและแผ่นภาพมาคุยที่ชุมชนใน{location.name} เด็กดูงานในเขตปลอดภัยกับครู ไม่เข้าเตาหลอมหรือยกของหนัก วันนี้ยังไม่ได้อุปกรณ์หรือค่าจ้าง',choices:[
  c('observe','ถามว่าช่างรู้ได้อย่างไรว่าชิ้นงานพร้อมใช้','คำถามจากของเล่นไม้ช่วยให้สังเกตลำดับงานละเอียดขึ้น',[flag('workshop_observer'),memory('curiosity',2),when('mechanism_questions',memory('curiosity'))]),
  c('help','ช่วยแยกชิ้นไม้มนที่ครูตรวจแล้ว','ฝึกทำตามข้อตกลงและขอแรงช่วย ประสบการณ์นี้ใช้ต่อยอดคำแนะนำด้านความอึดภายหลัง',[flag('workshop_helper'),memory('caution'),bond('community',2),when('mechanism_hands',memory('ambition'))]),
  c('sketch','ร่างภาพเครื่องมือแล้วให้ช่างช่วยตรวจ','ภาพของเล่นที่เคยวาดกับเพื่อนทำให้ร่วมกันอธิบายได้ดีขึ้น',[flag('workshop_plans'),memory('curiosity'),bond('community'),when('mechanism_sketch',bond('community',2))]),
 ]},
 {id:'child.caravan',sourceId:'life_evt_040',month:108,maxMonth:113,title:'ข่าวเมืองไกลที่มาถึงบ้าน',text:'ขบวนเดินทางแวะเล่าเรื่องใน{location.name} คุณฟังพร้อมผู้ดูแล การถามข่าวไม่พาออกจากบ้านหรือเปิดทางลัดบนแผนที่ คำแนะนำจะช่วยได้เมื่อคุณลงมือฝึกจริงเท่านั้น',choices:[
  c('map','อ่านภาพจุดพักและทิศทางกับผู้ใหญ่','ได้แนวฝึกการสังเกตเพิ่ม 1 ต่อครั้ง และจำข้อมูลไว้ถามเรื่องเดินทางเมื่อโตขึ้น',[flag('caravan_map'),learn('per'),when('river_map',memory('curiosity'))]),
  c('greetings','ลองคำทักทายแล้วถามความหมายให้เข้าใจ','ได้แนวฝึกการสื่อสารเพิ่ม 1 ต่อครั้ง โดยไม่อ้างว่าพูดภาษาใหม่ได้ทันที',[flag('caravan_greetings'),learn('cha'),bond('community'),when('voice_play',bond('community',2))]),
  c('news','ถามว่าคนต่างถิ่นดูแลต้นไม้และอยู่ร่วมกันอย่างไร','ได้แนวฝึกความเข้าใจเพิ่ม 1 ต่อครั้ง ความอดทนดูต้นไม้ช่วยให้ถามต่อได้ละเอียด',[flag('caravan_news'),learn('wis'),when('seeds_patient',memory('curiosity',2)),when('river_story',memory('kindness'))]),
 ]},
 {id:'child.farewell',sourceId:'life_evt_036',month:114,maxMonth:119,title:'สิ่งเล็ก ๆ ก่อนเพื่อนย้ายบ้าน',text:'เพื่อนวัยเดียวกันจะย้ายไปอยู่กับครอบครัว ผู้ใหญ่ช่วยดูแลการติดต่อและการส่งของ คุณเลือกฝากความทรงจำโดยไม่ต้องตามไปหรือจ่ายค่าเดินทาง',choices:[
  c('album','ทำภาพความทรงจำให้เพื่อนดูร่วมกับครอบครัว','ภาพจะเป็นเรื่องเล่าเมื่อติดต่อบ้านในวัยรุ่น',[flag('farewell_album'),memory('kindness'),bond('caregivers'),when('workshop_plans',memory('curiosity'))]),
  c('address','ขอผู้ดูแลช่วยเก็บช่องทางส่งจดหมาย','เก็บวิธีติดต่อไว้ใช้แบ่งประสบการณ์เรียนในภายหลัง ไม่สร้างจดหมายหรือรายได้อัตโนมัติ',[flag('penpal_address'),memory('curiosity'),bond('community')]),
  c('gather','จัดช่วงเล่านิทานส่งเพื่อนกับครู','การผลัดหน้าที่ช่วยให้ทุกคนมีส่วนร่วม แม้ไม่ได้เตรียมของขวัญ',[flag('farewell_host'),bond('community',2),when('fair_turns',bond('community',2))]),
 ]},
 {id:'child.fair',sourceId:'life_evt_041',month:126,maxMonth:131,requirements:{completed:['child.workshop']},title:'ลานแสดงสิ่งที่เคยลงมือ',text:'ชั้นเรียนใน{location.name}จัดวันแลกเปลี่ยนงาน คุณนำสิ่งที่เคยฝึกจริงมาขอคำแนะนำได้ หรือช่วยงานและจดความเห็นอย่างเป็นธรรม ไม่มีการมอบพลังหรือรางวัลเงินให้ล่วงหน้า',choices:[
  c('show','นำบันทึกการฝึกจริงมาแลกวิธีทำกับเพื่อน','ต้องเคยฝึกพื้นฐานจริง ได้แนวฝึกความคล่องเพิ่ม 1 ต่อครั้ง งานไม้ที่เคยช่วยต่อยอดความอึดได้',[flag('child_shown_practice'),learn('dex'),when('workshop_helper',learn('con')),when('seeds_quick',memory('ambition'))],{requirements:{practiced:true},requirementHint:'ต้องเคยฝึกพื้นฐานจริงอย่างน้อยหนึ่งครั้งก่อนนำบันทึกมาแสดง'}),
  c('host','ช่วยครูแบ่งพื้นที่และต้อนรับผู้มาชม','ได้แนวฝึกการสื่อสารเพิ่ม 1 ต่อครั้ง ประสบการณ์รดน้ำร่วมกันช่วยให้แบ่งหน้าที่',[flag('child_fair_host'),learn('cha'),bond('community'),when('seeds_together',bond('community',2))]),
  c('record','จดความเห็นตามที่ผู้แสดงยินยอม','ได้แนวฝึกความเข้าใจเพิ่ม 1 ต่อครั้ง ถ้าเคยคอยดูเมล็ดโตช้าจะได้แนวทบทวนเพิ่มอีก 1',[flag('child_fair_recorder'),learn('wis'),memory('caution'),when('seeds_patient',learn('wis'))]),
 ]},
 {id:'child.invitation',sourceId:'life_evt_048',month:132,maxMonth:137,requirements:{completed:['child.caravan']},title:'ถามเรื่องพิธีก่อนถึงวันจริง',text:'ครูใน{location.name}แจ้งว่าพิธีปลุกพลังเริ่มได้เมื่ออายุครบสิบสอง คุณยังไม่เข้าพิธี ไม่ได้รับผลวัดล่วงหน้า และไม่ต้องเลือกอาชีพ วันนี้เลือกสิ่งที่อยากเตรียมกับผู้ใหญ่',choices:[
  c('steps','ถามขั้นตอนและบอกว่าหยุดพักได้เมื่อใด','ความคุ้นเคยกับเสียงและการสื่อสารช่วยให้พูดถึงสิ่งที่กังวล',[flag('ceremony_questions'),memory('caution'),when('sound_play',memory('kindness'))]),
  c('interests','ทบทวนสิ่งที่ชอบโดยไม่รีบตัดสินอาชีพ','ใช้คำถามและภาพงานเก่าเป็นตัวช่วยคิด เปลี่ยนใจภายหลังได้',[flag('ceremony_interests'),memory('ambition'),when('workshop_observer',memory('curiosity')),when('library_notes',memory('curiosity'))]),
  c('family','คุยกับผู้ดูแลว่าจะเตรียมวันเดินทางอย่างไร','ยังไม่เสียเงินหรือย้ายเมือง คนในบ้านช่วยวางแผนร่วมกัน',[flag('ceremony_family_plan'),bond('caregivers',2),when('calls_caregiver',bond('caregivers'))]),
 ]},
 {id:'child.eve',sourceId:'life_evt_049',month:138,maxMonth:143,requirements:{completed:['child.invitation']},title:'เวลาของตนก่อนวันพิธี',text:'อีกไม่กี่เดือนจะอายุสิบสอง คุณกับผู้ดูแลทบทวนความพร้อมใน{location.name} พิธียังรอได้และจะให้คุณเลือกเองทุกขั้น สิ่งที่ทำวันนี้เป็นกำลังใจและแนวฝึก ไม่ใช่การเพิ่มระดับพลัง',choices:[
  c('diary','ทบทวนบันทึกงานที่เคยฝึกหรือช่วยไว้','ต้องเคยแสดงงานฝึก ช่วยทบทวนหนังสือ หรือจดความเห็นในงานเรียน ได้แนวฝึกความเข้าใจเพิ่ม 1 ต่อครั้ง',[flag('ready_diary'),learn('wis'),memory('ambition'),when('ceremony_interests',memory('curiosity'))],{requirements:{anyFlags:['child_shown_practice','library_notes','child_fair_recorder']},requirementHint:'ต้องมีบันทึกจากการแสดงงานฝึก ช่วยทบทวนหนังสือ หรือจดความเห็นในงานเรียน'}),
  c('talk','คุยเรื่องที่กังวลแล้วขอให้คนที่ไว้ใจไปด้วย','ได้แนวฝึกการสื่อสารเพิ่ม 1 ต่อครั้ง การเคยขอครูช่วยทำให้เปิดใจง่ายขึ้น',[flag('ready_family'),learn('cha'),bond('caregivers',2),when('seeks_mediator',bond('caregivers'))]),
  c('rest','จัดเวลาพักกับผู้ดูแลและไม่เร่งตนเอง','ได้แนวฝึกความอึดเพิ่ม 1 ต่อครั้งเมื่อพร้อมลงมือ การพักไม่ปิดเส้นทางพิธี',[flag('ready_rest'),learn('con'),memory('caution',2),when('rest_signals',bond('caregivers'))]),
 ]},
];
for(const event of schoolEvents)for(const choice of event.choices)choice.id=`${event.id}.${choice.id}`;
