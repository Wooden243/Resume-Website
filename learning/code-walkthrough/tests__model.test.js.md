# tests/model.test.js — 全文と逐次解説

> **役割:** 検索・並べ替え・検証の単体テスト。
> **入力:** JSONのサンプルとモデル関数。
> **出力:** 自動テストの成否。
> **設計意図:** DOMなしで高速にテストできる。

> **SHA-256:** `a9910d684f2a442c170229c9ab43b8ab49dd570a0d4959a0551e3438f08a6fb6`（現行ソースとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {normalizeProjects, isValidProject, projectMatches, getProjectBySlug, categoriesOf, formatProjectDate} from '../assets/js/model.js';

const path = fileURLToPath(new URL('../data/projects.json', import.meta.url));
const data = JSON.parse(readFileSync(path, 'utf8'));

test('JSON is an array of valid projects', () => {
  assert.equal(data.length, 2);
  for (const project of data) assert.equal(isValidProject(project), true);
});
test('each slug and ID is unique', () => {
  assert.equal(new Set(data.map(p=>p.slug)).size, data.length);
  assert.equal(new Set(data.map(p=>p.id)).size, data.length);
});
test('normalizeProjects sorts descending without mutating input', () => {
  const clone = [...data];
  const sorted = normalizeProjects(data);
  assert.deepEqual(data, clone);
  for (let i=1; i<sorted.length; i++) assert.ok(sorted[i-1].date >= sorted[i].date);
});
test('normalizeProjects rejects duplicate slugs', () => {
  assert.throws(()=>normalizeProjects([...data, {...data[0],id:999}]), /Duplicate/);
});
test('normalizeProjects rejects malformed project', () => {
  assert.throws(()=>normalizeProjects([{title:'no id'}]), /Invalid/);
});
test('filters by category', () => {
  assert.equal(projectMatches(data[0], '', 'Machine Learning'), true);
  assert.equal(projectMatches(data[0], '', 'Web Application'), false);
});
test('search is case-insensitive and checks technology', () => {
  assert.equal(projectMatches(data[0], 'NUMPY'), true);
  assert.equal(projectMatches(data[0], 'python'), true);
  assert.equal(projectMatches(data[0], 'unmatched'), false);
});
test('empty search matches all projects', () => {
  assert.ok(data.every(p=>projectMatches(p, '   ')));
});
test('lookup existing and unknown slugs', () => {
  assert.equal(getProjectBySlug(data, data[1].slug).id, data[1].id);
  assert.equal(getProjectBySlug(data,'not-found'), null);
});
test('categories begin with All and contain unique names', () => {
  const cats=categoriesOf(data);
  assert.equal(cats[0], 'All');
  assert.equal(new Set(cats).size, cats.length);
});
test('valid date formats safely', () => {
  assert.equal(formatProjectDate('2026-04-10'), '2026年4月');
  assert.equal(formatProjectDate('bogus'), '日付未設定');
  assert.equal(formatProjectDate('2026-02-30'), '日付未設定');
});

test('featured projects link to verified GitHub source repositories', () => {
  assert.deepEqual(new Set(data.map(p => p.slug)), new Set(['ml-algorithms', 'chatbot']));
  assert.ok(data.every(p => p.featured && p.source.startsWith('https://github.com/Wooden243/')));
  assert.ok(data.every(p => !p.demo));
});

test('case studies publish structured metrics, workflows, and verifiable links', () => {
  for (const project of data) {
    assert.equal(project.highlights.length, 3);
    assert.ok(project.workflow.length >= 3);
    assert.ok(project.resources.length >= 3);
    assert.ok(project.resources.every(item => item.url.startsWith('https://github.com/Wooden243/')));
    assert.ok(project.highlights.every(item => item.value && item.label));
    assert.ok(project.workflow.every(item => item.title && item.detail));
  }
});
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {normalizeProjects, isValidProject, projectMatches, getProjectBySlug, categoriesOf, formatProjectDate} from '../assets/js/model.js';

const path = fileURLToPath(new URL('../data/projects.json', import.meta.url));
const data = JSON.parse(readFileSync(path, 'utf8'));

test('JSON is an array of valid projects', () => {
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。

### L11–L20

```javascript
  assert.ok(data.length >= 5);
  for (const project of data) assert.equal(isValidProject(project), true);
});
test('each slug and ID is unique', () => {
  assert.equal(new Set(data.map(p=>p.slug)).size, data.length);
  assert.equal(new Set(data.map(p=>p.id)).size, data.length);
});
test('normalizeProjects sorts descending without mutating input', () => {
  const clone = [...data];
  const sorted = normalizeProjects(data);
```

- 配列の反復処理。mapは変換、filterは部分配列、findは最初の一致値、sortは並べ替えを担当する。

### L21–L30

```javascript
  assert.deepEqual(data, clone);
  for (let i=1; i<sorted.length; i++) assert.ok(sorted[i-1].date >= sorted[i].date);
});
test('normalizeProjects rejects duplicate slugs', () => {
  assert.throws(()=>normalizeProjects([...data, {...data[0],id:999}]), /Duplicate/);
});
test('normalizeProjects rejects malformed project', () => {
  assert.throws(()=>normalizeProjects([{title:'no id'}]), /Invalid/);
});
test('filters by category', () => {
```

- この行群は`model.test.js`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L31–L40

```javascript
  assert.equal(projectMatches(data[0], '', 'Web App'), true);
  assert.equal(projectMatches(data[0], '', 'Data UI'), false);
});
test('search is case-insensitive and checks technology', () => {
  assert.equal(projectMatches(data[0], 'FOODIE'), true);
  assert.equal(projectMatches(data[0], 'javascript'), true);
  assert.equal(projectMatches(data[0], 'unmatched'), false);
});
test('empty search matches all projects', () => {
  assert.ok(data.every(p=>projectMatches(p, '   ')));
```

- この行群は`model.test.js`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L41–L50

```javascript
});
test('lookup existing and unknown slugs', () => {
  assert.equal(getProjectBySlug(data, data[1].slug).id, data[1].id);
  assert.equal(getProjectBySlug(data,'not-found'), null);
});
test('categories begin with All and contain unique names', () => {
  const cats=categoriesOf(data);
  assert.equal(cats[0], 'All');
  assert.equal(new Set(cats).size, cats.length);
});
```

- この行群は`model.test.js`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L51–L54

```javascript
test('valid date formats safely', () => {
  assert.equal(formatProjectDate('2026-04-10'), 'April 2026');
  assert.equal(formatProjectDate('bogus'), 'Date not set');
});
```

- この行群は`model.test.js`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

## 3. 主要な設計ポイントを深く理解する

### 関数呼び出し

引数が何か、戻り値は何かを出力側から逆向きに調べる。

### 状態と副作用

副作用がある関数では、実行前後の値とDOM変化を追う。

## 4. 入力から出力まで追跡する例

例: `bash scripts/verify.sh`を実行すると、Node.jsの単体/静的構造テストとPython HTTPテストが順に走る。どれか一つでも失敗すれば非ゼロの終了コードで停止する。

## 5. 自己確認ポイント

- このファイルは「検索・並べ替え・検証の単体テスト」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

