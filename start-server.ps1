# PowerShell script to serve the website locally
Write-Host "Ahmet Basmaci Portfolio Website Server" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

# Check if we're in the correct directory
if (!(Test-Path "index.html")) {
    Write-Host "Error: index.html not found. Please run this script from the website directory." -ForegroundColor Red
    pause
    exit
}

Write-Host "Starting local web server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "The website will be available at:" -ForegroundColor Cyan
Write-Host "http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Simple PowerShell HTTP server
$Hso = New-Object Net.HttpListener
$Hso.Prefixes.Add("http://localhost:8080/")
$Hso.Start()

Write-Host "Server started successfully!" -ForegroundColor Green
Write-Host "Opening browser..." -ForegroundColor Yellow

# Open browser
Start-Process "http://localhost:8080"

# Server loop
while ($Hso.IsListening) {
    $HC = $Hso.GetContext()
    $HR = $HC.Response
    $HReq = $HC.Request
    
    # Get the requested file path
    $path = $HReq.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }
    
    $filePath = Join-Path $PWD $path.TrimStart('/')
    
    if (Test-Path $filePath -PathType Leaf) {
        # Determine content type
        $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = switch ($extension) {
            ".html" { "text/html" }
            ".css" { "text/css" }
            ".js" { "application/javascript" }
            ".json" { "application/json" }
            ".png" { "image/png" }
            ".jpg" { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".gif" { "image/gif" }
            ".svg" { "image/svg+xml" }
            ".ico" { "image/x-icon" }
            ".pdf" { "application/pdf" }
            default { "text/plain" }
        }
        
        $HR.ContentType = $contentType
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $HR.ContentLength64 = $content.Length
        $HR.OutputStream.Write($content, 0, $content.Length)
    } else {
        # 404 Not Found
        $HR.StatusCode = 404
        $content = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found")
        $HR.ContentLength64 = $content.Length
        $HR.OutputStream.Write($content, 0, $content.Length)
    }
    
    $HR.Close()
}

$Hso.Stop()
