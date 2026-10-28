export function createProgression(){return {awakening:{step:0,paused:false,venue:null,result:null},activeCareerId:null,records:{},practice:{},fatigue:0,focus:100,trainingWindow:null,trainingCount:0,legacyCareer:null};}
export function careerRecord(state,id){return state.progression.records[id]??={xp:0,mastery:0,arcStep:0,advanced:false,trainingBonus:0,payBonus:0};}
