# tests/test_http.py — 全文と逐次解説

> **役割:** 一時HTTPサーバーを使う結合テスト。
> **入力:** ブラウザと同じHTTP GET。
> **出力:** HTTPステータス / 本文 / Content-Type。
> **設計意図:** 実際のHTTP配信を検証。

> **SHA-256:** `fa9e2a78f6af4d19897179412bdb655f83fdb3f9c1fb606cdb91ce51d8103763`（現行ソースとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```python
"""Local HTTP smoke tests without third-party Python dependencies."""
import contextlib
import functools
import http.server
import json
from pathlib import Path
import threading
import unittest
import urllib.request

ROOT = Path(__file__).resolve().parents[1]

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

class StaticSiteHTTPTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = http.server.ThreadingHTTPServer(
            ('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(ROOT))
        )
        cls.port = cls.server.server_address[1]
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join(timeout=2)

    def get(self, path):
        with urllib.request.urlopen(f'http://127.0.0.1:{self.port}{path}', timeout=5) as res:
            return res.status, res.headers, res.read()

    def test_homepage_is_html(self):
        status,headers,data = self.get('/index.html')
        self.assertEqual(status,200)
        self.assertIn('text/html',headers['Content-Type'])
        self.assertIn(b'<main id="main">',data)

    def test_pages_and_guide_are_accessible(self):
        for path in ['/projects/index.html','/projects/detail.html?slug=ml-algorithms',
                     '/resume/index.html','/guide.html']:
            with self.subTest(path=path):
                self.assertEqual(self.get(path)[0],200)

    def test_project_json_served_as_valid_json(self):
        status,headers,body = self.get('/data/projects.json')
        self.assertEqual(status,200)
        self.assertIn('application/json',headers['Content-Type'])
        data=json.loads(body)
        self.assertEqual(len(data),2)
        self.assertTrue(any(p['slug']=='ml-algorithms' for p in data))

    def test_profile_json(self):
        _,_,body = self.get('/data/profile.json')
        self.assertIn('displayName',json.loads(body))

    def test_public_metadata_and_404_page(self):
        for path in ['/sitemap.xml','/robots.txt','/404.html']:
            with self.subTest(path=path):
                self.assertEqual(self.get(path)[0],200)

    def test_asset_modules_and_css(self):
        for path in ['/assets/css/styles.css','/assets/js/main.js',
                     '/assets/js/data.js','/assets/js/projects.js','/assets/favicon.svg']:
            with self.subTest(path=path):
                self.assertEqual(self.get(path)[0],200)

if __name__=='__main__':
    unittest.main()
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```python
"""Local HTTP smoke tests without third-party Python dependencies."""
import contextlib
import functools
import http.server
import json
from pathlib import Path
import threading
import unittest
import urllib.request

```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。

### L11–L20

```python
ROOT = Path(__file__).resolve().parents[1]

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

class StaticSiteHTTPTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = http.server.ThreadingHTTPServer(
```

- この行群は`test_http.py`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L21–L30

```python
            ('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(ROOT))
        )
        cls.port = cls.server.server_address[1]
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
```

- この行群は`test_http.py`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L31–L40

```python
        cls.thread.join(timeout=2)

    def get(self, path):
        with urllib.request.urlopen(f'http://127.0.0.1:{self.port}{path}', timeout=5) as res:
            return res.status, res.headers, res.read()

    def test_homepage_is_html(self):
        status,headers,data = self.get('/index.html')
        self.assertEqual(status,200)
        self.assertIn('text/html',headers['Content-Type'])
```

- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。

### L41–L50

```python
        self.assertIn(b'<main id="main">',data)

    def test_pages_and_guide_are_accessible(self):
        for path in ['/projects/index.html','/projects/detail.html?slug=foodie-finder',
                     '/resume/index.html','/guide.html']:
            with self.subTest(path=path):
                self.assertEqual(self.get(path)[0],200)

    def test_project_json_served_as_valid_json(self):
        status,headers,body = self.get('/data/projects.json')
```

- `main`は文書の主要コンテンツを示す意味的なHTMLタグ。スキップリンクの着地点でもある。

### L51–L60

```python
        self.assertEqual(status,200)
        self.assertIn('application/json',headers['Content-Type'])
        data=json.loads(body)
        self.assertGreaterEqual(len(data),5)
        self.assertTrue(any(p['slug']=='foodie-finder' for p in data))

    def test_profile_json(self):
        _,_,body = self.get('/data/profile.json')
        self.assertIn('displayName',json.loads(body))

```

- この行群は`test_http.py`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L61–L70

```python
    def test_resume_pdf_over_http(self):
        status,headers,data = self.get('/assets/sample-resume.pdf')
        self.assertEqual(status,200)
        self.assertEqual(data[:5],b'%PDF-')
        self.assertIn('application/pdf',headers['Content-Type'])

    def test_asset_modules_and_css(self):
        for path in ['/assets/css/styles.css','/assets/js/main.js',
                     '/assets/js/data.js','/assets/js/projects.js','/assets/favicon.svg']:
            with self.subTest(path=path):
```

- この行群は`test_http.py`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L71–L74

```python
                self.assertEqual(self.get(path)[0],200)

if __name__=='__main__':
    unittest.main()
```

- この行群は`test_http.py`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

## 3. 主要な設計ポイントを深く理解する

### `setUpClass/tearDownClass`

テストクラスの前後でローカルHTTPサーバーを起動・停止する。テスト間でポート競合を避けるためランダム空きポートを使用。

### `urllib.request.urlopen`

ブラウザの代わりにHTTP GETして、ステータス・Content-Type・本文を調べる。

### `test_resume_pdf_over_http`

配信されるPDFの先頭バイトが%PDF-であることとMIMEタイプを確認する。

## 4. 入力から出力まで追跡する例

例: `bash scripts/verify.sh`を実行すると、Node.jsの単体/静的構造テストとPython HTTPテストが順に走る。どれか一つでも失敗すれば非ゼロの終了コードで停止する。

## 5. 自己確認ポイント

- このファイルは「一時HTTPサーバーを使う結合テスト」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

