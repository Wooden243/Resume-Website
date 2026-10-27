# ソースコードの写本と学習用解説

このディレクトリには、当初の学習用テンプレートから引き継いだ主要なHTML・CSS・JavaScript・JSON・テスト・デプロイ設定の**ソース全文**と解説を収録しています。

各ファイルの第1章に収録した実装ソース全文およびSHA-256は、`tests/test_materials.py`で現行ソースと突き合わせています。一方、第2章以降の一部の解説や図示例には、初期テンプレート時代の作品名・操作例・サンプルPDFなどの記述が残ることがあります。これらは**現行の公開ポートフォリオの説明ではありません**。

現在の構成・機能・プロジェクトの正本は、[トップREADME](../../README.md)、[作品JSON](../../data/projects.json)、[編集ガイド](../../docs/customization.md)、実装ソースを優先してください。

## 読む順序

1. `data.js.md` → `model.js.md`: JSONの読み込みとデータ検証・検索
2. `dom.js.md` → `projects.js.md` → `detail.js.md`: DOM生成と作品一覧・詳細表示
3. `main.js.md` → `resume.js.md` → `site.js.md`: ホーム、About、共通操作
4. `styles.css.md`、各HTMLの写本: レスポンシブ表示とページ構成
5. `tests__model.test.js.md`など: 自動検証

ソースと学習用写本の更新方法は[ソース整合性ガイド](../07_SOURCE_MANIFEST.md)を参照してください。
