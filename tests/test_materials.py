"""Verify learning walkthroughs match the shipped implementation exactly."""
import hashlib
from html.parser import HTMLParser
from pathlib import Path
import re
import unittest
from urllib.parse import urlparse, unquote

ROOT = Path(__file__).resolve().parents[1]
WALK = ROOT / 'learning' / 'code-walkthrough'

class ReferenceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs=[]
    def handle_starttag(self,tag,attrs):
        values=dict(attrs)
        if tag in {'a','link'} and 'href' in values:self.refs.append(values['href'])
        if tag in {'script','img'} and 'src' in values:self.refs.append(values['src'])

class LearningIntegrityTests(unittest.TestCase):
    def test_all_full_source_blocks_match_current_files(self):
        checked=0
        for f in WALK.glob('*.md'):
            if f.name=='README.md':continue
            text=f.read_text(encoding='utf-8')
            source_name=text.splitlines()[0][2:].split(' — ')[0]
            source=ROOT/source_name
            self.assertTrue(source.is_file(),f'{f.name} refers to missing {source_name}')
            block=re.search(r'## 1\. 実装ソース全文（省略なし）\n\n```[^\n]*\n(.*?)\n```\n',text,re.S)
            self.assertIsNotNone(block,f'full source missing: {f.name}')
            self.assertEqual(block.group(1)+'\n',source.read_text(encoding='utf-8').rstrip('\n')+'\n',f'outdated full source: {f.name}')
            digest=hashlib.sha256(source.read_bytes()).hexdigest()
            self.assertIn(digest,text,f'outdated SHA: {f.name}')
            checked+=1
        self.assertGreaterEqual(checked,20)

    def test_local_html_references_exist(self):
        for f in ROOT.rglob('*.html'):
            if 'learning' in f.parts:continue
            parser=ReferenceParser()
            parser.feed(f.read_text(encoding='utf-8'))
            for ref in parser.refs:
                if ref.startswith(('#','mailto:','tel:')):continue
                if urlparse(ref).scheme or ref.startswith('//'):continue
                path=unquote(urlparse(ref).path)
                if not path:continue
                self.assertTrue((f.parent/path).resolve().is_file(),f'broken link in {f.relative_to(ROOT)}: {ref}')

    def test_relative_javascript_imports_exist(self):
        for f in (ROOT/'assets/js').glob('*.js'):
            text=f.read_text(encoding='utf-8')
            for path in re.findall(r"\bfrom\s+['\"](\.[^'\"]+)['\"]",text):
                self.assertTrue((f.parent/path).is_file(),f'{f.name} imports missing {path}')

    def test_placeholder_not_secrets(self):
        for f in ROOT.rglob('*'):
            if f.is_file() and f.suffix in {'.js','.json','.html','.md','.yml','.css'}:
                raw=f.read_text(encoding='utf-8')
                self.assertNotIn('BEGIN PRIVATE KEY',raw)
                self.assertNotIn('sk-proj-',raw)

if __name__=='__main__':unittest.main()
