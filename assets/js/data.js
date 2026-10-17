/** Data access layer. URLs derive from this module location, so GitHub Pages subpaths work. */
const PROJECTS_URL = new URL('../../data/projects.json', import.meta.url);
const PROFILE_URL = new URL('../../data/profile.json', import.meta.url);

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Could not load ${url.pathname}: HTTP ${response.status}`);
  return response.json();
}

export async function loadProjects() {
  const raw = await fetchJson(PROJECTS_URL);
  if (!Array.isArray(raw)) throw new TypeError('projects.json must contain an array');
  return raw;
}

export async function loadProfile() {
  const raw = await fetchJson(PROFILE_URL);
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new TypeError('profile.json must contain an object');
  }
  return raw;
}
