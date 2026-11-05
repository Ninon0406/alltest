import Phaser from 'phaser';
import {scenes} from '../content/story';
import {encounters} from '../content/encounters';
import type {State} from '../engine/state';
import type {Spell} from '../systems/spells';
import {playerAnimations,trainingAnimations} from './actor-art';
import {STAGES,stageLayouts,stageFolder,stageFallback,type StageId} from './stage-layout';
import {explorationAnimations} from './exploration-art';
import {outcomeFor,poseFor,type Outcome} from './visual-plan';

export class World extends Phaser.Scene {
 player!:Phaser.GameObjects.Sprite;
 npc!:Phaser.GameObjects.Sprite;
 stage!:Phaser.GameObjects.Image;
 private rear!:Phaser.GameObjects.TileSprite;
 private ground!:Phaser.GameObjects.Image;
 private front!:Phaser.GameObjects.TileSprite;
 private playerShadow!:Phaser.GameObjects.Ellipse;
 private npcShadow!:Phaser.GameObjects.Ellipse;
 private props:Phaser.GameObjects.Sprite[]=[];
 private ambient:Phaser.GameObjects.Sprite[]=[];
 private effects=new Set<Phaser.GameObjects.Rectangle>();
 private settlers=new Set<()=>void>();
 private generation=0;
 private parallax={value:0};
 private npcHomeX=338;
 private npcKey='pip';
 private currentStage:StageId='village';
 private phase='idle';
 private playerAction='idle';
 private lastCue='idle';
 private lastOutcome:Outcome='none';
 private assetErrors:string[]=[];
 private layered=false;
 private ambientTime=0;
 private memoryProps=0;
 private mist?:Phaser.GameObjects.Image;
 private visibilityChanged=()=>this.diagnostics();
 ready=false;
 motion=true;
 constructor(private host:HTMLElement){super('world');this.host.dataset.renderStatus='loading';document.addEventListener('visibilitychange',this.visibilityChanged);}
 private writeMetric(key:string,value:string|number){const text=String(value);if(this.host.dataset[key]!==text)this.host.dataset[key]=text;}
 private diagnostics(){
  this.writeMetric('renderStatus',!this.ready?'loading':this.assetErrors.length?'degraded':'ready');this.writeMetric('stage',this.currentStage);
  this.writeMetric('stageLayers',this.layered?3:1);this.writeMetric('streamMist',this.mist?.visible?'visible':'clear');this.writeMetric('npc',this.npcKey);this.writeMetric('playerAction',this.playerAction);
  this.writeMetric('actionPhase',this.phase);this.writeMetric('actionSequence',this.generation);this.writeMetric('activeEffects',this.effects.size);
  this.writeMetric('motion',this.motion?'full':'reduced');this.writeMetric('visibility',document.hidden?'hidden':'visible');
  this.writeMetric('assetErrors',this.assetErrors.length);this.writeMetric('lastOutcome',this.lastOutcome);this.writeMetric('lastCue',this.lastCue);
  this.writeMetric('ambientTick',Math.floor(this.ambientTime/200));this.writeMetric('propCount',this.props.length);this.writeMetric('memoryProps',this.memoryProps);
  if(this.player){this.writeMetric('heroFrame',this.player.frame.name);if(this.phase==='idle')this.writeMetric('playerAnchor',JSON.stringify({x:this.player.x,y:this.player.y,feetY:this.player.y+20,depth:this.player.depth}));}
 }
 preload(){
  const base=import.meta.env.BASE_URL+'assets/';
  this.load.on('loaderror',(file:{key:string})=>{this.assetErrors.push(file.key);});
  this.load.image('sky',base+'sky.png');for(const name of STAGES)this.load.image(name,base+stageFallback(name));
  for(const name of ['player','pip','lumi','maren','koro','sprout'])this.load.spritesheet(name,base+name+'.png',{frameWidth:32,frameHeight:48});
  for(const name of STAGES)for(const layer of ['rear','ground','front'])this.load.image(`${name}-${layer}-v2`,`${base}${stageFolder(name)}/${name}-${layer}.png`);
  this.load.spritesheet('props-v2',base+'art-v2/props.png',{frameWidth:64,frameHeight:96});
  this.load.spritesheet('ambient-v2',base+'art-v2/ambient.png',{frameWidth:32,frameHeight:32});
  this.load.spritesheet('hero-v2',base+'art-v2/player.png',{frameWidth:32,frameHeight:48});
  this.load.image('stream-mist-v3',base+'art-v3/stream-mist.png');
  this.load.spritesheet('water-v3',base+'art-v3/water.png',{frameWidth:32,frameHeight:32});
  for(const name of ['eira','wisp'])this.load.spritesheet(name+'-v3',base+'art-v3/'+name+'.png',{frameWidth:32,frameHeight:48});
  this.load.spritesheet('training-v2',base+'art-v2/training.png',{frameWidth:32,frameHeight:48});
 }
 create(){
  this.add.image(240,135,'sky').setDepth(-1200);this.stage=this.add.image(240,135,'village').setDepth(-1100);
  this.rear=this.add.tileSprite(240,135,480,270,'village').setDepth(-1000).setVisible(false);
  this.ground=this.add.image(240,135,'village').setDepth(-900).setVisible(false);
  this.front=this.add.tileSprite(240,135,480,270,'village').setDepth(1000).setVisible(false);
  for(const name of ['player','pip','lumi','maren','koro','sprout'])if(this.textures.exists(name))this.anims.create({key:name+'-idle',frames:this.anims.generateFrameNumbers(name,{frames:[0,1,2,1]}),frameRate:5,repeat:-1});
  this.anims.create({key:'legacy-walk',frames:this.anims.generateFrameNumbers('player',{frames:[0,1,2,1,0,2]}),frameRate:10,repeat:-1});
  if(this.textures.exists('hero-v2'))for(const [name,config] of Object.entries(playerAnimations))this.anims.create({key:'hero-'+name,frames:this.anims.generateFrameNumbers('hero-v2',{frames:config.frames}),frameRate:config.frameRate,repeat:config.repeat});
  if(this.textures.exists('training-v2'))for(const [name,config] of Object.entries(trainingAnimations))this.anims.create({key:'training-'+name,frames:this.anims.generateFrameNumbers('training-v2',{frames:config.frames}),frameRate:config.frameRate,repeat:config.repeat});
  if(this.textures.exists('ambient-v2'))for(const [row,name] of ['cloud','leaf','fire','glow'].entries())this.anims.create({key:'ambient-'+name,frames:this.anims.generateFrameNumbers('ambient-v2',{start:row*4,end:row*4+3}),frameRate:4,repeat:-1});
  if(this.textures.exists('water-v3'))this.anims.create({key:'ambient-water',frames:this.anims.generateFrameNumbers('water-v3',{start:0,end:5}),frameRate:6,repeat:-1});
  for(const [name,animations] of Object.entries(explorationAnimations))if(this.textures.exists(name))for(const [action,config] of Object.entries(animations))this.anims.create({key:name+'-'+action,frames:this.anims.generateFrameNumbers(name,{frames:[...config.frames]}),frameRate:config.frameRate,repeat:config.repeat});
  if(this.textures.exists('stream-mist-v3'))this.mist=this.add.image(240,135,'stream-mist-v3').setDepth(700).setVisible(false);
  this.playerShadow=this.add.ellipse(154,239,27,6,0x233e3a,.25);
  this.npcShadow=this.add.ellipse(338,232,26,6,0x233e3a,.22);
  this.player=this.add.sprite(154,219,this.textures.exists('hero-v2')?'hero-v2':'player');
  this.npc=this.add.sprite(338,212,'pip');
  this.ready=true;this.show(null);
  this.events.once('shutdown',()=>{this.finishAction();document.removeEventListener('visibilitychange',this.visibilityChanged);});
  this.game.events.emit('world-ready');
  if(this.assetErrors.length)this.game.events.emit('art-warning','ภาพบางส่วนโหลดไม่ครบ ใช้ภาพสำรองขณะนี้ คุณยังเล่นและบันทึกเกมได้');
 }
 update(_time:number,delta:number){
  if(!this.ready)return;
  this.playerShadow.setPosition(Math.round(this.player.x),Math.round(this.player.y+20)).setDepth(this.player.y+19);
  this.npcShadow.setPosition(Math.round(this.npc.x),Math.round(this.npc.y+20)).setDepth(this.npc.y+19);
  this.player.setDepth(this.player.y+20);this.npc.setDepth(this.npc.y+20);
  this.player.anims.timeScale=this.motion?1:0;this.npc.anims.timeScale=this.motion?1:0;
  if(this.motion&&!document.hidden)this.ambientTime+=Math.min(delta,100);
  this.rear.tilePositionX=this.motion?this.parallax.value*.3:0;this.front.tilePositionX=this.motion?this.parallax.value*.8:0;
  this.ambient.forEach((sprite,i)=>{sprite.anims.timeScale=this.motion?1:0;const origin=sprite.getData('anchor') as {x:number;y:number;kind:string};
   const t=this.ambientTime/1000;
   sprite.setPosition(Math.round(origin.x+(origin.kind==='cloud'?Math.sin(t*.16+i)*14:Math.sin(t+i)*2)),Math.round(origin.y+(origin.kind==='leaf'?Math.sin(t*1.3+i)*3:0)));
  });
  this.diagnostics();
 }
 private pose(name:string){
  this.playerAction=name;
  if(this.player.texture.key==='hero-v2'&&this.anims.exists('hero-'+name)){this.player.play('hero-'+name);if(!this.motion)this.player.setFrame(playerAnimations[name as keyof typeof playerAnimations]?.frames[0]||0);}
  else{if(name==='walk'||name==='run')this.player.play('legacy-walk');else if(name==='idle')this.player.play('player-idle');else this.player.stop().setFrame(name==='cast'?3:4);}
  this.diagnostics();
 }
 private npcPose(pose:string){const key=this.npcKey==='training-v2'?'training-'+pose:this.npcKey+'-'+pose;if(this.anims.exists(key))this.npc.play(key);}
 private npcIdle(){const key=this.npcKey==='training-v2'?'training-idle':this.npcKey+'-idle';if(this.anims.exists(key))this.npc.play(key);this.npc.clearTint().setAlpha(1);}
 show(state:State|null){
  if(!this.ready)return;this.finishAction();
  const scene=state?scenes[state.scene]:null,encounter=state?.battle?encounters[state.battle.id]:null;
  this.currentStage=encounter?.stage||scene?.stage||'village';
  this.layered=['rear','ground','front'].every(layer=>this.textures.exists(`${this.currentStage}-${layer}-v2`));
  this.stage.setTexture(this.currentStage).setVisible(!this.layered);
  this.rear.setVisible(this.layered);this.ground.setVisible(this.layered);this.front.setVisible(this.layered);
  if(this.layered){this.rear.setTexture(this.currentStage+'-rear-v2');this.ground.setTexture(this.currentStage+'-ground-v2');this.front.setTexture(this.currentStage+'-front-v2');}
  this.props.forEach(p=>p.destroy());this.ambient.forEach(p=>p.destroy());this.props=[];this.ambient=[];this.memoryProps=0;
  const addProp=(frame:number,x:number,y:number)=>{if(this.textures.exists('props-v2')){const prop=this.add.sprite(x,y,'props-v2',frame).setOrigin(.5,1).setDepth(y);this.props.push(prop);return true;}return false;};
  if(this.layered){for(const prop of stageLayouts[this.currentStage].props)addProp(prop.frame,prop.x,prop.y);
   if(this.textures.exists('ambient-v2'))for(const anchor of stageLayouts[this.currentStage].ambient){const sprite=this.add.sprite(anchor.x,anchor.y,anchor.kind==='water'&&this.textures.exists('water-v3')?'water-v3':'ambient-v2').setDepth(anchor.kind==='cloud'?-950:800);sprite.setData('anchor',anchor).play('ambient-'+(anchor.kind==='water'&&!this.textures.exists('water-v3')?'glow':anchor.kind));this.ambient.push(sprite);}
   if(state?.flags.archive_read&&this.currentStage==='archive'){if(addProp(7,278,179))this.memoryProps++;}
   if(state?.flags.stream_clean&&this.currentStage==='stream'){if(addProp(5,411,222))this.memoryProps++;}
   if(state?.flags.lumi_helped&&this.currentStage==='village'){if(addProp(6,246,172))this.memoryProps++;}
   if(state?.flags.garden_tended&&this.currentStage==='garden'){if(addProp(5,264,205))this.memoryProps++;}
   if(state?.flags.forest_clue&&this.currentStage==='forest'){if(addProp(7,281,210))this.memoryProps++;}
  }
  this.npcKey=encounter?.actor||(state?.flags.lumi_helped&&scene?.id==='S02_HUB'?'lumi':scene?.npc||'pip');
  if(!this.textures.exists(this.npcKey))this.npcKey=encounter?.fallbackActor||(this.npcKey==='eira-v3'?'maren':'sprout');
  this.mist?.setVisible(this.currentStage==='stream'&&!state?.flags.stream_clean);
  this.npc.setTexture(this.npcKey);this.npcIdle();this.player.setPosition(state?.battle?130:154,219).clearTint().setAlpha(1);
  this.npcHomeX=state?.battle?350:338;this.npc.setPosition(this.npcHomeX,212);this.player.setDepth(this.player.y+20);this.npc.setDepth(this.npc.y+20);this.pose('idle');this.parallax.value=0;this.phase='idle';this.diagnostics();
 }
 finishAction(){
  this.generation++;
  if(!this.ready)return;
  this.tweens.killTweensOf(this.player);this.tweens.killTweensOf(this.npc);this.tweens.killTweensOf(this.parallax);
  for(const effect of this.effects){this.tweens.killTweensOf(effect);effect.destroy();}this.effects.clear();
  for(const settle of [...this.settlers])settle();this.settlers.clear();
  this.player.clearTint().setAlpha(1);this.npc.clearTint().setAlpha(1);this.npc.setX(this.npcHomeX);this.npcIdle();this.pose('idle');this.phase='idle';this.parallax.value=0;this.diagnostics();
 }
 setReduced(reduced:boolean){this.motion=!reduced;if(this.ready&&reduced)this.finishAction();this.diagnostics();}
 private beat(target:object,properties:Omit<Phaser.Types.Tweens.TweenBuilderConfig,'targets'>,token:number):Promise<void>{
  if(token!==this.generation)return Promise.resolve();
  return new Promise(resolve=>{let done=false;const settle=()=>{if(done)return;done=true;this.settlers.delete(settle);resolve();};this.settlers.add(settle);this.tweens.add({...properties,targets:target,onComplete:settle});});
 }
 private castEffect(reduced:boolean,spell?:Spell,target?:'scene'){
  const color=spell?.vfx.color||0xffdf90,shape=spell?.form||'ORB',modifier=spell?.mod||'SEEK';
  const support=target!=='scene'&&!!spell&&(spell.heal>0||spell.shield>0);
  const sourceX=this.player.x,sourceY=this.player.y-12;
  const scenery=target==='scene'?stageLayouts[this.currentStage].spellTarget:undefined;
  const targetX=scenery?.x??(support?this.player.x:this.npc.x),targetY=scenery?.y??((support?this.player.y:this.npc.y)-8);
  this.writeMetric('spellTarget',JSON.stringify({kind:scenery?'scene':support?'player':'npc',x:targetX,y:targetY}));
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
 async action(cue:string,reduced:boolean,spell?:Spell,before?:State,next?:State,command?:string,target?:'scene'){
  if(!this.ready)return;
  this.finishAction();this.motion=!reduced;const token=this.generation;this.phase='action';this.lastCue=cue;this.lastOutcome=outcomeFor(before,next,command);this.pose(poseFor(cue));if(cue==='talk'||cue==='pick')this.npcPose('talk');
  if(spell||cue==='cast'||cue==='craft')this.castEffect(reduced,spell,target);
  const destination=cue==='walk'?(command==='FLEE'?80:230):cue==='pick'?182:this.player.x;
  if(!reduced&&cue==='walk')this.tweens.add({targets:this.parallax,value:6,duration:480});
  await this.beat(this.player,{x:destination,y:cue==='pick'?223:219,duration:reduced?55:cue==='craft'?800:cue==='cast'?560:480,yoyo:cue!=='walk'},token);
  if(token!==this.generation)return;
  if(before?.battle&&next){
   this.phase='reaction';this.diagnostics();
   if(next.hp<before.hp){this.pose('hit');this.player.setTint(0xf2b193);}
   if(next.battle&&next.battle.enemyHp<before.battle.enemyHp||this.lastOutcome==='win'){
    this.npcPose('hit');this.npc.setTint(0xffe3b6);
   }
   if(next.battle?.playerStatus.VEIL&&!before.battle.playerStatus.VEIL){
    this.npcPose('attack');await this.beat(this.npc,{alpha:.7,duration:reduced?20:120,yoyo:true},token);
   }
   if(next.battle?.log.some(line=>line.includes(' โจมตี ')||line.includes('โจมตีพลาด'))){
    this.npcPose('attack');
    await this.beat(this.npc,{x:this.npcHomeX-10,duration:reduced?20:120,yoyo:true},token);
   }
   if(token!==this.generation)return;
   if(this.lastOutcome==='win'){
    await this.beat(this.npc,{alpha:0,duration:reduced?25:200},token);
    if(token!==this.generation)return;this.pose('victory');
    await this.beat(this.player,{y:reduced?219:216,duration:reduced?25:350,yoyo:true},token);
   }else if(this.lastOutcome==='lose'){
    this.pose('hit');await this.beat(this.player,{alpha:.65,duration:reduced?25:200,yoyo:true},token);
   }
  }
  if(token===this.generation){this.pose('idle');this.phase='idle';this.diagnostics();}
 }
}
export function startWorld(parent:HTMLElement){
 const world=new World(parent);
 const game=new Phaser.Game({type:Phaser.AUTO,parent,width:480,height:270,backgroundColor:'#a5d6d0',pixelArt:true,roundPixels:true,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[world],audio:{noAudio:true},loader:{timeout:8000}});
 return {world,game};
}
