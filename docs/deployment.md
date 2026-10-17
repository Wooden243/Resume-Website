# Deployment guide: GitHub Pages, custom subdomain, and optional VPS

## Recommended path: GitHub Pages (automatic updates)

This repository includes `.github/workflows/deploy.yml`. The workflow runs when a commit is pushed to `main` (or manually via Actions). It uploads static files and deploys them to GitHub Pages. It does not install runtime JavaScript dependencies, create external servers, or require stored API keys.

1. Push the repository to GitHub (`README.md` provides complete `git init` and GitHub CLI steps).
2. On the GitHub repository, open **Settings → Pages**. Select **Source: GitHub Actions**.
3. Open the **Actions** tab and confirm `Deploy portfolio to GitHub Pages` finishes successfully. If necessary, run it manually from the workflow page.
4. Visit the Pages deployment URL shown by GitHub, typically `https://<account>.github.io/Resume-Website/`. It remains a placeholder until an actual repository and account are used.
5. Check `index.html`, `projects/index.html`, a project detail URL, `resume/index.html`, the PDF link, and the JSON fetch requests in DevTools Network.

**Relative paths matter**: all HTML asset URLs are relative, and `data.js` builds JSON addresses from its module URL. This means the site works under a repository path such as `/Resume-Website/` as well as at a domain root.

### Custom subdomain

Requires a DNS name that the publisher owns. There is **no registered domain supplied with this project**.

1. Pick a real hostname, for example `resume.your-domain.example` (an example only).
2. Set the GitHub Pages **Custom domain** field to that hostname. GitHub will manage a `CNAME` file when set via the UI; this repository deliberately does not ship a fake `CNAME` file.
3. In the domain DNS control panel, set the subdomain `CNAME` to `<account>.github.io` (substitute the actual account). The target is a DNS host, not an `https://` URL or repository-specific path.
4. Wait for DNS verification and certificate provisioning. Check that your account satisfies GitHub's domain verification requirements.
5. Enable **Enforce HTTPS** after the certificate is available.
6. Test redirects, HTTPS, all JS/JSON assets, the PDF, and 404 behavior.

If setting an **apex** domain rather than a subdomain, the DNS configuration differs (typically A/AAAA/ALIAS records as supported by the provider); consult current GitHub Pages documentation instead of reusing the subdomain instructions.

### Deployment verification checklist

- Browser URL starts with `https://` and shows a valid certificate.
- All `assets/*`, `data/*.json`, HTML, and the PDF load without mixed-content or 404 errors.
- `Projects` loads data and filters correctly.
- `detail.html?slug=foodie-finder` shows its case study; unknown slug shows the fallback view.
- Mobile layout and keyboard menu work.
- Personal placeholders and fictional projects have been replaced.
- DNS is correct and no sensitive data is present in the published repo.

## Alternative: VPS/VM deployment

For a learning exercise with EC2, Google Compute Engine, or another VM, install a web server such as Caddy. A static site needs only a web server; no Node.js process is needed to serve it. Secure shell/firewall configuration, operating system updates, backups, SSH keys, and deployment permissions are **your** hosting responsibility.

**Example Caddyfile (replace domain and path):**

```caddyfile
resume.your-domain.example {
    root * /srv/Resume-Website
    encode zstd gzip
    file_server
    header {
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
        X-Frame-Options DENY
    }
}
```

On a publicly routable VM, route DNS to the VM and allow inbound TCP ports 80 and 443; Caddy can then provision/manage HTTPS subject to supported DNS and certificate conditions. To copy code, use `rsync` over SSH or CI/CD with a restricted deployment key. Do not expose development ports directly to the public internet.

This is a deployment recipe, **not proof** of a configured or secured production VM.

## Security and uptime

- The website has no server-side login, user accounts, database, session cookies, API keys, or form submission endpoint.
- External project links (if added) are restricted to HTTPS and use `rel="noopener noreferrer"`.
- The JSON renderer inserts arbitrary text through `textContent`, avoiding HTML interpretation of project descriptions.
- Hosting must serve correct MIME types, HTTPS, restricted write permissions, and regular patching. If advanced response headers (CSP/HSTS) are required, configure them with a hosting provider that supports custom headers; basic GitHub Pages hosting does not let you customize every HTTP response header.
- No operator can **guarantee >99% yearly uptime** solely by shipping source files. Deploy to an appropriate hosting provider, monitor availability (e.g. an external uptime monitor), establish incident response and backups, and calculate uptime from observed minutes: `uptime = (total minutes - downtime minutes) / total minutes`.
- Always review dependency and provider documentation for current service limits and setup.
