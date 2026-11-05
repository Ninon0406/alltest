import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

// GODSEED original source-pixel drawings. No photographs, external packs or legacy assets.
// Integer raster primitives and a coordinate hash keep exports byte-for-byte reproducible.
const output=fileURLToPath(new URL('../public/assets/art-v7/',import.meta.url));
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

// Three authored states: dry buds, wet soil, opened memory blossoms.
const bed=image(192,48);
for(let f=0;f<3;f++){
 const p=image(64,48);ellipse(p,32,43,31,4,'426f60',65);
 poly(p,[[2,28],[15,19],[61,25],[51,43],[8,40]],'685c49');
 poly(p,[[4,28],[16,22],[58,27],[50,39],[9,37]],f?'706352':'a38a65');
 line(p,3,29,9,39,'d2a16a',2);line(p,9,39,50,42,'a87852',3);line(p,51,41,60,27,'d2a16a',2);
 for(let i=0;i<26;i++){const x=12+hash(i,2)%40,y=28+hash(i,9)%9;pixel(p,x,y,f?'958367':'bea57a');}
 for(const [i,x,y] of [[0,13,29],[1,26,26],[2,40,29],[3,51,31],[4,24,36],[5,39,37]]){
  const top=y-(f===2?15:11);line(p,x,y,x,top,'426f60');line(p,x+1,y-1,x+1,top,'6ea67b');
  ellipse(p,x-3,y-6,4,2,'6ea67b');ellipse(p,x+4,y-9,4,2,'a9ca88');
  if(f===2){const c=i%2?'bba2cc':'f0baaf';ellipse(p,x-2,top,3,2,c);ellipse(p,x+2,top,3,2,c);ellipse(p,x,top-2,2,3,c);ellipse(p,x,top+2,2,2,c);pixel(p,x,top,'ffe6a4');}
  else{ellipse(p,x,top,2,3,'8ba888');pixel(p,x,top-1,'bba2cc');}
 }
 if(f===1)for(let i=0;i<7;i++)pixel(p,15+i*5,34+(i%2)*2,'9ad8d0');
 copy(bed,p,f*64,0);
}
save('garden-bed',bed);
// Original east profile reused at 1:1 source pixels. New arms, copper can,
// tipping spout and droplets are authored here; planted soles remain at row44.
const idle=PNG.sync.read(readFileSync(fileURLToPath(new URL('../public/assets/art-v5/hero-idle.png',import.meta.url))));
const hero=image(256,48);
for(let f=0;f<4;f++){
 const p=image(64,48);
 for(let y=0;y<48;y++)for(let x=0;x<32;x++){const i=(y*idle.width+x)*4+48*idle.width*4*2;idle.data.copy(p.data,(y*64+x+16)*4,i,i+4);}
 // Remove the idle near hand and replace it with an extended sleeve and grip.
 for(let y=28;y<38;y++)for(let x=39;x<45;x++)p.data.fill(0,(y*64+x)*4,(y*64+x+1)*4);
 line(p,39,26,44,29,'263c49',4);line(p,40,27,44,29,'4b9b8b',2);
 ellipse(p,46,28,5,5,'6a5946');ellipse(p,46,28,3,3,'a9ca88');
 const tilt=f===1||f===2;
 poly(p,tilt?[[44,28],[53,25],[57,33],[47,37]]:[[43,29],[54,29],[54,38],[43,38]],'685c49');
 poly(p,tilt?[[45,29],[52,27],[55,33],[48,35]]:[[44,30],[52,30],[52,36],[44,36]],'b98758');
 line(p,46,30,49,34,'e0b17a',2);line(p,52,31,58,tilt?32:27,'685c49',3);line(p,53,31,58,tilt?32:27,'d2a16a');
 ellipse(p,59,tilt?32:27,2,2,'d2a16a');rect(p,44,28,3,3,'e9bc93');
 if(tilt)for(let i=0;i<4;i++){const y=34+i*2+(f===2?1:0),x=59+Math.min(3,i);line(p,x,y,x,y+1,'83c8ce');pixel(p,x,y,'d5eee0');}
 copy(hero,p,f*64,0);
}
save('hero-water',hero);
console.log('Original garden bed 3x64x48 and held-can watering 4x64x48; same pixel grid/feet');
