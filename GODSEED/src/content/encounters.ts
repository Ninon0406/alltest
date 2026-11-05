export const encounters={
 B01_FOREST_SPROUT:{stage:'forest',actor:'sprout',fallbackActor:'sprout',name:'ต้นอ่อนหลงทาง',hp:42,power:7,weakness:'FIRE',xp:12,reward:'CORE_BLOOM',canFlee:true,canSurrender:false},
 B02_STREAM_WISP:{stage:'stream',actor:'wisp-v3',fallbackActor:'sprout',name:'วิญญาณละอองธารา',hp:52,power:8,weakness:'WIND',xp:14,reward:'CORE_WATER',canFlee:true,canSurrender:false},
 BT_TRAINING:{stage:'workshop',actor:'training-v2',fallbackActor:'pip',name:'ภูตฝึกเวทจำลอง',hp:35,power:5,weakness:null,xp:5,reward:'IT_POTION_DEW',canFlee:true,canSurrender:true}
} as const;
export type EncounterId=keyof typeof encounters;
