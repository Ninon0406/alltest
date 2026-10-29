// Bake the original pixel tile compositions into real, local, location-bound PNGs.
// Regenerate intentionally; builds consume committed files and do not need a browser.
import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {locations} from '../src/world/locations.js';
import {locationArt} from '../src/ui/scene-art.js';
const directory='public/assets/scenes';await mkdir(directory,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH??'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:320,height:160},deviceScaleFactor:1}),images=[];
 for(const location of Object.values(locations)){
  await page.setContent(`<style>html,body{margin:0;width:320px;height:160px;overflow:hidden}svg{display:block;width:320px;height:160px}</style>${locationArt(location)}`);
  const file=`${location.id}.png`,bytes=await page.screenshot({path:`${directory}/${file}`});
  images.push({locationId:location.id,file,width:320,height:160,sha256:createHash('sha256').update(bytes).digest('hex')});
 }
 await writeFile(`${directory}/manifest.json`,JSON.stringify({version:1,source:'src/ui/scene-art.js',images},null,2)+'\n');
 console.log(`Generated ${images.length} original location PNGs`);
}finally{await browser.close();}
