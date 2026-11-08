/** Published chapter identities. Scene ownership comes from contentBatches.
 * A visit to an older location does not erase any later progress flags. */
export const chapters={
 CHAPTER_1:{arc:'ARC_01',order:1,activationFlag:null,label:'บทที่หนึ่ง',title:'หมู่บ้านที่ลืมเสียงเพลง'},
 CHAPTER_2:{arc:'ARC_02',order:2,activationFlag:'a2_started',label:'บทที่สอง',title:'เสียงกระซิบจากพฤกษา'},
} as const;
export type ChapterId=keyof typeof chapters;
export type ArcId=typeof chapters[ChapterId]['arc'];
