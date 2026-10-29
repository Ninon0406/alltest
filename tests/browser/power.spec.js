import {test} from '@playwright/test';
import {start} from './helpers.js';
import {powerPlaythrough} from '../../scripts/power-playthrough.mjs';
test('power uses actual timed practice, manual first-realm choices, real benefits and a fresh rebirth',async({page},info)=>{
 test.setTimeout(90000);await start(page);await powerPlaythrough(page,{choice:info.project.name==='mobile'?'reflect':'steady'});
});
