# GODSEED: The World That Remembers

เกม Pixel Art RPG ภาษาไทย ควบคุมด้วยตัวเลือก สร้างเวท และต่อสู้ผลัดเทิร์น ไม่ต้องใช้ API Key

สถานะ Source candidate 0.7.1 / เว็บเผยแพร่ 0.7.0: **Manual File Save เท่านั้น** เกมเก็บความคืบหน้าใน RAM ระหว่างเปิดหน้า เมื่อปิดหรือรีเฟรชต้องโหลดไฟล์เอง ไม่มี Auto Save หรือการเล่นต่อจากข้อมูลเบราว์เซอร์ ไฟล์เก่า .json ที่เคยส่งออกยังเลือกโหลดได้

รอบ 16 กำลังตรวจสวนสมุนไพรใหม่: บ้านหลังคาม่วง ทางหิน ซุ้มที่บังตามความลึก หม้อยา/สมุนไพรเคลื่อนไหว และการนั่งฟังอดีตของมาเรน [ภาพจริงและผลตรวจปัจจุบัน](GODSEED/docs/evidence/session16/README.md) ภาพยังเป็นต้นแบบ ยังไม่รับรอง 1.0 หรืออุปกรณ์จริง

วิธีเล่นและเก็บความทรงจำ:

1. เริ่มการเดินทาง หรือกด “โหลดเกมจากไฟล์” เลือก `.godseed` แล้วตรวจสรุปก่อนยืนยัน
2. เลือกเหตุการณ์ เก็บของ ผสมเวท ติดตั้งคาถา และต่อสู้แบบผลัดเทิร์น
3. กด “บันทึกเกมเป็นไฟล์” ที่จุดปลอดภัย เก็บไฟล์ใน Files/Downloads ก่อนออก บน iPhone/iPad หากเปิดหน้าตัวอย่างให้ใช้ แชร์ → บันทึกไปยังแอปไฟล์
4. เบราว์เซอร์ยืนยันไม่ได้ว่า OS เก็บสำเร็จ ตรวจไฟล์ก่อนกด “ยืนยันว่าเก็บไฟล์แล้ว” การกระทำถัดไปต้องบันทึกใหม่
5. ครั้งต่อไปเปิดเว็บแล้วเลือกไฟล์เอง หากยังไม่บันทึกจะมีคำเตือนก่อนเริ่มใหม่/ออก แต่ไม่มีการเขียนข้อมูลให้ลับหลัง

เกมยังเป็น vertical slice: 18ฉาก/60ตัวเลือก/234สูตรถูกต้อง/3เหตุการณ์ต่อสู้/0ตอนจบ มี5สูตรที่ค้นพบจากเส้นทางทดสอบ ภาพต้นไม้/หมู่บ้าน/สวนและตัวละครยังเป็นต้นแบบ งานใหม่ CH0602 เดินไปนั่งฟังมาเรนฮัมเพลงและจดจำการฟังผ่านไฟล์

[รูปแบบไฟล์และการย้ายข้อมูล](GODSEED/docs/SAVE_FILE_FORMAT.md) · [Master Roadmap](GODSEED_MASTER_ROADMAP.md) · [หลักฐานรอบ15](GODSEED/docs/evidence/session15/README.md)

## พัฒนาและทดสอบ

Node 24: `npm ci --prefix GODSEED` แล้ว `npm --prefix GODSEED run test:all` และ `npm --prefix GODSEED run test:e2e` (`CHROMIUM_PATH` กำหนด Chromium ในเครื่อง; CI ใช้ browser ของ Playwright)

`npm run dev` เปิด development server, `npm run build` build และ stage เว็บไซต์ที่ root เพื่อรองรับ Pages `main:/` ด้วย ไม่แก้ไฟล์ compiled ใน `assets/` เอง

## GitHub Pages

เล่นได้ที่ https://ninon0406.github.io/alltest/ — เผยแพร่ 0.7.0 แล้ว ใช้ Manual File Save เท่านั้น และมีฉากนั่งฟังมาเรนฮัมเพลง Source `0676719` / PR #14 / main `8b610f3`

Browser 85 กรณีผ่านทั้ง local, PR และ main; Unit 115 / Content 2 / Roadmap 8 / Build และการตรวจไม่เก็บเซฟถาวรผ่าน [main CI](https://github.com/Ninon0406/alltest/actions/runs/42116389685) Deploy สำเร็จ ตรวจเว็บจริงทั้งดาวน์โหลด เลือกไฟล์ สรุปก่อนโหลด โหลดครบ State และรีเฟรชกลับหน้าเริ่ม ไม่พบการเก็บ progress ใน browser storage หรือส่งเซฟไปเซิร์ฟเวอร์ เส้นทาง 5 สูตร / 3 การต่อสู้ผ่าน ภาพ 43 ไฟล์และ JS ตรง Build ไม่พบ Console errors ในเส้นทางที่ตรวจ ภาพยังเป็นต้นแบบและยังไม่ใช่ 1.0

[รายงานรอบ 15 พร้อมภาพและข้อจำกัด](GODSEED/docs/evidence/session15/REPORT_TH.md) · [รูปแบบไฟล์เซฟ](GODSEED/docs/SAVE_FILE_FORMAT.md) · ใช้ไฟล์ที่ผู้เล่นส่งออกไว้เพื่อเล่นต่อ ไม่มีการกู้ฐานข้อมูลเก่าอัตโนมัติ

workflow ทดสอบทุก PR และ deploy เมื่อ main ผ่าน checks รองรับ Pages artifact พร้อมไฟล์ root สำหรับ source `main:/` หากเปลี่ยน Source ได้ ให้ใช้ Settings → Pages → Build and deployment → GitHub Actions ผ่านเบราว์เซอร์โทรศัพท์

โปรเจกต์ REBORN ถูกนำออกจาก working tree ตามคำสั่งเจ้าของล่าสุด ไม่ใช่ระบบเซฟเดียวกับ GODSEED

เซฟเกมใช้ schema2 (ตั้งแต่รุ่น0.2.0) โดยย้ายจากV1และเก็บต้นฉบับก่อนเขียนครั้งแรก ตัวตน/seed/ความคืบหน้าไม่ถูกสุ่มใหม่ XP ที่แสดงยังไม่ใช่ระบบเลื่อนระดับอัตโนมัติ

ตรวจปริมาณเนื้อหาจากโค้ดด้วย `npm --prefix GODSEED run inspect:content` ใช้กฎเดียวกันระหว่างปุ่มกับระบบเพื่อแสดงเหตุผลของทางเลือกที่ยังล็อก เก็บของลำธารได้ตามวันในเกม การฟังกระดิ่งไม่ล้างผลการช่วยที่ทำไว้ก่อนหน้า

โต๊ะผสมแสดงตัวอย่างและวัตถุดิบที่ขาดก่อนยืนยัน สมุดเวทกรองธาตุ/ประเภท/MP และถอดเวทได้โดยไม่ลืมสูตร ถอดแล้วช่องที่เหลือเลื่อนขึ้น; ไม่มีเวทติดตั้งก็ใช้ประกายพื้นฐานและตั้งรับได้

## แผนพัฒนาและประวัติ

[GODSEED_MASTER_ROADMAP](GODSEED_MASTER_ROADMAP.md) รวม8Phasesและเกณฑ์1.0จากโค้ด/ภาพ/ผลทดสอบจริง [Task Board](GODSEED/docs/TASK_BOARD.md)เป็นมุมมองย่อจาก [ข้อมูลสถานะชุดเดียว](GODSEED/docs/roadmap.json); [Development Log](GODSEED/docs/DEVELOPMENT_LOG.md)เก็บประวัติย้อนหลังและทุกรอบใหม่

ผู้พัฒนาแก้สถานะหลังทดสอบแล้วใช้ `npm --prefix GODSEED run roadmap:update` และ `npm --prefix GODSEED run roadmap:check` (CIตรวจด้วย) เปอร์เซ็นต์นับเฉพาะงาน✅ เป็นChecklist ไม่ใช่สัดส่วนเวลา/คุณภาพเกม; AIเสริมและCH2/CH3แยกขอบเขตจาก1.0

รุ่นโค้ด0.5.0เพิ่มท่าเดินผู้เล่นสี่ทิศ24เฟรม เลือกท่าและเวลาเดินตามเส้นทางอัตโนมัติ ภาพเดิมและเซฟยังใช้ได้ หากPNGใหม่โหลดไม่ได้ใช้ภาพสำรองพร้อมแจ้งเตือน งานNPC/กล้อง/บทแรกเต็มยังพัฒนาต่อ


### ชุดภาพอ้างอิงและสถานที่ (รอบ12)

ภาพอ้างอิงเจ้าของ10แห่งอยู่ใน `assets/reference/godseed/` สำหรับพัฒนาเท่านั้น Asset ในเกมวาดใหม่ที่ `GODSEED/public/assets/art-v5/` ไม่ใช้ภาพเต็มเป็นพื้นหลัง เลือกดู [หลักฐานภาพก่อน–หลัง](GODSEED/docs/evidence/session12/README.md) และตาราง9ด้านต่อสถานที่ใน Master Roadmap

ตรวจด้วย `npm --prefix GODSEED run validate:references` รวมใน CI และตรวจซ้ำหลัง staging; Vite dist/Actions Artifact ไม่มี Concept Files รักษาไฟล์ Client รุ่นเก่าไว้สำหรับ HTML ที่ cache

การตั้งค่า Pages Source ปัจจุบันยังเป็น legacy `main:/` Integration อ่านค่าได้แต่แก้เป็น `workflow` ไม่ได้ (GitHub API403) Workflow เผยแพร่เดิมยังใช้งานได้ การรับรองว่าแยก References ออกจาก Artifact หมายถึง Actions/Vite; Legacy Archive อาจมีไฟล์จาก Repository ที่เกมไม่ได้โหลด หากต้องการให้มีเส้นทางเผยแพร่เดียว: GitHub บนโทรศัพท์ → Repository → Settings → Pages → Build and deployment → Source → GitHub Actions ไม่ต้องรัน Terminal
