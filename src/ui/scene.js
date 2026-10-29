import {locations} from '../world/locations.js';
import {sprite} from './avatar/sprite.js';
import {locationArt} from './scene-art.js';
import {sceneContext} from '../world/scene-context.js';
import {interiorArt} from './interior-art.js';
export {locationArt} from './scene-art.js';
export function renderLocationArt(parent,location,context){
 const inside=context&&context.kind!=='outdoor';
 const image=document.createElement('img');image.src=`${import.meta.env?.BASE_URL??'/'}${context?.path??`assets/scenes/${location.id}.png`}`;image.alt=inside?`${context.label} ณ ${location.name}`:`ภูมิทัศน์${location.name}`;image.width=320;image.height=160;image.className='location-image';
 image.onerror=()=>{image.remove();const fallback=document.createElement('div');fallback.className='scene-art-fallback';fallback.innerHTML=inside?interiorArt(location.parent,context.kind):locationArt(location);parent.prepend(fallback);};parent.append(image);
}
export function renderScene(parent,state){
 const location=locations[state.world.currentLocationId],context=sceneContext(state),scene=document.createElement('figure');scene.className='play-scene';scene.dataset.locationId=context.locationId;scene.dataset.context=context.kind;scene.dataset.assetId=context.assetId;
 renderLocationArt(scene,location,context);const actor=document.createElement('div');actor.className='scene-character';actor.innerHTML=sprite(state);scene.append(actor);
 const caption=document.createElement('figcaption');caption.textContent=context.kind==='outdoor'?`${location.name} · ${location.parent}`:`${context.label} · ${location.name}`;scene.append(caption);parent.append(scene);
}
