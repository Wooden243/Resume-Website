# 04 | デバッグと障害切り分け

## 大前提：「どの層で止まっているか」から調べる

1. **配信**: HTTPサーバーは起動しているか。`curl -I http://127.0.0.1:8000/`。
2. **アセット**: DevToolsのNetworkタブでCSS/JS/JSONが200で返るか。
3. **JavaScript**: Consoleタブに`SyntaxError`や`TypeError`が出ていないか。
4. **データ**: JSONの形式と各`id`/`slug`が正しいか。
5. **描画**: ElementsタブにDOM要素が追加されているか。CSSで隠れていないか。
6. **公開先**: GitHub ActionsとPages Settingsは正しいか。DNS/TLSは有効か。

## よくあるエラー一覧

|症状|原因の候補|対処|
|---|---|---|
|カードが表示されない|`file://`起動、JSON 404、JSON不正|`python3 -m http.server`で開き、Networkで`projects.json`を確認|
|`Unexpected token`|JSONの末尾カンマや引用符不足|`python3 -m json.tool data/projects.json`|
|`Failed to fetch`|サーバー停止・URL誤り・ネットワークエラー|URLを直接開いてHTTPステータスを確認|
|`Duplicate project ID or slug`|重複した`id`/`slug`|JSONのID/slugを一意に直す|
|`Project not found`|URLのslugがJSONにない|URLの値と`project.slug`を照合|
|CSSが適用されない|相対パスが間違い|Elements/Networkで`styles.css`のリクエストを確認|
|小さい画面でメニューが開かない|JS未読み込みか、`aria`/クラス不一致|Consoleと`site.js`、media queryを調べる|
|PDFが落ちない|PDFのパス違い、ブラウザ挙動|PDFの直接URLを開き200とPDF署名を確認|
|GitHubでURLが404|未デプロイ、Pages未有効化、ブランチ違い|Actionsログ、Settings→Pages、URLを確認|
|独自ドメインでHTTPSエラー|DNS・証明書発行が未完了|正しいCNAMEとGitHub Pages側ドメイン設定を確認|

## 実行可能なコマンド

```bash
# JSONを文法検証
python3 -m json.tool data/projects.json > /dev/null
python3 -m json.tool data/profile.json > /dev/null

# ローカルHTTPサーバー
python3 -m http.server 8000 --bind 127.0.0.1

# 別ターミナルでデータ取得を検査
curl -i http://127.0.0.1:8000/data/projects.json
curl -I http://127.0.0.1:8000/assets/sample-resume.pdf

# 自動テスト
bash scripts/verify.sh
```

## 最小再現を作る

問題が複雑なら、例として`projects.json`を編集する前にコピーし、**1件の小さなデータ**で再現させる。入力→出力を極力少なくすれば、データの問題かDOMの問題かが分かりやすい。ただし本番用データを戻し忘れない。

## JSのログとブレークポイント

Consoleに`console.log({activeCategory, query: search.value, projects})`のように状態を出す。Chrome/Edge DevToolsのSourcesタブで`renderList()`の内部へブレークポイントを置き、`filtered`、`search.value`、`activeCategory`の値を順に見る。フィルター関数`projectMatches`はNode単体テストからも直接検査できる。

## なぜ`try/catch`があるのか

`renderHome()`などは非同期の`fetch`で失敗する可能性がある。`catch`で`console.error`に詳細を出す一方、利用者には`showError()`で簡単なエラーを提示する。ユーザー向けメッセージに内部スタックトレースを貼り付けない設計である。

## デバッグ時の安全性

公開リポジトリにAPIキー・アクセストークン・本当の個人連絡先が残っていないか確認する。ログに秘密情報を出さない。今回のテンプレートに認証機能はなく、サーバー側へのフォーム送信もない。
