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
  const theme = ['bandit', 'chatbot'].includes(project.visual) ? project.visual : 'generic';
  const wrapper = node('div', {className: `project-art art-${theme}`, attrs: {'aria-hidden': 'true'}});
  const window = node('div', {className: 'art-window'});
  const top = node('div', {className: 'art-top'}, [node('span'), node('span'), node('span')]);
  const content = node('div', {className: 'art-body'});
  if (theme === 'bandit') {
    content.append(node('div', {className: 'art-kicker', text: 'MULTI-ARMED BANDIT / RL'}));
    content.append(node('div', {className: 'art-main-number', text: 'ε-greedy'}));
    content.append(node('div', {className: 'art-code', text: 'Q ← Q + α(R − Q)'}));
    content.append(node('div', {className: 'art-foot', text: '10 arms · 9 settings · 5,000 runs each'}));
  } else if (theme === 'chatbot') {
    content.append(node('div', {className: 'art-kicker', text: 'FULL-STACK CHATBOT'}));
    content.append(node('div', {className: 'art-main-number', text: 'ChatBot'}));
    content.append(node('div', {className: 'art-list'}, [
      node('span', {text: 'React → REST API'}),
      node('span', {text: 'FastAPI → OpenAI API'}),
      node('span', {text: 'SQLAlchemy → SQLite'})
    ]));
  } else {
    content.append(node('div', {className: 'art-kicker', text: 'SOFTWARE PROJECT'}));
    content.append(node('div', {className: 'art-main-number', text: project.title}));
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
