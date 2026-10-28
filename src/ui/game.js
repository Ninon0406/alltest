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

            render() {
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
            },

            updateBar(name, val, max) {
                const pct = Math.max(0, Math.min(100, (val / max) * 100));
                document.getElementById(`txt${name}`).innerText = `${Math.floor(val)}/${max}`;
                document.getElementById(`bar${name}`).style.width = `${pct}%`;
            },

            renderScene(sceneId) {
                const scene = Scenes[sceneId] || Scenes["scene_birth_0"];
                const container = document.getElementById("sceneContainer");

                let html = `
                    <div class="scene-banner">${scene.banner || "🗺️"}</div>
                    <div class="scene-text-box">
                        <h3 style="color: var(--accent-gold); margin-bottom: 10px;">${scene.title}</h3>
                        <p>${scene.text}</p>
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
                            <button type="button" class="choice-card ${canPass ? '' : 'disabled'}" ${canPass ? '' : 'disabled'} ${canPass ? `onclick="Game.choose('${choice.id}')"` : ''}>
                                <div class="choice-title">${choice.title}</div>
                                <div class="choice-desc">${choice.desc}${reqText ? `<span style="color: var(--danger);">${reqText}</span>` : ''}</div>
                            </button>
                        `;
                    });
                }

                html += `</div>`;
                container.innerHTML = html;
            },

            choose(id) {
                const choice = Scenes[GameState.currentSceneId]?.choices?.find(item => item.id === id);
                if (!choice || !canChoose(GameState, choice)) return;
                this.makeChoice(choice.next, choice.effect);
            },

            makeChoice(nextSceneId, effectFn) {
                if (!Scenes[nextSceneId]) throw new Error('ไม่พบฉากปลายทาง');
                if (effectFn && typeof effectFn === 'function') {
                    effectFn();
                }
                GameState.day++;
                if (GameState.day % 30 === 0) GameState.age++;

                GameState.currentSceneId = nextSceneId;
                this.addLog(`การตัดสินใจส่งผลต่อเส้นทางชีวิต (อายุ ${GameState.age} ปี)`);
                this.saveGame(true);
                this.render();
            },

            addLog(text) {
                const logBox = document.getElementById("logBox");
                const entry = document.createElement("div");
                entry.className = "log-entry";
                entry.innerText = `[วันที่ ${GameState.day}] ${text}`;
                logBox.prepend(entry);
            },

            saveGame(isAuto = false) {
                writeSave(localStorage, GameState);
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
                let endingsHtml = GameState.unlockedEndings.length > 0 ? GameState.unlockedEndings.map(e => `<li>${escapeText(e)}</li>`).join('') : "<li>ยังไม่มีฉากจบที่ปลดล็อก</li>";

                content.innerHTML = `
                    <div class="modal-header">
                        <h2>แกลเลอรีฉากจบที่ปลดล็อก (${GameState.unlockedEndings.length}/${Object.values(Scenes).filter(scene => scene.isEnding).length})</h2>
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
