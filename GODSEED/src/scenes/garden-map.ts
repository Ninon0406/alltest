/** Authoring coordinates in logical source pixels. Anchors describe FEET, not
 * reference-image pixels. The art generator and Director share these roads. */
export const gardenBed={x:247,y:245,depth:228,width:64,height:48,solid:{left:220,top:231,right:273,bottom:245}} as const;
export const gardenScenery={
 bench:{x:312,y:242,width:64,height:96},
 arch:{x:56,y:242,width:112,height:144},
 cauldron:{x:414,y:206,width:64,height:96},
 herbs:{x:324,y:150,width:96,height:48},
} as const;
export const gardenMap={
 anchors:{
  garden_entrance:{x:154,y:239},house_front:{x:154,y:200},
  water_approach:{x:179,y:247},herb_bed_front:{x:214,y:240,facing:'east' as const},
  dew_approach:{x:126,y:248},dew_collect:{x:98,y:238,facing:'west' as const},
  south_turn:{x:185,y:248},bed_south:{x:205,y:258},bench_south:{x:282,y:258},
  bench_approach:{x:gardenScenery.bench.x,y:gardenScenery.bench.y},maren_listen_seat:{x:gardenScenery.bench.x,y:gardenScenery.bench.y-25,facing:'east' as const},
  east_turn:{x:368,y:258},exit_path:{x:378,y:239},maren_front:{x:365,y:232,facing:'east' as const},
 },
 links:[
  ['garden_entrance','house_front'],['garden_entrance','water_approach'],['water_approach','herb_bed_front'],
  ['garden_entrance','dew_approach'],['dew_approach','dew_collect'],['garden_entrance','south_turn'],
  ['south_turn','bed_south'],['bed_south','bench_south'],['bench_south','bench_approach'],
  ['bench_approach','maren_listen_seat'],['bench_south','east_turn'],['east_turn','exit_path'],['exit_path','maren_front'],
 ] as const,
 junctions:['garden_entrance','dew_approach','south_turn','bed_south','bench_south','east_turn'],
 solids:[
  {id:'herbalist-house',x:12,y:0,width:246,height:191},
  {id:'herb-stall',x:277,y:100,width:94,height:73},
  {id:'arch-west-pier',x:20,y:234,width:12,height:8},
  {id:'arch-east-pier',x:80,y:234,width:12,height:8},
  {id:'cauldron-plinth',x:394,y:192,width:40,height:14},
  {id:'east-flower-bed',x:405,y:227,width:64,height:26},
  {id:'raised-herb-bed',x:gardenBed.solid.left,y:gardenBed.solid.top,width:gardenBed.solid.right-gardenBed.solid.left,height:gardenBed.solid.bottom-gardenBed.solid.top},
  {id:'garden-bench-west-leg',x:gardenScenery.bench.x-27,y:gardenScenery.bench.y-7,width:7,height:8},
  {id:'garden-bench-east-leg',x:gardenScenery.bench.x+22,y:gardenScenery.bench.y-7,width:7,height:8},
 ],
 occluders:[{id:'garden-arch',footY:gardenScenery.arch.y},{id:'garden-bench',footY:gardenScenery.bench.y},{id:'garden-cauldron',footY:gardenScenery.cauldron.y}],
};
