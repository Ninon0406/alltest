import {it,expect} from 'vitest';
import {sceneDefinitions,routeTo,clearSegment,walkable} from '../src/scenes/scene-definitions';
import {cinematicPath,choicePaths} from '../src/scenes/cinematic-paths';
import {fresh,schema} from '../src/engine/state';
import {choose} from '../src/systems/game';

it('authored road links and named anchors respect actual source-map footprints',()=>{
 for(const definition of Object.values(sceneDefinitions)){
  for(const point of Object.values(definition.anchors))expect(walkable(definition,point)).toBe(true);
  for(const [a,b] of definition.links)expect(clearSegment(definition,definition.anchors[a],definition.anchors[b]),`${definition.id}:${a}->${b}`).toBe(true);
 }
 const village=sceneDefinitions.village_center;
 expect(walkable(village,{x:254,y:190})).toBe(false);
 expect(clearSegment(village,{x:210,y:190},{x:310,y:190})).toBe(false);
 expect(routeTo(village,{x:254,y:190},'fountain_front')).toBeUndefined();
 expect(routeTo(village,{x:154,y:239},'missing')).toBeUndefined();
});
it('routes from every resting/arrival anchor reach the fountain without a solid crossing',()=>{
 const def=sceneDefinitions.village_center;
 for(const start of Object.values(def.anchors)){
  const route=routeTo(def,start,'fountain_front');expect(route).toBeDefined();
  expect(route!.at(-1)).toMatchObject({x:254,y:231});
  for(let i=1;i<route!.length;i++)expect(clearSegment(def,route![i-1],route![i])).toBe(true);
 }
 const route=cinematicPath('village','walk','CH0201',{x:208,y:219});
 expect(route?.facing).toBe('north');expect(route?.points.at(-1)).toEqual({x:254,y:211});
 expect(route!.points.some(p=>p.y===237)).toBe(true);
});
it('tree route changes axes, passes behind an overhead branch and stays clear of the trunk',()=>{
 const def=sceneDefinitions.under_tree,route=routeTo(def,def.anchors.tree_entrance,'under_tree_seat')!;
 expect(route.at(-1)).toMatchObject({x:79,y:213});expect(route.some(p=>p.y<201)).toBe(true);
 for(let i=1;i<route.length;i++)expect(clearSegment(def,route[i-1],route[i])).toBe(true);
 expect(cinematicPath('village','rest','CH0004',{x:154,y:219},'under_tree')?.seatDepth).toBe(239);
 // Repeating rest already at the seat is valid, including reduced motion.
 expect(cinematicPath('village','rest','CH0004',{x:79,y:193},'under_tree')?.points).toEqual([{x:79,y:193}]);
 const exit=cinematicPath('village','walk','CH0001',{x:79,y:193},'under_tree')!;
 for(let i=1;i<exit.points.length;i++)expect(clearSegment(def,{x:exit.points[i-1].x,y:exit.points[i-1].y+20},{x:exit.points[i].x,y:exit.points[i].y+20})).toBe(true);
});
it('legacy bench approach avoids its legs, and unreachable graph links never teleport',()=>{
 const def=sceneDefinitions.village_center,points=[{x:154,y:219},...choicePaths.CH0210.points];
 for(let i=1;i<points.length;i++)expect(clearSegment(def,{x:points[i-1].x,y:points[i-1].y+20},{x:points[i].x,y:points[i].y+20})).toBe(true);
 expect(routeTo({...def,links:[]},def.anchors.village_road,'fountain_front')).toBeUndefined();
});
it('rest flags survive the existing save schema, grant memory/trust once and clear when leaving',()=>{
 const old=fresh();expect(old.flags.rest_under_tree).toBeUndefined();const rested=choose(old,'CH0004');
 expect(rested.flags.rest_under_tree).toBe(true);expect(rested.flags.tree_memory).toBe(true);expect(rested.ticks).toBe(1);expect(rested.trust.PIP).toBe(1);
 expect(schema.parse(rested)).toEqual(rested);const again=choose(rested,'CH0004');expect(again.trust.PIP).toBe(1);
 expect(choose(again,'CH0001').flags.rest_under_tree).toBe(false);expect(old.flags).toEqual({});
});
