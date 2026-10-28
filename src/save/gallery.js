import { Scenes } from '../data/scenes.js';
const validIds=new Set(Object.values(Scenes).filter(s=>s.isEnding).map(s=>s.endingId));
export function readGallery(storage){try{const ids=JSON.parse(storage.getItem('reborn_ending_gallery')??'[]');return Array.isArray(ids)?ids.filter(id=>validIds.has(id)):[];}catch{return [];}}
export function storeGallery(storage,ids){const all=[...new Set([...readGallery(storage),...ids.filter(id=>validIds.has(id))])];storage.setItem('reborn_ending_gallery',JSON.stringify(all));return all;}
