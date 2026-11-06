/** Human-reviewed status data -> reproducible checklist. This validates records,
 * not gameplay correctness; a green validator cannot certify a DONE assertion. */
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {resolve,dirname,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
export const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
export const statuses={done:'✅ เสร็จสมบูรณ์',in_progress:'🟡 กำลังพัฒนา',not_started:'⬜ ยังไม่ได้เริ่ม',problem:'🔴 มีปัญหา',blocked:'⛔ ติดข้อจำกัด'};
export const locationAspects={reference:'ภาพอ้างอิง',structure:'โครงสร้าง',layers:'วัตถุ/เลเยอร์',collision:'Collision/Anchor',movement:'เดิน/Animation',story:'เหตุการณ์',effects:'เอฟเฟกต์',mobile:'Chromiumจำลอง',ready:'ฉากฉบับสมบูรณ์'};
export const domainIds=['systems','story','visual','magic','combat','quality'];
export function validate(data,fileExists=path=>existsSync(resolve(root,path))){
 const fail=message=>{throw Error('Roadmap: '+message);};
 if(data.schemaVersion!==2||!/^\d{4}-\d{2}-\d{2}$/.test(data.updated)||!data.baseCommit)fail('invalid version/date/base commit');
 if(!Array.isArray(data.phases)||data.phases.length!==14||data.phases.some((p,i)=>p.id!==i||!p.title))fail('expected fourteen unique ordered phases 0..13');
 if(!data.scopeDefinition?.trim()||data.directive!=='V6.0')fail('missing V6 scope definition');
 if(!Array.isArray(data.progressDomains)||data.progressDomains.map(d=>d.id).join()!==domainIds.join()||data.progressDomains.some(d=>!d.title))fail('expected six progress domains');
 const history=data.scopeHistory?.find(h=>h.directive==='V6.0');
 if(history?.previousPhases?.length!==8||!history.previousTasks?.length||new Set(history.previousTasks.map(t=>t.id)).size!==history.previousTasks.length)fail('missing legacy scope/phase/task history');
 const previousTotals=totals(history.previousTasks);if(['done','total','percent'].some(k=>history.previousChecklist?.[k]!==previousTotals[k]))fail('legacy checklist must match recorded task statuses');
 if(!Array.isArray(data.tasks)||!data.tasks.length)fail('empty tasks');
 const ids=new Set();
 for(const t of data.tasks){
  if(!/^[A-Z]+-\d{3}$/.test(t.id)||ids.has(t.id))fail('duplicate/invalid ID '+t.id);ids.add(t.id);
  if(!Object.hasOwn(statuses,t.status)||!['P0','P1','P2','P3','P4'].includes(t.priority)||!['v1','post-v1','optional'].includes(t.scope))fail('invalid status/priority/scope '+t.id);
  if(!data.phases.some(p=>p.id===t.phase)||!t.title?.trim()||!t.acceptance?.trim()||!t.evidence?.trim()||!t.reviewed)fail('missing review/acceptance/evidence '+t.id);
  if(!domainIds.includes(t.domain))fail('invalid progress domain '+t.id);
  if(!Array.isArray(t.dependsOn)||new Set(t.dependsOn).size!==t.dependsOn.length||!t.legacyIds?.every(id=>/^GS-\d{3}$/.test(id)))fail('invalid dependencies/legacy IDs '+t.id);
  if(!t.files?.length||t.files.some(p=>p.startsWith('/')||p.split('/').includes('..')||!fileExists(p)))fail('missing/unsafe source file '+t.id);
  if(t.status==='done'&&(!t.verification?.trim()||!t.evidenceFiles?.length||t.evidenceFiles.some(p=>!t.files.includes(p)&&!fileExists(p))))fail('DONE requires verification and existing evidence '+t.id);
 }
 for(const previous of history.previousTasks){const current=data.tasks.find(t=>t.id===previous.id);if(!current||current.legacyPhase!==previous.phase||current.legacyScope!==previous.scope)fail('legacy task/phase/scope was not retained '+previous.id);}
 if(!Array.isArray(data.workQueue)||new Set(data.workQueue).size!==data.workQueue.length||data.workQueue.some(id=>!ids.has(id)))fail('invalid work queue');
 const parent=data.tasks.find(t=>t.id==='FND-005');
 if(parent?.subtasks){
  if(parent.subtasks.length!==14||parent.subtasks.some((t,i)=>t.id!==`SAVE-${String(i+1).padStart(3,'0')}`))fail('expected SAVE-001..014 under FND-005');
  if(parent.status==='done'&&parent.subtasks.some(t=>t.status!=='done'))fail('manual save rollup cannot be DONE before its subtasks');
  validate({...data,tasks:[...data.tasks.map(t=>{const copy={...t};delete copy.subtasks;return copy;}),...parent.subtasks]},fileExists);
 }
 const byId=Object.fromEntries(data.tasks.map(t=>[t.id,t]));
 for(const t of data.tasks)for(const id of t.dependsOn)if(!ids.has(id)||id===t.id)fail('unknown/self dependency '+t.id+' -> '+id);
 const active=new Set(),visited=new Set();
 function visit(id){if(active.has(id))fail('dependency cycle '+id);if(visited.has(id))return;active.add(id);byId[id].dependsOn.forEach(visit);active.delete(id);visited.add(id);}
 data.tasks.forEach(t=>visit(t.id));
 if(!Array.isArray(data.locations)||data.locations.length!==10||new Set(data.locations.map(l=>l.id)).size!==10)fail('expected ten unique location records');
 for(const location of data.locations){
  if(!location.name||!location.evidence||!location.acceptance||!location.files?.length||location.files.some(p=>!fileExists(p)))fail('missing location evidence '+location.id);
  if(Object.keys(location.readiness||{}).sort().join()!==Object.keys(locationAspects).sort().join()||Object.values(location.readiness).some(s=>!Object.hasOwn(statuses,s)))fail('invalid location readiness '+location.id);
  if(location.readiness.ready==='done'&&Object.values(location.readiness).some(s=>s!=='done'))fail('location ready requires every aspect '+location.id);
 }
 return data;
}
export function totals(tasks){const counts=Object.fromEntries(Object.keys(statuses).map(s=>[s,tasks.filter(t=>t.status===s).length]));return {...counts,total:tasks.length,percent:tasks.length?+(counts.done/tasks.length*100).toFixed(1):0};}
export function domainTotals(data){return data.progressDomains.map(domain=>({...domain,...totals(data.tasks.filter(t=>t.domain===domain.id))}));}
export function render(data){
 const stats=totals(data.tasks),v1=totals(data.tasks.filter(t=>t.scope==='v1'));
 const previous=data.scopeHistory.find(h=>h.directive==='V6.0').previousChecklist;
 const lines=['# GODSEED MASTER ROADMAP','',`อัปเดต ${data.updated} UTC · ตรวจจาก base commit \`${data.baseCommit}\` และงานรอบล่าสุดใน [Development Log](GODSEED/docs/DEVELOPMENT_LOG.md)`,
 '', 'Source of truth ของสถานะ: [roadmap.json](GODSEED/docs/roadmap.json) · สร้างด้วย `npm --prefix GODSEED run roadmap:update` · ตรวจด้วย `npm --prefix GODSEED run roadmap:check`',
 '', '## ขอบเขตและวิธีนับ',
 '', data.scopeDefinition,
 '', `ประวัติขอบเขตก่อนV6: บทแรกครบสามบทสรุปและCH2/CH3หลัง1.0; snapshotเดิม${previous.done}/${previous.total}=${previous.percent}% เก็บในscopeHistoryพร้อมPhase/Scope/Statusของ${previous.total}IDเดิม การขยายตัวหารในV6ทำให้เปอร์เซ็นต์เปลี่ยน ไม่ใช่การลบงานที่ผ่านแล้ว AIยังเป็นoptionalและเกมพื้นฐานไม่พึ่งAI/API Key`,
 '', `เป้าหมายเชิงออกแบบ V6 (ยังไม่ใช่จำนวนที่สร้างแล้ว): ${Object.entries(data.designTargets).map(([name,n])=>`${name}≈${n}`).join(' · ')}. นับของจริงจากStory Graph/โค้ด/การทดสอบเท่านั้น`,
 '', 'ทุกงานน้ำหนัก1: เปอร์เซ็นต์ = จำนวน✅ ÷ จำนวนงาน ×100; 🟡/⬜/🔴/⛔ได้0 ไม่มีpartialเครดิต ตัวเลขเป็นความคืบหน้าของChecklistเท่านั้น ไม่ใช่เวลาที่เหลือ ปริมาณแรงงาน ความสนุก หรือคุณภาพภาพของเกมทั้งหมด งานขนาดต่างกันและรายการอาจเพิ่มได้ ต้องอ่านพร้อมจำนวนงานและlog',
 '', `**ความคืบหน้ารวม Checklist: ${stats.percent}% (${stats.done}/${stats.total})** · เฉพาะขอบเขต1.0: ${v1.percent}% (${v1.done}/${v1.total})`,
 '', '| ขอบเขต | งานทั้งหมด | ✅ | 🟡 | ⬜ | 🔴 | ⛔ | Checklist |','| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
 ...[['ทั้งโครงการ',data.tasks],['1.0',data.tasks.filter(t=>t.scope==='v1')],['หลัง1.0/เสริม',data.tasks.filter(t=>t.scope!=='v1')]].map(([name,tasks])=>{const s=totals(tasks);return `| ${name} | ${s.total} | ${s.done} | ${s.in_progress} | ${s.not_started} | ${s.problem} | ${s.blocked} | ${s.percent}% |`;}),
 '', '## ความคืบหน้าแยกหกด้าน','',
 '| ด้าน | ✅ / ทั้งหมด | 🟡 | ⬜ | 🔴 | ⛔ | Checklist |','| --- | ---: | ---: | ---: | ---: | ---: | ---: |',
 ...domainTotals(data).map(s=>`| ${s.title} | ${s.done}/${s.total} | ${s.in_progress} | ${s.not_started} | ${s.problem} | ${s.blocked} | ${s.percent}% |`),
 '', 'แต่ละงานอยู่ด้านเดียวเพื่อไม่ให้เครดิตซ้ำ และไม่รวมงานย่อยSAVE14/ความพร้อมสถานที่90ช่องในตัวหารหลัก',
 '', '## Phase 0–13 ตามV6','',
 '', '| Phase | ✅ / ทั้งหมด | 🟡 | ⬜ | 🔴 | ⛔ | Checklist |','| --- | ---: | ---: | ---: | ---: | ---: | ---: |',
 ...data.phases.map(p=>{const s=totals(data.tasks.filter(t=>t.phase===p.id));return `| [${p.id} — ${p.title}](#phase-${p.id}) | ${s.done}/${s.total} | ${s.in_progress} | ${s.not_started} | ${s.problem} | ${s.blocked} | ${s.percent}% |`;}),
 '', '## กฎสถานะ/หลักฐาน',
 '', '✅ = สร้างจริงและผ่านเกณฑ์เฉพาะงาน; 🟡 = เริ่มแล้วแต่ยังไม่ครบ/ยังไม่ยืนยัน; ⬜ = มีแผนหรือสเปกแต่ยังไม่มีimplementation; 🔴 = มีระบบแต่พบfailureที่ทำซ้ำได้; ⛔ = ระบุข้อจำกัดที่ต้องปลดก่อน ไม่ใช้แทนข้ออ้างงานยาก',
 '', 'เอกสารออกแบบจากChatGPT/SSOTไม่ใช่หลักฐานว่าCodexสร้างเกมแล้ว งานที่อ้างspecอย่างเดียวจึงยังไม่✅ ผลการทดสอบเก่าในTEST_REPORTมีรุ่น/commitกำกับ ไม่ใช่การรับรองฟีเจอร์ที่ยังไม่สร้าง Dependenciesคือระบบที่ต้องมีเพื่อส่งมอบ; งานใหญ่ที่กำลังทำอาจมีsubsystemที่ผ่านแล้ว แต่ห้ามถือว่าgateรวมผ่านตามไปด้วย',
 '', 'ValidatorตรวจID/dependency cycle/ไฟล์หลักฐานและเอกสารstale ไม่สามารถพิสูจน์ข้อความอ้างว่าเสร็จแทนผู้พัฒนา ต้องรันทดสอบที่เกี่ยวข้องก่อนเปลี่ยนสถานะ หากregressionเกิดให้เปลี่ยนเป็น🔴 พร้อมreproและแก้ก่อนขยาย งานที่ขาดอุปกรณ์ให้คง⛔/ยังไม่ยืนยัน',
 '', '## กระบวนการทุกรอบ',
 '', 'ตรวจRoadmap/โค้ด/เซฟ/CI → เลือกงานตามpriority+dependency → ทำโค้ด/ภาพ → ทดสอบ → อัปเดตJSONพร้อมหลักฐาน → สร้างRoadmap/Task Boardใหม่ → เพิ่มDevelopment Log → ตรวจroadmap:check → commit/PR/deployตามสิทธิ์ → บันทึกผลเว็บจริง ห้ามแก้เปอร์เซ็นต์หรือไฟล์generatedด้วยมือ',
 '', 'บอร์ดเดิมเชื่อมผ่าน legacy GS IDs ด้านล่าง ไม่ใช้บอร์ดสองชุดเป็นตัวหารซ้ำ ประวัติเดิมคงในGitและTEST_REPORT; [TASK_BOARD](GODSEED/docs/TASK_BOARD.md)เป็นมุมมองย่อจากข้อมูลชุดเดียว',
 ];
 const saveTasks=data.tasks.find(t=>t.id==='FND-005')?.subtasks;
 if(saveTasks){const s=totals(saveTasks);lines.push('','## Manual File Save — งานย่อย FND-005 (Owner V2)','',
  `Checklist เซฟ ${s.percent}% (${s.done}/${s.total}) แยกจากตัวหารหลัก งานSAVE14ข้ออยู่ภายใต้FND-005 ไม่นับซ้ำเป็น14milestones เปลี่ยนข้อกำหนดแล้วจึงตรวจสถานะFND-005ใหม่ ไม่ใช้ผลIndexedDBรุ่นเก่าแทนหลักฐานปัจจุบัน`,
  '',...saveTasks.flatMap(t=>[`- [${t.status==='done'?'x':' '}] ${statuses[t.status]} **${t.id} — ${t.title}**`,
   `  - ความสำคัญ: ${t.priority} · ต้องมี: ${t.dependsOn.join(', ')||'ไม่มี'} · ตรวจ: ${t.reviewed}`,
   `  - ไฟล์: ${t.files.map(f=>`[${f}](${f})`).join(' · ')}`,
   `  - หลักฐาน: ${t.evidence}${t.verification?' · '+t.verification:''}`,
   `  - เกณฑ์เสร็จ: ${t.acceptance}`,'']));}
 lines.push('','## สถานที่ตามภาพอ้างอิง 10 แห่ง','',
  'ตารางย่อยนี้ขยาย VIS-008/009/010/014 ไม่เพิ่ม90งานในตัวหารหลัก ✅ในระบบย่อยหมายถึงผ่านเกณฑ์เฉพาะต้นแบบที่มีหลักฐาน ไม่ใช่finalHD ทั้งฉาก ต้องรอคอลัมน์ฉบับสมบูรณ์ ภาพอ้างอิงอย่างเดียวให้เครดิตเฉพาะคอลัมน์แรก Chromiumจำลองไม่ใช่Safari/อุปกรณ์จริง (QA-009)',
  '',`| สถานที่ | ${Object.values(locationAspects).join(' | ')} |`,'| --- |'+Object.keys(locationAspects).map(()=>' --- |').join(''),
  ...data.locations.map(l=>`| ${l.name} | ${Object.keys(locationAspects).map(k=>statuses[l.readiness[k]].split(' ')[0]).join(' | ')} |`));
 for(const l of data.locations)lines.push('',`- **${l.id} — ${l.name}**: ${l.evidence}`,`  - หลักฐาน: ${l.files.map(f=>`[${f}](${f})`).join(' · ')}`,`  - เกณฑ์พร้อมทั้งฉาก: ${l.acceptance}`);
 for(const p of data.phases){lines.push('',`<a id="phase-${p.id}"></a>`,`## Phase ${p.id} — ${p.title}`,'');for(const t of data.tasks.filter(t=>t.phase===p.id)){
  lines.push(`- [${t.status==='done'?'x':' '}] ${statuses[t.status]} **${t.id} — ${t.title}**`,
   `  - ความสำคัญ: ${t.priority} · ขอบเขต: ${t.scope} · ด้าน: ${t.domain} · เชื่อมบอร์ดเดิม: ${t.legacyIds.join(', ')||'—'}${t.legacyPhase!==undefined?' · Phaseเดิม: '+t.legacyPhase:''} · ตรวจล่าสุด: ${t.reviewed}`,
   `  - ต้องมี: ${t.dependsOn.join(', ')||'ไม่มี'}`,
   `  - ไฟล์: ${t.files.map(f=>`[${f}](${f})`).join(' · ')}`,
   `  - หลักฐาน/สถานะจริง: ${t.evidence}${t.verification?' · '+t.verification:''}`,
   `  - เกณฑ์เสร็จ: ${t.acceptance}`,'');
 }}
 return lines.join('\n')+'\n';
}
export function board(data){
 const s=totals(data.tasks);
 const previous=data.scopeHistory.find(h=>h.directive==='V6.0').previousChecklist;
 const candidates=data.workQueue;
 const regressions=data.tasks.filter(t=>t.status==='problem').sort((a,b)=>a.priority.localeCompare(b.priority)).map(t=>t.id);
 const next=[...new Set([...regressions,...candidates])].filter(id=>{const t=data.tasks.find(t=>t.id===id);return t&&t.status!=='done'&&t.status!=='blocked';}).slice(0,5);
 return ['# GODSEED Task Board','', 'Generated view จาก [roadmap.json](roadmap.json); สถานะครบ/หลักฐาน/เกณฑ์อยู่ใน [GODSEED_MASTER_ROADMAP](../../GODSEED_MASTER_ROADMAP.md) ห้ามนับสถานะบอร์ดนี้ซ้ำ',
 '', `Checklist ${s.percent}% · ✅${s.done} 🟡${s.in_progress} ⬜${s.not_started} 🔴${s.problem} ⛔${s.blocked} · ทั้งหมด${s.total}`,
 '', `V6ขยายขอบเขต12ARC/8LifePaths;${previous.done}/${previous.total}=${previous.percent}%เป็นsnapshotก่อนขยาย ดูscopeHistoryในJSON งานเดิมไม่ถูกลบ เป้าหมายตัวเลขไม่ใช่ของที่สร้างเสร็จ`,
 '', '| ด้าน | ✅ / ทั้งหมด | Checklist |','| --- | ---: | ---: |',
 ...domainTotals(data).map(s=>`| ${s.title} | ${s.done}/${s.total} | ${s.percent}% |`),
 '', '| Phase | งานที่เสร็จ | งานที่เหลือ (ID: สถานะ) |','| --- | --- | --- |',
 ...data.phases.map(p=>`| ${p.id} ${p.title} | ${data.tasks.filter(t=>t.phase===p.id&&t.status==='done').map(t=>t.id).join(', ')||'—'} | ${data.tasks.filter(t=>t.phase===p.id&&t.status!=='done').map(t=>`${t.id}: ${statuses[t.status].split(' ')[0]}`).join(', ')} |`),
 '', '## ห้างานถัดไปตามpriorityและdependency','',
 ...next.map((id,i)=>{const t=data.tasks.find(t=>t.id===id);return `${i+1}. ${id} (${t.legacyIds.join('/')||'V6'}) ${t.title} — ต้องมี ${t.dependsOn.join(', ')}`;}),
 '', 'เมื่อพบP0/P1 regressionให้แทรกก่อนรายการนี้ คิวนี้เป็นงานสำคัญที่ต้องตรวจdependencyของส่วนย่อยก่อนทำ ไม่อ้างว่าทั้งmilestoneพร้อมเพราะอยู่ในคิว ใช้Vertical Slice + Content Batch + Automated Validation ไม่รอภาพทั้งหมดก่อนเพิ่มบทหรือทดสอบต่อสู้',
 '', 'QA-009 ติดข้อจำกัดอุปกรณ์จริง/Safari; Chromiumจำลองช่วยพัฒนาต่อได้ แต่ไม่ใช้เป็นhardwareacceptance. เส้นทางV6: PIPE → opening/ARC1 → LifePaths/world/power → ARC2–12 → ผลลัพธ์สะสม → QA-008 → REL gates; งานเดิมB04/B05/สามบทสรุปยังคงมีIDและสถานะตามหลักฐาน',
 '', 'ประวัติ: [DEVELOPMENT_LOG](DEVELOPMENT_LOG.md) · สถานะรอบ: [PROGRESS](PROGRESS.md) · หลักฐานทดสอบ: [TEST_REPORT](TEST_REPORT.md)',''].join('\n');
}
const invoked=process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url);
if(invoked){
 const data=validate(JSON.parse(readFileSync(resolve(root,'GODSEED/docs/roadmap.json'),'utf8')));
 const outputs={'GODSEED_MASTER_ROADMAP.md':render(data),'GODSEED/docs/TASK_BOARD.md':board(data)};
 if(process.argv.includes('--write'))for(const [file,body] of Object.entries(outputs))writeFileSync(resolve(root,file),body);
 else for(const [file,body] of Object.entries(outputs))if(!existsSync(resolve(root,file))||readFileSync(resolve(root,file),'utf8')!==body)throw Error(relative(root,resolve(root,file))+' stale; run roadmap:update');
 console.log(JSON.stringify({result:'PASS',...totals(data.tasks),v1:totals(data.tasks.filter(t=>t.scope==='v1'))}));
}
