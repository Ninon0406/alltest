# Session12 — หลักฐานภาพจากเกมจริง

ภาพทั้งหมดมาจาก Chromium ที่รันเกมจริงและกดตัวเลือกผ่าน UI ไม่มีการใส่สถานะเกมปลอมหรือประกอบภาพหน้าจอ

| ไฟล์ | ที่มาและสิ่งที่ตรวจ |
| --- | --- |
| [village-before-390.png](village-before-390.png) | รุ่น0.5.1 จาก Session11 gallery,390×844 ฉากเปิดเดิมใช้หมู่บ้าน; เก็บก่อนเริ่มแก้รอบนี้ |
| [village-after-390.png](village-after-390.png) | รุ่น0.6.0 หลังเดินไปหาลูมิ,390×844 น้ำพุแยกวัตถุ/ถนน/บ้าน แก้พื้นทับผนังแล้ว |
| [tree-after-390.png](tree-after-390.png) | รุ่น0.6.0 หลังเลือกพักใต้ต้นเมล็ด ท่านั่งคงอยู่ ใบไม้/ข้อความความทรงจำและปุ่มสัมผัส |
| [tree-after-1366.png](tree-after-1366.png) | เหตุการณ์เดียวกัน1366×768 แสดงต้นไม้เป็นวัตถุแยกจากฉากหลัง |
| [tree-occlusion-390.png](tree-occlusion-390.png) | จับขณะเดินใต้กิ่งจริงหลังปรับทางเดินเป็นfoot186, actor depthต่ำกว่าtree201; เงาตามเท้า |

ก่อน/หลังเป็นภาพคนละจังหวะการเล่น ระบุไว้เพื่อไม่ให้เข้าใจว่าเป็น pixel-diff baseline ของเฟรมเดียวกัน ภาพก่อนคือฉากเปิดที่เคยอยู่หมู่บ้าน; รุ่นใหม่แยกฉากเปิดใต้ต้นไม้กับลานหมู่บ้านอย่างชัดเจน

Art Direction จาก [ภาพ01](../../../../assets/reference/godseed/references/01_village_center.webp) และ [ภาพ03](../../../../assets/reference/godseed/references/03_ancient_tree.webp): สีอบอุ่น หลังคาฟ้า/แดง หินครีม น้ำสีหยก ดอกไม้ และเงาต้นไม้ ภาพเกมเป็น original procedural prototype ที่รายละเอียด/รูปทรง/แสงยังต่ำกว่า concept อย่างชัดเจน ไม่ใช่ final HD acceptance และไม่ได้ใช้ภาพ concept ทั้งใบเป็นพื้นหลัง

Testsสร้างภาพครบ390×844,820×1180,1024×768,1366×768ใน test-results และ CI artifact ชุดที่เลือกเก็บในGitนี้เปิดตรวจจริงแล้ว Browserจำลองไม่ได้ยืนยัน Safari หรือประสิทธิภาพบนโทรศัพท์/iPadเครื่องจริง


## เว็บที่เผยแพร่จริง

[public-tree-390.png](public-tree-390.png) และ [public-fountain-390.png](public-fountain-390.png) จับจาก https://ninon0406.github.io/alltest/ หลังPR#10/merge1563ba4 เผยแพร่จริง ใช้ChromiumhasTouch390×844/ReducedMotion ไม่ใช่ภาพจำลองจากDesign; fullflow/save/checksum/39PNG/JSและpost-Actionsrendererผ่าน รายละเอียดในREPORT_TH/TEST_REPORT ยังไม่ใช่hardwareหรือfinalHDapproval
