# Nexora CRM v2.4.1 Debug Status

Fixed in this package:
- Customer filter saved-view normalization (prevents missing-array runtime crashes).
- Removed the preference-save/invalidation feedback loop. Preferences now persist through explicit updates.
- Theme toggle persists immediately.
- Reduced-motion preference persists through the same preference mutation.
- Dashboard widgets, columns, custom statuses, custom tags, notification preferences and customer view mode persist in localStorage.
- Chart gradient IDs are unique per chart, preventing SVG ID collisions when multiple line charts render.
- Package version updated to 2.4.1.

Verification command on Windows:
`powershell -ExecutionPolicy Bypass -File .\VERIFY-PROJECT.ps1`

Note: dependency installation in the model environment timed out, so the final `npm run typecheck`/`npm run build` must be executed on the target Windows machine after `npm install`.
