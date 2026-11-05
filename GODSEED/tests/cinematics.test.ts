import {describe,it,expect} from 'vitest';
import {scenes} from '../src/content/story';
import {choicePaths,cinematicPath,travelPaths} from '../src/scenes/cinematic-paths';
import {STAGES} from '../src/scenes/stage-layout';
describe('authored cinematic paths',()=>{
 it('binds every authored interaction to an existing choice on its actual stage',()=>{
  for(const [id,path] of Object.entries(choicePaths)){
   const owner=Object.values(scenes).find(scene=>scene.choices.some(choice=>choice.id===id));
   expect(owner?.stage,id).toBe(path.stage);
   expect(path.points.length).toBeGreaterThanOrEqual(2);
  }
 });
 it('keeps routes on the visible ground and away from identical generic movement',()=>{
  expect(Object.keys(travelPaths).sort()).toEqual([...STAGES].sort());
  for(const points of [...Object.values(travelPaths),...Object.values(choicePaths).map(path=>path.points)]){
   for(const point of points){expect(Number.isInteger(point.x)&&Number.isInteger(point.y)).toBe(true);expect(point.x).toBeGreaterThan(32);expect(point.x).toBeLessThan(448);expect(point.y+20).toBeGreaterThan(180);expect(point.y+20).toBeLessThan(260);}
  }
  expect(cinematicPath('village','rest','CH0210')?.points.at(-1)).toEqual({x:79,y:193});
  expect(cinematicPath('garden','pick','CH0603')?.points.at(-1)).not.toEqual(cinematicPath('garden','pick','CH0601')?.points.at(-1));
 });
 it('isolates wrong-stage and combat commands from story props',()=>{
  expect(cinematicPath('forest','pick','CH0210')).toBeUndefined();
  expect(cinematicPath('workshop','cast','BASIC_PULSE')).toBeUndefined();
  expect(cinematicPath('forest','walk','FLEE')?.points.at(-1)?.x).toBe(80);
 });
});
