# FE06 Fix Plan (Post-Audit)

Date: 2026-04-24

## Objective
Complete migration from mixed styling to a single root style system with token-first compliance.

## Workstreams

### Workstream A: Remove Local Token Islands (P0)
- Replace page-local `:root` token blocks with global tokens.
- Targets:
  - `src/routes/FoodPreferences/FoodPreferences.css`
  - `src/routes/HealthTools/HealthTools.css`
  - `src/routes/chat/ChatPage.css`

### Workstream B: Remove Inline Style Theming (P0)
- Move inline color/spacing/typography into CSS classes using tokens.
- Targets:
  - `src/routes/UI-Only-Pages/UserProfilePage/userprofile.jsx`
  - `src/routes/Login/Login.jsx`
  - `src/routes/SignUp/SignUp.jsx`

### Workstream C: High-Debt Page Migration (P1)
- Tokenize high-hardcode pages with large visual surfaces.
- Targets:
  - `src/routes/Meal/Meal.css`
  - `src/routes/Community/Community.css`
  - `src/routes/Community/PostDetail.css`
  - `src/routes/UI-Only-Pages/Appointment/appointment.css`

### Workstream D: State/Polish Normalization (P2)
- Normalize shadow/radius/focus intensities and minor spacing variants.
- Targets:
  - `src/routes/Settings/Settings.css`
  - `src/routes/UI-Only-Pages/ShoppingList/ShoppingList.css`
  - `src/routes/HealthNews/NewsDetail.css`

## Execution Order
1. P0 local token islands and inline theming
2. P1 high-hardcode pages
3. P2 polish and consistency pass
4. Re-audit and close FE06

## Exit Criteria
- No page-local `:root` except global token files.
- No critical hardcoded colors in major pages.
- All major pages pass checklist sections 1-6.
- UI Leader sign-off against Figma token values.
