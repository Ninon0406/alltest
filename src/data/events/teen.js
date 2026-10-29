// Original playable adaptations, not executable imports of the draft library.
const flag=key=>({op:'flag',key});
const bond=(key,amount=1)=>({op:'relationship',key,amount});
const learn=(key,amount=1)=>({op:'learning',key,amount});
const when=(key,...effects)=>({op:'when',key,effects});
const memory=(key,amount=1)=>({op:'memory',key,amount});
const c=(id,label,description,effects,extra={})=>({id,label,description,effects,...extra});
export const teenEvents=[
 {id:'teen.application',sourceId:'life_evt_050',month:145,maxMonth:180,requirements:{awakeningComplete:true},title:'ใบสมัครที่ยังเปิดหลายทาง',text:'หลังผ่านพิธี ผู้ประสานงานใน{location.name}ชวนอ่านเงื่อนไขการเรียน คุณไม่จำเป็นต้องเลือกอาชีพวันนี้ และทุกทางยังฝึกฟรีได้ การสมัครครั้งนี้ไม่ย้ายเมือง',choices:[
  c('grant','ยื่นประวัติเพื่อขอส่วนลดค่าเรียน','ได้สิทธิ์ลดค่าเข้าเรียนจาก 12 เหลือ 4 เหรียญในเหตุการณ์ค่าเรียน',[flag('scholarship_offer'),when('community_trust',bond('community',2))]),
  c('trial','ขอทดลองแนวการเรียนด้วยการสังเกต','ได้คำแนะนำช่วยฝึกสติปัญญาเพิ่ม 1 ประสบการณ์ต่อครั้ง',[flag('trial_student'),learn('int')]),
  c('local','เลือกเรียนรู้กับอาจารย์ชุมชน','มีผู้ช่วยทบทวนการฝึกความเข้าใจโดยไม่เก็บค่าแรกเข้า',[flag('community_student'),learn('wis'),bond('community')]),
 ]},
 {id:'teen.funding',sourceId:'life_evt_051',month:150,maxMonth:204,requirements:{completed:['teen.application']},title:'ค่าเรียนกับเงินที่มีจริง',text:'ใบสมัครมีทางเลือกเรียนต่อ ค่าลงทะเบียนปกติ 12 เหรียญ ผู้ได้รับทุนจ่ายเพียง 4 เหรียญ หากยังไม่สะดวกก็ฝึกงานเบาหรือเรียนกับชุมชนฟรีได้ ทุกทางมีผลต่อวิธีฝึกครั้งถัดไป',choices:[
  c('enroll','จ่ายค่าลงทะเบียนตามสิทธิ์','ฝึกสติปัญญาและความเข้าใจได้เพิ่มอย่างละ 1 ประสบการณ์ต่อครั้ง',[flag('school_enrolled'),learn('int'),learn('wis')],{cost:{gold:12,discountFlag:'scholarship_offer',discount:8}}),
  c('apprentice','เลือกฝึกงานเบาโดยไม่จ่ายค่าแรกเข้า','มีคำแนะนำด้านความคล่อง เพิ่มประสบการณ์การฝึก 1 ต่อครั้ง',[flag('local_apprentice'),learn('dex')]),
  c('community','เรียนฟรีกับชุมชนและช่วยจัดตำรา','ช่วยงานเท่าที่ไหว มีคนช่วยทบทวนการสังเกต',[flag('free_learning'),learn('per'),bond('community')]),
 ]},
 {id:'teen.lessons',sourceId:'life_evt_054',month:162,maxMonth:228,title:'ห้องเรียนที่ไม่ถามฐานะ',text:'ครูอาสาใน{location.name}เปิดห้องเรียนให้ผู้ที่มีเวลาต่างกัน แม้ยังพักพิธีไว้ก็เข้าร่วมได้ วันนี้เป็นการเลือกแนวทางเรียน ไม่ใช่การฝึกจนชำนาญทันที',choices:[
  c('basics','ขอแนวฝึกพื้นฐานจากครู','ครูช่วยทบทวนความเข้าใจเพิ่ม 1 ต่อครั้ง บันทึกก่อนพิธีช่วยต่อยอดคำแนะนำได้อีก 1 ภายในเพดานเดิม',[flag('lesson_basics'),learn('wis'),when('ready_diary',learn('wis'))]),
  c('organize','อาสาจัดสื่อการเรียนและรายการยืม','ได้แนวฝึกการสังเกตจากงานจัดสื่อ',[flag('lesson_steward'),learn('per'),when('library_order',bond('community',2))]),
  c('invite','ชวนคนที่ขาดทุนมาลงชื่อด้วยกัน','เรียนวิธีสื่อสารกับคนหลายวัยและสร้างความไว้ใจ',[flag('lesson_host'),learn('cha'),bond('community',2)]),
 ]},
 {id:'teen.mentor',sourceId:'life_evt_052',month:174,maxMonth:216,requirements:{completed:['teen.lessons']},title:'คำแนะนำก่อนรับงานแรก',text:'ครูและเจ้าหน้าที่กิลด์มาคุยเรื่องงานในชุมชน ไม่มีสัญญาบังคับหรือภารกิจเสี่ยงให้เยาวชนรับทันที คุณเลือกสิ่งที่อยากเตรียมก่อนลงมือฝึกและทำงานจริงได้',choices:[
  c('practice','ขอคู่มือฝึกความอึดอย่างพอดี','เมื่อฝึกความอึดจริง จะได้ประสบการณ์เพิ่ม 1 ต่อครั้ง',[flag('mentor_practice'),learn('con')]),
  c('contract','อ่านขอบเขตหน้าที่และค่าจ้างให้เข้าใจ','ได้แนวทางคิดต้นทุนและถามรายละเอียดก่อนรับงาน',[flag('contract_literate'),learn('int'),memory('caution')]),
  c('service','วางแผนช่วยงานส่วนรวมตามกำลัง','มีเครือข่ายแนะนำงาน เมื่อทำงานอาชีพจริงได้ค่าจ้างเพิ่ม 1 เหรียญ',[flag('service_network'),{op:'wage',amount:1},bond('community')]),
 ]},
 {id:'teen.budget',sourceId:'life_evt_061',month:182,maxMonth:300,title:'สมุดค่าใช้จ่ายของบ้าน',text:'คนในบ้านชวนคุยเรื่องค่าใช้จ่ายโดยไม่โยนภาระทั้งหมดให้คุณ ไม่มีหนี้ที่ถูกสร้างขึ้นลับ ๆ วันนี้เลือกได้ว่าจะช่วยด้วยเวลา ความเข้าใจ หรือเงินที่มีจริง',choices:[
  c('plan','ช่วยแยกค่าใช้จ่ายจำเป็นกับสิ่งที่รอได้','ทบทวนบัญชีร่วมกัน ทำให้กลับมาขอคำแนะนำได้ง่าย',[flag('family_budget'),bond('caregivers',2),learn('int')]),
  c('contribute','แบ่งเงิน 6 เหรียญให้ครอบครัว','หักจากกระเป๋าจริง เพิ่มความผูกพันและจำการช่วยครั้งนี้',[flag('family_contribution'),bond('caregivers',3)],{cost:{gold:6}}),
  c('talk','บอกขีดจำกัดแล้ววางแผนกับผู้ใหญ่','ไม่เสียเงิน ครอบครัวตกลงช่องทางติดต่อเมื่อใครต้องการพัก',[flag('family_boundaries'),bond('caregivers',2),memory('caution')]),
 ]},
 {id:'teen.exhibition',sourceId:'life_evt_059',month:188,maxMonth:252,title:'พื้นที่แสดงงานที่ไม่บังคับแข่ง',text:'งานชุมชนใน{location.name}เปิดรับทั้งผู้แสดง ผู้ช่วย และผู้มาชม คุณไม่ต้องอวดวิชาที่ไม่เคยฝึก และการเป็นผู้ชมก็เป็นทางเลือกที่มีคุณค่า',choices:[
  c('show','นำสมุดฝึกที่ลงมือทำจริงไปขอคำแนะนำ','ต้องเคยฝึกจริง ได้แนวฝึกความคล่องเพิ่ม และต่อยอดงานที่เคยแสดงในวัยเรียนได้ภายในเพดานเดิม',[flag('shown_practice'),learn('dex'),when('child_shown_practice',learn('dex')),when('trial_student',bond('community',2))],{requirements:{practiced:true}}),
  c('host','ช่วยต้อนรับและจัดพื้นที่กับผู้ใหญ่','เพิ่มความไว้ใจและแนวทางฝึกการสื่อสาร',[flag('exhibition_host'),bond('community',2),learn('cha')]),
  c('observe','เป็นผู้ชมและจดสิ่งที่ยังไม่เข้าใจ','ได้คำถามกลับไปทบทวน ไม่ได้อ้างว่าเรียนวิชาใหม่สำเร็จแล้ว',[flag('exhibition_notes'),learn('int'),memory('curiosity')]),
 ]},
 {id:'teen.invitation',sourceId:'life_evt_063',month:198,maxMonth:300,title:'คำชวนที่ยังไม่ต้องออกเดินทาง',text:'นักเดินทางแวะเล่าเรื่องเส้นทางรอบ{location.name} คุณเลือกเตรียมตัวหรืออยู่ต่อได้ วันนี้ไม่มีการเคลื่อนย้ายตำแหน่ง การเดินทางจริงยังต้องเลือกจุดหมายและจ่ายค่าเส้นทางจากหน้าชีวิต',choices:[
  c('route','ขอช่วยอ่านแผนที่และจุดพัก','ได้แนวฝึกการสังเกต ความรู้จุดพักที่เคยถามคาราวานช่วยต่อยอดอีก 1 ภายในเพดานเดิม',[flag('route_prepared'),learn('per'),when('caravan_map',learn('per')),when('river_map',bond('community',2)),when('purse_route',memory('curiosity',2))]),
  c('escort','ถามผู้คุ้มกันถึงการขอความช่วยเหลือ','ได้แนวฝึกความอึด งานที่เคยช่วยช่างต่อยอดคำแนะนำได้อีก 1 ภายในเพดานเดิม',[flag('escort_advice'),learn('con'),when('workshop_helper',learn('con')),memory('caution')]),
  c('stay','อยู่กับชุมชนและฝึกต่อก่อน','ไม่เสียเงินหรือย้ายเมือง ประสบการณ์ดูต้นไม้โตช้าช่วยทบทวนความเข้าใจเพิ่มภายในเพดานเดิม',[flag('stayed_to_prepare'),bond('caregivers',2),learn('wis'),when('seeds_patient',learn('wis'))]),
 ]},
 {id:'teen.direction',sourceId:'life_evt_064',month:206,maxMonth:360,title:'เรียนต่อ ฝึกงาน หรือค่อยเก็บทุน',text:'คุณเริ่มเห็นจังหวะชีวิตที่เหมาะกับตน การเลือกครั้งนี้เพิ่มแนวทางสนับสนุนการฝึกหรือรายได้ ไม่เลือกอาชีพแทนคุณและไม่ข้ามเวลาหนึ่งปีโดยพลการ',choices:[
  c('study','เรียนต่อโดยใช้พื้นฐานที่เตรียมไว้','ต้องเคยลงทะเบียนหรือมีสิทธิ์ทุน ได้คำแนะนำฝึกสติปัญญาเพิ่ม',[flag('study_direction'),learn('int'),when('exhibition_notes',learn('wis'))],{requirements:{anyFlags:['school_enrolled','scholarship_offer']}}),
  c('craft','ต่อยอดเส้นทางฝึกงานในชุมชน','เพิ่มแนวฝึกความคล่อง ประสบการณ์ฝึกงานเก่าช่วยด้านความอึด',[flag('craft_direction'),learn('dex'),when('local_apprentice',learn('con'))]),
  c('work','เลือกเก็บทุนจากงานที่รับไหว','เมื่อทำงานอาชีพจริง ค่าจ้างเพิ่ม 1 เหรียญ ไม่มีรายได้ล่วงหน้า',[flag('work_direction'),{op:'wage',amount:1},when('family_budget',bond('caregivers'))]),
 ]},
 {id:'teen.sponsor',sourceId:'life_evt_065',month:214,maxMonth:360,title:'ข้อเสนอที่ขอเวลาอ่านได้',text:'ผู้สนับสนุนส่งเอกสารทุนมาให้ใน{location.name} เงื่อนไขยังไม่ชัด คุณยังไม่ได้รับเงินหรือมีหนี้ การขอผู้ใหญ่ช่วยอ่านหรือปฏิเสธไม่ทำให้เส้นทางฟรีหายไป',choices:[
  c('review','ขอเวลาอ่านกับผู้มีประสบการณ์','แนวทางอ่านสัญญาช่วยให้ได้คำแนะนำละเอียดขึ้น',[flag('reviewed_offer'),memory('caution'),when('contract_literate',learn('int'))]),
  c('teacher','ขอครูช่วยตรวจเงื่อนไขและเปรียบเทียบทุนฟรี','เครือข่ายครูช่วยทบทวนความเข้าใจ ความร่วมมือเก่าช่วยสร้างความไว้ใจ',[flag('teacher_review'),learn('wis'),when('lesson_host',bond('community',2))]),
  c('decline','ปฏิเสธและเก็บแนวเรียนของตนไว้','รักษาเวลาของตนและติดต่อชุมชนเมื่ออยากฝึกต่อ',[flag('declined_offer'),bond('community'),learn('per')]),
 ]},
 {id:'teen.family',sourceId:'life_evt_066',month:222,maxMonth:360,title:'ข่าวถึงบ้านจากที่ที่คุณอยู่',text:'ไม่ว่าคุณยังอยู่ใกล้บ้านหรือเลือกเดินทางไปแล้ว คนในบ้านอยากฟังชีวิตช่วงนี้ คุณติดต่อจาก{location.name}ได้โดยไม่ถูกย้ายกลับบ้านอัตโนมัติ หากจะไปเยี่ยมจริงให้เลือกเส้นทางเดินทางเมื่อพร้อม',choices:[
  c('plans','คุยเรื่องแผนของบ้านและถามว่าช่วยอะไรได้','ครอบครัวที่เคยจัดงบหรือได้รับความช่วยเหลือพร้อมเปิดใจมากขึ้น',[flag('family_plans'),bond('caregivers'),when('family_budget',bond('caregivers',2)),when('family_contribution',bond('caregivers',2))]),
  c('stories','เล่าประสบการณ์และรับฟังเรื่องเล็ก ๆ ของบ้าน','บทสนทนา เพลง และภาพส่งเพื่อนในวัยเด็กกลายเป็นสิ่งเชื่อมโยง',[flag('family_stories'),bond('caregivers'),when('farewell_album',bond('caregivers')),when('river_story',memory('kindness',2)),when('shared_song',bond('caregivers',2))]),
  c('rest','บอกว่าเหนื่อยและนัดเวลาติดต่อที่สบายใจ','ขอบเขตที่เคยคุยไว้ช่วยให้ขอพักโดยไม่รู้สึกผิด',[flag('family_rest'),bond('caregivers'),when('family_boundaries',bond('caregivers',2)),memory('caution')]),
 ]},
 {id:'teen.letter',sourceId:null,month:228,maxMonth:239,title:'จดหมายที่ไม่ตัดสินแทนเพื่อน',text:'เพื่อนจากชุมชนขอความเห็นเรื่องการเรียนกับงาน คุณไม่จำเป็นต้องรู้คำตอบทั้งหมด เลือกช่วยด้วยประสบการณ์จริงหรือพาไปหาคนที่พร้อมรับฟังได้',choices:[
  c('study','แบ่งวิธีเตรียมเรียนและสิ่งที่ยังยาก','ต้องเคยเลือกเรียนต่อ ประสบการณ์ติดต่อเพื่อนที่ย้ายบ้านช่วยต่อยอดคำแนะนำฝึกสติปัญญา',[flag('shared_study_method'),bond('community',2),learn('int'),when('penpal_address',learn('int'))],{requirements:{allFlags:['study_direction']}}),
  c('listen','ฟังเป้าหมายของเพื่อนก่อนแนะนำทางเลือก','ไม่บังคับให้เลือกเหมือนคุณ วิธีฟังกติกาในวัยเรียนช่วยต่อยอดคำแนะนำการสื่อสาร',[flag('listened_to_friend'),bond('community',2),learn('cha'),when('patient_listener',learn('cha'))]),
  c('connect','ชวนคุยกับครูอาสาในเวลาที่สะดวก','การช่วยห้องเรียนหรือจัดวงส่งเพื่อนทำให้เพื่อนกล้าขอความช่วยเหลือ',[flag('connected_teacher'),bond('community'),when('farewell_host',bond('community')),when('lesson_host',bond('community',2)),learn('wis')]),
 ]},
 {id:'teen.review',sourceId:null,month:234,maxMonth:239,title:'สิ่งที่อยากพกไปสู่วัยผู้ใหญ่',text:'ก่อนอายุยี่สิบ คุณทบทวนสิ่งที่เลือกไว้ ชีวิตยังเปลี่ยนทิศได้ ทุนหรือคำแนะนำไม่ใช่อำนาจวิเศษ แต่ช่วยให้การฝึกและการทำงานจริงครั้งต่อไปค่อย ๆ ดีขึ้น',choices:[
  c('craft','ดูแลวิธีฝึกให้ยั่งยืนก่อนรีบรับงานเพิ่ม','ประสบการณ์ฝึกงานหรือแสดงงานช่วยต่อยอดการฝึกความคล่อง',[flag('adult_craft_plan'),learn('con'),when('craft_direction',learn('dex')),when('shown_practice',bond('community'))]),
  c('community','ให้ความสัมพันธ์และชุมชนเป็นหลักยึด','คนที่เคยช่วยงานต้อนรับและเชื่อมครูพร้อมแนะนำงานมากขึ้น',[flag('adult_community_plan'),bond('community',2),when('exhibition_host',{op:'wage',amount:1}),when('connected_teacher',bond('community'))]),
  c('study','เก็บคำถามและขอบเขตของตนไว้เรียนต่อ','คนที่เคยแบ่งวิธีเรียนได้แนวทบทวนเพิ่ม โดยไม่ปิดเส้นทางงาน',[flag('adult_study_plan'),memory('curiosity',2),when('shared_study_method',learn('int')),when('reviewed_offer',learn('wis'))]),
 ]},
];
for(const event of teenEvents)for(const choice of event.choices)choice.id=`${event.id}.${choice.id}`;
