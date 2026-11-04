import {PNG} from 'pngjs';import {writeFileSync,mkdirSync} from 'node:fs';
mkdirSync('public/assets',{recursive:true});
const make=(w,h)=>new PNG({width:w,height:h});
function rect(p,x,y,w,h,c){const rgb=c.match(/../g).map(v=>parseInt(v,16));for(let j=Math.max(0,y|0);j<Math.min(p.height,y+h);j++)for(let i=Math.max(0,x|0);i<Math.min(p.width,x+w);i++){const k=(j*p.width+i)*4;p.data[k]=rgb[0];p.data[k+1]=rgb[1];p.data[k+2]=rgb[2];p.data[k+3]=255;}}
const out=(n,p)=>writeFileSync(`public/assets/${n}.png`,PNG.sync.write(p));
// Original hand-authored pixel silhouettes, six pose frames per actor. No borrowed assets.
for(const [name,coat,hair] of [['player','479d95','343f49'],['lumi','7bbfc4','b86d42'],['maren','e4a491','e2dfce'],['koro','aa7957','57433d'],['pip','83bc74','427b65'],['sprout','71ad69','477958']]){
 const p=make(192,48);
 for(let f=0;f<6;f++){const x=f*32,b=f%3===1?1:0;const r=(a,y,w,h,c)=>rect(p,x+a,y+b,w,h,c);
 if(name==='pip'||name==='sprout'){
  r(9,23,15,15,'284c48');r(6,27,20,8,'284c48');r(10,21,12,17,coat);r(7,28,18,7,coat);r(11,23,5,3,'b5db93');r(12,29,2,3,'263b42');r(21,29,2,3,'263b42');r(16,34,3,1,'f6dfad');r(15,15,3,8,'4f8661');r(9,14,8,4,'7cb979');r(18,12,7,4,'b0cf76');r(9+(f%2)*2,38,5,3,'365d50');r(20-(f%2)*2,38,5,3,'365d50');
 }else{
  r(11,35,5,8,'263b48');r(18,35,5,8,'263b48');r(10+(f%2?1:0),41,7,3,'3a4550');r(19-(f%2?2:0),41,7,3,'3a4550');
  r(9,22,15,15,'263b48');r(10,23,13,12,coat);r(11,23,3,10,'b6d8bc');r(18,24,4,8,coat);r(10,34,14,3,'c69b61');r(18,34,3,3,'f0d28e');
  r(6,25+(f===4?-4:0),4,10,'263b48');r(7,26+(f===4?-4:0),3,8,coat);r(7,33+(f===4?-4:0),3,3,'e4b58e');r(24,24+(f===3?-7:0),4,10,'263b48');r(24,25+(f===3?-7:0),3,8,coat);r(24,32+(f===3?-7:0),3,3,'efc49b');
  r(9,6,17,15,'263b48');r(11,10,13,12,'efc49b');r(12,19,11,4,'d9a67f');r(8,6,18,6,hair);r(10,4,12,3,hair);r(9,11,4,7,hair);r(22,10,3,6,hair);r(15,14,2,f===5?1:3,'263b48');r(22,14,2,f===5?1:3,'263b48');r(20,20,2,1,'9a665a');r(14,8,9,2,'667359');
 }
 }out(name,p);
}
const sky=make(480,270);rect(sky,0,0,480,270,'a5d6d0');for(let y=0;y<150;y+=5)rect(sky,0,y,480,5,y<50?'8abdc8':y<100?'b0d6d3':'c9e4d3');rect(sky,370,26,24,24,'fae6a9');rect(sky,366,32,32,12,'fae6a9');for(let i=0;i<8;i++){let x=i*78-20,y=55+(i*17%37);rect(sky,x,y,56,5,'e5eed8');rect(sky,x+8,y-4,29,4,'e5eed8');}for(let i=0;i<5;i++)for(let y=0;y<70;y++)rect(sky,i*110-30+y/2,90+y,110-y,1,'80aaa1');out('sky',sky);
function tree(p,x,y,scale=1){const r=(a,b,w,h,c)=>rect(p,x+a*scale,y+b*scale,w*scale,h*scale,c);r(22,35,10,68,'536e51');r(26,40,4,63,'729069');for(const [a,b,w,h] of [[4,22,47,28],[0,36,58,24],[9,9,37,30],[17,0,22,23]]){r(a,b,w,h,'427c66');r(a+3,b,w-6,h-5,'5b9d74');r(a+7,b,w-13,4,'84b782');}r(26,63,13,3,'3d6e58');}
for(const kind of ['village','garden','workshop','forest']){
 const p=make(480,270);rect(p,0,155,480,115,kind==='workshop'?'b48d65':'83b779');
 for(let y=155;y<270;y+=4)for(let x=0;x<480;x+=4){const n=(x*71+y*19)%37;if(n<4)rect(p,x,y,2,1,kind==='workshop'?'9e795b':'a8ca81');}
 // Curving path, ground stones and flowers.
 for(let y=164;y<270;y++){const mid=220+Math.sin(y/60)*60;rect(p,mid-27-(y-164)*.3,y,60+(y-164)*.6,1,'d6bd87');}
 if(kind!=='workshop'){
 for(const [x,y,s] of kind==='forest'?[[0,75,1.5],[78,55,1.4],[320,60,1.5],[408,68,1.6],[180,70,.7]]:[[0,95,1],[408,85,1.2],[345,120,.7]])tree(p,x,y,s);
 for(let i=0;i<65;i++){const x=(i*73)%480,y=180+(i*29)%88;if(x>170&&x<330)continue;rect(p,x,y,1,4,'467c5e');rect(p,x-1,y-2,4,3,i%2?'f4d08e':'e6a8a3');rect(p,x,y-1,1,1,'fff0be');}
 }
 if(kind==='village'||kind==='garden'){
 for(const [x,y] of [[50,102],[286,114]]){rect(p,x,y+24,72,55,'e5c28b');rect(p,x+5,y+30,63,42,'f1d39b');for(let a=0;a<29;a++)rect(p,x-12+a,y+a,96-a*2,1,a%5===0?'b9784f':'c9915a');rect(p,x+28,y+44,15,35,'675d4b');rect(p,x+8,y+37,13,15,'518b91');rect(p,x+51,y+37,13,15,'518b91');rect(p,x+9,y+43,11,2,'e8cc92');rect(p,x+56,y+38,2,13,'e8cc92');rect(p,x+30,y+46,2,30,'9b805b');}
 rect(p,205,174,30,17,'8e9a83');rect(p,201,171,38,5,'b4bea0');rect(p,210,167,22,5,'416d70');
 }
 if(kind==='workshop'){
 rect(p,0,0,480,163,'394d54');for(let x=0;x<480;x+=32){rect(p,x,0,3,162,'667068');rect(p,x,100,32,3,'667068');}rect(p,28,40,95,75,'dfb879');rect(p,35,47,80,60,'8ebfc0');rect(p,73,47,4,60,'e8cb93');rect(p,35,75,80,4,'e8cb93');rect(p,370,76,75,90,'727670');rect(p,382,103,52,58,'503b46');rect(p,394,128,27,28,'ea9a59');rect(p,401,140,12,16,'f9d386');
 for(let x=150;x<310;x+=32){rect(p,x,50,22,14,'8aa3a2');rect(p,x+5,42,9,10,'bd9cd2');rect(p,x-2,65,30,4,'ae805b');}
 rect(p,150,174,180,10,'705642');rect(p,154,172,172,5,'d1a271');rect(p,162,184,10,54,'705642');rect(p,306,184,10,54,'705642');rect(p,187,155,17,17,'77bfb2');rect(p,236,160,21,12,'ddc690');rect(p,278,150,14,22,'b7a2da');
 }
 out(kind,p);
}
console.log('Generated original layered stages and six actor sheets');
