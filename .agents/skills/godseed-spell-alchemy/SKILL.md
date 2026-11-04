---
name: godseed-spell-alchemy
description: Use for GODSEED ingredient collection, rune recipes, legal spell combinations, deterministic crafting, spellbook discovery, equipment slots, progression, and recipe validation; enforce the canonical formula rules.
---

# GODSEED Spell Alchemy — กฎเวท 234 สูตร

## ข้อเท็จจริงที่ต้องรักษา
ต้นแบบระบุ 8 cores × 6 forms × 7 modifiers = 336 combinations ก่อนกรอง; rule-set ตาม master spec อนุญาต 234 สูตร (ไม่ใช่ทุก combination ถูกกฎหมาย). **ห้ามเดากฎ filtering**: อ่านตาราง/logic ใน master spec แล้วเขียน implementation + independent verifier. ถ้าสเปกหรือจำนวนจริงไม่ตรง ให้บันทึก discrepancy และแก้ด้วย tests ไม่แก้ตัวเลขโดยเงียบ

## Typed schema
```
Ingredient { id; tags[]; rarity; sourceIds[]; inventoryMax? }
Rune { id; category: 'core'|'form'|'modifier'; unlockCondition; descriptionTh }
SpellRecipe { key: string; coreId; formId; modifierId; valid: true }
SpellDefinition { id; nameTh; damageType; targetPattern; cost; effects[]; vfx: VfxDescriptor; storyTags[] }
```
แยกวัตถุดิบ raw item จาก rune component ที่ปลดล็อก; ห้ามสูญเสียสูตรที่ค้นพบเพราะวัสดุหมดเว้น master spec ระบุแบบอื่น

## Build the engine
1. อ่าน source of truth แล้วสร้าง canonical arrays/typed enums, compatibility predicate
2. Enumerate legal combos แบบ deterministic; serialize key แน่นอน (`core/form/mod`) และ sorted output
3. Prevent duplicates in spellbook; IDs stable across saves (migration หากจำเป็น)
4. Ingredient acquisition จาก explicit scene/choice rewards: ให้ player รู้เหตุและจุดที่หาได้ ไม่ random-drop ล้วน
5. Crafting: preview components → validate ownership & compatibility → show reason → consume costs atomically → discover spell once → journal update
6. Equip 4 slots: swap/replace, prevent invalid/duplicate equip if ruled, persist through save/reload
7. Separate recipe definition from combat execution: combat reads spell stats and VFX descriptor; story queries `spell.storyTags`
8. Signature spells เฉพาะเนื้อเรื่องกำหนดด้วย explicit overrides keyed by legal combo; overrides must remain deterministic

## Generator of outcomes
Spell strength = base core contribution + form area/target profile + modifier property + progression + conditional reactions, subject to bounds; calculate in pure function, never `Math.random()` hidden in rendering. Combat RNG uses seeded stream stored in state; VFX random can use independent cosmetic seed

## Tests mandatory
- 336 candidate combos; 234 legal according to canonical spec; no duplicate keys
- 100% legal recipes have nameTh, descriptionTh, cost, effects, vfx descriptors and meaningful differences by form/mod
- Invalid recipes explain why, never consume items
- Discover once / craft retry / save migration / equip slot constraints
- Verify reachable ingredient sources for required story spells; starter path doesn't trap progress
- Spell story-tags allow meaningful non-combat choices

## Anti-patterns
Do not manually type 234 nearly identical spells; do not fake content count; do not hide mismatched formula total; do not make every skill the same particle effect with only color replaced
