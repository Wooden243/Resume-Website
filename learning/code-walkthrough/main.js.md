# assets/js/main.js — 全文と逐次解説

> **役割:** トップページのJSON読み込みと描画。
> **入力:** ProfileとProjectsのJSON。
> **出力:** featuredのプロジェクトカード。
> **設計意図:** Promise.allで独立したデータを並行取得。

> **SHA-256:** `7818dc4dafd8706011292e95e82e8639f476c6d01c10786663287e3790d9deb5`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```javascript
import {loadProjects, loadProfile} from './data.js';
import {normalizeProjects} from './model.js';
import {node, projectCard, showError} from './dom.js';
import {initSite} from './site.js';

initSite();

async function renderHome() {
  const list = document.getElementById('featured-projects');
  try {
    const [profile, projects] = await Promise.all([loadProfile(), loadProjects()]);
    const intro = document.querySelector('[data-profile-intro]');
    if (intro) intro.textContent = profile.introduction;
    const about = document.querySelector('[data-profile-about]');
    if (about) about.textContent = profile.about;
    const name = document.querySelector('[data-profile-name]');
    if (name) name.textContent = profile.displayName;

    const featured = normalizeProjects(projects).filter(project => project.featured).slice(0, 3);
    if (!featured.length) {
      list.replaceChildren(node('p', {className: 'muted-text', text: 'Projects will appear here when they are added to data/projects.json.'}));
      return;
    }
    list.replaceChildren(...featured.map(project => projectCard(project)));
  } catch (error) {
    console.error(error);
    showError(list, 'Could not load the portfolio data. Run the site through a local HTTP server.', renderHome);
  }
}

renderHome();
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```javascript
import {loadProjects, loadProfile} from './data.js';
import {normalizeProjects} from './model.js';
import {node, projectCard, showError} from './dom.js';
import {initSite} from './site.js';

initSite();

async function renderHome() {
  const list = document.getElementById('featured-projects');
  try {
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。

### L11–L20

```javascript
    const [profile, projects] = await Promise.all([loadProfile(), loadProjects()]);
    const intro = document.querySelector('[data-profile-intro]');
    if (intro) intro.textContent = profile.introduction;
    const about = document.querySelector('[data-profile-about]');
    if (about) about.textContent = profile.about;
    const name = document.querySelector('[data-profile-name]');
    if (name) name.textContent = profile.displayName;

    const featured = normalizeProjects(projects).filter(project => project.featured).slice(0, 3);
    if (!featured.length) {
```

- `await`はPromiseの解決を待って次の行に進む。ブラウザ全体の動作を停止させる同期ブロックではない。
- 値をテキストとして表示するため、文字列にHTMLタグ風の記述があっても解釈しない。
- 配列の反復処理。mapは変換、filterは部分配列、findは最初の一致値、sortは並べ替えを担当する。

### L21–L30

```javascript
      list.replaceChildren(node('p', {className: 'muted-text', text: 'Projects will appear here when they are added to data/projects.json.'}));
      return;
    }
    list.replaceChildren(...featured.map(project => projectCard(project)));
  } catch (error) {
    console.error(error);
    showError(list, 'Could not load the portfolio data. Run the site through a local HTTP server.', renderHome);
  }
}

```

- 失敗系の分岐。正常系だけでなく取得エラー・形式不正のケースでもユーザーに表示すべき状態を決める。
- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。
- 配列の反復処理。mapは変換、filterは部分配列、findは最初の一致値、sortは並べ替えを担当する。

### L31–L31

```javascript
renderHome();
```

- この行群は`main.js`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

## 3. 主要な設計ポイントを深く理解する

### `Promise.all()`

profileとprojectsを同時に読み、両方の結果を配列として受け取る。順次awaitするより待機時間を節約できる可能性がある。

### `data-profile-*` 属性

固定HTMLにデータの差し込み先を用意し、JavaScriptがquerySelectorで参照する。装飾クラスとJS用のセレクタを分ける意図。

### `filter(...).slice(0,3)`

featured=trueのプロジェクトに絞り込み、最大3件を選ぶ。入力は検証・日付ソート済みの配列。

### `replaceChildren(...cards)`

新しいカード群をDOMへ置き換える。スプレッド構文で配列の各DOM要素を個別引数として渡している。

### `try/catch`

通信/JSON検証の失敗を捉え、利用者向けエラー表示に切り替える。内部詳細はconsole.errorへ残す。

## 4. 入力から出力まで追跡する例

`loadProjects()`が5件、うちfeaturedが3件の場合、`normalizeProjects`で検証と日付降順 → `filter`で3件 → `slice(0,3)`で3件 → `projectCard`で3ノード → `replaceChildren(...nodes)`で表示。

## 5. 自己確認ポイント

- このファイルは「トップページのJSON読み込みと描画」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

