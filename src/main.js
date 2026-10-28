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
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-view]').forEach(item => item.removeAttribute('aria-current'));
  button.setAttribute('aria-current', 'page');
  const view = button.dataset.view;
  document.querySelector('#gameView').hidden = view !== 'game';
  panel.hidden = view === 'game';
  panel.replaceChildren();
  if (view === 'record') {
    renderBirthRecord(panel, GameState);
    const title = document.createElement('h2'); title.textContent = 'บันทึกตัวละคร'; panel.append(title);
    for (const text of [`ชื่อ: ${GameState.name}`, `เผ่า: ${GameState.race}`, `ครอบครัว: ${GameState.family}`, `อาชีพ: ${GameState.career}`, `อายุ: ${GameState.age} ปี`, `เงิน: ${GameState.gold} เหรียญ`, `ลักษณะ: ${GameState.traits.join(' • ')}`]) {
      const line = document.createElement('p'); line.textContent = text; panel.append(line);
    }
  } else if (view === 'guide') {
    panel.innerHTML = '<h2>คู่มือโลก</h2><p>เลือกการกระทำเพื่อกำหนดเส้นทางชีวิต คุณลักษณะและเงินมีผลต่อทางเลือกที่เปิดให้ใช้ แต่ละการตัดสินใจจะบันทึกความคืบหน้าอัตโนมัติในเบราว์เซอร์นี้</p><p>เปิดสารานุกรมเพื่ออ่านสถานะสายพลัง และดูฉากจบที่ปลดล็อกจากเมนูด้านบน การเริ่มใหม่จะลบบันทึกชีวิตปัจจุบันหลังยืนยัน</p><p>ชีวิตใหม่ได้รับกำเนิดแบบสุ่มและบันทึกกำเนิดถาวร เรื่องราวยังใช้เหตุการณ์เดิม การจำลองรายปีจะเพิ่มในระยะถัดไป</p>';
  }
}));
document.addEventListener('keydown', event => { if (event.key === 'Escape') Game.closeModal(); });
