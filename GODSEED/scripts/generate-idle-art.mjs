/** Original GODSEED 32x48 pixel drawings. Four authored views, not rotated
 * or resized sprites. Older sheets stay byte-for-byte intact. Prototype art. */
import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const palette={o:'263c49',hair:'293e49',hairL:'526c70',jD:'31746e',j:'4b9b8b',jL:'89c7ad',jP:'bbdfbf',cD:'c8b38e',c:'f1ddb0',cL:'fff0ca',sD:'c69778',s:'e9bc93',sL:'f7d2a7',n:'344d61',nL:'4c6878',lD:'57493e',l:'86654a',gold:'dfaa69'};
const rgb=Object.fromEntries(Object.entries(palette).map(([k,v])=>[k,v.match(/../g).map(n=>parseInt(n,16))]));
function pixel(p,x,y,color){x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=p.width||y>=p.height)return;const i=(y*p.width+x)*4;p.data.set([...rgb[color],255],i);}
function rect(p,x,y,w,h,c){for(let yy=Math.round(y);yy<Math.round(y+h);yy++)for(let xx=Math.round(x);xx<Math.round(x+w);xx++)pixel(p,xx,yy,c);}
function line(p,x,y,x2,y2,c,w=1){const steps=Math.max(Math.abs(x2-x),Math.abs(y2-y),1);for(let i=0;i<=steps;i++)rect(p,x+(x2-x)*i/steps,y+(y2-y)*i/steps,w,w,c);}
function poly(p,pts,c){for(let y=Math.min(...pts.map(v=>v[1]));y<=Math.max(...pts.map(v=>v[1]));y++){const xs=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))xs.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]));}xs.sort((a,b)=>a-b);for(let i=0;i+1<xs.length;i+=2)for(let x=Math.ceil(xs[i]);x<=Math.floor(xs[i+1]);x++)pixel(p,x,y,c);}}
function limb(p,pts,c,w=5){for(let i=1;i<pts.length;i++){line(p,...pts[i-1],...pts[i],'o',w);line(p,pts[i-1][0]+1,pts[i-1][1]+1,pts[i][0]+1,pts[i][1]+1,c,w-2);}}
function boot(p,x,y,dir){rect(p,x-2,y-3,5,4,'o');rect(p,x-1,y-2,3,2,'l');rect(p,x-2+(dir<0?-2:0),y,7,2,'o');pixel(p,x,y-2,'gold');}
function hand(p,x,y){rect(p,x-1,y-1,4,4,'o');rect(p,x,y-1,3,3,'s');pixel(p,x,y-1,'sL');}
function draw(direction,frame){
 const p=new PNG({width:32,height:48}),vertical=direction==='south'||direction==='north',back=direction==='north',side=direction==='west'?-1:1;
 const stride=0,bob=frame===1?-1:0;
 // Soles remain at ground row44; the moving boot lifts, the planted boot stays.
 const aY=43-(stride>0?2:0),bY=43-(stride<0?2:0);
 if(vertical){
  limb(p,[[11,33],[11-stride/2,37],[11-stride/2,aY-3]],'n');boot(p,11-stride/2,aY,1);
  limb(p,[[19,33],[19+stride/2,37],[19+stride/2,bY-3]],'nL');boot(p,19+stride/2,bY,-1);
 }else{
  limb(p,[[13,32],[13-stride/2,37],[13-stride,aY-3]],'n');boot(p,13-stride,aY,side);
  limb(p,[[18,32],[18+stride/2,37],[18+stride,bY-3]],'nL');boot(p,18+stride,bY,side);
 }
 // Scarf tails and tailored coat use the established jade/cream palette.
 poly(p,[[10,23+bob],[6-(vertical?0:side),26+bob],[5,33+bob],[12,35+bob],[19,29+bob]],'o');
 poly(p,[[10,24+bob],[8,27+bob],[7,32+bob],[12,33+bob],[17,29+bob]],'jD');
 poly(p,[[10,23+bob],[21,23+bob],[24,29+bob],[23,35+bob],[18,37+bob],[9,35+bob],[8,28+bob]],'o');
 poly(p,[[11,24+bob],[20,24+bob],[22,29+bob],[21,34+bob],[11,34+bob],[10,28+bob]],'j');
 rect(p,11,26+bob,3,7,'jL');rect(p,20,27+bob,2,7,'jD');
 rect(p,10,34+bob,13,3,'lD');rect(p,11,34+bob,11,1,'l');rect(p,17,34+bob,3,2,'gold');
 const leftArm=[[8,25+bob],[6,29+stride/2],[7,33+stride/2]],rightArm=[[23,25+bob],[25,29-stride/2],[24,33-stride/2]];
 limb(p,leftArm,'jD',4);hand(p,...leftArm[2]);limb(p,rightArm,'j',4);hand(p,...rightArm[2]);
 // Satchel stays on the character's same body side when the view changes.
 if(back){line(p,20,24+bob,11,34+bob,'lD',2);line(p,21,24+bob,12,34+bob,'cD');rect(p,19,29+bob,5,6,'o');rect(p,20,30+bob,4,4,'l');}
 else{line(p,11,24+bob,21,34+bob,'lD',2);line(p,12,24+bob,22,34+bob,'cD');rect(p,8,30+bob,5,6,'o');rect(p,9,31+bob,4,4,'l');}
 // Heads are independently drawn front/back/profile silhouettes.
 if(vertical){
  poly(p,[[8,9+bob],[10,5+bob],[15,5+bob],[16,4+bob],[22,6+bob],[25,10+bob],[25,17+bob],[22,22+bob],[11,22+bob],[8,18+bob],[7,13+bob]],'o');
  poly(p,[[10,9+bob],[12,6+bob],[21,7+bob],[23,11+bob],[23,18+bob],[21,21+bob],[12,20+bob],[9,17+bob]],back?'hair':'s');
  if(back){
   poly(p,[[9,9+bob],[11,6+bob],[16,5+bob],[22,7+bob],[24,11+bob],[23,19+bob],[20,23+bob],[11,21+bob],[8,16+bob]],'hair');
   line(p,11,9+bob,16,7+bob,'hairL');line(p,19,9+bob,22,12+bob,'hairL');rect(p,12,16+bob,2,5,'hairL');rect(p,19,20+bob,2,4,'hair');
  }else{
   rect(p,11,10+bob,10,2,'sL');rect(p,12,20+bob,9,1,'sD');
   poly(p,[[9,10+bob],[11,6+bob],[17,5+bob],[23,8+bob],[24,12+bob],[21,11+bob],[19,9+bob],[16,11+bob],[13,10+bob],[11,15+bob],[9,15+bob]],'hair');
   line(p,12,8+bob,17,7+bob,'hairL');rect(p,12,14+bob,2,3,'o');rect(p,20,14+bob,2,3,'o');pixel(p,13,14+bob,'cL');pixel(p,21,14+bob,'cL');line(p,16,20+bob,18,20+bob,'lD');pixel(p,17,18+bob,'sD');
  }
 }else{
  // Profile uses a stepped nose on the facing side and a visible far ear.
  const x=side>0?0:-1;
  poly(p,[[10+x,7+bob],[14+x,5+bob],[20+x,6+bob],[23+x,9+bob],[23+x,13+bob],[25+x,15+bob],[24+x,18+bob],[22+x,21+bob],[13+x,22+bob],[9+x,18+bob],[8+x,11+bob]],'o');
  if(side>0){
   poly(p,[[14,9+bob],[21,9+bob],[22,14+bob],[24,15+bob],[22,18+bob],[20,21+bob],[14,20+bob],[12,16+bob]],'s');
   rect(p,17,11+bob,5,2,'sL');rect(p,19,14+bob,2,3,'o');pixel(p,20,14+bob,'cL');line(p,21,19+bob,23,19+bob,'lD');
   poly(p,[[9,10+bob],[11,6+bob],[17,5+bob],[22,7+bob],[23,11+bob],[20,10+bob],[17,9+bob],[15,13+bob],[12,13+bob],[12,19+bob],[9,17+bob]],'hair');line(p,12,8+bob,17,7+bob,'hairL');rect(p,11,15+bob,3,4,'sD');
  }else{
   // Asymmetric west hair/ear/nose are authored on the left, not a rotated head.
   poly(p,[[10,10+bob],[17,9+bob],[20,13+bob],[20,19+bob],[15,21+bob],[9,19+bob],[8,16+bob],[6,15+bob],[9,13+bob]],'s');
   // Cover the old right-facing outline's tip with rear hair, add west nose.
   rect(p,20,12+bob,4,7,'hair');rect(p,6,14+bob,3,3,'o');rect(p,7,14+bob,3,2,'s');
   rect(p,10,14+bob,2,3,'o');pixel(p,10,14+bob,'cL');line(p,8,19+bob,11,19+bob,'lD');
   poly(p,[[8,10+bob],[10,6+bob],[16,5+bob],[21,8+bob],[22,12+bob],[20,20+bob],[17,20+bob],[17,13+bob],[14,10+bob],[11,11+bob]],'hair');line(p,12,8+bob,17,7+bob,'hairL');rect(p,17,14+bob,3,4,'sD');
  }
 }
 rect(p,12,22+bob,9,3,'o');rect(p,13,22+bob,7,2,'c');line(p,13,24+bob,18,25+bob,'cD');
 return p;
}
const atlas=new PNG({width:96,height:192});
for(const [row,direction] of ['south','west','east','north'].entries())for(let frame=0;frame<3;frame++){
 const cell=draw(direction,frame);
 for(let y=0;y<48;y++)for(let x=0;x<32;x++)cell.data.copy(atlas.data,((row*48+y)*96+frame*32+x)*4,(y*32+x)*4,(y*32+x+1)*4);
}
const folder=resolve(dirname(fileURLToPath(import.meta.url)),'../public/assets/art-v5');mkdirSync(folder,{recursive:true});
writeFileSync(resolve(folder,'hero-idle.png'),PNG.sync.write(atlas));
console.log('hero-idle: 96x192; four grounded 3-frame standing directions');
