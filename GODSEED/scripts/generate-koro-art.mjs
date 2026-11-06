import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

// Original GODSEED pixel drawings. Reference08 informs warm metal/wood accents;
// no reference pixels or third-party artwork are copied into these atlases.
const out=fileURLToPath(new URL('../public/assets/art-v10/',import.meta.url));
mkdirSync(out,{recursive:true});
const img=(width,height)=>new PNG({width,height});
const rgb=new Map();
function px(p,x,y,c,a=255){x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=p.width||y>=p.height)return;if(!rgb.has(c))rgb.set(c,c.match(/../g).map(v=>parseInt(v,16)));const v=rgb.get(c),i=(y*p.width+x)*4;p.data[i]=v[0];p.data[i+1]=v[1];p.data[i+2]=v[2];p.data[i+3]=a;}
function rect(p,x,y,w,h,c){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)px(p,i,j,c);}
function oval(p,x,y,rx,ry,c){for(let j=Math.ceil(y-ry);j<=y+ry;j++)for(let i=Math.ceil(x-rx);i<=x+rx;i++)if(((i-x)/rx)**2+((j-y)/ry)**2<=1)px(p,i,j,c);}
function poly(p,pts,c){for(let y=Math.ceil(Math.min(...pts.map(v=>v[1])));y<=Math.max(...pts.map(v=>v[1]));y++){const xs=[];for(let k=0;k<pts.length;k++){const [x1,y1]=pts[k],[x2,y2]=pts[(k+1)%pts.length];if(y1<=y&&y2>y||y2<=y&&y1>y)xs.push(x1+(y-y1)*(x2-x1)/(y2-y1));}xs.sort((a,b)=>a-b);for(let k=0;k<xs.length;k+=2)rect(p,Math.ceil(xs[k]),y,Math.floor(xs[k+1])-Math.ceil(xs[k])+1,1,c);}}
function line(p,x,y,xx,yy,c,w=1){const steps=Math.max(Math.abs(xx-x),Math.abs(yy-y));for(let i=0;i<=steps;i++){const t=steps?i/steps:0;rect(p,Math.round(x+(xx-x)*t),Math.round(y+(yy-y)*t),w,w,c);}}
function copy(dst,src,ox,oy){for(let y=0;y<src.height;y++)for(let x=0;x<src.width;x++){const i=(y*src.width+x)*4;if(src.data[i+3])src.data.copy(dst.data,((y+oy)*dst.width+x+ox)*4,i,i+4);}}
const save=(name,p)=>writeFileSync(out+name+'.png',PNG.sync.write(p,{colorType:6}));
const atlas=img(128,144);
for(let row=0;row<3;row++)for(let f=0;f<4;f++){
 const p=img(32,48),b=f===1?-1:0;
 // Broad shoulders, grounded leather boots, teal linen and brass apron rivets.
 oval(p,11,43,4,1,'3c4946');oval(p,22,43,4,1,'3c4946');
 rect(p,9,35,6,8,'4a5a59');rect(p,20,35,5,8,'4a5a59');rect(p,8,41,7,3,'665144');rect(p,19,41,7,3,'665144');line(p,9,41,13,41,'b18a62');line(p,20,41,24,41,'b18a62');
 poly(p,[[9,20+b],[24,20+b],[28,27],[24,35],[8,35],[5,27]],'426f6c');
 poly(p,[[11,22+b],[23,22+b],[25,38],[8,38]],'75513e');
 poly(p,[[12,24+b],[22,24+b],[23,36],[10,36]],'b48558');line(p,14,25,13,34,'d3ac78');
 line(p,11,20+b,12,28,'f1cf8c');line(p,22,20+b,22,28,'f1cf8c');rect(p,14,31,7,4,'856040');line(p,15,31,20,31,'edc17e');
 rect(p,24,28,3,5,'c99873');rect(p,25,27,3,2,'f0c99c');
 // Friendly west-facing face, sideburns, goggles, swept bronze hair.
 oval(p,17,13+b,9,9,'5d5148');oval(p,16,14+b,8,8,'d8a37a');oval(p,18,13+b,6,7,'efc69a');
 poly(p,[[7,11+b],[8,6+b],[12,3+b],[20,3+b],[26,8+b],[25,17+b],[22,18+b],[21,10+b],[15,8+b],[10,11+b]],'5f5648');
 poly(p,[[9,7+b],[13,4+b],[20,4+b],[23,8+b],[18,7+b],[16,9+b]],'a9875d');line(p,12,5+b,18,5+b,'d5b580');
 rect(p,6,14+b,3,3,'e8b38b');px(p,6,15+b,'f6d5ad');
 rect(p,8,11+b,6,5,'627d7b');rect(p,9,12+b,4,2,'d7dfc0');px(p,10,12+b,'fbefca');rect(p,16,11+b,5,5,'627d7b');rect(p,17,12+b,3,2,'d7dfc0');line(p,14,12+b,16,12+b,'d7b378');line(p,21,12+b,23,11+b,'d7b378');
 line(p,10,19+b,14,19+b,'8c6250');px(p,10,18+b,'f6d5ad');rect(p,20,17+b,3,4,'8a7054');
 if(row===2){
  // A three-sigil parchment is held up, never an ungrounded coloured marker.
  line(p,9,25,6,25+(f%2),'426f6c',3);rect(p,4,23+(f%2),4,4,'e8b38b');
  poly(p,[[0,18],[10,19],[11,32],[0,31]],'997855');rect(p,1,19,8,11,'f4deb1');line(p,2,20,7,20,'bf9c6b');
  for(let q=0;q<3;q++){rect(p,2+q*2,24+(f===q?1:0),2,2,['7eb9b0','c99b75','d7bd75'][q]);}line(p,2,28,8,28,'bf9c6b');
 }else if(row===1){
  // Four distinct hammer poses. Frame6 strikes the authored anvil hit point.
  const hand=[[8,23],[7,21],[7,26],[8,24]][f],head=[[3,15],[5,10],[2,29],[2,21]][f];
  line(p,10,25,hand[0],hand[1],'426f6c',4);rect(p,hand[0]-1,hand[1],4,4,'e8b38b');
  line(p,hand[0]+1,hand[1]+1,head[0]+3,head[1]+2,'72543f',2);rect(p,head[0],head[1],7,4,'455c5b');rect(p,head[0],head[1],6,2,'a9b6a1');px(p,head[0]+1,head[1],'e7dfb6');
  if(f===2){px(p,0,27,'f1cf8c');px(p,6,28,'edb96f');px(p,1,24,'e0a76a');}
 }else{
  line(p,9,25,6,30+(f%2),'426f6c',3);rect(p,5,30+(f%2),4,4,'e8b38b');line(p,7,31,4,36,'72543f',2);rect(p,1,35,7,4,'657d78');rect(p,1,35,6,1,'bac6aa');
 }
 copy(atlas,p,f*32,row*48);
}
save('koro',atlas);
const anvil=img(48,32);
oval(anvil,23,29,16,2,'304e47');
poly(anvil,[[15,15],[29,15],[33,28],[29,30],[12,29]],'685344');
poly(anvil,[[17,17],[28,17],[30,28],[15,27]],'a67a4f');line(anvil,19,18,18,26,'d0a370');line(anvil,25,19,27,27,'78563e');
poly(anvil,[[6,10],[37,10],[39,16],[30,20],[14,20],[10,16]],'3e5b59');
poly(anvil,[[0,11],[8,8],[33,8],[44,11],[38,15],[8,15]],'81988b');
poly(anvil,[[3,11],[10,9],[32,9],[40,11],[35,13],[9,13]],'bec7a9');
line(anvil,9,14,35,14,'d5d5af');rect(anvil,15,15,13,2,'607a70');rect(anvil,30,10,3,2,'48665c');px(anvil,22,10,'ede6bb');
save('anvil',anvil);
console.log('Original Koro: idle, forging and recipe atlases (12 frames) + grounded anvil; provisional art');
