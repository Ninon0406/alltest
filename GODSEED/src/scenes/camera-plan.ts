/** 1.08 overscan leaves 17.78px each side; 12px pan stays inside the artwork. */
export const cameraFraming={zoom:1.08,pan:12,duration:450} as const;
export function cameraShot(x:number,reduced:boolean){return {zoom:reduced?1:cameraFraming.zoom,scrollX:reduced?0:Math.sign(x-240)*cameraFraming.pan,scrollY:0};}
export function cameraFocus(p:{cue:string;playerX:number;npcX:number;pathX?:number;sceneX?:number;offensive:boolean}){
 return p.pathX??p.sceneX??(p.cue==='talk'||p.cue==='cast'&&p.offensive?p.npcX:p.playerX);
}
