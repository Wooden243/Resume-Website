import {loadProfile} from './data.js';
import {node, tag, showError} from './dom.js';
import {initSite} from './site.js';

initSite();
const outlet = document.getElementById('resume-dynamic');

async function renderResume() {
  try {
    const profile = await loadProfile();
    const skills = node('section', {className:'resume-section'}, [node('h2', {text:'Skills & tools'})]);
    for (const group of profile.skills || []) {
      skills.append(node('div', {className:'skill-group'}, [
        node('h3', {text:group.group}),
        node('div', {className:'tag-list'}, (group.items || []).map(tag))
      ]));
    }
    const projects = node('section', {className:'resume-section'}, [node('h2', {text:'Selected projects'})]);
    for (const entry of profile.experience || []) {
      projects.append(node('article', {className:'experience-entry'}, [
        node('div', {className:'entry-date', text:entry.period}),
        node('div', {}, [
          node('h3', {text:entry.position}),
          node('p', {className:'entry-organization', text:entry.organization}),
          node('p', {text:entry.description})
        ])
      ]));
    }
    const sections = [skills, projects];
    if (profile.education && profile.education.trim()) {
      sections.push(node('section', {className:'resume-section'}, [
        node('h2', {text:'Education'}), node('p', {text:profile.education})
      ]));
    }
    outlet.replaceChildren(...sections);
  } catch (error) {
    console.error(error);
    showError(outlet, 'プロフィールを読み込めませんでした。', renderResume);
  }
}
renderResume();
