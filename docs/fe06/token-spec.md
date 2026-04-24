# FE06 Token Spec (Root Style System)

Date: 2026-04-24
Scope: Nutrihelp-web `master` in folder `new`

## Implemented Sources
- `src/styles/root-style-system.css`
- Imported globally in `src/App.js`

## Token Groups

### Typography
- `--font-family-sans`, `--font-family-heading`, `--font-family-mono`
- `--font-size-100` to `--font-size-800`
- `--line-height-tight`, `--line-height-heading`, `--line-height-body`, `--line-height-loose`
- `--font-weight-regular`, `--font-weight-medium`, `--font-weight-semibold`, `--font-weight-bold`

### Spacing
- `--space-0`, `--space-1`, `--space-2`, `--space-3`, `--space-4`, `--space-5`, `--space-6`, `--space-8`, `--space-10`, `--space-12`

### Radius
- `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-pill`

### Shadow
- `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`

### Color + Semantic
- Palette: `--color-primary-*`, `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*`, `--color-neutral-*`
- Semantic: `--color-bg-*`, `--color-text-*`, `--color-border-*`, `--color-link-*`

### State Tokens
- Hover/focus: `--state-hover-overlay`, `--state-focus-ring-color`, `--state-focus-ring-width`
- Disabled: `--state-disabled-bg`, `--state-disabled-border`, `--state-disabled-text`, `--state-disabled-opacity`
- Error: `--state-error-bg`, `--state-error-border`, `--state-error-text`
- Success: `--state-success-bg`, `--state-success-border`, `--state-success-text`

## Base Element Standardization
Applied globally in `root-style-system.css` for:
- `body`
- `h1..h6`
- `p`
- `a`
- `button`, `.btn`
- `input`, `textarea`, `select`
- `.card`, `.panel`, `[data-card]`
- `:focus-visible`, `.is-error`, `.is-success`, `.state-error`, `.state-success`

## Legacy Compatibility Layer
To avoid regressions while migrating pages, legacy variables are mapped to new tokens, including:
- `--primary-color`, `--primary-hover`, `--background-color`, `--text-primary`, `--border-color`
- `--input-*`, `--button-*`, `--nav-*`, `--card-shadow*`
- Existing project-specific variables retained where used by current pages

## Dark Mode
- `.dark-mode` overrides defined in the same token file
- Existing `DarkModeContext` behavior remains unchanged

## Notes
- This FE06 token spec is now executable in code.
- Final numeric values still require UI Leader sign-off against Figma to close the “UI finalize token spec” sub-item formally.
