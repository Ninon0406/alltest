// Playable adaptations of V7 briefs; the JSON pack remains authoring material.
const memory=(key,amount=1)=>({op:'memory',key,amount});
const bond=(key,amount=1)=>({op:'relationship',key,amount});
const flag=key=>({op:'flag',key});
const when=(key,...effects)=>({op:'when',key,effects});
const choice=(id,label,description,effects,requires)=>({id,label,description,effects,requires});
export const developmentEvents=[
 {id:'dev.warmth',sourceId:'life_evt_001',month:0,maxMonth:2,title:'เสียงหัวใจในห้องอุ่น',text:'คุณยังเป็นทารกแรกเกิดในบ้านที่{location.name} ผู้ดูแลประคองศีรษะและคอยตอบรับเสียงร้อง สิ่งที่เลือกคือปฏิกิริยาเล็ก ๆ ของทารก ไม่ใช่เป้าหมายหรือความสามารถในอนาคต',choices:[
  choice('voice','สงบลงเมื่อได้ยินเสียงคุ้น','ผู้ดูแลจำทำนองที่ช่วยปลอบคุณ และนำมาใช้เมื่อคุณต้องการพัก',[memory('kindness'),bond('caregivers'),flag('familiar_voice')]),
  choice('face','มองใบหน้าผู้ดูแลในระยะใกล้','ผู้ดูแลสบตาเบา ๆ แล้วเว้นให้พัก ไม่เร่งให้ติดตามสิ่งใด',[memory('curiosity'),bond('caregivers'),flag('familiar_face')]),
  choice('comfort','ส่งเสียงเล็ก ๆ เมื่ออยากให้ปลอบ','ผู้ดูแลอุ้มและจัดเวลาพักตามสัญญาณของคุณ',[memory('caution'),bond('caregivers',2),flag('asks_comfort')]),
 ]},
 {id:'dev.mobile',sourceId:'life_evt_008',month:3,maxMonth:5,title:'โมบายไม้เหนือเบาะ',text:'ผู้ดูแลแขวนของเล่นชิ้นใหญ่พ้นมือและอยู่ข้างคุณเสมอ คุณเริ่มสนใจเสียง สี และการเคลื่อนไหวมากขึ้น แต่ไม่ต้องทำได้เหมือนเด็กคนอื่น',choices:[
  choice('reach','ขยับมือเข้าหาสีที่สนใจ','ผู้ดูแลวางของเล่นผ้าปลอดภัยใกล้มือ',[memory('curiosity'),flag('touch_play')]),
  choice('listen','หันไปทางเสียงกระดิ่งเบา ๆ','หยุดเสียงเมื่อคุณแสดงท่าทีว่าเหนื่อย',[memory('caution'),flag('sound_play')]),
  choice('coo','ส่งเสียงตอบผู้ดูแล','ผู้ดูแลเว้นจังหวะแล้วส่งเสียงตอบกลับ',[memory('kindness'),bond('caregivers'),flag('voice_play')]),
 ]},
 {id:'dev.floor',sourceId:'life_evt_011',month:6,maxMonth:11,title:'โลกเล็ก ๆ บนเสื่อ',text:'เสื่อกว้างสะอาดอยู่ห่างของชิ้นเล็กและมุมคม ผู้ดูแลเฝ้าอยู่ใกล้ คุณขยับ นั่ง หรือเริ่มคลานตามความพร้อมได้ ไม่มีการทดสอบว่าต้องทำได้ในวันนี้',choices:[
  choice('toy','เอื้อมแตะของเล่นผ้าใกล้ตัว','สัมผัสและลองขยับเท่าที่สบาย',[memory('curiosity'),flag('safe_exploring')]),
  choice('call','ส่งเสียงเรียกคนคุ้นเคย','ผู้ดูแลขยับมาใกล้และชวนเล่นด้วยกัน',[memory('kindness'),bond('caregivers'),flag('calls_caregiver')]),
  choice('rest','พักบนเบาะเมื่อเริ่มเหนื่อย','ผู้ดูแลตอบรับสัญญาณ ไม่เร่งให้คลานหรือยืน',[memory('caution'),bond('caregivers'),flag('rest_signals')]),
 ]},
 {id:'dev.steps',sourceId:'life_evt_016',month:12,maxMonth:23,title:'ก้าวตามจังหวะของตน',text:'มือผู้ดูแลอยู่ใกล้พื้นเรียบที่บ้าน หากพร้อมคุณลองเกาะหรือก้าวโดยมีคนรับ หากยังไม่พร้อมก็เล่นบนพื้นได้ การพักไม่ได้ปิดเส้นทางใดในอนาคต',choices:[
  choice('support','ลองก้าวโดยจับมือผู้ดูแล','ความไว้วางใจสะสมจากการมีคนคอยรับ',[memory('curiosity'),bond('caregivers'),flag('supported_steps'),when('asks_comfort',bond('caregivers',2))]),
  choice('floor','เล่นต่อของชิ้นใหญ่บนเสื่อ','เรียนรู้รูปทรงโดยไม่ต้องเดิน',[memory('curiosity',2),flag('patient_play')]),
  choice('song','พักแล้วฟังเพลงกับคนในบ้าน','ทำนองคุ้นเคยช่วยให้ช่วงพักอบอุ่นขึ้น',[memory('kindness'),bond('caregivers'),flag('shared_song'),when('familiar_voice',memory('kindness',2))]),
 ]},
 {id:'dev.sharing',sourceId:'life_evt_019',month:24,maxMonth:35,title:'ของเล่นที่ผลัดกันถือ',text:'เด็กเพื่อนบ้านมานั่งเล่นโดยมีผู้ใหญ่ดูแลทั้งสองคน คุณยังเรียนรู้การรอและสื่อสารได้ทีละน้อย ผู้ดูแลช่วยบอกความต้องการแทนได้เสมอ',choices:[
  choice('share','ส่งของเล่นให้เพื่อนแล้วรอผู้ใหญ่ช่วยผลัด','เริ่มความคุ้นเคยกับการเล่นร่วมกัน',[memory('kindness',2),bond('community'),flag('shared_toy')]),
  choice('parallel','เล่นของอีกชิ้นข้าง ๆ กัน','อยู่ใกล้เพื่อนโดยไม่ต้องฝืนแบ่งทันที',[memory('curiosity'),flag('parallel_play')]),
  choice('help','เรียกผู้ดูแลมาช่วยบอกว่าอยากเล่นต่อ','ฝึกสื่อสารความต้องการอย่างปลอดภัย',[memory('caution'),bond('caregivers'),flag('asks_help')]),
 ]},
 {id:'dev.river',sourceId:'life_evt_027',month:36,maxMonth:71,title:'แม่น้ำในนิทานของบ้าน',text:'ผู้ดูแลเล่าเรื่องแม่น้ำและวาดภาพง่าย ๆ บนกระดาษ คุณยังไม่ต้องอ่านออกหรือออกเดินทางเอง เรื่องที่ถามวันนี้อาจกลายเป็นความสนใจในวัยเรียน',choices:[
  choice('map','ชี้ภาพแล้วถามว่าน้ำไหลไปไหน','เก็บภาพวาดไว้ใช้สังเกตทางกับผู้ใหญ่ในภายหลัง',[memory('curiosity',2),flag('river_map')]),
  choice('story','เล่าเรื่องสัตว์ที่อาศัยอยู่ริมน้ำ','คนในบ้านช่วยต่อเรื่องโดยไม่ตัดสินว่าต้องถูกทุกคำ',[memory('kindness'),bond('caregivers'),flag('river_story')]),
  choice('play','เล่นบทบาทพายเรือบนเสื่อกับผู้ดูแล','เรียนรู้จังหวะและการเล่นด้วยกันภายในบ้าน',[memory('ambition'),flag('river_play')]),
 ]},
 {id:'dev.library',sourceId:'life_evt_039',month:72,maxMonth:95,title:'หนังสือที่หายจากชั้นเรียน',text:'ชั้นเรียนใน{location.name}หาหนังสือภาพไม่พบ ครูขอให้ช่วยโดยไม่กล่าวโทษใคร ความทรงจำที่บ้านอาจช่วยให้คุณเลือกวิธีที่สบายใจ',choices:[
  choice('together','ชวนเพื่อนหาทีละมุมกับครู','ความคุ้นเคยจากการผลัดของเล่นช่วยให้ร่วมมือกันได้ดีขึ้น',[bond('community'),flag('library_team'),when('shared_toy',bond('community',2))]),
  choice('remember','นั่งทบทวนภาพในเล่มกับผู้ดูแล','การฟังเสียงและเล่าเรื่องในวัยเล็กช่วยให้ทบทวนได้ละเอียดขึ้น',[memory('curiosity'),flag('library_notes'),when('familiar_voice',memory('curiosity',2)),when('river_story',memory('kindness'))]),
  choice('organize','จัดชั้นว่างและทำป้ายภาพให้ครู','เกิดมุมยืมหนังสือที่ดูแลได้โดยไม่ต้องใช้เงิน',[memory('caution',2),flag('library_order')]),
 ]},
 {id:'dev.purse',sourceId:'life_evt_045',month:96,maxMonth:119,title:'ถุงผ้าริมทางกลับบ้าน',text:'คุณเดินกับผู้ดูแลหลังเลิกเรียนแล้วพบถุงเงิน ไม่มีใครขอให้เด็กตามหาคนแปลกหน้าลำพัง ผู้ดูแลพร้อมไปกับคุณหรือรับช่วงตามหาเจ้าของ',choices:[
  choice('return','ให้ผู้ดูแลพาไปฝากประกาศที่ศาลาชุมชน','เจ้าของรับของคืนและจำความซื่อสัตย์ของคุณ',[bond('community',2),flag('returned_purse')]),
  choice('route','ช่วยวาดจุดที่พบให้ผู้ใหญ่ตามหา','ภาพแม่น้ำที่เคยถามช่วยให้อธิบายจุดสังเกตได้ดีขึ้น',[memory('curiosity'),flag('purse_route'),when('river_map',memory('curiosity',2),bond('community',2))]),
  choice('stay','รอกับครูแล้วให้ผู้ดูแลจัดการ','คุณรักษาขอบเขตที่ปลอดภัยและได้รับข่าวคืนของภายหลัง',[memory('caution',2),bond('caregivers'),flag('safe_wait')]),
 ]},
 {id:'dev.project',sourceId:null,month:120,maxMonth:143,title:'มุมอ่านหนังสือที่ช่วยกันสร้าง',text:'ชุมชนใน{location.name}กำลังจัดมุมอ่านและขอความช่วยเหลือเท่าที่เด็กทำไหว ทุกทางเลือกไม่เสียเงิน และไม่บังคับอาชีพในอนาคต',choices:[
  choice('welcome','ดูแลโต๊ะรับหนังสือกับผู้ใหญ่','เปิดให้คนที่เคยช่วยคืนของได้รับความไว้วางใจดูแลบัญชีเล็ก ๆ',[bond('community',2),memory('kindness'),flag('community_trust')],['returned_purse']),
  choice('guide','ทำภาพแนะนำมุมอ่านกับครู','ประสบการณ์จัดชั้นหรือสังเกตเส้นทางช่วยให้งานละเอียดขึ้น',[memory('curiosity'),flag('community_guide'),when('library_order',memory('caution',2)),when('purse_route',bond('community',2))]),
  choice('read','อ่านนิทานให้เด็กเล็กโดยมีครูช่วย','เพื่อนจากงานหนังสือเก่ามาช่วยเตรียม ทำให้คุณมีกำลังใจ',[memory('kindness'),flag('community_reader'),when('library_team',bond('community',2)),when('library_notes',memory('curiosity',2))]),
 ]},
];

for(const event of developmentEvents)for(const c of event.choices)c.id=`${event.id}.${c.id}`;
