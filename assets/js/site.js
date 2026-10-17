export function initSite() {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (toggle && menu) {
    const closeMenu = () => {menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');};
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', event => {if (event.target.closest('a')) closeMenu();});
    document.addEventListener('keydown', event => {if (event.key === 'Escape') closeMenu();});
  }
}
