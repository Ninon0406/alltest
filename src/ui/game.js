import { readGallery, storeGallery } from '../save/gallery.js';
import { upgradeState } from '../engine/migrate.js';
import { calendar, advanceTime, recordAction, normalize } from '../engine/time.js';
import { dispatch } from '../engine/actions.js';
import { renderLife } from './life-view.js';
import { storyToken, textTokens } from '../engine/life.js';
import { portrait } from './avatar/portrait.js';
const escapeText = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
import { GameState, replaceState } from '../engine/state.js';
import { Scenes } from '../data/scenes.js';
import { canChoose } from '../engine/choices.js';
import { readSave, writeSave } from '../save/storage.js';
export const Game = {
            init() {
                this.loadGame(true);
                this.render();
            },

            notify(message) { document.getElementById('gameNotice').textContent=message; },
            perform(action) {
                try { const next=dispatch(GameState,action);writeSave(localStorage,next);replaceState(next);this.notify('บันทึกความคืบหน้าแล้ว');this.render();return true; }
                catch(error) { this.notify(['QuotaExceededError','SecurityError'].includes(error.name)?'บันทึกไม่ได้ กรุณาตรวจพื้นที่เก็บข้อมูล ความคืบหน้าเดิมยังอยู่':error.message);return false; }
            },
            render() {
                if(!GameState.time)replaceState(upgradeState(GameState));
                normalize(GameState);
                const log=document.getElementById('logBox');log.replaceChildren();
                for(const entry of GameState.journal.slice(-3).reverse()){const item=document.createElement('p');item.textContent=`อายุ ${entry.age} ปี • ${entry.title}`;log.append(item);}

                document.getElementById('traitsList').textContent=GameState.traits.join(' • ');
                document.getElementById('lblYear').textContent=calendar(GameState).worldYear;
                document.getElementById('txtFatigue').textContent=`${GameState.progression.fatigue}/100`;
                document.getElementById('txtFocus').textContent=`${GameState.progression.focus}/100`;
                document.getElementById('txtMorale').textContent=`${GameState.morale}/100`;

                document.getElementById("charAvatar").innerHTML = portrait(GameState);
                document.getElementById("displayName").innerText = GameState.name;
                document.getElementById("displayRace").innerText = `เผ่า: ${GameState.race}`;
                document.getElementById("displayCareer").innerText = `อาชีพ: ${GameState.career}`;
                document.getElementById("displayAge").innerText = `อายุ: ${GameState.age} ปี`;
                document.getElementById("displayGold").innerText = `💰 ${GameState.gold} G`;

                this.updateBar("Hp", GameState.hp, GameState.maxHp);
                this.updateBar("Stamina", GameState.stamina, GameState.maxStamina);
                this.updateBar("Mana", GameState.mana, GameState.maxMana);
                this.updateBar("Hunger", GameState.hunger, 100);
                this.updateBar("Thirst", GameState.thirst, 100);

                document.getElementById("statStr").innerText = GameState.stats.str;
                document.getElementById("statDex").innerText = GameState.stats.dex;
                document.getElementById("statCon").innerText = GameState.stats.con;
                document.getElementById("statInt").innerText = GameState.stats.int;
                document.getElementById("statWis").innerText = GameState.stats.wis;
                document.getElementById("statPer").innerText = GameState.stats.per;
                document.getElementById("statLuk").innerText = GameState.stats.luk;
                document.getElementById("statCha").innerText = GameState.stats.cha;

                document.getElementById("lblDay").innerText = GameState.day;
                document.getElementById("lblSeason").innerText = GameState.season;
                document.getElementById("lblLocation").innerText = GameState.location;
                document.getElementById("lblWeather").innerText = GameState.weather;
                document.getElementById("txtMemorySummary").innerText = `อยากรู้: ${GameState.childhoodMemory.curiosity} | รอบคอบ: ${GameState.childhoodMemory.caution}`;

                this.renderScene(GameState.currentSceneId);
                this.onChange?.();
            },

            updateBar(name, val, max) {
                const pct = Math.max(0, Math.min(100, (val / max) * 100));
                document.getElementById(`txt${name}`).innerText = `${Math.floor(val)}/${max}`;
                const bar=document.getElementById(`bar${name}`);bar.style.width=`${pct}%`;
                bar.parentElement.setAttribute('role','progressbar');bar.parentElement.setAttribute('aria-label',({Hp:'พลังชีวิต',Stamina:'ความอึด',Mana:'พลังเวท',Hunger:'อาหารคงเหลือ',Thirst:'น้ำคงเหลือ'})[name]);bar.parentElement.setAttribute('aria-valuemin','0');bar.parentElement.setAttribute('aria-valuemax',String(max));bar.parentElement.setAttribute('aria-valuenow',String(Math.floor(val)));
            },

            renderScene(sceneId) {
                if(GameState.life.mode==='annual') {renderLife(document.getElementById('sceneContainer'),GameState,action=>this.perform(action));return;}

                const scene = Scenes[sceneId] || Scenes["scene_birth_0"];
                const container = document.getElementById("sceneContainer");

                let html = `
                    <div class="scene-banner"><span class="scene-caption">เส้นทางแห่งโชคชะตา</span></div>
                    <div class="scene-text-box">
                        <h3 style="color: var(--accent-gold); margin-bottom: 10px;">${escapeText(textTokens(scene.title,GameState))}</h3>
                        <p>${escapeText(textTokens(scene.text,GameState))}</p>
                    </div>
                    <div class="choices-container">
                `;

                if (scene.isEnding) {
                    if (!GameState.unlockedEndings.includes(scene.endingId)) {
                        GameState.unlockedEndings.push(scene.endingId);
                        this.saveGame(true);
                    }
                    html += `
                        <button class="primary" onclick="Game.restartGame()" style="padding: 15px; font-size: 1.1rem;">เริ่มต้นชีวิตใหม่ </button>
                    `;
                } else {
                    scene.choices.forEach(choice => {
                        let canPass = true;
                        let reqText = "";
                        if (choice.req) {
                            for (let stat in choice.req) {
                                if (stat === 'gold') {
                                    if (GameState.gold < choice.req.gold) {
                                        canPass = false;
                                        reqText += ` [ต้องการเงิน >= ${choice.req.gold} G]`;
                                    }
                                } else if (GameState.stats[stat] < choice.req[stat]) {
                                    canPass = false;
                                    reqText += ` [ต้องการ ${stat.toUpperCase()} >= ${choice.req[stat]}]`;
                                }
                            }
                        }

                        html += `
                            <button type="button" class="choice-card ${canPass ? '' : 'disabled'}" ${canPass ? '' : 'disabled'} ${canPass ? `onclick="Game.choose('${choice.id}', '${storyToken(GameState)}')"` : ''}>
                                <div class="choice-title">${choice.title}</div>
                                <div class="choice-desc">${choice.desc} • +${this.legacyDays(choice)} วัน${reqText ? `<span style="color: var(--danger);">${reqText}</span>` : ''}</div>
                            </button>
                        `;
                    });
                }

                html += `</div>`;
                container.innerHTML = html;
                if(!scene.isEnding){const button=document.createElement('button');button.textContent='ใช้ชีวิตรายปีต่อโดยเก็บบทเดิมไว้';const token=storyToken(GameState);button.onclick=()=>this.perform({type:'dailyLife',token});container.append(button);}
            },

            legacyDays(choice) {
                if(choice.id.startsWith('c_child_'))return Math.max(1,6*360-(GameState.time.absoluteDay-GameState.time.birthAbsoluteDay));
                if(choice.id.startsWith('c_path_'))return Math.max(1,12*360-(GameState.time.absoluteDay-GameState.time.birthAbsoluteDay));
                if(choice.id==='c_end_peasant')return Math.max(1,60*360-(GameState.time.absoluteDay-GameState.time.birthAbsoluteDay));
                return 1;
            },
            choose(id,token) {
                const choice=Scenes[GameState.currentSceneId]?.choices?.find(item=>item.id===id);
                if(!choice || !canChoose(GameState,choice) || token!==storyToken(GameState))return;
                const previous=GameState,next=structuredClone(GameState);
                try {
                    replaceState(next);choice.effect?.();if(choice.id.startsWith('c_path_'))next.progression.activeCareerId=null;
                    const days=this.legacyDays(choice);
                    const goldDelta=next.gold-previous.gold;
                    if(goldDelta)next.world.ledger.push({day:next.time.absoluteDay,location:next.world.currentLocationId,source:'legacy',amount:goldDelta});
                    recordAction(next,choice.title,days,{goldDelta});
                    advanceTime(next,days);next.currentSceneId=choice.next;next.life.revision++;
                    writeSave(localStorage,next);this.render();this.notify('บันทึกความคืบหน้าแล้ว');
                } catch(error){replaceState(previous);this.notify(error.message);}
            },

            addLog(text) {
                const logBox = document.getElementById("logBox");
                const entry = document.createElement("div");
                entry.className = "log-entry";
                entry.innerText = `[วันที่ ${GameState.day}] ${text}`;
                logBox.prepend(entry);
            },

            saveGame(isAuto = false) {
                try { writeSave(localStorage, GameState); } catch { this.notify('บันทึกไม่ได้ กรุณาตรวจพื้นที่เก็บข้อมูล'); return; }
                if (!isAuto) {
                    alert("บันทึกเกมเรียบร้อยแล้ว!");
                }
            },

            loadGame(silent = false) {
                try { const saved = readSave(localStorage); if (saved) replaceState(saved); }
                catch { this.addLog("ไม่สามารถอ่านบันทึกได้ เริ่มจากข้อมูลปัจจุบันโดยเก็บบันทึกเดิมไว้"); }
            },

            restartGame() {
                if (confirm("คุณต้องการเริ่มชีวิตใหม่ทั้งหมดใช่หรือไม่?")) {
                    try { storeGallery(localStorage,GameState.unlockedEndings); } catch { this.notify('เก็บฉากจบไม่ได้ จึงยังไม่ลบชีวิตเดิม'); return; }
                    localStorage.removeItem("reborn_save");
                    location.reload();
                }
            },

            openCodex() {
                const modal = document.getElementById("modalOverlay");
                const content = document.getElementById("modalContent");
                content.innerHTML = `
                    <div class="modal-header">
                        <h2>สารานุกรมโลกและสายพลัง</h2>
                        <button onclick="Game.closeModal()">ปิด</button>
                    </div>
                    <div class="modal-body">
                        <p><strong>ระบบสายพลัง:</strong> ครอบคลุมเวทมนตร์ธาตุ เวทขั้นสูง สายการต่อสู้ สายสนับสนุน และศาสตร์โบราณ</p>
                        <p><strong>ระบบอาชีพ:</strong> นักผจญภัย ขุนนาง พ่อค้า ช่างฝีมือ อัศวิน และสามัญชนผู้สันโดษ</p>
                        <p><strong>สถานะปัจจุบัน:</strong> ${escapeText(GameState.race)} | อาชีพ: ${escapeText(GameState.career)} | อายุ: ${GameState.age} ปี</p>
                    </div>
                `;
                this.modalTrigger = document.activeElement;
                modal.style.display = "flex";
                content.focus();
            },

            openEndings() {
                const modal = document.getElementById("modalOverlay");
                const content = document.getElementById("modalContent");
                const gallery=[...new Set([...readGallery(localStorage),...GameState.unlockedEndings])];
                let endingsHtml = gallery.length > 0 ? gallery.map(e => `<li>${escapeText(e)}</li>`).join('') : "<li>ยังไม่มีฉากจบที่ปลดล็อก</li>";

                content.innerHTML = `
                    <div class="modal-header">
                        <h2>แกลเลอรีฉากจบที่ปลดล็อก (${gallery.length}/${Object.values(Scenes).filter(scene => scene.isEnding).length})</h2>
                        <button onclick="Game.closeModal()">ปิด</button>
                    </div>
                    <div class="modal-body">
                        <ul>${endingsHtml}</ul>
                    </div>
                `;
                this.modalTrigger = document.activeElement;
                modal.style.display = "flex";
                content.focus();
            },

            closeModal() {
                document.getElementById("modalOverlay").style.display = "none";
                this.modalTrigger?.focus();
            }
        };
