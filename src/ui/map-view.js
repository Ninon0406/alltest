import {renderLocationArt} from './scene.js';
import { getCareer } from '../data/careers.js';
import { locations,routes } from '../world/locations.js';
import { revealedLocations,findRoute } from '../world/travel.js';
import { services,availableServices } from '../world/economy.js';
import { storyToken } from '../engine/life.js';
import { paragraph,actionButton } from './life-view.js';
import {isV7} from '../engine/development.js';
import {equipmentShops,equipmentById} from '../data/equipment.js';
let selected=null,zoom=1,offsetX=0,offsetY=0,lastRun=null;
const ns='http://www.w3.org/2000/svg';
export function renderMap(parent,state,perform,refresh){
 if(lastRun!==state.run?.id){lastRun=state.run?.id;selected=null;zoom=1;offsetX=0;offsetY=0;}
 const token=storyToken(state),current=locations[state.world.currentLocationId],revealed=revealedLocations(state);
 if(!selected||!revealed.has(selected))selected=current.id;
 paragraph(parent,'แผนที่เอลินดรา','h2');paragraph(parent,`${current.parent} › ${current.name} • เงิน ${state.gold} เหรียญ • ขนมปัง ${state.world.inventory.bread??0}/20`);
 const help=document.createElement('details');parent.append(help);paragraph(help,'วิธีอ่านแผนที่และข้อจำกัดตามวัย','summary');paragraph(help,'จุดสีทองคือที่อยู่ปัจจุบัน กรอบข้าวหลามตัดคือจุดกำเนิด เส้นสีทองคือเส้นทางที่รู้จัก จุดที่ยังไม่เคยเยือนแสดงด้วยวงกลมโปร่ง เด็ก 4–11 ปีเดินทางในภูมิภาคกับผู้ดูแล ข้ามภูมิภาคได้เมื่ออายุ 12 ปี');
 const controls=document.createElement('div');controls.className='map-controls';parent.append(controls);
 const adjust=(label,fn)=>{const b=document.createElement('button');b.textContent=label;b.onclick=()=>{fn();refresh();};controls.append(b);};
 adjust('ตำแหน่งของฉัน',()=>{selected=current.id;zoom=1;offsetX=0;offsetY=0;});
 adjust('จุดเกิด',()=>{selected=state.birth?.locationId??current.id;zoom=1;offsetX=0;offsetY=0;});
 adjust('ขยาย +',()=>{zoom=Math.min(3,zoom+.5);});adjust('ย่อ −',()=>{zoom=Math.max(1,zoom-.5);});
 adjust('เลื่อนซ้าย',()=>{offsetX=Math.max(0,offsetX-50);});adjust('เลื่อนขวา',()=>{offsetX=Math.min(450,offsetX+50);});adjust('เลื่อนลง',()=>{offsetY=Math.min(300,offsetY+50);});adjust('เลื่อนขึ้น',()=>{offsetY=Math.max(0,offsetY-50);});
 const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',`${offsetX} ${offsetY} ${700/zoom} ${500/zoom}`);svg.setAttribute('role','img');svg.setAttribute('aria-label','แผนที่เส้นทางและสถานที่');svg.classList.add('world-map');parent.append(svg);
 const el=(name,attrs)=>{const e=document.createElementNS(ns,name);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);svg.append(e);return e;};
 el('rect',{width:700,height:500,fill:'#14273c'});
 for(const [index,region] of [...new Set(Object.values(locations).map(l=>l.parent))].entries()){
  const nodes=Object.values(locations).filter(l=>l.parent===region),x=Math.min(...nodes.map(l=>l.x))-30,y=Math.min(...nodes.map(l=>l.y))-45;
  el('rect',{x,y,width:Math.max(...nodes.map(l=>l.x))-x+40,height:Math.max(...nodes.map(l=>l.y))-y+35,rx:35,fill:['#294939','#4d4550','#353c63','#1e4a45','#25415e'][index]});
  const t=el('text',{x:x+5,y:y+18,fill:'#ded4b8','font-size':13});t.textContent=region;
 }
 for(const route of routes){if(!revealed.has(route.from)||!revealed.has(route.to))continue;const a=locations[route.from],b=locations[route.to];el('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,stroke:'#af935e','stroke-width':2});}
 for(const id of revealed){const loc=locations[id],g=document.createElementNS(ns,'g');svg.append(g);g.setAttribute('tabindex','0');g.setAttribute('role','button');g.setAttribute('aria-label',loc.name);g.onclick=()=>{selected=id;refresh();};g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selected=id;refresh();}};
  if(id===state.birth?.locationId){const birthPin=document.createElementNS(ns,'path');birthPin.setAttribute('d',`M${loc.x} ${loc.y-19}l19 19-19 19-19-19z`);birthPin.setAttribute('fill','none');birthPin.setAttribute('stroke','#f5d391');g.append(birthPin);}
  const dot=document.createElementNS(ns,'circle');for(const [k,v]of Object.entries({cx:loc.x,cy:loc.y,r:12,fill:id===current.id?'#f2cc78':state.world.visited.includes(id)?'#578e9a':'#162331',stroke:id===selected?'white':'#c9ac72','stroke-width':2}))dot.setAttribute(k,v);g.append(dot);
  const label=document.createElementNS(ns,'text');label.setAttribute('x',loc.x>540?loc.x-15:loc.x+15);label.setAttribute('text-anchor',loc.x>540?'end':'start');label.setAttribute('y',loc.y+5);label.setAttribute('fill','#f3ead7');label.setAttribute('font-size','11');label.textContent=loc.name;g.append(label);
 }
 const select=document.createElement('select');select.setAttribute('aria-label','เลือกสถานที่ที่รู้จัก');for(const id of revealed){const option=document.createElement('option');option.value=id;option.textContent=locations[id].name;select.append(option);}select.value=selected;select.onchange=()=>{selected=select.value;refresh();};parent.append(select);
 const destination=locations[selected];const preview=document.createElement('div');preview.className='map-preview';renderLocationArt(preview,destination);parent.append(preview);paragraph(parent,destination.name,'h3');paragraph(parent,destination.description);
 const quote=findRoute(state,selected);
 if(isV7(state)||state.v8){
  if(selected!==current.id)paragraph(parent,quote?`${quote.path.map(id=>locations[id].name).join(' → ')} · ขบวนเดินทาง ${quote.days} วัน · ${quote.gold} เหรียญ`:'เส้นทางยังไม่เปิดตามวัย');
  paragraph(parent,`บริการของสถานที่นี้: ${destination.services.map(id=>services[id]?.label).filter(Boolean).join(' · ')||'พื้นที่พักและชมภูมิทัศน์'}`);
  if(equipmentShops[selected])paragraph(parent,`ร้านอุปกรณ์: ${equipmentShops[selected].map(id=>equipmentById[id].label).join(' · ')}`);
  paragraph(parent,state.v8?'แผนที่ใช้ดูข้อมูล การย้ายสถานที่เกิดจากช้อยส์ในเรื่องราวเท่านั้น':'แผนที่ใช้ดูตำแหน่งและข้อมูล เลือก “วางแผนเดินทาง” จากหน้าชีวิตเมื่อพร้อม');return;
 }
 if(selected!==current.id){paragraph(parent,quote?`${quote.path.map(id=>locations[id].name).join(' → ')} • ${quote.days} วัน • ${quote.gold} เหรียญ`:'ยังไม่มีเส้นทางที่เปิดให้เดินทางได้ตามวัย');if(quote){actionButton(parent,'เดินทางตามเส้นทางนี้',{type:'travel',destination:selected,token},perform);if(quote.gold>0){const walking=findRoute(state,selected,'walk');actionButton(parent,`เดินเท้าพร้อมผู้ร่วมทาง • ${walking.days} วัน • ฟรี`,{type:'travel',destination:selected,method:'walk',token},perform);}}}
 paragraph(parent,`บริการ ณ ${current.name}`,'h3');
 for(const id of availableServices(state)){const s=services[id];actionButton(parent,`${s.label} • ${s.gold>=0?'+':''}${s.gold} เหรียญ • ${s.days} วัน\n${s.description} • อายุ ${s.minAge} ปีขึ้นไป`,{type:'service',serviceId:id,token},perform);}
 paragraph(parent,'บัญชีรายรับรายจ่ายล่าสุด','h3');for(const e of state.world.ledger.slice(-12).reverse())paragraph(parent,`${e.day} • ${locations[e.location].name} • ${services[e.source]?.label??(e.source.startsWith('career:')?`งาน${getCareer(e.source.slice(7))?.label??'อาชีพ'}`:e.source==='legacy'?'รายรับรายจ่ายเส้นทางเดิม':e.source==='milestone'?'เหตุการณ์สำคัญ':'ค่าเดินทาง')} • ${e.amount>=0?'+':''}${e.amount} เหรียญ${e.transactions>1?' (รวม '+e.transactions+' ครั้งตามแผนรายปี)':''}`);
}
