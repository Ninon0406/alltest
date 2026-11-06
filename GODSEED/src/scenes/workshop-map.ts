/** Authored FOOT coordinates. Shared by the original pixel drawings and the
 * existing fixed-route Director; no coordinates are sampled from reference08. */
export const workshopScenery={
 cauldron:{x:240,y:209,width:96,height:96,mouth:{x:240,y:170}},
 toolbox:{x:81,y:237,width:56,height:40},
 recipeDesk:{x:378,y:182,width:98,height:66},
} as const;
export const workshopMap={
 anchors:{
  workshop_entrance:{x:154,y:239},west_turn:{x:126,y:248},toolbox_front:{x:111,y:237,facing:'west' as const},
  south_turn:{x:184,y:251},mixing_approach:{x:240,y:251},craft_front:{x:240,y:232,facing:'north' as const},
  east_lane:{x:282,y:251},tutor_front:{x:291,y:232,facing:'east' as const},
  east_turn:{x:378,y:251},exit_path:{x:378,y:239},recipe_front:{x:378,y:202,facing:'north' as const},
 },
 links:[['workshop_entrance','west_turn'],['west_turn','toolbox_front'],['workshop_entrance','south_turn'],
  ['south_turn','mixing_approach'],['mixing_approach','craft_front'],['mixing_approach','east_lane'],
  ['east_lane','tutor_front'],['east_lane','east_turn'],['east_turn','exit_path'],['exit_path','recipe_front']] as const,
 junctions:['workshop_entrance','west_turn','south_turn','mixing_approach','east_lane','east_turn'],
 solids:[
  {id:'rear-wall-and-shelves',x:0,y:0,width:480,height:174},
  {id:'west-counter',x:14,y:158,width:118,height:34},
  {id:'mixing-table',x:197,y:174,width:86,height:35},
  {id:'recipe-desk',x:333,y:166,width:92,height:17},
  {id:'toolbox',x:60,y:225,width:40,height:12},
  {id:'west-stool',x:109,y:205,width:22,height:14},
  {id:'anvil-stump',x:307,y:223,width:24,height:14},
 ],
 occluders:[{id:'mixing-cauldron',footY:workshopScenery.cauldron.y},{id:'toolbox',footY:workshopScenery.toolbox.y},{id:'anvil',footY:237}],
};
