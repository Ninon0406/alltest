import type {State} from './state';
import {encodeSave,validateSaveState} from './save-file';
/** The whole session lives in RAM. Export requires an explicit player action. */
export class ManualSession {
 current:State|null=null;
 dirty=false;
 private generation=0;
 private exportedAt=-1;
 commit(state:State){this.current=validateSaveState(state);this.generation++;this.exportedAt=-1;this.dirty=true;}
 load(state:State){this.current=validateSaveState(state);this.generation++;this.exportedAt=-1;this.dirty=false;}
 clear(){this.current=null;this.generation++;this.exportedAt=-1;this.dirty=false;}
 get canConfirmExport(){return !!this.current&&this.exportedAt===this.generation;}
 async exportFile(){
  if(!this.current)throw Error('ยังไม่มีเกมให้บันทึก');const generation=this.generation,text=await encodeSave(this.current);
  if(generation===this.generation)this.exportedAt=generation;
  return {name:`GODSEED_Save_${new Date().toISOString().slice(0,10)}.godseed`,text};
 }
 confirmExport(){if(!this.canConfirmExport)throw Error('กรุณาบันทึกไฟล์ของความคืบหน้าปัจจุบันก่อน');this.dirty=false;this.exportedAt=-1;}
}
