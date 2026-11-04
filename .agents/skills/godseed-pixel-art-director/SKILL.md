---
name: godseed-pixel-art-director
description: Use when designing, creating, integrating, reviewing, or polishing GODSEED HD pixel art, animated sprites, tilemaps, parallax backgrounds, palette, effects, readability, and visual consistency.
---

# GODSEED Pixel Art Director — ศิลปะไม่แปะรูปกระดาษ

## เป้าหมาย
Pixel Art 2D เอกลักษณ์เดียวกัน ฉากดูมีชีวิต สดใสแต่สบายตา ตัวละครสัมผัสกับพื้นโลกจริง ผ่านการเดิน/แอนิเมชันตาม choice ไม่ใช่รูป PNG ลอยอยู่หน้าฉาก JPEG

## Art bible / เกณฑ์เสนอเพื่อยืนยันกับ master spec
- อ่าน `docs/ART_BIBLE.md` และ master spec ก่อนยึดค่าตัวเลข; หากไม่มีให้เริ่ม reference scene 320×180 หรือ 384×216 logical pixels, ปรับตาม layout/visibility; **ไม่แอบเปลี่ยนค่าเดิม**
- Tile size ใช้ 16 หรือ 32 px ตาม art bible; sprite เก็บขอบคม, scale จำนวนเต็มเท่าที่หน้าจออนุญาต, ไม่บังคับภาพล้น viewport
- Palette หลัก: หยก/เขียวมิ้นต์, เหลืองอุ่น, ลาเวนเดอร์, พีช, น้ำเงินท้องฟ้า; วัตถุมีค่าสีเข้มอ่อนแยก foreground/background
- แนว silhouette ชัด อ่านวัตถุออกในจอเล็ก; ตัวละครแยกจากฉากด้วย contrast/shadow ไม่ใช่ neon outline
- Pixel edges คมสม่ำเสมอ; ห้ามเอารูปวาดความละเอียดสูงมา resize-nearest แล้วเรียกว่า pixel art
- แสงอุ่น แยกฉากโดยเวลา/อากาศ; จำกัด bloom, shake, flashes; รองรับ reduce motion
- วัสดุเดียวกันใช้สี/texture language เดียวกัน ห้ามปะติดปะต่อ asset หลายสไตล์จนหลุดธีม

## Pipeline งานภาพ
1. อ่าน scene list, mood, layers, action cues แล้วทำ asset checklist (tile, prop, sprite, animation, UI, foreground, VFX)
2. สร้าง **original assets** โดยเครื่องมือที่มี (code-generated pixel textures, pixel tools, authorized art assets); หากระบบสร้างภาพไม่พร้อมให้ทำ procedural prototype ที่รู้ข้อจำกัด ไม่อ้างว่า finished art
3. สร้าง atlas/manifest จดขนาดช่องและ animation names พร้อม origin points, collider/ground shadow anchors
4. แบ่ง scene 5–7 ชั้นได้ตามความจำเป็น: far background, midground, ground tiles, structures, interactive props, actors, foreground/atmosphere
5. ใช้ depth sorting ตามตำแหน่งเท้า (Y-sort) เฉพาะที่มีการซ้อนวัตถุ และมี contact shadow/landing cues
6. ฉากไม่หยุดนิ่งทั้งหมด: ใบไม้/หญ้า/ลำธาร/ไฟ/เมฆ และ NPC idle loop แบบจำกัดต้นทุนประมวลผล
7. สร้าง screenshots จาก runtime จริงแล้วตรวจใน viewport phone portrait, iPad, desktop; ห้ามให้ AI ประเมินจากโค้ดเท่านั้น
8. เก็บ asset source, attribution, licenses ใน `docs/ASSET_LICENSES.md`; ไม่มีสิทธิ์ชัดเจน = ไม่รวมไฟล์

## Phaser implementation
- ตรวจ Phaser รุ่นที่ติดตั้งก่อนใช้ API; ตั้ง `pixelArt: true` หรือการกำหนด texture nearest ตาม renderer ที่มีจริง
- ตรวจ `roundPixels` และใช้ integer positioning เมื่อเหมาะกับ logical grid
- ถ้า Canvas scale fractional จนพิกเซลดูไม่คม ให้ทดสอบ scale strategies ตาม device ไม่ใช่ disable responsive
- Sprite animations ที่ต้องมีสำหรับ action library ขั้นต้น: idle, walk, interact, pickup, talk, cast, hit/react, cheer, rest; fallback to shared animation ที่คงเจตนาของ choice
- แอนิเมชันควรมีเวลาและ timing consistent; ขั้นตอนพิเศษควรสร้าง shot list (ก่อน/ขณะ/หลัง)

## ห้ามทำ
- ภาพหน้าจอจากเกมมีลิขสิทธิ์, trace sprite, ใช้ชื่อร้าน asset ที่ไม่ได้ตรวจ license
- รีใช้ sprite sheet อันเดียวเปลี่ยนเพียง hue แล้วอ้างว่าเป็นมอนสเตอร์ทุกชนิด
- เอฟเฟกต์ทั้งหน้าจอตลอดเวลา/กระพริบแรง ไม่พิจารณาคนไวต่อแสง
- ประกาศ 'สวยแล้ว' โดยไม่มี screenshot หรือ visual review

## Quality gate
ใน 3 ฉากขั้นต่ำ: ตัวละครยืนและเดินไม่ลอย, depth ถูก, pixel edges ชัด, touch choices อ่านได้, มี ambient animation, UI ไม่ทับบท, contrast เหมาะ, ไม่มี asset missing. บันทึก path screenshots และ defect list พร้อมแก้ก่อนขยายแผนที่
