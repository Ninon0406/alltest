import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

// GODSEED original source-pixel drawings. No photographs, external packs or legacy assets.
// Integer raster primitives and a coordinate hash keep exports byte-for-byte reproducible.
const output=fileURLToPath(new URL('../public/assets/art-v5/',import.meta.url));
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

// Original map drawings guided by owner concepts 01/03. No reference pixels are
// sampled or composited. All anchors/colliders are authored on this 480x270 map.
function house(p,x,base,w,blue=false){
 const wall=base-65;
 poly(p,[[x+w,wall],[x+w+22,wall-15],[x+w+22,base-13],[x+w,base]],'ac967c');
 for(let y=wall+8;y<base-6;y+=10)line(p,x+w+3,y,x+w+20,y-12,'c2ac8b');
 cottage(p,x,base,w,blue?'628baf':'c87d67',blue?6:11);
 // Roof tile highlights follow roof pitch; blue/red share the same material.
 for(let y=wall-23;y<wall;y+=6){const h=(y-(wall-36))/(36)*(w/2+4);for(let xx=x+w/2-h+3;xx<x+w/2+h-2;xx+=9){line(p,xx,y,xx+6,y,blue?'9dbdc7':'ebb18a');pixel(p,xx+6,y+2,blue?'416583':'945d56');}}
 line(p,x+6,wall+8,x+w-9,base-13,'9a7657',3);line(p,x+w-9,wall+8,x+6,base-13,'9a7657',3);
 const dx=x+w/2-13;
 poly(p,[[dx-9,base-40],[dx+29,base-40],[dx+38,base-27],[dx-17,base-27]],'f0d8aa');
 for(let i=0;i<5;i++)poly(p,[[dx-9+i*8,base-40],[dx-4+i*8,base-40],[dx+5+i*8,base-27],[dx-2+i*8,base-27]],i%2?'9ab7a3':'c87e70');
 for(let i=0;i<8;i++)blossom(p,x+15+i*8,base-10+(i%2)*2,i%3?'bba4d3':'f3c4be');
 rect(p,x+w-24,base-31,4,18,'836c52');rect(p,x+w-28,base-29,12,12,'e6c580');rect(p,x+w-26,base-27,8,8,'ffedbb');
}
function terrainV5(treeStudy=false){
 const p=image();
 for(let y=138;y<270;y++)for(let x=0;x<480;x++)pixel(p,x,y,['82ac76','8bb67e','93bd81','9dc58a'][hash(x>>1,y>>1,3)%4]);
 // The walkable plaza has room around the fountain, not a narrow painted strip.
 poly(p,[[153,153],[321,151],[382,202],[421,270],[48,270],[100,214]],'baa98d');
 for(let y=157;y<270;y+=7)for(let x=47+(y%3)*3;x<421;x+=13){
  const center=236+(y-210)*.03,half=89+(y-157)*.95;
  if(Math.abs(x-center)>half)continue;
  const n=hash(x,y,6);poly(p,[[x,y],[x+10,y-1],[x+12,y+3],[x+9,y+5],[x-1,y+4]],['dfcdb0','cabb9e','d4c5aa','ead7b7'][n%4]);
  line(p,x+1,y,x+8,y-1,'f0dfbf');if(n%7===0)pixel(p,x+6,y+3,'a7a887');
 }
 // Quiet compass rosette stays behind the player and communicates plaza south.
 ellipse(p,229,250,32,10,'a89b7f');ellipse(p,229,249,29,9,'d9c6a1');
 for(let i=0;i<8;i++){const a=i*Math.PI/4;line(p,229,249,229+Math.cos(a)*25,249+Math.sin(a)*7,i%2?'bdaf8d':'d5af73');}
 poly(p,[[229,240],[233,247],[249,249],[232,252],[229,259],[226,252],[210,249],[226,247]],'c4a273');
 for(let i=0;i<175;i++){const x=hash(i,33)%480,y=144+hash(i,77)%126;if(x>110&&x<387)continue;tuft(p,x,y,'5c8b60',2+i%3);if(i%2===0)blossom(p,x,y-3,['efbdbe','c3add6','f3dfaa'][i%3]);}
 // Cast shadows match the upper-left warm sun and remain subdued on routes.
 poly(p,[[0,170],[91,172],[145,193],[122,205],[0,185]],'71956d',120);
 poly(p,[[337,167],[434,168],[478,194],[391,203]],'6d946f',125);
 if(treeStudy){for(let i=0;i<26;i++){const x=99+hash(i,30)%280,y=174+hash(i,81)%69;rect(p,x,y,3,1,i%2?'e8caa0':'b8c98a');}}
 // Ground extends behind buildings in plan view; preserve their front walls.
 for(let y=0;y<180;y++)for(let x=0;x<480;x++)if(y<164||x<154||x>333)p.data[(y*480+x)*4+3]=0;
 return p;
}
function rearV5(treeStudy=false){
 const p=image();sky(p);ellipse(p,273,93,83,24,'b1c9b2');
 // A far aqueduct and elevated village silhouette in atmospheric colors.
 rect(p,317,82,148,8,'bad1bd');for(let x=322;x<466;x+=21){rect(p,x,88,5,48,'b5cbb4');ellipse(p,x+12,101,8,12,'b5cbb4');ellipse(p,x+12,106,5,12,'a0c4b5');}
 house(p,15,179,116,false);house(p,342,174,103,true);
 // Receding steps and vine arch lead out of the plaza. Solid until an authored route exists.
 for(let i=0;i<7;i++){rect(p,184-i*3,114+i*7,90+i*6,6,i%2?'b2b3a0':'d0cbb0');rect(p,184-i*3,114+i*7,90+i*6,1,'ece0bf');}
 for(const x of [184,270]){rect(p,x,74,12,48,'a3ad96');rect(p,x+2,74,7,46,'d1c9a5');}
 for(let i=0;i<21;i++){const a=Math.PI+i*Math.PI/20,x=233+Math.cos(a)*46,y=79+Math.sin(a)*36;ellipse(p,x,y,8,7,'8e9f89');ellipse(p,x-1,y-2,6,4,'d5cba8');if(i%2===0)bush(p,x,y-6,8,5,i);}
 for(const x of [176,284]){rect(p,x,112,3,34,'947c59');rect(p,x-4,109,12,3,'c2aa78');poly(p,[[x-4,114],[x+7,114],[x+7,137],[x+1,142],[x-4,137]],'567f9d');line(p,x+1,119,x+1,135,'ead497');line(p,x-2,126,x+4,126,'ead497');}
 tree(p,3,177,157,13);tree(p,477,174,133,15);
 if(treeStudy){
  // Background is intentionally quieter under the separately depth-sorted tree.
  for(let x=140;x<340;x+=23)bush(p,x,162,17,9,x);
 }
 return p;
}
function foregroundV5(){
 const p=image();for(const [x,y] of [[-7,271],[20,283],[465,278],[491,249]]){bush(p,x,y,31,20,x);for(let i=0;i<12;i++)blossom(p,x-20+i*4,y-16+(i%3)*3,i%2?'c6abd9':'edc4bf');}
 return p;
}
function fountain(frame){
 const p=image(96,112),f=frame%6;
 ellipse(p,48,107,44,4,'5b8276',115);
 ellipse(p,48,98,43,12,'7f938c');rect(p,6,88,85,12,'9aaba0');ellipse(p,48,88,43,13,'d5d4b7');
 ellipse(p,48,87,36,9,'436e78');ellipse(p,48,88,32,7,'6dc8c0');
 for(let i=0;i<25;i++){const x=19+(i*17+f*3)%60,y=85+(i*7+f)%7;rect(p,x,y,2+i%3,1,i%3?'b5e8d1':'ebf4d3');}
 for(let x=9;x<91;x+=13){line(p,x,93,x,101,'738c83');rect(p,x+2,94,7,1,'c7c9ad');}
 ellipse(p,48,102,42,7,'bdc4aa');ellipse(p,48,99,43,4,'d8d7b8');
 // Tall memorial seed shrine, articulated stem and two carved leaf wings.
 rect(p,44,40,8,42,'78978e');rect(p,46,40,3,42,'c6d3b6');
 ellipse(p,48,67,25,7,'d9d7b8');ellipse(p,48,65,21,5,'66bdb4');
 poly(p,[[47,40],[34,30],[33,20],[41,23],[49,32],[58,18],[64,17],[62,30],[52,42]],'7e9e92');
 poly(p,[[47,36],[36,26],[35,22],[43,27],[49,36],[59,22],[62,21],[59,30],[51,39]],'d3d7ba');
 ellipse(p,48,20,7,10,'d5d7b9');poly(p,[[48,8],[52,17],[48,25],[44,17]],'a8dfc2');pixel(p,47,13,'fcf1c7');
 // Separate animated water strands have downward travel, splashes and reflection.
 for(const x of [27,36,58,67]){line(p,x,67,x+(x<48?-2:2),87,'8edbd0',2);for(let y=68+f%3;y<86;y+=5)rect(p,x,y,2,2,'e5f1d2');rect(p,x-2,88,5,1,'ecf5db');}
 ellipse(p,48,46,14,4,'d8d7b9');ellipse(p,48,44,12,3,'9ed6bc');
 for(let y=47+f%3;y<64;y+=4){rect(p,36,y,2,3,'aee7ce');rect(p,59,y+1,2,3,'d2efcf');}
 return p;
}
function ancientTree(){
 const p=image(336,208);
 // Roots, trunk and branches are one coherent, separately Y-sorted object.
 ellipse(p,176,198,92,9,'4c755c',95);
 poly(p,[[127,199],[149,174],[146,114],[129,70],[148,59],[169,103],[184,73],[210,56],[219,68],[190,118],[192,165],[229,189],[244,203],[201,196],[173,183],[154,201],[132,204]],'554f3f');
 poly(p,[[137,198],[158,171],[156,112],[140,71],[147,68],[171,113],[183,92],[203,67],[209,68],[180,118],[181,169],[214,191],[229,199],[193,190],[173,176],[151,195]],'927c52');
 poly(p,[[154,184],[166,154],[164,108],[169,119],[175,160],[193,184],[179,174],[169,163],[165,184]],'b4a064');
 for(let i=0;i<22;i++){const y=103+i*4;line(p,153+(i%3)*3,y,158+(i%4)*3,y+9,i%3?'6c6447':'c0ac6e');}
 line(p,158,120,79,95,'554f3f',12);line(p,156,117,80,94,'9a8557',7);line(p,91,100,50,128,'554f3f',7);line(p,90,98,51,128,'a18e5d',3);
 line(p,191,122,274,91,'554f3f',10);line(p,192,119,273,90,'998457',5);
 for(const [x,y,r] of [[48,63,45],[95,41,57],[151,29,63],[220,34,61],[285,59,47],[178,67,62],[248,87,43]]){bush(p,x,y,r,r*.56,x);for(let i=0;i<20;i++){const xx=x-r+hash(i,x)%(r*2),yy=y-r/2+hash(x,i)%r;if(i%3===0)blossom(p,xx,yy,'e9bdc8');else rect(p,xx,yy,3,1,'c2d58e');}}
 for(let i=0;i<38;i++){const x=127+hash(i,42)%105,y=173+hash(i,33)%30;blossom(p,x,y,i%2?'cab1d4':'eac7bc');}
 // Hanging lanterns and seed lights relate to the same branch, never float.
 for(const [x,y] of [[55,126],[250,126]]){line(p,x,y-28,x,y,'917c56');rect(p,x-5,y,11,14,'635f49');rect(p,x-3,y+2,7,9,'f1d894');rect(p,x-1,y+3,3,7,'ffedbe');rect(p,x-6,y-1,13,2,'c8ae79');}
 return p;
}
for(const name of ['village','tree']){save(name+'-rear',rearV5(name==='tree'));save(name+'-ground',terrainV5(name==='tree'));save(name+'-front',foregroundV5());}
const water=image(96*6,112);for(let f=0;f<6;f++)copy(water,fountain(f),f*96,0);save('fountain',water);
const treeWide=image(432,208);copy(treeWide,ancientTree(),48,0);
// A gnarled overhanging bough shelters the bench; it is not a floor obstacle.
line(treeWide,206,117,124,164,'554f3f',10);line(treeWide,207,115,124,161,'9a8557',6);
line(treeWide,124,162,26,124,'554f3f',8);line(treeWide,124,159,26,121,'aa9562',4);
for(const [x,y,r] of [[27,101,26],[62,113,24],[99,135,19]]){bush(treeWide,x,y,r,r*.46,x);for(let i=0;i<7;i++)blossom(treeWide,x-r/2+i*4,y-4+(i%2)*3,'e6bac9');}
for(let y=80;y<204;y++)for(let x=0;x<432;x++){const i=(y*432+x)*4,n=hash(x>>1,y,9);if(treeWide.data[i+3]&&treeWide.data[i]===154&&treeWide.data[i+1]===133&&n%11===0)rect(treeWide,x,y,2,1,n%2?'ba9f65':'7e704d');}
ellipse(treeWide,124,158,5,3,'665b41');ellipse(treeWide,123,157,3,2,'bd9e64');pixel(treeWide,123,158,'746245');
save('ancient-tree',treeWide);
const leaves=image(16*8,16);for(let f=0;f<8;f++){const cell=image(16,16);const sway=[-2,-1,0,1,2,1,0,-1][f];poly(cell,[[5,6],[9+sway,3],[12,7],[8-sway,10]],f%2?'d7d990':'a8c77b');line(cell,5,9,11,5,'7c9e65');copy(leaves,cell,f*16,0);}save('leaves',leaves);
console.log('art-v5: two original layered map studies, animated fountain, depth-sorted tree and leaf atlas; references excluded');

