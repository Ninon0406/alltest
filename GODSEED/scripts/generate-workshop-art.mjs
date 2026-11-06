import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {directionalIdle} from '../src/scenes/directional-art.ts';
import {workshopMap,workshopScenery} from '../src/scenes/workshop-map.ts';

// Original source-pixel study, directed by owner reference08. No reference pixels
// are read, sampled, resized or copied. The road network is the actual game map.
const output=fileURLToPath(new URL('../public/assets/art-v11/',import.meta.url));
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
function bottle(p,x,y,c){box(p,x-1,y-9,3,4,'cfb887');box(p,x-2,y-5,5,2,'e9d29d');oval(p,x,y,4,5,'536e69');oval(p,x,y,3,4,c);line(p,x-2,y-2,x-2,y+1,'e5edce');box(p,x-3,y+4,7,1,'758d7b');}
function crystal(p,x,y,size,c='b6a4d2'){poly(p,[[x,y-size],[x+size*.4,y-size*.4],[x+size*.3,y],[x-size*.35,y],[x-size*.4,y-size*.5]],c);line(p,x,y-size+2,x-1,y-2,'f1dfc7');line(p,x+size*.3,y-4,x,y-1,'827caa');}
function star(p,x,y,r,c='d8ba7e'){line(p,x-r,y,x+r,y,c);line(p,x,y-r,x,y+r,c);for(const [dx,dy] of [[-1,-1],[1,-1],[-1,1],[1,1]])line(p,x,y,x+dx*r*.65,y+dy*r*.65,c);}
function plant(p,x,y){box(p,x-7,y-8,14,10,'a57b54');poly(p,[[x-7,y-8],[x+7,y-8],[x+5,y+5],[x-5,y+5]],'bd9467');for(let i=0;i<7;i++){const xx=x-8+hash(i,x)%17,yy=y-15-hash(i,4)%12;line(p,x,y-5,xx,yy,'6c956b');oval(p,xx,yy,4,2,'9db985');if(i%2)box(p,xx,yy-2,2,3,'ccb3d0');}}
function shelf(p,x,y,w){box(p,x,y,w,5,'735e4b');box(p,x,y,w,1,'e0bc83');box(p,x+4,y+5,4,7,'8b7050');box(p,x+w-9,y+5,4,7,'8b7050');}
const back=image();
for(let y=0;y<H;y++)box(back,0,y,W,1,y<47?'8c856b':y<135?'b5ad8b':'a39979');
// Warm limewashed masonry and timber, rather than a pasted concept background.
for(let y=49;y<174;y+=9)for(let x=-15;x<W;x+=24){const xx=x+(y%18?12:0);box(back,xx,y,23,8,hash(x,y)%4?'bdb393':'aea68a');line(back,xx+1,y+1,xx+21,y+1,'d0c3a0');}
for(const x of [8,148,313,465]){box(back,x,0,7,174,'645c4b');box(back,x+1,0,3,174,'a1855d');line(back,x+6,20,x+6,172,'4d554a');}
box(back,0,42,480,9,'665c4a');box(back,0,43,480,2,'c6a271');
for(let x=0;x<480;x+=56){line(back,x,0,x+47,43,'665c4a',6);line(back,x+2,0,x+49,42,'b6996d',2);}
// Central arched rune niche and workshop banner use an original star motif.
oval(back,236,93,62,69,'887d61');box(back,174,88,125,75,'887d61');oval(back,236,93,54,61,'d2bd95');box(back,182,92,109,67,'d2bd95');oval(back,236,94,48,54,'657d73');box(back,188,94,97,63,'657d73');
oval(back,236,99,33,34,'a7926d');oval(back,236,99,31,32,'63786b');star(back,236,99,24);oval(back,236,99,9,9,'ddbf82');oval(back,236,99,7,7,'728274');
for(let i=0;i<12;i++){const a=i*Math.PI/6;box(back,236+Math.round(Math.cos(a)*39),99+Math.round(Math.sin(a)*40),2,2,'dbbd83');}
for(const x of [157,304]){poly(back,[[x,61],[x+11,61],[x+11,135],[x+5,143],[x,135]],'746b8e');line(back,x+2,63,x+2,134,'c6a37c');star(back,x+5,85,3,'e3c58b');}
// Left apothecary rack: vessels, mineral clusters, hanging bundles.
box(back,24,65,108,90,'786c51');box(back,27,68,101,84,'637b6b');
for(const y of [86,116,148]){shelf(back,21,y,114);for(let x=34;x<130;x+=16)bottle(back,x,y-7,['9fbfa5','b4a2c9','d8b877','8eb7b0'][Math.floor(x/16)%4]);}
for(let x=30;x<135;x+=16){line(back,x,49,x,62,'c5ac78');for(let n=0;n<3;n++){oval(back,x-2+n*2,64+n*3,2,6,'89a076');box(back,x+n-1,69+n,2,3,'bda0c3');}}
// Right window opens into distant, subdued GODSEED towers and foliage.
oval(back,384,83,52,56,'80775b');box(back,332,81,105,65,'80775b');oval(back,384,83,46,50,'bad4c5');box(back,338,81,93,58,'bad4c5');
for(const [x,h] of [[349,25],[366,38],[399,32],[416,23]]){box(back,x,134-h,8,h,'8eafa0');poly(back,[[x-2,134-h],[x+4,122-h],[x+10,134-h]],'91afa7');line(back,x+2,137-h,x+2,128,'dbe0bc');}
for(let i=0;i<17;i++)oval(back,341+i*5,135+hash(i,7)%5,7,4,['7f9e78','9cb58a','b3c397'][i%3]);
line(back,384,33,384,145,'9e8b64',3);line(back,338,95,430,95,'9e8b64',3);line(back,349,51,419,119,'9e8b64',2);line(back,420,51,348,119,'9e8b64',2);
box(back,328,144,112,7,'d0b488');box(back,330,151,109,3,'8f7a58');
// Three-tier oak work surfaces with legs and real grounded footprints.
for(const [x,y,w] of [[14,167,118],[333,160,92]]){poly(back,[[x,y],[x+w-7,y],[x+w,y+7],[x+3,y+7]],'d1af7a');box(back,x+3,y+7,w-4,7,'977451');box(back,x+8,y+14,5,12,'6d6049');box(back,x+w-12,y+14,5,12,'6d6049');box(back,x+8,y+27,w-16,2,'b79868');}
crystal(back,47,165,22,'a7c8c1');crystal(back,59,165,15);bottle(back,92,162,'cfb481');plant(back,126,166);
// Open recipe book, brass stand, small glass tools.
poly(back,[[360,158],[364,140],[378,144],[391,140],[396,158],[379,161]],'796c53');poly(back,[[363,157],[367,142],[378,146],[391,142],[394,157],[379,159]],'eddbac');line(back,379,147,379,158,'b79b6c');for(let y=147;y<156;y+=3){line(back,367,y,375,y+1,'b89c74');line(back,383,y+1,390,y,'b89c74');}star(back,388,151,2,'9f8e6b');bottle(back,346,158,'a6c0ac');bottle(back,408,158,'b9a2c7');
// Soft forge to the far right, away from the player/battle lanes.
box(back,444,118,34,55,'8b876b');oval(back,461,138,11,17,'5e6152');box(back,450,138,22,25,'5e6152');poly(back,[[451,163],[455,145],[460,154],[464,138],[471,163]],'ce9c62');poly(back,[[455,162],[460,152],[462,159],[466,147],[468,162]],'efd39a');
plant(back,20,189);plant(back,445,182);save('workshop-rear',back);
const floor=image();
for(let y=174;y<270;y++)for(let x=0;x<480;x++){
 if(x>=14&&x<132&&y<194||x>=333&&x<426&&y<186)continue;
 const row=Math.floor((y-174)/7),grain=hash(Math.floor((x+y)/8),row)%7;
 px(floor,x,y,y%7===0?'836d51':(x+y*2+row*31)%71===0?'987953':grain===0?'c5a174':grain===1?'b48e61':'bfa073');
}
oval(floor,240,221,108,32,'746a75');oval(floor,240,220,105,29,'bba277');oval(floor,240,220,101,26,'687e75');oval(floor,240,220,91,22,'879685');
for(let i=0;i<12;i++){const a=i*Math.PI/6;star(floor,240+Math.round(Math.cos(a)*97),220+Math.round(Math.sin(a)*25),2,'e0c38e');}
poly(floor,[[342,184],[424,184],[362,244],[244,244]],'f1dfad',28);
// Physical stool and restrained contact shadows do not paint over actors.
oval(floor,120,219,15,4,'506250',70);box(floor,111,204,4,14,'78654b');box(floor,125,204,4,14,'78654b');oval(floor,120,204,14,4,'c8a374');line(floor,109,203,130,203,'e3bf87');
save('workshop-ground',floor);
const front=image();for(const x of [0,459]){box(front,x,222,20,48,'696550');box(front,x+3,223,5,46,'b29c70');line(front,x+1,222,x+19,222,'e2c594',2);plant(front,x+10,241);}save('workshop-front',front);
// Six independent simmer frames, with a fixed brass bowl and planted feet.
const pot=image(576,96);
for(let f=0;f<6;f++){
 const p=image(96,96);oval(p,48,90,38,4,'4b6254');box(p,25,81,6,10,'6b6250');box(p,65,81,6,10,'6b6250');
 oval(p,48,70,32,21,'6a6655');oval(p,48,68,29,18,'b99862');poly(p,[[21,67],[27,83],[41,87],[42,65]],'d0af74');poly(p,[[60,66],[67,85],[75,75],[77,65]],'876f4c');
 oval(p,48,58,33,11,'d1b27a');oval(p,48,57,28,8,'5e7e75');oval(p,48,56,25,6,'a5c8b2');
 for(let i=0;i<8;i++){const x=30+hash(i,f)%37,y=53+hash(i,4+f)%6;px(p,x,y,'e4e7ba');}
 oval(p,16,65,6,8,'bfa16a');oval(p,16,65,3,5,'687565');oval(p,80,65,6,8,'bfa16a');oval(p,80,65,3,5,'687565');
 star(p,48,75,7,'f0d291');line(p,23,68,25,77,'edcf90',2);
 for(let i=0;i<5;i++){const y=17+i*8-(f%3),x=47+Math.round(Math.sin((i+f)*.9)*9);oval(p,x,y,4+i%3,2,'c4d3b8',75+i*20);}
 copy(pot,p,f*96,0);
}save('cauldron',pot);
const boxes=image(168,40);
for(let f=0;f<3;f++){const p=image(56,40);oval(p,28,37,23,2,'4e6252');poly(p,[[6,17],[42,14],[50,22],[47,37],[9,37]],'765b43');poly(p,[[8,21],[46,21],[45,35],[10,35]],'bc9160');line(p,12,25,42,25,'dbb87e');line(p,16,22,16,35,'8f704c');line(p,38,22,38,35,'8f704c');
 if(f===1){poly(p,[[7,17],[8,8],[43,6],[46,19]],'c6a371');line(p,12,11,39,10,'8d704d');box(p,12,20,28,5,'635d49');}
 else{poly(p,[[6,17],[42,14],[50,21],[9,23]],f===2?'b29a70':'d2b17b');line(p,13,19,38,17,'8c704e');box(p,25,22,5,5,'e0c28b');}
 copy(boxes,p,f*56,0);
}save('toolbox',boxes);
// Read source cells only from our own original hero atlas. No reference editing.
const idle=PNG.sync.read(readFileSync(fileURLToPath(new URL('../public/assets/art-v5/hero-idle.png',import.meta.url)))),held=image(256,48);
for(let f=0;f<4;f++){
 const p=image(64,48);for(let y=0;y<48;y++)for(let x=0;x<32;x++){const i=((y+Math.floor(directionalIdle.west.frames[0]/3)*48)*idle.width+x)*4;idle.data.copy(p.data,(y*64+x+16)*4,i,i+4);}
 const dy=[7,4,1,0][f];poly(p,[[9,25+dy],[24,23+dy],[29,28+dy],[28,37+dy],[10,37+dy]],'71563f');poly(p,[[11,28+dy],[28,28+dy],[27,35+dy],[12,35+dy]],'bd9261');line(p,13,30+dy,25,30+dy,'e3be87');box(p,20,27+dy,3,6,'e3be87');line(p,25,26,23,29+dy,'3f8f7f',3);box(p,22,28+dy,4,3,'e9bc93');copy(held,p,f*64,0);
}save('hero-toolbox',held);
const brewer=image(256,48);
for(let f=0;f<8;f++){
 const p=image(32,48);for(let y=0;y<48;y++)for(let x=0;x<32;x++){const i=((y+Math.floor(directionalIdle.north.frames[0]/3)*48)*idle.width+x)*4;idle.data.copy(p.data,(y*32+x)*4,i,i+4);}
 // North-facing sleeves and raised palms keep the back of the hood and boots.
 for(let y=25;y<37;y++)for(const [x,w] of [[5,6],[23,5]])for(let xx=x;xx<x+w;xx++)p.data.fill(0,(y*32+xx)*4,(y*32+xx+1)*4);
 const h=[24,23,21,22,23,21,22,24][f];line(p,10,27,7,h,'263c49',4);line(p,10,27,7,h,'4b9b8b',2);box(p,5,h-2,4,3,'e9bc93');line(p,22,27,25,h+1,'263c49',4);line(p,22,27,25,h+1,'4b9b8b',2);box(p,24,h-1,4,3,'e9bc93');
 star(p,8+(f%3),h-5,1,'d9c38d');px(p,24-(f%2),h-4,'c4deca');copy(brewer,p,f*32,0);
}save('hero-brew',brewer);
// Recipe parts:8 cores,6 forms,7 modifiers. Each is a drawn object/sigil.
const ingredients=image(128,48),tones=['eea16a','83c7cd','c4ded1','bdab7b','e6cf8d','ac9bc4','9ac68e','c7b6d8'];
for(let i=0;i<21;i++){const p=image(16,16),c=tones[i%8];
 if(i<8){if(i===0)poly(p,[[3,12],[4,7],[7,9],[9,2],[13,11],[10,14],[6,14]],c);else if(i===1) {poly(p,[[8,1],[13,9],[12,13],[5,14],[3,10]],c);line(p,6,8,5,11,'e1eed5');}else if(i===2){line(p,3,12,12,4,'678a6d');oval(p,8,7,6,3,c);line(p,4,10,12,5,'edf0cc');}else if(i===3)poly(p,[[3,7],[9,3],[14,8],[12,13],[4,13]],c);else if(i===4)star(p,8,8,6,c);else if(i===5){oval(p,8,8,6,5,c);oval(p,10,5,4,4,'5a7169');}else if(i===6){for(const [x,y] of [[4,8],[12,8],[8,4],[8,12]])oval(p,x,y,3,3,c);oval(p,8,8,2,2,'edcd88');}else{line(p,4,3,4,12,c,2);line(p,11,3,11,12,c,2);line(p,4,8,11,8,c,2);star(p,8,12,2,'e5d2ad');}}
 else if(i<14){const n=i-8;if(n===0){oval(p,8,8,5,5,'a3c9bf');oval(p,7,7,2,2,'e1e7cb');}else if(n===1){line(p,2,13,13,2,'d8c28d',2);star(p,11,4,3,'ebe0b6');}else if(n===2){oval(p,8,8,6,5,'c6c4a1');oval(p,8,8,3,2,'577a6c');}else if(n===3){for(const x of [3,8,13])line(p,x,4,x-1,11,'9fc7c5',2);}else if(n===4)poly(p,[[2,3],[13,3],[12,10],[8,14],[3,10]],'c4bb88');else{for(const x of [4,11]){oval(p,x,8,3,5,'bdb3cf');oval(p,x,8,1,3,'607d72');}}}
 else {const n=i-14;if(n===0){star(p,5,6,3,'d9be88');star(p,11,10,3,'d9be88');}else if(n===1){oval(p,8,8,6,6,'cbb17b');poly(p,[[8,2],[11,9],[5,9]],'97b8aa');}else if(n===2){poly(p,[[3,4],[12,4],[11,11],[8,14],[4,11]],'9db397');}else if(n===3){bottle(p,8,9,'a1c5b0');}else if(n===4){poly(p,[[2,13],[9,2],[13,4]],'d3bd8e');}else if(n===5){poly(p,[[3,2],[12,2],[10,6],[6,10],[3,14],[12,14],[10,10],[6,6]],'cbb993');}else{for(const r of [2,5]){line(p,8-r,8,8+r,8,'e2c689');line(p,8,8-r,8,8+r,'e2c689');}star(p,8,8,2,'f4dfac');}}
 copy(ingredients,p,(i%8)*16,Math.floor(i/8)*16);
}save('ingredients',ingredients);
console.log('Original workshop:3 layers,6-frame cauldron,3-state toolbox,held-box/north-brewing animation and21 recipe-part icons. Anchors:',Object.keys(workshopMap.anchors).length);
