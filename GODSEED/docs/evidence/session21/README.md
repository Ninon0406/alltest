# Session21 — 0.11.1 / แผนที่ที่เว้นที่ให้ราก

[รายงานภาษาไทยฉบับครบ](REPORT_TH.md) · [ผลตรวจปัจจุบัน](verification.json) · [Main0.11ประวัติ](main-ci-0.11.json) · [PRCI0.11.1](hotfix-pr-ci.json)

จาก0.10:46/142→62nodes/185choices;2→4questcontracts;2หลักสูตรขั้นต้นที่เล่นจบและเรียนข้ามกันได้;145choicesมีwitnessเปลี่ยนสถานะเกมตามนิยาม;234recipesถูกcraftจากวัตถุดิบที่ได้จริงในเส้นทางแยกกัน ไม่มีinventoryinjection. 5NPC/4encounters/7stages/5fixedmaps/0finalendingsคงเดิม ไม่ใช่8Pathsหรือ12ARCsครบ

ภาพต้นฉบับ6frames4253bytes/80PNGreproexact/79เดิมคงอยู่ CSDใช้Anchorจริงและwaterpose เครื่องหมายทาง/โล่รากและUIอ่านได้บนมือถือ 0.11.1แก้Skipท่าสำรวจค้างy219.98แทน219 โดยจำจุดเดิมของท่าที่ไม่มีเส้นทางและคืนตำแหน่งเมื่อยกเลิก red→greenเก็บไว้จริง;public5normalVFXคืนx130/y219/feet239/depth239 และparticles0ทุกครั้ง

PASS:223unit/2content/16graph/10roadmap/type/lint/build;localtargeted1;PRCI42315999153 full140ใน19.8m;actualpubliccore+2courses+3spelleffects+3legacyversions+10viewports+5VFX. MainCI42351787262 PASS full140/140(22.4m),Build/DeploySUCCESS. Localfull140finallogไม่ถูกเก็บหลังexecutorเปลี่ยน จึงไม่อ้างผ่านและใช้CI140ที่จบจริง ส่วน0.11local139/PR139/main139มีหลักฐานแยก

ManualFile2/State2/RAMonly:old0.9/0.10/0.11exactimport,activeFocus/wardroundtrip,corruptfilepreservesRAM,blankrefresh,0storage/upload/reference/consoleerrors. ไฟล์/tmpหายระหว่างexecutorเปลี่ยน จึงrecaptureผ่านoriginalcompiled0.9/0.10และpublished0.11ด้วยUI ไม่ใช้hashเก่าแทนfileใหม่และไม่commit/uploadตัวเซฟ. Legacy-recapture.jsonและoriginal-legacy011-capture.jsonแยกhistoryชัด

Source248220c/PR20/mergeb21e847;hotfix330899e/PR21/mergec9c2f56. Rootentryindex-hv1pG7Dh.js/SHAf732bb3f271f67fdd1eab017fd0095e2720e7eae30be13d876c9d99dbdd57f5d/69versionedPNGตรงเว็บจริง. ไม่มีappinputเปลี่ยนหลังCI source330899e

Checklist24/109=22.0%(v124/108=22.2%) ทุกงานน้ำหนัก1 เป็นChecklistไม่ใช่งานทั้งหมดหรือคุณภาพเกม จบengineLIFE001และซ่อมVIS006ด้วยหลักฐาน สองสายLIFE004/006ยังin_progressเพราะผลระยะยาว/ตอนจบยังไม่ครบ Hardware/Safari/FPS/humanfun/finalHDและpixel-diffbaselineยังไม่ทดสอบ

Next:PIPE002→S21/B04→B05/ARC1→ARC2→นักเวทพเนจร/นักปรุงเวท พร้อมMAG010/visual/mobilebudgetตามdependency. B04/B05ต้องขยายencounterenum/HPvalidationซึ่งปัจจุบันสูงสุด66 และreferencechecksด้วย ไม่เปลี่ยน234RecipeIDs/File2โดยไม่มีmigrationtests
