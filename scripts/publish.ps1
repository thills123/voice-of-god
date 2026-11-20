<#
.SYNOPSIS
    Commits everything in the blog folder and pushes it to GitHub.

.DESCRIPTION
    GitHub Actions rebuilds the site on every push to main, so after this
    finishes the article is live in about a minute.

.EXAMPLE
    .\scripts\publish.ps1
    .\scripts\publish.ps1 -Message "Add essay on slowness"
#>

[CmdletBinding()]
param(
    [string]$Message
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
Push-Location $root

try {
    if (-not (Test-Path '.git')) {
        throw 'This folder is not a Git repository yet. See the README section "One-time GitHub setup".'
    }

    $remotes = @(git remote)
    if ($remotes.Count -eq 0) {
        throw 'No GitHub remote is configured. See the README section "One-time GitHub setup".'
    }

    git add -A
    if ($LASTEXITCODE -ne 0) { throw 'git add failed.' }

    $changes = @(git status --porcelain)
    if ($changes.Count -eq 0) {
        Write-Host 'Nothing to publish - no changes since the last commit.' -ForegroundColor Yellow
        return
    }

    if ([string]::IsNullOrWhiteSpace($Message)) {
        $Message = 'Publish: {0}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm')
    }

    Write-Host ''
    Write-Host 'Files going up:' -ForegroundColor Cyan
    $changes | ForEach-Object { Write-Host "  $_" }

    git commit -m $Message
    if ($LASTEXITCODE -ne 0) { throw 'git commit failed.' }

    git push
    if ($LASTEXITCODE -ne 0) { throw 'git push failed. Check your GitHub sign-in.' }

    Write-Host ''
    Write-Host 'Pushed. GitHub Actions will build and deploy in about a minute.' -ForegroundColor Green
    Write-Host 'Watch progress: https://github.com/thills123/voice-of-god/actions'
    Write-Host ''
}
finally {
    Pop-Location
}
