# Session15 — 0.7.0 / player-owned save files and Maren listening

Manual File Save only. Owner V2 supersedes historical autosave/recovery guidance. All progress stays in RAM, saved only on explicit export. Existing browser databases are not accessed or silently deleted. Legacy owned JSON files can be chosen and migrated in RAM.

Actual public-browser screenshots: [listening](public-maren-listening-390.png), [empty title after reload](public-empty-reload-390.png), [file preview](public-file-preview-390.png), [file restored garden](public-file-loaded-390.png). These are screenshots of the game, not mockups. Chrome emulation is separate from physical Safari/iOS/Android QA.

Raw proof: [checks](local-checks.txt), [85 browser tests](local-e2e.txt), [15 focused tests](focused-browser.txt), [verification JSON](verification.json). Format contract: [SAVE_FILE_FORMAT](../../SAVE_FILE_FORMAT.md). Full Thai report: [REPORT_TH](REPORT_TH.md).

### หลักฐานปิด Session15 — 0.7.0

Source `0676719` / PR#14 / merge `8b610f3`. Local85/85PASS; PR CI42113575343 full85/build SUCCESS; main CI42116389685 full85/build/deploy SUCCESS. Unit115/Content2/Roadmap8/type/lint/build/manual-sourcegate/referencechecksPASS; focused15/15PASS1.4m; ทดสอบปุ่มโหลดพร้อมใช้งาน 1/1 PASS11.4s; 54PNGสร้างซ้ำตรงbyte มาเรนใหม่7,039bytes

เว็บจริง https://ninon0406.github.io/alltest/ ผ่านexplicit.godseed download/nativefilechooser/summary-confirm/exact-state-roundtrip/emptyrefresh/beforeunload/nohiddendownload/no-browserprogressstorage/no-saveupload; รับของ/ผสม5สูตร/3การต่อสู้/โหลดกลางเทิร์น/ความทรงจำครบตามrouteเดิม และCH0602นั่งฟังMaren/bloomจากfileผ่าน ตรวจหลังActionsdeploy43versionedPNG+JSตรงBuild `53e61c12e64e90d82fddaa3efb851c12de7da4cfae171c573a4df174c14cedc2` ไม่มีConceptrequests/ConsoleErrorsในเส้นทางตรวจ

SAVE12/14=85.7%สำหรับงานย่อย (SAVE-011/SAVE-012 อุปกรณ์จริงยัง in_progress) FND-005จึงยังin_progress Checklistหลัก20/76=26.3%, scope1.020/73=27.4% ไม่เพิ่มSAVE14เข้าdenominatorซ้ำ ไม่มีhardwareSafari/FPS/humanfunacceptance ภาพยังprototype ไม่อ้าง1.0หรือRef05ครบฉาก
