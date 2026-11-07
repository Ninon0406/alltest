/** Original 480×270 layout: these are foot coordinates on the drawn road graph. */
export const gladeMap={
 anchors:{
  glade_entrance:{x:80,y:239,facing:'east' as const},west_lane:{x:126,y:251},
  tree_back:{x:126,y:205},listening_stone:{x:175,y:205,facing:'north' as const},
  battle_center:{x:240,y:239,facing:'east' as const},player_battle:{x:130,y:239,facing:'east' as const},
  echo_front:{x:310,y:232,facing:'east' as const},enemy_battle:{x:350,y:232,facing:'west' as const},
  south_lane:{x:240,y:251},east_lane:{x:382,y:251},
  water_front:{x:405,y:239,facing:'east' as const},arch_front:{x:350,y:195,facing:'north' as const},
  sample_front:{x:272,y:205,facing:'north' as const},exit_path:{x:80,y:251,facing:'west' as const},
 },
 links:[['glade_entrance','exit_path'],['west_lane','tree_back'],['tree_back','listening_stone'],['listening_stone','sample_front'],['west_lane','player_battle'],['player_battle','battle_center'],['battle_center','south_lane'],['west_lane','south_lane'],['south_lane','east_lane'],['east_lane','water_front'],['east_lane','echo_front'],['echo_front','enemy_battle'],['enemy_battle','arch_front'],['arch_front','sample_front'],['sample_front','battle_center'],['west_lane','exit_path']] as const,
 junctions:['glade_entrance','west_lane','battle_center','east_lane'],
 solids:[{id:'old-tree-base',x:54,y:167,width:38,height:37},{id:'listening-stone',x:161,y:172,width:28,height:19},{id:'resonator-base',x:320,y:139,width:61,height:41},{id:'west-post',x:100,y:224,width:16,height:18},{id:'east-post',x:416,y:224,width:16,height:18},{id:'stream-bank',x:438,y:180,width:42,height:90},{id:'crystal-bed',x:258,y:174,width:28,height:17}],
 occluders:[{id:'west-post',footY:242},{id:'east-post',footY:242},{id:'resonator',footY:180}],
};
export const gladeScenery={posts:[{x:108,y:242},{x:424,y:242}],resonator:{x:350,y:180},spellTarget:{x:350,y:139},playerBattle:{x:130,y:219},enemyBattle:{x:350,y:212}} as const;
