import { it, expect } from 'vitest';
import { generateBirth, weightedPick } from '../src/character/rebirth.js';
import { names, rarities, races, households, histories, talents } from '../src/data/birth.js';
import { initialCharacter } from '../src/character/initial.js';
import { decodeSave, writeSave } from '../src/save/storage.js';
import { GameState, replaceState } from '../src/engine/state.js';
import { Scenes } from '../src/data/scenes.js';
import { canChoose } from '../src/engine/choices.js';
it('has at least 100 distinct authored Thai names and valid weighted boundaries', () => {
  expect(names.length).toBeGreaterThanOrEqual(100); expect(new Set(names).size).toBe(names.length);
  expect(weightedPick(()=>0,rarities).id).toBe('common');
  expect(weightedPick(()=>0.7,rarities).id).toBe('uncommon');
  expect(weightedPick(()=>0.93,rarities).id).toBe('rare');
  expect(weightedPick(()=>0.99,rarities).id).toBe('legendary');
  expect(()=>weightedPick(()=>0,[])).toThrow();
});
it('generates reproducible, independent characters without mutating defaults', () => {
  const original=structuredClone(initialCharacter), births=Array.from({length:1000},(_,seed)=>generateBirth(seed));
  expect(generateBirth(321)).toEqual(generateBirth(321));
  expect(generateBirth(321)).not.toEqual(generateBirth(322));
  expect(initialCharacter).toEqual(original);
  for(const state of births) {
    const birth=state.birth, rarity=rarities.find(r=>r.id===birth.rarity), race=races.find(r=>r.id===birth.raceId);
    expect(names).toContain(state.name); expect(households).toContain(state.family); expect(histories).toContain(birth.history);
    expect(new Set([state.name,birth.parents.mother,birth.parents.father]).size).toBe(3);
    expect(state.gold).toBeGreaterThanOrEqual(rarity.gold[0]); expect(state.gold).toBeLessThanOrEqual(rarity.gold[1]);
    expect(birth.lifespan).toBeGreaterThanOrEqual(race.lifespan[0]); expect(birth.lifespan).toBeLessThanOrEqual(race.lifespan[1]);
    expect(birth.potential).toBeGreaterThanOrEqual(1); expect(birth.potential).toBeLessThanOrEqual(100);
    expect(Object.values(state.stats).every(n=>n>=9 && n<=15)).toBe(true);
    expect(state.hp).toBe(state.maxHp); expect(state.mana).toBe(state.maxMana); expect(state.stamina).toBe(state.maxStamina);
  }
  for(const rarity of rarities) expect(new Set(births.filter(s=>s.birth.rarity===rarity.id).map(s=>s.birth.talent)).size).toBe(talents.length);
  expect(new Set(births.map(s=>s.birth.hiddenAbility)).size).toBe(4);
});
it('follows the declared rarity weights over a deterministic sample', () => {
  const counts=Object.fromEntries(rarities.map(r=>[r.id,0]));
  for(let seed=0;seed<10000;seed++) counts[generateBirth(seed).birth.rarity]++;
  for(const rarity of rarities) expect(Math.abs(counts[rarity.id]/10000-rarity.weight/100)).toBeLessThan(0.02);
});
it('round trips hidden data and immutable birth snapshots while preserving old saves', () => {
  const state=generateBirth(321), birth=structuredClone(state.birth);
  state.stats.int+=4;state.gold+=100;state.age=6;
  let raw;writeSave({setItem:(_,value)=>{raw=value;}},state);
  expect(decodeSave(raw)).toEqual(state); expect(decodeSave(raw).birth).toEqual(birth);
  expect(decodeSave(JSON.stringify({version:1,state:initialCharacter}))).toEqual(initialCharacter);
  expect(decodeSave(JSON.stringify(initialCharacter))).toEqual(initialCharacter);
  const invalid=structuredClone(state);invalid.birth.parents.mother='<bad>';
  expect(()=>decodeSave(JSON.stringify({version:2,state:invalid}))).toThrow();
  expect(()=>generateBirth(-1)).toThrow();
});
it('keeps every reachable branch playable for 100 random births', () => {
  function visit(state, depth=0) {
    expect(depth).toBeLessThan(20);
    const scene=Scenes[state.currentSceneId]; if(scene.isEnding)return;
    const available=scene.choices.filter(c=>canChoose(state,c)); expect(available.length).toBeGreaterThan(0);
    for(const choice of available) {
      replaceState(structuredClone(state)); choice.effect?.(); GameState.day++;GameState.currentSceneId=choice.next;
      visit(structuredClone(GameState),depth+1);
    }
  }
  for(let seed=0;seed<100;seed++)visit(generateBirth(seed));
  replaceState(structuredClone(initialCharacter));
});
