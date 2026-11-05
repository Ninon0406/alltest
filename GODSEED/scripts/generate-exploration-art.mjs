// Original GODSEED source-pixel drawings, extending the established jade/cream palette.
// No downloaded art. Separate outputs preserve every previous sprite and stage.
import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const out=fileURLToPath(new URL('../public/assets/art-v3/',import.meta.url));mkdirSync(out,{recursive:true});
const W=480,H=270,colors=new Map();
const image=(width=W,height=H)=>new PNG({width,height});
function rgb(c){if(!colors.has(c))colors.set(c,c.match(/../g).map(v=>parseInt(v,16)));return colors.get(c);}
function pixel(p,x,y,c,a=255){x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=p.width||y>=p.height)return;const i=(y*p.width+x)*4,v=rgb(c);p.data[i]=v[0];p.data[i+1]=v[1];p.data[i+2]=v[2];p.data[i+3]=a;}
function rect(p,x,y,w,h,c,a=255){for(let yy=Math.round(y);yy<Math.round(y+h);yy++)for(let xx=Math.round(x);xx<Math.round(x+w);xx++)pixel(p,xx,yy,c,a);}
function oval(p,cx,cy,rx,ry,c,a=255){for(let y=Math.ceil(cy-ry);y<=cy+ry;y++)for(let x=Math.ceil(cx-rx);x<=cx+rx;x++)if(((x-cx)/rx)**2+((y-cy)/ry)**2<=1)pixel(p,x,y,c,a);}
function line(p,x,y,ex,ey,c,w=1,a=255){x=Math.round(x);y=Math.round(y);ex=Math.round(ex);ey=Math.round(ey);const dx=Math.abs(ex-x),dy=-Math.abs(ey-y),sx=x<ex?1:-1,sy=y<ey?1:-1;let e=dx+dy;for(;;){rect(p,x,y,w,w,c,a);if(x===ex&&y===ey)break;const n=e*2;if(n>=dy){e+=dy;x+=sx;}if(n<=dx){e+=dx;y+=sy;}}}
function poly(p,points,c,a=255){for(let y=Math.floor(Math.min(...points.map(q=>q[1])));y<=Math.max(...points.map(q=>q[1]));y++){const xs=[];for(let i=0;i<points.length;i++){const p1=points[i],p2=points[(i+1)%points.length];if((p1[1]<=y&&p2[1]>y)||(p2[1]<=y&&p1[1]>y))xs.push(p1[0]+(y-p1[1])*(p2[0]-p1[0])/(p2[1]-p1[1]));}xs.sort((a,b)=>a-b);for(let i=0;i+1<xs.length;i+=2)rect(p,Math.ceil(xs[i]),y,Math.floor(xs[i+1])-Math.ceil(xs[i])+1,1,c,a);}}
function hash(x,y,s=0){let n=(Math.imul(x+71,374761393)+Math.imul(y+19,668265263)+Math.imul(s+1,1274126177))|0;n=Math.imul(n^(n>>>13),1274126177);return(n^(n>>>16))>>>0;}
function copy(target,source,x=0,y=0){for(let yy=0;yy<source.height;yy++)for(let xx=0;xx<source.width;xx++){const i=(yy*source.width+xx)*4,j=((yy+y)*target.width+xx+x)*4;if(!source.data[i+3])continue;const a=source.data[i+3]/255,b=target.data[j+3]/255,alpha=a+b*(1-a);for(let q=0;q<3;q++)target.data[j+q]=Math.round((source.data[i+q]*a+target.data[j+q]*b*(1-a))/alpha);target.data[j+3]=Math.round(alpha*255);}}
const save=(name,p)=>writeFileSync(out+name+'.png',PNG.sync.write(p,{colorType:6}));
function star(p,x,y,c='eee0ab'){line(p,x-3,y,x+3,y,c);line(p,x,y-4,x,y+4,c);pixel(p,x,y,'fff1ce');}
function stone(p,x,y,rx=14){oval(p,x,y,rx,6,'577e70');poly(p,[[x-rx,y-2],[x-rx+4,y-10],[x+rx-4,y-12],[x+rx,y-3]],'94ae98');line(p,x-rx+6,y-8,x+5,y-9,'bfccad');rect(p,x-6,y-12,11,2,'6f9d77');}
function bush(p,x,y,r=24){oval(p,x,y,r,14,'426e5d');oval(p,x-8,y-5,r*.7,12,'659e74');oval(p,x+8,y-8,r*.65,10,'87b67f');for(let i=0;i<12;i++)rect(p,x-r+4+hash(i,x)%Math.max(1,r*2-8),y-10+hash(y,i)%15,3,1,i%2?'a3c78d':'79ac78');}
function tree(p,x,y,h){poly(p,[[x-7,y],[x-5,y-h*.7],[x+3,y-h*.8],[x+9,y],[x+18,y+3],[x-16,y+4]],'586e56');rect(p,x,y-h*.6,3,h*.6,'9c9b6a');for(const [dx,dy,s] of [[0,-.69,.35],[-.2,-.48,.32],[.2,-.5,.33],[0,-.42,.34]]){oval(p,x+h*dx,y+h*dy,h*s,h*.25,'457f65');oval(p,x+h*dx-4,y+h*dy-7,h*s*.88,h*.21,'6ba579');oval(p,x+h*dx-7,y+h*dy-15,h*s*.55,h*.13,'97c18a');}for(let i=0;i<28;i++)rect(p,x-h*.3+hash(i,x)%Math.floor(h*.6),y-h*.85+hash(x,i)%Math.floor(h*.5),4,2,'b0ce93');}
function books(p,x,y,w,h,seed){rect(p,x,y,w,h,'5b5c50');for(let yy=y+h-2;yy>=y+15;yy-=29){rect(p,x-3,yy,w+6,4,'c49d6b');rect(p,x-1,yy+4,w+2,2,'6e604a');for(let xx=x+4;xx<x+w-7;){const n=hash(xx,yy,seed),bw=5+n%5,bh=12+(n>>>4)%10;rect(p,xx,yy-bh,bw,bh,['a2b5ad','bd9dba','96b5ac','d8bc8c','8aa6b0'][n%5]);rect(p,xx+1,yy-bh+2,1,bh-3,'ddcfa8');rect(p,xx,yy-4,bw,1,'d9c89e');xx+=bw+3;}}rect(p,x-5,y-3,6,h+6,'997956');rect(p,x+w,y-3,6,h+6,'997956');rect(p,x-7,y-5,w+14,5,'c6a071');}
function archiveRear(){
 const p=image();rect(p,0,0,W,170,'626f70');
 for(let y=0;y<167;y+=18)for(let x=0;x<W;x+=32){rect(p,x-(y/18%2)*16,y,31,17,hash(x,y)%3?'7d8780':'899285');rect(p,x+1,y+1,28,1,'a4aa91');}
 rect(p,0,12,W,8,'826f54');rect(p,0,13,W,2,'d3b480');
 books(p,22,37,107,111,2);books(p,351,37,105,111,5);
 // Star-clock window, recessed within the central arch.
 oval(p,240,82,65,65,'5b686b');rect(p,175,81,131,73,'5b686b');oval(p,240,79,57,58,'c8b891');rect(p,183,79,115,69,'c8b891');
 oval(p,240,77,51,51,'8daeb6');rect(p,190,77,101,65,'8daeb6');
 for(let i=0;i<17;i++)star(p,201+hash(i,1)%79,38+hash(i,9)%90,i%3?'c8d3bc':'eddfa7');
 line(p,240,25,240,141,'dfc892',3);line(p,190,80,289,80,'dfc892',3);
 oval(p,240,77,31,31,'597d84');oval(p,240,77,28,28,'a9bab2');oval(p,240,77,25,25,'77979d');
 for(let i=0;i<12;i++){const t=i*Math.PI/6;rect(p,239+Math.cos(t)*22,76+Math.sin(t)*22,2,2,'e8d8a5');}
 line(p,240,77,240,59,'f1d89e',2);line(p,240,77,254,84,'f1d89e',2);oval(p,240,77,3,3,'ead3a0');
 rect(p,176,143,128,5,'d6bb8b');rect(p,182,148,117,4,'9a8567');
 // Open map on a rear reading lectern, deliberately above the actor lane.
 poly(p,[[192,159],[202,134],[272,134],[285,159]],'735f4c');poly(p,[[197,155],[206,138],[268,138],[279,155]],'e0d3a4');line(p,239,139,238,153,'b69d76');
 line(p,210,143,225,148,'88aa98');line(p,225,148,233,143,'88aa98');star(p,254,147,'b8a6c4');
 for(const x of [148,324]){rect(p,x,37,5,119,'b19c76');rect(p,x-4,35,13,5,'dbc08a');rect(p,x-4,155,13,5,'a7a080');}
 return p;
}
function archiveGround(){
 const p=image();rect(p,0,160,W,110,'b5aa88');
 for(let y=160;y<270;y+=16)for(let x=-24;x<W;x+=32){const dx=x+((y-160)/16%2)*16;rect(p,dx,y,31,15,hash(x,y)%3?'c5b795':'bbaa8b');rect(p,dx+2,y+1,27,1,'d6c8a4');rect(p,dx+4,y+13,22,1,'a99a7e');}
 poly(p,[[107,193],[373,193],[396,267],[83,267]],'777991');poly(p,[[113,197],[367,197],[389,263],[91,263]],'b6a5be');poly(p,[[119,201],[361,201],[379,258],[102,258]],'8f92a7');
 for(let x=123;x<357;x+=18){rect(p,x,203,5,2,'d8c8a5');rect(p,x-3,253,5,2,'d8c8a5');}
 poly(p,[[239,215],[245,225],[258,229],[246,234],[239,246],[233,234],[220,229],[233,225]],'c2c5b1');
 return p;
}
function archiveFront(){const p=image();books(p,-34,223,61,47,4);books(p,455,228,57,42,9);return p;}
function streamRear(){
 const p=image();for(let y=0;y<170;y++)rect(p,0,y,W,1,['a4ced1','b9d9d0','d0e2ce','dce8ce'][Math.min(3,Math.floor(y/44))]);
 oval(p,385,35,16,16,'f7e1a7');for(let x=0;x<W;x++){const y=100+Math.round(Math.sin(x/54)*8);rect(p,x,y,1,70,'a6c6af');const near=119+Math.round(Math.cos(x/38)*9);rect(p,x,near,1,170-near,'89b79a');}
 tree(p,13,156,150);tree(p,461,156,147);for(let x=35;x<445;x+=51)bush(p,x,145,28);
 // Waterfall and distant moss steps behind the bridge.
 poly(p,[[188,123],[207,123],[208,165],[176,165]],'77bab1');for(let x=187;x<204;x+=4)line(p,x,127,x-6,161,'bcdfce');
 for(let i=0;i<8;i++)stone(p,199+i*19,145+(i%2)*4,12);
 // Gently arched timber bridge with open rails; feet remain on the near bank.
 poly(p,[[273,165],[305,151],[354,151],[388,165],[387,175],[274,175]],'8c7352');
 for(let x=277;x<386;x+=9){const y=157+Math.round(((x-330)/57)**2*9);rect(p,x,y,8,8,'c3a16e');rect(p,x,y,8,1,'ead0a0');}
 for(const x of [278,311,350,384]){rect(p,x,133,4,40,'876a4e');rect(p,x+1,134,1,34,'c9a270');}
 line(p,278,136,311,129,'a98258',3);line(p,311,129,350,129,'a98258',3);line(p,350,129,386,138,'a98258',3);
 line(p,278,150,311,143,'c4a174',2);line(p,311,143,350,143,'c4a174',2);line(p,350,143,386,152,'c4a174',2);
 return p;
}
function streamGround(){
 const p=image();for(let y=160;y<270;y++)for(let x=0;x<W;x++){const n=hash(x>>1,y>>1)%100;pixel(p,x,y,n<9?'a0c58b':n<18?'78a77b':'8bb780');}
 // Broad upper stream leaves a continuous earthen actor path along the bottom.
 poly(p,[[0,160],[120,154],[191,163],[272,169],[362,161],[480,157],[480,190],[394,192],[312,184],[218,193],[135,183],[0,193]],'73b6aa');
 for(let y=162;y<191;y+=5)for(let x=0;x<W;x+=13){const n=hash(x,y)%5;if(n)line(p,x,y,x+4+n,y,n%2?'b8d8bd':'8ac6b6');}
 poly(p,[[0,192],[124,183],[224,192],[313,184],[398,192],[480,188],[480,200],[394,203],[314,197],[222,205],[122,196],[0,204]],'b8c79a');
 for(let x=13;x<W;x+=43)stone(p,x,195+(x%3)*2,12);
 poly(p,[[101,218],[163,205],[238,210],[306,206],[380,217],[480,220],[480,258],[369,250],[308,241],[235,245],[166,239],[93,249],[0,251],[0,223]],'c1ab80');
 for(let i=0;i<185;i++){const x=hash(i,6)%480,y=205+hash(i,8)%64;if(y>222&&x>94&&x<381){if(i%4===0)rect(p,x,y,2,1,'dbc598');}else if(i%3===0){rect(p,x,y,1,3,'5e956e');rect(p,x+1,y-1,1,2,'b6cc91');}}
 return p;
}
function streamFront(){const p=image();for(const x of [-8,22,467,492])bush(p,x,272,28);for(const x of [3,36,446,473]){line(p,x,268,x-2,248,'497c62');line(p,x,263,x+7,250,'497c62');oval(p,x+5,252,5,2,'8caf7b');}return p;}
const layers={archive:[archiveRear(),archiveGround(),archiveFront()],stream:[streamRear(),streamGround(),streamFront()]};
for(const [name,parts] of Object.entries(layers)){const merged=image();parts.forEach((p,i)=>{save(name+'-'+['rear','ground','front'][i],p);copy(merged,p);});save(name+'-fallback',merged);}
const mist=image();for(const [x,y,rx,ry] of [[312,150,44,16],[352,154,49,17],[283,163,28,10],[393,165,25,8]]){oval(mist,x,y,rx,ry,'dbe3d4',105);oval(mist,x-4,y-4,rx*.75,ry*.7,'eceddc',90);}save('stream-mist',mist);
const water=image(192,32);for(let f=0;f<6;f++){const p=image(32,32);const r=7+f;for(let x=-r;x<=r;x++){const y=17+Math.round(Math.sqrt(Math.max(0,1-(x/r)**2))*3);pixel(p,16+x,y,'d5e6c9',220-f*24);if(x%4===f%4)pixel(p,16+x,y-5,'f2edcd',160);}copy(water,p,f*32,0);}save('water',water);

function eira(frame,talk=false){
 const p=image(32,48),bob=frame===1?-1:0;
 // Long lavender coat, book cradle, side braid, spectacles and warm pixel highlights.
 oval(p,16,14+bob,8,9,'354651');oval(p,16,12+bob,7,8,'595165');oval(p,10,8+bob,3,4,'81728b');
 poly(p,[[9,22+bob],[22,22+bob],[26,43],[7,43]],'354651');poly(p,[[10,23+bob],[21,23+bob],[24,41],[9,41]],'9c91bb');poly(p,[[11,23+bob],[16,26+bob],[14,41],[10,41]],'c4b3d0');poly(p,[[19,25],[22,30],[24,40],[18,41]],'7e7f9e');
 rect(p,11,42,5,3,'46525a');rect(p,20,42,5,3,'46525a');rect(p,11,42,3,1,'a6a0b1');
 oval(p,17,15+bob,6,7,'deb99d');poly(p,[[10,14+bob],[12,7+bob],[21,7+bob],[23,14+bob],[18,10+bob]],'595165');line(p,11,14+bob,11,29+bob,'8b7c95',3);line(p,11,19+bob,12,30+bob,'c4b5ca');
 for(const x of [14,21]){oval(p,x,16+bob,3,3,'4e626b');oval(p,x,16+bob,2,2,'c4d8cf');pixel(p,x,17+bob,frame===3?'c4d8cf':'344d59');}line(p,17,16+bob,18,16+bob,'4e626b');
 pixel(p,18,20+bob,talk&&frame%2?'735f62':'b5837c');
 line(p,10,27+bob,10,34,'354651',4);line(p,11,27+bob,11,33,'b5a1c3',2);
 const reach=talk?[0,1,3,1][frame]:0;line(p,23,27+bob,26+reach,29-bob,'354651',4);rect(p,26+reach,28-bob,3,3,'ebc4a4');
 poly(p,[[11,30],[19,28],[25,30],[24,37],[17,35],[11,37]],'485c63');poly(p,[[12,30],[18,29],[23,31],[23,35],[17,34],[12,36]],'e6d3a3');line(p,18,30,17,34,'ad9471');
 return p;
}
function wisp(frame,pose='idle'){
 const p=image(32,48),sway=[0,-1,0,1][frame],lift=pose==='attack'?-2:0;
 // A water-drop body and ribbon fins, visibly different from the round seed creatures.
 const ink='3b6878',aqua=pose==='hit'?'d4ded0':'8acbbb';
 poly(p,[[16+sway,6+lift],[9,17+lift],[8,27+lift],[13,35+lift],[21,34+lift],[25,26+lift],[23,18+lift]],ink);
 poly(p,[[16+sway,9+lift],[11,18+lift],[11,26+lift],[15,32+lift],[20,31+lift],[22,25+lift],[21,18+lift]],aqua);
 poly(p,[[15,13+lift],[12,21+lift],[14,28+lift],[17,29+lift],[16,20+lift]],'c5e5ce');
 poly(p,[[10,22+lift],[3,18+sway],[5,26+lift],[10,29+lift]],ink);line(p,5,21+sway,9,25+lift,'a4dbcc');
 poly(p,[[23,22+lift],[29,18-sway],[28,27+lift],[23,29+lift]],ink);line(p,27,21-sway,24,25+lift,'b5e3ce');
 rect(p,13,23+lift,2,3,'395966');rect(p,20,23+lift,2,3,'395966');pixel(p,13,23+lift,'e8edda');pixel(p,20,23+lift,'e8edda');
 line(p,15,28+lift,18,28+lift,'5f9c9f');
 poly(p,[[14,33+lift],[19,33+lift],[23+sway,39],[19,42],[12,40],[8,43],[9,38]],ink);line(p,14,35+lift,17,39,'9ed8c5',2);line(p,12,40,8,42,'c0e3c9');
 if(pose==='attack'){star(p,6+frame*5,7+(frame%2)*3,'b9e2d1');rect(p,24-frame,35,2,3,'d8ebd6');}
 if(pose==='hit'){pixel(p,5+frame*3,13,'f5e2b0');pixel(p,27-frame,8+frame*3,'f5e2b0');}
 return p;
}
const scholar=image(256,96);for(let f=0;f<4;f++){copy(scholar,eira(f),f*32,0);copy(scholar,eira(f,true),f*32,48);}save('eira',scholar);
const spirit=image(256,144);for(let f=0;f<4;f++){copy(spirit,wisp(f),f*32,0);copy(spirit,wisp(f,'attack'),f*32,48);}for(let f=0;f<3;f++)copy(spirit,wisp(f,'hit'),f*32,96);save('wisp',spirit);
console.log('Generated 12 original exploration PNGs: two layered stages/fallbacks, mist, six water frames, Eira and water spirit.');
