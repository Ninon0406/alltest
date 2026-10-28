import { stopYearlyAuto } from './ui/yearly-view.js';
import { renderCareer } from './ui/career-view.js';
import { renderMap } from './ui/map-view.js';
import { renderJournal } from './ui/life-view.js';
import './ui/styles.css';
import { Game } from './ui/game.js';
import { GameState, replaceState } from './engine/state.js';
import { generateBirth } from './character/rebirth.js';
import { readSave, writeSave } from './save/storage.js';
import { renderBirthRecord } from './ui/birth-record.js';
window.Game = Game;
let saved = false, unreadable = false;
try { const state = readSave(localStorage); if (state) { replaceState(state); saved = true; } }
catch { unreadable = true; }
if (saved) Game.render();
else {
  const birthScreen = document.createElement('section'); birthScreen.className = 'shell-panel rebirth-screen';
  birthScreen.innerHTML = '<h2>ประตูแห่งการเกิดใหม่</h2><img class="birth-art" alt="เปลทารกใต้แสงดาว"><p>ชะตาจะกำหนดชื่อ เผ่าพันธุ์ ครอบครัว และพรสวรรค์ของคุณ ไม่มีผู้ใดเลือกกำเนิดของตนได้</p><button class="primary" id="beginBirth">ก้าวสู่ชีวิตใหม่</button><p role="status" id="birthStatus"></p>';
  birthScreen.querySelector('img').src = new URL('../public/art/cradle.svg', import.meta.url).href;
  document.querySelector('header').after(birthScreen);
  const gameView = document.querySelector('#gameView'); gameView.hidden = true;
  const nav = document.querySelector('.main-nav'), actions = document.querySelector('.header-btns'); nav.hidden = true; actions.hidden = true;
  if (unreadable) birthScreen.querySelector('#birthStatus').textContent = 'ไม่สามารถอ่านบันทึกเดิมได้ ข้อมูลยังไม่ถูกลบ การเริ่มชีวิตใหม่จะขอยืนยันก่อนแทนที่บันทึก';
  birthScreen.querySelector('#beginBirth').addEventListener('click', () => {
    if (unreadable && !confirm('แทนที่บันทึกที่อ่านไม่ได้ด้วยชีวิตใหม่หรือไม่?')) return;
    const seed = crypto.getRandomValues(new Uint32Array(1))[0];
    const state = generateBirth(seed);
    try { writeSave(localStorage, state); }
    catch { birthScreen.querySelector('#birthStatus').textContent = 'บันทึกไม่ได้ โปรดอนุญาตพื้นที่เก็บข้อมูลก่อนเริ่มชีวิต'; return; }
    replaceState(state); birthScreen.remove(); nav.hidden = false; actions.hidden = false; Game.render();
    document.querySelector('[data-view="record"]').click();
  });
}
const panel = document.querySelector('#shellPanel');
let activeView='game';
Game.onChange=()=>{if(activeView!=='game')document.querySelector(`[data-view="${activeView}"]`).click();};
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  if(button.dataset.view!=='game')stopYearlyAuto();
  document.querySelectorAll('[data-view]').forEach(item => item.removeAttribute('aria-current'));
  button.setAttribute('aria-current', 'page');
  const view = button.dataset.view; activeView=view;
  document.querySelector('#gameView').hidden = view !== 'game';
  panel.hidden = view === 'game';
  panel.replaceChildren();
  if (view === 'record') {
    renderBirthRecord(panel, GameState);
    const download=(name,text)=>{const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));const anchor=document.createElement('a');anchor.href=url;anchor.download=name;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
    const exportButton=document.createElement('button');exportButton.textContent='ดาวน์โหลดเซฟปัจจุบัน';exportButton.onclick=()=>download('reborn-save.json',localStorage.getItem('reborn_save'));panel.append(exportButton);
    for(const version of [5,4,3]){const backup=localStorage.getItem(`reborn_save_backup_before_v${version}`);if(backup){const button=document.createElement('button');button.textContent=`ดาวน์โหลดเซฟก่อนรุ่น ${version}`;button.onclick=()=>download(`reborn-before-v${version}.json`,backup);panel.append(button);}}

    const title = document.createElement('h2'); title.textContent = 'บันทึกตัวละคร'; panel.append(title);
    for (const text of [`ชื่อ: ${GameState.name}`, `เผ่า: ${GameState.race}`, `ครอบครัว: ${GameState.family}`, `อาชีพ: ${GameState.career}`, `อายุ: ${GameState.age} ปี`, `เงิน: ${GameState.gold} เหรียญ`, `ลักษณะ: ${GameState.traits.join(' • ')}`]) {
      const line = document.createElement('p'); line.textContent = text; panel.append(line);
    }
  } else if(view==='career') {
    renderCareer(panel,GameState,action=>{const done=Game.perform(action);if(done&&action.type==='beginAwakening')document.querySelector('[data-view="game"]').click();});
  } else if(view==='map') {
    renderMap(panel,GameState,action=>Game.perform(action),()=>button.click());
  } else if(view==='chronicle') {
    renderJournal(panel,GameState);
  } else if (view === 'guide') {
    panel.innerHTML = '<h2>คู่มือโลก</h2><p>เลือกแนวชีวิตประจำปีแล้วใช้ชีวิตต่อครั้งละ 1, 2 หรือ 5 ปี แผนจะใช้ต่อจนกว่าคุณเปลี่ยน เรื่องทั่วไปสะสมในบันทึก ส่วนเรื่องสำคัญจะหยุดรอการตัดสินใจหลายตัวเลือก คุณเปิดอ่านเรื่องแบบละเอียดเองได้</p><p>เปิดเล่นอัตโนมัติและเลือกความเร็วได้จากเส้นทางชีวิต ระบบหยุดเมื่อพบเรื่องสำคัญ เปลี่ยนเมนู ซ่อนหน้าเว็บ หรือบันทึกไม่ได้ เมื่อปิดเกมเวลาจะไม่เดินต่อ</p><p>ชีวิตใหม่ได้รับกำเนิดแบบสุ่มและมีบันทึกกำเนิดถาวร ปฏิทินมี 360 วันต่อปี การฝึก ทำงาน พัก และเดินทางใช้เวลาและพลังจริง เปิดอาชีพและการฝึกหลังพร้อมเข้าพิธีเมื่ออายุ 12 ปี ดูสรุปในบันทึกชีวิตและเส้นทางในแผนที่</p><p>ความคืบหน้าบันทึกในเบราว์เซอร์นี้ ดาวน์โหลดเซฟและสำเนาก่อนอัปเกรดได้จากบันทึกตัวละคร การเริ่มใหม่จะขอยืนยันก่อนลบชีวิตปัจจุบันและยังเก็บฉากจบที่ปลดล็อกไว้</p>';
  }
}));
document.addEventListener('keydown', event => { if (event.key === 'Escape') Game.closeModal(); });

document.getElementById('toggleStats').onclick=event=>{const sidebar=document.querySelector('.sidebar');const expanded=sidebar.classList.toggle('expanded');event.target.setAttribute('aria-expanded',String(expanded));event.target.textContent=expanded?'ย่อค่าสถานะ':'เปิดค่าสถานะโดยละเอียด';};
