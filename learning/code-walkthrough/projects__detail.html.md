# projects/detail.html — 全文と逐次解説

> **役割:** 案件詳細用の共通HTML。
> **入力:** URLクエリとDOM。
> **出力:** 詳細ページの受け皿。
> **設計意図:** 1枚のHTMLで複数プロジェクトを表示。

> **SHA-256:** `51547f504bd0824703eea930e154bffa20cee46ce2f9ed484f73ade21c4bf859`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A data-driven case study with overview, approach, and results.">
  <meta name="theme-color" content="#102c34">
  <title>Project details — Resume Website</title>
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
  <link rel="stylesheet" href="../assets/css/styles.css">
  <script type="module" src="../assets/js/detail.js"></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="template-strip"><strong>Portfolio template</strong> Sample content only — customize before publishing.</div>
<header class="site-header">
  <div class="container nav-inner">
    <a class="brand" href="../index.html" aria-label="Portfolio template home"><span class="brand-mark" aria-hidden="true">✳</span> yourfolio<span class="sr-only"></span></a>
    <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="primary-navigation">Menu ☰</button>
    <nav class="site-nav" id="primary-navigation" data-nav-menu aria-label="Main navigation">
      <a href="../index.html">Home</a>
      <a href="../projects/index.html" aria-current="page">Projects</a>
      <a href="../resume/index.html">Resume</a>
      <a class="nav-contact" href="../index.html#contact">Get in touch ↗</a>
    </nav>
  </div>
</header>
<main id="main"><div class="container">
  <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span aria-hidden="true">/</span><a href="index.html">Projects</a><span aria-hidden="true">/</span><span>Details</span></nav>
  <article id="project-detail" class="detail-wrapper" aria-live="polite"><p class="loading-hint">Loading project details…</p></article>
</div></main>
<footer class="site-footer">
  <div class="container footer-row">
    <p>© <span data-year>2026</span> yourfolio. A customizable project template.</p>
    <nav class="footer-links" aria-label="Footer navigation">
      <a href="../index.html">Home</a><a href="../projects/index.html">Projects</a><a href="../resume/index.html">Resume</a><a href="../guide.html">Setup guide</a>
    </nav>
  </div>
</footer>
</body>
</html>
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L9

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A data-driven case study with overview, approach, and results.">
  <meta name="theme-color" content="#102c34">
  <title>Project details — Resume Website</title>
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
```

- この行群は`detail.html`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L10–L18

```html
  <link rel="stylesheet" href="../assets/css/styles.css">
  <script type="module" src="../assets/js/detail.js"></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="template-strip"><strong>Portfolio template</strong> Sample content only — customize before publishing.</div>
<header class="site-header">
  <div class="container nav-inner">
    <a class="brand" href="../index.html" aria-label="Portfolio template home"><span class="brand-mark" aria-hidden="true">✳</span> yourfolio<span class="sr-only"></span></a>
```

- `type="module"`はES Modulesを有効化する。読み込み先のJSがimportにより必要なモジュールを解決する。

### L19–L27

```html
    <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="primary-navigation">Menu ☰</button>
    <nav class="site-nav" id="primary-navigation" data-nav-menu aria-label="Main navigation">
      <a href="../index.html">Home</a>
      <a href="../projects/index.html" aria-current="page">Projects</a>
      <a href="../resume/index.html">Resume</a>
      <a class="nav-contact" href="../index.html#contact">Get in touch ↗</a>
    </nav>
  </div>
</header>
```

- `nav`はページ移動の主要なリンク群を表し、aria-labelで用途を補う。

### L28–L36

```html
<main id="main"><div class="container">
  <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span aria-hidden="true">/</span><a href="index.html">Projects</a><span aria-hidden="true">/</span><span>Details</span></nav>
  <article id="project-detail" class="detail-wrapper" aria-live="polite"><p class="loading-hint">Loading project details…</p></article>
</div></main>
<footer class="site-footer">
  <div class="container footer-row">
    <p>© <span data-year>2026</span> yourfolio. A customizable project template.</p>
    <nav class="footer-links" aria-label="Footer navigation">
      <a href="../index.html">Home</a><a href="../projects/index.html">Projects</a><a href="../resume/index.html">Resume</a><a href="../guide.html">Setup guide</a>
```

- `main`は文書の主要コンテンツを示す意味的なHTMLタグ。スキップリンクの着地点でもある。
- `nav`はページ移動の主要なリンク群を表し、aria-labelで用途を補う。

### L37–L41

```html
    </nav>
  </div>
</footer>
</body>
</html>
```

- この行群は`detail.html`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

## 3. 主要な設計ポイントを深く理解する

### HTMLの役割

このHTMLはブラウザに画面の意味・構造を提供する。検索/データ差し込みは対応するJSへ分離した。

### 相対パス

トップ/サブディレクトリの位置に応じ、hrefとsrcを相対指定してGitHub Pagesのサブパスで壊れにくくする。

### アクセシビリティ

nav/main/label/aria属性は要素の意味や操作を伝える。装飾だけではなくキーボード・支援技術も考慮。

## 4. 入力から出力まで追跡する例

例: ブラウザがこのHTMLを受け取ると、見出しやDOMコンテナを構築する。後からJSが`getElementById`で指定した場所を見つけ、JSONに従い内容を更新する。

## 5. 自己確認ポイント

- このファイルは「案件詳細用の共通HTML」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

