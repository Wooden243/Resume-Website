/** Small DOM builders. Text from JSON always uses textContent, not innerHTML. */
export function node(tag, options = {}, children = []) {
  const element = document.createElement(tag);
  if (options.className) element.className = options.className;
  if (options.text !== undefined) element.textContent = String(options.text);
  if (options.attrs) {
    for (const [name, value] of Object.entries(options.attrs)) {
      if (value !== undefined && value !== null) element.setAttribute(name, String(value));
    }
  }
  for (const child of children) element.append(child);
  return element;
}

export function tag(text) {
  return node('span', {className: 'tag', text});
}

export function renderTags(tags, limit = 4) {
  return node('div', {className: 'tag-list'}, tags.slice(0, limit).map(tag));
}

export function visualForProject(project) {
  const theme = /^([a-z-]+)$/.test(project.visual ?? '') ? project.visual : 'generic';
  const wrapper = node('div', {className: `project-art art-${theme}`, attrs: {'aria-hidden': 'true'}});
  const window = node('div', {className: 'art-window'});
  const top = node('div', {className: 'art-top'}, [node('span'), node('span'), node('span')]);
  const content = node('div', {className: 'art-body'});
  if (theme === 'budget') {
    content.append(node('div', {className: 'art-kicker', text: 'MONTHLY OVERVIEW'}));
    content.append(node('div', {className: 'art-main-number', text: '¥ 24,820'}));
    content.append(node('div', {className: 'art-bars'}, [1,2,3,4,5,6,7].map(i => node('i', {attrs: {style: `--bar:${[48,75,62,94,56,84,67][i-1]}%`}}))));
  } else if (theme === 'fitness') {
    content.append(node('div', {className: 'art-kicker', text: 'TODAY’S ACTIVITY'}));
    content.append(node('div', {className: 'art-main-number', text: '08:42'}));
    content.append(node('div', {className: 'art-progress'}, [node('span')]));
    content.append(node('div', {className: 'art-foot', text: 'A little progress, every day.'}));
  } else if (theme === 'travel') {
    content.append(node('div', {className: 'art-kicker', text: 'YOUR ITINERARY'}));
    content.append(node('div', {className: 'art-main-number', text: '03 stops'}));
    content.append(node('div', {className: 'art-list'}, ['Museum', 'Coffee stop', 'Riverside walk'].map(x => node('span', {text:x}))));
  } else if (theme === 'collab') {
    content.append(node('div', {className: 'art-kicker', text: 'REVIEW IN PROGRESS'}));
    content.append(node('div', {className: 'art-code', text: '+ const clearer = true;'}));
    content.append(node('div', {className: 'art-code muted', text: '- const clutter = false;'}));
    content.append(node('div', {className: 'art-foot', text: '3 files · 5 comments'}));
  } else {
    content.append(node('div', {className: 'art-kicker', text: 'DISCOVER NEAR YOU'}));
    content.append(node('div', {className: 'art-search', text: '⌕   Search local favorites'}));
    content.append(node('div', {className: 'art-list'}, ['Coffee & brunch', 'Small restaurants', 'Hidden gems'].map(x => node('span', {text:x}))));
  }
  window.append(top, content);
  wrapper.append(window);
  return wrapper;
}

export function projectCard(project, detailPrefix = 'projects/detail.html') {
  const a = node('a', {className: 'project-card', attrs: {href: `${detailPrefix}?slug=${encodeURIComponent(project.slug)}`, 'aria-label': `View ${project.title} project details`}});
  a.append(visualForProject(project));
  const body = node('div', {className: 'card-body'});
  body.append(node('div', {className: 'card-eyebrow', text: `${project.category}  /  ${project.year ?? '—'}`}));
  body.append(node('div', {className: 'card-heading'}, [
    node('h3', {text: project.title}), node('span', {className: 'card-arrow', text: '↗', attrs: {'aria-hidden':'true'}})
  ]));
  body.append(node('p', {text: project.summary}));
  body.append(renderTags(project.stack, 3));
  a.append(body);
  return a;
}

export function showError(container, message, retry) {
  const text = node('p', {className: 'error-text', text: message});
  const items = [text];
  if (retry) {
    const button = node('button', {className:'button button-outline button-small', text:'Retry', attrs:{type:'button'}});
    button.addEventListener('click', retry);
    items.push(button);
  }
  container.replaceChildren(node('div', {className:'status-panel', attrs:{role:'alert'}}, items));
}
