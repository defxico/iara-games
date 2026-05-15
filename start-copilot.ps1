# Windows Copilot Session Launcher
# Equivalent behavior to start-copilot.sh:
# - Uses COPILOT_SESSION_STATE_DIR when defined
# - Falls back to %USERPROFILE%\.copilot\session-state
# - Lists existing Copilot sessions sorted by updated_at descending
# - Allows keyboard selection with Up/Down arrows + Enter
# - Starts a new session or resumes the selected session using model:auto and --allow-all

$ErrorActionPreference = "Stop"

$RootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not [string]::IsNullOrWhiteSpace($env:COPILOT_SESSION_STATE_DIR)) {
    $SessionStateDir = $env:COPILOT_SESSION_STATE_DIR
}
else {
    $UserHome = if (-not [string]::IsNullOrWhiteSpace($env:USERPROFILE)) {
        $env:USERPROFILE
    }
    else {
        [Environment]::GetFolderPath("UserProfile")
    }

    $SessionStateDir = Join-Path $UserHome ".copilot\session-state"
}

if (-not (Get-Command "copilot" -ErrorAction SilentlyContinue)) {
    Write-Error "Error: 'copilot' command not found in PATH."
    exit 1
}

if (-not (Test-Path -LiteralPath $SessionStateDir -PathType Container)) {
    New-Item -ItemType Directory -Force -Path $SessionStateDir | Out-Null
}

function Get-WorkspaceYamlValue {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Path,

        [Parameter(Mandatory = $true)]
        [string] $Key
    )

    $pattern = "^\s*" + [regex]::Escape($Key) + "\s*:\s*(.*)\s*$"

    foreach ($line in Get-Content -LiteralPath $Path -ErrorAction Stop) {
        if ($line -match $pattern) {
            $value = $Matches[1].Trim()

            # Normalize common YAML scalar quoting while preserving plain values.
            if (($value.StartsWith('"') -and $value.EndsWith('"')) -or
                ($value.StartsWith("'") -and $value.EndsWith("'"))) {
                $value = $value.Substring(1, $value.Length - 2)
            }

            return $value
        }
    }

    return $null
}

$SessionRows = @()

Get-ChildItem -LiteralPath $SessionStateDir -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $workspaceFile = Join-Path $_.FullName "workspace.yaml"

    if (-not (Test-Path -LiteralPath $workspaceFile -PathType Leaf)) {
        return
    }

    $sessionId = $_.Name
    $sessionName = Get-WorkspaceYamlValue -Path $workspaceFile -Key "summary"
    $updatedAt = Get-WorkspaceYamlValue -Path $workspaceFile -Key "updated_at"

    if ([string]::IsNullOrWhiteSpace($sessionName) -or $sessionName -eq "null") {
        if (-not [string]::IsNullOrWhiteSpace($updatedAt)) {
            $sessionName = "Untitled session ($updatedAt)"
        }
        else {
            $sessionName = "Untitled session"
        }
    }

    if ([string]::IsNullOrWhiteSpace($updatedAt)) {
        $updatedAt = "1970-01-01T00:00:00Z"
    }

    $SessionRows += [PSCustomObject]@{
        UpdatedAt = $updatedAt
        SessionId = $sessionId
        Name      = $sessionName
    }
}

$SortedRows = $SessionRows | Sort-Object -Property UpdatedAt -Descending

$MenuOptions = @("Start a new session")
$SessionIds = @()

foreach ($row in $SortedRows) {
    $MenuOptions += $row.Name
    $SessionIds += $row.SessionId
}

$selected = 0
$menuSize = $MenuOptions.Count

function Draw-Menu {
    Clear-Host
    Write-Host "Copilot Session Launcher"
    Write-Host "Use Up/Down arrows and press Enter:"
    Write-Host ""

    for ($i = 0; $i -lt $MenuOptions.Count; $i++) {
        if ($i -eq $selected) {
            Write-Host ("> " + $MenuOptions[$i])
        }
        else {
            Write-Host ("  " + $MenuOptions[$i])
        }
    }
}

try {
    [Console]::CursorVisible = $false
    Draw-Menu

    while ($true) {
        $key = [Console]::ReadKey($true)

        switch ($key.Key) {
            "Enter" {
                break
            }
            "UpArrow" {
                $selected--
                if ($selected -lt 0) {
                    $selected = $menuSize - 1
                }
                Draw-Menu
            }
            "DownArrow" {
                $selected++
                if ($selected -ge $menuSize) {
                    $selected = 0
                }
                Draw-Menu
            }
        }

        if ($key.Key -eq "Enter") {
            break
        }
    }
}
finally {
    [Console]::CursorVisible = $true
}

Set-Location -LiteralPath $RootDir

if ($selected -eq 0) {
    Write-Host "Starting a new Copilot session (model: auto)..."
    & copilot --model auto --allow-all
    exit $LASTEXITCODE
}

$sessionIndex = $selected - 1
$sessionId = $SessionIds[$sessionIndex]

Write-Host "Resuming selected session (model: auto)..."
& copilot --model auto "--resume=$sessionId" --allow-all
exit $LASTEXITCODE
