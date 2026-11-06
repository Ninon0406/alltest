# รอบ19 — ข้อมูลเริ่มต้นด้านประสิทธิภาพ

ผลนี้เป็นการเก็บข้อมูลบน Chromium 154 แบบ headless ในเครื่องพัฒนา ไม่ใช่เกณฑ์ผ่านประสิทธิภาพโทรศัพท์จริง ไม่ใช้แทน Safari/iOS/Android/iPadOS, GPU, thermal หรือการเล่นพร้อม VFX หนัก

รันกับ Production Build 0.9.0 ที่ `http://127.0.0.1:4190/` ด้วย [profile-ruins.mjs](profile-ruins.mjs) โดยเลือกไฟล์ที่ส่งออกจากเว็บ 0.8.0 เอง ไม่มีการใส่ Game State ผ่าน JavaScript ทุกตัวอย่างวัดฉากศาลเจ้าขณะนิ่ง 8 วินาทีบน viewport 390×844 ส่วน CPU rate 4 คือ CDP จำลอง CPU ช้าลงสี่เท่า ไม่ใช่โทรศัพท์รุ่นใด

| ตัวอย่าง | ค่าเฉลี่ยช่วงเฟรม | P95 | ช่วงเฟรมเกิน 50ms |
| --- | ---: | ---: | ---: |
| CPU1 / เคลื่อนไหวปกติ | 16.98ms | 16.80ms | 0 |
| CPU4 / เคลื่อนไหวปกติ | 22.71ms | 33.40ms | 4 |
| CPU4 / Reduced Motion | 22.82ms | 33.40ms | 4 |

Reduced Motion ไม่ได้ทำให้ผลฉากนิ่งรอบนี้เร็วขึ้น จึงไม่มีหลักฐานรองรับคำกล่าวว่าผ่าน 60FPS บนเครื่องช้า ต้องวัดการเคลื่อนไหว การต่อสู้ VFX และเครื่องจริงก่อนเลือก graphics profile

หน้าเริ่มโหลด PNG 23 ไฟล์ / encoded body 301,231 bytes เท่ากับรุ่นก่อน ขนาดนี้ไม่รวม JS/HTML/font/headers และเวลา loopback ไม่ใช่เวลาโหลดผ่านอินเทอร์เน็ต หลังอุ่นฉากหมู่บ้านและศาลเจ้าแล้ว เข้าออกเพิ่ม 20 รอบไม่โหลด PNG ใหม่ มี Documents 1 / DOM Nodes 216 / LayoutObjects 61 คงเดิม และไม่มี Console Error

JS heap หลังขอ GC: ก่อน 8,417,900 bytes; หลัง 5/10/20 รอบเป็น 8,745,516 / 8,844,296 / 8,966,144 bytes การอ่านซ้ำท้ายรอบเป็น 8,961,888 bytes (+543,988 จากก่อน) อัตราเพิ่มช้าลง แต่ตัวอย่างนี้ยังพิสูจน์หรือปฏิเสธ memory leak ไม่ได้ งานถัดไปต้องเก็บ longer dwell / heap retainers / VFX stress และวัดเครื่องจริง ไม่ปิด QA-003 จากผลนี้

ผลดิบ: [profile-preview.json](profile-preview.json). คำสั่งทำซ้ำ: `node GODSEED/docs/evidence/session19/profile-ruins.mjs URL PATH_TO_MANUALLY_EXPORTED_SAVE [PREFIX]` ไฟล์เซฟต้องมี `ruins_open` และใช้เลือกภายในเบราว์เซอร์เท่านั้น ไม่ถูก commit หรือส่งไปเซิร์ฟเวอร์
