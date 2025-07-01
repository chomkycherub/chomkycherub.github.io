const toggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

toggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme');
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
  }
});
