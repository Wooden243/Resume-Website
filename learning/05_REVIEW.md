# 05 | 学習確認・演習と模範解答

## 問題（解答を見ずに考える）

1. `data/projects.json`はHTMLを直接表示するか。表示までの実際の流れを説明せよ。
2. `filter()`と`find()`では何が返るか。今回どのファイルで使うか。
3. `projectMatches(project,'budget','All')`はどのフィールドを検索するか。
4. `await response.json()`を実行する前に`response.ok`を確認する理由を述べよ。
5. `textContent`と`innerHTML`の違いをXSSの観点から説明せよ。
6. `projects/detail.html?slug=foodie-finder`の`slug`はどこで取り出されるか。
7. `normalizeProjects(projects)`で`[...projects]`とする理由は何か。
8. `Promise.all([loadProfile(),loadProjects()])`がどのような利点を持つか。
9. レスポンシブデザインにより3列から1列になるのはどの種類のコードか。
10. GitHubにソースをpushしたら独自ドメインとHTTPSが自動的に完成するか。
11. （演習）プロジェクトを1件追加する場合、ファイルを何個変更する必要があるか。
12. （演習）ホームに表示するおすすめ件数を3→2へ変更するにはどこを編集するか。
13. （演習）検索結果が0件の場合、サイトには何が表示されるか。
14. （デバッグ）`SyntaxError: Unexpected token`がJSONの取得時に出た。どう調べるか。
15. （デバッグ）プロジェクト詳細へのリンクから該当ページが見つからない。確認箇所を挙げよ。

---

## 模範解答と解説

### 1. JSONは直接描画しない

JSONはデータだけ。`data.js`が`fetch()`で取得し、JSオブジェクトに変換、`model.js`が検証・選択、`dom.js`が`document.createElement`でDOMを生成、`replaceChildren`で表示する。HTMLはあらかじめ受け皿となる要素を持つ。

### 2. filterとfind

`filter()`は条件を満たす要素を並べた**新しい配列**（0件なら`[]`）を返す。`find()`は最初の一致要素（なければ`undefined`）を返す。前者は一覧の絞り込み、後者は特定slugの詳細に用いる。`model.js`に両方の実装がある。

### 3. 検索対象

`title`、`summary`、`category`、`stack`の要素を結合したテキスト。小文字化して部分一致を判定する。`content`全文は現在検索しない点に注意。

### 4. response.ok

`fetch`はHTTP 404/500でもレスポンス自体が届くと正常終了することが多い。失敗したレスポンスを本来のJSONとして処理すると原因が曖昧になるため、HTTPステータスを先に検査し、エラーをthrowしている。

### 5. textContentとinnerHTML

`textContent`は文字列を文字としてDOMへ入れる。`innerHTML`はHTMLとして解釈するので、不適切なエスケープのある外部入力が実行可能なマークアップになり得る。プロジェクト名や説明文の表示は`textContent`を優先する。

### 6. slugの取り出し

`detail.js`で`new URLSearchParams(window.location.search).get('slug')`。ここで`window.location.search`は現在URLの`?`以降の部分。`model.js`の`getProjectBySlug`が配列内を探す。

### 7. コピーする理由

`Array.prototype.sort`は元の配列を書き換えるため、呼び出し元で保有するデータの順序へ副作用が生じる。`[...projects]`で浅いコピーを作ってからソートすることで回避している。

### 8. Promise.allの効果

プロフィールと作品データは相互依存しないので、2つのHTTP要求を並行に進められる。両方成功した後に描画する設計。どちらか失敗した場合は`catch`でエラー表示される。

### 9. media query

`styles.css`にある`@media (max-width: 960px)`で2列、`@media (max-width: 720px)`で1列へ変わる。HTMLを別ページに分けず同一の内容をレイアウトだけ変更する。

### 10. 自動ではない

GitHubにpushしただけでは公開されない。Pagesの有効化、Actionsの成功確認が必要。独自ドメインはドメインの所有・DNS設定とTLS証明書の処理が別途必要。`docs/deployment.md`参照。

### 11. 1つ

基本的には`data/projects.json`に**新しいオブジェクトを1件追加**するだけ。`id`/`slug`は一意、必須プロパティが必要。既存の詳細HTMLをコピーする必要はない。`source`や`demo`は実在するHTTPS URLを入れるか空文字列にする。

### 12. main.js

`normalizeProjects(projects).filter(project=>project.featured).slice(0,3)`の`.slice(0,3)`を`.slice(0,2)`に変更する。ただしテストが固定の件数を想定していないか確認すること。

### 13. Nothing found

`projects.js`の`renderList`で該当0件の場合、`status-panel`に`Nothing found`と再検索を促す文章を表示する。`project-count`は`0 of 5 projects`に変わる。

### 14. JSON構文検査

`python3 -m json.tool data/projects.json`で文法を調べる。DevTools Networkで取得したレスポンスが実際にJSONか（404 HTMLを読んでいないか）も確認する。

### 15. slug・配信・JSON

URLの`slug`値、`projects.json`の`slug`、読み込み時のConsoleエラー、JSON HTTPステータスを調べる。無効なslugでは通常`Project not found`が表示される。HTTP 404の場合はHTMLファイルの配信自体ができていない可能性。

## 追加演習（自分で修正して再テスト）

- 検索対象へ`subtitle`を追加する。`model.js`のどこを変更するか考え、Nodeテストを1件追加する。
- `year`で昇順/降順を切り替えるセレクトを追加する。**ソート対象はコピー**する。
- 表示中プロジェクト数のアナウンス改善や空検索時の状態表示を工夫する。
- 関係ないテキストへ`<script>`の文字列を含むプロジェクトを追加し、DOMにテキストとして表示されることを確認する。

変更の前後に`bash scripts/verify.sh`を実行して、既存機能を壊していないかを確認する。
