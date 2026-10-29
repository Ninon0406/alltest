import {locations} from '../world/locations.js';
const colors={อาร์เวเนีย:['#8bb6bb','#667a65','#344c47','#b99a73'],วัลดอร์:['#a6b4c2','#6e7988','#424f63','#aaa18a'],เซเลสเทีย:['#a1a8cc','#747d9d','#454a70','#c7b38b'],ไนท์เวียร์:['#88a9a3','#577867','#294c45','#a3b782'],อาเคลอน:['#90c7cf','#5797a6','#37697e','#b7ac81']};
export function locationArt(location){
 const c=colors[location.parent],n=Object.keys(locations).indexOf(location.id),x=40+n*7%130;
 const rect=(x,y,w,h,color)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`;
 let svg=rect(0,0,320,160,c[0])+rect(0,103,320,57,c[2])+`<path d="M0 104L42 54 80 90 137 35 186 98 240 61 320 108Z" fill="${c[1]}"/>`;
 svg+=rect(231-n%9*5,17,15,15,'#f3dbab')+rect(0,138,320,22,c[3]);
 for(let i=0;i<9;i++)svg+=rect((i*47+n*13)%320,115+i%3*4,22,2,c[1]);
 if(location.parent==='อาเคลอน')svg+=rect(0,109,320,28,'#5391ad')+rect(200,120,93,4,'#866e58')+rect(214,120,4,26,'#866e58');
 if(location.tags.includes('forest')||location.tags.includes('rural'))for(let i=0;i<4;i++)svg+=rect(15+i*80+n%12,78+i%2*10,5,60,'#675d52')+rect(2+i*80+n%12,55+i%2*10,32,42,c[2]);
 const building=location.tags.some(t=>['market','capital','forge','library','school','herb','port'].includes(t));
 if(building)svg+=rect(x,83,62,49,c[3])+`<path d="M${x-5} 83L${x+30} 61 ${x+67} 83Z" fill="#755b60"/>`+rect(x+11,95,12,14,'#d6c89e')+rect(x+36,105,13,27,'#50596b');
 if(location.tags.includes('ruins')||location.tags.includes('mine')||location.tags.includes('road'))svg+=rect(x,90,15,45,'#898d8f')+rect(x+46,78,17,57,'#898d8f')+rect(x-4,83,72,8,'#a1a6a5');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160" preserveAspectRatio="xMidYMax slice" shape-rendering="crispEdges" role="img" aria-label="ภูมิทัศน์${location.name}">${svg}</svg>`;
}
