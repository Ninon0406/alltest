import {it,expect} from 'vitest';
import {createRun} from '../src/engine/run.js';
import {generateBirth} from '../src/character/rebirth.js';
import {createAppearance,validAppearance} from '../src/character/appearance.js';
import {createInheritedAppearance,validInheritedAppearance,inheritedTraits,appearanceSnapshot} from '../src/character/inheritance.js';
import {groups,garmentGroups} from '../src/data/appearance-v2.js';
import {validWardrobe} from '../src/character/wardrobe.js';
import {sprite} from '../src/ui/avatar/sprite.js';
import {portrait} from '../src/ui/avatar/portrait.js';
import {act,simulateV7} from '../scripts/v7-simulation.mjs';
import {dispatch} from '../src/engine/actions.js';
import {storyToken} from '../src/engine/life.js';
import {pendingDecision} from '../src/engine/decisions.js';
import {completedSummary,archiveCompleted,readArchive} from '../src/save/archive.js';
import {verifyCharacterAssets} from '../scripts/verify-character-assets.mjs';
const fresh=seed=>createRun(seed,{id:'inheritance-'+seed,startedAt:'2026-10-29T00:00:00Z'});
it('adds appearance-v2 only to new runs, keeping every frozen birth/stat/resource draw unchanged',()=>{
 for(let seed=0;seed<100;seed++){
  const historical=generateBirth(seed),before=structuredClone(historical),next=fresh(seed);
  expect(next.birth).toEqual(historical.birth);expect(next.stats).toEqual(historical.stats);expect(next.gold).toBe(historical.gold);expect(next.world).toEqual(historical.world);
  expect(historical.appearance).toEqual(createAppearance(historical));expect(historical.appearance.version).toBe(1);expect(historical).toEqual(before);
  expect(next.appearance).toEqual(createInheritedAppearance(seed));expect(validAppearance(next.appearance)).toBe(true);expect(validWardrobe(next.wardrobe)).toBe(true);
 }
});
it('inherits at least four actual parental traits, small bounded variation and covers all twenty visible choices',()=>{
 const seen=Object.fromEntries(inheritedTraits.map(k=>[k,new Set()])),wardrobe=new Set();let mother=0,father=0,variations=0;
 for(let seed=0;seed<1000;seed++){
  const s=fresh(seed),a=s.appearance;expect(validInheritedAppearance(a)).toBe(true);
  for(const key of inheritedTraits){const origin=a.inheritance[key];seen[key].add(a[key]);if(origin.variation){variations++;expect(Math.abs(a[key]-a.parents[origin.from][key])).toBe(1);}else{expect(a[key]).toBe(a.parents[origin.from][key]);origin.from==='mother'?mother++:father++;}}
  expect(inheritedTraits.filter(k=>a.inheritance[k].variation).length).toBeLessThanOrEqual(1);
  s.wardrobe.owned.forEach(id=>wardrobe.add(id));
 }
 expect(Object.values(seen).every(s=>s.size===20)).toBe(true);expect(mother/(mother+father)).toBeGreaterThan(.45);expect(mother/(mother+father)).toBeLessThan(.55);expect(variations).toBeGreaterThan(150);expect(variations).toBeLessThan(250);
 for(const group of garmentGroups)for(const item of groups[group])expect(wardrobe.has(item.id),item.id).toBe(true);
});
it('keeps inherited identity and actually worn garments across aging, career changes and repeated renders',()=>{
 let s=simulateV7(8,{targetAge:12,ceremony:true}).state;const a=structuredClone(s.appearance),w=structuredClone(s.wardrobe),picture=sprite(s);
 expect(a).toEqual(fresh(8).appearance);
 s=act(s,{type:'chooseCareer',careerId:'farmer'});expect(sprite(s)).toBe(picture);s=act(s,{type:'careerJob'});
 expect(s.appearance).toEqual(a);expect(s.wardrobe).toEqual(w);expect(portrait(s)).toBe(portrait(s));expect(portrait(s)).not.toContain('weapon');expect(portrait(s)).not.toContain('aura');
 expect(s.birth).toEqual(generateBirth(8).birth);
});
it('changes only owned clothes atomically, rejects forged/stale/age-invalid changes and keeps time/decisions frozen',()=>{
 let s=simulateV7(8,{targetAge:3}).state;const before=structuredClone(s),extra=s.wardrobe.owned.find(id=>id.startsWith('upper_')&&id!==s.wardrobe.equipped.upper),missing=groups.upper.find(v=>!s.wardrobe.owned.includes(v.id)).id;
 for(const action of [{slot:'upper',itemId:missing},{slot:'shoes',itemId:extra},{slot:'upper',itemId:null}]){expect(()=>act(s,{type:'dress',...action})).toThrow();expect(s).toEqual(before);}
 expect(()=>act(fresh(8),{type:'dress',slot:'upper',itemId:extra})).toThrow(/3 ปี/);
 const stale=storyToken(s);s=act(s,{type:'dress',slot:'upper',itemId:extra});expect(s.wardrobe.equipped.upper).toBe(extra);expect(s.time).toEqual(before.time);expect(s.gold).toBe(before.gold);expect(s.stats).toEqual(before.stats);expect(s.progression).toEqual(before.progression);expect(s.appearance).toEqual(before.appearance);expect(pendingDecision(s).id).toBe(pendingDecision(before).id);
 const dressed=structuredClone(s);expect(()=>dispatch(s,{type:'dress',slot:'upper',itemId:before.wardrobe.equipped.upper,token:stale})).toThrow(/เปลี่ยนไป/);expect(s).toEqual(dressed);
 expect(sprite(s)).not.toBe(sprite(before));expect(s.wardrobe.owned).toEqual(before.wardrobe.owned);
});
it('draws a wrapped infant, growing body and only an owned equipped hat without rerolling genes',()=>{
 const baby=fresh(8),a=structuredClone(baby.appearance);expect(sprite(baby)).toContain('infant-wrap.png');expect(sprite(baby)).not.toContain('data-slot="shoes"');
 let s=simulateV7(8,{targetAge:3}).state;expect(sprite(s)).toContain('data-slot="shoes"');expect(sprite(s)).not.toContain('data-slot="hats"');const hat=s.wardrobe.owned.find(id=>id.startsWith('hats_'));s=act(s,{type:'dress',slot:'hats',itemId:hat});expect(sprite(s)).toContain('data-slot="hats"');s=act(s,{type:'dress',slot:'hats',itemId:null});expect(sprite(s)).not.toContain('data-slot="hats"');expect(s.appearance).toEqual(a);
});
it('rejects malformed parental traits/provenance and never interpolates names or saved strings into SVG',()=>{
 const s=fresh(8);for(const change of [a=>a.parents.mother.face=20,a=>a.inheritance.hair.from='<script>',a=>a.skin=-1]){const a=structuredClone(s.appearance);change(a);expect(validInheritedAppearance(a)).toBe(false);}
 s.name='<script>';s.birth.parents.mother='<img onerror=bad>';s.career='<script>';s.race='<script>';expect(sprite(s)).not.toContain('<script>');expect(portrait(s)).not.toContain('onerror');
});
it('archives the actual terminal appearance and worn clothing once, with no active state or resumable seed',()=>{
 let s=simulateV7(8,{targetAge:60}).state;
 while(pendingDecision(s)){const d=pendingDecision(s);s=act(s,{type:'majorChoice',decisionId:d.id,choiceId:d.choices.find(c=>!c.disabled).id});}
 const hat=s.wardrobe.owned.find(id=>id.startsWith('hats_'));s=act(s,{type:'dress',slot:'hats',itemId:hat});
 s=act(s,{type:'legacyArc'});for(const choiceId of ['c_path_peasant','c_peasant_farm','c_end_peasant'])s=act(s,{type:'legacyChoice',choiceId});
 expect(s.run.status).toBe('ended');const summary=completedSummary(s,'2026-10-29T01:00:00Z'),map=new Map(),writes=[];
 expect(s.appearance).toEqual(fresh(8).appearance);expect(sprite(s)).toContain('วัยชรา');
 const disk={getItem:k=>map.get(k)??null,setItem:(k,v)=>{writes.push(k);map.set(k,v);}};archiveCompleted(disk,summary);archiveCompleted(disk,summary);
 expect(writes).toEqual(['reborn_finished_lives_v1']);expect(readArchive(disk)[0].appearance).toEqual(s.appearance);expect(summary.equipment.map(e=>e.id)).toContain(hat);
 for(const key of ['state','seed','world','wardrobe','progression','birth'])expect(summary).not.toHaveProperty(key);
 expect(appearanceSnapshot(s.appearance)).toEqual(s.appearance);
 const photo=appearanceSnapshot(s.appearance);expect(photo).not.toHaveProperty('seed');photo.parents.mother.face=(photo.parents.mother.face+1)%20;expect(photo).not.toEqual(s.appearance);
});
it('verifies real PNG pixels, transparency, hashes, anchors and twenty distinct variants in each group',async()=>{
 expect(await verifyCharacterAssets()).toMatchObject({catalogVariants:180,groups:9,variantsPerGroup:20,transparentPartFiles:183,aiFamilyBackgrounds:1});
});
