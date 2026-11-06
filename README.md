# GODSEED: The World That Remembers

เกม Pixel Art RPG ภาษาไทย ควบคุมด้วยตัวเลือก สร้างเวท และต่อสู้ผลัดเทิร์น ไม่ต้องใช้ API Key

สถานะ Source และเว็บเผยแพร่ 0.8.0: **Manual File Save เท่านั้น** เกมเก็บความคืบหน้าใน RAM ระหว่างเปิดหน้า เมื่อปิดหรือรีเฟรชต้องโหลดไฟล์เอง ไม่มี Auto Save หรือการเล่นต่อจากข้อมูลเบราว์เซอร์ ไฟล์เก่า .json ที่เคยส่งออกยังเลือกโหลดได้

รอบ18เพิ่มโรงช่างสามเลเยอร์ เส้นทางไปหาครู/กล่อง/หม้อจริง ท่ายกกล่องและปรุงเวท พร้อมส่วนผสมตามสูตรที่ลอยลงหม้อ แก้การกดข้ามแอนิเมชันให้ถึงจุดหมาย [รายงานและภาพจากเว็บจริง](GODSEED/docs/evidence/session18/REPORT_TH.md) งานภาพยังเป็นต้นแบบและยังไม่มีฉากจบของบทเต็ม

รอบ16เผยแพร่สวนสมุนไพรใหม่แล้ว: บ้านหลังคาม่วง ทางหิน ซุ้ม หม้อยา/สมุนไพรเคลื่อนไหว และการนั่งฟังมาเรน [รายงานพร้อมภาพก่อน/หลัง](GODSEED/docs/evidence/session16/REPORT_TH.md) ภาพยังเป็นต้นแบบ ยังไม่รับรอง1.0หรืออุปกรณ์จริง

รอบ17เพิ่มโหลดภาพตามสถานที่ (57→23ภาพหน้าเริ่ม), ปุ่มลองโหลดภาพใหม่ที่รักษาRAM และคุโรตีทั่ง/ถือสูตรตามบท [รายงานรอบ17พร้อมภาพ](GODSEED/docs/evidence/session17/REPORT_TH.md) ยังเป็นเกมช่วงทดลอง ภาพ/เนื้อเรื่อง/บอส/ตอนจบและอุปกรณ์จริงยังมีงานค้าง

วิธีเล่นและเก็บความทรงจำ:

1. เริ่มการเดินทาง หรือกด “โหลดเกมจากไฟล์” เลือก `.godseed` แล้วตรวจสรุปก่อนยืนยัน
2. เลือกเหตุการณ์ เก็บของ ผสมเวท ติดตั้งคาถา และต่อสู้แบบผลัดเทิร์น
3. กด “บันทึกเกมเป็นไฟล์” ที่จุดปลอดภัย เก็บไฟล์ใน Files/Downloads ก่อนออก บน iPhone/iPad หากเปิดหน้าตัวอย่างให้ใช้ แชร์ → บันทึกไปยังแอปไฟล์
4. เบราว์เซอร์ยืนยันไม่ได้ว่า OS เก็บสำเร็จ ตรวจไฟล์ก่อนกด “ยืนยันว่าเก็บไฟล์แล้ว” การกระทำถัดไปต้องบันทึกใหม่
5. ครั้งต่อไปเปิดเว็บแล้วเลือกไฟล์เอง หากยังไม่บันทึกจะมีคำเตือนก่อนเริ่มใหม่/ออก แต่ไม่มีการเขียนข้อมูลให้ลับหลัง

เกมยังเป็น vertical slice: 18ฉาก/60ตัวเลือก/234สูตรถูกต้อง/3เหตุการณ์ต่อสู้/0ตอนจบ มี5สูตรที่ค้นพบจากเส้นทางทดสอบ ภาพต้นไม้/หมู่บ้าน/สวนและตัวละครยังเป็นต้นแบบ CH0602 เดินไปนั่งฟังมาเรนฮัมเพลงและจดจำการฟังผ่านไฟล์

[รูปแบบไฟล์และการย้ายข้อมูล](GODSEED/docs/SAVE_FILE_FORMAT.md) · [Master Roadmap](GODSEED_MASTER_ROADMAP.md) · [หลักฐานรอบ15](GODSEED/docs/evidence/session15/README.md)

## พัฒนาและทดสอบ

Node 24: `npm ci --prefix GODSEED` แล้ว `npm --prefix GODSEED run test:all` และ `npm --prefix GODSEED run test:e2e` (`CHROMIUM_PATH` กำหนด Chromium ในเครื่อง; CI ใช้ browser ของ Playwright)

`npm run dev` เปิด development server, `npm run build` build และ stage เว็บไซต์ที่ root เพื่อรองรับ Pages `main:/` ด้วย ไม่แก้ไฟล์ compiled ใน `assets/` เอง

## GitHub Pages

เล่นได้ที่ https://ninon0406.github.io/alltest/ — เผยแพร่0.7.1แล้ว Source`5847801`/PR#15/main`8950542` ใช้Manual File Saveเท่านั้น

Local/PR/main Browser93ผ่าน Unit121/Content2/Roadmap8/Buildผ่าน [mainCI](https://github.com/Ninon0406/alltest/actions/runs/42195039742) Deployสำเร็จ ตรวจเว็บจริงสวน/เก็บน้ำค้าง/รดน้ำ/นั่งฟัง/ไฟล์ครบState/รีเฟรชหน้าเริ่ม ไม่พบBrowser progress storageหรือSave upload เส้นทาง5สูตร/3การต่อสู้ผ่าน 49versionedPNGและJSตรงBuild ไม่พบConsole errorsในเส้นทางตรวจ

[รายงานรอบ16พร้อมภาพและข้อจำกัด](GODSEED/docs/evidence/session16/REPORT_TH.md) · [ไฟล์เซฟ](GODSEED/docs/SAVE_FILE_FORMAT.md) · [Roadmapทุกงาน](GODSEED_MASTER_ROADMAP.md) ภาพยังต้นแบบ ยังไม่ใช่1.0

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
