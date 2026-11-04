# GODSEED — คู่มือเริ่มจนเผยแพร่ผ่านโทรศัพท์เท่านั้น

## ของที่ต้องมี
- บัญชี GitHub และสิทธิ์ใช้ Codex Cloud ที่เชื่อมกับ GitHub repository
- โทรศัพท์ที่เข้า GitHub และ Codex ได้ (การสร้าง Cloud environment ใหม่อาจต้องใช้หน้าเว็บ ไม่ใช่เฉพาะแอปมือถือ)
- ไฟล์ `01_CODEX_START.md`, `02_GODSEED_MASTER_SPEC.md`, `03_CODEX_CONTINUE_FOREVER.md` และ `GODSEED_CODEX_SKILLS_10.zip` จากบทสนทนา ChatGPT

## ลำดับแนะนำ

### 1. สร้าง repository
เปิด GitHub บนโทรศัพท์ สร้าง repository ชื่อ `godseed` (แนะนำ Public เพื่อเผยแพร่ GitHub Pages ด้วยบัญชีฟรี) และเพิ่ม README. อย่าใช้ repository ที่มีงานเก่าซึ่งต้องรักษาไว้โดยไม่ตรวจสอบ.

### 2. อัปโหลดไฟล์ตั้งต้น 4 ไฟล์
ในหน้า repository บนเว็บ GitHub เลือก Add file > Upload files (หากหน้ามือถือไม่มีเมนู ให้ลองโหมดเว็บไซต์เดสก์ท็อป) แล้วอัปโหลดไปที่ **root**:
- `01_CODEX_START.md` — คำสั่งเริ่มเกม
- `02_GODSEED_MASTER_SPEC.md` — ข้อกำหนดและเนื้อเรื่องทั้งหมด
- `03_CODEX_CONTINUE_FOREVER.md` — คำสั่งพัฒนาต่อ
- `GODSEED_CODEX_SKILLS_10.zip` — แพ็ก Skills ทั้ง 10 ตัว (ภายใน ZIP มี `.agents/skills/.../SKILL.md`)

หากอัปโหลด ZIP ไม่ได้ ให้ใช้ `GODSEED_INSTALL_ONE_PROMPT.md` เป็นข้อความคำสั่งหรือแนบไฟล์แทน.

### 3. เชื่อม Codex Cloud กับ repository
เปิด Codex เลือก Cloud environment ที่ใช้ repository `godseed`. ถ้ายังไม่มี environment ให้สร้างและ publish ผ่านเว็บ ChatGPT/Codex (ตามฟีเจอร์ที่บัญชีรองรับ; แอปมือถือมักเลือก environment ที่เผยแพร่ไว้แล้ว แต่การสร้างใหม่เป็นงานบนเว็บ/เดสก์ท็อป). เปิดหน้าเว็บบนโทรศัพท์และเลือกโหมดเว็บไซต์เดสก์ท็อปได้หากจำเป็น โดยไม่รับประกันว่าทุกปุ่มจะแสดงบนทุกอุปกรณ์.

### 4. ส่ง task แรก: ติดตั้ง Skills
คัดลอกไปวางใน Codex:

> งานนี้ให้ติดตั้ง Skills ก่อนเริ่มเขียนเกมเท่านั้น ตรวจสถานะ repository ก่อน แล้วใช้ไฟล์ `GODSEED_CODEX_SKILLS_10.zip` ใน root แตกไฟล์โดยเก็บโครงสร้าง `.agents/skills/<name>/SKILL.md` ให้ครบ 10 ตัว ห้ามเขียนทับของเดิมแบบไม่ตรวจ diff สร้างหรืออัปเดต `AGENTS.md` เพื่อกำหนดมาตรฐาน GODSEED และเลือกอ่าน Skill ตามงาน ตรวจ YAML frontmatter และนับให้ครบ 10 ตัว สร้าง `docs/SKILLPACK_INSTALL_REPORT.md` รายงานผล พร้อม commit หรือเสนอ PR ตามสิทธิ์จริง อย่าเริ่มสร้างเกมรอบนี้ หากไฟล์ ZIP ไม่พบ ให้แจ้งชัดเจน ห้ามแต่งว่าติดตั้งแล้ว

ตรวจ diff และ merge PR หรือยืนยัน commit ให้ขึ้น branch หลัก **ก่อนเริ่ม task ใหม่**.

### 5. ส่ง task ที่สอง: เริ่มสร้างเกม

> เริ่มสร้าง GODSEED ใน repository นี้จริง ๆ อ่าน `01_CODEX_START.md` และ `02_GODSEED_MASTER_SPEC.md` ให้ครบ และทำตามข้อกำหนด ถือสเปกเป็นแหล่งจริง ให้ใช้ Skills ใน `.agents/skills/` ตามงาน ลงมือสร้าง Vertical Slice ที่เล่นจบได้ก่อน เพิ่มทดสอบ Build, UI Pixel Art, ตัวเลือกที่แสดงแอนิเมชัน, วัตถุดิบ, ผสมเวท, ต่อสู้ Turn-Based, สมุดเวท และรองรับโทรศัพท์/iPad/คอมพิวเตอร์ อัปเดต `docs/PROGRESS.md` กับ `docs/TASK_BOARD.md` ตลอดรอบ หากยังไม่เสร็จให้ส่งมอบงานจริงและบันทึกสิ่งค้าง ไม่ตอบเพียงแผน ตรวจ `npm ci`, typecheck, lint, test และ build เท่าที่รันได้จริง รายงานผลเป็นภาษาไทย และเปิด PR หรือ commit ตามสิทธิ์

ตรวจ/merge งานที่ต้องการเก็บ ไม่เปิด task ใหม่บนสถานะ repository ที่ไม่มีการบันทึกงานจากรอบก่อน.

### 6. เปิด GitHub Pages และเผยแพร่
เข้า repository > Settings > Pages > Build and deployment > Source > **GitHub Actions**. ให้ Codex สร้าง workflow `.github/workflows/deploy.yml` ที่ Build Vite และ Deploy `dist` พร้อมกำหนด `base` ให้รองรับ `/godseed/`. ตรวจ Actions ว่าผ่านจริง. เว็บมักมีที่อยู่ `https://<ชื่อบัญชี>.github.io/godseed/` (ตรวจ URL จริงใน Settings/Actions ก่อนแชร์).

ถ้า Build หรือ Deploy ล้มเหลว ให้ส่ง Codex:

> ตรวจสาเหตุ GitHub Actions / GitHub Pages ที่ล้มเหลวจาก log จริง แก้ Vite base, asset paths, workflow permissions และการ Build โดยไม่เปลี่ยนกติกาเกม ทดสอบซ้ำ สรุปผลและรายงาน URL ที่เปิดได้จริง

### 7. ทดสอบและตรวจคุณภาพ
ทดสอบเกมบนโทรศัพท์จริงของคุณ; ให้ Codex ทดสอบ viewport และ input บน browser automation (โทรศัพท์ 360x800, 390x844; iPad 768x1024, 1024x768; desktop 1366x768, 1920x1080). การจำลองหน้าจอไม่เท่ากับการยืนยันบน iPad หรือคอมจริง และต้องระบุความต่างอย่างตรงไปตรงมา.

> ตรวจ Vertical Slice ตั้งแต่เริ่มเกมจนจบบทแรก ทดสอบตัวเลือกทุกเส้นทาง สูตรเวท ผลของสกิล การต่อสู้ การบันทึก/โหลด และ UI ทั้งสามกลุ่มอุปกรณ์ ห้ามอ้างทดสอบผ่านหากไม่มีหลักฐาน แก้ P0/P1 ก่อนเพิ่มฟีเจอร์ แล้วบันทึกผลใน docs/QA_MATRIX.md

### 8. พัฒนาต่อซ้ำตามต้องการ
ทุกครั้งที่ merge หรือบันทึกงานที่ต้องเก็บแล้ว ส่ง task ใหม่ใน repository เดิม:

> อ่านและปฏิบัติตามไฟล์ `03_CODEX_CONTINUE_FOREVER.md` ทั้งหมดใน repository ก่อนลงมือ ตรวจ codebase, `docs/PROGRESS.md`, `docs/TASK_BOARD.md`, ประวัติการแก้ไขและผลการทดสอบจริง เลือกงานสำคัญที่สุดที่ยังค้างแล้วพัฒนาต่อให้เสร็จเป็นชิ้นงาน ห้ามเริ่มเกมใหม่หรือทำของเดิมหาย รันการทดสอบที่เกี่ยวข้อง อัปเดตเอกสารและสรุปภาษาไทยว่าเพิ่มอะไร, อะไรเล่นได้จริง, อะไรยังขาด, สถานะ GitHub Pages และงานถัดไป พร้อม commit/PR ตามสิทธิ์

หลังจบแต่ละรอบ ให้ตรวจ diff, ยืนยัน commit/merge, ทดลอง URL แล้วทำขั้น 8 ซ้ำ. ไม่มีคำสั่งที่ทำให้ Codex ทำงานต่อเบื้องหลังแบบไม่มีขีดจำกัดโดยไม่เริ่มรอบใหม่.

## สรุปหน้าที่แต่ละไฟล์
- `GODSEED_CODEX_SKILLS_10.zip`: ส่ง **ครั้งแรก** เพื่อติดตั้ง 10 Skills
- `GODSEED_INSTALL_ONE_PROMPT.md`: **ทางเลือกแทน ZIP** หากอัปโหลดหรือแตก ZIP ไม่สะดวก
- `01_CODEX_START.md`: ส่ง **ตอนเริ่มสร้างเกม**
- `02_GODSEED_MASTER_SPEC.md`: ส่งพร้อมไฟล์ 1 และเก็บไว้ใน repo เพื่ออ้างอิงตลอด
- `03_CODEX_CONTINUE_FOREVER.md`: ส่ง **ทุกครั้งที่ต้องการพัฒนาต่อ**

**ข้อควรทราบ:** Skills เป็นแนวทางการทำงาน ไม่ใช่ฝึกน้ำหนักโมเดลใหม่; GitHub Pages เป็น Static Hosting ไม่มี Backend AI ส่วนตัวโดยอัตโนมัติ; อย่าใส่ API key ในโค้ดหน้าเว็บ.
