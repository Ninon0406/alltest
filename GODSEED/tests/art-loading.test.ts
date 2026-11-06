import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {describe,it,expect} from 'vitest';
import {artAssets,artForStage,ArtLedger} from '../src/scenes/art-assets';
import {STAGES} from '../src/scenes/stage-layout';

const {PNG}=createRequire(import.meta.url)('pngjs');
describe('staged, recoverable art loading',()=>{
 it('uses unique local static files with valid frames and a complete fallback per stage',()=>{
  expect(new Set(artAssets.map(a=>a.key)).size).toBe(artAssets.length);
  expect(new Set(artAssets.map(a=>a.path)).size).toBe(artAssets.length);
  for(const a of artAssets){
   expect(a.path).toMatch(/^[a-z\d/-]+\.png$/);expect(a.path).not.toContain('..');
   const p=PNG.sync.read(readFileSync(fileURLToPath(new URL('../public/assets/'+a.path,import.meta.url))));
   if(a.frame){expect(p.width%a.frame.frameWidth,a.key).toBe(0);expect(p.height%a.frame.frameHeight,a.key).toBe(0);}
  }
  for(const stage of STAGES){const keys=artForStage(stage).map(a=>a.key);for(const key of [stage,...['rear','ground','front'].map(l=>`${stage}-${l}-v2`)])expect(keys).toContain(key);}
 });
 it('keeps later stages off the title request list and shares completed textures on revisit',()=>{
  const ledger=new ArtLedger(),title=ledger.pending('village');expect(title.every(a=>a.group==='shared'||a.group==='village')).toBe(true);
  expect(title.some(a=>a.path.includes('art-v9')||a.group==='workshop')).toBe(false);
  ledger.request(title);title.forEach(a=>ledger.complete(a.key));expect(ledger.pending('village')).toEqual([]);
  for(const stage of STAGES){const batch=ledger.pending(stage);expect(batch.every(a=>a.group===stage)).toBe(true);ledger.request(batch);batch.forEach(a=>ledger.complete(a.key));}
  expect(ledger.requests).toBe(artAssets.length);expect(ledger.loaded).toBe(artAssets.length);for(const stage of STAGES)expect(ledger.pending(stage)).toEqual([]);
 });
 it('does not retry failures on travel; explicit retry recovers only needed failed files',()=>{
  const ledger=new ArtLedger(),first=ledger.pending('village');ledger.request(first);
  first.forEach(a=>a.key==='hero-v2'?ledger.fail(a.key):ledger.complete(a.key));
  const garden=ledger.pending('garden');ledger.request(garden);garden.forEach(a=>a.key==='maren-v8'?ledger.fail(a.key):ledger.complete(a.key));
  expect(ledger.pending('garden')).toEqual([]);expect(ledger.pending('village')).toEqual([]);
  const retry=ledger.pending('village',true);expect(retry.map(a=>a.key)).toEqual(['hero-v2']);ledger.request(retry);ledger.complete('hero-v2');
  expect(ledger.errors('village')).toEqual([]);expect(ledger.errors('garden')).toEqual(['maren-v8']);
  const again=ledger.pending('garden',true);ledger.request(again);ledger.fail('maren-v8');expect(ledger.pending('garden',true).map(a=>a.key)).toEqual(['maren-v8']);
  expect(ledger.requests).toBe(first.length+garden.length+2);ledger.complete('maren-v8');expect(ledger.errors('garden')).toEqual([]);
 });
});
