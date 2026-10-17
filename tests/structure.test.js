import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../', import.meta.url));
const files=['index.html','projects/index.html','projects/detail.html','resume/index.html','guide.html'];
function contents(p){return readFileSync(new URL(`../${p}`,import.meta.url),'utf8');}

test('all pages have semantic main content, viewport, and stylesheet',()=>{
 for(const file of files){
  const html=contents(file);
  assert.match(html,/<main id="main">/);
  assert.match(html,/<meta name="viewport"/);
  assert.match(html,/<link rel="stylesheet"/);
  assert.match(html,/<nav class="site-nav"/);
  assert.match(html,/<title>/);
 }
});
test('projects listing fetches JSON via import module',()=>{
 assert.match(contents('projects/index.html'),/src="\.\.\/assets\/js\/projects\.js"/);
 assert.match(contents('assets/js/data.js'),/projects\.json/);
});
test('resume PDF exists and has PDF signature',()=>{
 const path=new URL('../assets/sample-resume.pdf',import.meta.url);
 const pdf=readFileSync(path);
 assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
 assert.ok(pdf.length>2500);
});
test('no absolute asset links (works under repository subpath)',()=>{
 for(const file of files){
  const html=contents(file);
  assert.doesNotMatch(html,/(?:href|src)="\/(?!\/)/);
 }
});
test('HTML pages have no inline script and project rendering avoids innerHTML',()=>{
 for(const file of files){assert.doesNotMatch(contents(file),/<script(?![^>]*src=)[^>]*>/);}
 for(const path of ['assets/js/main.js','assets/js/projects.js','assets/js/detail.js','assets/js/resume.js','assets/js/dom.js']){
  assert.doesNotMatch(contents(path),/\.innerHTML\s*=/);
 }
});
test('repository includes documentation and deployment workflow',()=>{
 for(const file of ['docs/deployment.md','.github/workflows/deploy.yml','learning/00_START_HERE.md']) {
  assert.ok(statSync(new URL(`../${file}`,import.meta.url)).size>20);
 }
});
