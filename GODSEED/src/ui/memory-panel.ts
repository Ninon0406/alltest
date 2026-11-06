import type {State} from '../engine/state';
import {clueCount,clueFacts,nextHint} from '../systems/story';
import {questSummary} from '../content/quests';

export function memoryPanel(host:HTMLElement,state:State){
 const text=(tag:string,value:string)=>{const node=document.createElement(tag);node.textContent=value;host.append(node);};
 host.replaceChildren();text('h1','โลกจดจำ');
 text('p',`เบาะแสบทเพลงที่ค้นพบ ${clueCount(state)} แห่ง`);
 text('h2','ลองทำต่อ');text('p',nextHint(state));
 const active=questSummary(state).filter(q=>q.status!=='available');if(active.length){text('h2','สมุดภารกิจ');for(const quest of active){text('h3',quest.title+' · '+(quest.status==='completed'?'สำเร็จ':'กำลังทำ'));text('p',`${quest.completedObjectives}/${quest.totalObjectives} · ${quest.nextObjective||quest.rewardText}`);}}
 text('h2','เบาะแสที่จดไว้');
 for(const clue of clueFacts)if(state.flags[clue.flag])text('p',clue.name+' · บันทึกแล้ว');
 if(state.flags.stream_clean)text('p','ลำธารกลับมาใส · หมอกใต้สะพานจางลง');
 if(state.choices.includes('CH1201'))text('p','ช่วยกระดิ่งจากรากไม้ · เก็บกระดิ่งเก่าไว้แล้ว');
 if(state.flags.archive_read)text('p','ไอราเก็บหน้ารูนไว้ให้ · อ่านร่องรอยบนแผนที่แล้ว');
 if(state.flags.song_fragment)text('p','โน้ตจากจารึกแห่งคำสัญญา · บันทึกทำนองแล้ว');
 if(state.flags.archive_notes_complete)text('p','ภารกิจบันทึกหอสมุด · สำเร็จ รับเส้นใยดาราและความไว้วางใจไอราครั้งแรกแล้ว');
 if(state.flags.battle_B03_done)text('p','หุ่นรูนเปิดทาง · บันทึกรางวัลชัยชนะครั้งแรกแล้ว');
 if(state.flags.festival_ready){text('h2','งานเพลงแรกของหมู่บ้าน');for(const [flag,label] of [['a1_musicbox_ready','ซ่อมกล่องดนตรี'],['a1_notes_ready','เรียบเรียงโน้ต'],['a1_lights_ready','เตรียมโคมไฟ']])text('p',label+(state.flags[flag]?' · พร้อม':' · ยังรอความช่วยเหลือ'));}
 if(state.flags.a1_festival_quest_complete)text('p','ภารกิจงานเพลงแรก · สำเร็จ รางวัลร่วมได้รับครั้งเดียวแล้ว');
 if(state.flags.arc1_opening_complete)text('p','บทสรุปช่วงเปิด · '+(state.flags.a1_resolution_care?'ดูแลผู้คน':state.flags.a1_resolution_knowledge?'ถ่ายทอดความรู้':'แบ่งปันเสียงเพลง')+' · ยังไม่ใช่ตอนจบของ GODSEED ทั้งเรื่อง');
 text('h2','ผู้คนที่ร่วมเรื่องราว');
 const names:Record<string,string>={LUMI:'ลูมิ',MAREN:'มาเรน',KORO:'คุโร',PIP:'พิพ',EIRA:'ไอรา'};
 for(const [id,value] of Object.entries(state.trust))text('p',`${names[id]||id}: ความไว้วางใจ ${value}`);
 text('h2','ความทรงจำระหว่างทาง');
 for(const line of state.journal.slice(-30))text('p',line);
}
