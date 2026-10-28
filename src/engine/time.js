export const DAYS_PER_YEAR=360;
export const seasons=['ใบไม้ผลิ','ฤดูร้อน','ฤดูใบไม้ร่วง','ฤดูหนาว'];
export function calendar(state) {
 const {absoluteDay,birthAbsoluteDay}=state.time;
 return {ageYears:Math.floor((absoluteDay-birthAbsoluteDay)/360),worldYear:1001+Math.floor(absoluteDay/360),dayOfYear:absoluteDay%360+1,season:seasons[Math.floor(absoluteDay%360/90)]};
}
export function normalize(state) {
 const c=calendar(state);state.age=c.ageYears;state.day=c.dayOfYear;state.season=c.season;
 for(const [key,maxKey] of [['hp','maxHp'],['mana','maxMana'],['stamina','maxStamina']])state[key]=Math.max(0,Math.min(state[maxKey],state[key]));
 for(const key of ['hunger','thirst','morale'])state[key]=Math.max(0,Math.min(100,state[key]??100));
 state.gold=Math.max(0,state.gold);
 if(/^เด็ก|^เยาวชน/.test(state.career))state.career=state.age<1?'เด็กทารก':state.age<4?'เด็กเล็ก':state.age<12?'เด็กวัยเรียน':'เยาวชนผู้ค้นหาเส้นทาง';
 return state;
}
export function advanceTime(state,days) {
 if(!Number.isSafeInteger(days)||days<0||days>360000)throw Error('ระยะเวลาไม่ถูกต้อง');
 const old=calendar(state).ageYears;state.time.absoluteDay+=days;
 const age=calendar(state).ageYears;
 for(let year=old;year<age;year++) {
  const from=state.time.birthAbsoluteDay+year*360,to=from+360;
  state.chronicle.push({age:year,closedAt:to,actions:state.journal.filter(entry=>entry.day>=from&&entry.day<to).map(entry=>({...entry}))});
 }
 normalize(state);
}
export function recordAction(state,title,days,details={}) {
 state.journal.push({id:state.journal.length+1,day:state.time.absoluteDay,age:calendar(state).ageYears,title,days,location:state.location,...details});
}
