# 成果物の追加・編集ガイド

公開データの正本は`data/projects.json`です。現在は`ml-algorithms`と`chatbot`の2件が登録されています。

## 作品の追加

配列に新しいオブジェクトを追加します。最低限、`id`（重複のない正の整数）、`slug`（小文字英数字とハイフン、重複不可）、`title`、`summary`、`content`、`stack`（配列）、`category`を設定してください。既存のエントリをコピーすると安全です。

| フィールド | 用途 |
|---|---|
| `title`、`subtitle`、`summary`、`content` | 作品名、短い要約、詳細 |
| `challenge`、`approach`、`outcome` | 課題、手法・実装方法、結果と制約 |
| `year`、`date` | 作品の記録年・日付（`YYYY-MM-DD`） |
| `featured` | トップページへ掲載するとき`true` |
| `stack`、`category` | 使用技術、カテゴリ絞り込み |
| `source`、`demo` | GitHubソースURLと、実在する場合だけデモURL。なければ空文字 |
| `highlights` | `[{ "value": "9", "label": "実験条件" }]` など、裏付け可能な主要指標 |
| `workflow` | `[{ "title": "設計", "detail": "..." }]` など、工程・処理構成 |
| `resources` | `[{ "label": "実験CSV", "url": "https://..." }]` など、一次資料 |
| `visual` | `bandit`、`chatbot`、未定義値は汎用デザイン |

`highlights`、`workflow`、`resources`が省略された場合も、共通詳細ページは他の項目を表示します。外部リンクはHTTPSで指定し、各詳細ページの内容を確認してください。

### 記載上の基準

実装したことと今後やりたいことを混同しないでください。数値実験は条件・試行数・乱数シード・限界を確認してください。テストの成功件数は実行記録に裏付けられるときのみ記載し、運用経験や業務経験を推測して追加しないでください。

## プロフィール

`data/profile.json`に紹介文と使用技術を記述します。個人メール・氏名・学歴等の公開は任意です。現在の公開情報はGitHubハンドルを中心にしています。

## 検証

```bash
python3 -m http.server 8000 --bind 127.0.0.1
bash scripts/verify.sh
```

ブラウザーでトップページ、作品一覧、`projects/detail.html?slug=ml-algorithms`、`projects/detail.html?slug=chatbot`、About、Guide、404を確認します。作品の追加時は必要に応じて`sitemap.xml`へ詳細URLを追加してください。コードを変更した場合は`learning/code-walkthrough/`の対応するソース全文とSHA-256を同期し、テストを再実行してください。
