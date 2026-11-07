import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {gladeMap,gladeScenery} from '../src/scenes/glade-map.ts';
// Original integer-pixel study after viewing reference 10. No reference pixels are read.
const dir=fileURLToPath(new URL('../public/assets/art-v15/',import.meta.url));mkdirSync(dir,{recursive:true});
const img=(w=480,h=270)=>new PNG({width:w,height:h});
function px(p,x,y,c,a=255){x=Math.round(x);y=Math.round(y);if(x<0||x>=p.width||y<0||y>=p.height)return;const i=(y*p.width+x)*4;for(let n=0;n<3;n++){const v=parseInt(c.slice(n*2,n*2+2),16);p.data[i+n]=a<255&&p.data[i+3]===255?Math.round(v*a/255+p.data[i+n]*(1-a/255)):v;}p.data[i+3]=p.data[i+3]===255?255:a;}
function rect(p,x,y,w,h,c,a=255){for(let yy=Math.round(y);yy<Math.round(y+h);yy++)for(let xx=Math.round(x);xx<Math.round(x+w);xx++)px(p,xx,yy,c,a);}
function oval(p,x,y,rx,ry,c,a=255){for(let yy=Math.ceil(y-ry);yy<=y+ry;yy++)for(let xx=Math.ceil(x-rx);xx<=x+rx;xx++)if(((xx-x)/rx)**2+((yy-y)/ry)**2<=1)px(p,xx,yy,c,a);}
function line(p,x,y,a,b,c,w=1,alpha=255){const n=Math.max(1,Math.ceil(Math.hypot(a-x,b-y)));for(let i=0;i<=n;i++)rect(p,x+(a-x)*i/n,y+(b-y)*i/n,w,w,c,alpha);}
function poly(p,pts,c){for(let y=Math.ceil(Math.min(...pts.map(a=>a[1])));y<=Math.max(...pts.map(a=>a[1]));y++){const xs=[];for(let i=0;i<pts.length;i++){const [x1,y1]=pts[i],[x2,y2]=pts[(i+1)%pts.length];if(y1<=y&&y2>y||y2<=y&&y1>y)xs.push(x1+(y-y1)*(x2-x1)/(y2-y1));}xs.sort((a,b)=>a-b);for(let i=0;i<xs.length;i+=2)rect(p,Math.ceil(xs[i]),y,Math.floor(xs[i+1])-Math.ceil(xs[i])+1,1,c);}}
const hash=(x,y)=>{let n=Math.imul(x+37,374761393)+Math.imul(y+91,668265263);n=Math.imul(n^(n>>>13),1274126177);return (n^(n>>>16))>>>0;};
function blit(p,q,dx,dy){for(let y=0;y<q.height;y++)for(let x=0;x<q.width;x++){const i=(y*q.width+x)*4,a=q.data[i+3]/255,xx=x+dx,yy=y+dy;if(!a||xx<0||xx>=p.width||yy<0||yy>=p.height)continue;const j=(yy*p.width+xx)*4;for(let k=0;k<3;k++)p.data[j+k]=Math.round(q.data[i+k]*a+p.data[j+k]*(1-a));p.data[j+3]=Math.round(q.data[i+3]+p.data[j+3]*(1-a));}}
const save=(n,p)=>writeFileSync(dir+n+'.png',PNG.sync.write(p));
function star(p,x,y,r,c){line(p,x-r,y,x+r,y,c);line(p,x,y-r,x,y+r,c);px(p,x,y,'fff1bd');}
function flower(p,x,y,c){line(p,x,y,x-1,y+5,'608462');for(const [a,b] of [[-2,0],[2,0],[0,-2],[0,2]])rect(p,x+a,y+b,2,2,c);px(p,x,y,'f5d790');}
function stone(p,x,y,w,h){rect(p,x,y,w,h,'818b78');rect(p,x+1,y+1,w-3,h-3,'b7b597');line(p,x+1,y+1,x+w-3,y+1,'e5d6ab');line(p,x+w-2,y+2,x+w-2,y+h-1,'657e6b');}
const rear=img();
for(let y=0;y<270;y++)rect(rear,0,y,480,1,y<82?'a3d2df':y<135?'b5d0b2':'809f73');
// Misty waterfalls, far hills and a small rooted observatory stay behind the play space.
for(let i=0;i<18;i++){const x=i*29-9,y=75+hash(i,2)%28;poly(rear,[[x-19,136],[x+8,y],[x+38,137]],i%2?'8fb7a5':'a0c4b0');}
for(let i=0;i<11;i++){const x=194+i*17,y=100+hash(i,6)%19;rect(rear,x,y,15,47,'7fa89b');oval(rear,x+7,y,12,5,'b8c79b');if(i%3===0){line(rear,x+7,y+3,x+6,163,'cbddd0',3);line(rear,x+8,y+4,x+8,166,'edf0d5');}}
for(const [x,h] of [[236,47],[256,62],[273,39]]){stone(rear,x,75-h,10,h);poly(rear,[[x-3,75-h],[x+5,61-h],[x+13,75-h]],'9ebba8');line(rear,x+3,78-h,x+3,70,'dee2bc');}
oval(rear,259,81,45,3,'d8e3c5',160);star(rear,261,22,6,'f4e7bc');
// Large living tree: directional bark, branch silhouettes, layered leaf clusters.
poly(rear,[[38,197],[57,157],[60,89],[44,25],[74,0],[57,0],[27,31],[40,95],[32,165]],'646c4b');
poly(rear,[[45,185],[61,151],[64,92],[51,27],[66,0],[59,0],[41,32],[50,94]],'aa9763');
for(const [x,y,a,b,w] of [[49,91,12,44,12],[54,78,116,13,13],[56,107,144,71,9],[42,150,12,154,7]]){line(rear,x,y,a,b,'626f4e',w);line(rear,x+1,y,a+2,b,'9b9362',Math.max(2,w/3));}
for(let i=0;i<125;i++){const x=hash(i,1)%192-15,y=hash(i,9)%90-16,r=6+hash(i,11)%9;oval(rear,x,y,r,r*.6,['527d51','6b944e','87a854','a9bc69','c5ca83'][i%5]);line(rear,x-r/2,y-r/3,x+r/3,y-r/3,'c6ce8a');}
// Northeast broken resonator steps; the animated suspended ring is a separate object.
for(let i=0;i<5;i++){stone(rear,312+i*3,158+i*4,78-i*6,5);line(rear,316+i*3,159+i*4,383-i*3,159+i*4,'e6d7ae');}
for(const x of [318,382]){stone(rear,x,89,12,74);rect(rear,x-3,86,18,6,'d5c49e');for(let y=95;y<151;y+=13)line(rear,x+2,y,x+9,y,'8e977d');}
for(let i=0;i<13;i++){const a=Math.PI+i*Math.PI/12,x=356+Math.cos(a)*38,y=91+Math.sin(a)*37;stone(rear,x-6,y-5,13,10);if(i%3===0)star(rear,x,y,2,'d5b56e');}
for(const x of [303,396]){rect(rear,x,106,10,39,'527d8d');poly(rear,[[x,145],[x+10,145],[x+5,153]],'527d8d');line(rear,x+1,108,x+1,143,'e1c17e');star(rear,x+5,120,3,'f2d48c');}
stone(rear,161,174,28,17);line(rear,166,177,184,179,'6c8278');star(rear,176,180,3,'ddc08b');
for(const [x,h] of [[262,16],[272,25],[280,12]]){poly(rear,[[x,179-h],[x+4,174-h],[x+8,186],[x-4,190]],'699fa6');line(rear,x+2,179-h,x+3,184,'d1e6cd',2);}
// Warm light, vines and grouped flowers; the center lane deliberately stays clear.
for(let i=0;i<65;i++){const x=i<35?hash(i,17)%140:296+hash(i,19)%121,y=105+hash(i,21)%76;oval(rear,x,y,3,2,i%2?'90a76c':'abb87c');if(i%3===0)flower(rear,x,y,['d5b8d6','e9cbdc','dfd9b1'][i%3]);}
for(let i=0;i<9;i++)line(rear,90+i*11,83,136+i*14,177,'eee0a4',1,45);
save('glade-rear',rear);
const ground=img();
for(let y=180;y<270;y++)for(let x=0;x<480;x++){const n=hash(Math.floor(x/3),Math.floor(y/2));px(ground,x,y,x>438?['62a89d','74bdb0','a2d3bc'][n%3]:['88a46c','96ad75','a5b77c','7d9d68'][n%4]);}
for(const [a,b] of gladeMap.links){const u=gladeMap.anchors[a],v=gladeMap.anchors[b];line(ground,u.x-9,u.y-9,v.x-9,v.y-9,'7b9166',18);line(ground,u.x-7,u.y-8,v.x-7,v.y-8,'c9bea0',14);}
oval(ground,240,232,109,27,'8b9c72');oval(ground,240,230,104,25,'d7c9a6');oval(ground,240,230,96,21,'b7b896');
for(let i=0;i<24;i++){const a=i*Math.PI/12;line(ground,240+Math.cos(a)*97,230+Math.sin(a)*22,240+Math.cos(a)*104,230+Math.sin(a)*25,'8d9c7a');}
for(let y=182;y<264;y+=7)for(let x=46;x<436;x+=17){const xx=x+(y%14?8:0),j=(y*480+xx)*4;if(ground.data[j]===201){line(ground,xx,y,xx+11,y,'e5d2ae');line(ground,xx,y+1,xx,y+5,'a6a58a');}}
for(let i=0;i<8;i++){const a=i*Math.PI/4;poly(ground,[[240,230],[240+Math.cos(a-.16)*14,230+Math.sin(a-.16)*4],[240+Math.cos(a)*48,230+Math.sin(a)*13],[240+Math.cos(a+.16)*14,230+Math.sin(a+.16)*4]],i%2?'b29d68':'e8d29a');}
oval(ground,240,230,5,2,'f6e2ac');
// Long object shadows are ground decals; physical bases share gladeMap's colliders.
for(const x of [108,424])poly(ground,[[x-7,239],[x+6,239],[x+24,257],[x+13,258]],'718e66');
for(let y=188;y<270;y+=9){line(ground,441,y,459,y-2,'b5d9c0');line(ground,461,y+3,477,y+2,'cde5c5');}
for(let i=0;i<165;i++){const x=hash(i,51)%480,y=181+hash(i,53)%87,j=(y*480+x)*4;if(x<42||x>435||ground.data[j]===136){line(ground,x,y,x+1,y-4,'63875d');if(i%4===0)flower(ground,x,y,i%2?'dec4d9':'e8d9b5');}}
for(const s of gladeMap.solids.filter(s=>['old-tree-base','resonator-base','listening-stone','crystal-bed'].includes(s.id)))for(let y=s.y;y<s.y+s.height;y++)for(let x=s.x;x<s.x+s.width;x++)ground.data.fill(0,(y*480+x)*4,(y*480+x+1)*4);
save('glade-ground',ground);
const front=img();for(let i=0;i<34;i++){const x=i%2?471+hash(i,2)%9:hash(i,3)%9,y=118+hash(i,8)%144;oval(front,x,y,8,4,'477658');if(i%3===0)flower(front,x,y,'d4b3d4');}save('glade-front',front);
const post=img(48,112);stone(post,16,35,16,75);stone(post,12,31,24,7);oval(post,24,31,13,3,'e6ce9c');
rect(post,17,9,14,20,'455c50');rect(post,20,11,8,15,'e6ba6c');line(post,23,10,23,28,'f5d994');poly(post,[[14,9],[24,1],[34,9]],'b59b68');rect(post,21,29,6,4,'8c7d58');star(post,24,18,3,'ffe6a6');
for(let i=0;i<11;i++){oval(post,16+i%3,48+i*5,4,2,'8b9f6b');if(i%3===0)flower(post,14,48+i*5,'cbb3d2');}save('post',post);
const resonator=img(384,112);
for(let f=0;f<4;f++){const p=img(96,112);for(let i=0;i<90;i++){const a=i*Math.PI/45;if(a>.45&&a<.95)continue;px(p,48+Math.cos(a)*29,53+Math.sin(a)*31,'b89b60');px(p,48+Math.cos(a)*27,53+Math.sin(a)*29,'f0d294');}
 poly(p,[[48,31-f%2],[58,51],[48,75+f%2],[38,52]],['9ed5cc','b6e3d4','e1d8b5','b8d6e3'][f]);line(p,48,35,48,68,'f4edc7');line(p,40,52,56,51,'d1ecda');
 for(let i=0;i<5;i++){const a=i*1.25+f*.4;star(p,48+Math.cos(a)*20,52+Math.sin(a)*25,2,'d9daba');}rect(p,34,101,28,8,'989d80');line(p,35,102,60,102,'e0cda1');blit(resonator,p,f*96,0);
}save('resonator',resonator);
// Echo Knot: three interwoven ribbons around a listening aperture, not a recolored sentry.
const knot=img(256,256);
for(let row=0;row<4;row++)for(let f=0;f<4;f++){const p=img(64,64),bob=row===2?[0,-1,1,0][f]:[0,-1,0,1][f],expand=row===1?f:0;
 oval(p,32,58,16,3,'426d68',100);
 for(let loop=0;loop<3;loop++)for(let i=0;i<90;i++){const t=i*Math.PI/45,angle=loop*Math.PI/3,rx=19+expand,ry=9;const x=32+Math.cos(t)*rx*Math.cos(angle)-Math.sin(t)*ry*Math.sin(angle),y=29+bob+Math.cos(t)*rx*Math.sin(angle)+Math.sin(t)*ry*Math.cos(angle);const light=(i+f*12)%90<40;rect(p,x-1,y-1,3,3,'4c627b');rect(p,x,y,2,2,row===2?'e8c296':light?['e6d5a4','c2e6d2','d3c4e7'][loop]:['ab8e6c','7facaa','9c8bb9'][loop]);}
 oval(p,32,29+bob,7,8,'375b65');oval(p,31,28+bob,4,5,'7bb9b6');line(p,30,26+bob,33,26+bob,'f3e1b3');
 if(row===3){line(p,25,33+bob,39,33+bob,'dcd7b4');star(p,43,17,2,'dfd8b5');}else for(let i=0;i<3;i++)star(p,13+i*19,11+(i%2)*37+f%2,1,'eddeb3');
 if(row===1)for(let i=0;i<=f;i++)line(p,5+i*2,27-i*3,5+i*2,31+i*3,'d5d4de');blit(knot,p,f*64,row*64);
}save('echo-knot',knot);
const branch=img(96,32);
for(let f=0;f<3;f++){const p=img(32,32);line(p,5,26,27,13,'5a6c49',4);line(p,6,25,27,13,'b79964',2);line(p,14,21,11,11,'6f754d',3);line(p,15,20,11,10,'ceb47c');line(p,20,17,28,23,'776e4a',3);line(p,20,16,28,22,'d5b97c');
 for(const [x,y] of f===1?[[12,12]]:[[10,9],[27,20],[27,12]]){oval(p,x,y,4,2,f===2?'9db77a':'a4ae6f');line(p,x-2,y,x+2,y,'d3c88a');}
 if(f===2){line(p,5,28,28,28,'b9d8bb');oval(p,16,26,4,2,'c1ad7b');px(p,18,26,'496d68');}blit(branch,p,f*32,0);
}save('stream-branch',branch);
const fallback=img();blit(fallback,rear,0,0);blit(fallback,ground,0,0);for(const a of gladeScenery.posts)blit(fallback,post,a.x-24,a.y-112);const first=img(96,112);for(let y=0;y<112;y++)resonator.data.copy(first.data,y*96*4,y*384*4,(y*384+96)*4);blit(fallback,first,302,68);blit(fallback,front,0,0);save('glade-fallback',fallback);
console.log('Glade: original 3 layers + fallback, 4 resonator frames, depth-sorted lamp posts, 16 Echo Knot poses; reference 10 kept outside runtime assets.');
