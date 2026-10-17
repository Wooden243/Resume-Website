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
        for path in ['/projects/index.html','/projects/detail.html?slug=foodie-finder',
                     '/resume/index.html','/guide.html']:
            with self.subTest(path=path):
                self.assertEqual(self.get(path)[0],200)

    def test_project_json_served_as_valid_json(self):
        status,headers,body = self.get('/data/projects.json')
        self.assertEqual(status,200)
        self.assertIn('application/json',headers['Content-Type'])
        data=json.loads(body)
        self.assertGreaterEqual(len(data),5)
        self.assertTrue(any(p['slug']=='foodie-finder' for p in data))

    def test_profile_json(self):
        _,_,body = self.get('/data/profile.json')
        self.assertIn('displayName',json.loads(body))

    def test_resume_pdf_over_http(self):
        status,headers,data = self.get('/assets/sample-resume.pdf')
        self.assertEqual(status,200)
        self.assertEqual(data[:5],b'%PDF-')
        self.assertIn('application/pdf',headers['Content-Type'])

    def test_asset_modules_and_css(self):
        for path in ['/assets/css/styles.css','/assets/js/main.js',
                     '/assets/js/data.js','/assets/js/projects.js','/assets/favicon.svg']:
            with self.subTest(path=path):
                self.assertEqual(self.get(path)[0],200)

if __name__=='__main__':
    unittest.main()
