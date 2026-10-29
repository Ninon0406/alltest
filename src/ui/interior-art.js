import {interiorThemes,roomKinds} from '../data/interiors.js';
const r=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
export function interiorArt(region,kind){
 const t=interiorThemes[region];if(!t||!roomKinds[kind])throw Error('Unknown interior art');
 let art=r(0,0,320,108,t.wall)+r(0,108,320,52,t.wood)+r(0,104,320,6,t.trim);
 for(let row=0;row<5;row++)for(let col=0;col<9;col++)art+=r(col*40-(row%2)*20,row*22,38,1,t.shade);
 for(let y=116;y<160;y+=12)art+=r(0,y,320,1,t.shade);
 art+=r(8,0,9,110,t.shade)+r(303,0,9,110,t.shade)+r(0,3,320,6,t.trim);
 for(const x of [24,258]){art+=r(x,20,38,53,t.shade)+r(x+4,24,30,45,t.sky)+r(x+17,24,3,45,t.trim)+r(x+4,43,30,3,t.trim);}
 // Regional architecture remains visible in all three room types.
 if(t.motif==='plant')art+=r(70,93,11,13,'#735347')+r(73,70,4,27,'#557657')+r(65,76,11,5,'#8aa475')+r(76,82,12,5,'#8aa475');
 if(t.motif==='stone')art+=r(65,47,27,60,'#8a9296')+r(69,53,19,47,t.shade)+r(72,85,13,12,'#d9a166')+r(69,100,22,6,'#b6b6ab');
 if(t.motif==='star')for(const [x,y]of [[77,28],[238,39],[204,18]])art+=`<path d="M${x} ${y-4}l2 3 3 1-3 2-2 3-1-3-3-2 3-1z" fill="${t.trim}"/>`;
 if(t.motif==='vine')for(let y=9;y<90;y+=10)art+=r(69+y%3, y,3,12,'#6f9978')+r(71+y%3,y+3,9,4,'#91ac82');
 if(t.motif==='wave')for(let x=80;x<240;x+=16)art+=r(x,15,8,3,t.sky)+r(x+7,18,8,3,t.sky);
 if(kind==='home'){
  art+=r(27,83,83,30,'#725d58')+r(25,78,86,8,t.trim)+r(31,85,74,21,'#c4b7a1')+r(34,85,21,7,'#e0d7b9')+r(57,92,47,14,'#8e9fa0');
  art+=r(245,88,53,24,t.shade)+r(241,86,61,5,t.trim)+r(261,79,20,6,'#c7b992');
  art+=r(135,124,91,18,'#bcaaa0')+r(139,127,83,12,'#879f98');
  for(let x=34;x<105;x+=14)art+=r(x,111,5,10,t.shade);
 }else if(kind==='classroom'){
  art+=r(87,24,146,54,t.trim)+r(91,28,138,46,'#253f43');
  for(let i=0;i<5;i++)art+=r(103+i*21,40,12,3,'#a9c4ac')+r(102+i*21,55,15,2,'#c6d7b6');
  for(const [x,y]of [[30,89],[235,89],[35,121],[244,123]])art+=r(x,y,46,7,t.trim)+r(x+4,y+7,4,14,t.shade)+r(x+36,y+7,4,14,t.shade)+r(x+12,y-7,20,6,'#d7d5b7');
  art+=r(99,90,22,4,'#c8b09b')+r(101,85,18,4,'#8fa6b6');
 }else{
  art+=r(91,24,16,64,t.trim)+r(94,27,10,54,t.shade)+r(213,24,16,64,t.trim)+r(216,27,10,54,t.shade);
  art+=r(123,87,74,10,t.trim)+r(128,81,64,7,t.shade)+`<path d="M160 44l11 15-11 18-11-18z" fill="${t.sky}"/>`;
  art+=`<path d="M116 133L136 120H208L230 133L208 144H136Z" fill="${t.shade}" stroke="${t.trim}" stroke-width="2"/>`;
  for(const x of [57,251])art+=r(x,89,9,23,t.shade)+r(x-4,80,17,13,t.trim)+r(x+2,77,5,8,'#f0dba4');
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="160" viewBox="0 0 320 160" shape-rendering="crispEdges" role="img" aria-label="${roomKinds[kind]}">${art}</svg>`;
}
