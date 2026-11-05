import {it,expect} from 'vitest';
import {facingFor,walkDuration} from '../src/scenes/directional-art';
it('chooses all four views by dominant movement, with stable tie and zero-length handling',()=>{
 expect(facingFor(0,18)).toBe('south');expect(facingFor(25,-33)).toBe('north');
 expect(facingFor(-42,-31)).toBe('west');expect(facingFor(40,-8)).toBe('east');
 expect(facingFor(0,0,'north')).toBe('north');expect(facingFor(-5,-5)).toBe('west');
});
it('keeps distance-paced motion bounded instead of sliding every leg at the same speed',()=>{
 expect(walkDuration(30,40)).toBe(700);expect(walkDuration(50,0)).toBe(700);
 expect(walkDuration(1,0)).toBe(200);expect(walkDuration(500,0)).toBe(900);
});
