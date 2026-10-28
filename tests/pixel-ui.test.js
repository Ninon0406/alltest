import {it,expect} from 'vitest';
import {generateBirth} from '../src/character/rebirth.js';
import {locations} from '../src/world/locations.js';
import {locationArt} from '../src/ui/scene.js';
import {sprite} from '../src/ui/avatar/sprite.js';
import {createRun} from '../src/engine/run.js';
import {dispatch} from '../src/engine/actions.js';
import {storyToken} from '../src/engine/life.js';
it('renders 20 distinct actual tile compositions, with labels excluded from the variation count',()=>{
 const art=Object.values(locations).map(l=>locationArt(l).replace(/aria-label="[^"]*"/,''));expect(new Set(art).size).toBe(20);for(const l of Object.values(locations))expect(locationArt(l)).toBe(locationArt(l));
});
it('keeps pixel identity stable across render and visibly changes age stage without modifying birth',()=>{
 const s=generateBirth(7),before=structuredClone(s);expect(sprite(s)).toBe(sprite(s));expect(sprite(s)).toContain('วัยทารก');s.age=18;expect(sprite(s)).toContain('วัยผู้ใหญ่');s.age=70;expect(sprite(s)).toContain('วัยชรา');expect(s.appearance).toEqual(before.appearance);expect(s.birth).toEqual(before.birth);
});
it('renders all existing races and never invents an equipped weapon from the career label',()=>{
 const s=generateBirth(5);for(const race of ['มนุษย์','พรายพฤกษา','ชนศิลา','สายเลือดดารา']){s.race=race;expect(sprite(s)).toContain('<svg');expect(sprite(s)).toContain('shape-rendering="crispEdges"');}s.career='นักดาบ';expect(sprite(s)).not.toContain('weapon');
});
it('labels initial power honestly and cannot gain levels or deity status just by skipping years',()=>{
 let s=createRun(8,{id:'pixel-test',startedAt:'2026-10-29T00:00:00Z'});s=dispatch(s,{type:'advanceYears',years:5,token:storyToken(s)});expect(s.power.level).toBe(1);expect(()=>dispatch(s,{type:'ascend',token:storyToken(s)})).toThrow();
});
