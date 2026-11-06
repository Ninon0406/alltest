// Original pixel scenery, shared palette/64x96 props grid. No reference pixels.
import {PNG} from 'pngjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const picture=new PNG({width:384,height:96});
function pixel(x,y,c){if(x<0||x>=384||y<0||y>=96)return;const i=(Math.round(y)*384+Math.round(x))*4;picture.data[i]=parseInt(c.slice(0,2),16);picture.data[i+1]=parseInt(c.slice(2,4),16);picture.data[i+2]=parseInt(c.slice(4,6),16);picture.data[i+3]=255;}
function rect(x,y,w,h,c){for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)pixel(xx,yy,c);}
for(let f=0;f<6;f++){
 const x=f*64;
 if(f<4){
  // Hanging paper seed lantern: braided cord, faceted paper and carved tassel.
  rect(x+31,3,2,19,'75634c');rect(x+28,20,9,3,'c6ac73');
  for(let y=23;y<55;y++){const w=y<29?10+(y-23)*2:y>47?26-(y-47)*2:26;rect(x+32-Math.floor(w/2),y,w,1,f===0?'8eaa91':f%2?'f0d796':'e6c781');}
  rect(x+22,29,2,18,'c3a570');rect(x+31,25,2,27,f?'f9ebbb':'b3c3a0');rect(x+40,29,2,18,'ad9163');
  rect(x+27,55,11,3,'91775b');rect(x+31,58,2,12,'b19c6e');rect(x+28,69,9,3,'ddc48b');rect(x+29,72,2,5,'a88f69');rect(x+34,72,2,5,'a88f69');
  if(f){rect(x+29,33+f,7,2,'fff2c7');rect(x+31,30+f,2,9,'fff2c7');pixel(x+16,27+f*3,'f6dda1');pixel(x+48,39-f*2,'f6dda1');}
 }else if(f===4){
  // Music box on a proper wooden stand, brass mechanism and inset blue glass.
  rect(x+19,77,4,17,'716553');rect(x+42,77,4,17,'716553');rect(x+15,73,35,5,'a68c63');rect(x+18,53,28,20,'6b7e78');rect(x+20,55,24,15,'c5ac73');rect(x+22,57,20,10,'597b7c');
  rect(x+20,43,24,5,'9b815e');rect(x+23,38,18,5,'dcc591');rect(x+27,34,10,4,'ead8a3');rect(x+30,58,3,9,'ead8a3');rect(x+27,62,10,2,'ead8a3');rect(x+46,59,5,3,'c8ae7a');rect(x+49,60,2,6,'c8ae7a');
 }else{
  // Potted memory seed records the opening promise in the village afterwards.
  rect(x+20,79,24,4,'9b8968');for(let y=83;y<94;y++)rect(x+23+Math.floor((y-83)/4),y,18-2*Math.floor((y-83)/4),1,'b89e74');rect(x+31,55,2,24,'789366');rect(x+24,61,8,4,'9fb47c');rect(x+33,56,9,4,'87a777');rect(x+29,45,7,11,'e6d99d');rect(x+31,42,3,4,'f2e7b1');rect(x+31,48,2,6,'f7ecc0');
 }
}
const folder=fileURLToPath(new URL('../public/assets/art-v13/',import.meta.url));mkdirSync(folder,{recursive:true});writeFileSync(folder+'festival-props.png',PNG.sync.write(picture));
