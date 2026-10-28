import { advanceTime } from '../src/engine/time.js';
import { it, expect } from 'vitest';
import { generateBirth } from '../src/character/rebirth.js';
import { portrait } from '../src/ui/avatar/portrait.js';
import { createAppearance, validAppearance } from '../src/character/appearance.js';
import { initialCharacter } from '../src/character/initial.js';
import { decodeSave, writeSave } from '../src/save/storage.js';
it('has stable, valid identity for births and legacy characters',()=>{
 for(let seed=0;seed<200;seed++){const state=generateBirth(seed);expect(validAppearance(state.appearance)).toBe(true);expect(state.appearance).toEqual(createAppearance(state));}
 expect(createAppearance(initialCharacter)).toEqual(createAppearance(structuredClone(initialCharacter)));
});
it('changes age and career layers without rerolling identity and preserves it through saves',()=>{
 const state=generateBirth(9), identity=structuredClone(state.appearance), baby=portrait(state);
 advanceTime(state,65*360);state.career='นักเวท';state.stats.int=20;
 expect(portrait(state)).not.toEqual(baby);expect(state.appearance).toEqual(identity);expect(portrait(state)).toContain('data-layer="aura"');
 let raw;writeSave({setItem:(_,value)=>{raw=value;}},state);expect(portrait(decodeSave(raw))).toBe(portrait(state));
});
it('rejects invalid identity and does not interpolate saved strings as SVG',()=>{
 const state=generateBirth(3);state.career='<script>';state.race='<img onerror=bad>';expect(portrait(state)).not.toContain('<script>');
 state.appearance.hair=999;expect(()=>decodeSave(JSON.stringify({version:2,state}))).toThrow();
});
