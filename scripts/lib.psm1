Set-StrictMode -Version Latest

# region Chocolatey
# Chocolatey をインストールします。
Function Install-Chocolatey {
  if (Get-Command choco -ea SilentlyContinue) {
    choco upgrade -y chocolatey
  }
  else {
    [System.Net.ServicePointManager]::SecurityProtocol = `
      [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    $WEB_CLIENT = New-Object System.Net.WebClient
    $PS1 = $WEB_CLIENT.DownloadString('https://chocolatey.org/install.ps1')
    Invoke-Expression $PS1
  }
}

# Chocolatey を実行可能にします。
Function Initialize-Chocolatey {
  . $profile
  $env:Path += ";$($env:SystemDrive)\ProgramData\Chocolatey\bin"
  RefreshEnv
  choco feature enable -n=useRememberedArgumentsForUpgrades
}
# endregion

# プロファイルが存在しない場合、生成します。
Function New-Profile-File {
  New-Item -ErrorAction SilentlyContinue -Path (Split-Path -Parent $profile) -ItemType directory
  New-Item -ErrorAction SilentlyContinue -Path $profile -ItemType file
}

# 実行ポリシーを RemoteSigned に設定します。
Function Update-ExecutionPolicy {
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
}

# 依存している Visual Studio Code の拡張機能をインストールします。
Function Install-Extensions {
  $env:Path += ";$($env:ProgramFiles)\Microsoft VS Code\bin"
  $INSTALLED = $(code --list-extensions)
  $JSON = Get-Content .\.devcontainer\devcontainer.json | ConvertFrom-Json
  $JSON.extensions `
    | Where-Object { $INSTALLED -notcontains $_ } `
    | ForEach-Object { code --install-extension $_ }
}

# Firefox で TLS 対応ページを開くことにより、TLS ストアを初期化します。
Function Start-FireFox {
  if (-not (Get-Process firefox -ErrorAction SilentlyContinue)) {
    $env:Path += ";$($env:ProgramFiles)\Mozilla Firefox"
    firefox -new-window https://www.mozilla.org/
  }
}

# localhost 用の TLS 証明書を作成します。
Function New-Certification {
  $CERT=".cert"
  New-Item -ErrorAction SilentlyContinue -Path ${CERT} -ItemType directory
  mkcert -cert-file ${CERT}/localhost.pem -key-file ${CERT}/localhost.key.pem localhost
}

Export-ModuleMember -Function *
