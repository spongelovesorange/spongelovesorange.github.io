(() => {
  let saved;
  try { saved = localStorage.getItem('shi-theme'); } catch (_) {}
  const dark = matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = saved === 'light' || saved === 'dark' ? saved : dark ? 'dark' : 'light';
})();
