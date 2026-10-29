import {assetPath,catalogById,groups,hairColors,skinColors,clothColors} from '../../data/appearance-v2.js';
import {validInheritedAppearance} from '../../character/inheritance.js';
import {validWardrobe} from '../../character/wardrobe.js';
import {tintFilter} from './pixel-parts.js';
import {wornEquipment} from '../../character/equipment-stats.js';
import {powerAura} from './power-aura.js';
const base=()=>import.meta.env?.BASE_URL??'/';
export const spriteAsset=path=>`${base()}${path}`;
const support=id=>`assets/sprites/characters/${id}.png`;
const image=(path,filter='',slot='')=>`<image href="${spriteAsset(path)}" width="64" height="80" style="image-rendering:pixelated"${filter?` filter="url(#${filter})"`:''}${slot?` data-slot="${slot}"`:''}/>`;
export function pixelAvatar(state,{role='child',context='scene',headOnly=false,portrait=false}={}){
 const a=state.appearance;if(!validInheritedAppearance(a)||!['child','mother','father'].includes(role))throw Error('ข้อมูลภาพครอบครัวไม่ถูกต้อง');
 const adult=role!=='child',genes=adult?a.parents[role]:a,age=adult?30:state.age,baby=age<1,old=age>=60;
 const stage=baby?'วัยทารก':age<3?'วัยเตาะแตะ':age<12?'วัยเด็ก':age<18?'วัยรุ่น':old?'วัยชรา':'วัยผู้ใหญ่';
 const scope=`avatar-${context.replace(/[^a-z0-9-]/g,'')}-${role}`,skin=scope+'-skin',hair=scope+'-hair',cloth=scope+'-cloth';
 const originalHair=hairColors[genes.hairColor],hairTone=old?'#bdc2bf':originalHair;
 let layers='',clothes='';
 if(!headOnly){
  if(!validWardrobe(state.wardrobe))throw Error('ข้อมูลเสื้อผ้าที่สวมไม่ถูกต้อง');
  const wearing=state.wardrobe.equipped,top=catalogById[wearing.upper],color=clothColors[groups.upper.findIndex(v=>v.id===top.id)];
  if(baby)clothes=`<defs>${tintFilter(cloth,color)}</defs>`+image(support('infant-wrap'),cloth,'upper');
  else{
   layers+=image(support('body'),skin);
   clothes=['pants','shoes','upper'].map(slot=>image(catalogById[wearing[slot]].path,'',slot)).join('');
  }
 }
 layers+=image(assetPath('faces',genes.face),skin)+clothes;
 if(state.race==='พรายพฤกษา')layers+=`<path d="M21 24L13 18L17 29H21M43 24L51 18L47 29H43" fill="${skinColors[genes.skin]}"/>`;
 else if(state.race==='ชนศิลา')layers+=`<path d="M22 32h3v2h-3M39 32h3v2h-3" fill="#a1aaa0"/>`;
 else if(state.race==='สายเลือดดารา')layers+='<path d="M32 18l2 2-2 2-2-2z" fill="#e8dcaa"/>';
 layers+=image(assetPath('eyes',genes.eyes));
 layers+=image(baby?support('infant-hair'):assetPath('hairShapes',genes.hair),hair);
 if(!headOnly&&!adult&&age>=8)for(const item of wornEquipment(state).toSorted((a,b)=>['body','mainHand','offHand'].indexOf(a.slot)-['body','mainHand','offHand'].indexOf(b.slot)))layers+=`<g data-equipment-id="${item.id}">${image(item.path,'',item.slot)}</g>`;
 if(!headOnly&&age>=3&&state.wardrobe.equipped.hats)layers+=image(catalogById[state.wardrobe.equipped.hats].path,'','hats');
 if(old)layers+='<path d="M22 32h4M38 32h4M29 35h6" stroke="#614f48" stroke-width="1" opacity=".5"/>';
 const scale=baby?1:age<3?.68:age<12?.82:age<18?.94:1,transform=headOnly?'':baby?'translate(0 8)':`translate(${32*(1-scale)} ${77*(1-scale)}) scale(${scale})`;
 const label=adult?`ภาพ${role==='mother'?'มารดา':'บิดา'}`:`ตัวละคร${stage}`;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${headOnly?'8 0 48 44':'0 0 64 80'}" shape-rendering="crispEdges" role="img" aria-label="${label}" class="${headOnly?'family-portrait':portrait?'character-portrait':'pixel-sprite'}" data-appearance-version="2" data-age-stage="${stage}" data-role="${role}"><defs>${tintFilter(skin,skinColors[genes.skin])}${tintFilter(hair,hairTone)}</defs>${!headOnly?'<ellipse cx="32" cy="77" rx="20" ry="2" fill="#07111d55"/>':''}${!headOnly&&!adult?powerAura(state):''}<g transform="${transform}">${layers}</g></svg>`;
}
