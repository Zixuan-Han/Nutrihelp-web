# FE06 Style Compliance Checklist

Date: 2026-04-24

## 1) Token Usage
- All page/component colors use global tokens (`var(--...)`) from root layer.
- No page-local design token systems for shared UI semantics (`:root` inside page CSS should be avoided).
- Hardcoded color literals (`#`, `rgb`, `rgba`, `hsl`) are only allowed for non-theme data visualization or temporary migration exceptions.

## 2) Typography
- Uses global font family tokens.
- Uses global font scale tokens.
- Uses line-height tokens for readability consistency.

## 3) Spacing, Radius, Shadow
- Uses spacing tokens for padding/margin/gap.
- Uses radius tokens for rounded corners.
- Uses shadow tokens for elevations.

## 4) Base Elements
- `body` follows root typography and color tokens.
- Headings use global heading rules.
- Links use global link tokens and hover behavior.
- Buttons use base button tokens and disabled handling.
- Inputs use base input tokens and focus ring.
- Cards use standard surface/border/shadow tokens.

## 5) State Consistency
- Hover state uses tokenized values.
- Focus state is visible and accessible.
- Disabled state is visually distinct and consistent.
- Error/success states use semantic state tokens.

## 6) Theming
- Light and dark mode both resolve through root tokens.
- No hardcoded colors that break dark mode readability.

## 7) Audit Deliverables
- Compliance report includes file/component references.
- Each mismatch has severity (`P0`, `P1`, `P2`).
- Follow-up subtasks exist for visual fixes not included in FE06 foundation scope.

## Severity Definition
- `P0`: Blocks design-system compliance, risks major visual inconsistency or theme break.
- `P1`: High inconsistency, visible UX debt, should be fixed in next sprint.
- `P2`: Minor polish differences, safe to batch later.
