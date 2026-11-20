<#
.SYNOPSIS
    Creates a new article in _posts with the correct file name and front matter.

.EXAMPLE
    .\scripts\new-post.ps1
    .\scripts\new-post.ps1 -Title "A Short Note on Trains"
#>

[CmdletBinding()]
param(
    [string]$Title
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$postsDirectory = Join-Path $root '_posts'

if (-not (Test-Path $postsDirectory)) {
    throw "Could not find _posts. Put this script inside the blog folder's scripts directory."
}

if ([string]::IsNullOrWhiteSpace($Title)) {
    $Title = Read-Host 'Article title'
}

$Title = $Title.Trim()
if ([string]::IsNullOrWhiteSpace($Title)) {
    throw 'A title is required.'
}

$slug = ($Title.ToLowerInvariant() -replace '[^a-z0-9\s-]', '' -replace '\s+', '-').Trim('-')

if ([string]::IsNullOrWhiteSpace($slug)) {
    throw 'Could not build a file name from that title. Try adding a few letters or numbers.'
}

# Timestamps are written in UTC so a post is never mistaken for "future".
$now = (Get-Date).ToUniversalTime()
$fileName = '{0}-{1}.md' -f $now.ToString('yyyy-MM-dd'), $slug
$path = Join-Path $postsDirectory $fileName

if (Test-Path $path) {
    throw "That article already exists: _posts\$fileName"
}

# Quotes would break the YAML header, so normalise them.
$yamlTitle = $Title -replace '"', "'"

$template = @"
---
layout: post
title: "$yamlTitle"
date: $($now.ToString('yyyy-MM-dd HH:mm:ss')) +0000
categories: notes
tags: []
description: ""
---

Write your opening paragraph here. Keep it short.

<!--more-->

## A section heading

Your article continues here. Use ## for sections, **bold** for emphasis, and

> quotes like this

for the occasional pull quote.
"@

# UTF-8 without a BOM, so Jekyll always recognises the front matter.
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $template, $utf8NoBom)

Write-Host ''
Write-Host "Created  _posts\$fileName" -ForegroundColor Green
Write-Host 'Opening Notepad. Save your work, then run: .\scripts\publish.ps1'
Write-Host ''

Start-Process notepad.exe -ArgumentList "`"$path`""
