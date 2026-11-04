import Phaser from 'phaser';
import {scenes} from '../content/story';
import type {State} from '../engine/state';
import type {Spell} from '../systems/spells';

export class World extends Phaser.Scene {
 player!:Phaser.GameObjects.Sprite;
 npc!:Phaser.GameObjects.Sprite;
 stage!:Phaser.GameObjects.Image;
 private playerShadow!:Phaser.GameObjects.Ellipse;
 private npcShadow!:Phaser.GameObjects.Ellipse;
 private effects=new Set<Phaser.GameObjects.Rectangle>();
 private finishTween?:()=>void;
 private npcHomeX=338;
 motes:Phaser.GameObjects.Rectangle[]=[];
 ready=false;
 motion=true;
 constructor(){super('world');}
 preload(){
  const base=import.meta.env.BASE_URL+'assets/';
  for(const name of ['sky','village','garden','workshop','forest'])this.load.image(name,base+name+'.png');
  for(const name of ['player','pip','lumi','maren','koro','sprout'])this.load.spritesheet(name,base+name+'.png',{frameWidth:32,frameHeight:48});
 }
 create(){
  this.add.image(240,135,'sky');this.stage=this.add.image(240,135,'village');
  for(const name of ['player','pip','lumi','maren','koro','sprout'])this.anims.create({key:name+'-idle',frames:this.anims.generateFrameNumbers(name,{frames:[0,1,2,1]}),frameRate:5,repeat:-1});
  this.playerShadow=this.add.ellipse(154,238,29,7,0x263f42,.23);
  this.npcShadow=this.add.ellipse(338,232,29,7,0x263f42,.23);
  this.player=this.add.sprite(154,219,'player').play('player-idle');
  this.npc=this.add.sprite(338,212,'pip').play('pip-idle');
  for(let i=0;i<16;i++)this.motes.push(this.add.rectangle((i*37)%480,110+(i*19)%110,2,2,i%2?0xffe3a0:0xe0f1b8,.7));
  this.anims.create({key:'player-walk',frames:this.anims.generateFrameNumbers('player',{frames:[0,1,2,1,0,2]}),frameRate:10,repeat:-1});
  this.ready=true;this.game.events.emit('world-ready');
 }
 update(time:number){
  if(!this.ready)return;
  this.playerShadow.setPosition(Math.round(this.player.x),Math.round(this.player.y+20));
  this.npcShadow.setPosition(Math.round(this.npc.x),Math.round(this.npc.y+20));
  this.player.anims.timeScale=this.motion?1:0;this.npc.anims.timeScale=this.motion?1:0;
  this.motes.forEach((m,i)=>{m.y=120+((time/(this.motion?55:100000)+i*19)%110);m.x=(i*37+Math.sin(time/2000+i)*(this.motion?8:0))%480;});
 }
 show(state:State|null){
  if(!this.ready)return;
  const scene=state?scenes[state.scene]:null,training=state?.battle?.id==='BT_TRAINING';
  this.tweens.killTweensOf(this.npc);this.tweens.killTweensOf(this.player);
  this.stage.setTexture(training?'workshop':scene?.stage||'village');
  // Pip is a provisional simulated practice spirit until a unique sheet is authored.
  const actor=state?.battle?(training?'pip':'sprout'):state?.flags.lumi_helped&&scene?.id==='S02_HUB'?'lumi':scene?.npc||'pip';
  this.npc.setTexture(actor).play(actor+'-idle').clearTint().setAlpha(1);
  this.player.setPosition(state?.battle?130:154,219).clearTint().setAlpha(1);
  this.npcHomeX=state?.battle?350:338;this.npc.setPosition(this.npcHomeX,212);
 }
 finishAction(){
  if(!this.ready)return;
  this.tweens.killTweensOf(this.player);this.player.play('player-idle');
  for(const effect of this.effects){this.tweens.killTweensOf(effect);effect.destroy();}
  this.effects.clear();this.finishTween?.();this.finishTween=undefined;
 }
 private castEffect(reduced:boolean,spell?:Spell){
  const color=spell?.vfx.color||0xffdf90,shape=spell?.form||'ORB',modifier=spell?.mod||'SEEK';
  const support=!!spell&&(spell.heal>0||spell.shield>0);
  const sourceX=this.player.x,sourceY=this.player.y-12;
  const targetX=support?this.player.x:this.npc.x,targetY=(support?this.player.y:this.npc.y)-8;
  const count=reduced?8:24;
  for(let i=0;i<count;i++){
   const fraction=i/count,angle=fraction*Math.PI*2;
   let x=sourceX+10,y=sourceY,endX=targetX,endY=targetY;
   if(shape==='RING'){
    x=targetX+Math.cos(angle)*32;y=targetY+Math.sin(angle)*20;endX=x;endY=y-8;
   }else if(shape==='WARD'){
    x=targetX+(i%2?25:-25);y=targetY-27+fraction*52;endX=x;endY=y-10;
   }else if(shape==='RAIN'){
    x=targetX-32+fraction*64;y=targetY-90;endX=x;endY=targetY+6;
   }else if(shape==='RAY'){
    x=support?targetX-30+fraction*60:sourceX+fraction*(targetX-sourceX);
    y=targetY;endX=x;endY=y+(support?-9:0);
   }else if(shape==='CHAIN'){
    x=support?targetX-28+fraction*56:sourceX+fraction*(targetX-sourceX);
    y=targetY+Math.sin(fraction*14)*14;endX=x;endY=y-7;
   }else if(support){
    x=targetX+Math.cos(angle)*28;y=targetY+Math.sin(angle)*22;endX=targetX;endY=targetY-8;
   }
   if(modifier==='SPLIT')endY+=i%2?12:-12;
   if(modifier==='SEEK'&&shape==='ORB')y+=Math.sin(fraction*6)*18;
   if(modifier==='PIERCE'&&!support)endX+=18;
   if(modifier==='HEAL')endY-=14;
   const particle=this.add.rectangle(Math.round(x),Math.round(y),shape==='RAY'?8:3,shape==='RAIN'||modifier==='GUARD'?7:3,color,.9);
   this.effects.add(particle);
   this.tweens.add({targets:particle,x:Math.round(endX),y:Math.round(endY),alpha:0,scale:modifier==='AMPLIFY'?2.5:1,duration:reduced?100:modifier==='LINGER'?650+i*4:400+i*5,onComplete:()=>{this.effects.delete(particle);particle.destroy();}});
  }
 }
 async action(cue:string,reduced:boolean,spell?:Spell){
  if(!this.ready)return;
  this.tweens.killTweensOf(this.npc);this.tweens.killTweensOf(this.player);
  this.npc.setX(this.npcHomeX).clearTint().setAlpha(1);this.player.clearTint().setAlpha(1);
  this.motion=!reduced;this.player.stop().setFrame(cue==='cast'?3:4);
  if(cue==='walk')this.player.play('player-walk');
  if(spell||cue==='cast')this.castEffect(reduced,spell);
  await new Promise<void>(resolve=>{
   this.finishTween=resolve;
   this.tweens.add({targets:this.player,x:cue==='walk'?230:this.player.x,y:cue==='pick'?224:219,duration:reduced?60:500,yoyo:cue!=='walk',onComplete:()=>{this.finishTween=undefined;resolve();}});
  });
  this.player.play('player-idle');
 }
 /** Reactions read an already resolved turn and never alter game state. */
 react(previous:State,next:State,reduced:boolean){
  if(!this.ready||reduced||!previous.battle||!next.battle)return;
  const enemyX=this.npc.x;
  if(next.battle.enemyHp<previous.battle.enemyHp){
   this.npc.setTint(0xffe3b6);
   this.tweens.add({targets:this.npc,alpha:.72,duration:100,yoyo:true,onComplete:()=>this.npc.clearTint()});
  }
  if(next.battle.log.some(line=>line.includes(' โจมตี ')||line.includes('โจมตีพลาด')))this.tweens.add({targets:this.npc,x:enemyX-12,duration:100,yoyo:true});
  if(next.hp<previous.hp){
   this.player.setTint(0xf2b193);
   this.tweens.add({targets:this.player,alpha:.75,duration:120,yoyo:true,onComplete:()=>this.player.clearTint()});
  }
 }
}
export function startWorld(parent:HTMLElement){
 const world=new World();
 const game=new Phaser.Game({type:Phaser.AUTO,parent,width:480,height:270,backgroundColor:'#a5d6d0',pixelArt:true,roundPixels:true,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[world],audio:{noAudio:true}});
 return {world,game};
}
