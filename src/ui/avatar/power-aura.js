import {hasPower} from '../../progression/power-model.js';
export function powerAura(state){
 if(!hasPower(state)||state.age<12||state.power.level<5||state.power.practiceDays===0)return '';
 const milestone=state.power.level>=10?10:5,color=milestone===10?'#e8c57b':'#91c8cf';
 return `<g class="power-aura" data-power-milestone="${milestone}" fill="none" stroke="${color}" opacity=".7"><ellipse cx="32" cy="76" rx="23" ry="3"/>${milestone===10?'<ellipse cx="32" cy="75" rx="19" ry="4"/>':''}<path d="M8 61v3m47-10v3${milestone===10?'M12 45v3m40-8v3':''}" stroke-width="2"/></g>`;
}
