export async function checkPublishedEquipment(page){
 return page.evaluate(async()=>{
  const response=await fetch(new URL('assets/sprites/garments/manifest.json',location.href));if(!response.ok)throw Error('Missing equipment manifest');const m=await response.json();if(m.version!==1||m.files.length!==6)throw Error('Wrong equipment manifest');
  const hashes=new Set();for(const file of m.files){
   if(!/^assets\/sprites\/garments\/[a-z_]+\.png$/.test(file.path))throw Error('Invalid equipment path');
   const response=await fetch(new URL(file.path,location.href));if(!response.ok)throw Error('Missing equipment file');const data=await response.arrayBuffer(),digest=[...new Uint8Array(await crypto.subtle.digest('SHA-256',data))].map(b=>b.toString(16).padStart(2,'0')).join('');if(digest!==file.sha256)throw Error('Wrong equipment hash');hashes.add(digest);
   const blob=URL.createObjectURL(new Blob([data],{type:'image/png'}));try{const img=new Image();img.src=blob;await img.decode();if(img.naturalWidth!==64||img.naturalHeight!==80)throw Error('Wrong equipment dimensions');}finally{URL.revokeObjectURL(blob);}
  }if(hashes.size!==6)throw Error('Duplicate equipment art');return hashes.size;
 });
}
