/** Feet on our original road drawing; never coordinates sampled from the concept. */
export const forestRoadMap={
 anchors:{
  path_entry:{x:80,y:239,facing:'east' as const},west_turn:{x:154,y:239},
  fruit_front:{x:218,y:239,facing:'east' as const},south_turn:{x:240,y:254},
  root_front:{x:285,y:239,facing:'north' as const},root_east:{x:335,y:239},
  marker_front:{x:190,y:198,facing:'north' as const},north_turn:{x:240,y:198},
  hollow_front:{x:335,y:198,facing:'north' as const},water_front:{x:405,y:239,facing:'east' as const},
  player_battle:{x:130,y:239,facing:'east' as const},enemy_battle:{x:350,y:232,facing:'west' as const},
  oak_back:{x:110,y:186,facing:'west' as const},resting_seat:{x:110,y:202,facing:'east' as const},exit_path:{x:405,y:254,facing:'east' as const},
 },
 links:[['path_entry','player_battle'],['player_battle','west_turn'],['west_turn','fruit_front'],['fruit_front','south_turn'],['south_turn','root_front'],['root_front','root_east'],['root_east','water_front'],['water_front','exit_path'],['west_turn','marker_front'],['marker_front','north_turn'],['north_turn','fruit_front'],['hollow_front','root_east'],['root_east','enemy_battle'],['path_entry','resting_seat'],['resting_seat','oak_back']] as const,
 junctions:['path_entry','west_turn','south_turn','root_east'],
 effectTargets:{memory_root:{x:286,y:206},forest_fruit:{x:240,y:225}},
 solids:[{id:'bench-west-leg',x:83,y:197,width:7,height:8},{id:'bench-east-leg',x:132,y:197,width:7,height:8},{id:'great-trunk',x:38,y:130,width:48,height:71},{id:'memory-root',x:262,y:175,width:49,height:41},{id:'hollow-trunk',x:342,y:133,width:42,height:50},{id:'stream-bank',x:438,y:180,width:42,height:90},{id:'waystone',x:177,y:160,width:26,height:21}],
 occluders:[{id:'road-oak',footY:201},{id:'memory-root',footY:216},{id:'resting-bench',footY:204}],
};
export const forestRoadScenery={root:{x:286,y:216},fruit:{x:240,y:237},oak:{x:62,y:201},hollow:{x:363,y:183},spellTarget:{x:286,y:206}} as const;
