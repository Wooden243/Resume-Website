# ポートフォリオの更新方法

このサイトの公開プロジェクトの正本は `data/projects.json` です。現在は `ml-algorithms` と `chatbot` の2件を掲載しています。

## プロジェクトの追加

`data/projects.json` の配列に新しいオブジェクトを追加します。既存の2件を参考に、以下のフィールドを設定してください。

- `id`：重複しない正の整数
- `slug`：重複しない小文字英数字とハイフン（詳細ページのURLに使用）
- `title`、`subtitle`、`summary`、`content`：タイトル・短い説明・詳細
- `challenge`、`approach`、`outcome`：課題、実装・実験の方法、観察と制約
- `stack`、`category`：使用技術とカテゴリー
- `year`、`date`：記録年・日付（`YYYY-MM-DD`）
- `featured`：トップページに表示するときは `true`
- `source`：実在するGitHubリポジトリのHTTPS URL
- `demo`：公開済みのデモURL。存在しなければ空文字
- `visual`：`bandit`、`chatbot`、その他は汎用のビジュアル

項目追加後は、カード・カテゴリ・検索・個別ページに反映されます。数値結果や説明は対応するソース・READMEで裏付けられるものだけを記入してください。

## プロフィール

`data/profile.json` から紹介文、スキル、選択したプロジェクトの概要を生成します。氏名・メールアドレスなどの個人情報や経歴を公開する場合は、公開範囲を事前に確認してください。現状はGitHubハンドルを使用しています。

## ローカル確認

```bash
python3 -m http.server 8000 --bind 127.0.0.1
bash scripts/verify.sh
```

ブラウザーでは、`index.html`、`projects/index.html`、`projects/detail.html?slug=ml-algorithms`、`projects/detail.html?slug=chatbot` を確認します。

ソースコードを変更した場合は、`learning/code-walkthrough/` の対応するコード全文・SHA-256も同期します。GitHub Pagesへの反映については [deployment.md](deployment.md) を参照してください。
