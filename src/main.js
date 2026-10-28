import { stopYearlyAuto } from './ui/yearly-view.js';
import { renderCareer } from './ui/career-view.js';
import { renderMap } from './ui/map-view.js';
import { renderJournal } from './ui/life-view.js';
import './ui/styles.css';
import { Game } from './ui/game.js';
import { GameState, replaceState } from './engine/state.js';
import { renderBirthRecord } from './ui/birth-record.js';
window.Game = Game;
function showBirth(){
  Game.closeModal();document.body.classList.remove('yearly-mode');
  document.querySelector('#gameView').hidden=true;document.querySelector('#shellPanel').hidden=true;
  document.querySelector('.main-nav').hidden=true;
  document.querySelector('#birthScreen')?.remove();
  const screen=document.createElement('section');screen.id='birthScreen';screen.className='shell-panel rebirth-screen';
  screen.innerHTML='<h2>ประตูแห่งการเกิดใหม่</h2><img class="birth-art" alt="เปลทารกใต้แสงดาว"><p>หนึ่งชีวิต หนึ่งครั้งที่เล่น</p><p>ชีวิตนี้อยู่ในแท็บนี้เท่านั้น รีเฟรชหรือปิดหน้าแล้วเริ่มใหม่ เก็บประวัติเฉพาะชีวิตที่ถึงฉากจบ</p><button class="primary" id="beginBirth">ก้าวสู่ชีวิตใหม่</button>';
  screen.querySelector('img').src=new URL('../public/art/cradle.svg',import.meta.url).href;
  screen.querySelector('button').onclick=()=>{
    if(Game.active)return;Game.startRun();screen.remove();document.querySelector('.main-nav').hidden=false;
    document.querySelector('#gameView').hidden=false;activeView='game';Game.render();
  };
  document.querySelector('header').after(screen);Game.notify('');
}
Game.onRestart=showBirth;
const panel = document.querySelector('#shellPanel');
let activeView='game';
Game.onChange=()=>{if(activeView!=='game')document.querySelector(`[data-view="${activeView}"]`).click();};
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  if(!Game.active)return;
  if(button.dataset.view!=='game')stopYearlyAuto();
  document.querySelectorAll('[data-view]').forEach(item => item.removeAttribute('aria-current'));
  button.setAttribute('aria-current', 'page');
  const view = button.dataset.view; activeView=view;
  document.querySelector('#gameView').hidden = view !== 'game';
  panel.hidden = view === 'game';
  panel.replaceChildren();
  if(view==='game'){Game.render();return;}
  if (view === 'record') {
    renderBirthRecord(panel, GameState);
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
    panel.innerHTML = '<h2>คู่มือโลก</h2><p>เลือกแนวชีวิตประจำปีแล้วใช้ชีวิตต่อครั้งละ 1, 2 หรือ 5 ปี แผนจะใช้ต่อจนกว่าคุณเปลี่ยน เรื่องทั่วไปสะสมในบันทึก ส่วนเรื่องสำคัญจะหยุดรอการตัดสินใจหลายตัวเลือก คุณเปิดอ่านเรื่องแบบละเอียดเองได้</p><p>เปิดเล่นอัตโนมัติและเลือกความเร็วได้จากเส้นทางชีวิต ระบบหยุดเมื่อพบเรื่องสำคัญ เปลี่ยนเมนู ซ่อนหน้าเว็บ หรือทำรายการไม่ได้ เมื่อปิดเกมเวลาจะไม่เดินต่อ</p><p>ชีวิตใหม่ได้รับกำเนิดแบบสุ่มและมีบันทึกกำเนิดถาวร ปฏิทินมี 360 วันต่อปี การฝึก ทำงาน พัก และเดินทางใช้เวลาและพลังจริง เปิดอาชีพและการฝึกหลังพร้อมเข้าพิธีเมื่ออายุ 12 ปี ดูสรุปในบันทึกชีวิตและเส้นทางในแผนที่</p><p>หนึ่งชีวิตเล่นได้เฉพาะในแท็บนี้ รีเฟรชหรือปิดหน้าแล้วกลับไปเกิดใหม่ ประวัติเก็บเฉพาะชีวิตที่จบจริง เปิดหน้าต่างย่อยได้โดยชีวิตปัจจุบันยังอยู่</p>';
  }
}));
document.addEventListener('keydown', event => { if (event.key === 'Escape') Game.closeModal(); });

document.getElementById('toggleStats').onclick=event=>{const sidebar=document.querySelector('.sidebar');const expanded=sidebar.classList.toggle('expanded');event.target.setAttribute('aria-expanded',String(expanded));event.target.textContent=expanded?'ย่อค่าสถานะ':'เปิดค่าสถานะโดยละเอียด';};

for(const name of ['pointerdown','keydown'])document.addEventListener(name,e=>{if(e.isTrusted&&Game.active)Game.clock.interact(performance.now());},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)Game.clock.pause(performance.now());else if(Game.active)Game.clock.resume(performance.now());});
window.addEventListener('beforeunload',event=>{if(Game.active&&GameState.run.status==='active'){event.preventDefault();event.returnValue='';}});
window.addEventListener('pagehide',()=>{Game.abandon();});
window.addEventListener('pageshow',event=>{if(event.persisted){Game.abandon();showBirth();}});
showBirth();
