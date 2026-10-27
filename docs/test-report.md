# テストと検証状況

テストコマンド：

```bash
bash scripts/verify.sh
```

| 検査 | 対象 |
|---|---|
| `tests/model.test.js` | プロジェクトの形式・一意性、検索・分類、日付、裏付け資料の登録 |
| `tests/structure.test.js` | HTMLの基本構成、メタデータ、404・robots・sitemap、内部URL |
| `tests/test_http.py` | Pythonの一時HTTPサーバーで各ページ、JSON、CSS/JS等を取得 |
| `tests/test_materials.py` | HTML相対リンク、ES module import、学習用ソース全文・SHA-256、認証情報の簡易検査 |

GitHub Actionsの`Verify portfolio`ワークフローでも上記を実行します。**実際の実行結果はActionsの履歴を参照**してください。数値を固定で「全件成功」と記述すると、コード変更時に誤った報告になり得るため、この文書ではテスト対象と限界を区別します。

## 手動で確認する内容

1. トップページに2件の作品カードが表示される。
2. 作品一覧で`NumPy`を検索すると多腕バンディット作品が表示され、Web Applicationのカテゴリを選ぶと該当作品が表示される。
3. `projects/detail.html?slug=ml-algorithms`で指標、処理の流れ、数式ノート・CSVなどの資料リンクが表示される。
4. `projects/detail.html?slug=chatbot`でUI・API・DBの構成とテスト資料が表示される。
5. 未登録のslugでエラービューが表示され、未知のファイルパスでは404ページが機能する。
6. スマートフォン程度の幅でメニュー・カード・資料リンクに横スクロールやはみ出しが起きない。
7. GitHub Pagesの実URLでHTML・CSS・JS・JSONが取得できる。

## テストの限界

Node.js/Pythonの自動検査だけでは、実ブラウザー描画の見栄え、スクリーンリーダー実機、外部GitHubリンク先の可用性、検索結果へのインデックス登録、GitHub Pagesの年間稼働率は保証できません。公開後の手動確認と追加検証が必要です。
