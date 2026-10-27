# tests/structure.test.js — 全文と逐次解説

> **役割:** HTML・ファイル・PDFの構造検査。
> **入力:** プロジェクト内の静的ファイル。
> **出力:** 構造検査の成否。
> **設計意図:** 必要なファイルがZIPにあるか確認。

> **SHA-256:** `07da83d30a67739f5b99c33bd5c6724e983be08fba8540ede3d3787de72734a0`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../', import.meta.url));
const files=['index.html','projects/index.html','projects/detail.html','resume/index.html','guide.html'];
function contents(p){return readFileSync(new URL(`../${p}`,import.meta.url),'utf8');}

test('all pages have semantic main content, viewport, and stylesheet',()=>{
 for(const file of files){
  const html=contents(file);
  assert.match(html,/<main id="main">/);
  assert.match(html,/<meta name="viewport"/);
  assert.match(html,/<link rel="stylesheet"/);
  assert.match(html,/<nav class="site-nav"/);
  assert.match(html,/<title>/);
 }
});
test('projects listing fetches JSON via import module',()=>{
 assert.match(contents('projects/index.html'),/src="\.\.\/assets\/js\/projects\.js"/);
 assert.match(contents('assets/js/data.js'),/projects\.json/);
});
test('public metadata and 404 page exist',()=>{
 for(const name of ['sitemap.xml','robots.txt','404.html']) {
  assert.ok(statSync(new URL(`../${name}`,import.meta.url)).size>20);
 }
});
test('no absolute asset links (works under repository subpath)',()=>{
 for(const file of files){
  const html=contents(file);
  assert.doesNotMatch(html,/(?:href|src)="\/(?!\/)/);
 }
});
test('HTML pages have no inline script and project rendering avoids innerHTML',()=>{
 for(const file of files){assert.doesNotMatch(contents(file),/<script(?![^>]*src=)[^>]*>/);}
 for(const path of ['assets/js/main.js','assets/js/projects.js','assets/js/detail.js','assets/js/resume.js','assets/js/dom.js']){
  assert.doesNotMatch(contents(path),/\.innerHTML\s*=/);
 }
});
test('repository includes documentation and deployment workflow',()=>{
 for(const file of ['docs/deployment.md','.github/workflows/deploy.yml','learning/00_START_HERE.md']) {
  assert.ok(statSync(new URL(`../${file}`,import.meta.url)).size>20);
 }
});
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../', import.meta.url));
const files=['index.html','projects/index.html','projects/detail.html','resume/index.html','guide.html'];
function contents(p){return readFileSync(new URL(`../${p}`,import.meta.url),'utf8');}

test('all pages have semantic main content, viewport, and stylesheet',()=>{
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。
- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。

### L11–L20

```javascript
 for(const file of files){
  const html=contents(file);
  assert.match(html,/<main id="main">/);
  assert.match(html,/<meta name="viewport"/);
  assert.match(html,/<link rel="stylesheet"/);
  assert.match(html,/<nav class="site-nav"/);
  assert.match(html,/<title>/);
 }
});
test('projects listing fetches JSON via import module',()=>{
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。
- `main`は文書の主要コンテンツを示す意味的なHTMLタグ。スキップリンクの着地点でもある。
- `nav`はページ移動の主要なリンク群を表し、aria-labelで用途を補う。

### L21–L30

```javascript
 assert.match(contents('projects/index.html'),/src="\.\.\/assets\/js\/projects\.js"/);
 assert.match(contents('assets/js/data.js'),/projects\.json/);
});
test('resume PDF exists and has PDF signature',()=>{
 const path=new URL('../assets/sample-resume.pdf',import.meta.url);
 const pdf=readFileSync(path);
 assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
 assert.ok(pdf.length>2500);
});
test('no absolute asset links (works under repository subpath)',()=>{
```

- この行群は`structure.test.js`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L31–L40

```javascript
 for(const file of files){
  const html=contents(file);
  assert.doesNotMatch(html,/(?:href|src)="\/(?!\/)/);
 }
});
test('HTML pages have no inline script and project rendering avoids innerHTML',()=>{
 for(const file of files){assert.doesNotMatch(contents(file),/<script(?![^>]*src=)[^>]*>/);}
 for(const path of ['assets/js/main.js','assets/js/projects.js','assets/js/detail.js','assets/js/resume.js','assets/js/dom.js']){
  assert.doesNotMatch(contents(path),/\.innerHTML\s*=/);
 }
```

- `type="module"`はES Modulesを有効化する。読み込み先のJSがimportにより必要なモジュールを解決する。

### L41–L46

```javascript
});
test('repository includes documentation and deployment workflow',()=>{
 for(const file of ['docs/deployment.md','.github/workflows/deploy.yml','learning/00_START_HERE.md']) {
  assert.ok(statSync(new URL(`../${file}`,import.meta.url)).size>20);
 }
});
```

- この記述はGitHub Actionsの処理定義。リポジトリ作成だけでは自動的に稼働するわけではない。

## 3. 主要な設計ポイントを深く理解する

### 関数呼び出し

引数が何か、戻り値は何かを出力側から逆向きに調べる。

### 状態と副作用

副作用がある関数では、実行前後の値とDOM変化を追う。

## 4. 入力から出力まで追跡する例

例: `bash scripts/verify.sh`を実行すると、Node.jsの単体/静的構造テストとPython HTTPテストが順に走る。どれか一つでも失敗すれば非ゼロの終了コードで停止する。

## 5. 自己確認ポイント

- このファイルは「HTML・ファイル・PDFの構造検査」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

