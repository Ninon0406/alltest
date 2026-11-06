import {STAGES,stageFolder,stageFallback,type StageId} from './stage-layout';
export type ArtAsset={key:string;path:string;group:'shared'|StageId;alsoFor?:readonly StageId[];frame?:{frameWidth:number;frameHeight:number}};
const image=(key:string,path:string,group:ArtAsset['group']):ArtAsset=>({key,path,group});
const sheet=(key:string,path:string,group:ArtAsset['group'],frameWidth=32,frameHeight=48):ArtAsset=>({key,path,group,frame:{frameWidth,frameHeight}});
/** Static asset URLs only. This catalog and its RAM ledger contain no progress. */
export const artAssets:readonly ArtAsset[]=[
 image('sky','sky.png','shared'),
 ...['player','pip','lumi','maren','koro','sprout'].map(key=>sheet(key,key+'.png','shared')),
 sheet('props-v2','art-v2/props.png','shared',64,96),sheet('ambient-v2','art-v2/ambient.png','shared',32,32),
 sheet('hero-v2','art-v2/player.png','shared'),sheet('hero-walk-v4','art-v4/hero-walk.png','shared'),sheet('hero-idle-v5','art-v5/hero-idle.png','shared'),
 sheet('gathering-v6','art-v6/gathering.png','shared',24,24),
 sheet('life-icons-v14','art-v14/life-icons.png','shared',32,32),
 ...STAGES.flatMap(stage=>[image(stage,stageFallback(stage),stage),...['rear','ground','front'].map(layer=>image(`${stage}-${layer}-v2`,`${stageFolder(stage)}/${stage}-${layer}.png`,stage))]),
 ...['rear','ground','front'].map(layer=>image('tree-'+layer+'-v5','art-v5/tree-'+layer+'.png','village')),
 image('ancient-tree-v5','art-v5/ancient-tree.png','village'),sheet('fountain-v5','art-v5/fountain.png','village',96,112),sheet('leaves-v5','art-v5/leaves.png','village',16,16),
 sheet('festival-props-v13','art-v13/festival-props.png','village',64,96),
 ...['rear','ground','front'].map(layer=>image('workshop-'+layer+'-legacy','art-v2/workshop-'+layer+'.png','workshop')),
 sheet('workshop-cauldron-v11','art-v11/cauldron.png','workshop',96,96),sheet('workshop-toolbox-v11','art-v11/toolbox.png','workshop',56,40),sheet('hero-toolbox-v11','art-v11/hero-toolbox.png','workshop',64,48),sheet('hero-brew-v11','art-v11/hero-brew.png','workshop'),sheet('recipe-parts-v11','art-v11/ingredients.png','workshop',16,16),
 ...['rear','ground','front'].map(layer=>image('garden-'+layer+'-legacy','art-v2/garden-'+layer+'.png','garden')),
 image('garden-arch-v9','art-v9/garden-arch.png','garden'),sheet('garden-cauldron-v9','art-v9/garden-cauldron.png','garden',64,96),sheet('garden-herbs-v9','art-v9/garden-herbs.png','garden',96,48),
 sheet('maren-v8','art-v8/maren.png','garden'),sheet('garden-bed-v7','art-v7/garden-bed.png','garden',64,48),sheet('hero-water-v7','art-v7/hero-water.png','garden',64,48),
 sheet('training-v2','art-v2/training.png','workshop'),sheet('koro-v10','art-v10/koro.png','workshop'),image('workshop-anvil-v10','art-v10/anvil.png','workshop'),{...sheet('eira-v3','art-v3/eira.png','archive'),alsoFor:['ruins']},
 sheet('ruins-altar-v12','art-v12/altar.png','ruins',96,112),sheet('ruins-pillars-v12','art-v12/pillar.png','ruins',48,112),sheet('sentinel-v12','art-v12/sentinel.png','ruins',64,64),sheet('hero-ruins-v12','art-v12/hero-ruins.png','ruins'),
 image('stream-mist-v3','art-v3/stream-mist.png','stream'),{...sheet('water-v3','art-v3/water.png','stream',32,32),alsoFor:['ruins']},sheet('wisp-v3','art-v3/wisp.png','stream'),
];
export const artForStage=(stage:StageId)=>artAssets.filter(asset=>asset.group==='shared'||asset.group===stage||!!asset.alsoFor?.includes(stage));
/** Failed files are attempted again only on an explicit retry. Successful assets
 * stay in Phaser's memory cache; scene revisits do not issue new requests. */
export class ArtLedger {
 private attempts=new Map<string,number>();
 private successful=new Set<string>();
 private failures=new Set<string>();
 pending(stage:StageId,retry=false){return artForStage(stage).filter(a=>retry?this.failures.has(a.key):!this.attempts.has(a.key));}
 request(assets:readonly ArtAsset[]){for(const a of assets)this.attempts.set(a.key,(this.attempts.get(a.key)||0)+1);}
 complete(key:string){this.successful.add(key);this.failures.delete(key);}
 fail(key:string){this.failures.add(key);}
 /** Phaser decode errors do not emit loaderror. Reconcile every settled batch. */
 settle(){for(const key of this.attempts.keys())if(!this.successful.has(key))this.failures.add(key);}
 errors(stage:StageId){return artForStage(stage).filter(a=>this.failures.has(a.key)).map(a=>a.key);}
 get requests(){return [...this.attempts.values()].reduce((a,b)=>a+b,0);}
 get loaded(){return this.successful.size;}
}
