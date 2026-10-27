# assets/js/detail.js — 全文と逐次解説

> **役割:** クエリパラメータで個別プロジェクトを表示。
> **入力:** URLのslug・projects.json。
> **出力:** プロジェクト詳細DOM。
> **設計意図:** slug未発見・外部リンク不正のフォールバック。

> **SHA-256:** `ff059a3012b0399eef3f2c21fc466be1e99e8dea3095e125839bfe0855d3cf81`（現行ソースとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```javascript
import {loadProjects} from './data.js';
import {normalizeProjects, getProjectBySlug, formatProjectDate} from './model.js';
import {node, renderTags, visualForProject, showError} from './dom.js';
import {initSite} from './site.js';

initSite();
const content = document.getElementById('project-detail');

function section(label, text) {
  return node('section', {className:'case-section'}, [node('h2', {text:label}), node('p', {text:text || '詳細情報は準備中です。'})]);
}

function appendLinkIfValid(target, label, url) {
  if (typeof url !== 'string' || !/^https:\/\//i.test(url)) return;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return;
    target.append(node('a', {className:'button button-outline button-small', text:label, attrs:{href:parsed.href,target:'_blank',rel:'noopener noreferrer'}}));
  } catch { /* Optional project link intentionally omitted. */ }
}

async function renderDetail() {
  try {
    const slug = new URLSearchParams(window.location.search).get('slug');
    const project = getProjectBySlug(normalizeProjects(await loadProjects()), slug);
    if (!project) {
      content.replaceChildren(node('div', {className:'status-panel'}, [
        node('h1', {text:'プロジェクトが見つかりません'}),
        node('p', {text:'指定されたプロジェクトは登録されていません。'}),
        node('a', {className:'text-link', text:'← プロジェクト一覧', attrs:{href:'index.html'}})
      ]));
      document.title = 'プロジェクトが見つかりません — Wooden243';
      return;
    }

    document.title = `${project.title} — Wooden243`;
    const header = node('div', {className:'case-header'});
    header.append(node('div', {className:'eyebrow', text:`${project.category} / ${formatProjectDate(project.date)}`}));
    header.append(node('h1', {text:project.title}));
    header.append(node('p', {className:'case-subtitle', text:project.subtitle || project.summary}));
    header.append(renderTags(project.stack, 8));

    const links = node('div', {className:'case-links'});
    appendLinkIfValid(links, 'GitHubでソースを見る ↗', project.source);
    appendLinkIfValid(links, 'デモ ↗', project.demo);
    if (links.childElementCount) header.append(links);

    content.replaceChildren(
      header,
      visualForProject(project),
      node('div', {className:'case-content'}, [
        section('概要', project.content),
        section('課題', project.challenge),
        section('実装・検証方法', project.approach),
        section('結果と制約', project.outcome),
        node('a', {className:'button button-primary', text:'← プロジェクト一覧', attrs:{href:'index.html'}})
      ])
    );
  } catch (error) {
    console.error(error);
    showError(content, 'プロジェクト情報を読み込めませんでした。', renderDetail);
  }
}

renderDetail();
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```javascript
import {loadProjects} from './data.js';
import {normalizeProjects, getProjectBySlug, formatProjectDate} from './model.js';
import {node, renderTags, visualForProject, showError} from './dom.js';
import {initSite} from './site.js';

initSite();
const content = document.getElementById('project-detail');

function section(label, text) {
  return node('section', {className:'case-section'}, [node('h2', {text:label}), node('p', {text:text || 'Details to be added.'})]);
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。
- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。

### L11–L20

```javascript
}

function appendLinkIfValid(target, label, url) {
  if (typeof url !== 'string' || !/^https:\/\//i.test(url)) return;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return;
    target.append(node('a', {className:'button button-outline button-small', text:label, attrs:{href:parsed.href,target:'_blank',rel:'noopener noreferrer'}}));
  } catch { /* Optional project link intentionally omitted. */ }
}
```

- 失敗系の分岐。正常系だけでなく取得エラー・形式不正のケースでもユーザーに表示すべき状態を決める。
- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。

### L21–L30

```javascript

async function renderDetail() {
  try {
    const slug = new URLSearchParams(window.location.search).get('slug');
    const project = getProjectBySlug(normalizeProjects(await loadProjects()), slug);
    if (!project) {
      content.replaceChildren(node('div', {className:'status-panel'}, [
        node('h1', {text:'Project not found'}),
        node('p', {text:'The requested project is not in the portfolio data.'}),
        node('a', {className:'text-link', text:'← Browse projects', attrs:{href:'index.html'}})
```

- `await`はPromiseの解決を待って次の行に進む。ブラウザ全体の動作を停止させる同期ブロックではない。
- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。

### L31–L40

```javascript
      ]));
      document.title = 'Project not found — Resume Website';
      return;
    }

    document.title = `${project.title} — Resume Website`;
    const header = node('div', {className:'case-header'});
    header.append(node('div', {className:'eyebrow', text:`${project.category} / ${formatProjectDate(project.date)}`}));
    header.append(node('h1', {text:project.title}));
    header.append(node('p', {className:'case-subtitle', text:project.subtitle || project.summary}));
```

- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。

### L41–L50

```javascript
    header.append(renderTags(project.stack, 8));

    const links = node('div', {className:'case-links'});
    appendLinkIfValid(links, 'Source code ↗', project.source);
    appendLinkIfValid(links, 'Live demo ↗', project.demo);
    if (links.childElementCount) header.append(links);

    content.replaceChildren(
      header,
      visualForProject(project),
```

- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。

### L51–L60

```javascript
      node('div', {className:'case-content'}, [
        section('Overview', project.content),
        section('The challenge', project.challenge),
        section('The approach', project.approach),
        section('The outcome', project.outcome),
        node('p', {className:'demo-note', text:'This is demonstration content. Replace all sample projects with verified work before publishing a personal portfolio.'}),
        node('a', {className:'button button-primary', text:'← All projects', attrs:{href:'index.html'}})
      ])
    );
  } catch (error) {
```

- 失敗系の分岐。正常系だけでなく取得エラー・形式不正のケースでもユーザーに表示すべき状態を決める。

### L61–L66

```javascript
    console.error(error);
    showError(content, 'Project information could not be loaded.', renderDetail);
  }
}

renderDetail();
```

- この行群は`detail.js`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

## 3. 主要な設計ポイントを深く理解する

### `URLSearchParams`

URLの`?slug=...`部分を解析する。値がなければnull。

### `getProjectBySlug`

JSONからURLで指定されたslugに一致する1件を取得。見つからないときは分かりやすい表示に分岐。

### `section()`

h2とpを含む節を生成する小さな関数。Overview/Challenge/Approach/Outcomeへ再利用する。

### `appendLinkIfValid()`

外部リンクがHTTPS形式かを確認し、`new URL`でも検証。target blankに`rel="noopener noreferrer"`を付ける。空のサンプルURLは画面に出さない。

### `document.title`

詳細ページのブラウザタブに固有名を表示する。初期の静的HTML titleとは別にJSが上書きする。

### `replaceChildren()`

header、CSS製モック、本文を一括で差し込む。JSON本文はtextContent経由なのでHTML実行しない。

## 4. 入力から出力まで追跡する例

`?slug=foodie-finder` → `URLSearchParams.get()` が`"foodie-finder"` → `getProjectBySlug` が対象Object → header/本文/見た目のDOMノードを生成 → `replaceChildren`。`?slug=unknown`なら「Project not found」。

## 5. 自己確認ポイント

- このファイルは「クエリパラメータで個別プロジェクトを表示」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

