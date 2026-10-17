# Requirements and evidence / Resume Website

## Source and interpretation

Based on the supplied Recursion "Resume Website" screenshot. The top section lists functional requirements (custom subdomain; introduction; portfolio project list and individual descriptions; skills and experience resume page; downloadable PDF; HTTPS; responsive pages; working links/resources), non-functional requirements (security; uptime >99%; simple push-to-deploy workflow; provisioning a VM and learning deployment), and an optional exercise to load portfolio entries from JSON with JavaScript/AJAX.

The screenshot contains no real domain, personal profile, project credentials, or cloud account. We **do not invent** those details. Sample content is labeled as such. No account changes, domain purchase, VM provisioning, or deployment were authorized/performed.

## Traceability table

| ID | Source requirement | Implementation / evidence | Validation | Status |
| --- | --- | --- | --- | --- |
| F01 | Custom subdomain reachable (e.g. `resume.example.org`) | `docs/deployment.md` gives DNS and GitHub Pages setup | Requires actual domain ownership and deployment | **Not completed** (external account required) |
| F02 | Homepage clearly introduces the person/site | `index.html`, `data/profile.json`, `assets/js/main.js` | Browser smoke / manual review | **Implemented as labeled template**; personal details must be supplied |
| F03 | Page listing completed portfolio projects | `projects/index.html`, `projects.js`, `data/projects.json` | Node tests and browser smoke | **Implemented with fictional demo projects** |
| F04 | Dedicated explanation for each project | `projects/detail.html`, `detail.js` | Browser smoke of existing and missing slugs | **Implemented** |
| F05 | Resume page with skills and experience | `resume/index.html`, `resume.js`, `data/profile.json` | Browser smoke | **Implemented with placeholders** |
| F06 | Downloadable PDF resume | `assets/sample-resume.pdf`, `resume/index.html` | PDF file signature, HTTP route, PDF rendered preview | **Implemented sample PDF**, requires replacement |
| F07 | Accessible via HTTPS | `.github/workflows/deploy.yml`, `docs/deployment.md` | Requires deployed Pages URL | **Deployment prerequisite documented; not verified** |
| F08 | Responsive design with navigation across devices | `assets/css/styles.css`, mobile nav in `site.js` | Mobile/desktop Chromium screenshots | **Implemented; browser visual review performed** |
| F09 | All public assets and URLs work | Relative asset paths, URL computed from `import.meta.url`, semantic links | HTML/static route checks and browser smoke | **Checked locally**; cannot prove future hosted links |
| N01 | Server/user security | Static-only architecture, DOM `textContent`, same-origin JSON, no credentials | Code review, tests for unsafe HTML rendering | **Basic code practices implemented**, hosting protections external |
| N02 | >99% yearly server uptime | Static site supports managed hosting; deployment and monitoring guidance | Requires continuous monitoring data | **Not verifiable in advance**, not claimed |
| N03 | Push development updates easily | GitHub Pages Actions workflow, README | Workflow syntax/file exists; no actual remote deploy run | **Configured but not executed** |
| N04 | Deploy to new VM/cloud | `docs/deployment.md` contains alternative VPS/Caddy instructions | No VM credentials supplied | **Instructions only**, not provisioned |
| O01 | Store portfolio data in JSON | `data/projects.json` | JSON parsing / unit test | **Implemented** |
| O02 | Load JSON dynamically using JavaScript/AJAX | `data.js` with `fetch()` and `projects.js` / `detail.js` rendering | Browser smoke after HTTP serve | **Implemented** |
| O03 | New JSON entry automatically yields new project page | Single dynamic `projects/detail.html?slug=...` template | Program logic + unit test | **Implemented** without per-project HTML copies |

## Design choices distinct from source

- This is a **static website**, rather than a running Node server. Static GitHub Pages deployment is an acceptable implementation strategy for the portfolio UI; a VM is described as an optional deployment method.
- Project records, work experience, email address, and resume are demonstrative. They must be replaced with verified public information before actual personal use.
- `projects/detail.html?slug=...` implements individual project views from a common template; a missing slug shows a friendly 404-like message, but the HTTP status remains 200 for the shared static page.
- Search, category filters, decorative CSS mockups, the customization guide, and automated tests are enhancements.

## No hidden claims

Tests demonstrate local behavior only. They do not establish global availability, a registered domain, deployed TLS configuration, or third-party SLA compliance.
