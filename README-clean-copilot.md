# clean-copilot for Windows

Windows conversion of `clean-copilot.sh`.

## Files

- `clean-copilot.bat` — Windows CMD entrypoint.
- `clean-copilot.ps1` — PowerShell implementation with the full cleanup logic.

Keep both files in the same folder.

## Usage

```bat
clean-copilot.bat
```

Delete Copilot sessions older than 7 days by default.

```bat
clean-copilot.bat --days 14
```

Delete sessions older than 14 days.

```bat
clean-copilot.bat --days 14 --yes
```

Delete sessions older than 14 days without interactive confirmation.

```bat
clean-copilot.bat --help
```

Show usage.

## Session directory

The script uses this directory resolution order:

1. `COPILOT_SESSION_STATE_DIR`, when defined.
2. `%USERPROFILE%\.copilot\session-state`, via PowerShell `$HOME` fallback.

## Behavior preserved from the original shell script

- Reads each session folder under the Copilot session-state directory.
- Requires `workspace.yaml` inside each session folder.
- Reads `updated_at` and `summary` from `workspace.yaml`.
- Skips sessions without `updated_at` or with an unparsable timestamp.
- Deletes only sessions with `updated_at` older than the configured day threshold.
- Prompts before deletion unless `--yes` or `-y` is passed.
