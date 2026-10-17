import {loadProjects} from './data.js';
import {normalizeProjects, projectMatches, categoriesOf} from './model.js';
import {node, projectCard, showError} from './dom.js';
import {initSite} from './site.js';

initSite();

const grid = document.getElementById('projects-grid');
const search = document.getElementById('project-search');
const choices = document.getElementById('category-filters');
const tally = document.getElementById('project-count');
let projects = [];
let activeCategory = 'All';

function renderList() {
  const filtered = projects.filter(item => projectMatches(item, search.value, activeCategory));
  tally.textContent = `${filtered.length} of ${projects.length} projects`;
  if (!filtered.length) {
    grid.replaceChildren(node('div', {className:'status-panel empty-results'}, [
      node('h3', {text:'Nothing found'}), node('p', {text:'Try another search term or category.'})
    ]));
    return;
  }
  grid.replaceChildren(...filtered.map(item => projectCard(item, 'detail.html')));
}

function renderFilters() {
  choices.replaceChildren(...categoriesOf(projects).map(category => {
    const button = node('button', {className: `filter-pill${activeCategory === category ? ' selected' : ''}`, text: category, attrs: {type:'button', 'aria-pressed': String(activeCategory === category)}});
    button.addEventListener('click', () => {
      activeCategory = category;
      renderFilters();
      renderList();
    });
    return button;
  }));
}

async function initProjects() {
  try {
    projects = normalizeProjects(await loadProjects());
    renderFilters();
    renderList();
  } catch (error) {
    console.error(error);
    showError(grid, 'Projects could not be loaded. Please refresh or check the local server.', initProjects);
  }
}

search.addEventListener('input', renderList);
initProjects();
