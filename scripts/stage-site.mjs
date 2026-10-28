// Pages currently serves main:/; keep generated publication files separate from app.html source.
import { cp, readFile, writeFile } from 'node:fs/promises';
const html=await readFile('dist/index.html','utf8');
if(!html.includes('assets/') || html.includes('/src/main.js'))throw Error('Build dist before staging');
await writeFile('index.html',html);
for(const directory of ['assets','art'])await cp(`dist/${directory}`,directory,{recursive:true});
await writeFile('.nojekyll','');
console.log('Staged built site for existing main:/ GitHub Pages source');
