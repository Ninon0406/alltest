import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {gardenMap,gardenScenery} from '../src/scenes/garden-map.ts';

// Original source-pixel study, directed by owner reference05. No reference pixels
// are read, sampled, resized or copied. The road network is the actual game map.
const output=fileURLToPath(new URL('../public/assets/art-v9/',import.meta.url));
mkdirSync(output,{recursive:true});
const W=480,H=270,colors=new Map();
const image=(w=W,h=H)=>new PNG({width:w,height:h});
function rgba(c){if(!colors.has(c))colors.set(c,c.match(/../g).map(n=>parseInt(n,16)));return colors.get(c);}
function px(p,x,y,c,a=255){x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=p.width||y>=p.height)return;const i=(y*p.width+x)*4,v=rgba(c);p.data[i]=v[0];p.data[i+1]=v[1];p.data[i+2]=v[2];p.data[i+3]=a;}
function box(p,x,y,w,h,c,a=255){for(let yy=Math.round(y);yy<Math.round(y+h);yy++)for(let xx=Math.round(x);xx<Math.round(x+w);xx++)px(p,xx,yy,c,a);}
function oval(p,x,y,rx,ry,c,a=255){for(let yy=Math.ceil(y-ry);yy<=y+ry;yy++)for(let xx=Math.ceil(x-rx);xx<=x+rx;xx++)if(((xx-x)/rx)**2+((yy-y)/ry)**2<=1)px(p,xx,yy,c,a);}
function line(p,x,y,xx,yy,c,w=1){x=Math.round(x);y=Math.round(y);xx=Math.round(xx);yy=Math.round(yy);const dx=Math.abs(xx-x),dy=-Math.abs(yy-y),sx=x<xx?1:-1,sy=y<yy?1:-1;let e=dx+dy;for(;;){box(p,x,y,w,w,c);if(x===xx&&y===yy)break;const d=e*2;if(d>=dy){e+=dy;x+=sx;}if(d<=dx){e+=dx;y+=sy;}}}
function poly(p,points,c,a=255){for(let y=Math.ceil(Math.min(...points.map(v=>v[1])));y<=Math.max(...points.map(v=>v[1]));y++){const xs=[];for(let i=0;i<points.length;i++){const [x1,y1]=points[i],[x2,y2]=points[(i+1)%points.length];if((y1<=y&&y2>y)||(y2<=y&&y1>y))xs.push(x1+(y-y1)*(x2-x1)/(y2-y1));}xs.sort((a,b)=>a-b);for(let i=0;i<xs.length;i+=2)box(p,Math.ceil(xs[i]),y,Math.floor(xs[i+1])-Math.ceil(xs[i])+1,1,c,a);}}
function hash(x,y,s=0){let n=(Math.imul(x+43,374761393)+Math.imul(y+79,668265263)+Math.imul(s+1,1274126177))|0;n=Math.imul(n^(n>>>13),1274126177);return(n^(n>>>16))>>>0;}
function copy(p,q,dx,dy){for(let y=0;y<q.height;y++)for(let x=0;x<q.width;x++){const i=(y*q.width+x)*4;if(q.data[i+3])q.data.copy(p.data,((y+dy)*p.width+x+dx)*4,i,i+4);}}
function save(name,p){writeFileSync(output+name+'.png',PNG.sync.write(p,{colorType:6}));}
function leaf(p,x,y,size=7,tone='709e69'){oval(p,x,y,size,size*.65,'3f7056');oval(p,x-1,y-2,size-1,size*.5,tone);line(p,x-size+2,y,x+size-2,y-2,'aac487');}
function flower(p,x,y,c='c3a1d0',scale=1){line(p,x,y+3*scale,x,y-4*scale,'527958');for(const [dx,dy] of [[-2,0],[2,0],[0,-2],[0,2]])box(p,x+dx*scale,y+dy*scale,2*scale,2*scale,c);box(p,x,y,scale+1,scale+1,'f4d995');}
function clump(p,x,y,seed,size=18){for(let i=0;i<8;i++)leaf(p,x-size/2+hash(i,seed)%size,y-5+hash(seed,i)%10,4+hash(i,4)%4,['6b9b68','80ac73','91b97e'][i%3]);for(let i=0;i<7;i++)flower(p,x-size/2+hash(i,seed+5)%size,y-9+hash(seed+9,i)%10,['b9a3cf','e7b7c5','f0d590'][i%3]);}
function masonry(p,x,y,w,h){box(p,x,y,w,h,'a49e85');for(let yy=y;yy<y+h;yy+=8)for(let xx=x-(Math.floor((yy-y)/8)%2)*7;xx<x+w;xx+=15){const left=Math.max(x,xx),right=Math.min(x+w,xx+14);if(right>left){box(p,left,yy+1,right-left,6,hash(xx,yy)%3?'c8b99a':'b8b097');box(p,left,yy+1,right-left,1,'dfcfac');px(p,left+2,yy+5,'aaa58d');}}}
function lantern(p,x,y){line(p,x,y-13,x,y-8,'8b7958',2);poly(p,[[x-6,y-8],[x,y-12],[x+6,y-8]],'53685c');box(p,x-5,y-7,10,12,'786d50');box(p,x-3,y-6,6,9,'e9bb74');box(p,x-1,y-5,2,7,'f7e0a0');box(p,x-6,y+5,12,2,'53685c');}
function bottle(p,x,y,c){box(p,x-1,y-7,3,4,'ecddb1');box(p,x-3,y-3,7,7,'446e68');box(p,x-2,y-3,5,5,c);px(p,x-1,y-2,'d3e8d3');box(p,x-2,y+3,5,1,'a5bcb0');}
function vine(p,x,y,length,seed){for(let i=0;i<length;i+=5){const xx=x+Math.round(Math.sin(i*.14+seed)*3);line(p,xx,y+i,xx,y+i+5,'6b8659');leaf(p,xx+(i%2?3:-3),y+i+2,3,'9eb879');if(i%15===0)flower(p,xx+4,y+i+5,'c6a3d0');}}
function roof(p,points,seed){poly(p,points,'504d65');const layer=image();poly(layer,points,'79658f');for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;if(!layer.data[i+3])continue;const row=Math.floor(y/7),q=(x+(row%2)*7)%15;px(p,x,y,y%7===0||q===0?'594f6b':y%7===1?'ab91b2':hash(Math.floor(x/4),row,seed)%6===0?'8e7a9d':'79658f');}}
function cottage(p){
 // West herbalist cottage: deep eaves, a lit apothecary window and a side wall.
 masonry(p,61,97,170,88);poly(p,[[231,98],[256,84],[256,166],[231,185]],'8e9682');
 for(let y=105;y<175;y+=10)line(p,233,y,252,y-11,'aeb49a');
 roof(p,[[48,104],[88,49],[212,49],[251,104]],2);roof(p,[[212,49],[256,82],[251,104],[212,72]],3);
 line(p,48,104,251,104,'4d5b51',4);line(p,51,104,247,104,'d1b180');
 box(p,107,31,17,35,'9c9d8c');masonry(p,108,32,15,32);box(p,104,28,23,5,'d5c9a8');box(p,110,27,11,2,'7a8374');
 poly(p,[[134,103],[169,59],[205,103]],'5f584e');poly(p,[[140,101],[169,66],[198,101]],'d6bd91');
 line(p,169,68,169,105,'8c7657',3);line(p,144,98,195,98,'8c7657',3);line(p,150,91,161,101,'8c7657',2);line(p,190,91,178,101,'8c7657',2);
 box(p,158,83,22,17,'6c7562');box(p,161,85,16,13,'edc787');line(p,169,85,169,97,'a48b62');
 roof(p,[[8,139],[34,101],[109,104],[131,139]],5);masonry(p,21,140,107,46);line(p,8,139,131,139,'665b4b',4);
 // Curved bay window with bottle silhouettes, shelf shadows and warm panes.
 oval(p,77,151,28,21,'73664f');box(p,49,150,56,30,'73664f');oval(p,77,150,24,17,'bbac7f');box(p,53,150,48,26,'c6ba8d');
 for(let y=150;y<174;y+=11){box(p,54,y,46,9,'718b79');box(p,55,y,44,2,'d7ca9e');for(let x=61;x<98;x+=11)bottle(p,x,y+7,['8bbfb3','b9a7cb','e2bc7e'][Math.floor(x/11)%3]);}
 line(p,77,136,77,177,'a48960',2);box(p,48,177,60,4,'a58e69');box(p,51,177,54,1,'e0c89b');
 // Arched wooden door and the seed-and-branch emblem, drawn on the source grid.
 oval(p,168,141,18,21,'626c57');box(p,150,140,37,44,'626c57');oval(p,168,140,14,17,'9f9568');box(p,154,140,29,43,'9f9568');
 for(let x=157;x<182;x+=5)line(p,x,141,x,181,'857d5b');line(p,168,151,168,171,'e1c285');for(const dx of [-8,-5,5,8])line(p,168,163,168+dx,154-Math.abs(dx)/2,'d7bf81');oval(p,168,149,3,4,'e1c285');px(p,179,166,'f2d78f');
 for(let i=0;i<3;i++){poly(p,[[143-i*7,184+i*4],[193+i*7,184+i*4],[197+i*7,187+i*4],[140-i*7,187+i*4]],'b6ac8d');line(p,144-i*7,184+i*4,192+i*7,184+i*4,'e0cdaa');}
 lantern(p,139,144);lantern(p,204,144);
 for(const [x,y,n] of [[31,111,53],[115,107,64],[227,106,55],[237,88,50]])vine(p,x,y,n,x);
 for(const [x,y] of [[28,184],[120,183],[214,182],[244,176]])clump(p,x,y,x,23);
 // An original brass star dial, not a rune copied from the concept.
 oval(p,208,120,9,9,'716b52');oval(p,208,120,7,7,'c7ac73');oval(p,208,120,5,5,'766f58');line(p,208,113,208,127,'e0c28a');line(p,201,120,215,120,'e0c28a');
}
function rear(){const p=image();
 const sky=['97c6cc','b4d6cf','d2e2d0'];for(let y=0;y<H;y++)box(p,0,y,W,1,sky[Math.min(2,Math.floor(y/55))]);
 oval(p,390,31,15,15,'f4dfa4');
 for(let x=0;x<W;x++){const y=98+Math.round(Math.sin(x*.019)*11);box(p,x,y,1,H-y,'9fc0ac');const near=124+Math.round(Math.sin(x*.037)*12);box(p,x,near,1,H-near,'78a48b');}
 // Small, low-contrast distant towers stay scenery; they grant no world facts.
 for(const [x,h] of [[377,27],[393,37],[417,28],[439,45],[455,33]]){box(p,x,113-h,8,h,'b5cfc0');poly(p,[[x-2,113-h],[x+4,103-h],[x+10,113-h]],'98b8b2');line(p,x+2,115-h,x+2,109,'d6e1ca');}
 for(let i=0;i<17;i++)leaf(p,259+i*15,143+hash(i,2)%12,16,'84ac7b');
 cottage(p);
 // Open herb-drying stall; animated bundles occupy its visible empty interior.
 box(p,279,96,7,78,'7b7155');box(p,365,96,7,78,'7b7155');box(p,277,96,97,6,'a38c62');box(p,276,94,100,2,'d0b181');
 box(p,282,151,87,6,'c6a372');box(p,282,156,87,5,'927d59');box(p,284,160,5,12,'7b7155');box(p,360,160,5,12,'7b7155');
 for(let x=294;x<362;x+=12)bottle(p,x,151,['a6c6a5','bea9c9','8fb8aa'][Math.floor(x/12)%3]);
 for(let i=0;i<7;i++)leaf(p,280+i*14,96,8,'91b67a');vine(p,369,101,36,6);
 // Far fence and lavender beds behind the NPC lane.
 for(let x=270;x<477;x+=17){box(p,x,174,3,18,'877e5b');box(p,x,173,3,2,'d2bc88');}line(p,270,180,478,180,'ac9a70',2);
 for(let i=0;i<17;i++)clump(p,282+i*12,185+hash(i,6)%5,i,14);
 // The tree frames the upper left, leaving actor silhouettes and paths clear.
 poly(p,[[0,180],[0,19],[12,0],[40,0],[25,60],[16,108],[13,177]],'596953');line(p,8,156,13,51,'8a8b60',4);
 for(let i=0;i<26;i++)leaf(p,-7+i*9,14+Math.sin(i*.5)*10,16,['608b63','7ea672','a4be7f'][i%3]);
 for(let i=0;i<12;i++)leaf(p,i*9,36+Math.sin(i*.4)*9,13,i%3?'7da371':'a0b77c');
 return p;
}
const distance=(x,y,a,b)=>{const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a.x-dx*t,y-a.y-dy*t);};
function ground(){const p=image(),roads=gardenMap.links.map(([a,b])=>[gardenMap.anchors[a],gardenMap.anchors[b]]);
 for(let y=160;y<H;y++)for(let x=0;x<W;x++){
  if(x>=12&&x<=259&&y<198)continue; // House faces/steps are above the ground, never painted over.
  const n=hash(Math.floor(x/3),Math.floor(y/2),8)%40;
  px(p,x,y,n<3?'9fbb82':n<6?'7a9f70':'8eaf78');
  const d=Math.min(...roads.map(([a,b])=>distance(x,y,a,b)));
  if(d<13){const row=Math.floor(y/6),stone=(x+(row%2)*7)%14;px(p,x,y,d>11?'b3b28a':y%6===0||stone===0?'9d9f83':y%6===1?'e1d2ae':hash(Math.floor((x+(row%2)*7)/14),row,6)%4===0?'c9c2a2':'d4c8a7');if(d>10&&hash(x,y)%7===0)px(p,x,y,'9eac7e');}
 }
 // Ground contact and a broken canopy shadow use restrained source-pixel alpha.
 poly(p,[[14,199],[89,199],[121,224],[100,230],[21,214]],'365d49',35);
 poly(p,[[220,196],[254,177],[274,194],[244,214]],'365d49',32);
 for(const [x,y] of [[11,212],[449,213],[471,260],[15,259],[382,192]])clump(p,x,y,x,24);
 // Fixed eastern flower bed is a real obstacle; its footprint is in gardenMap.
 poly(p,[[405,229],[465,229],[469,252],[405,252]],'8d987b');poly(p,[[408,228],[463,228],[465,247],[408,247]],'b9b297');poly(p,[[411,230],[460,230],[462,244],[411,244]],'7f8060');
 for(let i=0;i<15;i++){const x=414+hash(i,6)%44,y=228+hash(i,8)%14;flower(p,x,y,['c7abd1','e3b4bb','e7d18d'][i%3]);}
 return p;
}
function front(){const p=image();for(const [x,y] of [[2,268],[22,275],[460,277],[478,263]])clump(p,x,y,x+3,29);
 for(let x=0;x<480;x+=23){if(x>31&&x<445)continue;line(p,x,269,x+1,252,'6b845b',2);leaf(p,x+3,258,5,'93b97f');}
 return p;
}
function arch(){const p=image(gardenScenery.arch.width,gardenScenery.arch.height);
 for(let y=20;y<=63;y++)for(let x=15;x<=97;x++){const outer=((x-56)/41)**2+((y-62)/42)**2,inner=((x-56)/28)**2+((y-62)/29)**2;if(outer<=1&&inner>=1)px(p,x,y,(y+x)%9===0?'9f9b84':x%11===0?'dfceaa':'bfb59a');}
 for(const x of [20,80]){masonry(p,x,60,12,84);box(p,x-2,128,16,4,'d1c09b');box(p,x,140,12,4,'929b81');}
 for(let i=0;i<12;i++){const a=Math.PI+i/11*Math.PI,x=56+Math.cos(a)*36,y=62+Math.sin(a)*37;leaf(p,x,y,6,'9db77a');if(i%2)flower(p,x,y-2,'d4b4cf');}
 vine(p,21,59,62,1);vine(p,89,53,49,5);lantern(p,28,96);
 // Brass memory medallion and a crystal pendant from the same material palette.
 oval(p,56,34,8,9,'d2b97c');oval(p,56,34,6,7,'70725b');line(p,56,29,56,39,'ebd198');line(p,51,34,61,34,'ebd198');
 line(p,56,46,56,63,'c7ac78');poly(p,[[56,60],[60,68],[56,77],[52,68]],'b3a4d1');line(p,56,62,56,74,'e0d3de');
 clump(p,22,135,4,22);clump(p,84,135,6,18);return p;
}
function cauldron(f){const p=image(64,96);oval(p,32,92,23,3,'567b61',110);
 // Warm stone plinth and copper fittings, with steady bounded vapour.
 oval(p,32,87,22,7,'aeb497');box(p,11,87,43,7,'909d84');oval(p,32,86,21,6,'cecaab');
 oval(p,32,74,20,14,'586f62');oval(p,32,71,22,7,'a8ac7e');oval(p,32,70,18,5,'6fbdad');
 for(let i=0;i<4;i++){const x=20+i*8,y=69+(i+f)%3;box(p,x,y,3,1,'b4dbc0');px(p,x+1,y-1,'d7e6be');}
 line(p,18,76,20,84,'a5af7e',2);line(p,44,76,42,84,'a5af7e',2);oval(p,31,79,4,4,'cab980');box(p,30,77,2,5,'edf0bd');
 for(let i=0;i<3;i++){const y=23+i*13+f*2%10,x=32+Math.sin((i+f*.4)*1.7)*7;oval(p,x,y,6+i,3,'b8daca',110);line(p,x-3,y,x+3,y-2,'e1e7cb');}
 for(let i=0;i<3;i++){const x=21+i*10,y=55-(f*3+i*9)%35;px(p,x,y,'e3e4bd',180);px(p,x+1,y,'b3d4bd',180);}
 return p;
}
function herbs(f){const p=image(96,48);line(p,2,3,94,3,'c9b187',2);
 for(let i=0;i<6;i++){const x=9+i*15,sway=Math.round(Math.sin(f*Math.PI/2+i)*1),c=['b1a3cb','9bb87e','c9bc83'][i%3];line(p,x,4,x+sway,20,'a18d68');
  for(let q=0;q<5;q++){const xx=x+sway+(q-2)*2;line(p,x+sway,17,xx,33+q%2*3,'6d8d60');for(let y=23;y<35;y+=4)box(p,xx,y,2,3,c);}box(p,x+sway-2,16,5,2,'d5be88');
 }return p;
}
for(const [name,p] of [['garden-rear',rear()],['garden-ground',ground()],['garden-front',front()],['garden-arch',arch()]])save(name,p);
const pot=image(384,96);for(let f=0;f<6;f++)copy(pot,cauldron(f),f*64,0);save('garden-cauldron',pot);
const bunches=image(384,48);for(let f=0;f<4;f++)copy(bunches,herbs(f),f*96,0);save('garden-herbs',bunches);
console.log('Generated original herb-garden source map: 3 layers, depth-sorted arch, six cauldron frames and four herb frames.');
