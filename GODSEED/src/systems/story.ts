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
 if(!state.flags.lumi_helped)return 'ลูมิที่บ่อน้ำกำลังตามหาทำนองของคุณยาย ลองฟังเรื่องของเธอ';
 if(!state.flags.crafted_first)return 'ไปโรงช่างของคุโร รับส่วนผสมและผสมเวทบทแรกด้วยตัวเอง';
 if(!state.flags.archive_read)return 'ไอราในหอสมุดอาจรู้ว่าเสียงเพลงที่หายไปถูกเก็บไว้ที่ใด';
 if(!state.flags.stream_clue)return 'ตามเสียงกระดิ่งไปลำธาร ใช้เวทลม ช่วยรากไม้ หรือฟังจังหวะน้ำก็ได้';
 if(!state.flags.forest_clue)return 'ลองสังเกตสิ่งที่ต้นอ่อนเฝ้าอยู่ในป่า คุณไม่จำเป็นต้องต่อสู้เสมอไป';
 return 'จดทำนองจากป่า ลำธาร และหอสมุดไว้แล้ว ลองกลับไปฟังไอราและคุณยายอีกครั้ง';
}
/** Authored facts only. Rendering cannot invent progress or grant rewards. */
export function rememberedLines(state:State,scene:StoryScene):string[]{
 if(scene.id==='S00_WAKE'&&state.flags.tree_memory)return ['ใบไม้หมุนลงตรงปลายเท้า พิพส่งเสียงตอบเบา ๆ ความเงียบใต้ต้นเมล็ดจึงกลายเป็นความทรงจำแรกที่มีเพื่อนอยู่ข้าง ๆ'];
 if(scene.id==='S03B_MAREN'&&state.choices.includes('CH1203'))return ['มาเรนรับหยดน้ำอย่างระวัง “น้ำยังจำจังหวะของกระดิ่งได้ ขอบใจที่นำเสียงของลำธารมาฝากนะ”'];
 if(scene.id==='S07_ARCHIVE'){
  if(state.flags.stream_clean)return ['ไอราปิดสมุดเล่มเล็ก “เธอช่วยให้ลำธารกลับมาใสแล้ว กระดิ่งคงได้หายใจอีกครั้ง”'];
  if(state.flags.stream_clue)return ['“เธอจำจังหวะกระดิ่งได้หรือ? บางครั้งการฟังก็เก็บสิ่งที่มือเอื้อมไม่ถึง” ไอราเลื่อนแผนที่มาให้'];
  if(state.flags.forest_clue)return ['“ลายโน้ตในป่าตรงกับแผนที่เล่มนี้” ไอราชี้รอยหมึกที่เคยจาง “ขอบใจที่นำเรื่องของมันกลับมา”'];
  if(state.flags.archive_read)return ['ไอราวางที่คั่นรูนไว้หน้าเดิม “ฉันเก็บหน้านี้ให้ เผื่อเธออยากฟังมันอีกครั้ง”'];
 }
 if((scene.id==='S11_STREAM'||scene.id==='S12_STREAM_RESULT')&&state.flags.stream_clean)return ['หมอกใต้สะพานจางลง น้ำใสเผยเงาปลาตัวเล็ก พิพก้มดูจนเกือบสะดุดหางตัวเอง'];
 if(scene.id==='S12_STREAM_RESULT'&&state.flags.stream_clue)return ['คุณจำจังหวะกระดิ่งนี้ได้แล้ว เสียงมันยังอยู่ในสมุด แม้กลับมาฟังอีกครั้ง'];
 return [];
}
