import {locations} from '../world/locations.js';
import {sprite} from './avatar/sprite.js';
import {locationArt} from './scene-art.js';
export {locationArt} from './scene-art.js';
export function renderLocationArt(parent,location){
 const image=document.createElement('img');image.src=`${import.meta.env?.BASE_URL??'/'}assets/scenes/${location.id}.png`;image.alt=`ภูมิทัศน์${location.name}`;image.width=320;image.height=160;image.className='location-image';
 image.onerror=()=>{image.remove();const fallback=document.createElement('div');fallback.innerHTML=locationArt(location);parent.prepend(fallback);};parent.append(image);
}
export function renderScene(parent,state){
 const location=locations[state.world.currentLocationId],scene=document.createElement('figure');scene.className='play-scene';
 renderLocationArt(scene,location);const actor=document.createElement('div');actor.className='scene-character';actor.innerHTML=sprite(state);scene.append(actor);
 const caption=document.createElement('figcaption');caption.textContent=`${location.name} · ${location.parent}`;scene.append(caption);parent.append(scene);
}
