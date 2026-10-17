# Customize the Resume Website

This is a public-safe **template**, not an identity or a record of real completed work. Before publishing a personal portfolio, update all sample data.

## 1. Content sources

| Source file | What it controls |
| --- | --- |
| `data/profile.json` | About paragraph, name, skills, experience, education, downloadable resume path |
| `data/projects.json` | List, featured projects, category filter, search index, project detail pages |
| `assets/sample-resume.pdf` | Actual PDF download (currently a clearly marked SAMPLE) |
| `index.html`, `resume/index.html` | Static framing copy, heading, download CTA |
| `assets/css/styles.css` | Layout, colors, breakpoints, typography, project mockup visuals |

The site uses English sample copy, but UTF-8 Japanese text may be added to JSON values. Render it as text; never inject user-provided HTML via `innerHTML`.

## 2. Add a project (JSON)

```json
{
  "id": 6,
  "slug": "my-real-project",
  "title": "My Real Project",
  "subtitle": "One-line value proposition",
  "summary": "Brief and verifiable summary.",
  "content": "Overview with actual scope and constraints.",
  "challenge": "The problem to solve.",
  "approach": "The design and implementation decisions.",
  "outcome": "What actually happened; avoid invented achievements.",
  "stack": ["JavaScript", "HTML"],
  "category": "Web App",
  "year": 2026,
  "date": "2026-10-18",
  "featured": false,
  "source": "https://github.com/your-account/your-repo",
  "demo": "",
  "visual": "generic"
}
```

Each `id` and `slug` must be unique. Slugs use lowercase letters, numbers, and hyphens. `source` and `demo` can be empty until real links exist; no placeholder GitHub homepages are displayed as demo links. Use an HTTPS URL for real external destinations.

## 3. JSON/AJAX loading flow

```text
page loads → browser requests assets/js/projects.js
          → projects.js imports data.js
          → fetch(../../data/projects.json)
          → JSON parsed and validated by model.js
          → DOM created safely by dom.js
          → project cards or case-study page rendered
```

The same detail template `projects/detail.html?slug=my-real-project` automatically displays newly inserted JSON records. No manual duplication of HTML pages is required.

## 4. Local preview

From project root:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8000/`. **Do not** open HTML directly with the `file://` scheme; browser security restrictions commonly block `fetch()` there.

## 5. Publish safely

Search for `Your Name`, `example.com`, `20XX`, and `sample` across HTML, JSON, PDF and README. Remove fictional content, replace the sample resume PDF, check external links, and run automated tests. For deployment/domain steps, read `docs/deployment.md`.
