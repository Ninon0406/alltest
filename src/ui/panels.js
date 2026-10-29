import {stopYearlyAuto} from './yearly-view.js';
let active=null,draw=null,trigger=null,triggerLabel=null,onDismiss=null,ignoredCloseEvents=0;
const dialog=()=>document.getElementById('modalOverlay');
export const panelKey=()=>active;
function cleanup(){const callback=onDismiss;active=null;draw=null;onDismiss=null;document.getElementById('modalContent').replaceChildren();document.body.classList.remove('panel-open');callback?.();const target=trigger?.isConnected?trigger:[...document.querySelectorAll('button')].find(b=>(b.getAttribute('aria-label')??b.textContent)===triggerLabel)??document.querySelector('[data-view="game"]');target?.focus({preventScroll:true});}
export function closePanel(){if(!dialog().open)return;ignoredCloseEvents++;dialog().close();cleanup();}
export function refreshPanel(){
 if(!active||!draw)return;
 const content=document.getElementById('modalContent'),top=content.scrollTop,focused=document.activeElement;
 const wasInside=content.contains(focused);
 const label=focused?.getAttribute('aria-label'),text=focused?.textContent;
 const sections=new Map([...content.querySelectorAll('details[data-panel-section]')].map(n=>[n.dataset.panelSection,n.open]));
 content.replaceChildren();draw(content);
 for(const section of content.querySelectorAll('details[data-panel-section]'))if(sections.has(section.dataset.panelSection))section.open=sections.get(section.dataset.panelSection);
 content.scrollTop=top;
 const replacement=[...content.querySelectorAll('button,input,select,summary')].find(e=>label?e.getAttribute('aria-label')===label:text&&e.textContent===text);
 if(wasInside)(replacement??document.getElementById('closePanel')).focus({preventScroll:true});
}
export function openPanel(key,title,render,dismiss,restoreFocus){
 stopYearlyAuto();const modal=dialog();
 if(!modal.open){trigger=restoreFocus??document.activeElement;triggerLabel=trigger?.getAttribute('aria-label')??trigger?.textContent;}
 active=key;draw=render;onDismiss=dismiss;document.getElementById('panelTitle').textContent=title;
 const content=document.getElementById('modalContent');content.replaceChildren();render(content);content.scrollTop=0;
 document.body.classList.add('panel-open');if(!modal.open)modal.showModal();document.getElementById('closePanel').focus({preventScroll:true});
}
export function initPanels(){
 document.getElementById('closePanel').onclick=closePanel;
 dialog().addEventListener('cancel',e=>{e.preventDefault();closePanel();});
 dialog().addEventListener('keydown',e=>{
  if(e.key!=='Tab')return;
  const targets=[...dialog().querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),summary,[tabindex="0"]')].filter(n=>n.getClientRects().length>0);
  const first=targets[0],last=targets.at(-1);
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
 });
 dialog().addEventListener('close',()=>{if(ignoredCloseEvents){ignoredCloseEvents--;return;}cleanup();});
 dialog().addEventListener('click',e=>{if(e.target===dialog()){const r=dialog().getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closePanel();}});
}
