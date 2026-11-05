import {describe,it,expect} from 'vitest';
import {fresh,schema,type State} from '../src/engine/state';
import {decodeSave,encodeSave} from '../src/engine/save-file';
import {choose,craft,fight,intent} from '../src/systems/game';
import {choiceAvailability,clueCount,rememberedLines,nextHint} from '../src/systems/story';
import {scenes} from '../src/content/story';

const path=(initial:State,ids:string[])=>ids.reduce((state,id)=>choose(state,id),initial);
const hub=()=>path(fresh('ผู้ฟังสายน้ำ',79),['CH0001','CH0101']);
const wind=()=>craft(path(hub(),['CH0202','CH0401']),'WIND','ORB','SEEK');
const stream=()=>path(wind(),['CH0206','CH1101']);
function win(initial:State){let s=initial;for(let n=0;s.battle&&n<30;n++)s=fight(s,s.mp>=10?'SPELL_WIND_ORB_SEEK':'BASIC_PULSE');expect(s.battle).toBeUndefined();expect(s.scene).toBe('S12_STREAM_RESULT');return s;}

describe('canonical archive and stream routes',()=>{
 it('shows and enforces the same OR gate and known-WIND condition without mutating a rejected choice',()=>{
  const s=hub(),copy=structuredClone(s),route=scenes.S02_HUB.choices.find(c=>c.id==='CH0206')!;
  expect(choiceAvailability(s,route)).toMatchObject({enabled:false,reason:'คุยกับลูมิหรือผสมเวทแรกก่อน'});
  expect(()=>choose(s,'CH0206')).toThrow();expect(s).toEqual(copy);
  const fromLumi=path(s,['CH0201','CH0302','CH03B3','CH0206']);
  const windChoice=scenes.S11_STREAM.choices.find(c=>c.id==='CH1102')!;
  expect(choiceAvailability(fromLumi,windChoice).enabled).toBe(false);
  expect(()=>choose(fromLumi,'CH1102')).toThrow();
  expect(choose(wind(),'CH0206').scene).toBe('S11_STREAM');
 });
 it('a first craft outside Koro opens the forest through the canonical OR gate',()=>{
  const collected=path(hub(),['CH0201','CH0302','CH03B3','CH0206','CH1103','CH1202','CH0203','CH0601']);
  const firstCraft=craft(collected,'WATER','RING','HEAL');
  expect(firstCraft.flags.crafted_first).toBe(true);expect(firstCraft.flags.forest_open).not.toBe(true);
  const route=scenes.S02_HUB.choices.find(c=>c.id==='CH0205')!;
  expect(choiceAvailability(firstCraft,route).enabled).toBe(true);
  expect(choose(firstCraft,'CH0205').scene).toBe('S08_FOREST_GATE');
 });
 it('all nine archive branches return with the same essential facts, no battle or missing exit',()=>{
  for(const first of ['CH0701','CH0702','CH0703'])for(const second of ['CH1401','CH1402','CH1403']){
   const entry=path(hub(),['CH0204',first]);
   expect(entry.flags.archive_read).toBe(true);expect(entry.scene).toBe('S14_RESEARCH');
   const end=choose(entry,second);
   expect(end.scene).toBe('S02_HUB');expect(end.flags.ruins_open).toBe(true);
   expect(end.battle).toBeUndefined();expect(clueCount(end)).toBe(1);
  }
 });
 it('rare archive gifts and Eira trust are remembered once even after revisiting',async()=>{
  let s=path(hub(),['CH0204','CH0703','CH1401','CH0204','CH0702','CH1402','CH0204','CH0701','CH1403']);
  const inventory=structuredClone(s.inventory),trust=s.trust.EIRA;
  expect(inventory).toMatchObject({FORM_RAY:1,MOD_LINGER:1,CORE_ECHO:1});expect(trust).toBe(4);
  s=(await decodeSave(await encodeSave(s))).state;
  s=path(s,['CH0204','CH0703','CH1401','CH0204','CH0702','CH1402','CH0204','CH0701','CH1403']);
  expect(s.inventory).toEqual(inventory);expect(s.trust.EIRA).toBe(trust);
  expect(s.choices.filter(id=>id==='CH1402')).toHaveLength(1);
 });
 it('wind bypass uses an actually learned element and never grants combat rewards',()=>{
  const before=choose(wind(),'CH0206'),after=choose(before,'CH1102');
  expect(after.flags).toMatchObject({stream_clean:true,stream_clue:true});expect(after.scene).toBe('S12_STREAM_RESULT');
  expect(after.mp).toBe(before.mp);expect(after.rng).toBe(before.rng);expect(after.xp).toBe(before.xp);
  expect(after.flags.battle_B02_done).not.toBe(true);expect(after.rewarded).toEqual([]);
 });
 it('listening preserves a cleaned stream and bell/quest rewards are one-time',()=>{
  let s=path(wind(),['CH0206','CH1102','CH1201']);
  expect(s.inventory).toMatchObject({IT_OLD_BELL:1,CORE_WATER:1});
  s=path(s,['CH0206','CH1102','CH1202']);expect(s.flags.stream_clean).toBe(true);
  s=path(s,['CH0206','CH1102','CH1201']);expect(s.inventory.IT_OLD_BELL).toBe(1);expect(s.inventory.CORE_WATER).toBe(1);
  const gentle=path(hub(),['CH0201','CH0302','CH03B3','CH0206','CH1103','CH1202']);
  expect(gentle.flags.stream_clue).toBe(true);expect(gentle.flags.stream_clean).not.toBe(true);expect(gentle.rewarded).toEqual([]);
 });
 it('stream materials use game-day limits and can actually craft WATER and ECHO recipes',()=>{
  // Real story choices, including revisits; no ingredient injection.
  let s=path(wind(),['CH0203','CH0601','CH0210','CH0206','CH1103','CH1202']);
  const day=Math.floor(s.ticks/3),count=s.inventory.CORE_WATER;
  s=path(s,['CH0206','CH1103','CH1202']);
  expect(Math.floor(s.ticks/3)).toBe(day);expect(s.inventory.CORE_WATER).toBe(count);
  s=craft(s,'WATER','RING','HEAL');expect(s.known).toContain('SPELL_WATER_RING_HEAL');
  s=path(s,['CH0202','CH0402','CH0503','CH0204','CH0703','CH1401','CH0204','CH0701','CH1402']);
  s=craft(s,'ECHO','ORB','LINGER');expect(s.known).toContain('SPELL_ECHO_ORB_LINGER');
  expect(s.inventory.CORE_ECHO).toBe(0);expect(s.inventory.FORM_ORB).toBe(0);expect(s.inventory.FORM_RAY).toBe(1);expect(s.inventory.MOD_LINGER).toBe(0);
  const targetDay=Math.floor(s.ticks/3);s=path(s,['CH0210','CH0210','CH0210','CH0206','CH1103']);
  expect(Math.floor(s.ticks/3)).toBeGreaterThan(targetDay);expect(s.inventory.CORE_WATER).toBeGreaterThan(0);
 });
 it('memory lines and journal hints only describe witnessed facts',()=>{
  expect(rememberedLines(hub(),scenes.S07_ARCHIVE)).toEqual([]);
  const heard=path(wind(),['CH0206','CH1103','CH1202','CH0204']);
  expect(rememberedLines(heard,scenes.S07_ARCHIVE).join('')).toContain('จำจังหวะกระดิ่ง');
  expect(rememberedLines(heard,scenes.S07_ARCHIVE).join('')).not.toContain('กลับมาใส');
  const clean=path(wind(),['CH0206','CH1102','CH1201','CH0204']);
  expect(rememberedLines(clean,scenes.S07_ARCHIVE).join('')).toContain('กลับมาใส');
  const gift=path(wind(),['CH0206','CH1103','CH1203']);
  expect(rememberedLines(gift,scenes.S03B_MAREN).join('')).toContain('หยดน้ำ');
  expect(nextHint(hub())).toContain('ลูมิ');expect(clueCount(clean)).toBe(1);
 });
});

describe('stream encounter telegraph, rewards and compatible saves',()=>{
 it('uses its own 52HP/8power and locks intent before the player crosses low HP',()=>{
  let s=stream();expect(s.battle).toMatchObject({id:'B02_STREAM_WISP',enemyHp:52,checkpoint:'S11_STREAM',next:'S12_STREAM_RESULT'});
  expect(intent(s)).toContain('โจมตี 8');s=fight(s,'SPELL_WIND_ORB_SEEK');
  expect(s.battle!.enemyHp).toBe(27);expect(s.hp).toBe(92);expect(intent(s)).toContain('โจมตี 8');
  s=fight(s,'BASIC_PULSE');expect(s.battle!.enemyHp).toBe(23);expect(s.hp).toBe(84); // Telegraphed splash, not an unannounced mist.
  s=fight(s,'GUARD');expect(intent(s)).toContain('ม่านหมอก');
  const hp=s.hp;s=fight(s,'GUARD');expect(s.hp).toBe(hp);expect(s.battle!.playerStatus.VEIL).toBe(1);
  expect(intent(s)).toContain('โจมตี 8');s=fight(s,'GUARD');expect(s.battle!.playerStatus.VEIL).toBeUndefined();
 });
 it('separates B02 rewards/XP from forest and practice and cannot duplicate a win reward',async()=>{
  let s=win(stream());expect(s.xp).toBe(24);expect(s.inventory.CORE_WATER).toBe(1);
  expect(s.flags.battle_B02_done).toBe(true);expect(s.flags.training_won).not.toBe(true);expect(s.flags.battle_B01_done).not.toBe(true);
  s=(await decodeSave(await encodeSave(s))).state;
  s=win(path(s,['CH1202','CH0206','CH1101']));expect(s.xp).toBe(24);expect(s.inventory.CORE_WATER).toBe(1);
 });
 it('flee/loss/retry return to the stream checkpoint without losing inventory or farming rewards',()=>{
  const initial=stream(),fled=fight(initial,'FLEE');expect(fled.scene).toBe('S11_STREAM');expect(fled.rewarded).toEqual([]);
  expect(()=>fight(initial,'SURRENDER')).toThrow();
  const low=structuredClone(initial);low.hp=1;const lost=fight(low,'GUARD');
  expect(lost.scene).toBe('S28_RECOVER');expect(lost.recoveryScene).toBe('S11_STREAM');
  const retry=choose(lost,'CH2801');expect(retry.scene).toBe('S11_STREAM');expect(retry.inventory).toEqual(initial.inventory);
  expect(retry).toMatchObject({hp:70,mp:20});expect(retry.rewarded).toEqual([]);
 });
 it('round-trips a stable B02 turn with schema2/database1/envelope1 and rejects invalid HP',async()=>{
  const s=fight(stream(),'SPELL_WIND_ORB_SEEK'),encoded=await encodeSave(s),loaded=await decodeSave(encoded);
  expect(loaded.state).toEqual(s);expect(JSON.parse(encoded).formatVersion).toBe(1);expect(s.version).toBe(2);
  const invalid=structuredClone(s);invalid.battle!.enemyHp=53;expect(schema.safeParse(invalid).success).toBe(false);
 });
 it('preserves every field of an original published State2 battle',()=>{
  // Explicit historical-contract fixture; does not count as authored story content.
  const old={version:2 as const,xp:15,runId:'published-0.3-run',seed:791,rng:8,revision:23,name:'ความทรงจำเดิม',scene:'S09_FOREST',ticks:11,hp:67,mp:18,
   inventory:{IT_POTION_DEW:2,CORE_FIRE:1},known:['SPELL_WIND_ORB_SEEK'],equipped:['SPELL_WIND_ORB_SEEK'],flags:{crafted_first:true,forest_open:true},choices:['CH0001','CH0101'],trust:{KORO:1},rewarded:['win:BT_TRAINING'],gathered:{CH0802:2},journal:['ความทรงจำเดิม'],recoveryScene:'S04_KORO',
   battle:{id:'B01_FOREST_SPROUT' as const,enemyHp:18,turn:4,shield:4,shieldTurns:1,status:{WET:1},playerStatus:{GROUNDED:1},log:['ผลเทิร์นเดิม'],checkpoint:'S09_FOREST',next:'S10_FOREST_RESULT'}};
  const snapshot=structuredClone(old);expect(schema.parse(old)).toEqual(snapshot);expect(old).toEqual(snapshot);
 });
});
