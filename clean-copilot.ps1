<#
.SYNOPSIS
  Delete Copilot session folders older than N days by updated_at.

.DESCRIPTION
  Windows PowerShell equivalent of clean-copilot.sh.
  Preserves the original behavior:
  - Uses COPILOT_SESSION_STATE_DIR when provided.
  - Falls back to $HOME\.copilot\session-state.
  - Deletes session folders older than --days N based on workspace.yaml updated_at.
  - Supports --yes / -y and --help.
#>

$ErrorActionPreference = "Stop"

$SessionStateDir = if ($env:COPILOT_SESSION_STATE_DIR) {
    $env:COPILOT_SESSION_STATE_DIR
} else {
    Join-Path $HOME ".copilot\session-state"
}

[int]$Days = 7
[bool]$AutoYes = $false

function Show-Usage {
    Write-Host "Usage: .\clean-copilot.bat [--days N] [--yes]"
    Write-Host "   or: powershell -ExecutionPolicy Bypass -File .\clean-copilot.ps1 [--days N] [--yes]"
    Write-Host "Delete Copilot session folders older than N days by updated_at (default: 7)."
}

function Parse-Arguments {
    param(
        [string[]]$InputArgs
    )

    $script:Days = 7
    $script:AutoYes = $false

    for ($i = 0; $i -lt $InputArgs.Count; $i++) {
        switch ($InputArgs[$i]) {
            "--days" {
                if ($i + 1 -ge $InputArgs.Count) {
                    Write-Host "Error: --days must be a non-negative integer."
                    exit 1
                }

                $rawDays = $InputArgs[$i + 1]
                if ($rawDays -notmatch '^\d+$') {
                    Write-Host "Error: --days must be a non-negative integer."
                    exit 1
                }

                $script:Days = [int]$rawDays
                $i++
            }
            "--yes" {
                $script:AutoYes = $true
            }
            "-y" {
                $script:AutoYes = $true
            }
            "--help" {
                Show-Usage
                exit 0
            }
            "-h" {
                Show-Usage
                exit 0
            }
            default {
                Write-Host "Unknown argument: $($InputArgs[$i])"
                Write-Host "Use --help for usage."
                exit 1
            }
        }
    }
}

function Get-YamlScalarValue {
    param(
        [string[]]$Lines,
        [string]$Key,
        [bool]$PreserveRestOfLine = $false
    )

    foreach ($line in $Lines) {
        if ($line -match "^$([regex]::Escape($Key)):\s*(.*)$") {
            $value = $Matches[1]

            if (-not $PreserveRestOfLine) {
                return $value.Trim()
            }

            return $value.Trim()
        }
    }

    return ""
}

function Parse-IsoEpoch {
    param(
        [string]$Raw
    )

    if ([string]::IsNullOrWhiteSpace($Raw)) {
        return $null
    }

    $normalized = $Raw.Trim()
    $normalized = $normalized -replace 'Z$', ''
    $normalized = $normalized -replace '\..*$', ''

    $formats = @(
        'yyyy-MM-ddTHH:mm:ss',
        'yyyy-MM-dd HH:mm:ss',
        'yyyy-MM-ddTHH:mm:ssK',
        'yyyy-MM-ddTHH:mm:ss.fffffffK'
    )

    foreach ($format in $formats) {
        try {
            $dt = [datetime]::ParseExact(
                $normalized,
                $format,
                [Globalization.CultureInfo]::InvariantCulture,
                [Globalization.DateTimeStyles]::AssumeUniversal -bor [Globalization.DateTimeStyles]::AdjustToUniversal
            )

            return [datetimeoffset]$dt
        } catch {
            # Try the next format.
        }
    }

    try {
        $dtOffset = [datetimeoffset]::Parse(
            $Raw.Trim(),
            [Globalization.CultureInfo]::InvariantCulture,
            [Globalization.DateTimeStyles]::AssumeUniversal -bor [Globalization.DateTimeStyles]::AdjustToUniversal
        )

        return $dtOffset
    } catch {
        return $null
    }
}

Parse-Arguments -InputArgs $args

if (-not (Test-Path -LiteralPath $SessionStateDir -PathType Container)) {
    Write-Host "Error: session directory not found: $SessionStateDir"
    exit 1
}

$cutoff = [datetimeoffset]::UtcNow.AddDays(-$Days)
$deleteItems = New-Object System.Collections.Generic.List[object]

Get-ChildItem -LiteralPath $SessionStateDir -Directory -Force | ForEach-Object {
    $dir = $_.FullName
    $workspaceFile = Join-Path $dir "workspace.yaml"

    if (-not (Test-Path -LiteralPath $workspaceFile -PathType Leaf)) {
        return
    }

    $lines = Get-Content -LiteralPath $workspaceFile -ErrorAction Stop
    $updatedAt = Get-YamlScalarValue -Lines $lines -Key "updated_at"
    $summary = Get-YamlScalarValue -Lines $lines -Key "summary" -PreserveRestOfLine $true

    if ([string]::IsNullOrWhiteSpace($summary)) {
        $summary = "Untitled session"
    }

    if ([string]::IsNullOrWhiteSpace($updatedAt)) {
        return
    }

    $updatedEpoch = Parse-IsoEpoch -Raw $updatedAt
    if ($null -eq $updatedEpoch) {
        return
    }

    if ($updatedEpoch -le $cutoff) {
        $deleteItems.Add([pscustomobject]@{
            Path  = $dir
            Label = "$summary | updated_at=$updatedAt"
        }) | Out-Null
    }
}

if ($deleteItems.Count -eq 0) {
    Write-Host "No sessions older than $Days days were found."
    exit 0
}

Write-Host "Sessions older than $Days days ($($deleteItems.Count) found):"
for ($i = 0; $i -lt $deleteItems.Count; $i++) {
    "{0,3}. {1}" -f ($i + 1), $deleteItems[$i].Label | Write-Host
}
Write-Host ""

if (-not $AutoYes) {
    $confirm = Read-Host "Delete these sessions now? [y/N]"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "Canceled. No sessions were deleted."
        exit 0
    }
}

foreach ($item in $deleteItems) {
    Remove-Item -LiteralPath $item.Path -Recurse -Force
}

Write-Host "Deleted $($deleteItems.Count) session(s)."
