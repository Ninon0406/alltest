export const encounters={
 B01_FOREST_SPROUT:{name:'ต้นอ่อนหลงทาง',hp:42,power:7,weakness:'FIRE',xp:12,reward:'CORE_BLOOM',canFlee:true,canSurrender:false},
 BT_TRAINING:{name:'ภูตฝึกเวทจำลอง',hp:35,power:5,weakness:null,xp:5,reward:'IT_POTION_DEW',canFlee:true,canSurrender:true}
} as const;
export type EncounterId=keyof typeof encounters;
