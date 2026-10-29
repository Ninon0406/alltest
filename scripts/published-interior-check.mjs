export async function checkPublishedInteriors(page){
 return page.evaluate(async()=>{
  const response=await fetch(new URL('assets/scenes/interiors/manifest.json',location.href));if(!response.ok)throw Error('Missing interior manifest');const m=await response.json();
  if(m.version!==1||m.images.length!==16||Object.keys(m.bindings).length!==20)throw Error('Missing interior mappings');
  const ids=new Set(m.images.map(e=>e.id)),hashes=new Set();
  for(const binding of Object.values(m.bindings))for(const kind of ['home','classroom','ceremony'])if(!ids.has(binding[kind]))throw Error('Invalid published node binding');
  for(let n=0;n<m.images.length;n+=8)await Promise.all(m.images.slice(n,n+8).map(async e=>{
   if(e.file!==`${e.id}.png`||!/^[a-z-]+\.png$/.test(e.file))throw Error('Invalid interior path');
   const r=await fetch(new URL('assets/scenes/interiors/'+e.file,location.href));if(!r.ok)throw Error('Missing room '+e.id);const data=await r.arrayBuffer(),digest=[...new Uint8Array(await crypto.subtle.digest('SHA-256',data))].map(b=>b.toString(16).padStart(2,'0')).join('');if(digest!==e.sha256)throw Error('Wrong interior pixels '+e.id);hashes.add(digest);
   const blob=URL.createObjectURL(new Blob([data],{type:'image/png'}));try{const img=new Image();img.src=blob;await img.decode();if(img.naturalWidth!==320||img.naturalHeight!==160)throw Error('Wrong room dimensions');}finally{URL.revokeObjectURL(blob);}
  }));
  if(hashes.size!==16)throw Error('Duplicate room files');return m.images.length;
 });
}
