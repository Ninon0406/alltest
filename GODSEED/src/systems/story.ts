import type {State} from '../engine/state';
import {satisfies} from '../engine/conditions';
import type {Choice,StoryScene} from '../content/story';
import {pathProgress} from './life-paths';
import {itemNames} from './spells';

export function choiceAvailability(state:State,choice:Choice){
 if(choice.spellId&&!state.known.includes(choice.spellId))return {enabled:false,reason:choice.lockedHint||'ค้นพบสูตรที่ใช้ในเหตุการณ์นี้ก่อน'};
 const enabled=(!choice.requires||!!state.flags[choice.requires])&&(!choice.when||choice.when.every(condition=>satisfies(state,condition)));
 if(!enabled)return {enabled:false,reason:choice.lockedHint||'คุยกับคุโรก่อน'};
 const missing=Object.entries(choice.costs||{}).find(([id,n])=>(state.inventory[id]||0)<n);
 return missing?{enabled:false,reason:`ต้องมี ${itemNames[missing[0]]||missing[0]} ${missing[1]} ชิ้น`}:{enabled:true,reason:''};
}
export const clueFacts=[
 {flag:'forest_clue',name:'ลวดลายโน้ตในป่า'},
 {flag:'stream_clue',name:'จังหวะกระดิ่งในลำธาร'},
 {flag:'archive_read',name:'บันทึกเสียงสะท้อนของไอรา'},
 {flag:'ruins_clue',name:'จารึกโบราณสถาน'},
] as const;
export const clueCount=(state:State)=>clueFacts.filter(clue=>state.flags[clue.flag]).length;
/** Authored expression of verified facts; revisiting never reruns their effects. */
export function narrativeText(state:Pick<State,'flags'>,scene:StoryScene){return scene.variants?.find(v=>state.flags[v.flag])?.text??scene.text;}
export function nextHint(state:State){
 if(state.flags.lp_alchemist_started&&!state.flags.alc_completed){const next=pathProgress(state).find(p=>p.id==='ALCHEMIST')!;return next.rank===2?'กลับไปหาทาลา แล้วเลือกฝากน้ำค้างหรือสอนวิธีให้ผู้เดินทาง':next.next;}
 if(state.flags.a2_returned&&!state.flags.lp_alchemist_started)return 'ทาลาผู้ปรุงเวทรอคุยเรื่องถนนป่าที่โรงช่าง เลือกพบผู้ปรุงเวทจากสถานที่อื่นเพื่อเริ่มบทเรียนใหม่';
 if(state.flags.a2_returned)return 'คุณนำเรื่องจากถนนป่ากลับมาแล้ว รากและสิ่งที่เลือกฝากไว้ยังอยู่ กลับไปอ่านบันทึกได้ หรือเรียนเส้นทางชีวิตและทดลองเวทต่อ เนื้อหา ARC 2 ส่วนต่อไปยังพัฒนาอยู่';
 if(state.flags.a2_started)return state.flags.a2_decided?'นำสิ่งที่เลือกฝากไว้กลับไปเล่าให้ลูมิ มาเรน และไอรา แล้วรับวัสดุทดลองที่บทสรุป':'เตรียมเวทคุ้มกันกับคุโร แล้วฟังรากและโพรงในถนนป่า ผู้ถักรากหลีกได้ด้วยการรอ ทุกทางมีทางกลับ';
 if(state.flags.chapter1_complete)return 'บทแรกจบแล้ว คุณกลับไปช่วยหมู่บ้าน เรียนเส้นทางชีวิต หรือทดลองเวทต่อได้ เลือกฟังเสียงตอบจากรากไม้ในสถานที่อื่นเพื่อเริ่มการสำรวจบทที่สอง';
 if(state.flags.guardian_trial_complete)return 'ผู้พิทักษ์พร้อมฟังแล้ว เลือกวิธีคืนเพลงให้ครอบครัว ชุมชน หรือหอสมุด';
 if(state.flags.guardian_journey_started)return 'รับชุดเตรียมตัว อ่านจารึก และเลือกจังหวะทดสอบกับไอรา ก่อนพบผู้พิทักษ์สามระยะ ตั้งรับและพักก่อนสู้ได้';
 if(state.flags.echo_expedition_complete)return 'กลับไปทดลองวัสดุที่เลือกจากลานเสียงย้อน หรือเรียนเส้นทางชีวิตที่ยังสนใจ หรือเลือกตามไอราไปพบผู้พิทักษ์รอยลืมในสถานที่อื่นที่จัตุรัส';
 if(state.flags.echo_expedition_started)return state.flags.echo_trial_resolved?'นำสิ่งที่เรียนรู้กลับไปเล่าให้มาเรน ไอรา และลูมิ แล้วรับของขอบคุณเพื่อจบการเดินทาง':'เตรียมเวทที่โรงช่าง แล้วฟังรูปแบบที่ลานเสียงย้อน เลือกสู้หรือให้ไอราช่วยแยกรูนได้';
 if(state.flags.arc1_opening_complete){const paths=pathProgress(state),learning=paths.find(p=>p.started&&p.rank<2);if(learning)return learning.name+' · '+learning.next+' กลับทางแยกในจัตุรัสเพื่อเรียนต่อได้';if(paths.every(p=>p.rank===2))return 'ทั้งสองสายเรียนพื้นฐานสำเร็จแล้ว ลองนำแผนที่ไปเล่าให้มาเรนฟังที่ทางแยก หรือใช้สำรวจจังหวะและรากคุ้มภัยในการต่อสู้';return 'หลังคืนแรก คุณเลือกเรียนจากพิพหรือมาเรนได้ที่ทางแยกในจัตุรัส แต่ละสายมีภาคสนาม การฝึก และความสามารถต่างกัน';}
 if(state.flags.festival_ready)return 'ช่วยซ่อมกล่องกับคุโร เรียงโน้ตกับไอรา และเตรียมโคมครบแล้วจึงรวมวงซ้อม ทุกงานมีวิธีทำด้วยมือโดยไม่บังคับหาเวทหายาก';
 if(state.flags.lumi_helped&&state.flags.crafted_first&&state.flags.archive_read&&clueCount(state)>=2)return 'จัตุรัสกำลังเตรียมงานเพลงแรก ลองกลับไปช่วยเพื่อนบ้าน แล้วเลือกว่าคุณอยากรักษาสิ่งใดไว้ด้วยกัน';
 if(!state.flags.lumi_helped)return 'ลูมิที่บ่อน้ำกำลังตามหาทำนองของคุณยาย ลองฟังเรื่องของเธอ';
 if(!state.flags.crafted_first)return 'ไปโรงช่างของคุโร รับส่วนผสมและผสมเวทบทแรกด้วยตัวเอง';
 if(!state.flags.archive_read)return 'ไอราในหอสมุดอาจรู้ว่าเสียงเพลงที่หายไปถูกเก็บไว้ที่ใด';
 if(state.flags.ruins_open&&!state.flags.ruins_clue)return 'แผนที่ของไอราเปิดทางสู่โบราณสถานแล้ว ใช้บันทึกรูนหรือกล่องเพลงได้โดยไม่ต้องสู้กับหุ่น';
 if(!state.flags.stream_clue)return 'ตามเสียงกระดิ่งไปลำธาร ใช้เวทลม ช่วยรากไม้ หรือฟังจังหวะน้ำก็ได้';
 if(!state.flags.forest_clue)return 'ลองสังเกตสิ่งที่ต้นอ่อนเฝ้าอยู่ในป่า คุณไม่จำเป็นต้องต่อสู้เสมอไป';
 if(state.flags.song_fragment)return 'โน้ตศาลเจ้าอยู่ในสมุดแล้ว กลับไปเล่าให้ไอราหรือคุณยายฟัง หรือทดลองเวทจากวัตถุดิบใหม่';
 return 'จดทำนองจากป่า ลำธาร และหอสมุดไว้แล้ว ลองกลับไปฟังไอราและคุณยายอีกครั้ง';
}
/** Authored facts only. Rendering cannot invent progress or grant rewards. */
export function rememberedLines(state:State,scene:StoryScene):string[]{
 if(scene.npc==='tala-v18'&&state.flags.alc_completed)return [state.flags.alc_field_delivery?'ทาลาจำได้ว่าคุณฝากน้ำค้างจริงไว้ข้างม้านั่ง และเขียนขอบเขตวิธีใช้ไว้ให้คนถัดไป':'ทาลาเก็บวิธีสอนที่คุณแบ่งปันไว้คู่กับข้อจำกัด น้ำค้างที่เลือกเก็บไม่ได้ถูกนำไปอ้างว่าฝากในป่า'];

 if(scene.stage==='forest_road'&&state.flags.a2_pip_trusted)return ['พิพเว้นระยะให้เจ้าของโพรงเหมือนที่คุณเคยเว้นเวลามันแบ่งผลไม้ มิตรภาพครั้งเล็กทำให้มีทางอ้อมที่สงบ'];
 if(scene.id==='S02_HUB'&&state.flags.a2_returned)return [state.flags.a2_resolution_care?'มาเรนวางใบนัดตรวจรากไว้ข้างสมุด ถนนยังมีเขตพักให้ต้นอ่อนฟื้นตัว':state.flags.a2_resolution_path?'ลูมิลองอ่านป้ายที่คุณทำให้คนเดินช้า แล้วแก้ลูกศรในภาพของเธอให้บอกจุดพักด้วย':'ไอราเปิดสำเนาถนนป่าไว้คู่กับวันที่และระดับน้ำ คนถัดมาถามต่อได้โดยไม่ต้องเชื่อคำเดา'];
 if(state.flags.chapter1_complete&&(scene.id==='S02_HUB'||scene.id==='S27_EPILOGUE'))return [state.flags.chapter1_family?'ลูมินั่งฟังยายร้องหลังอาหาร เพลงของบ้านหลังหนึ่งเดินทางต่อผ่านผู้ที่กลับไปฟัง':state.flags.chapter1_community?'วงเพลงข้างน้ำพุเริ่มใหม่ได้เสมอ คนที่มาช้าไม่ต้องร้องแข่งใคร พิพคอยเคาะจังหวะให้':'สำเนาบทเพลงเปิดอยู่พร้อมชื่อผู้เล่า คนถัดมาเพิ่มคำถามได้โดยไม่ลบเสียงของคนก่อน'];
 if(scene.id==='S23_DECISION')return [state.flags.guardian_family_promise?'ผู้พิทักษ์ได้ยินคำถามที่คุณสัญญากับลูมิไว้ เขากลัวว่าจะไม่มีใครกลับมาฟัง':state.flags.echo_report_knowledge?'บันทึกที่คุณไม่เติมคำเดาช่วยให้ไอราแยกเรื่องของผู้เฝ้าออกจากเสียงที่ผนึกทวนมา':'ช่วงเงียบที่คุณเคยเว้นให้ปมเสียงย้อน กลายเป็นที่ให้ผู้พิทักษ์เล่าเรื่องของตนเอง'];
 if(scene.stage==='glade'&&state.flags.echo_trial_resolved)return [state.flags.battle_B04_done?'ปมแสงจำการสลับจังหวะของคุณได้ มันรอให้น้ำไหลผ่านก่อนตอบ รางวัลชัยชนะครั้งแรกจะไม่เกิดซ้ำ':'วงรูนที่คุณกับไอราแยกไว้ยังมีช่องว่าง ปมแสงไม่จำเป็นต้องแพ้เพื่อให้ใครได้ผ่าน'];
 if(scene.id==='S02_HUB'&&state.flags.echo_expedition_complete)return [state.flags.echo_report_care?'มาเรนฝากเก้าอี้ไว้ข้างน้ำพุ ลูมิลองเว้นจังหวะให้ยายร้องต่อ การเดินทางของคุณกลับมาเป็นเวลาที่คนในหมู่บ้านใช้ร่วมกัน':'ไอราวางรายงานเสียงย้อนไว้ให้คนอื่นตรวจซ้ำ ทั้งคำตอบและข้อจำกัดยังอยู่ครบ ไม่ต้องเริ่มจากศูนย์อีก'];
 if((scene.id==='S00_WAKE'||scene.id==='S02_TREE'||scene.id==='LP_EXPLORER_BRIEF')&&state.flags.lp_explorer_rank2)return ['พิพหยุดรอที่ป้ายใบไม้ซึ่งคุณช่วยทำไว้ มันจำได้ว่าแผนที่ของคุณเว้นที่ให้คนเดินช้าด้วย'];
 if(scene.stage==='garden'&&state.flags.lp_nature_rank2)return ['มาเรนยกบัวรดน้ำให้ดู รากที่คุณช่วยดูแลไม่ต้องให้ใครยืนเฝ้าตลอดเวลา “เธอรู้แล้วว่าควรคุ้มกันเมื่อใด และควรปล่อยให้มันเติบโตเมื่อใด”'];
 if(scene.id==='S02_HUB'&&state.flags.arc1_opening_complete)return [state.flags.a1_resolution_care?'โคมข้างทางยังสว่าง ผู้สูงวัยเดินผ่านได้อย่างสบาย มาเรนจำได้ว่าคุณเลือกทำให้งานนี้มีที่นั่งสำหรับทุกคน':state.flags.a1_resolution_knowledge?'สมุดสำเนาวางอยู่ใต้โคม ไอราเปิดไว้ให้คนต่อไปเขียนเพิ่ม ความรู้นี้ไม่ต้องมีเจ้าของเพียงคนเดียว':'เสียงเพลงจากกล่องดังเบา ๆ ลูมิชวนเพื่อนบ้านร้องท่อนที่แต่ละคนเลือก ไม่มีใครต้องร้องดังที่สุดเพื่ออยู่ในวง'];
 if((scene.id==='S00_WAKE'||scene.id==='S02_TREE')&&state.flags.tree_memory)return ['ใบไม้หมุนลงตรงปลายเท้า พิพส่งเสียงตอบเบา ๆ คุณจำช่วงเงียบที่มีเพื่อนอยู่ข้าง ๆ ได้อีกครั้ง'];
 if(scene.id==='S06_GARDEN'&&state.flags.maren_listened)return ['มาเรนเคาะจังหวะเพลงเดิมให้คุณจำ “ถ้าทำนองไหนหายไป ลองฟังช่วงเงียบระหว่างโน้ตดูนะ” เธอขยับที่บนม้านั่งราวกับจำได้ว่าคุณเคยนั่งฟังอยู่ตรงนั้น'];
 if(scene.id==='S06_GARDEN'&&state.flags.garden_tended)return ['ดอกไม้ที่คุณช่วยรดน้ำชูช่ออยู่ข้างทาง มาเรนยิ้ม “เห็นไหม พวกมันจำมือที่อ่อนโยนได้ เมล็ดที่ได้ไป ลองนำไปผสมเวทเยียวยาดูสิ”'];
 if(scene.id==='S03B_MAREN'&&state.choices.includes('CH1203'))return ['มาเรนรับหยดน้ำอย่างระวัง “น้ำยังจำจังหวะของกระดิ่งได้ ขอบใจที่นำเสียงของลำธารมาฝากนะ”'];
 if(scene.id==='S15_RUINS'&&state.flags.song_fragment)return ['โน้ตที่คุณเคยฟังตอบรับจากแผ่นหิน ไอราจำรอยจดของคุณได้ ทางนี้ยังเปิดให้กลับมาฟังเสมอ'];
 if(scene.id==='S15_RUINS'&&state.flags.ruins_clue)return ['รูนที่คุณช่วยเรียงยังส่องแสง ไอราวางมือลงบนสมุดหน้าเดิม ประตูจำจังหวะของคุณได้แล้ว'];
 if(scene.id==='S07_ARCHIVE'){
  if(state.flags.archive_notes_complete)return ['ไอราเก็บสำเนาจารึกไว้ข้างแผนที่ “คราวนี้บันทึกไม่ได้มีแค่รอยหมึกแล้ว มันมีคนที่กลับมาเล่าให้ฟังด้วย”'];
  if(state.flags.song_fragment)return ['ไอราฮัมตามโน้ตจากศาลเจ้า “ขอบใจที่ไม่ปล่อยให้ช่วงเงียบนั้นหายไป”'];
  if(state.flags.stream_clean)return ['ไอราปิดสมุดเล่มเล็ก “เธอช่วยให้ลำธารกลับมาใสแล้ว กระดิ่งคงได้หายใจอีกครั้ง”'];
  if(state.flags.stream_clue)return ['“เธอจำจังหวะกระดิ่งได้หรือ? บางครั้งการฟังก็เก็บสิ่งที่มือเอื้อมไม่ถึง” ไอราเลื่อนแผนที่มาให้'];
  if(state.flags.forest_clue)return ['“ลายโน้ตในป่าตรงกับแผนที่เล่มนี้” ไอราชี้รอยหมึกที่เคยจาง “ขอบใจที่นำเรื่องของมันกลับมา”'];
  if(state.flags.archive_read)return ['ไอราวางที่คั่นรูนไว้หน้าเดิม “ฉันเก็บหน้านี้ให้ เผื่อเธออยากฟังมันอีกครั้ง”'];
 }
 if((scene.id==='S11_STREAM'||scene.id==='S12_STREAM_RESULT')&&state.flags.stream_clean)return ['หมอกใต้สะพานจางลง น้ำใสเผยเงาปลาตัวเล็ก พิพก้มดูจนเกือบสะดุดหางตัวเอง'];
 if(scene.id==='S12_STREAM_RESULT'&&state.flags.stream_clue)return ['คุณจำจังหวะกระดิ่งนี้ได้แล้ว เสียงมันยังอยู่ในสมุด แม้กลับมาฟังอีกครั้ง'];
 return [];
}
