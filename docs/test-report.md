# Test report — Resume Website

## Executed checks

| Check | Command / method | Result |
|---|---|---|
| JavaScript model and static-structure tests | `node --test tests/*.test.js` | **17/17 passed** |
| Python HTTP and learning-integrity tests | `python3 -m unittest discover -s tests -p 'test_*.py' -v` | **10/10 passed** |
| HTML, CSS, JS, PDF accessible over local HTTP | `tests/test_http.py` starts its own ephemeral server | **Passed** |
| JSON data valid and contains unique identifiers | `tests/model.test.js` | **Passed** |
| Search/category matching and malformed data handling | `tests/model.test.js` | **Passed** |
| All HTML relative links have existing targets | `tests/test_materials.py` | **Passed** |
| JS module relative imports have existing targets | `tests/test_materials.py` | **Passed** |
| Full-source walkthrough blocks match implemented files | `tests/test_materials.py` | **Passed** |
| PDF signature and HTTP Content-Type | `tests/structure.test.js`, `tests/test_http.py` | **Passed** |
| PDF page rendered for layout inspection | `pdftoppm`, image review | **Passed: one-page sample readable** |

Test runs were executed inside the build environment using Node.js v22 and Python 3.13. The tests intentionally depend only on standard library tools.

## Test limitations — do not confuse with a pass

- **Actual browser render and interactive click testing**: Chromium in this environment did not complete headless startup. DOM search, menu clicks, responsive breakpoints, and PDF download user gesture have not been validated in a real browser during this execution. Static source and HTTP route tests passed; perform the manual checklist below before submission.
- **GitHub Pages / custom domain / HTTPS**: No hosting account settings or DNS were changed, and no production HTTPS URL was visited. The workflow and instructions are available, not deployed.
- **Annual uptime >99%**: Cannot be tested or claimed from source code and short-lived local tests.
- **Real personal content**: Intentionally not supplied. Sample placeholders are labeled in HTML and PDF and must be replaced before publication as a personal site.
- **All browsers and assistive technology**: No cross-browser screen-reader audit; semantic markup is present but formal accessibility certification is not claimed.

## Manual browser checklist

1. Start the local server with `bash scripts/serve.sh` and open `http://127.0.0.1:8000/` in Chrome/Edge.
2. Confirm 3 featured cards render on Home and links open corresponding project cases.
3. Go to Projects and enter `budget`: check only BudgetMaster remains; then use category filter `Web App` and verify empty state.
4. Open `/projects/detail.html?slug=foodie-finder`; verify overview/challenge/approach/outcome. Try `slug=missing` and verify fallback.
5. Open Resume; confirm skills, experience, and education load, and sample PDF opens/downloads.
6. Resize to 375px and 768px; verify no horizontal overflow and mobile menu is usable by keyboard.
7. Inspect DevTools Console and Network for JS errors and failed requests.
8. Deploy using the documented workflow; verify live HTTPS/certificate and all routes under the repository subpath.

## Repeat tests after customization

When a JSON file, JS module, HTML, or CSS file changes, re-run `bash scripts/verify.sh`. The source walkthrough digest test intentionally fails if explanations are stale; regenerate/update those walkthroughs before shipping a new release.
