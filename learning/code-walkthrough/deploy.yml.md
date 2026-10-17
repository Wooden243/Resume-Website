# .github/workflows/deploy.yml — 全文と逐次解説

> **役割:** GitHub Pagesの自動公開設定。
> **入力:** mainへのpush。
> **出力:** Pagesへファイル公開するジョブ。
> **設計意図:** Actions有効化は利用者側で必要。

> **SHA-256:** `c92dad6fe44679e743d353879e921f872683702c4f7dfa2464de66f4c950ede7`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```yaml
name: Deploy portfolio to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: github-pages
  cancel-in-progress: true
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Pages
        uses: actions/configure-pages@v5
      - name: Upload static site
        uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```yaml
name: Deploy portfolio to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
```

- この行群は`deploy.yml`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L11–L20

```yaml
  group: github-pages
  cancel-in-progress: true
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
```

- この行群は`deploy.yml`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L21–L29

```yaml
      - name: Set up Pages
        uses: actions/configure-pages@v5
      - name: Upload static site
        uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- この記述はGitHub Actionsの処理定義。リポジトリ作成だけでは自動的に稼働するわけではない。

## 3. 主要な設計ポイントを深く理解する

### `on: push`

mainへのpushまたは手動開始でワークフローを起動する。YAMLのイベント定義。

### `permissions`

Pagesデプロイに必要な権限だけを明示。過剰なGitHub token権限を避ける。

### `upload-pages-artifact`

静的ファイル一式をGitHub Pages用artifactとしてアップロードする。

### `deploy-pages`

artifactをPagesへデプロイする。Pages側でソースをGitHub Actionsに設定する必要がある。

## 4. 入力から出力まで追跡する例

例: `bash scripts/verify.sh`を実行すると、Node.jsの単体/静的構造テストとPython HTTPテストが順に走る。どれか一つでも失敗すれば非ゼロの終了コードで停止する。

## 5. 自己確認ポイント

- このファイルは「GitHub Pagesの自動公開設定」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

