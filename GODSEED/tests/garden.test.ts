import {it,expect} from 'vitest';
import {fresh} from '../src/engine/state';
import {choose} from '../src/systems/game';
import {scenes} from '../src/content/story';
import {rememberedLines} from '../src/systems/story';
import {choicePaths,travelPaths} from '../src/scenes/cinematic-paths';
import {gardenPresentation,wateringPlan,gardenBed} from '../src/scenes/garden-staging';
it('watering stands outside the raised bed and only belongs to the actual watering choice',()=>{
 const plan=wateringPlan('garden','CH0601')!;expect(plan.actor).toEqual({x:214,y:220});expect(plan.facing).toBe('east');
 expect(plan.actor.x).toBeLessThan(gardenBed.x-gardenBed.width/2);
 expect(wateringPlan('forest','CH0601')).toBeUndefined();expect(wateringPlan('garden','CH0603')).toBeUndefined();
 expect(scenes.S06_GARDEN.choices.find(c=>c.id==='CH0601')?.flags).toContain('garden_tended');
});
it('growth and Maren memory follow the saved world fact, never grant or consume items',()=>{
 let s=fresh();for(const id of ['CH0001','CH0101','CH0203'])s=choose(s,id);
 const original=structuredClone(s);expect(gardenPresentation(s)?.frame).toBe(0);expect(rememberedLines(s,scenes.S06_GARDEN)).toEqual([]);expect(s).toEqual(original);
 const tended=choose(s,'CH0601');expect(tended.inventory.CORE_BLOOM).toBe(1);expect(tended.trust.MAREN).toBe(1);
 const restored={...structuredClone(tended),scene:'S06_GARDEN'};expect(gardenPresentation(restored)?.frame).toBe(2);expect(rememberedLines(restored,scenes.S06_GARDEN).join()).toContain('จำมือที่อ่อนโยน');
 const repeated=choose(restored,'CH0601');expect(repeated.inventory).toEqual(tended.inventory);expect(repeated.trust).toEqual(tended.trust);
});
it('garden visuals stay absent outside the garden including title and combat',()=>{
 expect(gardenPresentation(null)).toBeUndefined();expect(gardenPresentation(fresh())).toBeUndefined();
 expect(gardenPresentation({...fresh(),scene:'S06_GARDEN',battle:{id:'B01_FOREST_SPROUT'} as never})).toBeUndefined();
});

it('the fixed garden exit and pickup lanes never cross the raised-bed footprint',()=>{
 for(const path of [travelPaths.garden,choicePaths.CH0601.points,choicePaths.CH0603.points]){
  const points=[{x:154,y:219},...path],s=gardenBed.solid;
  for(let i=1;i<points.length;i++){
   const a=points[i-1],b=points[i],steps=Math.ceil(Math.hypot(b.x-a.x,b.y-a.y));
   for(let j=0;j<=steps;j++){const x=a.x+(b.x-a.x)*j/steps,y=a.y+20+(b.y-a.y)*j/steps;
    expect(x+5<s.left||x-5>s.right||y+2<s.top||y-2>s.bottom).toBe(true);
   }
  }
 }
});
