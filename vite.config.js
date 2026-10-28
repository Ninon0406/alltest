import { rename } from 'node:fs/promises';
import { defineConfig } from 'vite';
export default defineConfig({
 base:'./',
 plugins:[{
  name:'source-html-entry',
  configureServer(server){server.middlewares.use((req,_res,next)=>{if(req.url==='/' || req.url?.startsWith('/?'))req.url=req.url.replace('/','/app.html');next();});},
  async closeBundle(){await rename('dist/app.html','dist/index.html');},
 }],
 build:{rollupOptions:{input:'app.html'}},
 test:{include:['tests/**/*.test.js']},
});
