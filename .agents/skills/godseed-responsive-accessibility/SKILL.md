---
name: godseed-responsive-accessibility
description: Use for GODSEED responsive web-game UI, touch accessibility, iPhone/Android phone, iPad portrait/landscape, desktop mouse/keyboard, Thai text layout, reduced motion, and performance tuning.
---

# GODSEED 3-Platform UX — phone / iPad / desktop

## Scope and hierarchy
Only required device families: **phones (iOS/Android), iPad, desktop/laptop browsers**. Owner uses phone to operate Codex; player can use any of the three. Do not demand a desktop authoring workflow. No forced device rotation and no tiny desktop-style UI on mobile.

## Must support
Phone: 360×800, 390×844, 430×932 portrait; 844×390 landscape. iPad: 768×1024, 820×1180 portrait; 1024×768 landscape. Desktop: 1366×768, 1440×900, 1920×1080. Real devices may differ; design fluid rather than exact fixed viewport mocks.

## Input principles
- Choice-driven gameplay: tap/click on visible choices; no virtual joystick or WASD game loop
- Selection/confirmation reachable by touch and keyboard; mouse hover optional bonus, never sole cue
- Tap targets at least ~44 CSS px in primary UI when practical; touch `pointerup` debounced to avoid double event
- Buttons `disabled` with reasons; focus management on modal/open/close; escape/back navigation only if safe
- Distinguish screen coordinates from game logical coordinates; account for device pixel ratio and safe areas

## Layout
- Game scene uses aspect-aware camera; letterbox intelligently rather than stretch pixels; scroll narrative text in accessible DOM overlay when needed
- Choices dock below scene on phones with room for Thai lines; on iPad/desktop use adaptive layout to avoid covering key actors
- Never place critical UI under notch/home indicator; CSS `env(safe-area-inset-*)` with fallback
- Numeric status visible (HP/MP/items) with strong contrast, icons labeled; avoid reliance on red/green alone
- Text controls: adjustable speed, skip animation, readable Thai font and line-height, contrast; do not truncate critical story choices

## Accessibility and comfort
- Honor `prefers-reduced-motion`; disable large camera shakes/flash effects and provide a settings toggle
- Sound mute and independent SFX/music levels; autoplay audio requires first user interaction
- Touch and game UI usable without audio; subtitle/caption for meaningful cues
- Focusable semantics for key actions, ARIA status updates for changes, no keyboard traps
- No dark overlay that makes vivid pixel art look muddy; ensure visual hierarchy via restrained palette

## Performance
- Prioritize fast startup and low memory phones; texture atlas, asset lazy-loading by chapter, particle budgets, bounded caches
- Profiles: Low/Medium/High based on measurements and settings; do not auto force High on iPad or Low on every phone
- Avoid high-frequency react/state rerenders around Phaser canvas; isolate DOM overlays
- Pause/limit animations when tab hidden; restore state/scene timing safely; handle orientation and dynamic viewport changes
- Measure frame consistency, scene load and memory proxies; report device emulator vs hardware separately

## Acceptance matrix
At every milestone test choices visible, touch can tap all actions, modal exits, no horizontal scroll, art not distorted, Thai text fits, spellbook crafting/equip usable, battle targets selectable, save resume consistent across phone/iPad/desktop. Use Playwright phone/tablet presets or explicit viewports; Playwright emulation is **not** real iPhone/iPad Safari hardware test—request owner’s manual check when necessary
