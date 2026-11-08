export const encounters={
 B01_FOREST_SPROUT:{stage:'forest',actor:'sprout',fallbackActor:'sprout',name:'ต้นอ่อนหลงทาง',hp:42,power:7,weakness:'FIRE',xp:12,reward:'CORE_BLOOM',canFlee:true,canSurrender:false},
 B02_STREAM_WISP:{stage:'stream',actor:'wisp-v3',fallbackActor:'sprout',name:'วิญญาณละอองธารา',hp:52,power:8,weakness:'WIND',xp:14,reward:'CORE_WATER',canFlee:true,canSurrender:false},
 B03_RUIN_SENTINEL:{stage:'ruins',actor:'sentinel-v12',fallbackActor:'sprout',name:'หุ่นรูนแสงริบหรี่',hp:66,power:10,weakness:'EARTH',xp:18,reward:'FORM_WARD',canFlee:true,canSurrender:false},
 B04_ECHO_KNOT:{stage:'glade',actor:'echo-knot-v15',fallbackActor:'sprout',name:'ปมเสียงย้อน',hp:76,power:11,weakness:'LIGHT',xp:20,reward:'CORE_ECHO',canFlee:false,canSurrender:false},
 B05_MEMORY_GUARDIAN:{stage:'ruins',actor:'guardian-v16',fallbackActor:'sprout',name:'ผู้พิทักษ์รอยลืม',hp:150,power:12,weakness:null,xp:40,reward:'CORE_LIGHT',canFlee:false,canSurrender:false},
 B06_ROOT_WEAVER:{stage:'forest_road',actor:'root-weaver-v17',fallbackActor:'sprout',name:'ผู้ถักราก',hp:64,power:9,weakness:'FIRE',xp:18,reward:'CORE_EARTH',canFlee:true,canSurrender:false},
 BT_TRAINING:{stage:'workshop',actor:'training-v2',fallbackActor:'pip',name:'ภูตฝึกเวทจำลอง',hp:35,power:5,weakness:null,xp:5,reward:'IT_POTION_DEW',canFlee:true,canSurrender:true}
} as const;
export type EncounterId=keyof typeof encounters;
