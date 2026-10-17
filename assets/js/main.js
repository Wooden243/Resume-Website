import {loadProjects, loadProfile} from './data.js';
import {normalizeProjects} from './model.js';
import {node, projectCard, showError} from './dom.js';
import {initSite} from './site.js';

initSite();

async function renderHome() {
  const list = document.getElementById('featured-projects');
  try {
    const [profile, projects] = await Promise.all([loadProfile(), loadProjects()]);
    const intro = document.querySelector('[data-profile-intro]');
    if (intro) intro.textContent = profile.introduction;
    const about = document.querySelector('[data-profile-about]');
    if (about) about.textContent = profile.about;
    const name = document.querySelector('[data-profile-name]');
    if (name) name.textContent = profile.displayName;

    const featured = normalizeProjects(projects).filter(project => project.featured).slice(0, 3);
    if (!featured.length) {
      list.replaceChildren(node('p', {className: 'muted-text', text: 'Projects will appear here when they are added to data/projects.json.'}));
      return;
    }
    list.replaceChildren(...featured.map(project => projectCard(project)));
  } catch (error) {
    console.error(error);
    showError(list, 'Could not load the portfolio data. Run the site through a local HTTP server.', renderHome);
  }
}

renderHome();
