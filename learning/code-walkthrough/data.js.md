# assets/js/data.js — 全文と逐次解説

> **役割:** JSONとHTTPの橋渡し。
> **入力:** Browserのfetch / response.json()。
> **出力:** Promiseとして取得データ。
> **設計意図:** サーバー側にはローカルHTTP配信のみ必要。

> **SHA-256:** `b886041c53ff0bf5e93c2ac4a882f9fe466feaf40273d443c9519c670b9a6d51`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```javascript
/** Data access layer. URLs derive from this module location, so GitHub Pages subpaths work. */
const PROJECTS_URL = new URL('../../data/projects.json', import.meta.url);
const PROFILE_URL = new URL('../../data/profile.json', import.meta.url);

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Could not load ${url.pathname}: HTTP ${response.status}`);
  return response.json();
}

export async function loadProjects() {
  const raw = await fetchJson(PROJECTS_URL);
  if (!Array.isArray(raw)) throw new TypeError('projects.json must contain an array');
  return raw;
}

export async function loadProfile() {
  const raw = await fetchJson(PROFILE_URL);
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new TypeError('profile.json must contain an object');
  }
  return raw;
}
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```javascript
/** Data access layer. URLs derive from this module location, so GitHub Pages subpaths work. */
const PROJECTS_URL = new URL('../../data/projects.json', import.meta.url);
const PROFILE_URL = new URL('../../data/profile.json', import.meta.url);

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Could not load ${url.pathname}: HTTP ${response.status}`);
  return response.json();
}

```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。
- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。
- `await`はPromiseの解決を待って次の行に進む。ブラウザ全体の動作を停止させる同期ブロックではない。
- 失敗系の分岐。正常系だけでなく取得エラー・形式不正のケースでもユーザーに表示すべき状態を決める。

### L11–L20

```javascript
export async function loadProjects() {
  const raw = await fetchJson(PROJECTS_URL);
  if (!Array.isArray(raw)) throw new TypeError('projects.json must contain an array');
  return raw;
}

export async function loadProfile() {
  const raw = await fetchJson(PROFILE_URL);
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new TypeError('profile.json must contain an object');
```

- `export`された定義は、他のモジュールから`import`して再利用できる。
- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。
- `await`はPromiseの解決を待って次の行に進む。ブラウザ全体の動作を停止させる同期ブロックではない。
- 失敗系の分岐。正常系だけでなく取得エラー・形式不正のケースでもユーザーに表示すべき状態を決める。

### L21–L23

```javascript
  }
  return raw;
}
```

- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。

## 3. 主要な設計ポイントを深く理解する

### `new URL` と `import.meta.url`

実行中のJSファイルのURLを起点に`../../data/`を解決する。GitHub Pagesの `/Resume-Website/` サブパスから開いた場合でもURLが崩れない。ここを`/data/`に変えるとサブパス配信で404になり得る。

### `async function fetchJson(url)`

HTTP取得をまとめる共通関数。引数`url`はURLオブジェクト、戻り値はJSONの解析結果を表すPromise。`fetch`の戻り値はResponseではなくPromise<Response>であり`await`が解決する。

### `response.ok`

ネットワーク接続成功だけではHTTP 404や500は捕捉できない。okがfalseならErrorをthrowし、呼び出し側のcatchにエラーを伝える。

### `response.json()`

HTTP本文のJSONテキストをJS配列・Objectへ変換する非同期処理。JSON構文が不正でもrejectする。

### `Array.isArray` と型検証

期待する形が崩れたときに、画面描画の途中で意味不明なTypeErrorになる前にデータ層で検出できる。

## 4. 入力から出力まで追跡する例

`loadProjects()` → `fetchJson(PROJECTS_URL)` → `fetch()`がHTTPリクエスト → HTTP 200で`ok===true` → `response.json()` → JS配列を返す。HTTP 404でErrorをthrowし、ページ側のcatchへ伝える。

## 5. 自己確認ポイント

- このファイルは「JSONとHTTPの橋渡し」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

