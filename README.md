# vscode-docker-env-boilerplate

Docker を使用した、環境非依存な Next.js Web アプリ開発における、
環境構築のためのボイラープレートです。

Visual Studio Code の公式拡張機能の一つ、
[VSCode Remote - Containers](https://code.visualstudio.com/docs/remote/containers)
をベースにこの仕組みを実現化しています。
コンテナは [Debian 10](https://www.debian.org) をベースに、NodeJS と最新の
Git をインストール済みの状態で環境を構築しています。

## システム要件

- RAM: 8GB 以上 (16GB 以上推奨)
- ストレージ: SSD 推奨
- CPU: intel VT (VT-x) もしくは AMD Virtualization (AMD-V) が有効になっていること
  - ここ 10 年の CPU は全対応しているが、稀に BIOS 側で無効化設定されているものもある
- OS: 以下の 64bit OS
  - macOS 11 Big Sur 以降
  - Windows 10 2004 May 2020 Update 以降 _(一部未対応: 今後対応予定)_
  - Ubuntu 20 Focal Fossa 以降 _(今後対応予定)_
    - デスクトップ環境が必須です。

## 初回セットアップ

### Git の準備

このプロジェクトを clone したら、前準備として下記を実行して、ユーザー名と電子メールアドレスが設定されていることを確認してください。

```sh
git config user.name
git config user.email
```

設定していない場合、空文字を返します。
必要に応じて、ユーザー名と電子メールアドレスを設定してください。

```sh
git config user.name --local <ユーザー名>
git config user.email --local <電子メールアドレス>
```

### セットアップ スクリプトの実行

次に下記スクリプトを実行してください。

```sh
scripts/init
```

これにより、下記のアクションを自動的に行います。
繰り返し実行しても問題ありません。(冪等性を意識した実装です)

<details><summary>セットアップ スクリプトで実行する内容</summary>

#### 1. PC への各種アプリのインストール

- Git
- GnuPG
- Google Chrome
- Graphviz
- mkcert
- Mozilla Firefox
- Vim
- Visual Studio Code
- `(LM)` Bash
- `(LM)` jq
- `(LM)` Mozilla Network Security Services
- `(LM)` PINEntry
- `(LM)` proctools
- `(M)` Command line tools for Xcode
- `(M)` Homebrew
- `(MW)` Docker Desktop
- `(W)` Chocolatey
- `(W)` PoshGit

注釈付きのものは、当該 OS のみが対象です。

| key | description  |
| :-: | :----------- |
| `L` | Linux のみ   |
| `M` | macOS のみ   |
| `W` | Windows のみ |

#### 2. Visual Studio Code への拡張機能のインストール

- auchenberg.vscode-browser-preview
- chrislajoie.vscode-modelines
- davidanson.vscode-markdownlint
- dbaeumer.vscode-eslint
- eamodio.gitlens
- editorconfig.editorconfig
- eg2.vscode-npm-script
- esbenp.prettier-vscode
- firefox-devtools.vscode-firefox-debug
- jebbs.plantuml
- mikestead.dotenv
- ms-azuretools.vscode-docker
- ms-ceintl.vscode-language-pack-ja
- ms-vscode-remote.remote-containers
- ms-vscode-remote.vscode-remote-extensionpack
- msjsdiag.debugger-for-chrome
- orta.vscode-jest
- visualstudioexptteam.vscodeintellicode

#### 3. 開発用 TLS 証明書のインストール

mkcert と Mozilla Network Security Services を使用して、
`localhost` 専用の TLS 証明書を `.cert` フォルダ配下に生成します。

これにより、Web ブラウザーにおける、セキュリティー上の警告を回避することができます。

また、Firefox の TLS ストアを初期化するため、Firefox を起動することがあります。
これはスクリプト終了後、閉じてしまって閉じてしまってかまいません。

#### 4. SSH 秘密鍵の連携 (現状 macOS のみ)

Git リポジトリに SSH 経由で pull/push できるようにするため、SSH の鍵ペアをコンテナ内でも連携できるようにする必要があります。
ここでは ssh-agent に既存の SSH 秘密鍵を登録することで、これを実現しています。

#### 5. GPG 署名の鍵生成 (現状 macOS のみ)

この工程は必須ではありませんが、GPG 署名を連携することにより、
コミットの改竄防止に役立ちます。

Git に名前と電子メールアドレスを登録していて、かつ使用する電子メールに紐づく
GPG 署名が見つからない場合は、署名を自動的に生成します。

表示される GPG 公開鍵を、GitHub や GitLab に設定するだけで完了です。

_参考: [GitHub / GitLab 用にコミット署名を行うための準備メモ - Qiita](https://qiita.com/cocoabreak/items/d96cd0ba56cdcbf62d32#github%E3%81%AB%E5%85%AC%E9%96%8B%E9%8D%B5%E3%82%92%E7%99%BB%E9%8C%B2%E3%81%99%E3%82%8B-1)_

</details>

## 開発する

コマンド パレットより `Remote-Containers: Reopen in Container` を選択し、
コンテナ上で VSCode を開きます。初回に限り、コンテナのダウンロードのため
460MB ほどの通信が必要です。

コンテナの準備が整ったら、コンテナのターミナルで、下記コマンドを実行します。

```sh
npm ci
npm run dev
```

## ビルドする

```sh
npm run build
npm start
```

## Linting

```sh
npm run lint
```

## LICENSE

MIT
