(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const preference = matchMedia('(prefers-color-scheme: dark)');
  const update = () => {
    const dark = root.dataset.theme === 'dark';
    toggle.title = toggle.ariaLabel = `Switch to ${dark ? 'light' : 'dark'} mode`;
    document.querySelector('meta[name="theme-color"]').content = dark ? '#000000' : '#ffffff';
  };
  toggle.hidden = false;
  update();
  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('shi-theme', root.dataset.theme); } catch (_) {}
    update();
  });
  preference.addEventListener('change', event => {
    let saved;
    try { saved = localStorage.getItem('shi-theme'); } catch (_) {}
    if (saved !== 'light' && saved !== 'dark') {
      root.dataset.theme = event.matches ? 'dark' : 'light';
      update();
    }
  });
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.reveal, .paper, .research-row, .honor, .background-row');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove('reveal-pending');
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.05 });
  for (const target of targets) {
    if (target.getBoundingClientRect().top < innerHeight) continue;
    target.classList.add('reveal-pending');
    observer.observe(target);
  }
  document.addEventListener('focusin', event => {
    const target = event.target.closest('.reveal-pending');
    if (target) { target.classList.remove('reveal-pending'); observer.unobserve(target); }
  });
  motion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    targets.forEach(target => target.classList.remove('reveal-pending'));
  });
})();
