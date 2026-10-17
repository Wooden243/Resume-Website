import {loadProfile} from './data.js';
import {node, tag, showError} from './dom.js';
import {initSite} from './site.js';

initSite();
const outlet = document.getElementById('resume-dynamic');

async function renderResume() {
  try {
    const profile = await loadProfile();
    const pdfLink = document.getElementById('resume-download');
    if (pdfLink && typeof profile.resumeFile === 'string') {
      const parsed = new URL(profile.resumeFile, window.location.href);
      if (parsed.origin === window.location.origin && parsed.pathname.toLowerCase().endsWith('.pdf')) {
        pdfLink.href = parsed.href;
      }
    }
    const skills = node('section', {className:'resume-section'}, [node('h2', {text:'Skills & tools'})]);
    for (const group of profile.skills || []) {
      skills.append(node('div', {className:'skill-group'}, [
        node('h3', {text:group.group}),
        node('div', {className:'tag-list'}, (group.items || []).map(tag))
      ]));
    }
    const experience = node('section', {className:'resume-section'}, [node('h2', {text:'Experience & selected work'})]);
    for (const entry of profile.experience || []) {
      const item = node('article', {className:'experience-entry'}, [
        node('div', {className:'entry-date', text:entry.period}),
        node('div', {}, [
          node('h3', {text:entry.position}),
          node('p', {className:'entry-organization', text:entry.organization}),
          node('p', {text:entry.description})
        ])
      ]);
      experience.append(item);
    }
    const education = node('section', {className:'resume-section'}, [
      node('h2', {text:'Education'}), node('p', {text:profile.education})
    ]);
    outlet.replaceChildren(skills, experience, education);
  } catch (error) {
    console.error(error);
    showError(outlet, 'Resume details could not be loaded.', renderResume);
  }
}

renderResume();
