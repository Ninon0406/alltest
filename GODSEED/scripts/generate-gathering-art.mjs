import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

// GODSEED original source-pixel drawings. No photographs, external packs or legacy assets.
// Integer raster primitives and a coordinate hash keep exports byte-for-byte reproducible.
const output=fileURLToPath(new URL('../public/assets/art-v6/',import.meta.url));
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

const atlas=image(96,72);
for(let kind=0;kind<3;kind++)for(let f=0;f<4;f++){
 const p=image(24,24);ellipse(p,12,21,9,2,'426f60',65);
 if(kind===0){
  poly(p,[[3,20],[7,11],[16,3],[21,2],[19,10],[12,16]],'344f67');
  poly(p,[[5,18],[9,10],[17,4],[20,3],[17,10],[11,15]],'79bfcf');
  poly(p,[[10,13],[15,5],[19,3],[15,11]],'c0e7db');
  for(let i=0;i<5;i++){line(p,8+i*2,15-i*2,6+i*2,12-i*2,'438ca8');line(p,10+i*2,14-i*2,14+i*2,13-i*2,'a5d8d6');}
  line(p,3,21,19,4,'f1dfb0');
 }else if(kind===1){
  poly(p,[[5,9],[18,8],[20,19],[7,21]],'745c46');poly(p,[[6,10],[17,9],[18,18],[8,19]],'dbc28d');
  rect(p,7,8,9,3,'f0dda8');line(p,8,12,16,11,'a78f65');
  ellipse(p,12,15,3,3,'688f63');line(p,12,17,12,12,'c4da9b');
  ellipse(p,19,20,2,1,'e8d8a5');ellipse(p,4,19,2,1,'bd9c6b');
 }else{
  rect(p,7,10,11,9,'446d79');ellipse(p,12,10,5,3,'a4d7ce');ellipse(p,12,18,5,3,'74bfc1');
  rect(p,9,10,7,8,'8cd4cc');rect(p,9,11,2,6,'d2eee0');
  poly(p,[[12,2],[9,6],[12,10],[15,6]],'68bac5');line(p,12,4,11,7,'e1f3da');
 }
 const gx=[20,21,20,19][f],gy=[5,6,7,6][f];pixel(p,gx,gy,'ffedbb');if(f%2===0){pixel(p,gx-1,gy,'d0e7b9');pixel(p,gx,gy-1,'d0e7b9');}
 copy(atlas,p,f*24,kind*24);
}
save('gathering',atlas);console.log('Original gathering atlas: feather, seed pouch, dew; 24x24 cells, four subtle glint frames each');
