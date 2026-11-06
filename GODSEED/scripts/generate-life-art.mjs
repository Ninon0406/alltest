// Original 32px glyphs: compass/quill and living-root shield, three learning stages.
import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const p=new PNG({width:192,height:32});
function px(x,y,c){x=Math.round(x);y=Math.round(y);if(x<0||x>=192||y<0||y>=32)return;const i=(y*192+x)*4;for(let n=0;n<3;n++)p.data[i+n]=parseInt(c.slice(n*2,n*2+2),16);p.data[i+3]=255;}
function line(x,y,a,b,c,w=1){const steps=Math.max(1,Math.ceil(Math.hypot(a-x,b-y)));for(let i=0;i<=steps;i++)for(let u=0;u<w;u++)for(let v=0;v<w;v++)px(x+(a-x)*i/steps+u,y+(b-y)*i/steps+v,c);}
function oval(x,y,rx,ry,c){for(let yy=Math.ceil(y-ry);yy<=y+ry;yy++)for(let xx=Math.ceil(x-rx);xx<=x+rx;xx++)if(((xx-x)/rx)**2+((yy-y)/ry)**2<=1)px(xx,yy,c);}
for(let f=0;f<6;f++){
 const x=f*32,r=f%3,edge=r?'8d805b':'648177',gold=r===2?'f1d68d':r?'cfba83':'9cafa0',pale=r?'f8e6ac':'bac8b1',green=r===2?'abcfa0':r?'83b18d':'78988a';
 if(f<3){
  oval(x+15,16,12,12,edge);oval(x+15,16,10,10,gold);oval(x+15,16,8,8,'385e56');oval(x+14,15,7,7,'567c6a');
  line(x+15,6,x+15,26,edge);line(x+5,16,x+25,16,edge);
  for(let y=8;y<=16;y++){const w=Math.max(0,Math.floor((y-8)/3));line(x+15-w,y,x+15+w,y,pale);}
  for(let y=17;y<25;y++){const w=Math.max(0,Math.floor((24-y)/3));line(x+15-w,y,x+15+w,y,green);}
  oval(x+15,16,2,2,gold);line(x+23,6,x+28,2,pale);line(x+24,7,x+29,3,gold);line(x+23,8,x+28,4,green);line(x+22,11,x+29,2,edge);
  if(r){px(x+8,7,pale);px(x+6,10,pale);px(x+23,21,green);px(x+21,24,green);}
 }else{
  for(let y=3;y<=23;y++){const inset=y<8?0:Math.floor((y-8)/3);line(x+5+inset,y,x+25-inset,y,edge);line(x+7+inset,y,x+23-inset,y,y<16?'426b5c':'34584d');}
  oval(x+15,12,7,9,green);oval(x+12,10,3,5,r?'c5d7a0':'9eb49c');line(x+15,5,x+15,23,gold);line(x+15,11,x+20,8,gold);line(x+15,16,x+10,12,gold);line(x+15,20,x+20,16,gold);
  line(x+15,23,x+10,28,gold);line(x+15,23,x+20,28,gold);line(x+15,24,x+15,30,green);line(x+10,28,x+7,27,green);line(x+20,28,x+24,27,green);
 }
 if(r===2)for(const [a,b] of [[3,5],[28,17],[5,28]]){line(x+a-1,b,x+a+1,b,pale);line(x+a,b-1,x+a,b+1,pale);}
}
const out=fileURLToPath(new URL('../public/assets/art-v14/',import.meta.url));mkdirSync(out,{recursive:true});writeFileSync(out+'life-icons.png',PNG.sync.write(p));
