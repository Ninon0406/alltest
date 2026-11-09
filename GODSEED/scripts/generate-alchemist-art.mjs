// GODSEED original integer-pixel drawings; no reference pixels or external packs.
import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const out=fileURLToPath(new URL('../public/assets/art-v18/',import.meta.url));mkdirSync(out,{recursive:true});
const im=(w,h)=>new PNG({width:w,height:h});
function px(p,x,y,c){x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=p.width||y>=p.height)return;const i=(y*p.width+x)*4;for(let n=0;n<3;n++)p.data[i+n]=parseInt(c.slice(n*2,n*2+2),16);p.data[i+3]=255;}
function box(p,x,y,w,h,c){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)px(p,i,j,c);}
function oval(p,x,y,rx,ry,c){for(let j=Math.floor(y-ry);j<=y+ry;j++)for(let i=Math.floor(x-rx);i<=x+rx;i++)if(((i-x)/rx)**2+((j-y)/ry)**2<=1)px(p,i,j,c);}
function line(p,x,y,a,b,c,w=1){const n=Math.max(1,Math.ceil(Math.hypot(a-x,b-y)));for(let i=0;i<=n;i++)box(p,Math.round(x+(a-x)*i/n),Math.round(y+(b-y)*i/n),w,w,c);}
function copy(p,q,x,y){for(let j=0;j<q.height;j++)for(let i=0;i<q.width;i++){const k=(j*q.width+i)*4;if(q.data[k+3])q.data.copy(p.data,((y+j)*p.width+x+i)*4,k,k+4);}}
function save(n,p){writeFileSync(out+n+'.png',PNG.sync.write(p,{colorType:6}));}
// Tala: travelling teal coat, auburn tied hair, split trousers, diagonal satchel.
const tala=im(128,144);
for(let row=0;row<3;row++)for(let f=0;f<4;f++){
 const p=im(32,48),b=f===1?-1:0;
 box(p,10,44,7,1,'3e514c');box(p,18,44,7,1,'3e514c');
 box(p,11,33,5,9,'405e62');box(p,18,32,5,10,'405e62');box(p,10,41,7,3,'524d47');box(p,18,41,7,3,'524d47');box(p,11,41,5,1,'a78764');box(p,19,41,4,1,'a78764');
 box(p,9,21+b,16,14,'2c5652');box(p,11,22+b,12,13,'548e82');box(p,13,23+b,7,11,'8bb4a0');box(p,10,33,5,3,'6c9a89');box(p,20,32,5,4,'6c9a89');
 line(p,21,21+b,12,35,'795f49',2);box(p,9,32,8,6,'bd9262');box(p,10,33,6,2,'ecd098');px(p,13,36,'f6e4b8');
 line(p,23,24+b,25,31,'416e65',3);box(p,23,31,4,3,'efc19a');
 const hy=row?24+f%2:30;line(p,10,24+b,6,hy,'416e65',3);box(p,5,hy,4,3,'efc19a');
 oval(p,17,13+b,8,9,'533e39');oval(p,14,14+b,7,8,'edbc92');oval(p,24,14+b,4,8,'795044');oval(p,25,20+b,3,4,'945e46');
 oval(p,16,6+b,8,5,'6f473e');box(p,8,8+b,5,5,'6f473e');box(p,13,7+b,7,2,'a77050');line(p,20,9+b,23,13+b,'a77050');box(p,22,12+b,3,2,'e2bd72');
 px(p,8,16+b,'edbc92');if(f===3)line(p,10,14+b,12,14+b,'314e50');else{px(p,10,14+b,'314e50');px(p,11,14+b,'f8e8bf');}line(p,10,19+b,13,19+b,'a3705b');px(p,9,17+b,'f0b09a');
 box(p,12,22+b,6,2,'ebd6a4');
 if(row){box(p,3,hy-5,6,7,'385d61');box(p,4,hy-4,4,5,'9ecbd1');box(p,5,hy-7,2,3,'d2a16a');box(p,4,hy,4,1,'77b8a1');px(p,4,hy-3,'f4e4b1');}
 if(row===2){box(p,17,27+b,7,6,'e8d9ae');line(p,18,28+b,22,28+b,'8e9277');line(p,18,30+b,21,30+b,'8e9277');}
 copy(tala,p,f*32,row*48);
}
save('tala',tala);
const kit=im(32,48);oval(kit,16,43,13,2,'425c50');box(kit,5,25,23,17,'614e43');box(kit,7,26,19,15,'b18c60');box(kit,9,28,15,10,'cfaa70');line(kit,7,30,25,30,'e6c58e');box(kit,15,31,4,4,'efe0ab');box(kit,16,32,2,2,'6b997f');
for(const [x,h] of [[8,10],[16,14],[23,9]]){box(kit,x,25-h,5,h,'385d61');box(kit,x+1,26-h,3,h-2,'9cc5c2');box(kit,x+1,23-h,3,3,'bd9262');box(kit,x+1,23,3,2,'dce5c1');}
line(kit,5,25,8,20,'d2a16a');line(kit,27,25,24,20,'d2a16a');save('field-kit',kit);
// Three 32px course stages; transparent padding preserves the existing UI atlas contract.
const icons=im(192,32);for(let f=0;f<3;f++){const x=f*32,gold=f===2?'efd38e':f?'c9b47e':'879d8b';oval(icons,x+16,18,10,11,'355a55');oval(icons,x+16,18,8,9,f?'91b7a0':'6c8d7b');box(icons,x+12,5,8,7,'355a55');box(icons,x+13,6,6,5,gold);box(icons,x+12,3,8,3,'8c7057');line(icons,x+10,21,x+21,21,gold,2);line(icons,x+13,17,x+18,17,'e7dfb3');if(f)px(icons,x+10,13,'f4e6ba');if(f===2)for(const [a,b] of [[4,6],[27,12],[24,28]]){line(icons,x+a-1,b,x+a+1,b,gold);line(icons,x+a,b-1,x+a,b+1,gold);}}
save('alchemist-icons',icons);console.log('Original Tala12frames32x48, fieldkit32x48 and3courseglyphs; no external pixels.');
