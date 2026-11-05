import {it,expect} from 'vitest';
import {cameraShot} from '../src/scenes/camera-plan';
it('bounds full-motion framing inside 480x270 for every target anchor',()=>{
 for(let x=0;x<=480;x++){
  const s=cameraShot(x,false),margin=(480-480/s.zoom)/2;
  expect(margin+s.scrollX).toBeGreaterThanOrEqual(0);expect(480-margin+s.scrollX).toBeLessThanOrEqual(480);
 }
 expect(cameraShot(79,false).scrollX).toBe(-12);expect(cameraShot(338,false).scrollX).toBe(12);
});
it('reduced motion has exact original framing and no pan',()=>{expect(cameraShot(79,true)).toEqual({zoom:1,scrollX:0,scrollY:0});});
