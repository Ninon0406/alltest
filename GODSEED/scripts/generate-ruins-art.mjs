import {PNG} from 'pngjs';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {ruinsMap,ruinsScenery} from '../src/scenes/ruins-map.ts';
import {directionalIdle} from '../src/scenes/directional-art.ts';
// Original integer-pixel study directed by reference09. No concept pixels read.
const folder=fileURLToPath(new URL('../public/assets/art-v12/',import.meta.url));mkdirSync(folder,{recursive:true});
const img=(w=480,h=270)=>new PNG({width:w,height:h}),cache=new Map();
function px(p,x,y,c,a=255){x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=p.width||y>=p.height)return;let v=cache.get(c);if(!v){v=c.match(/../g).map(s=>parseInt(s,16));cache.set(c,v);}const i=(y*p.width+x)*4;p.data[i]=v[0];p.data[i+1]=v[1];p.data[i+2]=v[2];p.data[i+3]=a;}
function rect(p,x,y,w,h,c,a=255){for(let yy=Math.round(y);yy<Math.round(y+h);yy++)for(let xx=Math.round(x);xx<Math.round(x+w);xx++)px(p,xx,yy,c,a);}
function oval(p,x,y,rx,ry,c,a=255){for(let yy=Math.ceil(y-ry);yy<=y+ry;yy++)for(let xx=Math.ceil(x-rx);xx<=x+rx;xx++)if(((xx-x)/rx)**2+((yy-y)/ry)**2<=1)px(p,xx,yy,c,a);}
function line(p,x,y,ex,ey,c,w=1,a=255){const n=Math.max(1,Math.ceil(Math.hypot(ex-x,ey-y)));for(let i=0;i<=n;i++)rect(p,x+(ex-x)*i/n,y+(ey-y)*i/n,w,w,c,a);}
function poly(p,points,c,a=255){for(let y=Math.ceil(Math.min(...points.map(p=>p[1])));y<=Math.max(...points.map(p=>p[1]));y++){const xs=[];for(let i=0;i<points.length;i++){const [x1,y1]=points[i],[x2,y2]=points[(i+1)%points.length];if(y1<=y&&y2>y||y2<=y&&y1>y)xs.push(x1+(y-y1)*(x2-x1)/(y2-y1));}xs.sort((a,b)=>a-b);for(let i=0;i<xs.length;i+=2)rect(p,Math.ceil(xs[i]),y,Math.floor(xs[i+1])-Math.ceil(xs[i])+1,1,c,a);}}
function hash(x,y,s=0){let n=(Math.imul(x+53,374761393)+Math.imul(y+97,668265263)+s*1274126177)|0;n=Math.imul(n^(n>>>13),1274126177);return(n^(n>>>16))>>>0;}
function blit(p,q,dx,dy){for(let y=0;y<q.height;y++)for(let x=0;x<q.width;x++){const j=(y*q.width+x)*4,a=q.data[j+3];if(!a)continue;const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=p.width||yy>=p.height)continue;const i=(yy*p.width+xx)*4,alpha=a/255;for(let c=0;c<3;c++)p.data[i+c]=Math.round(q.data[j+c]*alpha+p.data[i+c]*(1-alpha));p.data[i+3]=Math.round(a+p.data[i+3]*(1-alpha));}}
function save(n,p){writeFileSync(folder+n+'.png',PNG.sync.write(p,{colorType:6}));}
function star(p,x,y,r,c='f4d28a'){line(p,x-r,y,x+r,y,c);line(p,x,y-r,x,y+r,c);for(const s of [-1,1]){line(p,x-r*.6,y-r*.6*s,x+r*.6,y+r*.6*s,c);}}
function leaf(p,x,y,r,c){oval(p,x,y,r,r*.55,c);line(p,x-r+1,y+1,x+r-1,y-1,'6a916d');}
function flowers(p,x,y,n=15){for(let i=0;i<n;i++){const xx=x+(hash(i,x)%39)-19,yy=y-(hash(i,y)%18);line(p,xx,yy,xx-1,yy+7,'698d63');for(const [dx,dy] of [[0,-2],[2,0],[-2,0],[0,2]])oval(p,xx+dx,yy+dy,2,2,i%3?'d3b1df':'e7dcbc');px(p,xx,yy,'efd28b');}}
function column(p,x,y,h,w=18){rect(p,x-w/2,y-h,w,h,'746e70');rect(p,x-w/2+2,y-h,w-5,h,'bcb39f');rect(p,x-w/2+3,y-h+2,3,h-5,'e3d2b2');rect(p,x+w/2-4,y-h+2,3,h-3,'908a7e');for(let yy=y-h+15;yy<y;yy+=15)line(p,x-w/2+3,yy,x+w/2-3,yy,'8f8980');rect(p,x-w/2-3,y-h-3,w+6,6,'d8c6a7');rect(p,x-w/2-2,y-5,w+4,6,'8c8578');line(p,x-w/2-2,y-5,x+w/2+1,y-5,'ebd9b8');}
const rear=img();
for(let y=0;y<270;y++)rect(rear,0,y,480,1,y<92?'b6d6d0':y<168?'9cbea7':'6d946e');
// Receding aqueducts and cloud gardens establish depth behind the sanctuary.
for(let i=0;i<13;i++){const x=280+i*19,y=93+hash(i,8)%28;rect(rear,x,y,13,37,'89acaa');oval(rear,x+6,y+22,4,9,'bdd4c7');rect(rear,x+2,y+22,9,16,'bdd4c7');rect(rear,x-1,y-2,16,4,'bdd0b5');}
for(let i=0;i<22;i++){const x=hash(i,7)%480,y=62+hash(i,9)%87;oval(rear,x,y,18,9,['719b80','86ac88','9abb93'][i%3]);}
for(const [x,y,h] of [[362,47,34],[405,28,47],[446,59,29]]){rect(rear,x,y,10,h,'9ebaa9');poly(rear,[[x-3,y],[x+5,y-14],[x+13,y]],'b4cdb6');line(rear,x+3,y+6,x+3,y+h,'d9d9bb');}
for(let i=0;i<7;i++){const x=392+i*14;line(rear,x,127,x-2,188,'b5d9cc',2,140);line(rear,x+3,130,x,187,'e3e9cb',1,140);}
// Great living tree, warm upper-left light and coherent carved stone.
poly(rear,[[0,171],[27,149],[40,99],[37,43],[61,0],[27,0],[15,45],[17,108]],'6b6c52');poly(rear,[[13,150],[30,96],[28,47],[48,0],[35,0],[20,52]],'9b9165');line(rear,28,81,100,16,'727351',13);line(rear,34,79,109,20,'a49467',4);
for(let i=0;i<74;i++){const x=hash(i,1)%220-30,y=hash(i,2)%75-14;leaf(rear,x,y,9+hash(i,3)%11,['709964','87ac6f','a6be7e','bec88b'][i%4]);}
for(let i=0;i<18;i++){const x=hash(i,34)%181;line(rear,x,43,x-5,91,'71945e');for(let k=0;k<5;k++)oval(rear,x-4+k%2,65+k*4,2,3,k%2?'c8a4d1':'d8bfdc');}
// Broken portal; individual stones follow its arch rather than a flat decal.
oval(rear,238,106,45,60,'759c96');rect(rear,193,106,90,58,'759c96');for(let i=0;i<27;i++)px(rear,202+hash(i,21)%74,66+hash(i,24)%93,i%3?'a6c8b5':'e2ce9b',140);
for(const x of [186,290])column(rear,x,169,88,20);
for(let i=0;i<15;i++){const a=Math.PI+i*Math.PI/14,x=238+Math.cos(a)*57,y=88+Math.sin(a)*51;poly(rear,[[x-9,y-6],[x+6,y-10],[x+10,y+6],[x-6,y+9]],i%3?'c7bea7':'afa993');line(rear,x-6,y-5,x+3,y-7,'e4d6b8');if(i%3===0)star(rear,x+1,y+1,3,'e8c788');}
for(const x of [177,300]){rect(rear,x,100,11,55,'647c8b');poly(rear,[[x,155],[x+11,155],[x+6,164]],'647c8b');line(rear,x+2,102,x+2,150,'e0c58b');star(rear,x+6,117,4,'edcc89');}
// Weathered figures, different silhouettes but same material and light direction.
for(const [x,y,mirror] of [[74,196,false],[394,196,true]]){column(rear,x,y,30,33);oval(rear,x,y-79,11,13,'d2ccb7');poly(rear,[[x-11,y-80],[x-17,y-55],[x-10,y-29],[x+13,y-29],[x+19,y-47],[x+9,y-77]],'a5a792');poly(rear,[[x-7,y-72],[x-12,y-35],[x+1,y-31],[x+6,y-67]],'d3ccb6');line(rear,x+2,y-68,x+10,y-33,'838e7f',3);const side=mirror?-1:1;line(rear,x+side*5,y-60,x+side*21,y-51,'d3ccb6',4);oval(rear,x+side*22,y-53,8,3,'c5a66e');star(rear,x+side*22,y-61,5,'f0d58b');for(let i=0;i<7;i++)leaf(rear,x-10+i*2,y-84+i%3,4,'8da176');}
// Console and music-box socket have real corresponding solid footprints.
poly(rear,[[158,176],[191,173],[200,181],[165,184]],'e1cfa8');rect(rear,162,184,35,10,'979782');line(rear,167,179,190,177,'8c99a3');star(rear,183,178,4,'dfbd7c');
column(rear,286,192,31,25);oval(rear,286,163,17,5,'d7c194');rect(rear,278,159,16,6,'637d7b');line(rear,279,158,292,158,'efdaab');
for(const [x,y] of [[117,177],[324,177]]){column(rear,x,y,22,17);oval(rear,x,y-27,12,4,'d3b078');poly(rear,[[x-5,y-28],[x-3,y-42],[x+1,y-34],[x+5,y-45],[x+6,y-28]],'e8b875');}
for(const [x,y] of [[20,187],[124,179],[309,182],[454,180]])flowers(rear,x,y,14);
// Fractured crystals beside the defeated sentinel's alcove.
for(const [x,h] of [[342,18],[352,27],[360,14]]){poly(rear,[[x,174-h],[x+5,170-h],[x+8,173],[x-4,175]],'aab5c3');line(rear,x,175-h,x+1,169,'d9decb');}
// Carved cracks, lichen and pendant flowers give the old masonry a readable surface.
for(const x of [186,290])for(let i=0;i<23;i++){const y=89+i*3;px(rear,x-6+hash(i,x)%11,y,i%3?'d9c9ab':'8a8f7d');if(i%7===0){line(rear,x+2,y,x-1,y+4,'7b8776');line(rear,x-1,y+4,x+3,y+7,'7b8776');}}
for(const [x,y] of [[181,89],[291,83],[406,168],[63,172],[321,169]])for(let i=0;i<14;i++){const xx=x+(hash(i,x)%17)-8,yy=y+(hash(i,y)%21);leaf(rear,xx,yy,3,['7f9e6a','a3b67c','b7c18c'][i%3]);if(i%4===0){oval(rear,xx,yy+5,2,4,'cbb0d8');px(rear,xx,yy+4,'ead4e3');}}
save('ruins-rear',rear);
const ground=img();
for(let y=174;y<270;y++)for(let x=0;x<480;x++){const n=hash(Math.floor(x/4),Math.floor(y/3));px(ground,x,y,x>444?'79bcb0':n%7===0?'a2b37f':n%4===0?'7f9e73':'8da77a');}
// Draw the actual road graph. Detailed joints and stone chipping share the grid.
for(const [a,b] of ruinsMap.links){const u=ruinsMap.anchors[a],v=ruinsMap.anchors[b];line(ground,u.x-11,u.y-11,v.x-11,v.y-11,'6e8c70',22);line(ground,u.x-9,u.y-11,v.x-9,v.y-11,'c4bba2',18);}
oval(ground,240,225,106,39,'8a9c7c');oval(ground,240,223,102,36,'d3c7a8');oval(ground,240,223,90,29,'a7ac8e');oval(ground,240,223,77,24,'c5bea1');
for(let y=179;y<270;y+=7)for(let x=0;x<443;x+=17){const xx=x+(y%14?8:0),i=(y*480+xx)*4;if(((xx-240)/96)**2+((y-223)/32)**2>=1&&(ground.data[i]===196||ground.data[i]===197||ground.data[i]===211)){line(ground,xx,y,xx+12,y,'ded0ac');line(ground,xx-1,y+1,xx-1,y+5,'aaa58e');}}
for(let i=0;i<24;i++){const a=i*Math.PI/12;line(ground,240+Math.cos(a)*91,223+Math.sin(a)*29,240+Math.cos(a)*101,223+Math.sin(a)*34,'9d9e85');}
for(let i=0;i<20;i++){const a=i*Math.PI/10,x=240+Math.round(Math.cos(a)*96),y=223+Math.round(Math.sin(a)*32);star(ground,x,y,2,'ecd19a');}
for(const a of [0,Math.PI/3,2*Math.PI/3])line(ground,240-Math.cos(a)*38,223-Math.sin(a)*13,240+Math.cos(a)*38,223+Math.sin(a)*13,'e4c88b');oval(ground,240,223,11,5,'d8c294');
for(let i=0;i<110;i++){const x=hash(i,12)%480,y=179+hash(i,15)%90;if(x<42||x>435){line(ground,x,y,x+2,y-5,'608764');if(i%4===0)rect(ground,x,y-4,2,2,i%3?'d4bad6':'edd7a8');}}
// Front edge foliage never paints over a road or an actor lane.
for(const [x,y] of [[14,263],[466,263],[27,224],[455,217]])flowers(ground,x,y,14);
// Ground alpha masks prevent floor pixels from covering sculpture/console faces.
for(const s of ruinsMap.solids.filter(s=>s.id!=='west-pillar-base'&&s.id!=='east-pillar-base'))for(let y=s.y;y<s.y+s.height;y++)for(let x=s.x;x<s.x+s.width;x++)if(x>=0&&x<480&&y>=0&&y<270)ground.data.fill(0,(y*480+x)*4,(y*480+x+1)*4);
save('ruins-ground',ground);
const front=img();for(let i=0;i<30;i++){const x=i%2?469+hash(i,3)%12:hash(i,4)%10,y=110+hash(i,7)%145;leaf(front,x,y,8,'4e795e');if(i%4===0)flowers(front,x,y,3);}save('ruins-front',front);
const pillar=img(48,112);column(pillar,24,110,91,18);rect(pillar,10,10,28,6,'e0cba5');rect(pillar,13,8,22,3,'919181');oval(pillar,24,8,13,4,'ddc49a');star(pillar,24,43,6,'d5b67d');for(let i=0;i<12;i++){const y=18+i*6;leaf(pillar,10+i%3,y,4,'8fa474');if(i%2)oval(pillar,11,y+2,2,3,'d3b6d9');}save('pillar',pillar);
const altar=img(384,336),altarCells=[];
for(let state=0;state<3;state++)for(let f=0;f<4;f++){const p=img(96,112);oval(p,48,108,41,4,'547d69',170);poly(p,[[11,91],[82,91],[88,102],[75,109],[17,109],[7,102]],'a7a58c');line(p,12,94,81,94,'e3cf9d',2);rect(p,21,72,54,23,'929a85');rect(p,24,74,5,20,'c8bd9c');rect(p,67,74,4,20,'748b7b');oval(p,48,73,35,11,'d5bd8c');oval(p,48,71,29,7,'677f73');
 for(let i=0;i<7;i++){const a=i*Math.PI/3.5,x=48+Math.cos(a)*24,y=73+Math.sin(a)*6;star(p,x,y,2,'ecd393');}
 const glow=state===0?'a4b7b0':state===1?'e4c788':'cbb9e1';
 for(let i=0;i<3;i++){const y=27+i*12-(f%2),x=47+Math.round(Math.sin((i+f)*1.1)*14);star(p,x,y,state===2?4:2,glow);if(state>0){line(p,x,y+2,x,y+8,glow);oval(p,x-2,y+8,3,2,glow);}}
 if(state>0){for(let i=0;i<24;i++){const a=i*Math.PI/12;line(ground,240+Math.cos(a)*91,223+Math.sin(a)*29,240+Math.cos(a)*101,223+Math.sin(a)*34,'9d9e85');}
for(let i=0;i<20;i++){const a=i*Math.PI/10;px(p,48+Math.cos(a)*29,44+Math.sin(a)*17,glow,160);}line(p,25,53,70,34,glow,1,110);line(p,26,35,71,52,glow,1,110);}
 for(const x of [15,80]){poly(p,[[x-4,76],[x-9,60],[x-4,41],[x+1,47],[x-3,62],[x+3,75]],'c1b49a');line(p,x-5,61,x-2,49,'e4d3b0');}
 altarCells.push(p);blit(altar,p,f*96,state*112);
}save('altar',altar);
// Rune sentry: original carved jointed construct, teal heart, bronze shoulder rings.
const sentry=img(256,256);
for(let row=0;row<4;row++)for(let f=0;f<4;f++){const p=img(64,64),dx=row===2?[0,-1,1,0][f]:0,arm=row===1?[0,-3,-7,-2][f]:row===3?-5:0;
 const stone=(x,y,w,h,c)=>rect(p,x+dx,y,w,h,c);
 for(const x of [18,36]){stone(x,44,10,15,'536c68');stone(x+1,46,5,11,'adad93');stone(x-2,57,14,4,'566a61');stone(x-1,57,11,2,'c9ba95');}
 poly(p,[[18+dx,22],[45+dx,22],[46+dx,40],[40+dx,49],[23+dx,49],[16+dx,38]],'536f6b');poly(p,[[21+dx,24],[43+dx,24],[41+dx,44],[25+dx,44]],'b2b69c');line(p,24+dx,25,24+dx,42,'e0cfaa',2);line(p,42+dx,27,40+dx,44,'748b7b',2);
 oval(p,32+dx,34,7,9,'6a9c92');poly(p,[[32+dx,26],[36+dx,33],[32+dx,42],[28+dx,34]],row===2?'e6c395':['c3ddc6','a4d5c1','e0e6c3','aed8c7'][f]);line(p,32+dx,28,32+dx,38,'f5e0ad');
 for(const x of [13,45]){oval(p,x+dx,25+arm,8,8,'6c7f73');oval(p,x+dx,24+arm,6,6,'c8ba93');oval(p,x+dx,24+arm,3,3,'859f90');stone(x-4,29+arm,8,14,'91a58e');line(p,x-2+dx,30+arm,x-2+dx,40+arm,'d2c59f',2);stone(x-5,42+arm,10,5,'567a70');for(let i=0;i<3;i++)stone(x-4+i*3,46+arm,2,4,'b1b698');}
 poly(p,[[23+dx,17],[25+dx,9],[38+dx,9],[42+dx,17],[37+dx,24],[27+dx,24]],'6b847b');poly(p,[[26+dx,12],[36+dx,11],[39+dx,17],[35+dx,21],[28+dx,21]],'c4bfa0');line(p,27+dx,17,36+dx,17,'4d817d',2);px(p,30+dx,17,'e3ddad');px(p,35+dx,17,'e3ddad');
 for(const [x,y] of [[24,29],[38,41],[20,52],[42,48]]){line(p,x+dx,y,x+dx+2,y+3,'66867a');line(p,x+dx+2,y+3,x+dx,y+5,'66867a');}for(let i=0;i<5;i++){rect(p,19+dx+i%2,45+i*2,2,2,i%2?'93ad7d':'d4ba8d');}star(p,32+dx,6,3,'e6c78e');for(const x of [20,44])line(p,x+dx,16,x+dx,24,'c4ac7e');
 if(row===1)for(let i=0;i<4;i++)star(p,6+i*3,22-i*3+f,1,'edcf92');
 if(row===3){for(let i=0;i<24;i++){const a=i*Math.PI/12;px(p,32+Math.cos(a)*27,34+Math.sin(a)*24,'c4bedb',170);}for(let i=0;i<5;i++)star(p,11+i*10,17+(i%2)*4,2,'d5c9e1');}
 blit(sentry,p,f*64,row*64);
}save('sentinel',sentry);
// North-facing gestures inherit only our own idle hero; original head/boots remain.
const idle=PNG.sync.read(readFileSync(fileURLToPath(new URL('../public/assets/art-v5/hero-idle.png',import.meta.url)))),hero=img(256,96);
for(let mode=0;mode<2;mode++)for(let f=0;f<(mode?4:6);f++){const p=img(32,48),sourceY=Math.floor(directionalIdle.north.frames[0]/3)*48;
 for(let y=0;y<48;y++)for(let x=0;x<32;x++){const i=((y+sourceY)*idle.width+x)*4;idle.data.copy(p.data,(y*32+x)*4,i,i+4);}
 if(mode===0){const h=[25,23,21,22,24,25][f];line(p,23,29,25,h,'263c49',4);line(p,23,29,25,h,'4b9b8b',2);rect(p,24,h-2,4,3,'e9bc93');star(p,27,h-5,1,'ecd6a2');line(p,9,29,7,25,'4b9b8b',3);rect(p,5,23,4,3,'e9bc93');}
 else{poly(p,[[7,25],[22,25],[25,29],[23,37],[7,37],[5,30]],'6f5947');rect(p,8,29,15,7,'bf9d6c');line(p,8,27,21,27,'e2c48a');star(p,15,32,3,'e8c98d');line(p,8,28,5,30,'4b9b8b',3);line(p,24,28,26,31,'4b9b8b',3);rect(p,4,29,4,3,'e9bc93');rect(p,24,30,4,3,'e9bc93');if(f%2)star(p,20,22,2,'d7c2de');}
 blit(hero,p,f*32,mode*48);
}save('hero-ruins',hero);
const fallback=img();blit(fallback,rear,0,0);blit(fallback,ground,0,0);blit(fallback,altarCells[0],ruinsScenery.altar.x-48,ruinsScenery.altar.y-112);for(const p of ruinsScenery.pillars)blit(fallback,pillar,p.x-24,p.y-112);blit(fallback,front,0,0);save('ruins-fallback',fallback);
console.log('Original ruins: 3 layers + fallback, 12 altar frames, Y-sorted pillar, 16 sentinel frames, 10 north hero gestures. Anchors:',Object.keys(ruinsMap.anchors).length);
