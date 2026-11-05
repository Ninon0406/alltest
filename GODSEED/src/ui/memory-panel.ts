import type {State} from '../engine/state';
import {clueCount,clueFacts,nextHint} from '../systems/story';

export function memoryPanel(host:HTMLElement,state:State){
 const text=(tag:string,value:string)=>{const node=document.createElement(tag);node.textContent=value;host.append(node);};
 host.replaceChildren();text('h1','โลกจดจำ');
 text('p',`เบาะแสบทเพลงที่ค้นพบ ${clueCount(state)} แห่ง`);
 text('h2','ลองทำต่อ');text('p',nextHint(state));
 text('h2','เบาะแสที่จดไว้');
 for(const clue of clueFacts)if(state.flags[clue.flag])text('p',clue.name+' · บันทึกแล้ว');
 if(state.flags.stream_clean)text('p','ลำธารกลับมาใส · หมอกใต้สะพานจางลง');
 if(state.choices.includes('CH1201'))text('p','ช่วยกระดิ่งจากรากไม้ · เก็บกระดิ่งเก่าไว้แล้ว');
 if(state.flags.archive_read)text('p','ไอราเก็บหน้ารูนไว้ให้ · อ่านร่องรอยบนแผนที่แล้ว');
 text('h2','ผู้คนที่ร่วมเรื่องราว');
 const names:Record<string,string>={LUMI:'ลูมิ',MAREN:'มาเรน',KORO:'คุโร',PIP:'พิพ',EIRA:'ไอรา'};
 for(const [id,value] of Object.entries(state.trust))text('p',`${names[id]||id}: ความไว้วางใจ ${value}`);
 text('h2','ความทรงจำระหว่างทาง');
 for(const line of state.journal.slice(-30))text('p',line);
}
