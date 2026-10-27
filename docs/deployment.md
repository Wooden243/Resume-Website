# 公開・デプロイ手順（GitHub Pages）

このサイトは静的HTML・CSS・JavaScriptで実装されています。現在のリポジトリ名は`Wooden243/mysite`です。

**公開URL（想定）:** https://wooden243.github.io/mysite/

## GitHub Actionsによる公開

1. [Settings → Pages](https://github.com/Wooden243/mysite/settings/pages)で**Source = GitHub Actions**を指定します。
2. `main`へ変更をマージすると`.github/workflows/deploy.yml`が実行されます。Actionsタブで`Deploy portfolio to GitHub Pages`の結果を確認します。
3. 上記URLへアクセスし、トップ、`projects/`、`resume/`、`guide.html`、`projects/detail.html?slug=ml-algorithms`、`projects/detail.html?slug=chatbot`の表示を確認します。
4. ブラウザーの開発者ツールで`data/projects.json`などの読み込みが成功しているか確認します。

従来の`Resume-Website`ではなく**`mysite`**をURLパスに使用します。GitHub Pagesのリポジトリ名変更時に、以前のPages URLが必ず転送されるとは限りません。

## 配信対象とプライバシー

ワークフローは`_site/`へ公開用HTML、CSS、JS、favicon、作品・プロフィールJSON、404、robots、sitemapだけをコピーします。`tests/`、`learning/`、`docs/`、開発用スクリプト、サンプルPDFは配信アーティファクトに含めません。ソースリポジトリ上には開発用ファイルが引き続き残ります。

リポジトリのデータファイルは公開情報です。個人情報、APIキー、認証情報、未公開の成果物を格納しないでください。

## 公開後の確認

- HTTPSとサイト内リンクが正常に動作する。
- 2つの作品カードを開くと、構成・評価・根拠資料へのリンクを表示する。
- 検索語やカテゴリを変更すると一覧が絞り込まれる。
- モバイル幅でもページやナビゲーションに横スクロールが発生しない。
- 未知のパスでは404ページが表示される。
- [robots.txt](https://wooden243.github.io/mysite/robots.txt)と[sitemap.xml](https://wooden243.github.io/mysite/sitemap.xml)へ到達できる。

## カスタムドメイン（任意）

独自ドメインは所有権とDNS設定が必要です。GitHub Pagesの**Custom domain**を設定し、サブドメインでは一般にCNAMEを`wooden243.github.io`へ向けます。証明書が発行されたらEnforce HTTPSを有効にします。DNS・HTTPSは外部プロバイダーの状態に依存するため、本リポジトリだけでは成功を保証できません。

詳細は[GitHub Pages公式ドキュメント](https://docs.github.com/en/pages)を参照してください。
