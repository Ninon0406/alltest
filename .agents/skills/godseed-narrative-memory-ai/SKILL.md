---
name: godseed-narrative-memory-ai
description: Use for GODSEED Thai story content, choice consequences, NPC memories, world continuity, optional local AI storyteller, dialogue validation, and non-AI fallback text generation.
---

# GODSEED Narrative + Memory + Optional AI

## Narrative identity
World remembers meaningful actions. First chapter lore and all NPC/quest facts follow master spec; do not replace plot or invent new canon contradictory to `CH1` and `NPC_LUMI`, `NPC_MAREN`, `NPC_EIRA`, `NPC_KORO`, `NPC_PIP`, `NPC_SENTINEL`. Major motifs: the forgotten village song, music box, memory echoes, investigation, empathy, and consequences. Keep fantasy adventure approachable and non-graphic.

## Two-layer system
1. **Truth layer** = deterministic content graph + event log + state flags + item ledger + NPC trust and memories; solely engine can mutate state
2. **Expression layer** = Thai lines, contextual descriptions, NPC mood variation; AI, if enabled, gets a sanitized snapshot and returns only **candidate text**

## Context contract
Send to narrative renderer: `sceneId, actorId, relevantFlags, lastImportantEvents[], relationshipLevel, timeOfDay, tone, allowedFacts[], forbiddenClaims[], maxChars`. No private info; don't use unbounded chat histories. Returned JSON (when applicable): `{lineTh, mood, referencedEventIds[]}`; schema validate and confirm all referenced event IDs exist. Invalid output → authored fallback.

## Offline first
- A curated library of authored Thai lines and template variation must carry entire chapter without any AI/network
- Optional local model may be requested after core game starts; lazy load + progress + cancellation + memory/time budget; no blocking game loop
- No secret API key in frontend; no remote service required to finish game
- Verify Thai generation quality empirically before shipping; if poor, disable generative mode on unsupported devices and use deterministic variation
- If model requires online download, say that initial download needs internet; provide an option to delete cached model to save storage

## NPC Memory
Store compact, typed fact tags and a few event references rather than verbatim full chat: `factId, who, sourceChoiceId, when, significance, sharedWith[]`. NPC speech may vary by known facts and trust; AI cannot invent that someone remembers a non-occurring event. All world mutations go through validated choice/combat reducers.

## Content writing specification
- Thai natural, short paragraphs, plain words, no forced melodrama
- Three sorts of beats: 1) light adventurous humor 2) mystery/clues 3) emotional payoff
- Each choice clearly states intent, not guaranteed outcome; neither branch is a fake correct answer
- Choices change facts/trust/resources/knowledge or visible consequences; ensure both joyful and suspenseful sequences
- Log bilingual ID, Thai line, tone, max length, action cue, preconditions, resulting event IDs for localization and tests

## Tests / evaluation
- Run game with AI disabled and no network after assets cached: same story progression
- Fuzz invalid model output, timeout, memory pressure, unsupported browser, returned English gibberish, contradictory facts
- UI test 360px width with Thai glyphs, dialogue skipping and reading pace
- No new AI result should alter quests, inventory, HP, MP, NPC memory or outcomes
