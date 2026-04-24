# FE06 Style Compliance Audit Report

Date: 2026-04-24
Branch audited: `master`
Workspace: `new`

## Scope
- Root style system availability
- Global base element standardization
- Major page/component compliance against FE06 checklist
- Severity classification and follow-up action list

## Baseline Metrics
- CSS files: 77
- JS/JSX files: 151
- CSS files using `var(--...)`: 45
- CSS files containing hardcoded color literals: 60
- JS/JSX files with inline style objects: 43
- Page-local `:root` definitions outside global token files: 4

## FE06 Foundation Status

### Completed in this pass
- Root token system implemented in `src/styles/root-style-system.css`.
- Global import wired in `src/App.js`.
- Base styles standardized for `body`, headings, links, buttons, inputs, and cards.
- State tokens added for hover, focus, disabled, error, success.
- Compatibility aliases kept for existing variable usage to avoid regressions.

### Still pending for full FE06 closure
- UI Leader confirmation against Figma numeric token values.
- Full page-by-page migration off hardcoded literals.

## Major Page Snapshot

| Area | Compliance | Notes |
|---|---|---|
| Home | Partial | Strong token usage, still has some hardcoded values |
| Health News | Good | Mostly tokenized, minor hardcoded leftovers |
| Appointment | Partial | Mixed token + hardcoded blocks |
| Meal | Low | Large local palette/hardcoded surface |
| Community/Post Detail | Low | Many hardcoded colors/shadows |
| User Profile | Low | Inline style-driven theming |
| Login/SignUp | Low | Inline style-driven theming |
| Food Preferences | Low | Own `:root` token island |
| Health Tools | Low | Own `:root` token island |
| Chat | Low | Own `:root` token island |

## Shared Component Snapshot

| Component | Compliance | Notes |
|---|---|---|
| Main Navbar | Partial | Mostly tokenized, small hardcoded button background/hover values |
| Water Tracker | Partial | Uses global vars but still contains hardcoded palette for orb/toggle visuals |
| Text To Speech | Low | Inline style map with hardcoded colors and shadows |

## Findings by Severity

## P0 (Critical)
- Page-local token system overrides shared root style.
  - `src/routes/FoodPreferences/FoodPreferences.css:1`
  - `src/routes/HealthTools/HealthTools.css:1`
  - `src/routes/chat/ChatPage.css:1`
- Inline style-driven design system bypass in major user-facing pages.
  - `src/routes/UI-Only-Pages/UserProfilePage/userprofile.jsx:150`
  - `src/routes/Login/Login.jsx:209`
  - `src/routes/SignUp/SignUp.jsx:194`
- High-volume hardcoded palettes in key flows.
  - `src/routes/Meal/Meal.css:2`
  - `src/routes/Community/PostDetail.css:35`
  - `src/components/TextToSpeech/TextToSpeech.jsx:39`
  - `src/components/TextToSpeech/TextToSpeech.jsx:425`

## P1 (High)
- Appointment page still mixes token and raw values for core card states.
  - `src/routes/UI-Only-Pages/Appointment/appointment.css:331`
  - `src/routes/UI-Only-Pages/Appointment/appointment.css:946`
- Community page has non-tokenized accent/shadow/border variants across interactive controls.
  - `src/routes/Community/Community.css:26`
  - `src/routes/Community/Community.css:84`
- Menu layout defines page-local root variable instead of shared size token.
  - `src/routes/NewMenu/Menustyles.css:44`
- Shared components still include hardcoded visual constants.
  - `src/components/WaterTracker.css:25`
  - `src/styles/mainNavbar.css:64`

## P2 (Minor)
- Focus ring and glow colors vary by page instead of state tokens.
  - `src/routes/Settings/Settings.css:237`
  - `src/routes/Settings/Settings.css:582`
- Residual typography/spacing hardcoded values remain in otherwise tokenized pages.
  - `src/routes/HealthNews/NewsDetail.css:151`
  - `src/routes/UI-Only-Pages/ShoppingList/ShoppingList.css:418`

## Proposed Fix Sequence
1. Remove page-local `:root` islands and map all to root tokens.
2. Refactor inline style-heavy pages to tokenized CSS classes.
3. Tokenize high-debt pages (Meal, Community, Appointment).
4. Run re-audit and close residual P2 polish items.

## Deliverables Produced
- `docs/fe06/token-spec.md`
- `docs/fe06/style-compliance-checklist.md`
- `docs/fe06/style-audit-report.md`
- `docs/fe06/non-compliance-issues.md`
- `docs/fe06/fix-plan.md`
- `docs/fe06/follow-up-subtasks.md`
