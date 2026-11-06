/** Authored foot coordinates shared by road rendering and cinematic routing. */
export const ruinsMap={
 anchors:{
  shrine_entrance:{x:154,y:239,facing:'east' as const},west_lane:{x:126,y:248},pillar_back:{x:126,y:207},
  rune_front:{x:188,y:207,facing:'north' as const},tablet_front:{x:240,y:207,facing:'north' as const},
  box_front:{x:286,y:207,facing:'north' as const},circle_front:{x:240,y:232,facing:'north' as const},plaza_south:{x:240,y:251},
  east_lane:{x:350,y:251},sentinel_front:{x:320,y:239,facing:'east' as const},east_approach:{x:350,y:207},
  crystal_front:{x:350,y:191,facing:'north' as const},exit_south:{x:405,y:251},exit_path:{x:405,y:239,facing:'east' as const},
 },
 links:[['shrine_entrance','west_lane'],['west_lane','pillar_back'],['pillar_back','rune_front'],['rune_front','tablet_front'],['tablet_front','box_front'],['tablet_front','circle_front'],['circle_front','plaza_south'],['west_lane','plaza_south'],['plaza_south','east_lane'],['east_lane','sentinel_front'],['east_lane','east_approach'],['east_approach','crystal_front'],['box_front','east_approach'],['east_lane','exit_south'],['exit_south','exit_path']] as const,
 junctions:['shrine_entrance','west_lane','plaza_south','east_lane'],
 solids:[
  {id:'altar-base',x:205,y:130,width:70,height:55},
  {id:'west-statue',x:51,y:134,width:48,height:70},{id:'east-statue',x:374,y:134,width:42,height:73},
  {id:'rune-console',x:158,y:176,width:42,height:18},{id:'musicbox-socket',x:273,y:164,width:26,height:28},
  {id:'crystal-bed',x:337,y:163,width:28,height:16},
  {id:'west-pillar-base',x:100,y:224,width:16,height:18},{id:'east-pillar-base',x:416,y:224,width:16,height:18},
 ],
 occluders:[{id:'west-pillar',footY:242},{id:'east-pillar',footY:242},{id:'altar',footY:185}],
};
export const ruinsScenery={altar:{x:240,y:185},pillars:[{x:108,y:242},{x:424,y:242}],spellTarget:{x:240,y:142},playerBattle:{x:130,y:219},enemyBattle:{x:350,y:212},retreat:[{x:130,y:231},{x:80,y:231},{x:80,y:219}]} as const;
