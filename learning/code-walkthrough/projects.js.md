# assets/js/projects.js — 全文と逐次解説

> **役割:** 一覧検索・カテゴリ絞り込み・DOM更新。
> **入力:** 検索キーワード・activeCategory・projects配列。
> **出力:** フィルター後のカード群。
> **設計意図:** 初回だけfetchし、以降はメモリ上で再描画。

> **SHA-256:** `ed9ae054cbd888b4efc5ca733e8d9e3c47ce6a736088e1e170bd7da1ee3476d7`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```javascript
import {loadProjects} from './data.js';
import {normalizeProjects, projectMatches, categoriesOf} from './model.js';
import {node, projectCard, showError} from './dom.js';
import {initSite} from './site.js';

initSite();

const grid = document.getElementById('projects-grid');
const search = document.getElementById('project-search');
const choices = document.getElementById('category-filters');
const tally = document.getElementById('project-count');
const clear = document.getElementById('clear-search');
let projects = [];
let activeCategory = 'All';

function syncUrl() {
  const url = new URL(window.location.href);
  const query = search.value.trim();
  if (query) url.searchParams.set('q', query);
  else url.searchParams.delete('q');
  if (activeCategory !== 'All') url.searchParams.set('category', activeCategory);
  else url.searchParams.delete('category');
  window.history.replaceState(null, '', url);
}

function readUrl() {
  const params = new URLSearchParams(window.location.search);
  search.value = params.get('q') || '';
  const category = params.get('category') || 'All';
  activeCategory = categoriesOf(projects).includes(category) ? category : 'All';
}


function renderList() {
  const filtered = projects.filter(item => projectMatches(item, search.value, activeCategory));
  tally.textContent = `${filtered.length} / ${projects.length} 件のプロジェクト`;
  if (clear) clear.hidden = !search.value;
  if (!filtered.length) {
    grid.replaceChildren(node('div', {className:'status-panel empty-results'}, [
      node('h3', {text:'該当するプロジェクトがありません'}), node('p', {text:'検索語やカテゴリを変更してください。'})
    ]));
    return;
  }
  grid.replaceChildren(...filtered.map(item => projectCard(item, 'detail.html')));
}

function renderFilters() {
  choices.replaceChildren(...categoriesOf(projects).map(category => {
    const button = node('button', {className: `filter-pill${activeCategory === category ? ' selected' : ''}`, text: category === 'All' ? 'すべて' : category, attrs: {type:'button', 'aria-pressed': String(activeCategory === category)}});
    button.addEventListener('click', () => {
      activeCategory = category;
      syncUrl();
      renderFilters();
      renderList();
    });
    return button;
  }));
}

async function initProjects() {
  try {
    projects = normalizeProjects(await loadProjects());
    readUrl();
    renderFilters();
    renderList();
  } catch (error) {
    console.error(error);
    showError(grid, 'プロジェクト情報を読み込めませんでした。HTTPサーバー経由で開いてください。', initProjects);
  }
}

search.addEventListener('input', () => {syncUrl(); renderList();});
if (clear) clear.addEventListener('click', () => { search.value = ''; syncUrl(); renderList(); search.focus(); });
window.addEventListener('popstate', () => {readUrl(); renderFilters(); renderList();});
initProjects();
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```javascript
import {loadProjects} from './data.js';
import {normalizeProjects, projectMatches, categoriesOf} from './model.js';
import {node, projectCard, showError} from './dom.js';
import {initSite} from './site.js';

initSite();

const grid = document.getElementById('projects-grid');
const search = document.getElementById('project-search');
const choices = document.getElementById('category-filters');
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。

### L11–L20

```javascript
const tally = document.getElementById('project-count');
let projects = [];
let activeCategory = 'All';

function renderList() {
  const filtered = projects.filter(item => projectMatches(item, search.value, activeCategory));
  tally.textContent = `${filtered.length} of ${projects.length} projects`;
  if (!filtered.length) {
    grid.replaceChildren(node('div', {className:'status-panel empty-results'}, [
      node('h3', {text:'Nothing found'}), node('p', {text:'Try another search term or category.'})
```

- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。
- 値をテキストとして表示するため、文字列にHTMLタグ風の記述があっても解釈しない。
- 配列の反復処理。mapは変換、filterは部分配列、findは最初の一致値、sortは並べ替えを担当する。

### L21–L30

```javascript
    ]));
    return;
  }
  grid.replaceChildren(...filtered.map(item => projectCard(item, 'detail.html')));
}

function renderFilters() {
  choices.replaceChildren(...categoriesOf(projects).map(category => {
    const button = node('button', {className: `filter-pill${activeCategory === category ? ' selected' : ''}`, text: category, attrs: {type:'button', 'aria-pressed': String(activeCategory === category)}});
    button.addEventListener('click', () => {
```

- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。
- 配列の反復処理。mapは変換、filterは部分配列、findは最初の一致値、sortは並べ替えを担当する。
- イベント発生時に実行する関数を登録している。関数をその場で呼び出していない点に注意する。

### L31–L40

```javascript
      activeCategory = category;
      renderFilters();
      renderList();
    });
    return button;
  }));
}

async function initProjects() {
  try {
```

- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。

### L41–L50

```javascript
    projects = normalizeProjects(await loadProjects());
    renderFilters();
    renderList();
  } catch (error) {
    console.error(error);
    showError(grid, 'Projects could not be loaded. Please refresh or check the local server.', initProjects);
  }
}

search.addEventListener('input', renderList);
```

- `await`はPromiseの解決を待って次の行に進む。ブラウザ全体の動作を停止させる同期ブロックではない。
- 失敗系の分岐。正常系だけでなく取得エラー・形式不正のケースでもユーザーに表示すべき状態を決める。
- イベント発生時に実行する関数を登録している。関数をその場で呼び出していない点に注意する。

### L51–L51

```javascript
initProjects();
```

- この行群は`projects.js`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

## 3. 主要な設計ポイントを深く理解する

### 状態`let projects`と`activeCategory`

初回取得した全データと今選択中のカテゴリを保持。inputの現在値は検索欄から読む。

### `renderList()`

検索欄とカテゴリーを現在状態として解釈し、配列をfilterしてDOMへ表示する関数。0件なら空状態を出す。

### `renderFilters()`

categoriesOfの返り値からボタンを作り、`aria-pressed`とselectedクラスを現在状態へ同期。クリック時は状態変更→フィルター描画→一覧描画。

### `search.addEventListener`

inputイベントは文字入力が変わるたびに発生。関数を渡すのでイベント登録時には実行しない。

### `initProjects()`

JSONを読み込んで検証し、最初のフィルターとカード群を表示。失敗時にshowErrorで再試行ボタンを出す。

## 4. 入力から出力まで追跡する例

`search.value = "budget"`, `activeCategory = "All"`なら、全5件から`projectMatches`でBudgetMasterの1件を取り出し、DOMをそのカード1枚に置き換える。検索文字列を空にすると全件に戻る。

## 5. 自己確認ポイント

- このファイルは「一覧検索・カテゴリ絞り込み・DOM更新」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

