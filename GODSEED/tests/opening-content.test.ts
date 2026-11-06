import {describe,it,expect} from 'vitest';
import {scenes,openingSceneIds} from '../src/content/story';
import {fresh,type State} from '../src/engine/state';
import {choose,craft} from '../src/systems/game';
import {choiceAvailability,clueCount} from '../src/systems/story';
import {allSpells,byId} from '../src/systems/spells';
import {encodeSave,decodeSave} from '../src/engine/save-file';
import {sceneDefinitions,walkable} from '../src/scenes/scene-definitions';

const take=(state:State,...ids:string[])=>ids.reduce((s,id)=>choose(s,id),state);
const hub=()=>take(fresh('ผู้ช่วยงานคืนแรก',807),'CH0001','CH0101');
const trained=()=>craft(take(hub(),'CH0202','CH0401'),'WIND','ORB','SEEK');
function supplied(){
 let s=take(trained(),'CH0201','CH0301','CH03B1','CH0204','CH0701','CH1401');
 s=take(s,'CH0205','CH0802','CH0903','CH1301');return s;
}
const prep=(s=supplied())=>choose(s,'CH0208');
function ready(s=prep()){
 return take(s,'CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND','CH1802','CHV6_NOTES_MARK','CHV6_NOTES_COPY','CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_RECORD');
}
const rehearse=(s=ready(),vow='CHV6_VOW_SHARE')=>take(s,'CH1810',vow,'CHV6_REHEARSE_SLOW');
const firstSong=(s=rehearse())=>choose(s,'CH1903');
const complete=(s=firstSong())=>take(s,'CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER','CHV6_MORNING_FINISH');
const enabled=(s:State,id:string)=>choiceAvailability(s,scenes[s.scene].choices.find(c=>c.id===id)!).enabled;

describe('V6 opening: a completed evening from real choices',()=>{
 it('keeps the festival gate shut until actual help, crafting and two clues exist',()=>{
  const s=hub(),copy=structuredClone(s);expect(enabled(s,'CH0208')).toBe(false);expect(()=>choose(s,'CH0208')).toThrow();expect(s).toEqual(copy);
  const oneClue=take(trained(),'CH0201','CH0303','CH03B3','CH0204','CH0701','CH1401');
  expect(clueCount(oneClue)).toBe(1);expect(enabled(oneClue,'CH0208')).toBe(false);
  const twoClues=take(oneClue,'CH0206','CH1103','CH1202');expect(clueCount(twoClues)).toBe(2);expect(enabled(twoClues,'CH0208')).toBe(true);
  expect(choose(twoClues,'CH0208').flags.festival_ready).toBe(true);
 });
 it('requires all three completed preparation activities rather than mere visits',()=>{
  let s=prep();expect(enabled(s,'CH1810')).toBe(false);
  s=take(s,'CH1801','CHV6_BOX_BACK','CH1802','CHV6_NOTES_BACK','CH1803','CHV6_LIGHT_BACK');expect(enabled(s,'CH1810')).toBe(false);
  s=take(s,'CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND');expect(s.flags.a1_musicbox_ready).toBe(true);expect(enabled(s,'CH1810')).toBe(false);
  s=take(s,'CH1802','CHV6_NOTES_MARK','CHV6_NOTES_COPY');expect(enabled(s,'CH1810')).toBe(false);
  s=take(s,'CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_RECORD');expect(enabled(s,'CH1810')).toBe(true);
 });
 it('plays from the first wake-up to the morning quest conclusion without battle or injected state',()=>{
  expect(rehearse().ticks%3).toBe(2);expect(complete().ticks%3).toBe(0);
  const s=complete();expect(s.scene).toBe('S02_HUB');expect(s.flags.arc1_opening_complete).toBe(true);expect(s.flags.a1_festival_quest_complete).toBe(true);expect(s.flags.a1_resolution_shared).toBe(true);
  expect(s.inventory.MOD_AMPLIFY).toBe(1);expect(s.inventory.IT_POTION_DEW).toBe(3);expect(s.known).toEqual(['SPELL_WIND_ORB_SEEK']);expect(s.equipped).toEqual(s.known);expect(s.rewarded).toEqual([]);
  expect(s.flags.guardian_resolved).not.toBe(true);expect(s.flags.song_restored).not.toBe(true);expect(s.battle).toBeUndefined();expect(s.journal).toContain('รับของขอบคุณแล้วกลับไปใช้ชีวิตในหมู่บ้าน');
 });
 it('lets earlier care unlock a quiet resolution only after inviting Maren',()=>{
  const noInvite=firstSong();expect(enabled(noInvite,'CHV6_CLOSE_CARE')).toBe(false);expect(noInvite.flags.maren_listened).toBe(true);
  const invited=take(prep(),'CH1809','CHV6_INVITE_MAREN'),s=firstSong(rehearse(ready(invited),'CHV6_VOW_CARE'));
  expect(enabled(s,'CHV6_CLOSE_CARE')).toBe(true);const out=take(s,'CHV6_CLOSE_CARE','CHV6_CARE_STAY','CHV6_MORNING_FINISH');
  expect(out.flags.a1_resolution_care).toBe(true);expect(out.flags.a1_resolution_shared).toBe(false);expect(out.flags.a1_maren_comforted).toBe(true);expect(out.flags.arc1_opening_complete).toBe(true);
 });
 it('recognizes the prior shrine copy when unlocking the knowledge resolution',()=>{
  const noCopy=firstSong();expect(enabled(noCopy,'CHV6_CLOSE_KNOWLEDGE')).toBe(false);
  const oldQuest=take(supplied(),'CH0207','CH1501','CH1702','CH0701','CH1401');expect(oldQuest.flags.archive_notes_complete).toBe(true);
  const s=firstSong(rehearse(ready(prep(oldQuest)),'CHV6_VOW_LEARN'));expect(enabled(s,'CHV6_CLOSE_KNOWLEDGE')).toBe(true);
  const out=take(s,'CHV6_CLOSE_KNOWLEDGE','CHV6_KNOWLEDGE_SHARE','CHV6_MORNING_LEARN');expect(out.scene).toBe('S04_KORO');expect(out.flags.a1_public_copy).toBe(true);expect(out.flags.a1_resolution_knowledge).toBe(true);expect(out.flags.arc1_opening_complete).toBe(true);
 });
 it('offers a new original rune-copy route when the old archive quest was not completed',()=>{
  const start=take(supplied(),'CH0207','CH1501','CH1701');expect(start.flags.archive_notes_complete).not.toBe(true);
  let s=take(prep(start),'CH1808','CHV6_RUIN_TRACE','CHV6_RUNE_COPY');expect(s.flags.a1_rune_copy).toBe(true);const linger=s.inventory.MOD_LINGER;
  s=take(s,'CH1808','CHV6_RUIN_LISTEN','CHV6_RUNE_COPY');expect(s.inventory.MOD_LINGER).toBe(linger);
  const out=take(firstSong(rehearse(ready(s))),'CHV6_CLOSE_KNOWLEDGE','CHV6_KNOWLEDGE_QUESTION','CHV6_MORNING_FINISH');expect(out.flags.a1_next_question).toBe(true);expect(out.flags.arc1_opening_complete).toBe(true);
 });
 it('preparation alternatives share their one-time reward and keep the latest treatment',()=>{
  let s=take(prep(),'CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND');const orbs=s.inventory.FORM_ORB,trust=s.trust.KORO||0;
  s=take(s,'CH1801','CHV6_BOX_ASK','CHV6_BOX_WIND');expect(s.inventory.FORM_ORB).toBe(orbs);expect(s.trust.KORO||0).toBe(trust);expect(s.flags.a1_box_handmade).toBe(false);expect(s.flags.a1_box_wind_tuned).toBe(true);
  s=take(s,'CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_TEACH');const light=s.inventory.CORE_LIGHT;
  s=take(s,'CH1803','CHV6_LIGHT_WIND','CHV6_LIGHT_RECORD');expect(s.inventory.CORE_LIGHT).toBe(light);expect(s.flags.a1_light_reflected).toBe(false);expect(s.flags.a1_light_wind).toBe(true);
 });
 it('one morning reward is shared by both exits and survives replay through a file',async()=>{
  const once=complete(),amplify=once.inventory.MOD_AMPLIFY,potions=once.inventory.IT_POTION_DEW;
  const imported=(await decodeSave(await encodeSave(once))).state;expect(imported).toEqual(once);
  const out=take(firstSong(rehearse(ready(prep(imported)))),'CHV6_CLOSE_SHARE','CHV6_SHARED_REST','CHV6_MORNING_LEARN');
  expect(out.inventory.MOD_AMPLIFY).toBe(amplify);expect(out.inventory.IT_POTION_DEW).toBe(potions);expect(out.flags.a1_shared_silence).toBe(true);
 });
 it('the promise changes through real replay rather than ambiguous first-visit history',()=>{
  const prior=complete(),at=take(prep(prior),'CH1810','CHV6_VOW_LEARN');expect(at.choices).toEqual(expect.arrayContaining(['CHV6_VOW_SHARE','CHV6_VOW_LEARN']));
  expect(at.flags.a1_vow_share).toBe(false);expect(at.flags.a1_vow_care).toBe(false);expect(at.flags.a1_vow_learn).toBe(true);
 });
 it('can investigate the seal and still return to the completed evening',()=>{
  const at=take(rehearse(),'CH1901');expect(at.scene).toBe('S20_SEAL_PASSAGE');expect(at.flags.seal_gate_found).toBe(true);
  const out=complete(choose(at,'CH2002'));expect(out.inventory.CORE_SHADOW).toBe(1);expect(out.flags.a1_seal_sample).toBe(true);expect(out.flags.arc1_opening_complete).toBe(true);
  let again=take(prep(out),'CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW','CH1901','CH2002');expect(again.inventory.CORE_SHADOW).toBe(1);
  again=take(again,'CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER','CHV6_MORNING_FINISH');expect(again.inventory.MOD_AMPLIFY).toBe(1);
 });
 it('optional garden and stream activities provide ingredients for an actual new healing recipe',()=>{
  let s=take(prep(take(supplied(),'CH0203','CH0601')),'CH1805','CHV6_GARDEN_KNOWN','CHV6_GARDEN_HAND','CH1806','CHV6_STREAM_RHYTHM','CHV6_BELL_KEEP');
  const before=s.inventory.CORE_WATER;s=craft(s,'WATER','RING','HEAL');expect(s.known).toContain('SPELL_WATER_RING_HEAL');expect(s.inventory.CORE_WATER).toBe(before-1);expect(byId.SPELL_WATER_RING_HEAL.heal).toBeGreaterThan(0);
  s=take(s,'CH1805','CHV6_GARDEN_HELP','CHV6_GARDEN_WATER');expect(s.flags.a1_garden_watered).toBe(true);expect(s.inventory.CORE_BLOOM).toBe(3);
 });
 it('a previously cleaned stream changes available observations while hand routes stay open',()=>{
  const uncleared=choose(prep(),'CH1806');expect(enabled(uncleared,'CHV6_STREAM_CLEAR')).toBe(false);expect(enabled(uncleared,'CHV6_STREAM_RHYTHM')).toBe(true);
  const restored=take(supplied(),'CH0206','CH1102','CH1202'),at=take(prep(restored),'CH1806');expect(enabled(at,'CHV6_STREAM_CLEAR')).toBe(true);
  const out=take(at,'CHV6_STREAM_CLEAR','CHV6_BELL_SHARE');expect(out.flags.a1_clear_stream_heard).toBe(true);expect(out.flags.a1_pip_rhythm).toBe(true);
 });
 it('supports ECHO and FIRE story actions only after genuine discovery from existing sources',()=>{
  let s=take(supplied(),'CH0202','CH0405');s=craft(s,'FIRE','ORB','SPLIT');s=take(s,'CH0503','CH0204','CH0702','CH1402','CH0202','CH0402');s=craft(s,'ECHO','ORB','LINGER');s=choose(s,'CH0503');
  s=take(prep(s),'CH1803','CHV6_LIGHT_FIRE','CHV6_LIGHT_RECORD','CH1802','CHV6_NOTES_LISTEN','CHV6_NOTES_ECHO');
  expect(s.flags.a1_light_fire).toBe(true);expect(s.flags.a1_echo_compared).toBe(true);expect(s.known).toEqual(expect.arrayContaining(['SPELL_FIRE_ORB_SPLIT','SPELL_ECHO_ORB_LINGER']));
  const plain=choose(prep(),'CH1803'),copy=structuredClone(plain);expect(()=>choose(plain,'CHV6_LIGHT_FIRE')).toThrow();expect(plain).toEqual(copy);
 });
 it('persists each authored new checkpoint and all NPC/inventory facts in an explicitly exported file',async()=>{
  let s=prep();for(const id of ['CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND','CH1802','CHV6_NOTES_MARK','CHV6_NOTES_COPY','CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_RECORD','CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW','CH1901','CH2001','CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER']){
   s=choose(s,id);const file=await encodeSave(s),loaded=(await decodeSave(file)).state;expect(loaded).toEqual(s);expect(JSON.parse(file).checkpoint.sceneId).toBe(s.scene);expect(loaded.version).toBe(2);
  }
 });
 it('declares real source-map anchors for new staged scenes/actions without invalid references',()=>{
  const stageLocation={village:'village_center',garden:'elder_garden',workshop:'spell_workshop',ruins:'ancient_shrine'} as const;
  for(const id of openingSceneIds){const scene=scenes[id];expect(scene.choices.length).toBeGreaterThan(1);for(const c of scene.choices)expect(scenes[c.next]).toBeDefined();
   if(scene.stage in stageLocation){const location=stageLocation[scene.stage as keyof typeof stageLocation],def=sceneDefinitions[location];expect(scene.staging?.location).toBe(location);expect(walkable(def,def.anchors[scene.staging!.anchor])).toBe(true);
    for(const c of scene.choices){expect(c.cinematic).toBeDefined();expect(def.anchors[c.cinematic!.anchor],c.id).toBeDefined();expect(walkable(def,def.anchors[c.cinematic!.anchor])).toBe(true);}
   }
  }
  expect(openingSceneIds).toHaveLength(25);expect(allSpells).toHaveLength(234);
 });
 it('all 25 new nodes are visited by real actions across the three meaningful resolutions',()=>{
  const visited=new Set<string>();const travel=(s:State,...ids:string[])=>{visited.add(s.scene);for(const id of ids){s=choose(s,id);visited.add(s.scene);}return s;};
  let s=prep(take(supplied(),'CH0207','CH1501','CH1701'));visited.add(s.scene);
  s=travel(s,'CH1805','CHV6_GARDEN_HELP','CHV6_GARDEN_HAND','CH1806','CHV6_STREAM_RHYTHM','CHV6_BELL_KEEP','CH1807','CHV6_FOREST_REMEMBER','CHV6_FOREST_FALLEN','CH1808','CHV6_RUIN_TRACE','CHV6_RUNE_COPY','CH1809','CHV6_INVITE_MAREN','CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND','CH1802','CHV6_NOTES_MARK','CHV6_NOTES_COPY','CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_RECORD','CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW','CH1901','CH2001');
  for(const [branch,ending] of [['CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER'],['CHV6_CLOSE_CARE','CHV6_CARE_NOTE'],['CHV6_CLOSE_KNOWLEDGE','CHV6_KNOWLEDGE_QUESTION']])travel(s,branch,ending,'CHV6_MORNING_FINISH');
  expect(openingSceneIds.filter(id=>!visited.has(id))).toEqual([]);
 });
});
