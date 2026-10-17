# 02 | 重要概念を初歩から理解する

この章では「定義 → 用途 → 本サイトでの場所 → 具体例 → 誤解 → 実務での使い道」の順に主要技術を説明する。難しい固有名詞も、まず役割を理解することが目的。

## 1. HTML / DOM（必須）

**定義:** HTMLは文書の意味・構造を記述するテキスト。DOMはブラウザがHTMLから構築する要素オブジェクトの木構造。たとえば`<div id="projects-grid">`は、`document.getElementById('projects-grid')`によりDOMオブジェクトとして取得できる。

**どこで使用:** `projects/index.html`に空の一覧用DOMがあり、`projects.js`がそこへカードを追加する。

```javascript
const grid = document.getElementById('projects-grid');
const title = document.createElement('h3');
title.textContent = 'A sample project';
grid.replaceChildren(title);
```

**よくある誤解:** `document.createElement()`はHTMLの文字列を作るのではなく、DOM要素オブジェクトを作る。`append()`または`replaceChildren()`で画面内に配置するまで見えない。

**実務用途:** ページの動的描画、フォーム検証、アクセシビリティ属性の操作。

## 2. JSON（必須）

**定義:** オブジェクトや配列をテキストで記録するデータ形式。JavaScriptオブジェクト表記に似るが、JSONではプロパティ名と文字列をダブルクォートで囲み、コメントは書けない。`true`や`false`は文字列ではない。

**どこで使用:** `data/projects.json`にはプロジェクトの配列、`data/profile.json`にはプロフィールのオブジェクトがある。

```json
{"id":6,"slug":"new-project","title":"Example","stack":["JS","CSS"]}
```

**よくある誤解:** JSONファイル自体が画面を生成するわけではない。ブラウザ側のJavaScriptが読み込んでDOMに反映する必要がある。

**実務用途:** APIレスポンス、設定、テスト用データ、サービス間の通信。

## 3. `fetch()`とAJAX（必須）

**定義:** `fetch()`はブラウザがHTTPリクエストを送る非同期API。「AJAX」は画面全体を再読み込みせずに必要なデータを取得・更新する一般的なパターンで、古いXMLHttpRequestだけを意味しない。

**どこで使用:** `data.js`の`fetchJson(url)`。HTTP応答を`response.json()`でJSの配列・オブジェクトに変換する。

```javascript
const response = await fetch('/data/projects.json');
if (!response.ok) throw new Error('HTTP error');
const projects = await response.json();
```

上記の先頭`/`はルートドメインのURLを使う**単純例**。このプロジェクトではGitHub Pagesのサブパスにも対応するため、`new URL('../../data/projects.json', import.meta.url)`で解決している。

**よくある誤解:** `fetch()`がHTTP 404のとき必ず`catch`へ行くとは限らない。通常404/500でもHTTPレスポンスを返すため、`response.ok`を検査する。

**実務用途:** REST API呼び出し、設定データの読み込み、検索画面の結果更新。

## 4. Promise / `async` / `await`（必須）

**定義:** Promiseは非同期処理の将来の結果を表すオブジェクト。`async function`はPromiseを返す関数を定義し、`await`はPromiseが確定するまで**その非同期関数内**の続きを待つ。

**どこで使用:** `main.js`の`Promise.all([loadProfile(), loadProjects()])`は二つの独立したJSON要求を並行させる。

```javascript
async function load() {
  try {
    const [profile, projects] = await Promise.all([loadProfile(), loadProjects()]);
    return {profile, projects};
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

**よくある誤解:** `await`はブラウザ全体を停止させない。UIは動作し続ける。`Promise.all`では要素のいずれかが失敗すると全体がrejectする。

**実務用途:** API通信、ファイル取得、非同期の依存処理。

## 5. ES Modules（重要）

**定義:** `export`で外部に公開した関数を、別ファイルから`import`で利用する仕組み。

```javascript
// model.js
export function projectMatches(project, query) { /* ... */ }
// projects.js
import {projectMatches} from './model.js';
```

**どこで使用:** `assets/js/`の各ファイル。HTMLの`<script type="module" src="...">`で読み込む。

**よくある誤解:** ファイルごとにscriptタグを並べる必要はない。`import`で依存関係を辿って読み込める。`file://`ではモジュール読み込み・JSON取得が制限されることがあるのでHTTPで起動する。

**実務用途:** 大きなコードを責務別に分ける、テストを容易にする、依存の整理。

## 6. `filter` / `find` / `sort`（必須）

**定義:** `filter`は条件に一致した要素で**新しい配列**を作る。`find`は最初に一致した要素（なければ`undefined`）を返す。`sort`は元配列を変更するため、コピーしてから並べ替えることがある。

**どこで使用:** `model.js`の`normalizeProjects`、`projectMatches`、`getProjectBySlug`。

```javascript
const visible = projects.filter(p => p.category === 'Web App');
const selected = projects.find(p => p.slug === 'foodie-finder');
const sorted = [...projects].sort((a,b)=>b.year-a.year);
```

**よくある誤解:** `sort`の戻り値は新しい配列ではなく並べ替えた**元配列の参照**。`[...projects]`で複製して副作用を避ける。

**実務用途:** 一覧の絞り込み、検索、ランキング、ルックアップ。

## 7. `URLSearchParams` と slug（重要）

**定義:** URLの`?slug=foodie-finder`というクエリ部分を解析するための標準API。`slug`はURLを安定的に識別する短い文字列。識別子を画面のタイトルと別にすることで、タイトル変更時もURLを保ちやすい。

**どこで使用:** `detail.js`。

```javascript
const slug = new URLSearchParams(window.location.search).get('slug');
const project = projects.find(p => p.slug === slug);
```

**よくある誤解:** この実装では`projects/detail.html`自体は**1枚**だけ。slugで選んだデータが違うため見た目が個別ページに変化する。

**実務用途:** 詳細画面、検索パラメータ、ページ共有・深いリンク。

## 8. `textContent` と XSS（必須）

**定義:** `textContent`は文字列をHTMLとして**解釈せず**テキストとして挿入する。`innerHTML`はHTML文字列として解釈するため、信頼できないデータを直接入れるとXSS（スクリプト注入）の危険がある。

```javascript
const title = document.createElement('h3');
title.textContent = '<img src=x onerror=alert(1)>';
```

上記はタグが実行されず、記号を含む文字列として表示される。`dom.js`の共通関数`node()`は`textContent`を使う。

**実務用途:** APIから受け取った表示文やコメントの安全な描画。

## 9. イベント処理と状態（必須）

**定義:** `addEventListener`はユーザー操作で起こるイベントへ関数を登録する。検索欄の`input`ではキー入力のたびに再描画する。状態は画面が変化する根拠となるデータ。

```javascript
let activeCategory = 'All';
search.addEventListener('input', renderList);
```

**どこで使用:** `projects.js`の`activeCategory`と`search.value`、`site.js`のメニュー開閉。

**よくある誤解:** 検索のたびにJSONを再取得する必要はない。初回取得した`projects`配列からフィルタをかけ直してDOMを更新できる。

**実務用途:** 検索、画面切替、フォーム、メニュー。

## 10. CSSのレスポンシブデザイン（重要）

**定義:** 端末の画面幅に合わせてグリッドの列数、余白、ナビ表示を変更する設計。CSSの`@media (max-width: 720px)`などが境界条件。

**どこで使用:** `styles.css`の末尾。`project-grid`を3列→2列→1列へ変更する。

**よくある誤解:** スマホ用の別HTMLは不要。コンテンツが同じでもCSSがレイアウトを変更する。

**実務用途:** PC・タブレット・スマートフォン対応。

## 11. DNS・TLS・GitHub Pages・CI/CD（重要）

**定義:** DNSはドメイン名を配信先へ向けるしくみ。TLSはHTTPSで通信を暗号化・認証するしくみ。GitHub Actionsはpushを契機に処理を自動化できるCI/CDシステム。GitHub Pagesは静的サイトを配信するホスティング。

**どこで使用:** `.github/workflows/deploy.yml`、`docs/deployment.md`。

**よくある誤解:** 公開手順をREADMEに書いただけでは、本番サイトがインターネットに存在するわけではない。独自ドメインの所有とDNS設定、Pagesの有効化が必要。

**実務用途:** テスト・ビルド・公開作業の自動化、HTTPS公開、運用監視。

## 12. PDF・ファイルダウンロード（参考）

**定義:** PDFは固定レイアウト文書形式。HTMLの`<a href="..." download>`は対応するブラウザでファイルをダウンロードするよう指示する。

**どこで使用:** `resume/index.html`のPDFリンク。ファイルは`assets/sample-resume.pdf`に存在する。

**よくある誤解:** PDF内容はJSONのテキスト更新と自動同期しない。プロフィール更新とPDF更新は別作業。サンプルPDFは本人の履歴書ではない。

**実務用途:** 履歴書、ポートフォリオ添付、仕様書、レポート配布。
