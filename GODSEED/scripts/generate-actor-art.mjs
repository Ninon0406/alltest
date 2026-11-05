/**
 * GODSEED original actor studies, authored directly on a 32 × 48 pixel grid.
 * No traced/imported artwork, image resizing, nondeterministic noise or AI output.
 * These reproducible prototype sheets still require runtime visual acceptance.
 * Run from any directory: node GODSEED/scripts/generate-actor-art.mjs
 */
import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const destination=resolve(dirname(fileURLToPath(import.meta.url)),'../public/assets/art-v2');
mkdirSync(destination,{recursive:true});
const W=32,H=48,COLUMNS=8;
const palette={
 outline:'263c49',navy:'344d61',navyLight:'4c6878',hair:'293e49',hairLight:'526c70',
 jadeDark:'31746e',jade:'4b9b8b',jadeLight:'89c7ad',jadePale:'bbdfbf',
 creamDark:'c8b38e',cream:'f1ddb0',creamLight:'fff0ca',
 skinDark:'c69778',skin:'e9bc93',skinLight:'f7d2a7',
 leatherDark:'57493e',leather:'86654a',copper:'ac704a',copperLight:'dfaa69',
 glow:'b8ead8',sun:'f8d285',sunLight:'fff0b1',eye:'243c4c',
};
const rgb=Object.fromEntries(Object.entries(palette).map(([key,color])=>[key,color.match(/../g).map(v=>parseInt(v,16))]));

function surface(width,height){return new PNG({width,height});}
function pixel(image,x,y,color){
 x=Math.round(x);y=Math.round(y);
 if(x<0||y<0||x>=image.width||y>=image.height)return;
 const index=(y*image.width+x)*4,value=rgb[color];
 image.data[index]=value[0];image.data[index+1]=value[1];image.data[index+2]=value[2];image.data[index+3]=255;
}
function rect(image,x,y,w,h,color){for(let yy=Math.round(y);yy<Math.round(y+h);yy++)for(let xx=Math.round(x);xx<Math.round(x+w);xx++)pixel(image,xx,yy,color);}
function line(image,a,b,color,width=1){
 let [x,y]=a.map(Math.round);const [x2,y2]=b.map(Math.round),dx=Math.abs(x2-x),dy=-Math.abs(y2-y),sx=x<x2?1:-1,sy=y<y2?1:-1;
 let error=dx+dy;
 for(;;){rect(image,x-Math.floor(width/2),y-Math.floor(width/2),width,width,color);if(x===x2&&y===y2)break;const twice=2*error;if(twice>=dy){error+=dy;x+=sx;}if(twice<=dx){error+=dx;y+=sy;}}
}
function polygon(image,points,color){
 const top=Math.floor(Math.min(...points.map(p=>p[1]))),bottom=Math.ceil(Math.max(...points.map(p=>p[1])));
 for(let y=top;y<=bottom;y++){
  const crossings=[];
  for(let i=0;i<points.length;i++){
   const a=points[i],b=points[(i+1)%points.length];
   if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))crossings.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]));
  }
  crossings.sort((a,b)=>a-b);
  for(let i=0;i+1<crossings.length;i+=2)for(let x=Math.ceil(crossings[i]);x<=Math.floor(crossings[i+1]);x++)pixel(image,x,y,color);
 }
}
function limb(image,points,color='jade',width=5){
 for(let i=0;i<points.length-1;i++)line(image,points[i],points[i+1],'outline',width);
 for(let i=0;i<points.length-1;i++)line(image,points[i],points[i+1],color,width-2);
}
function hand(image,x,y){rect(image,x-2,y-1,4,4,'outline');rect(image,x-1,y-1,3,3,'skin');pixel(image,x-1,y-1,'skinLight');}
function boot(image,x,y,facing=1){
 polygon(image,[[x-2,y-3],[x+1,y-3],[x+1,y-1],[x+3*facing,y-1],[x+3*facing,y+1],[x-2,y+1]],'outline');
 rect(image,x-1,y-2,3,2,'leather');rect(image,x-1,y,4,1,'leatherDark');line(image,[x-2,y+1],[x+2,y+1],'outline');pixel(image,x,y-2,'copperLight');
}
function leg(image,points,color){
 const endpoint=points[points.length-1];
 // Trouser stroke ends inside the boot; its width must not cross ground y=44.
 limb(image,[...points.slice(0,-1),[endpoint[0],endpoint[1]-2]],color);
}

const playerRows=[
 ['idle',4],['walk',6],['run',6],['interact',4],['pick_up',6],['craft',8],
 ['cast',6],['guard',3],['hit',3],['victory',6],['rest',4],
];

function pose(state,frame){
 const p={
  bodyX:0,bodyY:0,headX:0,headY:0,cloak:0,closed:false,
  backArm:[[10,26],[7,30],[8,34]],frontArm:[[23,26],[26,29],[25,34]],
  backLeg:[[13,34],[13,39],[12,43]],frontLeg:[[20,34],[21,39],[22,43]],
  gesture:null,seed:null,brace:false,
 };
 if(state==='idle'){
  p.bodyY=[0,-1,0,0][frame];p.headY=p.bodyY;p.closed=frame===3;
  p.frontArm=[[23,26+p.bodyY],[26,29],[25,34+(frame===2?1:0)]];
 }else if(state==='walk'||state==='run'){
  const running=state==='run',stride=running?[-5,-2,3,6,2,-4]:[-3,-1,2,4,1,-2];
  const s=stride[frame];p.bodyX=running?1:0;p.headX=running?2:0;p.bodyY=frame%3===1?-1:0;p.headY=p.bodyY;
  p.cloak=running?3:1;
  p.backLeg=[[13+p.bodyX,34],[13-s/2,running?37:39],[13-s,43-(s>0?(running?5:2):0)]];
  p.frontLeg=[[20+p.bodyX,34],[20+s/2,running?38:39],[20+s,43-(s<0?(running?5:2):0)]];
  p.backArm=running?[[11,26],[7+s/2,29],[10+s,25]]:[[10,26],[9+s/2,30],[9+s,34]];
  p.frontArm=running?[[24,26],[28-s/2,29],[25-s,24]]:[[23,26],[25-s/2,30],[25-s,34]];
 }else if(state==='interact'){
  const reach=[0,2,4,2][frame];p.headY=frame===2?1:0;
  p.headX=frame===3?-1:0;
  p.frontArm=[[23,26],[26,28],[25+reach,26-frame%2]];
  p.backArm=[[10,26],[8,31],[12,34]];
 }else if(state==='pick_up'){
  const down=[0,3,7,8,5,1][frame];p.bodyY=down;p.headY=down;p.bodyX=frame>0?1:0;p.headX=frame>0?2:0;
  p.backLeg=[[13,34+down],[8,39],[10,43]];p.frontLeg=[[20,34+down],[25,40],[25,43]];
  p.frontArm=[[23,26+down],[26,31+down/2],[27,Math.min(41,35+(frame<4?down:down-3))]];
  p.backArm=[[10,26+down],[8,32+down/2],[12,34+down/2]];
  if(frame>=3)p.seed=[27,frame===3?39:frame===4?35:30];
 }else if(state==='craft'){
  const movement=[0,1,2,1,0,-1,-2,-1][frame];p.headY=1;p.headX=1;
  p.backArm=[[10,26],[10,31],[17+movement,31]];
  p.frontArm=[[23,26],[27,29],[24-movement,32]];p.gesture=[21,28+(frame%3===1?-1:0),frame];
 }else if(state==='cast'){
  const arms=[[[23,26],[24,29],[20,27]],[[23,26],[27,25],[25,21]],[[23,26],[26,21],[25,16]],[[23,26],[28,24],[29,21]],[[23,26],[28,25],[30,23]],[[23,26],[27,28],[27,29]]];
  p.frontArm=arms[frame];p.backArm=[[10,26],[6,30],[5,33]];p.headX=frame>=2?1:0;
  p.frontLeg=[[20,34],[22,39],[25,43]];p.backLeg=[[13,34],[11,39],[9,43]];p.cloak=frame>=2?4:1;
  if(frame>=2&&frame<=4)p.gesture=[frame===2?25:29,frame===2?12:17,frame];
 }else if(state==='guard'){
  p.bodyY=1;p.headY=frame===2?2:1;p.headX=frame===1?-2:-1;p.brace=true;
  p.frontArm=[[23,27],[27,27],[26,22-frame%2]];p.backArm=[[10,27],[13,30],[21,29]];
  p.backLeg=[[13,35],[11,39],[9,43]];p.frontLeg=[[20,35],[23,39],[25,43]];
 }else if(state==='hit'){
  p.bodyX=[-1,-3,-1][frame];p.headX=[-2,-4,-1][frame];p.headY=1;p.closed=true;p.cloak=2;
  p.backArm=[[9+p.bodyX,26],[4,25],[4,21+frame]];
  p.frontArm=[[23+p.bodyX,26],[27,28],[28,25+frame]];
  p.backLeg=[[13+p.bodyX,34],[11,39],[9,43]];p.frontLeg=[[20+p.bodyX,34],[22,38],[26,43]];
 }else if(state==='victory'){
  const lift=[0,5,10,13,11,6][frame];p.headY=frame===3?-1:0;p.bodyY=p.headY;
  p.backArm=[[10,26],[6,27-lift/2],[5,31-lift]];p.frontArm=[[23,26],[28,25-lift/2],[28,29-lift]];
  p.frontLeg=[[20,34],[22,39],[23,43]];
  if(frame===3||frame===4)p.backLeg=[[13,34],[11,38],[9,40]];
 }else if(state==='rest'){
  p.bodyY=7;p.headY=7+(frame===2?1:0);p.headX=-1;p.closed=frame===1||frame===2;
  p.backLeg=[[13,41],[9,42],[15,43]];p.frontLeg=[[20,41],[24,42],[26,43]];
  p.backArm=[[10,33],[10,37],[15,39]];p.frontArm=[[23,33],[25,37],[23,39+(frame===3?1:0)]];
 }
 return p;
}

function hero(state,frame){
 const image=surface(W,H),p=pose(state,frame),x=p.bodyX,y=Math.min(6,p.bodyY);
 // Rear scarf and coat tails are separate silhouette layers, not a translated body.
 polygon(image,[[10+x,24+y],[6+x-p.cloak,25+y],[5-p.cloak,33+y],[12+x,35+y],[16+x,29+y]],'outline');
 polygon(image,[[10+x,25+y],[7+x-p.cloak,26+y],[7-p.cloak,31+y],[12+x,33+y]],'jadeDark');
 line(image,[8-p.cloak,28+y],[9-p.cloak,31+y],'jade');
 limb(image,p.backArm,'jadeDark');hand(image,...p.backArm[2]);
 leg(image,p.backLeg,'navy');leg(image,p.frontLeg,'navyLight');
 boot(image,...p.backLeg[2]);boot(image,...p.frontLeg[2]);
 polygon(image,[[10+x,24+y],[22+x,24+y],[25+x,29+y],[24+x,36+y],[19+x,38+y],[9+x,36+y],[8+x,29+y]],'outline');
 polygon(image,[[11+x,25+y],[21+x,25+y],[23+x,29+y],[22+x,35+y],[11+x,35+y],[10+x,29+y]],'jade');
 polygon(image,[[11+x,26+y],[14+x,27+y],[14+x,34+y],[11+x,34+y]],'jadeLight');
 rect(image,20+x,28+y,2,7,'jadeDark');pixel(image,15+x,28+y,'creamLight');pixel(image,15+x,31+y,'creamDark');
 // Diagonal satchel strap, tailored hem and tiny brass clasp.
 line(image,[11+x,25+y],[21+x,35+y],'leatherDark',2);line(image,[12+x,25+y],[22+x,35+y],'creamDark');
 rect(image,10+x,34+y,14,3,'leatherDark');rect(image,11+x,34+y,12,1,'leather');rect(image,17+x,34+y,3,3,'copperLight');pixel(image,18+x,35+y,'creamLight');
 rect(image,9+x,31+y,4,5,'outline');rect(image,10+x,32+y,3,3,'leather');pixel(image,11+x,32+y,'copperLight');
 limb(image,p.frontArm,'jade');hand(image,...p.frontArm[2]);
 const hx=p.headX,hy=p.headY;
 // Stepped asymmetrical hair silhouette, three-quarter face, ears and eye highlights.
 polygon(image,[[9+hx,8+hy],[10+hx,5+hy],[15+hx,5+hy],[16+hx,4+hy],[22+hx,5+hy],[25+hx,8+hy],[26+hx,14+hy],[25+hx,20+hy],[22+hx,23+hy],[13+hx,23+hy],[9+hx,20+hy],[8+hx,13+hy]],'outline');
 polygon(image,[[11+hx,10+hy],[23+hx,10+hy],[25+hx,15+hy],[24+hx,20+hy],[21+hx,22+hy],[14+hx,21+hy],[11+hx,18+hy]],'skin');
 rect(image,12+hx,11+hy,10,2,'skinLight');rect(image,12+hx,20+hy,10,2,'skinDark');
 rect(image,9+hx,15+hy,3,4,'skinDark');pixel(image,10+hx,16+hy,'skinLight');
 polygon(image,[[9+hx,9+hy],[11+hx,6+hy],[16+hx,6+hy],[17+hx,5+hy],[22+hx,6+hy],[24+hx,8+hy],[25+hx,12+hy],[23+hx,13+hy],[21+hx,10+hy],[18+hx,11+hy],[16+hx,9+hy],[14+hx,13+hy],[12+hx,14+hy],[12+hx,19+hy],[10+hx,18+hy],[9+hx,13+hy]],'hair');
 line(image,[12+hx,8+hy],[17+hx,7+hy],'hairLight');line(image,[18+hx,8+hy],[22+hx,9+hy],'hairLight');pixel(image,11+hx,11+hy,'hairLight');
 if(p.closed){line(image,[16+hx,16+hy],[18+hx,16+hy],'eye');line(image,[23+hx,16+hy],[25+hx,16+hy],'eye');}
 else {rect(image,16+hx,14+hy,2,3,'eye');rect(image,23+hx,14+hy,2,3,'eye');pixel(image,17+hx,14+hy,'creamLight');pixel(image,24+hx,14+hy,'creamLight');}
 pixel(image,21+hx,18+hy,'skinDark');line(image,[20+hx,20+hy],[22+hx,20+hy],'leather');pixel(image,15+hx,18+hy,'skinLight');
 // Cream scarf sits over the neckline; a split tail stays readable while moving.
 polygon(image,[[12+x,22+y],[22+x,22+y],[23+x,24+y],[19+x,26+y],[12+x,24+y]],'outline');
 line(image,[13+x,23+y],[21+x,23+y],'cream',2);line(image,[14+x,24+y],[19+x,25+y],'creamDark');
 polygon(image,[[12+x,24+y],[10+x,24+y],[8+x-p.cloak,28+y],[11+x-p.cloak,29+y],[14+x,25+y]],'cream');
 if(p.brace){
  polygon(image,[[26,18],[29,20],[30,27],[27,31],[24,28],[24,21]],'outline');
  polygon(image,[[26,20],[28,21],[28,27],[26,29],[25,27],[25,22]],'cream');line(image,[26,22],[27,26],'jadeDark');pixel(image,27,23,'glow');
 }
 if(p.seed){const [sx,sy]=p.seed;rect(image,sx-1,sy-1,3,3,'jadeDark');pixel(image,sx,sy-2,'jadeLight');pixel(image,sx,sy,'sunLight');}
 if(p.gesture){
  const [gx,gy,step]=p.gesture;
  polygon(image,[[gx,gy-3],[gx+3,gy],[gx,gy+3],[gx-3,gy]],'jadeDark');
  polygon(image,[[gx,gy-2],[gx+2,gy],[gx,gy+2],[gx-2,gy]],step%2?'jadeLight':'glow');pixel(image,gx,gy,'creamLight');
  pixel(image,gx-4+(step%3),gy-4,'sun');pixel(image,gx+3,gy+3-step%2,'jadeLight');
 }
 return image;
}

function spirit(state,frame){
 const image=surface(W,H),bob=state==='idle'?[0,-1,0,1][frame]:0;
 const tilt=state==='hit'?[-1,-2,0][frame]:state==='attack'?[0,-1,0,1,1,0][frame]:0;
 const lift=state==='attack'?[0,2,4,2,-1,0][frame]:state==='hit'?[-1,-3,-1][frame]:[0,1,0,-1][frame];
 const r=(x,y,w,h,color)=>rect(image,x+tilt,y+bob,w,h,color);
 const poly=(points,color)=>polygon(image,points.map(([x,y])=>[x+tilt,y+bob]),color);
 // A small turning brass key, unlike the living leafy companions in legacy art.
 r(15,7,2,8,'outline');r(15,8,1,7,'copperLight');
 if(frame%2===0){r(10,6,12,4,'outline');r(11,7,3,2,'copper');r(18,7,3,2,'copperLight');r(14,7,4,1,'copperLight');}
 else {r(13,3,6,9,'outline');r(14,4,4,3,'copperLight');r(15,8,2,3,'copper');}
 // Mechanical fan fins change articulation independently of the lamp body.
 poly([[9,22],[4,18-lift],[2,20-lift],[1,28+lift],[5,31+lift],[10,28]],'outline');
 poly([[8,23],[4,20-lift],[3,24],[3,28+lift],[6,29+lift],[9,27]],'jadeDark');
 line(image,[4+tilt,23+bob],[7+tilt,27+lift+bob],'jadeLight');
 poly([[23,22],[28,18-lift],[30,20-lift],[31,28+lift],[27,31+lift],[22,28]],'outline');
 poly([[24,23],[28,20-lift],[29,24],[29,28+lift],[26,29+lift],[23,27]],'jade');
 line(image,[28+tilt,23+bob],[25+tilt,27+lift+bob],'jadePale');
 // Ceramic lantern shell and separate copper ribs give a readable object silhouette.
 poly([[12,15],[20,15],[24,20],[25,29],[23,35],[20,38],[12,38],[9,35],[7,29],[8,21]],'outline');
 poly([[12,17],[20,17],[22,21],[23,29],[21,34],[18,36],[13,35],[10,32],[9,25],[10,21]],'creamDark');
 poly([[13,18],[19,18],[21,22],[21,30],[18,34],[13,33],[11,29],[11,23]],'cream');
 r(13,19,5,2,'creamLight');r(11,24,2,6,'creamLight');r(21,23,2,8,'copper');
 r(11,15,10,3,'copper');r(12,15,7,1,'copperLight');r(12,36,9,3,'copper');r(13,36,5,1,'copperLight');
 r(14,39,5,2,'outline');r(15,39,3,3,'copper');r(15,42,3,1,'copperLight');
 // Aperture eyes and the small jade rune core are embedded in the ceramic surface.
 if(state==='hit'||state==='idle'&&frame===2){
  line(image,[12+tilt,24+bob],[15+tilt,25+bob],'eye');line(image,[18+tilt,25+bob],[21+tilt,24+bob],'eye');
 }else {r(12,23,3,2,'eye');r(19,23,3,2,'eye');r(13,23,1,1,'jadePale');r(20,23,1,1,'jadePale');}
 const core=state==='hit'?'copperLight':state==='attack'&&frame>1&&frame<5?'sunLight':'glow';
 poly([[16,26],[19,29],[16,33],[13,29]],'jadeDark');poly([[16,27],[18,29],[16,31],[14,29]],core);r(16,28,1,3,'creamLight');
 r(8,25,2,4,'copper');r(23,25,2,4,'copperLight');
 if(state==='attack'&&frame>=2&&frame<=4){
  const x=frame===2?26:29;
  polygon(image,[[x,15],[x+2,18],[x,21],[x-2,18]],'copper');pixel(image,x,17,'sunLight');pixel(image,x,18,'glow');pixel(image,x-3,15+frame,'jadePale');
 }
 if(state==='hit'&&frame===1){pixel(image,5,13,'copperLight');pixel(image,25,12,'creamLight');}
 return image;
}

function sheet(rows,draw){
 const image=surface(COLUMNS*W,rows.length*H);
 rows.forEach(([state,count],row)=>{
  for(let frame=0;frame<count;frame++){
   const cell=draw(state,frame);
   for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    const source=(y*W+x)*4,target=((row*H+y)*image.width+frame*W+x)*4;
    image.data.set(cell.data.subarray(source,source+4),target);
   }
  }
 });
 return image;
}
for(const [name,rows,draw] of [['player',playerRows,hero],['training',[['idle',4],['attack',6],['hit',3]],spirit]]){
 const png=sheet(rows,draw);
 writeFileSync(resolve(destination,name+'.png'),PNG.sync.write(png));
 console.log(`${name}: ${png.width}×${png.height}; ${rows.reduce((sum,[,count])=>sum+count,0)} original pose frames`);
}
