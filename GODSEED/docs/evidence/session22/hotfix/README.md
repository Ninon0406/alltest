# Session22 / 0.12.1 — scene actor loading

พบหลัง0.12.0Source355/PR22ผ่าน148และเว็บจริง:เมื่อreloadแล้วimportopeningfileจาก0.11.1ก่อนเข้าECHO_CALL stagevillage ยังไม่เคยโหลดEIRAซึ่งอยู่grouparchive จึงแสดงMarenfallbackผิดตัวโดยไม่มีasseterror. Redจริงบนlocal/public0.12.0ในcold-npc-red.txtและbefore-cold-eira-390.png

แก้ArtForStage/ArtLedgerให้รับrequiredactorจากWorld.prepare/show โหลดเฉพาะsheetที่ขาดและรวมในerrors/retrycontext. Titleยัง25PNG/ไม่โหลดgladeทั้งชุด ไม่เพิ่มPNGและไม่เปลี่ยนState2/File2/SceneIDs/234recipes. ทุก88PNGเดิมเหมือน0.12.0

Unit244ผ่าน(เพิ่ม2ด้านactorcache/errorretry);Focused15ผ่าน2.7mและcoldfilecaseเสริมพร้อมabort/retryผ่าน1/1ใน16.5s. Full149/PRCI/public0.12.1ยังรอผลจริง รอบMainCI42365860406ของ0.12.0cancelledโดยตั้งใจ ไม่ใช่PASSครบ

เก็บnativeactiveECHOfileจากpublished0.12.0ใน/tmp/gs22-published-0.12.0.godseedเท่านั้น เพื่อทดสอบ5legacyversionsหลังpatch. legacy012-capture.jsonเก็บเฉพาะhash/metadata ไม่commit/uploadsavebytes. Source/merge/CI/publicผลปิดรอบดูverification.jsonในไดเรกทอรีหลัก


## Final receipt read on 2026-11-08

Source53c1dcb/PR23/merge734e21d. Local149PASS28.9m;PRCI42367573181/job128388771945 full149PASS25.7mและsourcegatesPASS. Actualpublic0.12.1ผ่าน5nativelegacyversions/coldEIRA/B04จริง→รางวัล→craftECHOCHAINPIERCE/equip/damage/10emulatedviewports/noStorageUploadReferenceConsoleError/77PNG+JSexact. Statehashbdf54204c96397c13aba9e4cde09882575110e802ca532131402c660a7a5a27aตรงlocal/0.12.0. LegacyPages42369615427SUCCESS

**MainCI42369615679FAILED**:148PASS/1FAIL37.2mในcombinednormalVFXscreenshot→lateSkip,canvasinterceptแล้วanimationจบปุ่มหาย;deployActionsjobskipped. ไม่อ้างMain149PASS. Session23แยกcaptureกับearlytouchSkip+hittestและCSSz-indexแล้วรอFull155ใหม่. ดูmain-ci.json/../verification.json
