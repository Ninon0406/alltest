import {it,expect} from 'vitest';
import {fresh} from '../src/engine/state';
import {choose} from '../src/systems/game';
import {scenes} from '../src/content/story';
import {choicePaths} from '../src/scenes/cinematic-paths';
import {gatheringCatalog,gatheringProps} from '../src/scenes/gathering-props';
it('every gathering visual is bound to a real rewarded pickup and its foot anchor',()=>{
 for(const entry of gatheringCatalog){const scene=scenes[entry.scene],choice=scene.choices.find(c=>c.id===entry.choice)!;
  expect(choice.cue).toBe('pick');expect(Object.keys(choice.items||{}).length).toBeGreaterThan(0);expect(choicePaths[entry.choice].stage).toBe(scene.stage);
  const item=gatheringProps({...fresh(),scene:entry.scene}).find(p=>p.choice===entry.choice)!;expect(item).toMatchObject({x:choicePaths[entry.choice].points.at(-1)!.x,y:choicePaths[entry.choice].points.at(-1)!.y+20});
 }
});
it('feather disappears with the genuine reward and stays gone after restoring that state',()=>{
 const s=choose(fresh(),'CH0001');expect(gatheringProps(s).map(p=>p.choice)).toEqual(['CH0102']);
 const next=choose(s,'CH0102');expect(next.inventory.CORE_WIND).toBe(1);expect(gatheringProps(next)).toEqual([]);
 expect(gatheringProps({...structuredClone(next),scene:'S01_FIRST_STEPS'})).toEqual([]);expect(gatheringProps(null)).toEqual([]);
});
it('daily materials follow saved game day, not inventory or real time',()=>{
 let s=fresh();for(const id of ['CH0001','CH0101','CH0203'])s=choose(s,id);
 expect(gatheringProps(s)).toHaveLength(2);const picked=choose(s,'CH0601');
 const sameDay={...picked,scene:'S06_GARDEN'};expect(gatheringProps(sameDay).map(p=>p.choice)).toEqual(['CH0603']);
 expect(gatheringProps({...sameDay,ticks:sameDay.ticks+3})).toHaveLength(2);
 expect(s.inventory.CORE_BLOOM).toBeUndefined();
});
