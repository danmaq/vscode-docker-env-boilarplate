Set-StrictMode -Version Latest

Import-Module -Name .\scripts\lib.psm1

New-Profile-File
Update-ExecutionPolicy

# # Install some apps using Chocolatey.
Install-Chocolatey
Initialize-Chocolatey
choco install -y scripts/.init/package.config
Install-Extensions

# 開発用のルート CA 証明書をインストールします。
Start-FireFox
mkcert -install
New-Certification

# TODO: SSH-agent 初期化、GPG 初期化
