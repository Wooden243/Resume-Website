# index.html — 全文と逐次解説

> **役割:** ホームページの骨格。
> **入力:** ブラウザによるHTML解析。
> **出力:** トップページDOM。
> **設計意図:** JSONが入る箱と共通ナビ。

> **SHA-256:** `3a5cc09fb34e377cea9d25000575cf71e6f130004424852f272813b03dc35102`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A responsive demo portfolio with JSON-driven projects and a downloadable sample resume.">
  <meta name="theme-color" content="#102c34">
  <title>Home — Resume Website</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="stylesheet" href="assets/css/styles.css">
  <script type="module" src="assets/js/main.js"></script>
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
<main id="main">
  <section class="hero" aria-labelledby="hero-heading"><div class="container">
    <div class="hero-panel">
      <div class="hero-copy">
        <div class="eyebrow light">Hello, this is a sample portfolio <span aria-hidden="true">↗</span></div>
        <h1 id="hero-heading">Ideas made <span class="emphasis">clear.</span><br>Work made useful.</h1>
        <p data-profile-intro>A thoughtful, customizable portfolio website built using only HTML, CSS, and JavaScript.</p>
        <div class="hero-actions"><a class="button button-primary" href="projects/index.html">Explore projects ↗</a><a class="button button-light" href="resume/index.html">View resume</a></div>
        <div class="hero-fineprint"><span class="presence-dot" aria-hidden="true"></span><span>Lightweight by design. Easy to make your own.</span></div>
      </div>
      <div class="hero-art" aria-label="Decorative illustration of a portfolio page" role="img">
        <div class="hero-orbit" aria-hidden="true"></div>
        <div class="hero-device" aria-hidden="true"><div class="device-top"><span>the creative desk</span><span class="device-icon">✳</span></div>
          <div class="device-big">Good work.<br>Well told.</div><div class="device-divider"></div>
          <span class="device-chip">SELECTED WORK / 2026</span>
          <div class="device-rows"><div class="device-row"></div><div class="device-row"></div><div class="device-row"></div></div>
          <div class="device-postit">Make it simple.<br>Make it matter. ↗</div>
        </div>
      </div>
    </div>
    <div class="stats-row" aria-label="Website features">
      <div class="stat-item"><div class="stat-number">01.</div><div class="stat-label">Projects from JSON</div></div>
      <div class="stat-item"><div class="stat-number">02.</div><div class="stat-label">Responsive by default</div></div>
      <div class="stat-item"><div class="stat-number">03.</div><div class="stat-label">Zero runtime dependencies</div></div>
    </div>
  </div></section>
  <section class="section" aria-labelledby="featured-title"><div class="container">
    <div class="section-header"><div><div class="eyebrow">The work</div><h2 id="featured-title">Selected projects<span aria-hidden="true">.</span></h2></div>
      <a class="text-link" href="projects/index.html">View all projects ↗</a></div>
    <div id="featured-projects" class="project-grid" aria-live="polite"><p class="loading-hint">Loading selected work…</p></div>
  </div></section>
  <section class="section" aria-labelledby="approach-title"><div class="container">
    <div class="section-header"><div><div class="eyebrow">How it is made</div><h2 id="approach-title">A few guiding ideas<span aria-hidden="true">.</span></h2></div>
      <p class="section-lead">A small set of principles keeps this portfolio readable, adaptable, and easy to maintain.</p></div>
    <div class="values-grid">
      <article class="value-card"><span class="value-number">01 / CLARITY</span><h3>Content first</h3><p>Prioritize real project details and straightforward explanations over unnecessary decoration.</p></article>
      <article class="value-card"><span class="value-number">02 / CRAFT</span><h3>Built to adapt</h3><p>Project cards and detail pages are generated from one editable JSON data source.</p></article>
      <article class="value-card"><span class="value-number">03 / CARE</span><h3>Accessible for all</h3><p>Semantic markup, sensible contrast, mobile layouts, and keyboard-friendly controls.</p></article>
    </div>
  </div></section>
  <section class="section" aria-labelledby="about-title"><div class="container"><div class="about-panel">
    <div><div class="eyebrow">A little introduction</div><h2 id="about-title">Beyond the code.</h2></div>
    <div class="about-text"><p data-profile-about>Learn more about the person and approach behind the projects.</p>
      <p><strong data-profile-name>Your Name</strong> · A profile ready to personalize. The information here is placeholder content.</p>
      <a class="text-link" href="resume/index.html">More about this profile ↗</a>
    </div>
  </div></div></section>
  <section class="cta" id="contact" aria-labelledby="contact-title"><div class="container"><div class="cta-panel">
    <div><div class="eyebrow light">Contact</div><h2 id="contact-title">Make this space your own.</h2>
      <p>Update <code>data/profile.json</code>, replace sample projects, and add a real resume before sharing.</p></div>
    <a class="button button-light" href="guide.html">Read the customization guide ↗</a>
  </div></div></section>
</main>
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
  <meta name="description" content="A responsive demo portfolio with JSON-driven projects and a downloadable sample resume.">
  <meta name="theme-color" content="#102c34">
  <title>Home — Resume Website</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
```

- この行群は`index.html`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L10–L18

```html
  <link rel="stylesheet" href="assets/css/styles.css">
  <script type="module" src="assets/js/main.js"></script>
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
<main id="main">
  <section class="hero" aria-labelledby="hero-heading"><div class="container">
    <div class="hero-panel">
      <div class="hero-copy">
        <div class="eyebrow light">Hello, this is a sample portfolio <span aria-hidden="true">↗</span></div>
        <h1 id="hero-heading">Ideas made <span class="emphasis">clear.</span><br>Work made useful.</h1>
        <p data-profile-intro>A thoughtful, customizable portfolio website built using only HTML, CSS, and JavaScript.</p>
        <div class="hero-actions"><a class="button button-primary" href="projects/index.html">Explore projects ↗</a><a class="button button-light" href="resume/index.html">View resume</a></div>
        <div class="hero-fineprint"><span class="presence-dot" aria-hidden="true"></span><span>Lightweight by design. Easy to make your own.</span></div>
```

- `main`は文書の主要コンテンツを示す意味的なHTMLタグ。スキップリンクの着地点でもある。

### L37–L45

```html
      </div>
      <div class="hero-art" aria-label="Decorative illustration of a portfolio page" role="img">
        <div class="hero-orbit" aria-hidden="true"></div>
        <div class="hero-device" aria-hidden="true"><div class="device-top"><span>the creative desk</span><span class="device-icon">✳</span></div>
          <div class="device-big">Good work.<br>Well told.</div><div class="device-divider"></div>
          <span class="device-chip">SELECTED WORK / 2026</span>
          <div class="device-rows"><div class="device-row"></div><div class="device-row"></div><div class="device-row"></div></div>
          <div class="device-postit">Make it simple.<br>Make it matter. ↗</div>
        </div>
```

- この行群は`index.html`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L46–L54

```html
      </div>
    </div>
    <div class="stats-row" aria-label="Website features">
      <div class="stat-item"><div class="stat-number">01.</div><div class="stat-label">Projects from JSON</div></div>
      <div class="stat-item"><div class="stat-number">02.</div><div class="stat-label">Responsive by default</div></div>
      <div class="stat-item"><div class="stat-number">03.</div><div class="stat-label">Zero runtime dependencies</div></div>
    </div>
  </div></section>
  <section class="section" aria-labelledby="featured-title"><div class="container">
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。

### L55–L63

```html
    <div class="section-header"><div><div class="eyebrow">The work</div><h2 id="featured-title">Selected projects<span aria-hidden="true">.</span></h2></div>
      <a class="text-link" href="projects/index.html">View all projects ↗</a></div>
    <div id="featured-projects" class="project-grid" aria-live="polite"><p class="loading-hint">Loading selected work…</p></div>
  </div></section>
  <section class="section" aria-labelledby="approach-title"><div class="container">
    <div class="section-header"><div><div class="eyebrow">How it is made</div><h2 id="approach-title">A few guiding ideas<span aria-hidden="true">.</span></h2></div>
      <p class="section-lead">A small set of principles keeps this portfolio readable, adaptable, and easy to maintain.</p></div>
    <div class="values-grid">
      <article class="value-card"><span class="value-number">01 / CLARITY</span><h3>Content first</h3><p>Prioritize real project details and straightforward explanations over unnecessary decoration.</p></article>
```

- この行群は`index.html`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L64–L72

```html
      <article class="value-card"><span class="value-number">02 / CRAFT</span><h3>Built to adapt</h3><p>Project cards and detail pages are generated from one editable JSON data source.</p></article>
      <article class="value-card"><span class="value-number">03 / CARE</span><h3>Accessible for all</h3><p>Semantic markup, sensible contrast, mobile layouts, and keyboard-friendly controls.</p></article>
    </div>
  </div></section>
  <section class="section" aria-labelledby="about-title"><div class="container"><div class="about-panel">
    <div><div class="eyebrow">A little introduction</div><h2 id="about-title">Beyond the code.</h2></div>
    <div class="about-text"><p data-profile-about>Learn more about the person and approach behind the projects.</p>
      <p><strong data-profile-name>Your Name</strong> · A profile ready to personalize. The information here is placeholder content.</p>
      <a class="text-link" href="resume/index.html">More about this profile ↗</a>
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。

### L73–L81

```html
    </div>
  </div></div></section>
  <section class="cta" id="contact" aria-labelledby="contact-title"><div class="container"><div class="cta-panel">
    <div><div class="eyebrow light">Contact</div><h2 id="contact-title">Make this space your own.</h2>
      <p>Update <code>data/profile.json</code>, replace sample projects, and add a real resume before sharing.</p></div>
    <a class="button button-light" href="guide.html">Read the customization guide ↗</a>
  </div></div></section>
</main>
<footer class="site-footer">
```

- この行群は`index.html`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L82–L90

```html
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

- `nav`はページ移動の主要なリンク群を表し、aria-labelで用途を補う。

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

- このファイルは「ホームページの骨格」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

