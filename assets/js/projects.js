import {loadProjects} from './data.js';
import {normalizeProjects, projectMatches, categoriesOf} from './model.js';
import {node, projectCard, showError} from './dom.js';
import {initSite} from './site.js';

initSite();

const grid = document.getElementById('projects-grid');
const search = document.getElementById('project-search');
const choices = document.getElementById('category-filters');
const tally = document.getElementById('project-count');
const clear = document.getElementById('clear-search');
let projects = [];
let activeCategory = 'All';

function syncUrl() {
  const url = new URL(window.location.href);
  const query = search.value.trim();
  if (query) url.searchParams.set('q', query);
  else url.searchParams.delete('q');
  if (activeCategory !== 'All') url.searchParams.set('category', activeCategory);
  else url.searchParams.delete('category');
  window.history.replaceState(null, '', url);
}

function readUrl() {
  const params = new URLSearchParams(window.location.search);
  search.value = params.get('q') || '';
  const category = params.get('category') || 'All';
  activeCategory = categoriesOf(projects).includes(category) ? category : 'All';
}


function renderList() {
  const filtered = projects.filter(item => projectMatches(item, search.value, activeCategory));
  tally.textContent = `${filtered.length} / ${projects.length} 件のプロジェクト`;
  if (clear) clear.hidden = !search.value;
  if (!filtered.length) {
    grid.replaceChildren(node('div', {className:'status-panel empty-results'}, [
      node('h3', {text:'該当するプロジェクトがありません'}), node('p', {text:'検索語やカテゴリを変更してください。'})
    ]));
    return;
  }
  grid.replaceChildren(...filtered.map(item => projectCard(item, 'detail.html')));
}

function renderFilters() {
  choices.replaceChildren(...categoriesOf(projects).map(category => {
    const button = node('button', {className: `filter-pill${activeCategory === category ? ' selected' : ''}`, text: category === 'All' ? 'すべて' : category, attrs: {type:'button', 'aria-pressed': String(activeCategory === category)}});
    button.addEventListener('click', () => {
      activeCategory = category;
      syncUrl();
      renderFilters();
      renderList();
    });
    return button;
  }));
}

async function initProjects() {
  try {
    projects = normalizeProjects(await loadProjects());
    readUrl();
    renderFilters();
    renderList();
  } catch (error) {
    console.error(error);
    showError(grid, 'プロジェクト情報を読み込めませんでした。HTTPサーバー経由で開いてください。', initProjects);
  }
}

search.addEventListener('input', () => {syncUrl(); renderList();});
if (clear) clear.addEventListener('click', () => { search.value = ''; syncUrl(); renderList(); search.focus(); });
window.addEventListener('popstate', () => {readUrl(); renderFilters(); renderList();});
initProjects();
