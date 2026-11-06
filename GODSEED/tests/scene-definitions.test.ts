import {it,expect} from 'vitest';
import {sceneDefinitions,routeTo,clearSegment,walkable} from '../src/scenes/scene-definitions';
import {cinematicPath} from '../src/scenes/cinematic-paths';
import {fresh,schema} from '../src/engine/state';
import {choose} from '../src/systems/game';
import {gardenMap} from '../src/scenes/garden-map';

it('garden routes connect every authored arrival to seeds, dew, bench and exit without crossing scenery',()=>{
 const def=sceneDefinitions.elder_garden;
 for(const start of Object.values(gardenMap.anchors))for(const [command,cue,target] of [['CH0601','pick','herb_bed_front'],['CH0602','rest','maren_listen_seat'],['CH03B1','talk','maren_listen_seat'],['CH0603','pick','dew_collect'],['CH0604','walk','exit_path']]){
  const path=cinematicPath('garden',cue,command,{x:start.x,y:start.y-20})!;
  expect(path.targetAnchor).toBe(target);expect(path.points.at(-1)).toMatchObject({x:def.anchors[target].x,y:def.anchors[target].y-20});
  for(let i=1;i<path.points.length;i++)expect(clearSegment(def,{x:path.points[i-1].x,y:path.points[i-1].y+20},{x:path.points[i].x,y:path.points[i].y+20}),`${command} from ${start.x}/${start.y}`).toBe(true);
 }
 expect(cinematicPath('garden','rest','CH0602',{x:312,y:197})?.points).toEqual([{x:312,y:197}]);
});
it('garden masonry, piers, pot and beds block feet; unreachable movement never teleports through them',()=>{
 const def=sceneDefinitions.elder_garden;
 for(const p of [{x:150,y:180},{x:26,y:238},{x:86,y:238},{x:414,y:200},{x:430,y:240},{x:247,y:239}])expect(walkable(def,p)).toBe(false);
 expect(routeTo({...def,links:[]},def.anchors.garden_entrance,'dew_collect')).toBeUndefined();
 expect(()=>cinematicPath('garden','pick','CH0601',{x:247,y:219})).toThrow('ไม่พบเส้นทางที่ปลอดภัย');
 expect(walkable(def,def.anchors.dew_collect)).toBe(true);
});

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
it('bench approaches avoid their legs from every arrival anchor, including a repeated seated rest',()=>{
 const def=sceneDefinitions.village_center;
 for(const start of Object.values(def.anchors)){
  const points=cinematicPath('village','rest','CH0210',{x:start.x,y:start.y-20})!.points;
  for(let i=1;i<points.length;i++)expect(clearSegment(def,{x:points[i-1].x,y:points[i-1].y+20},{x:points[i].x,y:points[i].y+20})).toBe(true);
 }
 expect(cinematicPath('village','rest','CH0210',{x:79,y:193})!.points).toEqual([{x:79,y:193}]);
 expect(routeTo({...def,links:[]},def.anchors.village_road,'fountain_front')).toBeUndefined();
});
it('rest flags survive the existing save schema, grant memory/trust once and clear when leaving',()=>{
 const old=fresh();expect(old.flags.rest_under_tree).toBeUndefined();const rested=choose(old,'CH0004');
 expect(rested.flags.rest_under_tree).toBe(true);expect(rested.flags.tree_memory).toBe(true);expect(rested.ticks).toBe(1);expect(rested.trust.PIP).toBe(1);
 expect(schema.parse(rested)).toEqual(rested);const again=choose(rested,'CH0004');expect(again.trust.PIP).toBe(1);
 expect(choose(again,'CH0001').flags.rest_under_tree).toBe(false);expect(old.flags).toEqual({});
});
it('existing progressed saves can visit the tree from the hub without restarting or farming gifts',()=>{
 let s=fresh();for(const id of ['CH0001','CH0102'])s=choose(s,id);
 const previous=structuredClone(s);s=choose(s,'CH0211');expect(s.scene).toBe('S02_TREE');
 s=choose(s,'CH02T1');expect(s.flags.rest_under_tree).toBe(true);expect(s.flags.tree_memory).toBe(true);
 expect(s.inventory).toEqual(previous.inventory);expect(s.trust).toEqual(previous.trust);
 s=choose(s,'CH02T2');expect(s.scene).toBe('S02_HUB');expect(s.flags.rest_under_tree).toBe(false);expect(s.runId).toBe(previous.runId);
});
