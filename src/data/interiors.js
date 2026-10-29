export const roomKinds={home:'บ้านครอบครัว',classroom:'ห้องเรียนชุมชน',ceremony:'ศาลาพิธี'};
export const interiorThemes={
 'อาร์เวเนีย':{id:'arvenia',wall:'#526f68',shade:'#324b48',wood:'#a78761',trim:'#d7bd87',sky:'#a9c9bc',motif:'plant'},
 'วัลดอร์':{id:'valdor',wall:'#64707d',shade:'#394758',wood:'#8a7768',trim:'#e0b37b',sky:'#b9c9db',motif:'stone'},
 'เซเลสเทีย':{id:'celestia',wall:'#595e80',shade:'#343c5e',wood:'#968778',trim:'#e6cc92',sky:'#bac7e3',motif:'star'},
 'ไนท์เวียร์':{id:'nightveil',wall:'#45645c',shade:'#253e3d',wood:'#85775c',trim:'#b9caa0',sky:'#9fbeb3',motif:'vine'},
 'อาเคลอน':{id:'aquelon',wall:'#506f7c',shade:'#304a5d',wood:'#ac8b64',trim:'#e6c996',sky:'#9fd4df',motif:'wave'},
};
// Only venues explicitly supported by the authored situation are projected indoors.
export const storyRooms={
 'dev.warmth':'home','dev.mobile':'home','dev.floor':'home','dev.steps':'home','dev.sharing':'home','dev.river':'home',
 'child.seeds':'home','child.mechanism':'outdoor','dev.library':'classroom','child.rules':'classroom',
 'child.workshop':'outdoor','dev.purse':'outdoor','child.caravan':'outdoor','child.farewell':'outdoor','dev.project':'outdoor',
 'child.fair':'outdoor','child.invitation':'outdoor','child.eve':'outdoor',
 'teen.application':'outdoor','teen.funding':'outdoor','teen.lessons':'classroom','teen.mentor':'outdoor',
 'teen.budget':'outdoor','teen.exhibition':'outdoor','teen.invitation':'outdoor','teen.direction':'outdoor',
 'teen.sponsor':'outdoor','teen.family':'outdoor','teen.letter':'outdoor','teen.review':'outdoor',
};
export const interiorId=(location,kind)=>location.id==='starfall'&&kind==='ceremony'?'starfall-ceremony':`${interiorThemes[location.parent].id}-${kind}`;
