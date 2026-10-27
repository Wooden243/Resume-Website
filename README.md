# Wooden243 / mysite

機械学習アルゴリズムの実装・数値実験と、ソフトウェア開発成果をまとめた**技術ポートフォリオ**です。

**サイト:** https://wooden243.github.io/mysite/  
**作品一覧:** https://wooden243.github.io/mysite/projects/  
**掲載基準:** GitHub上で公開済みのコード・実験結果・テスト・技術資料に裏付けられる内容のみ。

## Featured projects

| 成果物 | 技術・実装内容 | 元リポジトリ |
|---|---|---|
| Machine Learning Algorithms & Experiments | Python/NumPyによるε-greedy多腕バンディット、9条件×各5,000試行の予算・破産リスク評価、数式解説 | [ml-algorithms](https://github.com/Wooden243/ml-algorithms) |
| ChatBot — Full-Stack Web Application | Next.js・TypeScript・FastAPI・SQLite・OpenAI APIの連携、会話管理、履歴永続化、API/E2Eテスト | [chatbot](https://github.com/Wooden243/chatbot) |

各作品の詳細ページには**問題設定→処理構成→実装・検証→結果と制約**に加え、実験条件やシステム構成のハイライト、一次資料・ソースコードへのリンクを掲載しています。誇張を避けるため、シミュレーション結果は特定の実験条件での観察として扱い、AI APIの実通信や公開サービスの運用実績は主張しません。

## 構成と設計

- `index.html`: トップページと代表作品
- `projects/index.html`: 全作品、カテゴリ・キーワード検索（条件をURLに保持）
- `projects/detail.html?slug=...`: 作品共通の詳細ページと根拠資料
- `resume/index.html`: About / Skills / 作品の概要
- `guide.html`: 実装範囲・サイト構成・更新方法の公開ガイド
- `404.html` / `robots.txt` / `sitemap.xml`: フォールバックと検索エンジン向けメタデータ
- `data/projects.json` / `data/profile.json`: 表示データの正本
- `assets/js/`: JSON取得、検索、DOM生成、ページ表示
- `assets/css/styles.css`: レスポンシブ・キーボード操作・印刷を考慮したスタイル
- `learning/`: ソース全文とSHA-256を含む学習資料（初期テンプレート由来の解説を含むため、現行仕様は上記の正本を参照）

**技術:** HTML / CSS / JavaScript ES modules、ビルド不要の静的サイト。ユーザーデータ送信機能・Cookie・サイト独自の外部APIキーはありません。文字列は基本的に`textContent`で描画します。

## ローカルで実行

```bash
git clone https://github.com/Wooden243/mysite.git
cd mysite
python3 -m http.server 8000 --bind 127.0.0.1
```

`http://127.0.0.1:8000/` にアクセスします。JSONを`fetch()`するため、`file://`で直接HTMLを開く方法は推奨しません。

## テスト

Node.js（18以降）とPython 3を用意し、以下を実行します。

```bash
bash scripts/verify.sh
```

作品データ、検索・ソート、HTML構成、HTTP応答、内部参照・JS import、学習資料の全文・SHA-256同期を検査します。PR時と`main`へのpush時はGitHub Actionsの**Verify portfolio**を実行します。ブラウザーによる画面の目視・外部リポジトリのリンク到達性は別途確認が必要です。

## 作品の追加・更新

`data/projects.json`に`id`・`slug`が一意のエントリを追加します。通常の説明項目のほか、次の配列を任意で指定できます。

| フィールド | 内容 |
|---|---|
| `highlights` | `{ "value": "...", "label": "..." }`：主要な数値または仕様 |
| `workflow` | `{ "title": "...", "detail": "..." }`：実験手順やアプリケーション構成 |
| `resources` | `{ "label": "...", "url": "https://..." }`：ソース・検証資料 |

詳しくは[編集ガイド](docs/customization.md)を参照してください。

## デプロイ

`.github/workflows/deploy.yml`が`main`更新時にGitHub Pagesへデプロイします。配信アーティファクトには**公開サイト本体のみ**を含め、教材・テスト・開発用文書・サンプル履歴書PDFは含めません。詳しくは[公開手順](docs/deployment.md)を参照してください。

## プライバシーと掲載範囲

氏名、個人メールアドレス、架空の職歴、未確認の学位等は掲載していません。プロフィールはGitHubハンドル`Wooden243`を使用します。各プロジェクトのコード・実験記録はそれぞれの元リポジトリで管理しています。
