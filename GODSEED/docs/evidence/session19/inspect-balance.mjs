import {createServer} from '../../../node_modules/vite/dist/node/index.js';
import {fileURLToPath} from 'node:url';
import {writeFile} from 'node:fs/promises';
const server=await createServer({root:fileURLToPath(new URL('../../../',import.meta.url)),configFile:false,server:{middlewareMode:true},appType:'custom',optimizeDeps:{noDiscovery:true,include:[]}});
try{const {fresh}=await server.ssrLoadModule('/src/engine/state.ts'),{choose,craft,fight}=await server.ssrLoadModule('/src/systems/game.ts');const rows=[];
 for(const policy of ['cast-until-empty','read-intent'])for(let seed=1;seed<=32;seed++){
 let s=fresh('สมดุลหุ่นรูน',seed);for(const id of ['CH0001','CH0101','CH0202','CH0401'])s=choose(s,id);s=craft(s,'WIND','ORB','SEEK');for(const id of ['CH0204','CH0701','CH1401','CH0207','CH1502'])s=choose(s,id);let turns=0;
 while(s.battle&&turns++<40)s=fight(s,s.mp<10||policy==='read-intent'&&s.battle.turn%3===0?'GUARD':'SPELL_WIND_ORB_SEEK');
 rows.push({policy,seed,result:s.scene==='S16_RUINS_RESULT'?'WIN':s.scene,hp:s.hp,mp:s.mp,turns,xp:s.xp,ward:s.inventory.FORM_WARD});
 }
 const policies=Object.fromEntries(['cast-until-empty','read-intent'].map(p=>{const r=rows.filter(r=>r.policy===p);return[p,{runs:r.length,wins:r.filter(r=>r.result==='WIN').length,turns:[Math.min(...r.map(r=>r.turns)),Math.max(...r.map(r=>r.turns))],hp:[Math.min(...r.map(r=>r.hp)),Math.max(...r.map(r=>r.hp))],mp:[Math.min(...r.map(r=>r.mp)),Math.max(...r.map(r=>r.mp))]}];}));
 const out={kind:'pure-engine deterministic simulation; no human fun/hardware claim',starter:'WIND_ORB_SEEK; original100HP/40MP; genuine story grants only',policies,rows};await writeFile(new URL('./balance.json',import.meta.url),JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(policies));
}finally{await server.close();}
