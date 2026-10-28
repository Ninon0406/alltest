import { upgradeState } from '../src/engine/migrate.js';
import { describe, it, expect } from 'vitest';
import { initialCharacter } from '../src/character/initial.js';
import { Scenes } from '../src/data/scenes.js';
import { canChoose } from '../src/engine/choices.js';
import { seededRandom } from '../src/engine/random.js';
import { decodeSave, writeSave } from '../src/save/storage.js';
describe('existing story graph', () => {
  it('has unique choices, valid destinations and executable effects', () => {
    const ids = [];
    for (const scene of Object.values(Scenes)) for (const choice of scene.choices ?? []) {
      ids.push(choice.id); expect(Scenes[choice.next]).toBeDefined();
      if (choice.effect) expect(typeof choice.effect).toBe('function');
    }
    expect(ids.length).toBeGreaterThan(0); expect(new Set(ids).size).toBe(ids.length);
  });
  it('enforces attribute and gold requirements', () => {
    expect(canChoose(initialCharacter, { req: { int: 13 } })).toBe(false);
    expect(canChoose(initialCharacter, { req: { gold: 26 } })).toBe(false);
    expect(canChoose(initialCharacter, { req: { int: 12, gold: 25 } })).toBe(true);
  });
});
describe('save compatibility', () => {
  it('round trips versioned state without losing fields', () => {
    let raw; writeSave({setItem: (_, value) => {raw = value;}}, initialCharacter);
    expect(JSON.parse(raw).version).toBe(3); expect(decodeSave(raw)).toEqual(upgradeState(initialCharacter));
  });
  it('loads legacy unversioned saves', () => expect(decodeSave(JSON.stringify(initialCharacter))).toEqual(upgradeState(initialCharacter)));
  it('rejects invalid and future saves', () => {
    for (const value of ['{', '{}', JSON.stringify({version: 4}), JSON.stringify({...initialCharacter, stats: {}}), JSON.stringify({...initialCharacter, currentSceneId:'missing'})]) expect(() => decodeSave(value)).toThrow();
  });
});
it('repeats random sequences for a fixed seed', () => {
  const a = seededRandom(42), b = seededRandom(42), c = seededRandom(43);
  const sequence = Array.from({length:20}, a);
  expect(sequence).toEqual(Array.from({length:20}, b));
  expect(sequence).not.toEqual(Array.from({length:20}, c));
  expect(sequence.every(n => n >= 0 && n < 1)).toBe(true);
});
