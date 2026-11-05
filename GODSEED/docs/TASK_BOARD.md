# GODSEED Task Board

Generated view จาก [roadmap.json](roadmap.json); สถานะครบ/หลักฐาน/เกณฑ์อยู่ใน [GODSEED_MASTER_ROADMAP](../../GODSEED_MASTER_ROADMAP.md) ห้ามนับสถานะบอร์ดนี้ซ้ำ

Checklist 24.3% · ✅18 🟡39 ⬜16 🔴0 ⛔1 · ทั้งหมด74

| Phase | งานที่เสร็จ | งานที่เหลือ (ID: สถานะ) |
| --- | --- | --- |
| 1 โครงสร้างพื้นฐาน | FND-001, FND-002, FND-003, FND-005, FND-007, FND-008, FND-009 | FND-004: 🟡, FND-006: 🟡 |
| 2 งานภาพ Pixel Art HD | VIS-002, VIS-003, VIS-006 | VIS-001: 🟡, VIS-004: 🟡, VIS-005: 🟡, VIS-007: 🟡, VIS-008: 🟡, VIS-009: 🟡, VIS-010: 🟡, VIS-011: 🟡, VIS-012: 🟡 |
| 3 ระบบเนื้อเรื่อง | STO-002 | STO-001: 🟡, STO-003: 🟡, STO-004: 🟡, STO-005: 🟡, STO-006: ⬜, STO-007: 🟡, STO-008: ⬜ |
| 4 ระบบเวทมนตร์ | MAG-003, MAG-004, MAG-005 | MAG-001: 🟡, MAG-002: 🟡, MAG-006: 🟡, MAG-007: 🟡, MAG-008: 🟡, MAG-009: 🟡 |
| 5 ระบบต่อสู้ | CMB-001, CMB-003, CMB-005 | CMB-002: 🟡, CMB-004: 🟡, CMB-006: ⬜, CMB-007: ⬜, CMB-008: 🟡, CMB-009: 🟡 |
| 6 โลกและเนื้อหาขนาดใหญ่ | — | WRD-001: 🟡, WRD-002: 🟡, WRD-003: 🟡, WRD-004: 🟡, WRD-005: 🟡, WRD-006: ⬜, WRD-007: ⬜, WRD-008: ⬜ |
| 7 คุณภาพเกม | QA-006 | QA-001: 🟡, QA-002: 🟡, QA-003: ⬜, QA-004: ⬜, QA-005: 🟡, QA-007: ⬜, QA-008: ⬜, QA-009: ⛔ |
| 8 เกมฉบับสมบูรณ์ | — | REL-001: ⬜, REL-002: 🟡, REL-003: 🟡, REL-004: 🟡, REL-005: ⬜, REL-006: 🟡, REL-007: 🟡, REL-008: ⬜, REL-009: ⬜, REL-010: ⬜ |

## ห้างานถัดไปตามpriorityและdependency

1. VIS-004 (GS-007/GS-033) NPC/ศัตรู silhouette และท่าพิเศษครบ — ต้องมี VIS-001
2. VIS-011 (GS-009/GS-010) กล้อง Cinematic และtransitionตามทิศทาง — ต้องมี VIS-006
3. VIS-008 (GS-008/GS-009) ฉากหมู่บ้าน ป่า โรงช่าง หอสมุด ลำธาร โบราณสถาน เทศกาล — ต้องมี VIS-001
4. CMB-006 (GS-022/GS-026/GS-027) B03/B04พร้อมAI/rules/art/rewards/conditionalflee — ต้องมี CMB-003, VIS-008
5. STO-001 (GS-025/GS-026/GS-027/GS-028) เนื้อเรื่องหลักบท1ตามScene/Choice canonครบ — ต้องมี FND-003

เมื่อพบP0/P1 regressionให้แทรกก่อนรายการนี้ ไม่เปิดเส้นทางโบราณสถานจนภาพ/rules/save/testsพร้อม; บอส/เทศกาล/ตอนจบรอdependenciesตามMaster Roadmap

QA-009 ติดข้อจำกัดอุปกรณ์จริง/Safari; Chromiumจำลองช่วยพัฒนาต่อได้ แต่ไม่ใช้เป็นhardwareacceptance. เส้นทาง1.0สำคัญ: CMB-006 → CMB-007 → STO-006 → WRD-006 → QA-008 → REL gates

ประวัติ: [DEVELOPMENT_LOG](DEVELOPMENT_LOG.md) · สถานะรอบ: [PROGRESS](PROGRESS.md) · หลักฐานทดสอบ: [TEST_REPORT](TEST_REPORT.md)
