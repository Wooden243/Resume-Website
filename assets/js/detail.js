import {loadProjects} from './data.js';
import {normalizeProjects, getProjectBySlug, formatProjectDate} from './model.js';
import {node, renderTags, visualForProject, showError} from './dom.js';
import {initSite} from './site.js';

initSite();
const content = document.getElementById('project-detail');

function section(label, text) {
  return node('section', {className:'case-section'}, [node('h2', {text:label}), node('p', {text:text || 'Details to be added.'})]);
}

function appendLinkIfValid(target, label, url) {
  if (typeof url !== 'string' || !/^https:\/\//i.test(url)) return;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return;
    target.append(node('a', {className:'button button-outline button-small', text:label, attrs:{href:parsed.href,target:'_blank',rel:'noopener noreferrer'}}));
  } catch { /* Optional project link intentionally omitted. */ }
}

async function renderDetail() {
  try {
    const slug = new URLSearchParams(window.location.search).get('slug');
    const project = getProjectBySlug(normalizeProjects(await loadProjects()), slug);
    if (!project) {
      content.replaceChildren(node('div', {className:'status-panel'}, [
        node('h1', {text:'Project not found'}),
        node('p', {text:'The requested project is not in the portfolio data.'}),
        node('a', {className:'text-link', text:'← Browse projects', attrs:{href:'index.html'}})
      ]));
      document.title = 'Project not found — Resume Website';
      return;
    }

    document.title = `${project.title} — Resume Website`;
    const header = node('div', {className:'case-header'});
    header.append(node('div', {className:'eyebrow', text:`${project.category} / ${formatProjectDate(project.date)}`}));
    header.append(node('h1', {text:project.title}));
    header.append(node('p', {className:'case-subtitle', text:project.subtitle || project.summary}));
    header.append(renderTags(project.stack, 8));

    const links = node('div', {className:'case-links'});
    appendLinkIfValid(links, 'Source code ↗', project.source);
    appendLinkIfValid(links, 'Live demo ↗', project.demo);
    if (links.childElementCount) header.append(links);

    content.replaceChildren(
      header,
      visualForProject(project),
      node('div', {className:'case-content'}, [
        section('Overview', project.content),
        section('The challenge', project.challenge),
        section('The approach', project.approach),
        section('The outcome', project.outcome),
        node('p', {className:'demo-note', text:'This is demonstration content. Replace all sample projects with verified work before publishing a personal portfolio.'}),
        node('a', {className:'button button-primary', text:'← All projects', attrs:{href:'index.html'}})
      ])
    );
  } catch (error) {
    console.error(error);
    showError(content, 'Project information could not be loaded.', renderDetail);
  }
}

renderDetail();
