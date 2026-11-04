---
name: godseed-choice-cinematics
description: Use when implementing GODSEED branching narrative choices, automatic character action animation, staging, scene transitions, flags, consequences, and reachable scene graph validation; not for free-roaming controls.
---

# GODSEED Choice-to-Cinematic Engine

## Design contract
ผู้เล่นเลือกการกระทำจากเมนู → lock input → schedule animation beats → apply validated gameplay event once → set flags/items/trust/time → transition/reveal next choices → unlock input. ไม่มีเดินอิสระ ไม่ใช้ visual cut ที่ไม่แสดงการกระทำเมื่อฉากรองรับได้

## Data shape (ปรับชนิดให้เข้ากับโค้ดจริง)
```
ChoiceNode {
 id: ChoiceId; labelTh: string; prerequisites: Condition[];
 action: {actorId, cue, targetId?, pathId?, beats?: TimelineBeat[]};
 costs?: Cost[]; effects: TypedEffect[];
 next: SceneId | ConditionalTransition[];
 fallback?: SceneId;
}
```
แยก `id` กับข้อความไทย; labels ใช้สำหรับ UI อย่างเดียว; logic ใช้ typed IDs และ effect schema. ใช้ `choiceId` stable เพื่อ save migration. อย่าเปลี่ยน IDs โดยไม่มี migration

## Execution ที่ต้อง atomic
1. List enabled options จาก pure conditions (`flags`, inventory, time, trust); show disabled with readable reason หากความชัดเจนเอื้อ
2. เมื่อกด ตรวจ conditions/available costs ซ้ำ; ป้องกัน double-tap และ concurrent execution
3. Snapshot หรือ checkpoint ที่เพียงพอสำหรับ recovery; commit effects หนึ่งครั้งด้วย event ID/idempotency
4. Action director เล่น timeline ตาม `walk → interact → reaction → camera → result` ยืดหยุ่นตาม shot; skip animation ต้องนำไปสู่ state เดียวกัน
5. เกมไม่ควรเปลี่ยน state ก่อนเฟรมที่สื่อว่ากระทำแล้วถ้าไม่ตั้งใจ; display first meaningful feedback
6. หาก animation asset ขาด ให้ fallback ที่ยังอ่านรู้เรื่อง (move/gesture + captions) และ log warning, ไม่ deadlock
7. Next scene must exist; handle branching / retry; save restores a stable scene boundary (ไม่ค้างระหว่าง action)

## Storytelling rhythm
- 1–3 choices ที่แตกต่างจริงในแต่ละช่วง; เพิ่มเมื่อมีเนื้อหา ไม่ยัดปุ่มล้นจอ
- เลือกแต่ละทางให้มีหนึ่งใน: item, trust, knowledge, location, time, combat setup, journal, world visual consequence; ไม่ให้ทุกทางไปต่อเนื้อหาเดียวกันโดยไม่จดจำ
- 50% narrative/choices กับ 50% craft/battle เป็นเป้าหมายเล่นจริง ไม่ใช่นับจำนวนข้อความ
- เส้นทางทุกแบบต้องมีบทสรุปหรือเส้นทางกลับ; hint สถานที่ลับด้วย clues ที่อ่านรู้เรื่อง
- สร้างช่วงเงียบแสดงภาพและอารมณ์ได้ แต่ต้อง skip/fast-forward ได้

## Automated validation
- Check unique SceneID/ChoiceID, every referenced target exists, no unreachable mandatory scene, no deadend without explicit ending
- Enumerate representative paths from opening through item, crafting, boss, endings
- Property test: prerequisites satisfied before cost, effect once only, no negative inventory, repeat click not duplicated
- Test changing locale/layout does not affect logic; keyboard/tab/touch act the same
- Journal reflects the consequences (narrative facts authoritative from engine)

## Art/action integration
Every choice must map to cue(s) available in action library; author test verifies cue existence and valid target anchors. Scene staging uses actor positions/path waypoints and depth; do not automate free-roam A* for authored short scenes unless needed
