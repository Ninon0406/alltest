import {hairColors,skinColors,clothColors} from '../../data/appearance-v2.js';
export const pixelSize={width:64,height:80,anchor:[32,77]};
const ink='#3b4350',base='#cccccc',shade='#888888',light='#ffffff';
const r=(x,y,w,h,c=base)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
const p=(points,c=base)=>`<polygon points="${points}" fill="${c}"/>`;
const svg=content=>`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80" shape-rendering="crispEdges">${content}</svg>`;
export function tintFilter(id,color){
 const rgb=color.match(/\w\w/g).map(x=>parseInt(x,16)/255);
 return `<filter id="${id}" color-interpolation-filters="sRGB"><feComponentTransfer>${rgb.map((n,i)=>`<feFunc${'RGB'[i]} type="table" tableValues="${[.18,.38,.65,1,1.18].map(m=>Math.min(1,n*m).toFixed(5)).join(' ')}"/>`).join('')}</feComponentTransfer></filter>`;
}
function face(i){
 const widths=[12,12,13,13,12,13,12,12,13,12,14,12,14,12,12,12,12,12,12,13],chins=[6,4,8,9,5,5,7,2,8,4,9,3,10,5,2,6,7,6,5,7],ends=[37,40,37,36,39,38,38,40,35,42,37,39,38,40,39,37,38,39,38,37];
 const w=widths[i],c=chins[i],end=ends[i],brow=i===15?1:i===17?3:2;
 return r(28,34,8,11,shade)+r(31-w,23,3,7,shade)+r(30+w,23,3,7,shade)+p(`${32-w},14 ${32-w+3},11 ${32+w-3},11 ${32+w},14 ${32+w},30 ${32+c},${end} ${32-c},${end} ${32-w},30`)+p(`${32+w-2},17 ${32+w},17 ${32+w},30 ${32+c},${end} ${32+c-2},${end-1}`,shade)+r(24,15,5,2,light)+r(23,21,i===16?7:5,i===16?1:brow,shade)+r(36,21,i===16?7:5,i===16?1:brow,shade)+r(31,27,i===19?3:2,i===18?6:4,shade)+r(29,end-5,6,1,shade);
}
function eyes(i){
 const models=[[3,3,0,0],[5,4,0,0],[5,2,0,0],[6,2,-1,0],[5,3,-1,0],[5,3,1,0],[4,3,0,2],[4,3,0,-2],[6,3,0,1],[4,2,0,-1],[5,1,0,0],[5,2,0,1],[5,5,0,0],[5,2,-1,-1],[6,2,0,-1],[4,2,1,1],[5,3,1,1],[6,3,-1,-1],[4,3,-1,1],[6,4,0,0]];
 const [w,h,tilt,gap]=models[i],color=['#6e9fa4','#ab7b47','#807bb0','#6d875b'][i%4];let out='';
 for(const sign of [-1,1]){const x=32+sign*(7+gap)-Math.floor(w/2),y=25;
  out+=r(x-1,y-1,w+2,h+2,ink)+r(x,y,w,h,'#f5ead7')+r(x+Math.floor(w/2),y,Math.max(2,Math.floor(w/2)),h,color)+r(x+Math.floor(w/2),y+1,1,Math.max(1,h-1),'#202635');
  if(tilt)out+=r(sign<0?x-1:x+w-1,tilt<0?y-2:y+h+1,2,1,ink);
  if(h>2)out+=r(x+Math.floor(w/2),y,1,1,'#fff5de');
 }return out;
}
function hair(i){
 let out=r(20,8,24,10)+r(23,6,18,3)+r(18,11,3,10)+r(43,11,3,10);
 const side=(length,width=4)=>r(17,15,width,length)+r(43,15,width,length);
 const braid=x=>Array.from({length:9},(_,n)=>r(x+n%2,22+n*4,4,5,n%2?shade:base)).join('')+r(x,59,5,2,light);
 switch(i){
  case 0:out+=r(20,17,24,3)+r(20,20,3,2)+r(32,20,3,2);break;
  case 1:out+=p('19,17 43,13 43,18 22,23')+r(18,19,3,6);break;
  case 2:out+=r(20,16,24,6)+r(24,20,3,3)+r(36,20,3,3);break;
  case 3:out+=side(22)+r(15,34,7,4)+r(42,34,7,4)+r(20,17,24,4);break;
  case 4:out+=side(20,5)+r(14,31,8,6)+r(42,31,8,6)+r(18,17,26,3)+r(16,37,7,3)+r(41,37,7,3);break;
  case 5:out+=side(42)+r(15,51,6,6)+r(43,51,6,6)+r(21,16,22,3);break;
  case 6:out+=side(35);for(let n=0;n<8;n++)out+=r(14+n%2*2,20+n*4,5,5)+r(45-n%2*2,20+n*4,5,5);break;
  case 7:out+=r(17,15,4,15)+r(44,18,5,12)+braid(47)+r(21,16,20,4);break;
  case 8:out+=braid(13)+braid(47)+r(18,16,28,3);break;
  case 9:out+=r(43,3,10,8)+r(49,8,7,25)+r(51,29,5,6)+p('20,18 41,11 44,18 20,22');break;
  case 10:out+=r(46,23,8,25)+r(49,43,5,7)+r(18,16,27,3);break;
  case 11:out+=side(35)+r(45,18,7,8)+r(20,16,24,3)+r(46,22,5,2,light);break;
  case 12:for(let n=0;n<8;n++)out+=r(17+n*4,8-n%2*3,5,7,n%3?base:shade);out+=r(15,14,5,9)+r(45,14,5,9);break;
  case 13:out+=side(23,5);for(let n=0;n<6;n++)out+=r(13+n%2*2,17+n*4,6,6)+r(45-n%2*2,17+n*4,6,6);out+=r(20,17,23,4);break;
  case 14:out=r(15,3,34,14)+r(10,8,9,24)+r(45,8,9,24)+r(18,0,28,7)+r(12,3,8,8)+r(46,3,6,8)+r(20,15,24,5);break;
  case 15:out+=r(20,16,10,5)+r(34,16,10,5)+r(31,7,2,10,shade)+side(8,3);break;
  case 16:out+=p('18,17 38,10 44,14 21,24')+r(17,19,4,15)+r(44,18,4,9);break;
  case 17:out+=side(29)+p('19,15 43,12 43,17 24,30 21,30')+r(21,24,6,5);break;
  case 18:out+=r(17,8,7,9)+r(24,4,6,7)+r(30,7,7,8)+r(38,4,5,9)+r(44,10,5,13)+p('20,18 29,18 22,23');break;
  case 19:out+=r(16,11,5,16)+r(43,11,5,16)+r(19,17,25,4);for(let n=0;n<10;n++)out+=r(19+n*3,9+n%3*3,2,2,n%2?light:shade);break;
 }
 return out+r(24,9,8,2,light)+r(19,12,2,5,shade);
}
function upper(i){
 const color=clothColors[i],width=11+i%3,hem=58+Math.floor(i/5)%3,sleeve=5+i%4*2;
 let out=p(`${32-width},43 27,40 37,40 ${32+width},43 ${34+width},${hem} ${30-width},${hem}`,color)+r(16-i%2,44,7,sleeve,color)+r(41,44,7+i%2,sleeve,color);
 if(i%5===0)out+=r(29,41,6,2,'#e4d8b5')+r(31,43,2,hem-43,'#435564');
 if(i%5===1)out+=p('27,41 32,46 37,41 35,49 29,49','#e4d8b5')+r(31,46,2,6,'#5b4a43');
 if(i%5===2)out+=r(17,44+sleeve-2,5,2,'#e1c4a0')+r(42,44+sleeve-2,5,2,'#e1c4a0');
 if(i%5===3)for(let y=44;y<hem;y+=4)out+=r(31,y,2,2,'#e5c588');
 if(i%5===4)out+=r(23,43,6,hem-43,'#47535b')+r(35,43,6,hem-43,'#47535b');
 if(i>=5)out+=r(23+(i%2)*12,50,5,5,'#405c65');
 if(i>=10)out+=r(21,hem-3,22,1,'#e5c588');
 if(i>=15)out+=r(24,43,2,9,'#d2bd96')+r(38,43,2,9,'#d2bd96');
 return out;
}
function pants(i){
 const color=clothColors[(i+8)%20],length=i===1?8:12+i%3,width=6+Math.floor(i/5)%3;
 let out=r(21,57,22,4,color)+r(23-width/3|0,59,width,length,color)+r(35,59,width,length,color)+r(22,58,20,2,'#47505d');
 if(i%4===0)out+=r(24,61,1,length-2,'#d6c59a')+r(37,61,1,length-2,'#d6c59a');
 if(i%4===1)out+=r(22,59+length-2,width,2,'#d6c59a')+r(35,59+length-2,width,2,'#d6c59a');
 if(i%4===2)out+=r(22,62,4,4,'#495763')+r(38,62,4,4,'#495763');
 if(i%4===3)out+=r(22,64,width,2,'#9b8e75')+r(35,64,width,2,'#9b8e75');
 return out;
}
function shoes(i){
 const height=3+i%5,width=7+Math.floor(i/5)%3,color=['#8c6854','#46566b','#797758','#a38a6b','#685760'][i%5];let out='';
 for(const x of [21,35]){out+=r(x,77-height,width,height,color)+r(x-1,75,width+1,2,'#323b48');if(i>=5)out+=r(x+1,77-height,width-2,1,'#d2bb8e');if(i>=10)out+=r(x+2,78-height,2,Math.max(1,height-2),'#c1b7a7');if(i>=15)out+=r(x,74,width,1,'#d2bb8e');}return out;
}
function hat(i){
 const color=clothColors[(i+4)%20],kind=i%5,row=Math.floor(i/5);let out='';
 if(kind===0)out=r(20,5-row,24,10+row,color)+r(18,12,28,4,color);
 if(kind===1)out=r(21,4-row,22,10,color)+r(13-row,12,38+row*2,4,color);
 if(kind===2)out=p(`18,12 24,${2+row} 40,${2+row} 46,12`,color)+r(11-row,12,42+row*2,3,'#b99d68');
 if(kind===3)out=r(17,6-row,29,8,color)+r(25,14,22,3,color)+r(20,4-row,23,3,color);
 if(kind===4)out=p(`15,15 25,${1+row} 40,${3+row} 48,15`,color)+r(14,14,36,3,color)+r(13,16,5,10,color);
 out+=r(20,11,24,2,'#d4bd8c');
 if(row===1)out+=r(40,4,3,7,'#ddd2ac');if(row===2)out+=r(28,5,6,4,'#b5c0c9');if(row===3)out+=r(24,6,3,4,'#e5c588')+r(36,6,3,4,'#e5c588');
 return out;
}
export function partSvg(group,index){
 if(!Number.isSafeInteger(index)||index<0||index>=20)throw Error('Invalid pixel variant');
 let content;
 if(group==='faces')content=face(index);
 else if(group==='hairShapes')content=hair(index);
 else if(group==='eyes')content=eyes(index);
 else if(group==='hairColors'||group==='skinTones'){
  const color=(group==='hairColors'?hairColors:skinColors)[index];content=`<defs>${tintFilter('tone',color)}</defs><g filter="url(#tone)">${group==='hairColors'?hair(0):face(0)}</g>`;
 }else if(group==='upper')content=upper(index);else if(group==='pants')content=pants(index);else if(group==='shoes')content=shoes(index);else if(group==='hats')content=hat(index);else throw Error('Unknown pixel group');
 return svg(content);
}
export function supportSvg(kind){
 if(kind==='body')return svg(r(24,40,16,20)+r(17,44,6,19)+r(41,44,6,19)+r(23,59,7,16)+r(35,59,7,16));
 if(kind==='infant-wrap')return svg(p('21,39 43,39 49,49 46,65 39,69 25,69 18,65 15,49')+p('21,42 43,60 42,64 20,47',shade)+r(23,65,18,3,shade)+r(22,41,20,2,light));
 if(kind==='infant-hair')return svg(r(23,12,18,3)+r(26,10,9,2)+r(25,15,3,2)+r(34,14,3,2));
 throw Error('Unknown support layer');
}
