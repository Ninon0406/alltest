// Browser-side integrity/decode checks shared by preview and actual Pages verification.
export async function waitForCharacterImages(page,selector='.pixel-sprite'){
 await page.evaluate(async selector=>{
  const sources=[...document.querySelectorAll(`${selector} image,${selector} img`)].map(n=>n.getAttribute('href')||n.getAttribute('src'));
  await Promise.all([...new Set(sources)].map(async src=>{const image=new Image();image.src=new URL(src,location.href);await image.decode();if(!image.naturalWidth)throw Error('Character image did not load');}));
 },selector);
}
export async function checkPublishedCharacters(page){
 return page.evaluate(async()=>{
  const response=await fetch(new URL('assets/sprites/manifest.json',location.href));if(!response.ok)throw Error('Missing character manifest');const m=await response.json();
  if(m.version!==2||m.files.length!==183)throw Error('Wrong character catalog');
  const groupHashes={};
  async function check(file){
   if(!file.path.startsWith('assets/sprites/characters/')||file.path.includes('..'))throw Error('Invalid character path');
   const r=await fetch(new URL(file.path,location.href));if(!r.ok)throw Error('Missing '+file.id);const data=await r.arrayBuffer(),digest=[...new Uint8Array(await crypto.subtle.digest('SHA-256',data))].map(b=>b.toString(16).padStart(2,'0')).join('');if(digest!==file.sha256)throw Error('Wrong published pixels '+file.id);
   const blob=URL.createObjectURL(new Blob([data],{type:'image/png'}));try{const img=new Image();img.src=blob;await img.decode();if(img.naturalWidth!==64||img.naturalHeight!==80)throw Error('Wrong sprite dimensions');}finally{URL.revokeObjectURL(blob);}
   (groupHashes[file.group]??=new Set()).add(digest);
  }
  for(let i=0;i<m.files.length;i+=8)await Promise.all(m.files.slice(i,i+8).map(check));
  if(Object.entries(groupHashes).some(([g,v])=>v.size!==(g==='support'?3:20))||Object.keys(groupHashes).length!==10)throw Error('Missing/duplicate variants');
  const bg=new Image();bg.src=new URL(m.background.path,location.href);await bg.decode();if(bg.naturalWidth!==m.background.width||bg.naturalHeight!==m.background.height)throw Error('Family background missing');
  return m.files.length;
 });
}
