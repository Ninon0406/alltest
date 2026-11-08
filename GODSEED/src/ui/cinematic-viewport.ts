/** Bring an authored animation into view on a scrolling phone/tablet page.
 * Presentation only: no state, focus, storage, timers or smooth scrolling.
 * Reduced motion and side-by-side layouts keep their existing reading position.
 */
export function revealCinematic(canvas:HTMLElement,reduced:boolean,readingPosition?:{left:number;top:number}){
 const rect=canvas.getBoundingClientRect();
 if(reduced||innerWidth>900||innerHeight<=500||rect.top>=0&&rect.bottom<=innerHeight)return;
 const previous=readingPosition||{left:scrollX,top:scrollY};
 canvas.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
 let restored=false;
 return ()=>{if(restored)return;restored=true;window.scrollTo({...previous,behavior:'instant'});};
}
