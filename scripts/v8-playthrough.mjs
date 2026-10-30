import {v8Decision,v8Focuses} from '../src/engine/v8-model.js';
import {chooseV8Policy} from './v8-simulation.mjs';
export async function v8Snapshot(page){await page.waitForFunction(()=>!!window.Game);return page.evaluate(()=>Game.snapshot);}
export async function startV8(page,{url='/',seed}={}){
 if(seed!==undefined)await page.addInitScript(()=>{const seed=Number(new URL(location.href).searchParams.get('v8-test-seed')),original=crypto.getRandomValues.bind(crypto);crypto.getRandomValues=array=>{if(array instanceof Uint32Array&&array.length===1){array[0]=seed;return array;}return original(array);};});
 const target=seed===undefined?url:`${url}${url.includes('?')?'&':'?'}v8-test-seed=${seed}`;
 page.on('dialog',dialog=>dialog.accept());await page.goto(target);await page.getByRole('button',{name:'เกิด',exact:true}).click();
 const birth=await v8Snapshot(page);if(birth.v8.stage!=='reveal'||birth.age!==0||seed!==undefined&&birth.birth.seed!==seed)throw Error('Not a genuine V8 birth reveal');
 await page.getByRole('button',{name:'เริ่มชีวิต',exact:true}).click();await pauseV8(page);return birth;
}
export async function pauseV8(page){const pause=page.getByRole('button',{name:'พักเวลา',exact:true});if(await pause.isVisible())await pause.click();}
export async function v8Focus(page,id){
 const s=await v8Snapshot(page);if(!v8Focuses(s).some(f=>f.id===id)||s.v8.focus===id||s.v8.nextFocus===id)return;
 await page.getByText('แนวชีวิตช่วงนี้',{exact:true}).click();await page.locator(`[data-focus-id="${id}"]`).click();
}
export async function playV8Until(page,{eventId=null,policy=0,awaken=false,focus=null,storyPath='quiet',choose=chooseV8Policy}={}){
 for(let step=0;step<240;step++){
  const s=await v8Snapshot(page),d=v8Decision(s);
  if(s.run.status==='ended'||d?.id===eventId)return s;
  if(s.v8.outcome)await page.getByRole('button',{name:'ดำเนินชีวิตต่อ',exact:true}).click();
  else if(d){const c=choose(d,policy,{awaken,state:s,storyPath});if(!c||c.disabled)throw Error(`Unavailable browser policy: ${d.id}`);await page.locator(`[data-choice-id="${c.id}"]`).click();}
  else{if(focus)await v8Focus(page,focus);await page.getByRole('button',{name:'ข้ามไปเหตุการณ์ถัดไป',exact:true}).click();}
 }
 throw Error('V8 browser flow stalled');
}
export async function finishV8(page,{policy=0,awaken=false,focus=policy===1?'study':policy===0?'bonds':policy===2?'work':'rest',storyPath='quiet',choose=chooseV8Policy}={}){
 const s=await playV8Until(page,{policy,awaken,focus,storyPath,choose});
 if(s.run.status!=='ended'||!s.run.endingId.startsWith('v8.')||s.age!==s.birth.lifespan)throw Error('Not a natural V8 ending');
 await page.waitForFunction(id=>{const raw=localStorage.getItem('reborn_finished_lives_v1');return raw&&JSON.parse(raw).lives.filter(r=>r.runId===id).length===1;},s.run.id);
 const summary=await page.evaluate(id=>JSON.parse(localStorage.getItem('reborn_finished_lives_v1')).lives.find(r=>r.runId===id),s.run.id);
 if(summary.time||summary.v8||summary.progression||summary.events.length>8)throw Error('Archive contains resumable state');
 return s;
}
