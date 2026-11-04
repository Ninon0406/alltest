import {cp,readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';import path from 'node:path';
const game=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),root=path.dirname(game);
const html=await readFile(path.join(game,'dist/index.html'),'utf8');if(!html.includes('assets/'))throw Error('Build GODSEED first');
await mkdir(path.join(root,'assets'),{recursive:true});
await cp(path.join(game,'dist/assets'),path.join(root,'assets'),{recursive:true});
await cp(path.join(root,'assets'),path.join(game,'dist/assets'),{recursive:true});
await writeFile(path.join(root,'index.html'),html);await writeFile(path.join(root,'.nojekyll'),'');
console.log('Staged GODSEED for main:/ Pages; retained previous GODSEED hashes in artifact');
