import {chapters,type ChapterId} from '../content/chapters';
import {contentBatches} from '../content/story';
import type {State} from '../engine/state';

/** Derived metadata only, never a second saved progress counter. */
export function storyContext(state:Pick<State,'scene'|'battle'|'recoveryScene'|'flags'>){
 const node=state.battle?.checkpoint||(state.scene==='S28_RECOVER'?state.recoveryScene:state.scene);
 const batch=contentBatches.find(b=>b.sceneIds.includes(node));
 if(!batch)throw Error('ไม่พบข้อมูลบทของจุดบันทึกนี้');
 // Returning to an older hub/workshop must not display a lost chapter. Keep
 // journey context separate from the immutable ownership of the current node.
 const chapterId=(Object.keys(chapters) as ChapterId[]).filter(id=>id===batch.chapterId||chapters[id].activationFlag&&state.flags[chapters[id].activationFlag!]).sort((a,b)=>chapters[b].order-chapters[a].order)[0];
 return {chapterId,checkpointChapterId:batch.chapterId,batchId:batch.id,...chapters[chapterId]};
}
