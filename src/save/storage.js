import { validAppearance } from '../character/appearance.js';
import { initialCharacter } from '../character/initial.js';
import { Scenes } from '../data/scenes.js';
import { generateBirth } from '../character/rebirth.js';
export const SAVE_VERSION = 2;
const canonical = value => JSON.stringify(value, (_, item) => item && typeof item === 'object' && !Array.isArray(item) ? Object.fromEntries(Object.entries(item).sort(([a],[b])=>a.localeCompare(b))) : item);
export function decodeSave(raw) {
  const parsed = JSON.parse(raw);
  if (!parsed || (parsed.version !== undefined && ![1, SAVE_VERSION].includes(parsed.version))) throw new Error('Unsupported save version');
  const state = parsed.version !== undefined ? parsed.state : parsed;
  if (!state || !Scenes[state.currentSceneId]) throw new Error('Unknown scene');
  for (const [key, value] of Object.entries(initialCharacter)) {
    if (typeof state[key] !== typeof value || state[key] === null) throw new Error('Invalid state');
    if (typeof value === 'number' && !Number.isFinite(state[key])) throw new Error('Invalid number');
    if (Array.isArray(value) && (!Array.isArray(state[key]) || state[key].some(item => typeof item !== 'string'))) throw new Error('Invalid list');
    if (typeof value === 'object' && !Array.isArray(value)) {
      for (const field of Object.keys(value)) if (!Number.isFinite(state[key][field])) throw new Error('Invalid attributes');
    }
  }
  if (state.birth !== undefined && canonical(state.birth) !== canonical(generateBirth(state.birth?.seed).birth)) throw new Error('Invalid birth record');
  if (state.appearance !== undefined && !validAppearance(state.appearance)) throw new Error('Invalid appearance');
  return state;
}
export function readSave(storage) { const raw = storage.getItem('reborn_save'); return raw ? decodeSave(raw) : null; }
export function writeSave(storage, state) { storage.setItem('reborn_save', JSON.stringify({ version: SAVE_VERSION, state })); }
