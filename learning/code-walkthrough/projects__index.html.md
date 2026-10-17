# projects/index.html — 全文と逐次解説

> **役割:** 検索・一覧ページのHTML。
> **入力:** ブラウザによるHTML解析。
> **出力:** 検索欄・フィルター・一覧コンテナ。
> **設計意図:** イベントの実装はprojects.jsが担当。

> **SHA-256:** `08d8edc62d26e7ffc0b44aabe138a7afb9378cd38874eb96a16ddfd177566cea`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Explore sample portfolio projects with dynamic filtering and search.">
  <meta name="theme-color" content="#102c34">
  <title>Projects — Resume Website</title>
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
  <link rel="stylesheet" href="../assets/css/styles.css">
  <script type="module" src="../assets/js/projects.js"></script>
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
<main id="main">
  <div class="container"><header class="page-intro"><div class="eyebrow">The collection</div><h1>Projects<span style="color:#dc684b">.</span></h1>
    <p>Browse the complete collection of sample case studies. Filter by category, or search for a particular technology or idea.</p>
  </header>
  <section class="project-listing" aria-label="Projects">
    <div class="controls"><div class="filter-list" id="category-filters" aria-label="Filter by category"></div>
      <label class="search-box"><span aria-hidden="true">⌕</span><span class="sr-only">Search projects</span><input type="search" id="project-search" autocomplete="off" placeholder="Search projects…"></label>
    </div>
    <div class="results-line" id="project-count" role="status">Loading projects…</div>
    <div class="project-grid" id="projects-grid"><p class="loading-hint">Loading the project collection…</p></div>
  </section></div>
</main>
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
  <meta name="description" content="Explore sample portfolio projects with dynamic filtering and search.">
  <meta name="theme-color" content="#102c34">
  <title>Projects — Resume Website</title>
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
```

- この行群は`index.html`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L10–L18

```html
  <link rel="stylesheet" href="../assets/css/styles.css">
  <script type="module" src="../assets/js/projects.js"></script>
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
<main id="main">
  <div class="container"><header class="page-intro"><div class="eyebrow">The collection</div><h1>Projects<span style="color:#dc684b">.</span></h1>
    <p>Browse the complete collection of sample case studies. Filter by category, or search for a particular technology or idea.</p>
  </header>
  <section class="project-listing" aria-label="Projects">
    <div class="controls"><div class="filter-list" id="category-filters" aria-label="Filter by category"></div>
      <label class="search-box"><span aria-hidden="true">⌕</span><span class="sr-only">Search projects</span><input type="search" id="project-search" autocomplete="off" placeholder="Search projects…"></label>
    </div>
    <div class="results-line" id="project-count" role="status">Loading projects…</div>
```

- `main`は文書の主要コンテンツを示す意味的なHTMLタグ。スキップリンクの着地点でもある。

### L37–L45

```html
    <div class="project-grid" id="projects-grid"><p class="loading-hint">Loading the project collection…</p></div>
  </section></div>
</main>
<footer class="site-footer">
  <div class="container footer-row">
    <p>© <span data-year>2026</span> yourfolio. A customizable project template.</p>
    <nav class="footer-links" aria-label="Footer navigation">
      <a href="../index.html">Home</a><a href="../projects/index.html">Projects</a><a href="../resume/index.html">Resume</a><a href="../guide.html">Setup guide</a>
    </nav>
```

- `nav`はページ移動の主要なリンク群を表し、aria-labelで用途を補う。

### L46–L49

```html
  </div>
</footer>
</body>
</html>
```

- この行群は`index.html`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

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

- このファイルは「検索・一覧ページのHTML」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

