import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {normalizeProjects, isValidProject, projectMatches, getProjectBySlug, categoriesOf, formatProjectDate} from '../assets/js/model.js';

const path = fileURLToPath(new URL('../data/projects.json', import.meta.url));
const data = JSON.parse(readFileSync(path, 'utf8'));

test('JSON is an array of valid projects', () => {
  assert.equal(data.length, 2);
  for (const project of data) assert.equal(isValidProject(project), true);
});
test('each slug and ID is unique', () => {
  assert.equal(new Set(data.map(p=>p.slug)).size, data.length);
  assert.equal(new Set(data.map(p=>p.id)).size, data.length);
});
test('normalizeProjects sorts descending without mutating input', () => {
  const clone = [...data];
  const sorted = normalizeProjects(data);
  assert.deepEqual(data, clone);
  for (let i=1; i<sorted.length; i++) assert.ok(sorted[i-1].date >= sorted[i].date);
});
test('normalizeProjects rejects duplicate slugs', () => {
  assert.throws(()=>normalizeProjects([...data, {...data[0],id:999}]), /Duplicate/);
});
test('normalizeProjects rejects malformed project', () => {
  assert.throws(()=>normalizeProjects([{title:'no id'}]), /Invalid/);
});
test('filters by category', () => {
  assert.equal(projectMatches(data[0], '', 'Machine Learning'), true);
  assert.equal(projectMatches(data[0], '', 'Web Application'), false);
});
test('search is case-insensitive and checks technology', () => {
  assert.equal(projectMatches(data[0], 'NUMPY'), true);
  assert.equal(projectMatches(data[0], 'python'), true);
  assert.equal(projectMatches(data[0], 'unmatched'), false);
});
test('empty search matches all projects', () => {
  assert.ok(data.every(p=>projectMatches(p, '   ')));
});
test('lookup existing and unknown slugs', () => {
  assert.equal(getProjectBySlug(data, data[1].slug).id, data[1].id);
  assert.equal(getProjectBySlug(data,'not-found'), null);
});
test('categories begin with All and contain unique names', () => {
  const cats=categoriesOf(data);
  assert.equal(cats[0], 'All');
  assert.equal(new Set(cats).size, cats.length);
});
test('valid date formats safely', () => {
  assert.equal(formatProjectDate('2026-04-10'), 'April 2026');
  assert.equal(formatProjectDate('bogus'), 'Date not set');
});

test('featured projects link to verified GitHub source repositories', () => {
  assert.deepEqual(new Set(data.map(p => p.slug)), new Set(['ml-algorithms', 'chatbot']));
  assert.ok(data.every(p => p.featured && p.source.startsWith('https://github.com/Wooden243/')));
  assert.ok(data.every(p => !p.demo));
});
