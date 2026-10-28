import { rarities, talents } from '../data/birth.js';
const statLabels = {str:'พละกำลัง',dex:'ความคล่อง',con:'ความอึด',int:'สติปัญญา',wis:'ความเข้าใจ',per:'การสังเกต',luk:'โชค',cha:'เสน่ห์'};
export function renderBirthRecord(panel, state) {
  const heading=document.createElement('h2'); heading.textContent='บันทึกกำเนิด'; panel.append(heading);
  const picture=document.createElement('img'); picture.src= new URL('../../public/art/cradle.svg', import.meta.url).href;
  picture.alt='เปลทารกใต้แสงดาว'; picture.className='birth-art'; panel.append(picture);
  const birth=state.birth;
  if (!birth) { const note=document.createElement('p'); note.textContent='ชีวิตจากบันทึกเดิม ไม่มีข้อมูลกำเนิดย้อนหลัง ตัวละครและความคืบหน้ายังคงเดิม'; panel.append(note); return; }
  const lines=[`ชื่อแรกเกิด: ${birth.initial.name}`,`เผ่า: ${birth.initial.race}`,`ฐานะกำเนิด: ${rarities.find(r=>r.id===birth.rarity).label}`,
    `ครอบครัว: ${birth.initial.family}`,`บ้านเกิด: ${birth.initial.location}`,`มารดา: ${birth.parents.mother} • ${birth.parents.motherOccupation}`,
    `บิดา: ${birth.parents.father} • ${birth.parents.fatherOccupation}`,`เรื่องราวครัวเรือน: ${birth.history}`,
    `ทรัพย์สินตั้งต้น: ${birth.initial.gold} เหรียญ`,`พรสวรรค์: ${talents.find(t=>t.id===birth.talent).label}`,
    `พลังชีวิตแรกเกิด: ${birth.initial.maxHp} • ความอึด: ${birth.initial.maxStamina} • มานา: ${birth.initial.maxMana}`,
    ...Object.entries(birth.initial.stats).map(([key,value])=>`${statLabels[key]}แรกเกิด: ${value}`),
    'ศักยภาพ พรเร้นลับ และอายุขัยยังเป็นปริศนา การค้นพบจะเกิดขึ้นในระบบชีวิตระยะถัดไป'];
  for(const text of lines) { const line=document.createElement('p'); line.textContent=text; panel.append(line); }
}
