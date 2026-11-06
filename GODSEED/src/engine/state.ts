import {z} from 'zod';
import {byId} from '../systems/spells';
import {scenes} from '../content/story';
import {encounters} from '../content/encounters';
import {hasPathAbility,lifePaths} from '../systems/life-paths';
const qty=z.number().int().min(0).max(9999);
const battle=z.object({id:z.enum(['B01_FOREST_SPROUT','BT_TRAINING']),enemyHp:z.number().int().min(1).max(42),turn:z.number().int().min(1),shield:qty,status:z.record(z.string(),qty),checkpoint:z.string(),next:z.string()});
const legacyBase=z.object({version:z.literal(1),runId:z.string().min(1),seed:z.number().int(),rng:qty,revision:qty,name:z.string().max(30),scene:z.string().refine(id=>Object.hasOwn(scenes,id)),ticks:qty,hp:z.number().int().min(1).max(100),mp:z.number().int().min(0).max(40),inventory:z.record(z.string(),qty),known:z.array(z.string().refine(id=>Object.hasOwn(byId,id))),equipped:z.array(z.string()).max(4),flags:z.record(z.string(),z.boolean()),choices:z.array(z.string()),trust:z.record(z.string(),z.number().int().min(-2).max(5)),rewarded:z.array(z.string()),gathered:z.record(z.string(),qty),journal:z.array(z.string()).max(500),battle:battle.optional()});
function validate(s:{known:string[];equipped:string[];battle?:{next:string;checkpoint:string}},ctx:z.RefinementCtx){if(new Set(s.known).size!==s.known.length||new Set(s.equipped).size!==s.equipped.length||s.equipped.some(id=>!s.known.includes(id)))ctx.addIssue({code:'custom',message:'สมุดเวทหรือช่องติดตั้งไม่ถูกต้อง'});if(s.battle&&(!Object.hasOwn(scenes,s.battle.next)||!Object.hasOwn(scenes,s.battle.checkpoint)))ctx.addIssue({code:'custom',message:'จุดกลับจากการต่อสู้ไม่ถูกต้อง'});}
export const legacySchema=legacyBase.superRefine(validate);
const currentBase=legacyBase.extend({version:z.literal(2),xp:qty,recoveryScene:z.string().refine(id=>Object.hasOwn(scenes,id)),battle:battle.extend({id:z.enum(['B01_FOREST_SPROUT','BT_TRAINING','B02_STREAM_WISP','B03_RUIN_SENTINEL']),enemyHp:z.number().int().min(1).max(66),playerStatus:z.record(z.string(),qty),shieldTurns:z.number().int().min(0).max(2),log:z.array(z.string()).max(12),pathActions:z.object({scouted:z.boolean().optional(),rootGuardUsed:z.boolean().optional()}).strict().optional()}).optional()});
const currentSchema=currentBase.superRefine((s,ctx)=>{
 validate(s,ctx);
 if(s.battle&&s.battle.shield>0&&s.battle.shieldTurns===0)ctx.addIssue({code:'custom',message:'โล่ที่หมดเวลาไม่สามารถคงพลังป้องกันได้'});
 if(s.battle&&(s.battle.playerStatus.RUNE_WARD||s.battle.status.RUNE_WARD&&(s.battle.id!=='B03_RUIN_SENTINEL'||s.battle.status.RUNE_WARD>2)))ctx.addIssue({code:'custom',message:'เกราะรูนไม่ตรงกับศัตรูหรือมีระยะเวลาเกินกำหนด'});
 if(s.battle&&s.battle.enemyHp>encounters[s.battle.id].hp)ctx.addIssue({code:'custom',message:'HP ศัตรูเกินค่าสูงสุด'});
 for(const path of lifePaths){
  const foundation=!!s.flags[path.startedFlag]&&path.requirements.rank1.every(o=>s.flags[o.flag]);
  if(s.flags[path.rank1Flag]&&!foundation||s.flags[path.trialFlag]&&(!foundation||!s.flags[path.rank1Flag])||s.flags[path.rank2Flag]&&!hasPathAbility(s,path.ability.id))ctx.addIssue({code:'custom',message:'ความก้าวหน้าเส้นทางชีวิตขาดบทเรียนหรือบททดสอบที่จำเป็น'});
 }
 const b=s.battle;if(!b)return;
 if(b.pathActions?.scouted!==undefined&&!hasPathAbility(s,'TRAIL_FOCUS')||b.pathActions?.rootGuardUsed!==undefined&&!hasPathAbility(s,'ROOT_REFUGE'))ctx.addIssue({code:'custom',message:'การใช้ความสามารถไม่ตรงกับเส้นทางชีวิตที่เรียนแล้ว'});
 if(Object.hasOwn(b.status,'TRAIL_FOCUS')||Object.hasOwn(b.playerStatus,'TRAIL_FOCUS')&&(!hasPathAbility(s,'TRAIL_FOCUS')||b.pathActions?.scouted!==true||b.playerStatus.TRAIL_FOCUS<1||b.playerStatus.TRAIL_FOCUS>2))ctx.addIssue({code:'custom',message:'เพ่งจังหวะต้องมาจากการสำรวจของนักสำรวจและเหลือ 1–2 เทิร์น'});
});
export const schema=z.union([currentSchema,legacySchema.transform(old=>({...old,version:2 as const,xp:0,recoveryScene:'S09_FOREST',battle:old.battle?{...old.battle,playerStatus:{},shieldTurns:old.battle.shield>0?2:0,log:[]}:undefined}))]).pipe(currentSchema);
export type State=z.infer<typeof schema>;
export function fresh(name='อาเรน',seed=12345):State {return schema.parse({version:2,xp:0,recoveryScene:'S09_FOREST',runId:crypto.randomUUID(),seed,rng:0,revision:0,name:name.trim()||'อาเรน',scene:'S00_WAKE',ticks:0,hp:100,mp:40,inventory:{IT_POTION_DEW:2},known:[],equipped:[],flags:{},choices:[],trust:{},rewarded:[],gathered:{},journal:[]});}
export function random(s:State){let x=(s.seed+s.rng++*2654435761)|0;x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296;}
export function transact(s:State,fn:(draft:State)=>void){const d=structuredClone(s);fn(d);d.revision++;if(d.journal.length>500)d.journal=d.journal.slice(-500);return schema.parse(d);}
