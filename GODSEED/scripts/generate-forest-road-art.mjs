import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {forestRoadMap,forestRoadScenery} from '../src/scenes/forest-road-map.ts';
// Original integer pixel drawings after viewing concept06. No concept pixels are read.
const dir=fileURLToPath(new URL('../public/assets/art-v17/',import.meta.url));mkdirSync(dir,{recursive:true});
const img=(width=480,height=270)=>new PNG({width,height});
function px(p,x,y,c,a=255){x=Math.round(x);y=Math.round(y);if(x<0||x>=p.width||y<0||y>=p.height)return;const i=(y*p.width+x)*4;for(let n=0;n<3;n++)p.data[i+n]=parseInt(c.slice(n*2,n*2+2),16);p.data[i+3]=a;}
function rect(p,x,y,w,h,c,a=255){for(let yy=Math.round(y);yy<Math.round(y+h);yy++)for(let xx=Math.round(x);xx<Math.round(x+w);xx++)px(p,xx,yy,c,a);}
function oval(p,x,y,rx,ry,c,a=255){for(let yy=Math.ceil(y-ry);yy<=y+ry;yy++)for(let xx=Math.ceil(x-rx);xx<=x+rx;xx++)if(((xx-x)/rx)**2+((yy-y)/ry)**2<=1)px(p,xx,yy,c,a);}
function line(p,x,y,a,b,c,w=1){const n=Math.max(1,Math.ceil(Math.hypot(a-x,b-y)));for(let i=0;i<=n;i++)rect(p,x+(a-x)*i/n,y+(b-y)*i/n,w,w,c);}
function poly(p,pts,c){for(let y=Math.ceil(Math.min(...pts.map(a=>a[1])));y<=Math.max(...pts.map(a=>a[1]));y++){const xs=[];for(let i=0;i<pts.length;i++){const [x1,y1]=pts[i],[x2,y2]=pts[(i+1)%pts.length];if(y1<=y&&y2>y||y2<=y&&y1>y)xs.push(x1+(y-y1)*(x2-x1)/(y2-y1));}xs.sort((a,b)=>a-b);for(let i=0;i<xs.length;i+=2)rect(p,Math.ceil(xs[i]),y,Math.floor(xs[i+1])-Math.ceil(xs[i])+1,1,c);}}
function blit(p,q,dx,dy){for(let y=0;y<q.height;y++)for(let x=0;x<q.width;x++){const i=(y*q.width+x)*4,a=q.data[i+3]/255,xx=x+dx,yy=y+dy;if(!a||xx<0||xx>=p.width||yy<0||yy>=p.height)continue;const j=(yy*p.width+xx)*4;for(let k=0;k<3;k++)p.data[j+k]=Math.round(q.data[i+k]*a+p.data[j+k]*(1-a));p.data[j+3]=Math.round(q.data[i+3]+p.data[j+3]*(1-a));}}
const save=(n,p)=>writeFileSync(dir+n+'.png',PNG.sync.write(p));
const hash=(x,y)=>{let n=Math.imul(x+71,374761393)+Math.imul(y+19,668265263);n=Math.imul(n^(n>>>13),1274126177);return (n^(n>>>16))>>>0;};
function flower(p,x,y,c){line(p,x,y,x,y+5,'63835b');for(const [a,b] of [[-2,0],[2,0],[0,-2],[0,2]])rect(p,x+a,y+b,2,2,c);px(p,x,y,'f1d88e');}
function stone(p,x,y,w,h){rect(p,x,y,w,h,'7c897a');rect(p,x+1,y+1,w-2,h-2,'bcb59a');line(p,x+1,y+1,x+w-3,y+1,'e6d4aa');}
const rear=img();
for(let y=0;y<270;y++)rect(rear,0,y,480,1,y<70?'a5d0dc':y<125?'b7d0b4':'8fa77b');
// Distant canopies and old road: scale decreases into warm atmospheric haze.
for(let i=0;i<29;i++){const x=i*19-8,y=65+hash(i,7)%45;rect(rear,x,y,5,113-y,'799c8c');oval(rear,x+1,y,18,29,['81ab94','90b59b','a8c4a6'][i%3]);}
poly(rear,[[220,179],[260,132],[299,102],[314,102],[279,140],[269,182]],'cbc3a3');
for(let i=0;i<9;i++)line(rear,256+i*3,137-i*3,265+i*3,138-i*3,'e5d8b1');
// A small roadside lodge, drawn in the same three-quarter geometry as village art.
rect(rear,5,87,91,91,'b7ad7d');poly(rear,[[0,89],[25,48],[93,56],[113,94]],'785f64');
for(let y=60;y<92;y+=6)line(rear,20-(y-60)/2,y,92+(y-60)/2,y,'a8877a',2);
rect(rear,15,97,9,78,'745e4d');rect(rear,75,99,7,76,'745e4d');rect(rear,25,115,37,38,'4f6a68');rect(rear,28,118,30,31,'ecd194');line(rear,43,118,43,150,'967652',2);line(rear,28,134,58,134,'967652',2);
rect(rear,11,154,65,5,'7e7153');for(let i=0;i<14;i++)flower(rear,13+i*4,153-hash(i,13)%6,i%2?'c6b4d3':'e7c8cf');
// Far gate, weathered waystone and a stream descending behind the walkable bank.
for(const x of [219,267]){for(let y=107;y<158;y+=8)stone(rear,x,y,11,8);stone(rear,x-3,103,17,6);}
for(let i=0;i<11;i++){const a=Math.PI+i*Math.PI/10;stone(rear,248+Math.cos(a)*25-5,107+Math.sin(a)*24-4,11,8);}
for(let y=112;y<270;y++){const x=428-Math.floor((y-112)/12);rect(rear,x,y,480-x,1,['5b9f9c','6aafa6','89c4b2'][y%3]);if(y%8===0)line(rear,x+4,y,478,y-2,'cde4c5',2);}
stone(rear,177,160,26,21);line(rear,184,168,198,169,'6b8779');line(rear,190,162,190,177,'728f7c');
// Grouped flowers and moss leave the road center legible.
for(let i=0;i<150;i++){const x=hash(i,21)%480,y=92+hash(i,23)%90;oval(rear,x,y,3,2,i%2?'83a26b':'9bb47a');if(i%4===0)flower(rear,x,y,['d8bdd9','ecd1c0','d9dcb2'][i%3]);}
for(let i=0;i<3;i++){line(rear,144+i*57,44,184+i*60,168,'c8cba0');line(rear,146+i*57,44,186+i*60,168,'cfd0a4');}
save('forest-road-rear',rear);
const ground=img();
for(let y=180;y<270;y++)for(let x=0;x<438;x++)px(ground,x,y,['7f9e69','90aa70','a1b679','88a570'][hash(x>>2,y>>1)%4]);
const roadMask=new Uint8Array(480*270);
for(let y=181;y<270;y++)for(let x=40;x<438;x++){
 let distance=1000;for(const [a,b] of forestRoadMap.links){const u=forestRoadMap.anchors[a],v=forestRoadMap.anchors[b],dx=v.x-u.x,dy=v.y-u.y,t=Math.max(0,Math.min(1,((x-u.x)*dx+(y-u.y)*dy)/(dx*dx+dy*dy)));distance=Math.min(distance,Math.hypot(x-u.x-t*dx,y-u.y-t*dy));}
 const edge=11+(hash(x>>2,y>>2)%3);if(distance>edge+3)continue;px(ground,x,y,distance>edge?'759169':'9c9e7d');if(distance<=edge)roadMask[y*480+x]=1;
}
// Small, staggered cobbles sit inside a rounded path mask. No oversized grid floor.
for(let y=182;y<270;y+=6)for(let x=37;x<438;x+=11){const xx=x+(y%12?5:0),n=hash(xx,y),w=7+n%3,h=3+n%2,c=['bbb08e','c7b99b','d1c3a3','b3ad8b'][n%4];
 for(let oy=0;oy<h+1;oy++)for(let ox=0;ox<w;ox++){const a=xx+ox,b=y+oy;if(!roadMask[b*480+a])continue;if((oy===0||oy===h)&&(ox===0||ox===w-1))continue;px(ground,a,b,oy===0?'e5d4af':oy===h?'849075':c);}
}
for(let i=0;i<180;i++){const x=hash(i,31)%438,y=182+hash(i,33)%87;if(roadMask[y*480+x])continue;line(ground,x,y,x+1,y-4,'597e57');if(i%5===0)flower(ground,x,y,i%2?'e3c3d7':'e8dda9');}
for(const s of forestRoadMap.solids.filter(s=>!s.id.startsWith('bench-')))oval(ground,s.x+s.width*.65,s.y+s.height,Math.max(9,s.width*.65),6,'678761');
save('forest-road-ground',ground);
const front=img();for(let i=0;i<45;i++){const x=i%2?473+hash(i,4)%7:hash(i,5)%9,y=115+hash(i,6)%150;oval(front,x,y,9,5,i%3?'5c875d':'426d54');if(i%4===0)flower(front,x,y,'d6b5d2');}save('forest-road-front',front);
// Large occluding oak and a smaller hollow: separate sprites, sorted by their feet.
function tree(width,height,hollow=false){const p=img(width,height),cx=width/2;
 poly(p,[[cx-22,height-2],[cx-10,height-36],[cx-15,44],[cx+8,26],[cx+18,height-35],[cx+27,height-2]],'5a6549');
 poly(p,[[cx-13,height-3],[cx-3,height-34],[cx-5,45],[cx+7,35],[cx+9,height-33],[cx+17,height-2]],'a48e59');
 for(let i=0;i<10;i++)line(p,cx-11+i*3,60+i%3*7,cx-10+i*3,height-8,i%2?'c2aa6a':'7e774f');
 for(const [x,y] of [[cx-37,30],[cx+29,12],[cx+43,58]]){line(p,cx,90,x,y,'646d49',9);line(p,cx+1,86,x,y,'aa945e',3);}
 for(let i=0;i<76;i++){const x=8+hash(i,hollow?66:61)%(width-16),y=8+hash(i,63)%68;oval(p,x,y,8+hash(i,64)%9,6+hash(i,65)%7,['3f7353','568450','729b55','91ad63','b6c47f'][i%5]);line(p,x-4,y-3,x+4,y-3,'b8c582');}
 if(!hollow){line(p,cx+5,112,107,118,'685f43',7);line(p,cx+6,111,107,117,'a18e5a',2);for(let i=0;i<9;i++){const x=87+i%3*11,y=111+Math.floor(i/3)*6;oval(p,x,y,12,7,['58844e','7d9e58','9fb56e'][i%3]);line(p,x-4,y-3,x+5,y-3,'bcc788');}}
 if(hollow){oval(p,cx+3,height-26,10,18,'3b5b50');oval(p,cx+2,height-25,6,12,'284c49');line(p,cx-5,height-8,cx+12,height-8,'c8b47b');}
 for(let i=0;i<11;i++)flower(p,cx-27+i*5,height-6-i%3*3,i%2?'d1b7d8':'e6d5b1');return p;}
const oak=tree(128,160),hollow=tree(88,132,true);save('road-oak',oak);save('road-hollow',hollow);
const roots=img(288,64);
for(let f=0;f<4;f++){const p=img(72,64);oval(p,36,58,32,5,'678562');for(let i=0;i<7;i++){const x=10+i*8;line(p,36,37,x,57,'675f44',5);line(p,36,36,x,55,'b3975c',2);}oval(p,36,37,12,12,'8b8152');
 if(f>0){for(const [x,y] of [[22,28],[47,26],[35,17]]){line(p,36,40,x,y,'68894d',2);oval(p,x,y,8,4,f===2?'91ba70':'a0b475');line(p,x-3,y,x+4,y,'d0d493');}for(let i=0;i<f;i++)flower(p,25+i*11,22-i%2*7,f===3?'d1b3db':'e9d9ae');}
 else {line(p,30,38,19,26,'8d8153',2);line(p,39,34,49,22,'8d8153',2);}blit(roots,p,f*72,0);}
save('memory-root',roots);
const fruit=img(128,32);for(let f=0;f<4;f++){const p=img(32,32);oval(p,16,28,11,3,'627d57',140);oval(p,16,18,11,10,'916745');oval(p,16,16,10,9,['dca267','e2ae70','dfad75','d5b278'][f]);oval(p,12+(f%2)*5,13,4,3,'f5d49a');line(p,17,8,18,4,'6b7450',2);oval(p,22,5,6,2,'8eae68');blit(fruit,p,f*32,0);}save('forest-fruit',fruit);
const keepsake=img(128,48);
for(let f=0;f<4;f++){const p=img(32,48);if(f===1){line(p,3,44,29,44,'a28e5c',3);for(let i=0;i<4;i++)line(p,5+i*7,36,5+i*7,47,'7a7750',2);oval(p,16,31,8,4,'a0b778');}else if(f===2){rect(p,14,12,4,36,'7f6e4e');poly(p,[[3,12],[22,12],[30,18],[22,24],[3,24]],'b89d68');line(p,5,15,21,15,'e3c78f');rect(p,5,34,8,4,'8ba16d');}else{rect(p,5,32,23,13,'6e7157');poly(p,[[3,25],[15,23],[16,37],[4,39]],'e5d3a8');poly(p,[[17,23],[29,25],[28,39],[16,37]],'f0dfb5');for(let i=0;i<3;i++){line(p,6,28+i*3,12,27+i*3,'799379');line(p,19,27+i*3,25,28+i*3,'799379');}}blit(keepsake,p,f*32,0);}save('road-keepsake',keepsake);
// Root Weaver: a woven seed basket on six rooting limbs, carrying its own sapling.
const actor=img(256,256);
for(let row=0;row<4;row++)for(let f=0;f<4;f++){const p=img(64,64),bob=row===1?f%2:row===2?[0,-2,1,0][f]:f%2,reach=row===1?f*3:0;
 for(let i=0;i<3;i++){line(p,20+i*10,42+bob,10+i*17-reach,55,'465e49',4);line(p,20+i*10,41+bob,10+i*17-reach,54,'a68c5a',2);}
 oval(p,32,35+bob,22,15,'4b6549');oval(p,32,32+bob,21,14,row===2?'d8c48a':'ad9861');
 for(let y=23;y<44;y+=5){line(p,14,y+bob,49,y+bob,'765f43',2);for(let x=18;x<50;x+=9)line(p,x,y-1+bob,x+2,y+4+bob,'d3b574');}
 oval(p,27,34+bob,10,8,'426357');rect(p,23,32+bob,3,3,'efdca4');rect(p,30,32+bob,3,3,'efdca4');
 line(p,36,23+bob,35,10+bob,'60864c',3);oval(p,27,13+bob,9,4,'91b56c');oval(p,43,8+bob,9,4,'a8c77b');line(p,35,12+bob,44,7+bob,'d1d79b');
 if(row===3){line(p,7,38,14,18,'7b9b61',3);line(p,14,18,43,13,'b0c180',3);line(p,43,13,57,34,'7b9b61',3);}if(row===1)for(let i=0;i<f+1;i++)oval(p,5+i*4,25+i*4,2,2,'dfcf8d');
 blit(actor,p,f*64,row*64);}
save('root-weaver',actor);
const fallback=img();blit(fallback,rear,0,0);blit(fallback,ground,0,0);blit(fallback,oak,forestRoadScenery.oak.x-64,forestRoadScenery.oak.y-160);blit(fallback,hollow,forestRoadScenery.hollow.x-44,forestRoadScenery.hollow.y-132);blit(fallback,front,0,0);save('forest-road-fallback',fallback);
console.log('Original forest road: 3 layers, fallback, two occluding trees, 4 root/fruit states, 16 Root Weaver frames.');
