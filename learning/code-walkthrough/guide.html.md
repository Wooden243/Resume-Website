# guide.html — 全文と逐次解説

> **役割:** Web版カスタマイズ手順。
> **入力:** 静的HTML。
> **出力:** セットアップ手順のブラウザ表示。
> **設計意図:** MarkdownのREADMEを直接開かなくても使える。

> **SHA-256:** `2a38673e034b0e9484ac6c4fd61d4a5f4b76c28a2364d09705730f335c64b9bc`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Customize a JSON-powered static portfolio template.">
  <meta name="theme-color" content="#102c34">
  <title>Customize — Resume Website</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="stylesheet" href="assets/css/styles.css">
  <script type="module" src="assets/js/site-init.js"></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="template-strip"><strong>Portfolio template</strong> Sample content only — customize before publishing.</div>
<header class="site-header">
  <div class="container nav-inner">
    <a class="brand" href="index.html" aria-label="Portfolio template home"><span class="brand-mark" aria-hidden="true">✳</span> yourfolio<span class="sr-only"></span></a>
    <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="primary-navigation">Menu ☰</button>
    <nav class="site-nav" id="primary-navigation" data-nav-menu aria-label="Main navigation">
      <a href="index.html" aria-current="page">Home</a>
      <a href="projects/index.html">Projects</a>
      <a href="resume/index.html">Resume</a>
      <a class="nav-contact" href="index.html#contact">Get in touch ↗</a>
    </nav>
  </div>
</header>
<main id="main"><div class="container">
<header class="page-intro"><div class="eyebrow">Documentation</div><h1>Make it yours<span style="color:#dc684b">.</span></h1><p>The site is a demonstration template. Replace placeholders, verify every claim, and deploy only after reviewing your public data.</p></header>
<div class="guide-grid"><nav class="guide-aside" aria-label="Guide sections"><h2>On this page</h2><a href="#start">Run locally</a><a href="#profile">Edit your profile</a><a href="#projects">Add projects</a><a href="#pdf">Replace PDF</a><a href="#publish">Publish</a></nav>
<div class="guide-main">
<section id="start"><h2>01 / Run locally</h2><p>Since the browser loads JSON with <code>fetch()</code>, open the site through an HTTP server rather than double-clicking the HTML file.</p><pre><code>python3 -m http.server 8000 --bind 127.0.0.1</code></pre><p>Then open <code>http://127.0.0.1:8000/</code> in your browser.</p></section>
<section id="profile"><h2>02 / Edit profile data</h2><p>Open <code>data/profile.json</code> and replace the name, introduction, skills, experience, and education. Changes appear on the home and resume pages after reloading.</p><p>Delete any sample entries you cannot verify. The example identity and project descriptions are fictional.</p></section>
<section id="projects"><h2>03 / Add a project</h2><p>Edit <code>data/projects.json</code>. Add a new object with a unique <code>id</code> and <code>slug</code>, title, summary, content, stack, and metadata. The listing and project-detail page are generated automatically.</p><p>Use a slug like <code>my-first-project</code>. Set <code>featured</code> to <code>true</code> to display a project on the homepage. Optional source and demo links must be HTTPS URLs.</p></section>
<section id="pdf"><h2>04 / Replace the sample PDF</h2><p>Replace <code>assets/sample-resume.pdf</code> with a verified resume, or update the relative PDF path in <code>data/profile.json</code>. The sample PDF deliberately contains placeholders.</p></section>
<section id="publish"><h2>05 / Publish with HTTPS</h2><p>This folder is deploy-ready but is not itself a hosted website. Follow <code>docs/deployment.md</code> for GitHub Pages, a custom domain, DNS, HTTPS, and deployment checks.</p><p>GitHub Pages can provide HTTPS for its own domain. A custom domain requires a domain you control and DNS configuration.</p><p>Before publishing, search the project for <code>Your Name</code>, <code>example.com</code>, <code>20XX</code>, and <code>demo</code>, and replace every relevant placeholder.</p></section>
</div></div></div></main>
<footer class="site-footer">
  <div class="container footer-row">
    <p>© <span data-year>2026</span> yourfolio. A customizable project template.</p>
    <nav class="footer-links" aria-label="Footer navigation">
      <a href="index.html">Home</a><a href="projects/index.html">Projects</a><a href="resume/index.html">Resume</a><a href="guide.html">Setup guide</a>
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
  <meta name="description" content="Customize a JSON-powered static portfolio template.">
  <meta name="theme-color" content="#102c34">
  <title>Customize — Resume Website</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
```

- この行群は`guide.html`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L10–L18

```html
  <link rel="stylesheet" href="assets/css/styles.css">
  <script type="module" src="assets/js/site-init.js"></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="template-strip"><strong>Portfolio template</strong> Sample content only — customize before publishing.</div>
<header class="site-header">
  <div class="container nav-inner">
    <a class="brand" href="index.html" aria-label="Portfolio template home"><span class="brand-mark" aria-hidden="true">✳</span> yourfolio<span class="sr-only"></span></a>
```

- `type="module"`はES Modulesを有効化する。読み込み先のJSがimportにより必要なモジュールを解決する。

### L19–L27

```html
    <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="primary-navigation">Menu ☰</button>
    <nav class="site-nav" id="primary-navigation" data-nav-menu aria-label="Main navigation">
      <a href="index.html" aria-current="page">Home</a>
      <a href="projects/index.html">Projects</a>
      <a href="resume/index.html">Resume</a>
      <a class="nav-contact" href="index.html#contact">Get in touch ↗</a>
    </nav>
  </div>
</header>
```

- `nav`はページ移動の主要なリンク群を表し、aria-labelで用途を補う。

### L28–L36

```html
<main id="main"><div class="container">
<header class="page-intro"><div class="eyebrow">Documentation</div><h1>Make it yours<span style="color:#dc684b">.</span></h1><p>The site is a demonstration template. Replace placeholders, verify every claim, and deploy only after reviewing your public data.</p></header>
<div class="guide-grid"><nav class="guide-aside" aria-label="Guide sections"><h2>On this page</h2><a href="#start">Run locally</a><a href="#profile">Edit your profile</a><a href="#projects">Add projects</a><a href="#pdf">Replace PDF</a><a href="#publish">Publish</a></nav>
<div class="guide-main">
<section id="start"><h2>01 / Run locally</h2><p>Since the browser loads JSON with <code>fetch()</code>, open the site through an HTTP server rather than double-clicking the HTML file.</p><pre><code>python3 -m http.server 8000 --bind 127.0.0.1</code></pre><p>Then open <code>http://127.0.0.1:8000/</code> in your browser.</p></section>
<section id="profile"><h2>02 / Edit profile data</h2><p>Open <code>data/profile.json</code> and replace the name, introduction, skills, experience, and education. Changes appear on the home and resume pages after reloading.</p><p>Delete any sample entries you cannot verify. The example identity and project descriptions are fictional.</p></section>
<section id="projects"><h2>03 / Add a project</h2><p>Edit <code>data/projects.json</code>. Add a new object with a unique <code>id</code> and <code>slug</code>, title, summary, content, stack, and metadata. The listing and project-detail page are generated automatically.</p><p>Use a slug like <code>my-first-project</code>. Set <code>featured</code> to <code>true</code> to display a project on the homepage. Optional source and demo links must be HTTPS URLs.</p></section>
<section id="pdf"><h2>04 / Replace the sample PDF</h2><p>Replace <code>assets/sample-resume.pdf</code> with a verified resume, or update the relative PDF path in <code>data/profile.json</code>. The sample PDF deliberately contains placeholders.</p></section>
<section id="publish"><h2>05 / Publish with HTTPS</h2><p>This folder is deploy-ready but is not itself a hosted website. Follow <code>docs/deployment.md</code> for GitHub Pages, a custom domain, DNS, HTTPS, and deployment checks.</p><p>GitHub Pages can provide HTTPS for its own domain. A custom domain requires a domain you control and DNS configuration.</p><p>Before publishing, search the project for <code>Your Name</code>, <code>example.com</code>, <code>20XX</code>, and <code>demo</code>, and replace every relevant placeholder.</p></section>
```

- `main`は文書の主要コンテンツを示す意味的なHTMLタグ。スキップリンクの着地点でもある。
- `nav`はページ移動の主要なリンク群を表し、aria-labelで用途を補う。

### L37–L45

```html
</div></div></div></main>
<footer class="site-footer">
  <div class="container footer-row">
    <p>© <span data-year>2026</span> yourfolio. A customizable project template.</p>
    <nav class="footer-links" aria-label="Footer navigation">
      <a href="index.html">Home</a><a href="projects/index.html">Projects</a><a href="resume/index.html">Resume</a><a href="guide.html">Setup guide</a>
    </nav>
  </div>
</footer>
```

- `nav`はページ移動の主要なリンク群を表し、aria-labelで用途を補う。

### L46–L47

```html
</body>
</html>
```

- この行群は`guide.html`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

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

- このファイルは「Web版カスタマイズ手順」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

