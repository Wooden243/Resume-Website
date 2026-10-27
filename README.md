# Wooden243 — Technical Portfolio

機械学習アルゴリズムの実装・数値実験と、Webアプリケーション開発の成果物をまとめる静的ポートフォリオです。掲載内容は公開済みのGitHubコード・資料で裏付けられる範囲に限定しています。

## 公開プロジェクト

| プロジェクト | 内容 | GitHub |
| --- | --- | --- |
| Machine Learning Algorithms & Experiments | 予算制約付き多腕バンディットに対するε-greedy法の実装、9条件×各5,000試行の実験と解説 | [ml-algorithms](https://github.com/Wooden243/ml-algorithms) |
| ChatBot — Full-Stack Web Application | Next.js・FastAPI・SQLite・OpenAI APIによる会話履歴付きチャットアプリ、API/E2Eテスト | [chatbot](https://github.com/Wooden243/chatbot) |

`ml-algorithms` は教育・実験用途の実装で、深層強化学習モデルや新規の研究手法を実装したものではありません。`chatbot` はローカル単一ユーザー向けの開発成果であり、公開サービスの運用実績はありません。

## サイト構成

| 場所 | 内容 |
| --- | --- |
| `index.html` | トップページと2件の注目プロジェクト |
| `projects/index.html` | カテゴリ・キーワード検索付き作品一覧 |
| `projects/detail.html?slug=...` | 共通詳細ページ（概要・課題・実装・結果・GitHubリンク） |
| `resume/index.html` | About・Skills・掲載作品の概要 |
| `data/projects.json` | 作品のタイトル、技術スタック、説明、URLの正本 |
| `data/profile.json` | GitHubユーザー名、紹介文、使用技術の正本 |
| `assets/js/` | DOM生成、表示、データ取得、検索ロジック |
| `assets/css/styles.css` | レスポンシブな表示スタイル |

HTML/CSS/JavaScript（ES modules）の静的サイトです。データをJSONから読み込むため、プレビューはHTTPサーバー経由で行ってください。ブラウザー用ランタイムパッケージの導入は不要です。

## ローカルプレビュー

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

`http://127.0.0.1:8000/` を開きます。`file://` から直接開くとJSONの `fetch()` が失敗する場合があります。

## テスト

```bash
bash scripts/verify.sh
```

Node.jsのテストとPythonのHTTPテスト、静的ファイル参照の検証を実行します。テスト実行環境にはNode.jsとPythonが必要です。

## 成果物の追加

`data/projects.json` に一意の `id`・`slug` を持つ実際の成果物を追加すると、作品一覧・検索・詳細ページへ自動反映されます。確認できないデモリンク・実績・評価値は掲載しません。 [編集ガイド](docs/customization.md)を参照してください。

## GitHub Pages

`.github/workflows/deploy.yml` に静的サイトの自動デプロイ定義があります。リポジトリの **Settings → Pages** でSourceを **GitHub Actions** に設定する必要があります。設定が有効なら、`main` へのpushでデプロイが起動します。 [公開ガイド](docs/deployment.md)を参照してください。デプロイ成功とURLの到達性はGitHub Actions側で別途確認してください。

## 学習資料について

`learning/` 以下には初期テンプレートの構築・改修用の解説も残しています。対応するソース全文とSHA-256は更新していますが、一部の設例・解説は初期テンプレートを参照します。**現在表示する公開成果物の正本は `data/projects.json` です。**

個人メールアドレス、実名、未確認の就業歴、サンプル履歴書PDFを公開画面に表示しません。リポジトリ内に残る `assets/sample-resume.pdf` は初期テンプレートの未使用ファイルであり、現行サイトからリンクしていません。
