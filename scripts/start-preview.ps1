$ErrorActionPreference = 'Stop'
$projectDirectory = Split-Path -Parent $PSScriptRoot
$previewUrl = 'http://127.0.0.1:4173/'
$response = $null
try { $response = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 2 } catch { }
if ($response -and $response.Content -match 'TRST Maintenance') {
  Write-Output "TRST preview is already running: $previewUrl"
  exit 0
}
if ($response) { throw 'Port 4173 is already serving another application. No process has been changed.' }
$nodeExecutable = (Get-Command node -ErrorAction Stop).Source
$serverPath = Join-Path $projectDirectory 'server.mjs'
$process = Start-Process -FilePath $nodeExecutable -ArgumentList ('"' + $serverPath + '"') -WorkingDirectory $projectDirectory -WindowStyle Hidden -RedirectStandardOutput (Join-Path $projectDirectory 'preview.log') -RedirectStandardError (Join-Path $projectDirectory 'preview-error.log') -PassThru
for ($attempt=0; $attempt -lt 15; $attempt++) {
  if ($process.HasExited) { throw 'The preview stopped during startup. See preview-error.log.' }
  try {
    $ready = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 1
    if ($ready.StatusCode -eq 200 -and $ready.Content -match 'TRST Maintenance') {
      Write-Output "TRST preview is running in the background: $previewUrl (process $($process.Id))"
      exit 0
    }
  } catch { }
  Start-Sleep -Milliseconds 200
}
throw 'Preview did not become ready. See preview-error.log.'
