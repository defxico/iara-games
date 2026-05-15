# Copilot Windows Launcher

This package contains a Windows-native conversion of `start-copilot.sh`.

## Files

- `start-copilot.bat` — double-clickable / CMD-compatible launcher.
- `start-copilot.ps1` — PowerShell implementation with the actual session menu logic.

## How to run

Option 1 — double-click:

```bat
start-copilot.bat
```

Option 2 — from Command Prompt:

```bat
start-copilot.bat
```

Option 3 — from PowerShell:

```powershell
.\start-copilot.ps1
```

## Requirements

- `copilot` must be installed and available in `PATH`.
- Existing session state is read from:
  - `%COPILOT_SESSION_STATE_DIR%`, when defined
  - otherwise `%USERPROFILE%\.copilot\session-state`

## Behavior preserved from the original shell script

- Creates the session-state directory when missing.
- Reads `workspace.yaml` files inside session directories.
- Extracts `summary` and `updated_at`.
- Uses `Untitled session` fallback naming.
- Sorts sessions by `updated_at` descending.
- Shows an interactive Up/Down/Enter menu.
- Starts a new session with:

```bat
copilot --model auto --allow-all
```

- Resumes a selected session with:

```bat
copilot --model auto --resume=<session_id> --allow-all
```
