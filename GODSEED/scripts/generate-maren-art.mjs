import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

// GODSEED original source-pixel drawings. No photographs, external packs or legacy assets.
// Integer raster primitives and a coordinate hash keep exports byte-for-byte reproducible.
const output=fileURLToPath(new URL('../public/assets/art-v8/',import.meta.url));
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

// Original Maren: silver bun, peach shawl, long plum skirt. Feet remain row44.
const atlas=image(128,96);
for(let action=0;action<2;action++)for(let f=0;f<4;f++){
 const p=image(32,48),bob=f===1?-1:0;
 ellipse(p,11,43,4,1,'4b4f49');ellipse(p,20,43,4,1,'4b4f49');
 poly(p,[[11,24],[21,24],[25,42],[7,42]],'68566d');poly(p,[[12,26],[20,25],[22,41],[10,41]],'9b8198');line(p,14,31,12,40,'c0a2ad');
 poly(p,[[9,21+bob],[22,21+bob],[25,31],[19,35],[9,31],[6,26]],'ad807c');
 poly(p,[[10,22+bob],[21,22+bob],[23,29],[18,32],[10,29],[8,25]],'edb6a1');line(p,12,24,20,29,'f5d2b4',2);line(p,9,28,17,32,'c38c8d');
 const handY=action?25+(f%2):31;
 line(p,9,25,6,handY,'a97572',3);rect(p,5,handY,4,3,'e9bc93');pixel(p,5,handY,'f7d2a7');
 line(p,22,25,23,30,'a97572',3);rect(p,21,30,4,3,'e9bc93');
 ellipse(p,16,13+bob,10,10,'5f6565');ellipse(p,16,13+bob,8,9,'e9bc93');
 ellipse(p,23,5+bob,5,4,'879b99');ellipse(p,22,4+bob,3,2,'d9dfc9');
 poly(p,[[6,12+bob],[8,6+bob],[14,3+bob],[22,5+bob],[25,11+bob],[21,12+bob],[18,8+bob],[10,9+bob],[9,16+bob]],'a4b6ae');
 line(p,10,6+bob,16,5+bob,'e4e5cf',2);line(p,20,7+bob,23,11+bob,'d3d9c1');
 // West profile and a gentle smile/closed humming mouth.
 rect(p,7,15+bob,2,2,'c69778');pixel(p,6,16+bob,'e9bc93');
 if(action||f===3)line(p,10,13+bob,13,13+bob,'566264');else{pixel(p,10,13+bob,'314e50');pixel(p,11,13+bob,'f5e6ba');}
 line(p,10,19+bob,12,19+bob,action&&f%2?'a97572':'876765');pixel(p,9,17+bob,'edb6a1');
 if(action){const nx=2+(f%2),ny=7+(f%3);line(p,nx,ny,nx,ny+4,'f3ce88');line(p,nx,ny,nx+3,ny+1,'f3ce88');ellipse(p,nx-1,ny+4,1,1,'f3ce88');}
 copy(atlas,p,f*32,action*48);
}
save('maren',atlas);console.log('Original Maren idle and humming: eight32x48frames, 4columns; no external art');
