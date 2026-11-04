# คำสั่งเดียวสำหรับ Codex — ติดตั้ง GODSEED Skills ก่อนเริ่มพัฒนาเกม

> คัดลอกข้อความตั้งแต่ “เริ่มคำสั่ง” ถึง “จบคำสั่ง” ไปวางใน **Codex task ที่เชื่อมกับ GitHub repository GODSEED** ได้เลยโดยไม่ต้องใช้คอมพิวเตอร์ หากต้องการเนื้อหาทุกไฟล์กำหนดไว้ล่วงหน้าอย่างละเอียดที่สุด ใช้ `GODSEED_INSTALL_ONE_PROMPT.md` แทน (มี FILE BLOCKS ของทั้ง 10 Skills โดยตรง)

## เริ่มคำสั่ง

งานนี้คือ **ติดตั้งและตรวจสอบ Skill Pack ใน repository ก่อนเริ่มสร้าง GODSEED เท่านั้น** ไม่ใช่ให้เริ่มสร้างเกมใหม่ กรุณาลงมือแก้ไฟล์จริงใน repository ที่เปิดอยู่ ไม่ตอบเพียงแผนงาน

สร้าง Codex repository Skills ที่ `.agents/skills/<skill-name>/SKILL.md` รวม **10 Skills** แต่ละไฟล์ต้องมี YAML frontmatter `name` (ตรงชื่อโฟลเดอร์) และ `description` (ภาษาอังกฤษสั้น ชัดเจน เมื่อใดควรเรียกใช้), ตามด้วยขั้นตอนทำงานภาษาไทยที่ลงมือทำได้จริง พร้อม quality gates/checklist และข้อห้ามไม่ให้ทำลายงานเก่า:

1. `godseed-project-director`: ตรวจ repository และไฟล์สเปกก่อนวางแผน; ทำงานเป็น vertical slices; แยก pure engine/content/ui; จัด milestone; รักษาการตัดสินใจเดิมและสถานะงาน
2. `godseed-pixel-art-director`: HD Pixel Art 2D ต้นฉบับใหม่ สีสดใสสบายตา; consistent palette/scale; spritesheet, tilemap, layered depth/parallax, animation; ตรวจไม่ให้เป็นภาพกระดาษแปะ; asset licensing/performance
3. `godseed-choice-cinematics`: เกมแบบคลิกเลือก ไม่ใช่ Open World; choice → intent → automatic character movement/action → cinematic transition → state change; deterministic scene graph; flags/consequences; skip animation; test reachability
4. `godseed-spell-alchemy`: เก็บวัตถุดิบ; สร้างสูตรตาม canonical 8 cores × 6 forms × 7 modifiers และข้อจำกัดจนได้ 234 legal spells; validate IDs; crafting/discovery/spellbook/equip 4 slots; test consistency; เวทใช้ในเนื้อเรื่องด้วย
5. `godseed-combat-vfx`: Turn-Based battle state machine, enemy intents, targeting, HP/MP/status, item/guard/flee/surrender ตามกติกา; procedural elemental spell VFX, animation feedback; deterministic seeded tests
6. `godseed-narrative-memory-ai`: Thai branching story, NPC memory/trust/world flags, believable continuity; optional small local AI for dialog flavor only; fallback 100% ไม่ใช้ AI; ห้าม AI เปลี่ยนสถานะเกมโดยตรง; privacy, no exposed API keys
7. `godseed-responsive-accessibility`: mobile phone iOS/Android, iPad, desktop เท่านั้น; portrait/landscape phone/iPad, mouse/keyboard desktop, touch target, safe-area, Thai typography, reduced motion, low graphics mode, resize handling
8. `godseed-qa-automation`: Vitest, deterministic replay/save/load, recipes count, story graph, turn-based battle, Playwright smoke/E2E for phone/iPad/desktop viewports, screenshots and regression; truthfully report untested cases
9. `godseed-github-pages-delivery`: Vite base URL on repository subpath, asset URLs, GitHub Actions CI/Pages least privilege, build artifact/deploy verification, 404 fallbacks, caching and offline strategy without leaked secrets
10. `godseed-continuous-development`: inspect existing code and progress, select next highest-impact unfinished tasks, no rebuilds from scratch, test, update docs and progress, explain actual work and blockers in Thai; never claim endless background work

**ข้อกำหนดร่วม:** ใช้ข้อมูลจริงจาก `02_GODSEED_MASTER_SPEC.md` เป็นข้อกำหนดรายละเอียดหลักถ้ามี ให้ค้นทั้ง root และ docs; `01_CODEX_START.md` เริ่มโครงการและ `03_CODEX_CONTINUE_FOREVER.md` ใช้พัฒนาต่อ หากไฟล์ไม่ได้อยู่ใน repo อย่าสร้างเนื้อหาเฉพาะที่เดาเองขึ้นมาทดแทน. เกมเป็น HD Pixel Art 2D ภาษาไทย Choice-driven มีภาพเคลื่อนไหวตามตัวเลือก ไม่ใช่เดินอิสระ, เนื้อเรื่อง 50% และผสมเวท/ต่อสู้ 50%, สร้างสำหรับ GitHub Pages แบบ static site, AI เป็น optional, เจ้าของใช้โทรศัพท์เท่านั้น, ผู้เล่นใช้โทรศัพท์/iPad/คอมพิวเตอร์. อย่าแก้เกมในรอบติดตั้ง Skills.

เพิ่มเติม `AGENTS.md` ที่ root: ถ้ามีให้รักษาเนื้อหาเดิมและเพิ่มเพียง routing สั้น ๆ ว่างานแต่ละประเภทให้ Codex อ่าน Skills ที่ตรงงานจาก `.agents/skills` ก่อนเริ่ม; ถ้าไม่มีให้สร้างไฟล์สั้น ๆ ระบุ source of truth, ข้อห้ามทำลายงานเก่า, routing ทั้งสิบ, และ QA checks. อย่าโหลดทั้งสิบในทุกงาน (เรียกเฉพาะที่เกี่ยวข้อง). การมีไฟล์ใน repo จะคงอยู่ข้าม Codex task แม้การติดตั้งใน home ของ cloud runner ไม่คงอยู่.

ก่อนเขียนให้ตรวจ branch, git status, และ skills เดิม; หากมีอยู่แล้วให้ตรวจ/merge อย่างปลอดภัย ห้ามลบหรือเขียนทับการแก้ไขของเจ้าของโดยไม่ตรวจ diff; ห้าม `git reset --hard`, force push, และห้ามเปิดเผย token. สร้าง `docs/SKILLPACK_INSTALL_REPORT.md` สรุปไฟล์จริงทั้งสิบ, การตรวจ YAML frontmatter/ชื่อโฟลเดอร์, git diff, และสถานะ commit/PR. ตรวจครบสิบไฟล์และ YAML ถูกต้องด้วยสคริปต์หรือคำสั่งที่มีใน environment; ถ้าทำไม่ได้ให้บอกชัดเจน. หากมีสิทธิ์ให้ commit หรือเสนอ PR ตาม workflow ของ repo; ห้ามอ้างว่า push/deploy เสร็จหากไม่ได้ทำ.

**ผลลัพธ์ที่ต้องตอบเป็นภาษาไทย:** รายชื่อ Skills ที่ลงจริงพร้อม path, `AGENTS.md` ที่สร้าง/อัปเดต, สรุป verification, commit/PR ถ้ามี, blocker ที่พบ และคำแนะนำให้เริ่ม **Codex task ใหม่** แล้วจึงแนบไฟล์ 1 และ 2 เพื่อเริ่มสร้างเกม; สามารถสั่งให้อ่าน skill ที่เกี่ยวข้องโดยตรงถ้าเมนู Skills ไม่ปรากฏ. ไม่ต้องถามให้เจ้าของเปิด Terminal หรือ Roblox Studio.

## จบคำสั่ง
