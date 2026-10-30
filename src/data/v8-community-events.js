import {c,e} from './v8-story-schema.js';

// Interleaved, once-only callbacks. These are community jobs, not twenty new career arcs.
export const v8CommunityEvents=[
 e('family-table',78,'เวลาบนโต๊ะอาหาร','การเรียนทำให้เวลาที่บ้านเปลี่ยนไป คนในครอบครัวชวนคุยว่าจะช่วยกันจัดวันธรรมดาอย่างไร',[
  c('listen','ฟังทุกคนแล้วแบ่งเวลาอยู่ด้วยกัน','คุณจดจำว่าการตกลงกันเริ่มจากการฟัง',{bonds:7,flag:'familyListening'}),
  c('chores','ช่วยเก็บของหลังอาหารตามกำลัง','งานเล็กไม่เบียดเวลาเรียน และทุกคนเห็นความตั้งใจ',{happiness:4,bonds:4,flag:'familyHelping'},{timeDays:1}),
  c('space','ขอเวลาส่วนตัวและนัดคุยกันวันหยุด','คนในบ้านรับรู้ขอบเขตที่คุณต้องการ',{happiness:7,flag:'familySpace'}),
 ],{context:'home'}),
 e('hard-assignment',102,'การบ้านที่ยังไม่เข้าใจ','ครูให้สังเกตเงาในช่วงเช้ากับเย็น แต่คำอธิบายในสมุดของคุณยังไม่ตรงกัน ส่งคำถามแทนคำตอบที่เดาได้',[
  c('revise','ลองสังเกตใหม่กับผู้ดูแลแล้วแก้สมุด','คุณเก็บทั้งสิ่งที่เห็นและสิ่งที่ยังไม่แน่ใจ',{knowledge:8,flag:'revisedNotes'},{timeDays:3}),
  c('teacher','นัดครูที่เคยช่วยอ่านมาทบทวนด้วยกัน','ครูใช้ภาพช่วยแยกคำถามเป็นเรื่องเล็กที่ลองทำได้',{knowledge:6,bonds:5,flag:'assignmentMentor'},{timeDays:1,requires:{flags:['teacherContact']}}),
  c('change','เปลี่ยนเป็นบันทึกต้นไม้ใกล้บ้าน','คุณเลือกโจทย์ที่เข้าใจได้ และยังส่งงานโดยไม่ต้องซื้อของ',{knowledge:4,happiness:5,flag:'fieldLearner'}),
 ],{context:'classroom'}),
 e('public-project',126,'วันเล่าสิ่งที่ค้นพบ','ห้องเรียนเปิดพื้นที่เล่างานที่ทำเอง ไม่มีคะแนนจากการซื้ออุปกรณ์ คุณเลือกเวทีที่สบายใจได้',[
  c('present','อธิบายสมุดและตอบเฉพาะสิ่งที่รู้','คุณแยกข้อสังเกตกับข้อสันนิษฐานให้ผู้ฟังเข้าใจ',{knowledge:6,trust:1,flag:'publicNotes'},{timeDays:2,requires:{knowledge:25}}),
  c('together','ทำภาพร่วมกับเพื่อนแล้วแบ่งกันเล่า','งานที่แก้ด้วยกันช่วยให้เพื่อนเข้าใจเรื่องต่างจากคุณ',{knowledge:3,bonds:7,flag:'sharedProject'},{timeDays:2}),
  c('later','ขอเก็บงานไว้ก่อนและฟังคนอื่น','การยังไม่พร้อมพูดไม่ได้ทำให้งานของคุณหมดค่า',{happiness:6,flag:'privateProject'}),
 ],{context:'classroom'}),
 e('open-study',180,'สมุดนอกตารางเรียน','ห้องอ่านหนังสือเปิดมุมค้นคว้าฟรีให้ผู้เรียนหลายแบบ ครูชวนเลือกคำถามที่อยากตามต่อโดยไม่บังคับเรียนพลัง',[
  c('notebook','เทียบสมุดเก่ากับหนังสืออ้างอิง','คุณบันทึกที่มาของข้อมูลไว้เพื่อกลับมาตรวจอีกครั้ง',{knowledge:9,flag:'researchNotebook'},{timeDays:4,followUp:'v8.archive-review'}),
  c('interview','ขออนุญาตจดวิธีทำงานจากคนในชุมชน','บันทึกแยกคำบอกเล่าจากสิ่งที่คุณเห็นเองอย่างชัดเจน',{knowledge:5,bonds:5,flag:'communityNotes'},{timeDays:3,followUp:'v8.archive-review'}),
  c('unhurried','ยืมอ่านตามสนใจโดยไม่รับโครงการเพิ่ม','คุณเก็บเวลาว่างไว้และยังเข้าใช้ห้องอ่านได้',{happiness:7,knowledge:3}),
 ],{requires:{anyFlags:['studyGroup','scholarshipMentor','selfStudy']},context:'classroom'}),
 e('family-reunion',228,'มื้ออาหารที่ต่างคนต่างโต','ญาติในชุมชนนัดแบ่งอาหารและคุยเรื่องที่เคยเห็นไม่ตรงกัน คุณไม่จำเป็นต้องรับความคาดหวังทุกอย่างกลับไป',[
  c('reconcile','ฟังให้จบแล้วบอกสิ่งที่ตนทำได้','คำคุยบนโต๊ะวัยเด็กช่วยให้คุณวางข้อตกลงใหม่โดยไม่สัญญาเกินกำลัง',{bonds:9,flag:'familyReconciled'},{timeDays:1,requires:{flags:['familyListening']},followUp:'v8.family-letter'}),
  c('meal','ช่วยเตรียมอาหารและนัดพบครั้งสั้น ๆ','คุณรักษาการติดต่อผ่านสิ่งที่ทำร่วมกันได้',{bonds:7,happiness:4,flag:'familyMeals'},{timeDays:1,followUp:'v8.family-letter'}),
  c('boundaries','ส่งคำทักทายและรักษาพื้นที่ของตน','คุณไม่ฝืนไปร่วมงาน และบอกช่องทางติดต่อที่สะดวก',{happiness:8,flag:'familyDistance'}),
 ],{context:'home'}),
 e('workshop-commission',252,'งานชิ้นเล็กของส่วนรวม','ชุมชนต้องการผู้ช่วยจัดป้ายกับอุปกรณ์งานเทศกาล ข้อตกลงระบุว่าจ่ายหลังตรวจรับในฤดูหน้า คุณเลือกไม่รับได้',[
  c('limited','รับส่วนที่ทำไหวและสำรองวัสดุ 8 เหรียญ','คุณส่งงานครบเจ็ดวัน บัญชีบันทึกค่าจ้างรอรับ 28 เหรียญ เงินนี้ยังใช้จ่ายไม่ได้',{wagesDue:28,flag:'commissionDelivered'},{timeDays:7,costGold:8,stamina:12,followUp:'v8.delayed-payment'}),
  c('partner','ช่วยทีมส่วนหนึ่งโดยไม่สำรองเงิน','คุณทำงานสี่วันและตกลงค่าจ้างส่วนของตนรอรับ 10 เหรียญ',{wagesDue:10,bonds:4,flag:'commissionTeam'},{timeDays:4,stamina:6,followUp:'v8.delayed-payment'}),
  c('decline','ไม่ผูกเงินและเวลากับงานระยะนี้','คุณเก็บกำลังกับเงินไว้สำหรับแผนของตน',{happiness:7,flag:'commissionDeclined'}),
 ],{requires:{anyFlags:['firstContract','workPartner','apprentice']}}),
 e('archive-review',264,'ตรวจเรื่องที่จดไว้','สมุดจากมุมค้นคว้ายังมีข้อความที่หาแหล่งอ้างอิงไม่พบ ผู้ดูแลห้องอ่านถามว่าจะจัดการส่วนที่ไม่แน่ใจอย่างไร',[
  c('verify','เทียบหลักฐานและเขียนข้อจำกัดให้ครบ','คุณลบข้อสรุปที่ยืนยันไม่ได้ และเก็บบันทึกที่ตรวจสอบต่อได้',{knowledge:8,flag:'researchVerified'},{timeDays:5,requires:{knowledge:40},followUp:'v8.community-library'}),
  c('voices','ให้เจ้าของเรื่องอ่านและแก้คำบอกเล่า','คุณคืนสิทธิ์แก้ไขให้คนที่ร่วมให้ข้อมูล',{bonds:8,knowledge:4,flag:'notesReturned'} ,{timeDays:3}),
  c('private','เก็บไว้เป็นสมุดส่วนตัวก่อน','คุณไม่เผยแพร่สิ่งที่ยังไม่มั่นใจ',{happiness:7,flag:'researchShelved'}),
 ],{requires:{anyFlags:['researchNotebook','communityNotes']},context:'classroom'}),
 e('delayed-payment',255,'ค่าจ้างที่ยังไม่ถึงมือ','งานที่ส่งแล้วตรวจรับครบ แต่การจ่ายช้ากว่านัด ผู้ประสานงานยืนยันยอดค้างรับในบัญชีและขอให้คุณเลือกวิธีรับเงิน',[
  c('collect','ยื่นใบส่งงานและรับยอดค้างทั้งหมด','หลักฐานเดิมทำให้คุณรับเงินที่ทำงานไว้ครบ ยอดรอรับถูกปิด',{trust:1,flag:'wagesCollected'},{timeDays:1,special:'collect-wages'}),
  c('part','รับครึ่งหนึ่งก่อนและเก็บยอดที่เหลือ','คุณได้เงินส่วนหนึ่งจริง อีกส่วนยังเป็นค่าจ้างค้างรับ ไม่ใช่เงินในกระเป๋า',{bonds:3,flag:'wagesDeferred'},{special:'part-wages',followUp:'v8.payment-followup'}),
  c('release','ยกยอดให้กองงานส่วนรวมโดยสมัครใจ','คุณไม่ได้เงินจากยอดนี้ บัญชีปิดด้วยการยกให้ตามความยินยอมของคุณ',{bonds:7,trust:2,flag:'wagesGifted'},{special:'waive-wages'}),
 ],{requires:{wagesDue:1},ageMaxMonths:257}),
 e('payment-followup',258,'บัญชีที่ยังเปิดอยู่','ผู้ประสานงานนำยอดค่าจ้างส่วนที่เหลือกลับมาให้ตรวจ คุณยังเป็นผู้เลือกว่าจะรับหรือยกให้ส่วนรวม',[
  c('collect','ตรวจยอดแล้วรับส่วนที่เหลือ','เงินค้างส่วนสุดท้ายเข้ากระเป๋าจริงและบัญชีปิดลง',{flag:'wagesClosed'},{special:'collect-wages'}),
  c('records','ขอสำเนาบัญชีและรับยอดพร้อมกัน','คุณได้ทั้งเงินที่เหลือและหลักฐานเพื่ออธิบายงานครั้งหน้า',{knowledge:4,flag:'paymentRecords'},{timeDays:2,special:'collect-wages'}),
  c('release','ยกยอดที่เหลือให้ห้องอ่านฟรี','คุณเลือกปิดบัญชีด้วยการแบ่งให้โดยไม่อ้างว่าได้รับเงิน',{trust:2,bonds:5,flag:'wagesGifted'},{special:'waive-wages'}),
 ],{requires:{flags:['wagesDeferred'],wagesDue:1},ageMaxMonths:263}),
 e('family-letter',336,'จดหมายเว้นช่องว่าง','ญาติส่งหน้ากระดาษเก่าที่เล่าเรื่องบ้านมาคนละตอน หลายเรื่องจำไม่เหมือนกันและไม่จำเป็นต้องตัดสินว่าใครถูกทั้งหมด',[
  c('exchange','เขียนตอบและเก็บเรื่องที่ต่างกันไว้','การติดต่อครั้งก่อนกลายเป็นจดหมายที่ทุกคนเติมเรื่องของตนได้',{bonds:9,flag:'familyLetters'},{timeDays:2}),
  c('visit','นัดคุยสั้น ๆ และฟังโดยไม่ทำหนังสือ','คุณเลือกความใกล้ชิดโดยไม่ทำความทรงจำให้เป็นงาน',{happiness:6,bonds:6,flag:'familyVisits'},{timeDays:1}),
  c('private','ขอบคุณแล้วเก็บกระดาษไว้เป็นส่วนตัว','คุณไม่จำเป็นต้องเปิดเรื่องของครอบครัวให้คนอื่นอ่าน',{happiness:8,flag:'familyPrivacy'}),
 ],{requires:{anyFlags:['familyReconciled','familyMeals']},context:'home'}),
 e('unfair-request',348,'คำขอที่ไม่ตรงกับข้อตกลง','ผู้จัดงานขอให้ลงชื่อรับรองชั่วโมงที่ยังไม่ได้ทำ คุณเลือกปฏิเสธได้โดยไม่ต้องเสี่ยงพิสูจน์ตนเอง',[
  c('document','บันทึกงานที่ทำจริงและขอแก้รายการ','ตารางที่ถูกต้องกลายเป็นตัวอย่างให้ผู้ร่วมงานตรวจสอบกันได้',{knowledge:6,trust:2,flag:'documentedWork'},{timeDays:2}),
  c('refuse','ปฏิเสธอย่างชัดเจนแล้วรับเฉพาะงานเดิม','คุณรักษาขอบเขตโดยไม่รับภาระโต้เถียงต่อ',{happiness:7,flag:'workBoundaries'}),
  c('leave','จบงานตามสิทธิ์และพักหางานที่เหมาะกว่า','คุณออกจากคำขอที่ไม่สบายใจโดยไม่มีค่าปรับหรือเงินรางวัล',{health:3,happiness:5,flag:'leftUnfairWork'}),
 ],{requires:{anyFlags:['firstContract','workPartner','apprentice','steadyWork','businessTrial']}}),
 e('rival-alliance',384,'คนที่เคยแข่งงานกัน','ผู้ร่วมงานเก่าเสนอแบ่งงานครั้งเล็กและเปิดต้นทุนให้ตรวจร่วมกัน การร่วมมือครั้งนี้ไม่มีสัญญาผูกชีวิต',[
  c('trial','ทดลองทีมเล็กด้วยต้นทุนคนละ 10 เหรียญ','คุณจ่ายต้นทุนจริงและทำตารางตรวจงานร่วมกัน ใครไม่พร้อมรับงานต่อก็บอกได้',{bonds:6,flag:'allianceTrial'},{costGold:10,timeDays:4,followUp:'v8.alliance-review'}),
  c('fair','แลกข้อมูลแล้วแยกทำงานอย่างเป็นธรรม','ต่างฝ่ายเก็บพื้นที่ของตนและเลิกตัดราคาด้วยข่าวลือ',{trust:2,knowledge:4,flag:'fairCompetition'},{timeDays:1}),
  c('decline','ปฏิเสธและรักษาขอบเขตเดิม','คุณไม่ต้องรับความเสี่ยงร่วมเพราะเกรงใจ',{happiness:7,flag:'allianceDeclined'}),
 ],{requires:{anyFlags:['documentedWork','workBoundaries','leftUnfairWork']}}),
 e('alliance-review',456,'สมุดต้นทุนสองลายมือ','งานทดลองสิ้นสุดแล้ว รายรับ 18 เหรียญเป็นส่วนของคุณก่อนหักต้นทุนเดิม อีกฝ่ายชวนตรวจบัญชีก่อนแยกย้าย',[
  c('audit','ตรวจทุกรายการแล้วรับส่วนของตน','คุณรับ 18 เหรียญหลังงานจริง และเก็บบัญชีที่ทั้งสองฝ่ายยืนยัน',{gold:18,knowledge:6,flag:'allianceAudited'},{timeDays:2}),
  c('share','ยืนยันยอดแล้วแบ่งครึ่งให้กองงานชุมชน','คุณรับส่วนของตน 9 เหรียญและสมัครใจแบ่งอีก 9 เหรียญ',{gold:9,bonds:9,flag:'allianceShared'},{timeDays:1}),
  c('gift','ตรวจยอดแล้วยกส่วนของตนให้กองงานทั้งหมด','คุณไม่รับเงิน 18 เหรียญ ปิดบัญชีแล้วแยกย้ายตามข้อตกลง',{bonds:12,trust:2,flag:'allianceGifted'}),
 ],{requires:{flags:['allianceTrial']}}),
 e('community-library',528,'ชั้นหนังสือที่เปิดให้ทุกคน','ห้องอ่านอยากเก็บสมุดที่คุณตรวจไว้ แต่ยังต้องจัดหน้าและทำดัชนีให้คนอื่นใช้ได้ คุณเลือกส่งต่อเท่าที่พร้อม',[
  c('publish','ทำสำเนากับดัชนีแล้วเปิดให้อ่านฟรี','บันทึกที่มีที่มาได้ที่อยู่บนชั้นสาธารณะ ไม่มีค่าเข้าถึง',{knowledge:8,trust:2,flag:'libraryPublished'},{timeDays:5,requires:{knowledge:50},followUp:'v8.school-return'}),
  c('circle','อ่านด้วยกันกลุ่มเล็กโดยไม่ทำสำเนา','คำถามจากคนอื่นช่วยให้คุณทบทวนงานอีกครั้ง',{knowledge:4,bonds:8,flag:'readingCircle'},{timeDays:2}),
  c('hold','เก็บสมุดไว้และบริจาคเวลาเฉพาะที่สะดวก','คุณช่วยได้โดยไม่รับภาระงานเขียนระยะยาว',{happiness:7,bonds:3,flag:'libraryLimits'}),
 ],{requires:{flags:['researchVerified']},context:'classroom'}),
 e('care-circle',624,'เวรช่วยเหลือที่ไม่มีใครต้องแบกคนเดียว','เพื่อนบ้านวัยต่างกันชวนจัดเวลาช่วยซื้อของและเตรียมอาหารให้คนที่ขอความช่วยเหลือ ทุกคนมีสิทธิ์เว้นวันพัก',[
  c('organize','ทำตารางอาสาและลงเวรตามกำลัง','คุณช่วยสามวันและแบ่งหน้าที่ที่คนอื่นรับต่อได้',{bonds:9,trust:2,flag:'careCircleStarted'},{timeDays:3,followUp:'v8.care-handover'}),
  c('fund','สมทบค่าอาหาร 12 เหรียญโดยไม่รับเวร','เงินออกจากกระเป๋าจริงและคุณไม่ถูกผูกตาราง',{bonds:7,happiness:4,flag:'careFood'},{costGold:12}),
  c('limits','แจ้งข้อจำกัดและบอกช่องทางขอความช่วยเหลือ','คุณรักษากำลังของตนโดยไม่ตัดสิทธิ์การรับความช่วยเหลือ',{health:4,happiness:6,flag:'careLimits'}),
 ],{requires:{bonds:20}}),
 e('care-handover',720,'ตารางที่เขียนชื่อคนรุ่นใหม่','กลุ่มอาสามีคนพร้อมรับงานต่อ คุณไม่ต้องเป็นผู้ประสานงานตลอดไปและไม่มีใครถูกบังคับรับช่วง',[
  c('share','ช่วยปรับตารางแล้วส่งอำนาจตัดสินใจต่อ','คนรุ่นใหม่จัดเวรของตนได้ และคุณอยู่ในกลุ่มตามกำลัง',{bonds:10,flag:'careCircleShared'},{timeDays:2}),
  c('mentor','สอนวิธีรับคำขอโดยเคารพขอบเขต','กลุ่มได้แนวทางถามความสมัครใจก่อนจัดความช่วยเหลือ',{knowledge:6,bonds:6,flag:'careCircleTaught'},{timeDays:2}),
  c('retire','ขอหยุดหน้าที่และรับการดูแลเมื่อจำเป็น','คุณส่งต่องานทั้งหมดโดยไม่ต้องแลกด้วยความเหนื่อยเพิ่ม',{health:6,happiness:7,flag:'careCircleRetired'}),
 ],{requires:{flags:['careCircleStarted']}}),
 e('work-handover',744,'ใบส่งงานของคนเริ่มใหม่','ผู้ช่วยรุ่นใหม่ถามว่าควรตกลงงานอย่างไรไม่ให้ใครเสียเปรียบ คุณมีสิทธิ์เลือกว่าจะส่งต่อประสบการณ์แบบใด',[
  c('records','ทำตัวอย่างบันทึกเวลาจากงานที่ตรวจจริง','คุณส่งต่อหลักฐานที่เคยแก้และบัญชีงานร่วมที่ปิดแล้ว',{knowledge:6,trust:3,flag:'workPassedOn'},{timeDays:3,requires:{flags:['documentedWork','allianceAudited'],wagesClear:true}}),
  c('talk','เล่าเรื่องขอบเขตและแนะนำคนช่วยตรวจ','ผู้ช่วยรู้ว่าจะขอความเห็นจากคนอื่นก่อนรับภาระได้',{bonds:8,flag:'workAdvice'},{timeDays:1}),
  c('rest','ขอพักและบอกตรง ๆ ว่ายังไม่สะดวกสอน','คุณไม่รับผิดชอบงานเพิ่มเพียงเพราะเคยทำมานาน',{health:5,happiness:6,flag:'workRetired'}),
 ],{requires:{anyFlags:['steadyWork','documentedWork','workBoundaries','leftUnfairWork']}}),
 e('school-return',816,'คนอ่านสมุดที่ไม่เคยพบกัน','ผู้เรียนรุ่นใหม่ส่งคำถามจากสมุดบนชั้นอ่านฟรี เขาอยากทำฉบับของตนโดยแก้ส่วนที่พบหลักฐานใหม่',[
  c('pass','อนุญาตให้แก้และช่วยชี้ที่มาของข้อมูล','งานของคุณถูกใช้และปรับต่อได้โดยไม่ต้องรอผู้เขียนเดิม',{knowledge:6,trust:2,flag:'schoolLegacy'},{timeDays:3}),
  c('meet','คุยครั้งเดียวแล้วปล่อยให้เขาเลือกวิธีเอง','คุณส่งกำลังใจโดยไม่ต้องร่วมงานเขียนฉบับใหม่',{bonds:8,happiness:4,flag:'readerMeeting'},{timeDays:1}),
  c('rest','ตอบขอบคุณสั้น ๆ และพักตามแผน','สมุดเดิมยังเปิดให้อ่าน แต่คุณไม่รับงานเพิ่ม',{health:5,happiness:6,flag:'readerRest'}),
 ],{requires:{flags:['libraryPublished']},context:'classroom'}),
];
