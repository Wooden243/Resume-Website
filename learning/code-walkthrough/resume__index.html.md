# resume/index.html — 全文と逐次解説

> **役割:** 履歴書ページのHTML。
> **入力:** profile.jsonとPDFファイル。
> **出力:** スキル・経歴・ダウンロードボタン。
> **設計意図:** 実際の履歴書情報はJSONに分離。

> **SHA-256:** `c2c2e16104c115e0085c9ccac812d5fb7fb9dc3eb63313c08698ade0b6c848f4`（現行ソースとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```html
<!doctype html>
<html lang="ja"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="公開プロジェクトに基づく使用技術と取り組み。">
<meta name="theme-color" content="#102c34">
<title>About — Wooden243</title>
<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
<link rel="stylesheet" href="../assets/css/styles.css">
<script type="module" src="../assets/js/resume.js"></script>
</head><body>
<a class="skip-link" href="#main">本文へスキップ</a>
<header class="site-header"><div class="container nav-inner">
<a class="brand" href="../index.html" aria-label="Wooden243 ポートフォリオ ホーム"><span class="brand-mark" aria-hidden="true">✳</span> Wooden243</a>
<button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="primary-navigation">Menu ☰</button>
<nav class="site-nav" id="primary-navigation" data-nav-menu aria-label="メインナビゲーション">
<a href="../index.html">Home</a>
<a href="../projects/index.html">Projects</a>
<a href="../resume/index.html" aria-current="page">About</a>
<a class="nav-contact" href="https://github.com/Wooden243" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
</nav></div></header>
<main id="main"><div class="container">
<header class="page-intro resume-header"><div><div class="eyebrow">About & skills</div><h1>About<span style="color:#dc684b">.</span></h1>
<p>公開済みの実装に基づく技術領域とプロジェクトの概要です。未確認の経歴や実績は掲載していません。</p></div>
<a class="button button-primary" href="https://github.com/Wooden243" target="_blank" rel="noopener noreferrer">GitHubの成果物 ↗</a></header>
<div class="resume-layout"><aside class="resume-overview"><div class="eyebrow">Profile</div><h2>Wooden243</h2>
<p>機械学習アルゴリズムの実装とWebアプリケーション開発に取り組む技術ポートフォリオ。</p><p class="small-note">使用技術は公開済みの成果物に基づいています。</p>
<a class="text-link" href="../projects/index.html">プロジェクトを見る ↗</a></aside>
<div id="resume-dynamic" aria-live="polite"><p class="loading-hint">読み込み中…</p></div></div>
</div></main><footer class="site-footer"><div class="container footer-row">
<p>© <span data-year>2026</span> Wooden243 · Technical portfolio</p>
<nav class="footer-links" aria-label="フッターナビゲーション"><a href="../index.html">Home</a><a href="../projects/index.html">Projects</a><a href="../resume/index.html">About</a><a href="https://github.com/Wooden243" target="_blank" rel="noopener noreferrer">GitHub</a></nav>
</div></footer>
</body></html>
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
  <meta name="description" content="Sample resume, skills, experience, and downloadable PDF for a customizable portfolio.">
  <meta name="theme-color" content="#102c34">
  <title>Resume — Resume Website</title>
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
```

- この行群は`index.html`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L10–L18

```html
  <link rel="stylesheet" href="../assets/css/styles.css">
  <script type="module" src="../assets/js/resume.js"></script>
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
      <a href="../projects/index.html">Projects</a>
      <a href="../resume/index.html" aria-current="page">Resume</a>
      <a class="nav-contact" href="../index.html#contact">Get in touch ↗</a>
    </nav>
  </div>
</header>
```

- `nav`はページ移動の主要なリンク群を表し、aria-labelで用途を補う。

### L28–L36

```html
<main id="main"><div class="container">
  <header class="page-intro resume-header"><div><div class="eyebrow">A quick introduction</div><h1>Resume<span style="color:#dc684b">.</span></h1>
    <p>A clean, readable view of skills, selected work, and education. All entries are example placeholders.</p></div>
    <a id="resume-download" class="button button-primary" href="../assets/sample-resume.pdf" download="sample-resume.pdf">Download sample PDF ↓</a>
  </header>
  <div class="resume-layout">
    <aside class="resume-overview"><div class="eyebrow">Profile</div><h2>Your Name</h2>
      <p>Developer portfolio template. Replace this sample name, the skills, the timeline, and the PDF with your own accurate information.</p>
      <p class="small-note">The downloaded PDF is intentionally labeled SAMPLE. Do not present these placeholders as a genuine resume.</p>
```

- `main`は文書の主要コンテンツを示す意味的なHTMLタグ。スキップリンクの着地点でもある。

### L37–L45

```html
      <a class="text-link" href="../guide.html">How to customize ↗</a>
    </aside>
    <div id="resume-dynamic" aria-live="polite"><p class="loading-hint">Loading resume information…</p></div>
  </div>
</div></main>
<footer class="site-footer">
  <div class="container footer-row">
    <p>© <span data-year>2026</span> yourfolio. A customizable project template.</p>
    <nav class="footer-links" aria-label="Footer navigation">
```

- `nav`はページ移動の主要なリンク群を表し、aria-labelで用途を補う。

### L46–L51

```html
      <a href="../index.html">Home</a><a href="../projects/index.html">Projects</a><a href="../resume/index.html">Resume</a><a href="../guide.html">Setup guide</a>
    </nav>
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

- このファイルは「履歴書ページのHTML」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

