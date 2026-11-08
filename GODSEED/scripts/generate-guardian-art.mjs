// Original carved reliquary: floating arch, open memory chamber and articulated
// stone hands. Integer pixels; no reference/copyrighted sprite pixels are read.
import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const p=new PNG({width:256,height:256});
function px(x,y,c){x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=256||y>=256)return;const i=(y*256+x)*4;for(let n=0;n<3;n++)p.data[i+n]=parseInt(c.slice(n*2,n*2+2),16);p.data[i+3]=255;}
function rect(x,y,w,h,c){for(let a=0;a<w;a++)for(let b=0;b<h;b++)px(x+a,y+b,c);}
function line(x,y,a,b,c,w=1){const n=Math.max(1,Math.ceil(Math.hypot(a-x,b-y)));for(let i=0;i<=n;i++)rect(Math.round(x+(a-x)*i/n),Math.round(y+(b-y)*i/n),w,w,c);}
function oval(x,y,rx,ry,c){for(let b=Math.ceil(y-ry);b<=y+ry;b++)for(let a=Math.ceil(x-rx);a<=x+rx;a++)if(((a-x)/rx)**2+((b-y)/ry)**2<=1)px(a,b,c);}
const stone='8e9c91',shade='566e6b',lit='cbd1b2',gold='d8b878',ink='334e52',light='f4df9e',jade='8dbd9d';
for(let row=0;row<4;row++)for(let f=0;f<4;f++){
 const ox=f*64,oy=row*64,bob=[0,-1,0,1][f],x=ox+32,y=oy+22+bob;
 // Broken arch is its silhouette; asymmetry and hanging stones distinguish it
 // from the smaller intact rune sentinel and the woven Echo Knot.
 oval(x,y,18,19,shade);oval(x,y-1,16,17,stone);oval(x,y,10,12,ink);rect(x-18,y+5,7,17,shade);rect(x+11,y+3,7,17,shade);
 rect(x-16,y+5,4,15,lit);rect(x+12,y+5,3,13,stone);rect(x-18,y+20,8,4,gold);rect(x+11,y+18,8,4,gold);
 line(x-11,y-13,x-7,y-17,lit,2);line(x-5,y-18,x+6,y-18,lit,2);line(x+10,y-15,x+14,y-10,gold,2);
 rect(x-2,y-20,3,7,ink);rect(x+10,y-13,6,2,ink);line(x-16,y-2,x-12,y+4,shade);
 // A small living seed hangs inside an OPEN chamber, never a human face.
 oval(x,y,5,7,jade);oval(x-1,y-2,2,4,light);line(x,y-4,x,y+6,gold);line(x,y+1,x+3,y-2,light);
 const reach=row===1?[0,2,5,1][f]:row===3?3:0;
 for(const side of [-1,1]){const hx=x+side*(23+reach),hy=y+13+(row===2?f%2*2:0);line(x+side*14,y+8,hx,hy,shade,4);rect(hx-3,hy-3,7,8,shade);rect(hx-2,hy-3,5,6,stone);line(hx-2,hy-2,hx+1,hy-2,lit);for(let n=0;n<3;n++)px(hx-2+n*2,hy+3,gold);}
 for(const [dx,dy] of [[-17,-8],[15,-4],[-14,11],[14,10]]){px(x+dx,y+dy,gold);px(x+dx+1,y+dy+2,light);}
 for(let i=0;i<3;i++){const ax=x-10+i*10,ay=y+28+(f+i)%2;rect(ax-3,ay,6,3,shade);rect(ax-2,ay,4,1,lit);px(ax,ay+4,jade);}
 if(row===3){for(let yy=-23;yy<=23;yy++)for(let xx=-25;xx<=25;xx++)if((xx/25)**2+(yy/23)**2<=1&&(xx/23)**2+(yy/21)**2>=1)px(x+xx,y+2+yy,gold); // transparent aura preserves the carved silhouette
  oval(x,y,5,7,jade);oval(x-1,y-2,2,4,light);for(let n=0;n<8;n++){const a=n*Math.PI/4+f*.08;rect(Math.round(x+24*Math.cos(a)),Math.round(y+2+22*Math.sin(a)),2,2,light);}}
 if(row===1)for(let i=0;i<3;i++){const xx=x-8+i*8,yy=y+30+f*2;line(xx,yy-3,xx+2,yy,light);line(xx+2,yy,xx,yy+3,gold);}
 if(row===2){line(x-22,y-17,x-17,y-12,light);line(x+20,y-8,x+24,y-12,light);}
}
const out=fileURLToPath(new URL('../public/assets/art-v16/',import.meta.url));mkdirSync(out,{recursive:true});writeFileSync(out+'guardian.png',PNG.sync.write(p));
