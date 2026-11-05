import type {State} from '../engine/state';
import {byId,legal,spell,type Core,type Form,type Mod} from './spells';
export function recipePreview(s:State,c:Core,f:Form,m:Mod){
 if(!legal(c,f,m))return {ready:false,known:false,title:'สูตรยังไม่เข้ากัน',detail:m==='HEAL'&&!['WATER','LIGHT','BLOOM'].includes(c)?'เวทเยียวยาใช้แก่นธารา อรุณ หรือพฤกษาเท่านั้น':'ตัวปรับนี้ใช้กับรูปแบบที่เลือกไม่ได้',missing:[] as string[]};
 const sp=spell(c,f,m),known=s.known.includes(sp.id),missing=[`CORE_${c}`,`FORM_${f}`,`MOD_${m}`].filter(id=>!(s.inventory[id]>0));
 return {ready:!known&&!missing.length,known,title:known?sp.name:'เวทยังไม่ค้นพบ',detail:known?'รู้จักเวทนี้แล้ว ไม่ใช้วัตถุดิบซ้ำ':`MP ${sp.mp} · ${sp.heal?'ฟื้น HP '+sp.heal:sp.shield?'สร้างโล่ '+sp.shield:'พลัง '+sp.power+' · '+sp.hits+' ครั้ง'} · ${missing.length?'วัตถุดิบยังไม่ครบ':'ใช้วัตถุดิบอย่างละ 1 ชิ้นเมื่อยืนยัน'}`,missing:known?[]:missing};
}
export type BookFilter={core:string;kind:string;mp:string};
export function filterKnown(s:State,filter:BookFilter){return s.known.map(id=>byId[id]).filter(sp=>(!filter.core||sp.core===filter.core)&&(!filter.mp||sp.mp<=Number(filter.mp))&&(!filter.kind||(filter.kind==='attack'?!sp.heal&&!sp.shield:filter.kind==='heal'?sp.heal>0:sp.shield>0)));}
