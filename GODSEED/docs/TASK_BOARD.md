# GODSEED Task Board

Generated view จาก [roadmap.json](roadmap.json); สถานะครบ/หลักฐาน/เกณฑ์อยู่ใน [GODSEED_MASTER_ROADMAP](../../GODSEED_MASTER_ROADMAP.md) ห้ามนับสถานะบอร์ดนี้ซ้ำ

Checklist 23.9% · ✅26 🟡46 ⬜35 🔴0 ⛔2 · ทั้งหมด109

V6ขยายขอบเขต12ARC/8LifePaths;21/76=27.6%เป็นsnapshotก่อนขยาย ดูscopeHistoryในJSON งานเดิมไม่ถูกลบ เป้าหมายตัวเลขไม่ใช่ของที่สร้างเสร็จ

| ด้าน | ✅ / ทั้งหมด | Checklist |
| --- | ---: | ---: |
| ระบบเกม | 8/30 | 26.7% |
| เนื้อเรื่อง | 2/22 | 9.1% |
| ภาพและแอนิเมชัน | 6/14 | 42.9% |
| เวทมนตร์ | 3/11 | 27.3% |
| การต่อสู้ | 5/11 | 45.5% |
| คุณภาพและการทดสอบ | 2/21 | 9.5% |

| Phase | งานที่เสร็จ | งานที่เหลือ (ID: สถานะ) |
| --- | --- | --- |
| 0 Audit & Benchmark — ตรวจและศึกษาต้นแบบ | FND-009, AUD-002 | AUD-001: 🟡 |
| 1 Core Playability — เกมหลักเล่นต่อได้ | FND-001, FND-002, FND-003, FND-004, FND-007, FND-008 | FND-005: ⛔, FND-006: 🟡 |
| 2 Story Engine & Content Pipeline | STO-002, PIPE-001 | STO-007: 🟡, STO-008: ⬜, WRD-003: 🟡, PIPE-002: 🟡 |
| 3 Complete Opening Experience — ช่วงเริ่มต้นครบ | — | STO-001: 🟡, WRD-006: 🟡, ARC-001: 🟡 |
| 4 Life Paths — เส้นทางชีวิต | LIFE-001 | LIFE-002: ⬜, LIFE-003: ⬜, LIFE-004: 🟡, LIFE-005: ⬜, LIFE-006: 🟡, LIFE-007: ⬜, LIFE-008: ⬜, LIFE-009: ⬜ |
| 5 Magic System — ระบบเวทและการเรียนรู้ | MAG-003, MAG-004, MAG-005 | MAG-001: 🟡, MAG-002: 🟡, MAG-006: 🟡, MAG-007: 🟡, MAG-008: 🟡, MAG-009: 🟡, POWER-001: ⬜, MAG-010: ⬜ |
| 6 Combat — การต่อสู้ | CMB-001, CMB-003, CMB-005, CMB-006, CMB-007 | CMB-002: 🟡, CMB-004: 🟡, CMB-008: 🟡, CMB-009: 🟡, CMB-010: 🟡, CMB-011: ⬜ |
| 7 World Systems — โลกและสังคม | — | STO-003: 🟡, STO-004: 🟡, WRD-001: 🟡, WRD-002: 🟡, WRD-004: 🟡, WRD-005: 🟡, WRD-009: ⬜, WRD-010: ⬜, WRD-011: ⬜, WRD-012: ⬜ |
| 8 Main Story Expansion — ARC 1–6 | — | WRD-007: ⬜, ARC-002: 🟡, ARC-003: ⬜, ARC-004: ⬜, ARC-005: ⬜, ARC-006: ⬜ |
| 9 Advanced Story Expansion — ARC 7–12 | — | WRD-008: ⬜, ARC-007: ⬜, ARC-008: ⬜, ARC-009: ⬜, ARC-010: ⬜, ARC-011: ⬜, ARC-012: ⬜ |
| 10 Visual & Cinematic Polish | VIS-002, VIS-003, VIS-006, VIS-011, VIS-013, VIS-014 | VIS-001: 🟡, VIS-004: 🟡, VIS-005: 🟡, VIS-007: 🟡, VIS-008: 🟡, VIS-009: 🟡, VIS-010: 🟡, VIS-012: 🟡, QA-002: 🟡 |
| 11 Endings & World Consequences | — | STO-005: 🟡, STO-006: ⬜ |
| 12 Performance & Quality | QA-006 | QA-001: 🟡, QA-003: 🟡, QA-004: ⬜, QA-005: 🟡, QA-007: ⬜, QA-008: ⬜, QA-009: ⛔ |
| 13 GODSEED 1.0 — Release Gates | — | REL-001: ⬜, REL-002: 🟡, REL-003: 🟡, REL-004: 🟡, REL-005: ⬜, REL-006: 🟡, REL-007: 🟡, REL-008: ⬜, REL-009: ⬜, REL-010: ⬜ |

## ห้างานถัดไปตามpriorityและdependency

1. PIPE-002 (V6) Content production contract สำหรับเพิ่มบทเป็นชุด — ต้องมี PIPE-001, STO-002
2. STO-001 (GS-025/GS-026/GS-027/GS-028) เนื้อเรื่องหลักบท1ตามScene/Choice canonครบ — ต้องมี FND-003
3. ARC-001 (V6) ARC 1 — เมล็ดพันธุ์แรก — ต้องมี PIPE-002, STO-001
4. ARC-002 (V6) ARC 2 — เสียงกระซิบจากพฤกษา — ต้องมี ARC-001
5. LIFE-004 (V6) นักสำรวจ — ต้องมี LIFE-001, ARC-001

เมื่อพบP0/P1 regressionให้แทรกก่อนรายการนี้ คิวนี้เป็นงานสำคัญที่ต้องตรวจdependencyของส่วนย่อยก่อนทำ ไม่อ้างว่าทั้งmilestoneพร้อมเพราะอยู่ในคิว ใช้Vertical Slice + Content Batch + Automated Validation ไม่รอภาพทั้งหมดก่อนเพิ่มบทหรือทดสอบต่อสู้

QA-009 ติดข้อจำกัดอุปกรณ์จริง/Safari; Chromiumจำลองช่วยพัฒนาต่อได้ แต่ไม่ใช้เป็นhardwareacceptance. เส้นทางV6: PIPE → opening/ARC1 → LifePaths/world/power → ARC2–12 → ผลลัพธ์สะสม → QA-008 → REL gates; งานเดิมB04/B05/สามบทสรุปยังคงมีIDและสถานะตามหลักฐาน

ประวัติ: [DEVELOPMENT_LOG](DEVELOPMENT_LOG.md) · สถานะรอบ: [PROGRESS](PROGRESS.md) · หลักฐานทดสอบ: [TEST_REPORT](TEST_REPORT.md)
