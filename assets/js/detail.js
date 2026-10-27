import {loadProjects} from './data.js';
import {normalizeProjects, getProjectBySlug, formatProjectDate} from './model.js';
import {node, renderTags, visualForProject, showError} from './dom.js';
import {initSite} from './site.js';

initSite();
const content = document.getElementById('project-detail');

function section(label, text) {
  return node('section', {className:'case-section'}, [node('h2', {text:label}), node('p', {text:text || '詳細情報は準備中です。'})]);
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
        node('h1', {text:'プロジェクトが見つかりません'}),
        node('p', {text:'指定されたプロジェクトは登録されていません。'}),
        node('a', {className:'text-link', text:'← プロジェクト一覧', attrs:{href:'index.html'}})
      ]));
      document.title = 'プロジェクトが見つかりません — Wooden243';
      return;
    }

    document.title = `${project.title} — Wooden243`;
    const header = node('div', {className:'case-header'});
    header.append(node('div', {className:'eyebrow', text:`${project.category} / ${formatProjectDate(project.date)}`}));
    header.append(node('h1', {text:project.title}));
    header.append(node('p', {className:'case-subtitle', text:project.subtitle || project.summary}));
    header.append(renderTags(project.stack, 8));

    const links = node('div', {className:'case-links'});
    appendLinkIfValid(links, 'GitHubでソースを見る ↗', project.source);
    appendLinkIfValid(links, 'デモ ↗', project.demo);
    if (links.childElementCount) header.append(links);

    content.replaceChildren(
      header,
      visualForProject(project),
      node('div', {className:'case-content'}, [
        section('概要', project.content),
        section('課題', project.challenge),
        section('実装・検証方法', project.approach),
        section('結果と制約', project.outcome),
        node('a', {className:'button button-primary', text:'← プロジェクト一覧', attrs:{href:'index.html'}})
      ])
    );
  } catch (error) {
    console.error(error);
    showError(content, 'プロジェクト情報を読み込めませんでした。', renderDetail);
  }
}

renderDetail();
