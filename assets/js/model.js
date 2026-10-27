/** Pure functions: safe to import in Node tests without any browser globals. */
export function isValidProject(project) {
  return Boolean(project && typeof project === 'object' &&
    Number.isSafeInteger(project.id) && project.id > 0 &&
    typeof project.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) &&
    typeof project.title === 'string' && project.title.trim() &&
    typeof project.summary === 'string' &&
    typeof project.content === 'string' &&
    Array.isArray(project.stack) && project.stack.every(item => typeof item === 'string'));
}

export function normalizeProjects(projects) {
  if (!Array.isArray(projects)) throw new TypeError('Expected projects array');
  const slugs = new Set();
  const ids = new Set();
  for (const project of projects) {
    if (!isValidProject(project)) throw new TypeError('Invalid project entry in projects.json');
    if (slugs.has(project.slug) || ids.has(project.id)) throw new Error('Duplicate project ID or slug');
    slugs.add(project.slug);
    ids.add(project.id);
  }
  return [...projects].sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? '')));
}

export function projectMatches(project, query = '', category = 'All') {
  const search = String(query).trim().toLocaleLowerCase();
  const categoryMatches = category === 'All' || project.category === category;
  if (!categoryMatches) return false;
  if (!search) return true;
  return [project.title, project.summary, project.category, ...project.stack]
    .join(' ').toLocaleLowerCase().includes(search);
}

export function getProjectBySlug(projects, slug) {
  return projects.find(project => project.slug === slug) ?? null;
}

export function categoriesOf(projects) {
  return ['All', ...new Set(projects.map(project => project.category).filter(Boolean))];
}

export function formatProjectDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return '日付未設定';
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '日付未設定';
  if (date.toISOString().slice(0, 10) !== value) return '日付未設定';
  return new Intl.DateTimeFormat('ja-JP', {year: 'numeric', month: 'long', timeZone: 'UTC'}).format(date);
}
