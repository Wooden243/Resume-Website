# assets/js/site.js — 全文と逐次解説

> **役割:** 共通ナビゲーションの状態管理。
> **入力:** クリック・Escapeなどのイベント。
> **出力:** DOMの表示状態・aria-expandedを変更。
> **設計意図:** メニュー開閉が各ページ共通。

> **SHA-256:** `3d91fe9f237626061aebb16071799699e67479883221d7a9665b629955c3148e`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```javascript
export function initSite() {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (toggle && menu) {
    const closeMenu = () => {menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');};
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', event => {if (event.target.closest('a')) closeMenu();});
    document.addEventListener('keydown', event => {if (event.key === 'Escape') closeMenu();});
  }
}
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```javascript
export function initSite() {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (toggle && menu) {
    const closeMenu = () => {menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');};
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
```

- `export`された定義は、他のモジュールから`import`して再利用できる。
- 値をテキストとして表示するため、文字列にHTMLタグ風の記述があっても解釈しない。
- イベント発生時に実行する関数を登録している。関数をその場で呼び出していない点に注意する。

### L11–L16

```javascript
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', event => {if (event.target.closest('a')) closeMenu();});
    document.addEventListener('keydown', event => {if (event.key === 'Escape') closeMenu();});
  }
}
```

- イベント発生時に実行する関数を登録している。関数をその場で呼び出していない点に注意する。

## 3. 主要な設計ポイントを深く理解する

### `initSite()`

各ページの入口JSから呼び出す共通初期化。年を現在年へ更新し、必要なDOM要素が存在したらモバイルナビのイベントを登録する。

### `classList.toggle`

openクラスを付け外しし、戻り値（追加後true/削除後false）を現在の状態として扱う。

### `aria-expanded`

ボタンの開閉状態を支援技術へ伝える。見た目の変更だけではキーボード/スクリーンリーダー利用者へ十分伝わらない。

### `Escape`の監視

documentのkeydownでEscapeを押したときにメニューを閉じる。イベントハンドラに関数を渡す。

## 4. 入力から出力まで追跡する例

例: `bash scripts/verify.sh`を実行すると、Node.jsの単体/静的構造テストとPython HTTPテストが順に走る。どれか一つでも失敗すれば非ゼロの終了コードで停止する。

## 5. 自己確認ポイント

- このファイルは「共通ナビゲーションの状態管理」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

