import Phaser from 'phaser';
import {scenes} from '../content/story';import type {State} from '../engine/state';import type {Spell} from '../systems/spells';
export class World extends Phaser.Scene {
 player!:Phaser.GameObjects.Sprite; npc!:Phaser.GameObjects.Sprite;stage!:Phaser.GameObjects.Image; motes:Phaser.GameObjects.Rectangle[]=[]; ready=false;motion=true;
 constructor(){super('world');}
 preload(){const b=import.meta.env.BASE_URL+'assets/';for(const n of ['sky','village','garden','workshop','forest'])this.load.image(n,b+n+'.png');for(const n of ['player','pip','lumi','maren','koro','sprout'])this.load.spritesheet(n,b+n+'.png',{frameWidth:32,frameHeight:48});}
 create(){this.add.image(240,135,'sky');this.stage=this.add.image(240,135,'village');for(const n of ['player','pip','lumi','maren','koro','sprout'])this.anims.create({key:n+'-idle',frames:this.anims.generateFrameNumbers(n,{frames:[0,1,2,1]}),frameRate:5,repeat:-1});
 this.add.ellipse(154,238,29,7,0x263f42,.23);this.add.ellipse(338,232,29,7,0x263f42,.23);
 this.player=this.add.sprite(154,219,'player').play('player-idle');this.npc=this.add.sprite(338,212,'pip').play('pip-idle');
 for(let i=0;i<16;i++)this.motes.push(this.add.rectangle((i*37)%480,110+(i*19)%110,2,2,i%2?0xffe3a0:0xe0f1b8,.7));
 this.anims.create({key:'player-walk',frames:this.anims.generateFrameNumbers('player',{frames:[0,1,2,1,0,2]}),frameRate:10,repeat:-1});this.ready=true;this.game.events.emit('world-ready');}
 update(time:number){if(!this.ready)return;this.motes.forEach((m,i)=>{m.y=120+((time/(this.motion?55:100000)+i*19)%110);m.x=(i*37+Math.sin(time/2000+i)*(this.motion?8:0))%480;});}
 show(s:State|null){if(!this.ready)return;const scene=s?scenes[s.scene]:null;this.stage.setTexture(scene?.stage||'village');const actor=s?.battle?'sprout':scene?.npc||'pip';this.npc.setTexture(actor).play(actor+'-idle');this.player.setPosition(s?.battle?130:154,219);this.npc.setPosition(s?.battle?350:338,212);if(s?.flags.lumi_helped&&scene?.id==='S02_HUB')this.npc.play('lumi-idle');}
 async action(cue:string,reduced:boolean,sp?:Spell){if(!this.ready)return;this.motion=!reduced;this.player.stop().setFrame(cue==='cast'?3:4);if(cue==='walk')this.player.play('player-walk');
 if(sp||cue==='cast'){const color=sp?.vfx.color||0xffdf90;const shape=sp?.form||'ORB',mod=sp?.mod||'SEEK';const n=reduced?8:28;
 for(let i=0;i<n;i++){const t=i/n;const ring=['RING','WARD'].includes(shape);let x=ring?130+Math.cos(t*Math.PI*2)*35:155,y=ring?213+Math.sin(t*Math.PI*2)*22:203;
 if(shape==='RAIN'){x=300+t*90;y=80;}if(shape==='RAY'){x=155+t*190;y=207;}if(shape==='CHAIN'){x=155+t*190;y=200+Math.sin(t*14)*14;}
 const p=this.add.rectangle(x,y,shape==='RAY'?8:3,shape==='RAIN'?8:3,color,.9);this.tweens.add({targets:p,x:ring?x:shape==='RAIN'?x:330+(mod==='SPLIT'?(i%2?20:-20):0),y:ring?y-10:210+(mod==='SEEK'?Math.sin(t*6)*20:0),alpha:0,scale:mod==='AMPLIFY'?3:1,duration:reduced?100:550+i*4,onComplete:()=>p.destroy()});}
 }
 await new Promise<void>(resolve=>this.tweens.add({targets:this.player,x:cue==='walk'?230:this.player.x,y:cue==='pick'?224:219,duration:reduced?60:650,yoyo:cue!=='walk',onComplete:()=>resolve()}));this.player.play('player-idle');}
}
export function startWorld(parent:HTMLElement){const world=new World();const game=new Phaser.Game({type:Phaser.AUTO,parent,width:480,height:270,backgroundColor:'#a5d6d0',pixelArt:true,roundPixels:true,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[world],audio:{noAudio:true}});return {world,game};}
