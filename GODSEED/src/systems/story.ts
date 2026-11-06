import type {State} from '../engine/state';
import {satisfies} from '../engine/conditions';
import type {Choice,StoryScene} from '../content/story';

export function choiceAvailability(state:State,choice:Choice){
 const enabled=(!choice.requires||!!state.flags[choice.requires])&&(!choice.when||choice.when.every(condition=>satisfies(state,condition)));
 return {enabled,reason:enabled?'':choice.lockedHint||'คุยกับคุโรก่อน'};
}
export const clueFacts=[
 {flag:'forest_clue',name:'ลวดลายโน้ตในป่า'},
 {flag:'stream_clue',name:'จังหวะกระดิ่งในลำธาร'},
 {flag:'archive_read',name:'บันทึกเสียงสะท้อนของไอรา'},
 {flag:'ruins_clue',name:'จารึกโบราณสถาน'},
] as const;
export const clueCount=(state:State)=>clueFacts.filter(clue=>state.flags[clue.flag]).length;
export function nextHint(state:State){
 if(state.flags.arc1_opening_complete)return 'งานเพลงของหมู่บ้านจบลงอย่างที่คุณเลือกแล้ว กลับไปดูโคมและเมล็ดที่จัตุรัส หรือค้นพบเวทจากวัตถุดิบที่เพื่อนบ้านมอบให้';
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
