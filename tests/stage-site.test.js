import {it,expect} from 'vitest';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

it('the actual Pages staging command retains cached builds in both branch files and the Actions artifact',async()=>{
 const root=await mkdtemp(join(tmpdir(),'reborn-stage-'));
 try{
  for(const dir of ['assets','art','dist/assets','dist/art'])await mkdir(join(root,dir),{recursive:true});
  const html='<script src="./assets/current.js"></script>';
  for(const [file,body]of Object.entries({'dist/index.html':html,'dist/assets/current.js':'current runtime','assets/old.js':'cached runtime','assets/old.css':'cached style','art/old.svg':'cached illustration','dist/art/current.svg':'current illustration'}))await writeFile(join(root,file),body);
  const result=spawnSync(process.execPath,[resolve('scripts/stage-site.mjs')],{cwd:root,encoding:'utf8'});expect(result.status,result.stderr).toBe(0);
  for(const prefix of ['', 'dist/']){
   expect(await readFile(join(root,`${prefix}assets/old.js`),'utf8')).toBe('cached runtime');
   expect(await readFile(join(root,`${prefix}assets/old.css`),'utf8')).toBe('cached style');
   expect(await readFile(join(root,`${prefix}assets/current.js`),'utf8')).toBe('current runtime');
   expect(await readFile(join(root,`${prefix}art/old.svg`),'utf8')).toBe('cached illustration');
   expect(await readFile(join(root,`${prefix}art/current.svg`),'utf8')).toBe('current illustration');
   expect(await readFile(join(root,`${prefix}index.html`),'utf8')).toBe(html);
  }
  expect(await readFile(join(root,'.nojekyll'),'utf8')).toBe('');
 }finally{await rm(root,{recursive:true,force:true});}
});
