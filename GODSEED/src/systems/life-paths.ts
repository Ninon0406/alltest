export type LifePathId='EXPLORER'|'NATURE_KEEPER';
export type PathAbilityId='TRAIL_FOCUS'|'ROOT_REFUGE';
export type LifePathStatus='locked'|'available'|'learning'|'rank1'|'rank2';
type PathState={flags:Record<string,boolean>};
type Objective={flag:string;label:string};
export type LifePathDefinition={
 id:LifePathId;name:string;mentor:string;mentorId:string;location:string;locationId:string;
 startedFlag:string;rank1Flag:string;trialFlag:string;rank2Flag:string;
 requirements:{start:readonly Objective[];rank1:readonly Objective[]};
 limits:readonly string[];activities:readonly string[];
 ability:{id:PathAbilityId;name:string;description:string};
 iconBase:0|3;
};
const opening={flag:'arc1_opening_complete',label:'ผ่านคืนแรกของงานฉลองและรับของขอบคุณในเช้าวันใหม่'};
/** Only paths with authored introductory lessons are exposed. Future paths are not cards. */
export const lifePaths:readonly LifePathDefinition[]=[
 {
  id:'EXPLORER',name:'นักสำรวจ',mentor:'พิพ',mentorId:'PIP',location:'ใต้ต้นเมล็ด',locationId:'under_tree',
  startedFlag:'lp_explorer_started',rank1Flag:'lp_explorer_rank1',trialFlag:'lp_explorer_trial_passed',rank2Flag:'lp_explorer_rank2',iconBase:0,
  requirements:{start:[opening],rank1:[
   {flag:'lp_explorer_surveyed',label:'สำรวจร่องรอยและสภาพเส้นทางกับพิพ'},
   {flag:'lp_explorer_marked',label:'บันทึกเครื่องหมายที่ผู้อื่นใช้ตามทางได้'},
  ]},
  activities:['สำรวจเส้นทางผ่านตัวเลือก','อ่านร่องรอยก่อนสรุป','นำบันทึกกลับให้อาจารย์ตรวจ','ทดสอบสิ่งที่เรียนในโรงช่าง'],
  ability:{id:'TRAIL_FOCUS',name:'สำรวจจังหวะ',description:'สำรวจจุดอ่อนด้วย MP 4 ได้ครั้งเดียวต่อการต่อสู้ เวทโจมตีที่ติดตั้งครั้งถัดไปแม่นยำแน่นอนและผ่านท่าหุบใบหรือเกราะรูน ต้องใช้ภายใน 2 จังหวะผู้เล่น'},
  limits:['ต้องเรียนพื้นฐานและผ่านบททดสอบก่อนรับความสามารถ','การอ่านร่องรอยไม่ข้ามเกราะพื้นดิน และไม่เพิ่มพลังให้เวทเยียวยาหรือโล่','เรียนข้ามสายได้เมื่อจบพื้นฐานขั้น 1 ของสายแรก'],
 },
 {
  id:'NATURE_KEEPER',name:'ผู้พิทักษ์ธรรมชาติ',mentor:'มาเรน',mentorId:'MAREN',location:'สวนสมุนไพร',locationId:'elder_garden',
  startedFlag:'lp_nature_started',rank1Flag:'lp_nature_rank1',trialFlag:'lp_nature_trial_passed',rank2Flag:'lp_nature_rank2',iconBase:3,
  requirements:{start:[opening],rank1:[
   {flag:'lp_nature_source_found',label:'ตรวจต้นทางน้ำกับมาเรน'},
   {flag:'lp_nature_watered',label:'รดน้ำตามสภาพของแปลง'},
   {flag:'garden_tended',label:'สวนได้รับการดูแลจริง'},
  ]},
  activities:['ตามหาต้นทางน้ำ','ดูแลแปลงโดยไม่เร่งการเติบโต','กลับให้อาจารย์ตรวจสิ่งที่พบ','ฝึกตั้งรับอย่างมีจังหวะในโรงช่าง'],
  ability:{id:'ROOT_REFUGE',name:'รากคุ้มภัย',description:'การตั้งรับครั้งแรกในการต่อสู้แต่ละครั้งสร้างโล่อย่างน้อย 8 หน่วย คุ้มกัน 2 จังหวะศัตรู หากมีโล่ที่แรงกว่าอยู่แล้วจะรักษาพลังและเวลาของโล่เดิม'},
  limits:['ต้องเรียนพื้นฐานและผ่านบททดสอบก่อนรับความสามารถ','รากคุ้มภัยเกิดจากการตั้งรับครั้งแรกเท่านั้น ไม่เพิ่มซ้อนทุกเทิร์น','เรียนข้ามสายได้เมื่อจบพื้นฐานขั้น 1 ของสายแรก'],
 },
];

function rankOf(state:PathState,path:LifePathDefinition):0|1|2{
 if(!state.flags[path.startedFlag]||!state.flags[path.rank1Flag]||!path.requirements.rank1.every(o=>state.flags[o.flag]))return 0;
 return state.flags[path.trialFlag]&&state.flags[path.rank2Flag]?2:1;
}
export function pathStartAvailability(state:PathState,id:LifePathId):{enabled:boolean;reason:string}{
 const path=lifePaths.find(path=>path.id===id);
 if(!path)return {enabled:false,reason:'ไม่พบเส้นทางชีวิตนี้'};
 const missing=path.requirements.start.find(o=>!state.flags[o.flag]);
 if(missing)return {enabled:false,reason:missing.label+'ก่อน'};
 if(state.flags[path.startedFlag])return {enabled:true,reason:''};
 const other=lifePaths.find(other=>other.id!==id&&state.flags[other.startedFlag]&&rankOf(state,other)<1);
 return other?{enabled:false,reason:'จบพื้นฐานขั้น 1 ของสาย'+other.name+'ก่อนเริ่มเรียนข้ามสาย'}:{enabled:true,reason:''};
}
export function pathProgress(state:PathState){
 return lifePaths.map(path=>{
  const started=!!state.flags[path.startedFlag],rank=rankOf(state,path),availability=pathStartAvailability(state,path.id);
  const objectives=[
   {flag:path.startedFlag,label:'เริ่มเรียนกับ'+path.mentor,complete:started},
   ...path.requirements.rank1.map(o=>({...o,complete:!!state.flags[o.flag]})),
   {flag:path.rank1Flag,label:'กลับให้อาจารย์รับรองพื้นฐานขั้น 1',complete:rank>=1},
   {flag:path.trialFlag,label:'ผ่านบททดสอบในโรงช่าง',complete:rank>=1&&!!state.flags[path.trialFlag]},
   {flag:path.rank2Flag,label:'กลับรับรองความสามารถขั้นต้น',complete:rank===2},
  ];
  const status:LifePathStatus=rank===2?'rank2':rank===1?'rank1':started?'learning':availability.enabled?'available':'locked';
  const next=rank===2?'นำความสามารถไปใช้และเรียนรู้จากผู้คนต่างสายได้':!started?(availability.enabled?'พบ'+path.mentor+'ที่'+path.location+'ผ่านตัวเลือกเรื่องราว':availability.reason):objectives.find(o=>!o.complete)?.label||'กลับไปพูดคุยกับอาจารย์';
  return {id:path.id,name:path.name,started,rank,status,objectives,next,availability,ability:path.ability,abilityUnlocked:rank===2};
 });
}
/** No XP shortcut: all flags must describe a coherent completed introductory course. */
export function hasPathAbility(state:PathState,ability:PathAbilityId):boolean{
 const path=lifePaths.find(path=>path.ability.id===ability);
 return !!path&&rankOf(state,path)===2;
}
