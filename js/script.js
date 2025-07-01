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

document.addEventListener("DOMContentLoaded", () => {
  gsap.from("section", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
  });
});

