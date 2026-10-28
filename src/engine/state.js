import { initialCharacter } from '../character/initial.js';
export let GameState = structuredClone(initialCharacter);
export function replaceState(state) { GameState = state; }
