import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

// GODSEED original source-pixel drawings. No photographs, external packs or legacy assets.
// Integer raster primitives and a coordinate hash keep exports byte-for-byte reproducible.
const output=fileURLToPath(new URL('../public/assets/art-v2/',import.meta.url));
mkdirSync(output,{recursive:true});
const W=480,H=270;
const palette={ink:'314e50',bark:'685c49',wood:'a87852',woodLight:'d2a16a',woodDark:'76543f',gold:'f3ce88',cream:'f5e6ba',sky:'9ecbd1',leaf:'6ea67b',leafLight:'a9ca88',jade:'77b8a1',deep:'426f60',grass:'86b87d',soil:'b89770',stone:'8c9c91',lavender:'bba2cc'};
const image=(w=W,h=H)=>new PNG({width:w,height:h});
const colors=new Map();
function rgb(color){if(!colors.has(color))colors.set(color,color.match(/../g).map(v=>parseInt(v,16)));return colors.get(color);}
function pixel(p,x,y,color,alpha=255){x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=p.width||y>=p.height)return;const c=rgb(color),i=(y*p.width+x)*4;p.data[i]=c[0];p.data[i+1]=c[1];p.data[i+2]=c[2];p.data[i+3]=alpha;}
function rect(p,x,y,w,h,color,alpha=255){for(let yy=Math.round(y);yy<Math.round(y+h);yy++)for(let xx=Math.round(x);xx<Math.round(x+w);xx++)pixel(p,xx,yy,color,alpha);}
function ellipse(p,cx,cy,rx,ry,color,alpha=255){for(let y=Math.ceil(cy-ry);y<=cy+ry;y++)for(let x=Math.ceil(cx-rx);x<=cx+rx;x++)if(((x-cx)/rx)**2+((y-cy)/ry)**2<=1)pixel(p,x,y,color,alpha);}
function line(p,x0,y0,x1,y1,color,width=1){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);const dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let e=dx+dy;for(;;){rect(p,x0,y0,width,width,color);if(x0===x1&&y0===y1)break;const d=2*e;if(d>=dy){e+=dy;x0+=sx;}if(d<=dx){e+=dx;y0+=sy;}}}
function poly(p,points,color,alpha=255){let min=Math.min(...points.map(v=>v[1])),max=Math.max(...points.map(v=>v[1]));for(let y=Math.ceil(min);y<=max;y++){const xs=[];for(let a=0;a<points.length;a++){const b=(a+1)%points.length,[x1,y1]=points[a],[x2,y2]=points[b];if((y1<=y&&y2>y)||(y2<=y&&y1>y))xs.push(x1+(y-y1)*(x2-x1)/(y2-y1));}xs.sort((a,b)=>a-b);for(let i=0;i<xs.length;i+=2)rect(p,Math.ceil(xs[i]),y,Math.floor(xs[i+1])-Math.ceil(xs[i])+1,1,color,alpha);}}
function hash(x,y,seed=0){let n=(Math.imul(x+71,374761393)+Math.imul(y+19,668265263)+Math.imul(seed+1,1274126177))|0;n=Math.imul(n^(n>>>13),1274126177);return (n^(n>>>16))>>>0;}
function save(name,p){writeFileSync(output+name+'.png',PNG.sync.write(p,{colorType:6}));}
function copy(target,source,dx,dy){for(let y=0;y<source.height;y++)for(let x=0;x<source.width;x++){const i=(y*source.width+x)*4;if(!source.data[i+3])continue;const j=((y+dy)*target.width+x+dx)*4;source.data.copy(target.data,j,i,i+4);}}

function sky(p,forest=false){
 const bands=forest?['87b7b8','99c8c5','b6d6c7','ccdec9']:['96c6ce','add3d2','c3dfd1','dce8ce'];
 for(let y=0;y<170;y++)rect(p,0,y,W,1,bands[Math.min(3,Math.floor(y/43))]);
 ellipse(p,381,39,18,18,'f4df9e');ellipse(p,377,35,11,10,'f8e9b5');
 for(let x=0;x<W;x++){
  const top=111+Math.round(Math.sin(x/65)*12+Math.cos(x/110)*8);
  rect(p,x,top,1,170-top,'a0c4b5');
  const near=133+Math.round(Math.cos(x/47)*9+Math.sin(x/83)*6);
  rect(p,x,near,1,170-near,'85b29a');
 }
 // Remote orchard: deliberately quiet in value to separate the foreground actors.
 for(let i=0;i<23;i++){const x=i*23-12,y=143+hash(i,4)%12;ellipse(p,x,y,17,13,'7fae92');ellipse(p,x-5,y-5,11,8,'8bb99b');}
}
function tuft(p,x,y,color='4f8763',size=4){line(p,x,y,x-2,y-size,color);line(p,x+1,y,x+2,y-size-2,color);line(p,x+2,y,x+5,y-size+1,color);}
function blossom(p,x,y,color='edb4ac'){rect(p,x,y,1,5,'527e5a');rect(p,x-2,y-2,5,3,color);rect(p,x-1,y-3,3,5,color);pixel(p,x,y-1,'ffe5a4');}
function bush(p,cx,cy,rx=24,ry=14,seed=0){
 ellipse(p,cx,cy+2,rx,ry,'3f715d');ellipse(p,cx-8,cy-4,rx*.7,ry*.85,'5b9670');ellipse(p,cx+9,cy-6,rx*.7,ry,'6eaa79');
 ellipse(p,cx-2,cy-10,rx*.6,ry*.65,'83b980');
 for(let i=0;i<34;i++){const x=cx-rx+hash(i,seed)%Math.max(1,rx*2),y=cy-ry+hash(seed,i+70)%Math.max(1,ry*2);if(((x-cx)/rx)**2+((y-cy)/ry)**2<.82)rect(p,x,y,2+hash(i,3)%3,1,i%3?'8ac38a':'a9ce93');}
}
function tree(p,x,base,height,seed=1){
 const crownY=base-height*.63,rx=height*.32,ry=height*.35;
 poly(p,[[x-8,base],[x-5,base-height*.64],[x+4,base-height*.78],[x+10,base-2],[x+20,base+3],[x+4,base+1],[x-9,base+5],[x-18,base+3]],'536d53');
 poly(p,[[x,base],[x-1,base-height*.64],[x+4,base-height*.72],[x+6,base-1]],'8c9662');
 line(p,x,base-height*.34,x-21,base-height*.65,'536d53',5);line(p,x+4,base-height*.43,x+28,base-height*.74,'536d53',4);
 for(const [ox,oy,s] of [[-.65,.1,.68],[.65,.1,.65],[-.2,-.45,.75],[.4,-.5,.61],[0,.15,.85]])ellipse(p,x+ox*rx,crownY+oy*ry,rx*s,ry*s,'3f795f');
 for(const [ox,oy,s] of [[-.68,-.05,.55],[.58,-.05,.55],[-.2,-.58,.6],[.34,-.62,.5],[0,-.1,.72]])ellipse(p,x+ox*rx,crownY+oy*ry,rx*s,ry*s,'609e71');
 for(const [ox,oy,s] of [[-.52,-.2,.36],[-.23,-.73,.4],[.38,-.73,.32],[.14,-.28,.4]])ellipse(p,x+ox*rx,crownY+oy*ry,rx*s,ry*s,'85b77f');
 for(let i=0;i<85;i++){const xx=x-rx+hash(i,seed)%Math.round(rx*2),yy=crownY-ry+hash(seed,i+101)%Math.round(ry*1.5);if(((xx-x)/rx)**2+((yy-crownY)/ry)**2<.75){rect(p,xx,yy,3+hash(i,8)%5,2,i%4?'96c48a':'b6d498');pixel(p,xx-1,yy+1,'679f72');}}
 line(p,x-3,base-8,x-3,base-22,'a0a06d');line(p,x+5,base-36,x+4,base-49,'3d6650');
}
function window(p,x,y,w,h){
 rect(p,x-2,y-2,w+4,h+4,'795e4b');rect(p,x,y,w,h,'79afb2');rect(p,x+2,y+2,w-4,h*.5,'b5d2c0');
 line(p,x+3,y+h-4,x+w-4,y+3,'93c4bb',2);rect(p,x+w/2-1,y,2,h,'e8ca95');rect(p,x,y+h/2-1,w,2,'e8ca95');rect(p,x-3,y+h,w+6,3,'e8bc83');
}
function cottage(p,x,base,w,roof='c99961',seed=0){
 const wallTop=base-63,roofTop=wallTop-36;
 rect(p,x,wallTop,w,63,'a47f59');rect(p,x+3,wallTop+2,w-6,58,'ead09a');rect(p,x+4,base-10,w-8,9,'c3ac82');
 for(let yy=wallTop+8;yy<base-11;yy+=12)for(let xx=x+6;xx<x+w-8;xx+=12)if(hash(xx,yy,seed)%7===0)rect(p,xx,yy,6,2,'d8b986');
 rect(p,x+7,wallTop,5,59,'a27c55');rect(p,x+w-12,wallTop,5,59,'a27c55');rect(p,x+7,wallTop+29,w-14,3,'b28b60');
 // Individually outlined rounded shingles over a stepped hipped-roof silhouette.
 poly(p,[[x-10,wallTop+5],[x+10,roofTop+12],[x+w/2,roofTop],[x+w-10,roofTop+12],[x+w+10,wallTop+5]],'775b49');
 poly(p,[[x-7,wallTop+2],[x+12,roofTop+13],[x+w/2,roofTop+3],[x+w-12,roofTop+13],[x+w+7,wallTop+2]],roof);
 for(let yy=roofTop+12;yy<wallTop;yy+=7){const half=(yy-roofTop)/(wallTop-roofTop)*(w/2+5);const left=Math.ceil(x+w/2-half),right=Math.floor(x+w/2+half);for(let xx=left;xx<right;xx+=10){line(p,xx,yy,Math.min(xx+8,right),yy,'b87e51');rect(p,xx+(Math.floor(yy/7)%2)*4,yy-4,1,4,'e2b67b');}}
 rect(p,x-9,wallTop+2,w+18,4,'895f43');rect(p,x-6,wallTop+2,w+12,1,'e4b87b');
 rect(p,x+w-24,roofTop+2,13,24,'9c8066');rect(p,x+w-26,roofTop,17,4,'d3b68e');rect(p,x+w-21,roofTop+5,3,16,'bca080');
 const doorX=x+w/2-10;rect(p,doorX,base-36,21,36,'6a6a55');ellipse(p,doorX+10,base-35,10,7,'6a6a55');rect(p,doorX+3,base-34,15,34,'8c8561');
 for(let xx=doorX+5;xx<doorX+18;xx+=5)line(p,xx,base-31,xx,base-4,'7b7557');pixel(p,doorX+16,base-17,'f8d68d');
 window(p,x+18,base-43,18,22);window(p,x+w-37,base-43,18,22);
 rect(p,doorX-5,base-1,31,3,'a8aa8b');
}
function stone(p,x,y,w=18,h=9){
 poly(p,[[x-w/2,y],[x-w/2+3,y-h],[x+w/2-3,y-h-2],[x+w/2,y-3],[x+w/2-2,y+1]],'6c8a7e');
 poly(p,[[x-w/2+2,y-3],[x-w/2+4,y-h+1],[x+w/2-5,y-h+1],[x+w/2-2,y-4]],'a1b3a0');line(p,x-w/2+5,y-h+2,x+1,y-h+2,'c0c8aa');
}

function terrain(stage){
 const p=image(),workshop=stage==='workshop',forest=stage==='forest';
 if(workshop){
  rect(p,0,160,W,H-160,'9e7c59');
  for(let y=160;y<H;y+=16){rect(p,0,y,W,1,'685b48');rect(p,0,y+1,W,1,'c19d6b');for(let x=(y/16%2)*24-48;x<W;x+=48){rect(p,x,y,1,16,'7d624a');for(let q=0;q<4;q++){const xx=x+6+hash(x,q+y)%32,yy=y+3+hash(q,x)%9;rect(p,xx,yy,6+hash(x,yy)%12,1,'b68d61');}pixel(p,x+3,y+3,'665948');pixel(p,x+44,y+12,'665948');}}
  poly(p,[[111,204],[359,204],[380,259],[94,259]],'6a8c80');poly(p,[[116,208],[354,208],[371,254],[103,254]],'9cbba0');poly(p,[[121,212],[349,212],[363,249],[111,249]],'6c968c');
  for(let x=124;x<352;x+=16){rect(p,x,214,5,2,'d2cd9a');rect(p,x-5,246,5,2,'d2cd9a');}poly(p,[[223,218],[240,226],[255,218],[247,235],[240,241],[230,234]],'b8c5a1');
  return p;
 }
 for(let y=160;y<H;y++)for(let x=0;x<W;x++){
  const n=hash(Math.floor(x/2),Math.floor(y/2),stage.length)%100;
  pixel(p,x,y,n<7?(forest?'719c75':'9dc485'):n<12?(forest?'557f65':'6fa171'):(forest?'70996e':'86b57b'));
 }
 for(let y=160;y<H;y++){
  const t=(y-160)/110,center=stage==='garden'?234+Math.sin(t*3)*17:stage==='forest'?226+Math.sin(t*4)*23:241+Math.sin(t*3.2)*11;
  const width=stage==='forest'?27+t*65:36+t*83;
  for(let x=Math.floor(center-width/2);x<center+width/2;x++){
   const edge=Math.min(x-(center-width/2),center+width/2-x),n=hash(x,y,7)%100;
   pixel(p,x,y,edge<2?'b1b584':n<10?'c3ab7e':n<14?'e2c99a':forest?'c8b187':'dbc394');
  }
 }
 for(let y=165;y<H;y+=16)for(let x=0;x<W;x+=16){if(x>115&&x<368)continue;const n=hash(x,y,3);if(n%3===0)tuft(p,x+n%10,y+n%8,forest?'456c55':'54865e',3+n%3);if(n%7===0)blossom(p,x+n%13,y+n%9,forest?'c8b4d2':n%2?'edb6ab':'f5d796');}
 for(let i=0;i<25;i++){const x=30+hash(i,3)%420,y=175+hash(i,80)%89;if(x>128&&x<367)continue;if(i%4===0)stone(p,x,y,7+hash(i,6)%9,4);else rect(p,x,y,3,1,forest?'a5b28c':'c6cc96');}
 if(stage==='garden'){
  for(const [x,y,w] of [[14,174,92],[369,171,96],[17,226,85],[389,231,76]]){
   poly(p,[[x,y],[x+w,y],[x+w+6,y+25],[x-3,y+25]],'9b795b');
   for(let j=0;j<3;j++)line(p,x+5,y+5+j*7,x+w-4,y+5+j*7,'ba986a',2);
   for(let i=0;i<11;i++){const xx=x+6+(i*17)%(w-10),yy=y+4+(i*11)%20;tuft(p,xx,yy,'45765b',5);blossom(p,xx,yy-3,['e9adab','e9cd85','bda8cd'][i%3]);}
   rect(p,x-2,y+26,w+10,2,'c7ab79');
  }
 }
 if(forest){
  for(const [x,y] of [[61,201],[406,189],[19,252],[443,239]]){stone(p,x,y,27,13);bush(p,x+5,y-9,13,6,x);}
  for(const [x,y] of [[92,213],[397,251],[27,184]]){rect(p,x,y-7,2,7,'e7cf9f');ellipse(p,x+1,y-8,5,3,'c58a79');rect(p,x-2,y-9,6,1,'e0b69a');pixel(p,x,y-10,'f6dfaf');}
 }
 return p;
}

function villageRear(){
 const p=image();sky(p);cottage(p,37,163,112,'c99c63',3);cottage(p,314,164,129,'bd9271',8);
 tree(p,16,170,126,3);tree(p,470,169,132,8);
 // Bell tower and its open, hanging brass bell.
 rect(p,231,86,27,76,'c3ba8c');rect(p,235,90,19,69,'e4d3a3');rect(p,238,98,13,22,'5e8575');
 poly(p,[[224,88],[244,60],[265,88]],'6e8f75');poly(p,[[228,85],[244,66],[261,85]],'94ac7e');rect(p,227,88,35,3,'ac9970');
 rect(p,243,97,2,6,'d0ad6f');ellipse(p,244,108,5,6,'e1b873');rect(p,237,112,15,3,'f1cf89');rect(p,243,116,2,3,'785f46');
 for(let x=167;x<311;x+=15){rect(p,x,143,3,18,'a6b28a');poly(p,[[x,143],[x+1,138],[x+3,143]],'d1d5a4');}rect(p,165,147,147,3,'ccd09c');
 line(p,143,91,317,91,'7d8c69');for(let x=154;x<310;x+=20)poly(p,[[x,92],[x+11,92],[x+5,105]],x%40?'dcb79f':'a8c4ae');
 return p;
}
function gardenRear(){
 const p=image();sky(p);tree(p,17,167,136,9);tree(p,457,165,109,12);
 cottage(p,349,159,92,'96ac83',16);
 for(let x=30;x<441;x+=26)bush(p,x,153,20,13,x);
 // A hand-built trellis and a leafy arch, each with visible gaps between slats.
 for(let x=50;x<=122;x+=16)rect(p,x,87,3,66,'9d9d75');for(let y=91;y<149;y+=15)rect(p,48,y,80,3,'c3bd8a');
 for(let i=0;i<11;i++)line(p,53+i*6,145,58+i*6,99,'699371',2);
 for(let i=0;i<18;i++)blossom(p,51+(i*17)%75,105+(i*23)%43,i%2?'dca9b4':'ebd093');
 line(p,195,158,195,111,'a8a377',5);line(p,286,158,286,111,'a8a377',5);
 for(let i=0;i<19;i++){const t=Math.PI+i/18*Math.PI,x=240+Math.cos(t)*46,y=112+Math.sin(t)*31;bush(p,x,y,10,7,i);if(i%3===0)blossom(p,x,y-2,'e9b8ae');}
 for(let i=0;i<5;i++){rect(p,195,126+i*6,4,2,'d7c791');rect(p,285,126+i*6,4,2,'d7c791');}
 return p;
}
function workshopRear(){
 const p=image();rect(p,0,0,W,170,'4d625b');
 for(let y=0;y<165;y+=16)for(let x=0;x<W;x+=32){const offset=(y/16%2)*16;rect(p,x-offset,y,31,15,hash(x,y)%3?'65776b':'6d7c6c');rect(p,x-offset+2,y+1,27,1,'7e8a76');if(hash(x,y)%3===0)rect(p,x-offset+9,y+9,9,1,'5b7164');}
 rect(p,0,18,W,9,'725f4b');rect(p,0,20,W,3,'b18a5e');
 for(const x of [13,145,328,464]){rect(p,x,0,10,164,'645343');rect(p,x+2,0,3,161,'a28258');rect(p,x+7,0,2,164,'4d5042');for(let y=34;y<154;y+=36)pixel(p,x+4,y,'d3b07b');}
 // Deep window embrasure with a view back into the village palette.
 rect(p,34,43,97,80,'485c53');rect(p,38,46,88,72,'c4b27f');rect(p,42,50,80,63,'a1cec8');
 ellipse(p,81,91,41,17,'93b695');ellipse(p,65,100,28,12,'77a683');rect(p,41,100,82,14,'7da483');
 rect(p,80,49,4,66,'e0c694');rect(p,41,80,83,4,'e0c694');rect(p,35,117,96,5,'cba571');rect(p,39,122,89,5,'8e7856');
 // Open shelves with separate jars, crystal facets and brass tools.
 for(const y of [70,116]){rect(p,170,y,135,5,'b1885d');rect(p,172,y+5,131,3,'655842');for(const x of [177,289])poly(p,[[x,y+5],[x+7,y+5],[x,y+14]],'75654c');}
 for(let i=0;i<6;i++){
  const x=177+i*21,y=i%2?112:66;
  if(i%2){rect(p,x,y-15,13,15,'7f9c91');rect(p,x+2,y-13,9,10,i%3?'bba5c9':'d3b586');rect(p,x+1,y-18,11,3,'c7a477');pixel(p,x+3,y-11,'e8e2bc');}
  else {poly(p,[[x+2,y],[x,y-14],[x+7,y-24],[x+14,y-10],[x+11,y]],i%3?'a7bdd0':'b9a3cf');poly(p,[[x+7,y-23],[x+7,y-3],[x+12,y-10]],'e2d9d9');}
 }
 for(let x=180;x<289;x+=27){rect(p,x,128,3,19,'a7a783');rect(p,x-4,146,12,5,'617a70');rect(p,x-2,147,8,2,'a6b1a0');}
 // Rounded ashlar forge, actual flame is a separate animated ambient sprite.
 rect(p,370,74,77,86,'7d8174');poly(p,[[375,77],[382,64],[434,64],[443,78]],'b3aa8b');
 for(let y=80;y<160;y+=13)for(let x=371+(y%2)*7;x<446;x+=22){rect(p,x,y,21,12,hash(x,y)%2?'8d9582':'9f9f86');rect(p,x+1,y,19,2,'b8b49a');}
 ellipse(p,408,123,24,30,'49594e');rect(p,384,122,49,37,'49594e');ellipse(p,408,130,19,23,'684e45');rect(p,389,130,39,25,'725342');
 rect(p,381,156,56,5,'c0a880');rect(p,386,160,47,2,'766b52');
 rect(p,398,31,19,35,'6e766b');rect(p,393,28,29,5,'9da18a');rect(p,400,33,4,29,'96967c');
 return p;
}
function forestRear(){
 const p=image();sky(p,true);
 for(const [x,base,h,seed] of [[-4,171,199,33],[65,166,167,4],[117,164,132,12],[306,166,151,6],[375,169,191,19],[463,169,209,28]])tree(p,x,base,h,seed);
 for(let i=0;i<9;i++){const x=i*58-8;if(x>165&&x<282)continue;bush(p,x,162,35,19,i+3);}
 // Pixel sunshafts are narrow and low contrast; no full-screen glow layer.
 for(let y=21;y<163;y++){const x=202+Math.floor((y-20)*.26);rect(p,x,y,7,1,'d2dfb1');if(y%4<2)rect(p,x+22,y,3,1,'c4d5ac');}
 // A distant, moss-softened memory shrine, behind the traversal plane.
 stone(p,266,162,37,17);poly(p,[[251,146],[250,126],[257,118],[272,120],[279,147]],'8da394');poly(p,[[254,144],[254,127],[259,123],[268,124],[274,145]],'a6b5a0');
 line(p,260,128,265,134,'d8d3a4',2);line(p,265,134,260,140,'d8d3a4',2);line(p,260,140,269,140,'d8d3a4');
 return p;
}

function front(stage){
 const p=image();
 if(stage==='workshop'){
  // Near-camera shelf corners leave the entire conversation and battle lane clear.
  poly(p,[[0,251],[35,251],[48,270],[0,270]],'654f40');rect(p,0,249,37,5,'a17b52');
  poly(p,[[451,250],[480,250],[480,270],[439,270]],'654f40');rect(p,452,247,28,5,'a17b52');
  return p;
 }
 for(const [x,y] of [[-3,265],[24,278],[469,268],[493,251]])bush(p,x,y,27,18,stage.length+x);
 for(const [x,y] of [[8,249],[40,263],[449,254],[477,238]]){tuft(p,x,y,'366f56',9);if(stage!=='forest')blossom(p,x+3,y-7,'e7b09f');}
 if(stage==='forest'){for(const [x,y] of [[-4,12],[17,-2],[473,8]])bush(p,x,y,29,17,x);}
 return p;
}

// Detached depth-sortable objects. Every frame is 64x96, with feet at source y95.
function prop(frame){
 const p=image(64,96);const P=palette;
 if(frame===0){
  ellipse(p,32,91,28,4,'607b68');
  rect(p,10,42,5,45,P.woodDark);rect(p,49,42,5,45,P.woodDark);rect(p,12,43,2,42,P.woodLight);rect(p,50,43,2,42,P.woodLight);
  poly(p,[[0,45],[14,24],[48,24],[63,45]],P.woodDark);poly(p,[[3,42],[16,27],[46,27],[60,42]],'b38e60');
  for(let y=30;y<43;y+=5)line(p,14-(y-30),y,49+(y-30),y,'d4b17b');
  rect(p,27,44,10,4,P.woodLight);line(p,32,47,32,67,'d4c59a');rect(p,29,65,7,7,'a58960');
  ellipse(p,32,76,24,9,'a8b39a');rect(p,8,77,49,11,'8e9c88');ellipse(p,32,87,24,7,'8e9c88');
  ellipse(p,32,76,19,6,'456f6a');ellipse(p,32,77,15,3,'79ada0');rect(p,20,76,11,1,'c3d6b0');
  for(let y=82;y<93;y+=5){line(p,10,y,54,y,'697e6e');for(let x=15+(y%2)*8;x<54;x+=13)line(p,x,y-4,x,y,'697e6e');}
  rect(p,8,77,48,2,'c1c4a3');stone(p,12,94,14,5);stone(p,53,94,14,5);
 }else if(frame===1){
  ellipse(p,32,92,29,3,'607c65');rect(p,9,65,6,29,P.woodDark);rect(p,49,65,6,29,P.woodDark);
  rect(p,4,50,56,5,P.woodLight);rect(p,4,57,56,5,'b99061');rect(p,8,49,3,19,P.woodDark);rect(p,53,49,3,19,P.woodDark);
  poly(p,[[5,70],[58,70],[63,79],[0,79]],P.woodLight);rect(p,0,79,64,4,P.woodDark);rect(p,4,72,54,1,'e1ba7c');line(p,7,76,60,76,'9f744e');
  rect(p,9,88,46,4,'9f7951');rect(p,12,64,2,30,'ba9463');rect(p,50,64,2,30,'ba9463');
 }else if(frame===2){
  ellipse(p,32,93,30,2,'627867');rect(p,7,57,6,38,P.woodDark);rect(p,52,57,6,38,P.woodDark);
  rect(p,7,81,51,5,'a47e53');rect(p,8,91,50,4,'a47e53');rect(p,8,63,50,4,'7d6447');
  poly(p,[[4,48],[57,48],[64,60],[0,60]],'d4ab70');rect(p,0,60,64,5,'866244');line(p,6,53,59,53,'af8356');line(p,4,58,62,58,'edc78c');
  rect(p,9,75,13,7,'9cb2a1');rect(p,11,70,9,7,'b6c8ad');rect(p,31,76,15,5,'c7ad7a');rect(p,36,71,11,5,'a58db3');
  poly(p,[[14,47],[10,35],[17,25],[23,38],[21,48]],'8cbcb4');poly(p,[[17,27],[17,45],[22,38]],'d0e1c0');
  rect(p,30,40,18,8,'ddc78b');rect(p,32,38,13,2,'f0dfac');line(p,36,40,36,46,'b19b71');
  rect(p,51,36,5,13,'9b7f60');rect(p,49,34,9,4,'c4a67a');
 }else if(frame===3){
  ellipse(p,32,92,27,3,'617e62');bush(p,32,78,27,16,13);bush(p,19,84,15,10,14);for(let i=0;i<7;i++)blossom(p,13+i*6,76+(i%3)*5,i%2?'dfb0ad':'e4ce8d');
 }else if(frame===4){
  ellipse(p,32,93,13,2,'637e68');rect(p,29,35,5,58,P.woodDark);rect(p,30,37,2,55,'bd9865');rect(p,19,92,25,3,'9a9773');
  line(p,31,40,17,28,P.woodDark,3);rect(p,13,25,18,4,'b39a6c');
  poly(p,[[12,28],[8,34],[12,51],[25,51],[29,34],[25,28]],'586b58');rect(p,13,32,12,16,'edcb83');rect(p,16,34,6,12,'f5e4ab');
  rect(p,18,29,2,22,'947e59');rect(p,12,48,14,3,'a68b60');line(p,16,24,18,20,'7f7b5b');line(p,18,20,22,24,'7f7b5b');
 }else if(frame===5){
  ellipse(p,32,93,22,2,'617d63');poly(p,[[10,67],[53,67],[47,93],[17,93]],'aa7960');poly(p,[[13,70],[49,70],[45,89],[20,89]],'ca9b76');
  rect(p,9,65,45,6,'e0b98a');line(p,24,75,26,87,'e3b98a');line(p,38,75,38,88,'a6775d');
  for(let i=0;i<8;i++){const x=16+i*4;line(p,x,65,x+(i%2?4:-4),42+(i%3)*4,'5b8661',2);ellipse(p,x+(i%2?6:-6),51,6,3,'88b77d');}
  for(const [x,y] of [[23,39],[36,40],[45,45]])blossom(p,x,y,'cbb1ce');
 }else if(frame===6){
  ellipse(p,32,93,18,2,'617c65');rect(p,29,11,5,83,'947b56');rect(p,30,11,2,82,'d3b080');rect(p,10,16,45,4,'d0ae79');
  poly(p,[[14,20],[52,20],[52,65],[33,75],[14,65]],'6b9f95');poly(p,[[17,20],[49,20],[49,62],[33,71],[17,62]],'9cc4a8');
  poly(p,[[33,31],[41,41],[33,54],[25,42]],'e4d49b');line(p,33,35,33,54,'baac82');rect(p,18,58,30,2,'6a9b85');
  ellipse(p,31,10,4,4,'ebcf91');stone(p,31,94,24,6);
 }else{
  ellipse(p,32,93,23,2,'5f7d66');poly(p,[[11,92],[12,58],[18,44],[36,36],[49,46],[53,90]],'718c7e');poly(p,[[15,89],[16,59],[22,48],[36,41],[45,49],[49,88]],'a4b39b');
  poly(p,[[40,43],[45,49],[49,87],[40,84]],'8b9f8b');line(p,27,53,37,63,'e2d7a4',2);line(p,37,63,26,74,'e2d7a4',2);line(p,26,74,38,74,'e2d7a4',2);line(p,32,51,32,79,'e2d7a4');
  bush(p,18,87,12,7,9);stone(p,49,94,17,6);
 }
 return p;
}
function ambient(kind,frame){
 const p=image(32,32),sway=[-1,0,1,0][frame];
 if(kind===0){ellipse(p,16+sway,17,14,5,'e6eacc',210);ellipse(p,11+sway,14,7,6,'f1f1d8',230);ellipse(p,21+sway,14,7,5,'f1f1d8',230);rect(p,7+sway,19,20,1,'c6d9c2',220);}
 else if(kind===1){
  line(p,15,28,15+sway,12,'5a8863');line(p,15,22,8+sway,18,'5a8863');line(p,15,18,23+sway,12,'5a8863');
  ellipse(p,9+sway,17,6,3,'8fbd84');ellipse(p,22+sway,11,6,3,'accb8b');ellipse(p,15+sway,9,3,6,'85b87d');line(p,6+sway,17,11+sway,17,'c2d59b');
 }else if(kind===2){
  ellipse(p,16,27,13,3,'a66e4c',210);poly(p,[[5,26],[7,18],[10+sway,12],[13,18],[16+sway,4+frame],[20,13],[24-sway,9],[25,20],[28,25]],'de9559');
  poly(p,[[10,26],[11,19],[15+sway,10],[19,19],[22-sway,15],[24,26]],'f5c16e');poly(p,[[14,26],[14,20],[17,16],[20,26]],'f8e3a2');
  rect(p,6,28,20,2,'705947');rect(p,9,26,5,2,'a58154');
 }else{
  const r=[7,8,7,6][frame];ellipse(p,16,17,r,r,'c8d7b0',28);ellipse(p,16,17,4,4,'eadba4',50);rect(p,15,13,2,8,'f5e6b2',170);rect(p,12,16,8,2,'f5e6b2',170);rect(p,15,16,2,2,'fff2ce',240);
  pixel(p,7+frame*4,8+frame,'e7d5ac',120);pixel(p,24-frame*3,25-frame,'e7d5ac',120);
 }
 return p;
}

for(const [name,rear] of [['village',villageRear],['garden',gardenRear],['workshop',workshopRear],['forest',forestRear]]){
 save(name+'-rear',rear());save(name+'-ground',terrain(name));save(name+'-front',front(name));
}
const props=image(64*8,96);for(let frame=0;frame<8;frame++)copy(props,prop(frame),frame*64,0);save('props',props);
const atmosphere=image(32*16,32);for(let kind=0;kind<4;kind++)for(let frame=0;frame<4;frame++)copy(atmosphere,ambient(kind,frame),(kind*4+frame)*32,0);save('ambient',atmosphere);
console.log('Generated 12 original 480x270 stage layers, 8 depth-sortable props, and 16 ambient frames in assets/art-v2.');
