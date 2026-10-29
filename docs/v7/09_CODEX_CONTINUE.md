# คำสั่งรอบถัดไป — ส่งซ้ำใน Codex ได้

ดำเนินการพัฒนา REBORN จาก HEAD ล่าสุดของ `Ninon0406/alltest` ภายใต้ V7 (Decision-first + Original Story World + Pixel Art + One Life)

1. อ่าน `AGENTS.md`, `docs/NEXT_CODEX_TASK.md` และ V7 master/spec/source JSON ที่อยู่ใน repo, ตรวจ source code/tests/HEAD ก่อนเชื่อสถานะ checkbox
2. เลือก **earliest incomplete phase** ที่สามารถส่งมอบ end-to-end ได้ใน task นี้; งาน Phase V7-2 infant/calendar/pacing ก่อน, ต่อ story engine, pixel appearance, asset pipeline, map read-only, travel via choices, equipment, power/god, NPC/ending content ตาม dependency จริง
3. เขียนโค้ดจริงและทดสอบ ห้ามปรับ README อย่างเดียว ห้ามสร้าง placeholder แต่เรียกว่าสมบูรณ์ ห้ามลบระบบเก่าที่ทำงานได้
4. รักษา `One Life, One Run`: active state ใน memory เท่านั้น, refresh/new tab ต้องเกิดใหม่, localStorage ใช้เฉพาะ terminal summary, runId archive กันซ้ำ; ไม่มี Resume
5. รักษา `advanceTime` เป็น source of truth, critical event หยุดเวลาและต้องรอผู้เล่น; หน้าแผนที่เป็น view-only, travel ผ่าน story choices เท่านั้น; locationID/rendered background sync
6. Content audit ห้ามนับต้นฉบับใน prompt เป็น scenes ที่ implement แล้ว, อย่านับ procedural variant เป็น authored choice, แสดง authored/reachable ทั้งคู่
7. สร้าง original 16-bit-style locally stored assets ที่ใช้งานจริงหากทำ artwork phase; ถ้าไม่มี image generator ใช้ procedural pixel-art script และระบุประเภทภาพจริง
8. รัน tests/build/e2e/production checks ตาม repo; อัปเดต content counts/roadmap/changelog/next-task ตามผลจริง; commit/push/deploy ตามสิทธิ์และการอนุมัติ
9. รายงาน diff, tests, newly implemented content/asset counts, actual public deployment proof, exact next 3 tasks

**เริ่มลงมือทำทันทีโดยไม่ตอบแค่ว่าจะทำอะไร**
