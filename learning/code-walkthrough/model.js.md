# assets/js/model.js — 全文と逐次解説

> **役割:** データ検査・検索・並べ替え。
> **入力:** JSON配列・検索条件。
> **出力:** 新しい配列 / 真偽値 / 個別Project。
> **設計意図:** documentを使わないためNodeテスト可。

> **SHA-256:** `a5bfb75ffaabf74c4c52570d380a50ab6160f14fb848cf9a4300ac5dec82516f`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```javascript
/** Pure functions: safe to import in Node tests without any browser globals. */
export function isValidProject(project) {
  return Boolean(project && typeof project === 'object' &&
    Number.isSafeInteger(project.id) && project.id > 0 &&
    typeof project.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) &&
    typeof project.title === 'string' && project.title.trim() &&
    typeof project.summary === 'string' &&
    typeof project.content === 'string' &&
    Array.isArray(project.stack) && project.stack.every(item => typeof item === 'string'));
}

export function normalizeProjects(projects) {
  if (!Array.isArray(projects)) throw new TypeError('Expected projects array');
  const slugs = new Set();
  const ids = new Set();
  for (const project of projects) {
    if (!isValidProject(project)) throw new TypeError('Invalid project entry in projects.json');
    if (slugs.has(project.slug) || ids.has(project.id)) throw new Error('Duplicate project ID or slug');
    slugs.add(project.slug);
    ids.add(project.id);
  }
  return [...projects].sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? '')));
}

export function projectMatches(project, query = '', category = 'All') {
  const search = String(query).trim().toLocaleLowerCase();
  const categoryMatches = category === 'All' || project.category === category;
  if (!categoryMatches) return false;
  if (!search) return true;
  return [project.title, project.summary, project.category, ...project.stack]
    .join(' ').toLocaleLowerCase().includes(search);
}

export function getProjectBySlug(projects, slug) {
  return projects.find(project => project.slug === slug) ?? null;
}

export function categoriesOf(projects) {
  return ['All', ...new Set(projects.map(project => project.category).filter(Boolean))];
}

export function formatProjectDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return '日付未設定';
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '日付未設定';
  if (date.toISOString().slice(0, 10) !== value) return '日付未設定';
  return new Intl.DateTimeFormat('ja-JP', {year: 'numeric', month: 'long', timeZone: 'UTC'}).format(date);
}
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```javascript
/** Pure functions: safe to import in Node tests without any browser globals. */
export function isValidProject(project) {
  return Boolean(project && typeof project === 'object' &&
    Number.isSafeInteger(project.id) && project.id > 0 &&
    typeof project.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) &&
    typeof project.title === 'string' && project.title.trim() &&
    typeof project.summary === 'string' &&
    typeof project.content === 'string' &&
    Array.isArray(project.stack) && project.stack.every(item => typeof item === 'string'));
}
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。
- `export`された定義は、他のモジュールから`import`して再利用できる。
- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。

### L11–L20

```javascript

export function normalizeProjects(projects) {
  if (!Array.isArray(projects)) throw new TypeError('Expected projects array');
  const slugs = new Set();
  const ids = new Set();
  for (const project of projects) {
    if (!isValidProject(project)) throw new TypeError('Invalid project entry in projects.json');
    if (slugs.has(project.slug) || ids.has(project.id)) throw new Error('Duplicate project ID or slug');
    slugs.add(project.slug);
    ids.add(project.id);
```

- `export`された定義は、他のモジュールから`import`して再利用できる。
- 失敗系の分岐。正常系だけでなく取得エラー・形式不正のケースでもユーザーに表示すべき状態を決める。

### L21–L30

```javascript
  }
  return [...projects].sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? '')));
}

export function projectMatches(project, query = '', category = 'All') {
  const search = String(query).trim().toLocaleLowerCase();
  const categoryMatches = category === 'All' || project.category === category;
  if (!categoryMatches) return false;
  if (!search) return true;
  return [project.title, project.summary, project.category, ...project.stack]
```

- `export`された定義は、他のモジュールから`import`して再利用できる。
- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。
- 配列の反復処理。mapは変換、filterは部分配列、findは最初の一致値、sortは並べ替えを担当する。

### L31–L40

```javascript
    .join(' ').toLocaleLowerCase().includes(search);
}

export function getProjectBySlug(projects, slug) {
  return projects.find(project => project.slug === slug) ?? null;
}

export function categoriesOf(projects) {
  return ['All', ...new Set(projects.map(project => project.category).filter(Boolean))];
}
```

- `export`された定義は、他のモジュールから`import`して再利用できる。
- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。
- 配列の反復処理。mapは変換、filterは部分配列、findは最初の一致値、sortは並べ替えを担当する。

### L41–L47

```javascript

export function formatProjectDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return 'Date not set';
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return 'Date not set';
  return new Intl.DateTimeFormat('en', {year: 'numeric', month: 'long', timeZone: 'UTC'}).format(date);
}
```

- `export`された定義は、他のモジュールから`import`して再利用できる。
- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。

## 3. 主要な設計ポイントを深く理解する

### `isValidProject(project)`

Projectの必須フィールドと型を確認する。Boolean()で結果を明確なtrue/falseへ変換。slug正規表現はURLに使いやすい小文字英数字とハイフンに限定。

### `normalizeProjects(projects)`

配列の検証と並べ替えを組み合わせる。Setで重複ID/slugを検出し、エラーにする。`[...projects]`で浅いコピーを取り、元配列を直接sortしない。

### `projectMatches(project, query, category)`

クエリをtrimして小文字化し、カテゴリ一致と部分文字列検索を組み合わせる。戻り値はBoolean。categoryがAllならカテゴリ条件を無効化する。

### `getProjectBySlug`

Array.findは該当最初の要素を返し、見つからなければundefined。本実装は`?? null`で「見つからない」をnullへ統一。

### `categoriesOf`

Setでカテゴリの重複を除き、先頭にAllを加えた配列を作る。

### `formatProjectDate`

正規表現で日付らしさを確認し、UTCで日時パースしてIntl.DateTimeFormatで英語の年月に整える。無効値では日付未設定を返す。

## 4. 入力から出力まで追跡する例

`projectMatches({title:"BudgetMaster",summary:"budget overview",category:"Data UI",stack:["JS"]}, "BUDGET", "All")`は、検索語を`budget`へ小文字化して部分一致し`true`を返す。カテゴリーが`Web App`なら`false`。

## 5. 自己確認ポイント

- このファイルは「データ検査・検索・並べ替え」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

