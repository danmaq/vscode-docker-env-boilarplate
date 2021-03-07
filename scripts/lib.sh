#!/bin/bash
# vim: set ft=sh:

set -eu

# region identifiers
# gpg-agent の設定を更新します。
gpg_agent_initialize () {
  GPG_CONF="${HOME}/.gnupg/gpg.conf"
  GPG_AGENT_CONF="${HOME}/.gnupg/gpg-agent.conf"
  grep -q '^use-agent' "${GPG_CONF}" || echo 'use-agent' >> "${GPG_CONF}"
  grep -q '^pinentry-program' "${GPG_AGENT_CONF}" || \
    echo 'pinentry-program /usr/local/bin/pinentry-mac' >> "${GPG_AGENT_CONF}"
  grep -q '^default-cache-ttl' "${GPG_AGENT_CONF}" || \
    echo 'default-cache-ttl 86400' >> "${GPG_AGENT_CONF}"
  grep -q '^max-cache-ttl' "${GPG_AGENT_CONF}" || \
    echo 'max-cache-ttl 86400' >> "${GPG_AGENT_CONF}"
}

# Git のメールアドレスに紐づく、GPG 秘密鍵が存在しない場合、作成します。
gpg_initialize () {
  git rev-parse --git-dir > /dev/null 2>&1 || return 0
  EMAIL="$(git config user.email)"
  [ -z "${EMAIL}" ] && return 0
  show_gpg_pubkey () {
    printf \\n\\n
    echo "$(gpg --armor --export "${EMAIL}")"
    echo 以上の GPG 公開鍵を GitHub や GitLab 等に設定してください。
    echo 参考: https://qiita.com/cocoabreak/items/d96cd0ba56cdcbf62d32#github%E3%81%AB%E5%85%AC%E9%96%8B%E9%8D%B5%E3%82%92%E7%99%BB%E9%8C%B2%E3%81%99%E3%82%8B-1
  }
  if git config --local user.signingkey > /dev/null; then
    show_gpg_pubkey
    return 0
  fi
  if ! gpg -K "${EMAIL}" 1> /dev/null 2>&1; then
    echo GPG 鍵を作成します。パスワードを作成してください。
    gpg --quick-generate-key "$(git config user.name) <${EMAIL}>" future-default - 2y
  fi
  KEY=$(gpg -k "${EMAIL}" | grep -oE '[0-9A-F]{40}')
  git config --local user.signingkey "${KEY}"
  show_gpg_pubkey
}

# 必要に応じて ssh-agent を起動、秘密鍵を登録します。
ssh_agent_start () {
  pgrep ssh-agent > /dev/null || eval "$(ssh-agent -s)"
  ls "${HOME}/.ssh/id_"* 1> /dev/null 2>&1 && ssh-add
}
# endregion

# region TLS certification
# Firefox で TLS 対応ページを開くことにより、TLS ストアを初期化します。
firefox () {
  pgrep firefox > /dev/null || /Applications/Firefox.app/Contents/MacOS/firefox -new-window https://www.mozilla.org/ 1> /dev/null 2>&1 &
}

# 開発用のルート CA 証明書をインストールします。
mkcert_initialize () {
  mkcert -install
}

# localhost 用の TLS 証明書を作成します。
mkcert_create_certification () {
  CERT=.cert
  mkdir -p ${CERT}
  mkcert -cert-file ${CERT}/localhost.pem -key-file ${CERT}/localhost.key.pem localhost
}
# endregion

# region VSCode Exensions
# 依存している Visual Studio Code の拡張機能一覧を出力します。
vscode_exensions () {
  jq -r '.extensions[] | ascii_downcase' .devcontainer/devcontainer.json | sort
}

# 依存している Visual Studio Code の拡張機能一覧のうち、不足している一覧を出力します。
vscode_exensions_diff () {
  INSTALLED=$(code --list-extensions | tr '[:upper:]' '[:lower:]' | sort)
  diff -u <(echo "${INSTALLED}") <(vscode_exensions) \
    | sed -e '/^[^+]/d' -e '/^+++/d' -e 's/^+/ --install-extension /' \
    | tr -d '\n'
}

# 依存している Visual Studio Code の拡張機能一覧のうち、不足しているものをインストールします。
vscode_exensions_install () {
  REQUIRED=$(vscode_exensions_diff)
  [ -z "${REQUIRED}" ] || code ${REQUIRED}
}
# endregion

# region bundle
# macOS 用の初回セットアップ スクリプト。
init_macos () {
  vscode_exensions_install
  firefox
  mkcert_initialize
  mkcert_create_certification
  ssh_agent_start
  gpg_agent_initialize
  gpg_initialize
}

# コンテナを立ち上げる前に毎回呼び出す、セットアップ スクリプト。
pre_container_macos () {
  mkcert_create_certification
  ssh_agent_start
}
# endregion
