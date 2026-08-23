# Debugging checklist

1. Confirm the terminal is in the folder that physically contains `package.json`:

```powershell
Test-Path .\package.json
```

This must return `True`.

2. Install dependencies:

```powershell
npm install
```

3. Type check:

```powershell
npm run typecheck
```

4. Production build:

```powershell
npm run build
```

5. Start dev server:

```powershell
npm run dev
```

If using OneDrive and npm reports ENOENT while VS Code visually shows package.json, move/extract the project to a normal local folder such as `C:\Projects\Nexora-CRM` and repeat the commands.
