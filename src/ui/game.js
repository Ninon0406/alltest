import { renderYearly,stopYearlyAuto } from './yearly-view.js';
import { readGallery } from '../save/gallery.js';
import { archiveCompleted,readArchive,completedSummary } from '../save/archive.js';
import { createRun,ActivePlayClock } from '../engine/run.js';
import { legacyDays } from '../engine/legacy.js';
import { closePanel } from './panels.js';
import {renderScene as renderSetting} from './scene.js';
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
export const Game = {
            active:false,
            clock:new ActivePlayClock(),
            get snapshot(){return this.active?structuredClone(GameState):null;},
            startRun(){
                if(this.active)return;
                stopYearlyAuto();
                const seed=crypto.getRandomValues(new Uint32Array(1))[0];
                replaceState(createRun(seed,{id:crypto.randomUUID(),startedAt:new Date().toISOString()}));
                this.active=true;this.summary=null;this.archiveStatus=null;this.clock.start(performance.now());
            },
            notify(message){document.getElementById('gameNotice').textContent=message;if(document.getElementById('modalOverlay').open){let note=document.getElementById('panelNotice');if(!note){note=document.createElement('p');note.id='panelNotice';note.setAttribute('role','alert');document.getElementById('modalContent').prepend(note);}note.textContent=message;}},
            perform(action){
                if(!this.active)return false;
                try{
                    const next=dispatch(GameState,action);
                    next.run.activeMs=this.clock.sample(performance.now());
                    replaceState(next);this.notify('');
                    if(next.run.status==='ended'){
                        stopYearlyAuto();this.clock.pause(performance.now());
                        this.summary=completedSummary(next,new Date().toISOString());this.archiveStatus='pending';
                        this.render();this.archiveEnding();
                    }else this.render();
                    return true;
                }catch(error){this.notify(error.message);return false;}
            },
            archiveEnding(){
                const summary=this.summary;if(!summary)return;
                this.archiveStatus='pending';
                const write=()=>archiveCompleted(localStorage,summary);
                const task=globalThis.navigator?.locks?navigator.locks.request('reborn-finished-lives',write):Promise.resolve().then(write);
                return task.then(()=>{if(this.summary===summary){this.archiveStatus='success';this.render();}}).catch(()=>{if(this.summary===summary){this.archiveStatus='failed';this.render();}});
            },
            downloadSummary(){
                if(!this.summary)return;
                const url=URL.createObjectURL(new Blob([JSON.stringify(this.summary,null,2)],{type:'application/json'}));
                const a=document.createElement('a');a.href=url;a.download='reborn-finished-life.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
            },
            render() {
                if(!this.active)return;
                if(!GameState.time)replaceState(upgradeState(GameState));
                normalize(GameState);
                document.body.classList.add('playing');
                document.getElementById('quickVitals').textContent=`ชีวิต ${GameState.hp}/${GameState.maxHp} · แรง ${GameState.stamina}/${GameState.maxStamina} · มานา ${GameState.mana}/${GameState.maxMana}`;
                document.body.classList.toggle('yearly-mode',GameState.yearly.view==='yearly');
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
                document.getElementById('displayAge').textContent=GameState.age<1?`อายุ ${Math.floor((GameState.time.absoluteDay-GameState.time.birthAbsoluteDay)/30)} เดือน`:`อายุ ${GameState.age} ปี`;
                document.getElementById('displayPower').textContent=`Lv. ${GameState.power?.level??1} / 100`;
                document.getElementById('timeControls').replaceChildren();
                document.getElementById('displayGold').textContent=`${GameState.gold} เหรียญ`;

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
                if(!Scenes[sceneId]?.isEnding&&GameState.yearly.view==='yearly'){renderYearly(document.getElementById('sceneContainer'),GameState,action=>this.perform(action),()=>this.render());return;}
                stopYearlyAuto();
                if(!Scenes[sceneId]?.isEnding&&GameState.life.mode==='annual') {renderLife(document.getElementById('sceneContainer'),GameState,action=>this.perform(action));return;}

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
                container.innerHTML = html;const setting=document.createElement("div");renderSetting(setting,GameState);container.prepend(setting);
                if(scene.isEnding){
                    const summary=document.createElement('section');summary.className='scene-text-box terminal-summary';
                    const text=document.createElement('p');text.textContent=`${GameState.name} • อายุ ${GameState.age} ปี • ${GameState.career} • ระดับพลัง ${GameState.power?.level??1}/100 • ${GameState.gold} เหรียญ • เวลาเล่นที่มีส่วนร่วม ${Math.floor(GameState.run.activeMs/1000)} วินาที`;summary.append(text);
                    const status=document.createElement('p');status.setAttribute('role','status');status.textContent=this.archiveStatus==='success'?'เก็บสรุปชีวิตที่จบแล้วในประวัติเรียบร้อย':this.archiveStatus==='failed'?'เก็บประวัติไม่ได้ ดาวน์โหลดสรุปชีวิตนี้ไว้ได้':'กำลังเก็บสรุปชีวิตที่จบแล้ว';summary.append(status);
                    if(this.archiveStatus==='failed'){const retry=document.createElement('button');retry.textContent='ลองเก็บประวัติอีกครั้ง';retry.onclick=()=>this.archiveEnding();summary.append(retry);}
                    const download=document.createElement('button');download.textContent='ดาวน์โหลดสรุปชีวิตที่จบแล้ว';download.onclick=()=>this.downloadSummary();summary.append(download);container.append(summary);
                }
                if(!scene.isEnding){const button=document.createElement('button');button.textContent='ใช้ชีวิตรายปีต่อโดยเก็บบทเดิมไว้';const token=storyToken(GameState);button.onclick=()=>this.perform({type:'dailyLife',token});container.append(button);}
            },

            legacyDays(choice){return legacyDays(GameState,choice);},
            choose(id,token){return this.perform({type:'legacyChoice',choiceId:id,token});},
            restartGame(){
                if(this.active&&GameState.run.status!=='ended'&&!confirm('ยุติชีวิตนี้และกลับหน้าเกิดใหม่หรือไม่? ชีวิตที่ยังไม่จบจะไม่เก็บในประวัติ'))return;
                this.abandon();this.onRestart?.();
            },
            abandon(){stopYearlyAuto();this.clock.pause(performance.now());this.active=false;this.summary=null;this.archiveStatus=null;},
            openCodex(){this.openPanel?.('career');},
            openEndings(){this.openPanel?.('archive');},
            downloadHistory(){
                try{const records=readArchive(localStorage),url=URL.createObjectURL(new Blob([JSON.stringify({version:1,lives:records},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='reborn-finished-lives.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(error){this.notify(error.message);}
            },
            closeModal(){closePanel();}
        };
