import {it,expect} from 'vitest';
import {fresh,schema} from '../src/engine/state';
import {choose,craft,equip,unequip} from '../src/systems/game';
import {recipePreview,filterKnown} from '../src/systems/alchemy';
import {createBattle} from '../src/systems/combat';
import {decodeSave,encodeSave} from '../src/engine/save-file';
function known(){let s=fresh();for(const id of ['CH0001','CH0101','CH0202','CH0401'])s=choose(s,id);return craft(s,'WIND','ORB','SEEK');}
it('previews legal unknown spells without exposing the name or changing materials',()=>{const s=fresh(),copy=structuredClone(s),p=recipePreview(s,'WIND','ORB','SEEK');expect(p).toMatchObject({title:'เวทยังไม่ค้นพบ',ready:false,known:false});expect(p.missing).toHaveLength(3);expect(s).toEqual(copy);});
it('explains incompatibility before an atomic rejected craft',()=>{const s=known(),copy=structuredClone(s);expect(recipePreview(s,'FIRE','ORB','HEAL').detail).toContain('เยียวยา');expect(recipePreview(s,'ECHO','RAY','LINGER').ready).toBe(false);expect(()=>craft(s,'ECHO','RAY','LINGER')).toThrow();expect(s).toEqual(copy);});
it('a known preview needs no ingredients and cannot consume again',()=>{const s=known(),copy=structuredClone(s);expect(recipePreview(s,'WIND','ORB','SEEK')).toMatchObject({known:true,ready:false,title:'วายุดารานำวิถี'});expect(recipePreview(s,'WIND','ORB','SEEK').missing).toEqual([]);expect(()=>craft(s,'WIND','ORB','SEEK')).toThrow();expect(s).toEqual(copy);});
it('filters only discovered spells with combined limits',()=>{const s=known();s.known.push('SPELL_BLOOM_RING_HEAL');expect(filterKnown(s,{core:'BLOOM',kind:'heal',mp:'14'}).map(s=>s.id)).toEqual(['SPELL_BLOOM_RING_HEAL']);expect(filterKnown(s,{core:'',kind:'heal',mp:'10'})).toEqual([]);expect(filterKnown(s,{core:'FIRE',kind:'',mp:''})).toEqual([]);});
it('unequip compacts slots and permits zero spells without forgetting recipes',async()=>{let s=known();s.known.push('SPELL_BLOOM_RING_HEAL');s=equip(s,'SPELL_BLOOM_RING_HEAL',1);const next=unequip(s,0);expect(next.equipped).toEqual(['SPELL_BLOOM_RING_HEAL']);expect(next.known).toEqual(s.known);const empty=unequip(next,0);expect(empty.equipped).toEqual([]);expect(schema.parse(empty)).toEqual(empty);expect((await decodeSave(await encodeSave(empty))).state).toEqual(empty);});
it('rejects invalid slots and battle changes without mutation',()=>{const s=known(),copy=structuredClone(s);for(const slot of [-1,1,.5,NaN])expect(()=>unequip(s,slot)).toThrow();expect(s).toEqual(copy);s.battle=createBattle('BT_TRAINING','S04_KORO','S04_KORO');expect(()=>unequip(s,0)).toThrow();});
