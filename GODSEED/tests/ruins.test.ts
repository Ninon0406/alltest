import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fresh,schema,type State} from '../src/engine/state';
import {encodeSave,decodeSave} from '../src/engine/save-file';
import {choose,craft,fight,intent} from '../src/systems/game';
import {byId} from '../src/systems/spells';
import {scenes} from '../src/content/story';
import {choiceAvailability,clueCount,rememberedLines} from '../src/systems/story';
import {cinematicPath} from '../src/scenes/cinematic-paths';
import {sceneDefinitions,routeTo,clearSegment,walkable,locationFor} from '../src/scenes/scene-definitions';
import {ruinsMap} from '../src/scenes/ruins-map';
import {ruinsActions,ruinsAnimations,ruinsCheckpoint,altarState} from '../src/scenes/ruins-staging';
import {artForStage,ArtLedger} from '../src/scenes/art-assets';
import {directionalIdle} from '../src/scenes/directional-art';
const {PNG}=createRequire(import.meta.url)('pngjs');
const path=(s:State,ids:string[])=>ids.reduce((s,id)=>choose(s,id),s);
const hub=(seed=79)=>path(fresh('ผู้ฟังจารึก',seed),['CH0001','CH0101']);
const archive=(s=hub())=>path(s,['CH0204','CH0701','CH1401']);
const ruins=(s=archive())=>choose(s,'CH0207');
const trained=(seed=79)=>craft(path(hub(seed),['CH0202','CH0401']),'WIND','ORB','SEEK');
const battle=(seed=79)=>choose(ruins(archive(trained(seed))),'CH1502');
function win(initial:State){let s=initial,n=0;while(s.battle&&n++<40)s=fight(s,s.battle.turn%3===0||s.mp<10?'GUARD':'SPELL_WIND_ORB_SEEK');expect(s.battle).toBeUndefined();expect(s.scene).toBe('S16_RUINS_RESULT');return s;}
const pic=(name:string)=>PNG.sync.read(readFileSync(new URL('../public/assets/art-v12/'+name+'.png',import.meta.url)));
function cell(p:{width:number;data:Buffer},index:number,w:number,h:number){const cols=p.width/w,out=Buffer.alloc(w*h*4);for(let y=0;y<h;y++){const start=((Math.floor(index/cols)*h+y)*p.width+index%cols*w)*4;p.data.copy(out,y*w*4,start,start+w*4);}return out;}

describe('canonical ruins routes and world memory',()=>{
 it('locks unknown ruins and musicbox routes without changing RAM; all archive returns unlock them',()=>{
  const s=hub(),copy=structuredClone(s),entry=scenes.S02_HUB.choices.find(c=>c.id==='CH0207')!;
  expect(choiceAvailability(s,entry).enabled).toBe(false);expect(()=>choose(s,'CH0207')).toThrow();expect(s).toEqual(copy);
  for(const id of ['CH1401','CH1402','CH1403'])expect(path(hub(),['CH0204','CH0701',id,'CH0207']).scene).toBe('S15_RUINS');
  const at=ruins(),before=structuredClone(at),music=scenes.S15_RUINS.choices.find(c=>c.id==='CH1503')!;
  expect(choiceAvailability(at,music).enabled).toBe(false);expect(()=>choose(at,'CH1503')).toThrow();expect(at).toEqual(before);
 });
 it('solves the archive rune path without a fight or its reward, then remembers the song',()=>{
  const at=ruins(),tablet=choose(at,'CH1501');expect(tablet.scene).toBe('S17_ECHO_TABLET');expect(tablet.flags.ruins_clue).toBe(true);expect(tablet.battle).toBeUndefined();
  expect(tablet.rewarded).toEqual([]);expect(tablet.inventory.FORM_WARD).toBeUndefined();expect(tablet.xp).toBe(at.xp);expect(tablet.rng).toBe(at.rng);expect(clueCount(tablet)).toBe(2);
  const end=choose(tablet,'CH1701');expect(end.flags.song_fragment).toBe(true);expect(end.trust.EIRA).toBe(1);expect(altarState(end)).toBe(2);
  expect(rememberedLines(choose(end,'CH0207'),scenes.S15_RUINS).join('')).toContain('โน้ต');
 });
 it('musicbox and drawing/listening complete one shared archive quest, not two rewards',async()=>{
  const start=archive(path(hub(),['CH0201','CH0301','CH03B1'])),tablet=path(start,['CH0207','CH1503']);
  expect(tablet.flags.ruins_box_path).toBe(true);expect(ruinsCheckpoint(tablet)).toBe('box_front');
  let s=choose(tablet,'CH1702');expect(s.scene).toBe('S07_ARCHIVE');expect(s.flags.archive_notes_complete).toBe(true);expect(s.inventory.FORM_RAY).toBe(1);expect(s.trust.EIRA).toBe(1);
  expect(rememberedLines(s,scenes.S07_ARCHIVE).join('')).toContain('สำเนาจารึก');
  s=(await decodeSave(await encodeSave(s))).state;
  const end=path(s,['CH0701','CH1401','CH0207','CH1501','CH1703']);
  expect(end.flags.echo_hint).toBe(true);expect(end.inventory.FORM_RAY).toBe(1);expect(end.trust.EIRA).toBe(1);expect(end.rewarded).toEqual([]);
 });
 it('an explicit file restores the current branch even after revisiting both paths',async()=>{
  let s=archive(path(hub(),['CH0201','CH0301','CH03B1']));
  s=path(s,['CH0207','CH1501','CH1701','CH0207','CH1503']);expect(s.choices).toContain('CH1501');expect(s.choices).toContain('CH1503');expect(ruinsCheckpoint(s)).toBe('box_front');
  const loaded=(await decodeSave(await encodeSave(s))).state;expect(loaded).toEqual(s);expect(ruinsCheckpoint(loaded)).toBe('box_front');expect(loaded.version).toBe(2);
  s=path(loaded,['CH1701','CH0207','CH1501']);expect(ruinsCheckpoint(s)).toBe('rune_front');expect(s.flags.ruins_box_path).toBe(false);
 });
 it('battle result items and a newly craftable ward come from real source choices',()=>{
  let s=win(battle());expect(s.flags.battle_B03_done).toBe(true);expect(altarState(s)).toBe(1);expect(s.flags.battle_B02_done).not.toBe(true);expect(s.inventory.FORM_WARD).toBe(1);expect(s.xp).toBe(28);
  s=path(s,['CH1601','CH1701']);expect(s.inventory.MOD_PIERCE).toBe(1);
  s=path(s,['CH0205','CH0802','CH0903','CH1301']);s=craft(s,'WIND','WARD','LINGER');expect(s.known).toContain('SPELL_WIND_WARD_LINGER');expect(byId.SPELL_WIND_WARD_LINGER.shield).toBeGreaterThan(0);
  s=path(s,['CH0210','CH0210']);const defended=fight(path(s,['CH0207','CH1502']),'SPELL_WIND_WARD_LINGER');expect(defended.battle!.shield).toBeGreaterThan(0);expect(defended.hp).toBe(s.hp);expect(defended.mp).toBe(s.mp-byId.SPELL_WIND_WARD_LINGER.mp);
 });
 it('all new scene/choice IDs are unique, reachable, and mapped to actual action targets',()=>{
  expect(Object.keys(scenes)).toHaveLength(21);const ids=Object.values(scenes).flatMap(s=>s.choices.map(c=>c.id));expect(ids).toHaveLength(70);expect(new Set(ids).size).toBe(70);
  for(const scene of ['S15_RUINS','S16_RUINS_RESULT','S17_ECHO_TABLET']){expect(locationFor(scene)).toBe('ancient_shrine');for(const c of scenes[scene].choices){expect(scenes[c.next]).toBeDefined();expect(ruinsActions[c.id]).toBeDefined();}}
 });
});
describe('rule-driven rune sentry',()=>{
 it('telegraphs turn3, spends it shielding, and expires the ward after two player actions',async()=>{
  let s=battle();expect(intent(s)).toContain('โจมตี 10');s=fight(fight(s,'GUARD'),'GUARD');expect(s.battle!.turn).toBe(3);expect(intent(s)).toContain('ไม่โจมตี');const hp=s.hp;
  s=fight(s,'GUARD');expect(s.hp).toBe(hp);expect(s.battle!.status.RUNE_WARD).toBe(2);
  const loaded=(await decodeSave(await encodeSave(s))).state;expect(loaded).toEqual(s);
  const four=fight(loaded,'BASIC_PULSE');expect(four.battle!.enemyHp).toBe(64);expect(four.battle!.status.RUNE_WARD).toBe(1);
  const five=fight(four,'BASIC_PULSE');expect(five.battle!.enemyHp).toBe(62);expect(five.battle!.status.RUNE_WARD).toBeUndefined();expect(five.battle!.turn).toBe(6);expect(intent(five)).toContain('กางเกราะ');
 });
 it('pierce mitigates the ward, while the same unwarded spell retains full impact',()=>{
  const id='SPELL_WIND_ORB_PIERCE';let s=battle();s.known.push(id);s.equipped.push(id);s=fight(fight(fight(s,'GUARD'),'GUARD'),'GUARD');
  const full=structuredClone(s);delete full.battle!.status.RUNE_WARD;
  const a=66-fight(s,id).battle!.enemyHp,b=66-fight(full,id).battle!.enemyHp;expect(a).toBeGreaterThan(b*.5);expect(a).toBeLessThan(b);
 });
 it('allows retreat but rejects surrender, with no victory rewards or corrupted checkpoint',()=>{
  const s=battle(),copy=structuredClone(s);expect(()=>fight(s,'SURRENDER')).toThrow();expect(s).toEqual(copy);
  const out=fight(s,'FLEE');expect(out.scene).toBe('S15_RUINS');expect(out.battle).toBeUndefined();expect(out.rewarded).toEqual([]);expect(out.flags.battle_B03_done).not.toBe(true);
 });
 it('defeat and retry retain the S15 checkpoint and old file contract',async()=>{
  const s=battle();s.hp=1;const loss=fight(s,'BASIC_PULSE');expect(loss.scene).toBe('S28_RECOVER');expect(loss).toMatchObject({hp:70,mp:20,recoveryScene:'S15_RUINS'});
  const loaded=(await decodeSave(await encodeSave(loss))).state;expect(choose(loaded,'CH2801').scene).toBe('S15_RUINS');expect(loaded.rewarded).toEqual([]);
 });
 it('wins fairly with starter choices across32 seeds and rewards every later victory only once',()=>{
  const summary=[];for(let seed=1;seed<=32;seed++){const out=win(battle(seed));summary.push({hp:out.hp,mp:out.mp});expect(out.hp).toBeGreaterThanOrEqual(40);expect(out.xp).toBe(28);expect(out.rewarded).toEqual(['win:B03_RUIN_SENTINEL']);}
  let s=path(win(battle()),['CH1601','CH1701']);const xp=s.xp,ward=s.inventory.FORM_WARD;s=path(s,['CH0210','CH0210','CH0210','CH0210','CH0207','CH1502']);s=win(s);
  expect(s.xp).toBe(xp);expect(s.inventory.FORM_WARD).toBe(ward);expect(choose(s,'CH1601').inventory.MOD_PIERCE).toBe(1);expect(summary).toHaveLength(32);
 });
 it('rejects impossible ward status and excess HP while retaining previous State2 values',()=>{
  const s=battle(),old=trained();expect(schema.parse(old)).toEqual(old);s.battle!.enemyHp=67;expect(schema.safeParse(s).success).toBe(false);s.battle!.enemyHp=66;s.battle!.status.RUNE_WARD=3;expect(schema.safeParse(s).success).toBe(false);s.battle!.status.RUNE_WARD=2;s.battle!.playerStatus.RUNE_WARD=1;expect(schema.safeParse(s).success).toBe(false);
 });
});
describe('authored ruins maps, art and gestures',()=>{
 it('every starting anchor reaches every cinematic target safely in both axes',()=>{
  const def=sceneDefinitions.ancient_shrine;expect(Object.keys(def.anchors)).toHaveLength(14);
  for(const start of Object.values(def.anchors))for(const [id,action] of Object.entries(ruinsActions)){const route=routeTo(def,start,action.anchor)!;expect(route,id).toBeDefined();expect(route.at(-1)).toEqual(def.anchors[action.anchor]);route.forEach((point,i)=>{expect(walkable(def,point)).toBe(true);if(i)expect(clearSegment(def,route[i-1],point)).toBe(true);});const motion=cinematicPath('ruins','pick',id,{x:start.x,y:start.y-20},'ancient_shrine')!;expect(motion.targetAnchor).toBe(action.anchor);expect(motion.points.at(-1)).toEqual({x:route.at(-1)!.x,y:route.at(-1)!.y-20});}
  expect(routeTo(def,{x:108,y:230},'tablet_front')).toBeUndefined();expect(routeTo(def,def.anchors.shrine_entrance,'missing')).toBeUndefined();expect(ruinsMap.occluders).toContainEqual({id:'west-pillar',footY:242});
 });
 it('keeps new assets lazy, and cold file imports load Eira/water without unrelated stages',()=>{
  const title=artForStage('village');expect(title).toHaveLength(23);expect(title.some(a=>a.group==='ruins')).toBe(false);const cold=new ArtLedger().pending('ruins');expect(cold.map(a=>a.key)).toEqual(expect.arrayContaining(['eira-v3','water-v3','sentinel-v12','ruins-altar-v12','ruins']));expect(cold.some(a=>a.path.includes('archive-ground')||a.path.includes('stream-ground'))).toBe(false);
 });
 it('retreats around the pillar footprint from the actual battle position',()=>{
  const def=sceneDefinitions.ancient_shrine,start={x:130,y:219},retreat=cinematicPath('ruins','walk','FLEE',start,'ancient_shrine')!;
  const feet=[start,...retreat.points].map(p=>({x:p.x,y:p.y+20}));
  for(let i=1;i<feet.length;i++)expect(clearSegment(def,feet[i-1],feet[i])).toBe(true);
  expect(retreat.points.at(-1)).toEqual({x:80,y:219});
 });
 it('has three real transparent layers and animated altar states, not a concept image',()=>{
  const rear=pic('ruins-rear'),ground=pic('ruins-ground'),front=pic('ruins-front');for(const p of [rear,ground,front,pic('ruins-fallback')])expect([p.width,p.height]).toEqual([480,270]);
  expect(ground.data[(178*480+180)*4+3]).toBe(0);expect(front.data[(230*480+240)*4+3]).toBe(0);
  const altar=pic('altar');expect([altar.width,altar.height]).toEqual([384,336]);expect(cell(altar,0,96,112)).not.toEqual(cell(altar,4,96,112));expect(cell(altar,4,96,112)).not.toEqual(cell(altar,8,96,112));expect(cell(altar,4,96,112)).not.toEqual(cell(altar,5,96,112));
 });
 it('keeps sentry feet at60 and preserves the original north hero head and planted boots',()=>{
  const sentry=pic('sentinel');expect([sentry.width,sentry.height]).toEqual([256,256]);for(const anim of Object.values(ruinsAnimations['sentinel-v12'])){const frames=anim.frames.map(i=>cell(sentry,i,64,64));expect(new Set(frames.map(p=>p.toString('hex'))).size).toBeGreaterThan(1);for(const p of frames){expect(p.subarray(61*64*4).some(n=>n!==0)).toBe(false);expect(p.subarray(57*64*4,61*64*4).some(n=>n!==0)).toBe(true);}}
  const hero=pic('hero-ruins'),old=PNG.sync.read(readFileSync(new URL('../public/assets/art-v5/hero-idle.png',import.meta.url))),base=cell(old,directionalIdle.north.frames[0],32,48);
  for(const anim of Object.values(ruinsAnimations['hero-ruins-v12']))for(const i of anim.frames){const f=cell(hero,i,32,48);for(let y=4;y<19;y++)expect(f.subarray((y*32+10)*4,(y*32+23)*4)).toEqual(base.subarray((y*32+10)*4,(y*32+23)*4));expect(f.subarray(40*32*4)).toEqual(base.subarray(40*32*4));}
  for(const i of [6,7,12,13,14,15])expect(cell(hero,i,32,48).every(n=>n===0)).toBe(true);
 });
});
