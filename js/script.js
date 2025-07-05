// Dark mode toggle
const toggle = document.getElementById('darkModeToggle');
const html = document.documentElement;
toggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme');
  html.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
});

// Animated hero title
const title = document.getElementById("animatedTitle");
const titles = ["Game Designer", "Writer", "Sound Designer", "Unity Dev"];
let index = 0;
setInterval(() => {
  index = (index + 1) % titles.length;
  title.classList.remove("fade-in");
  void title.offsetWidth;
  title.textContent = titles[index];
  title.classList.add("fade-in");
}, 3000);

// Projects data, ahora con campo role y video (puedes quitar video si no tienes)
const projects = [
  {
    title: "Unwound",
    image: "images/spider%20gif.gif",
    description: "Atmospheric stealth-puzzle game with classic horror twist. Guide Mr. Benjamin through a surreal toy city full of secrets and dangers to retrieve his son from The Catcher.",
    role: "Game Designer & Writer",
    link: "https://www.youtube.com/watch?v=59f0Bo12WAM",
    video: "videos/unwound-reel.mp4"  // Pon el path correcto o null si no hay video
  },
  {
    title: "Afterwords",
    image: "images/NubiGifCompressed.gif",
    description: "Puzzle-driven journey through memory and loss.",
    role: "Lead Developer",
    link: "https://adistantdreamer.itch.io/afterwords",
    video: null
  },
  {
    title: "Nuna",
    image: "images/nuna.png",
    description: "A child's fable about dreams and inner worlds. (Game currently in development)",
    role: "Narrative Designer",
    link: "#",
    video: null
  },
];

// Referencias
const projectGrid = document.getElementById("projectGrid");

// Función para crear tarjeta
function createProjectCard(p) {
  const card = document.createElement("div");
  card.className = "project-card";

  card.innerHTML = `
    <img src="${p.image}" alt="${p.title}" />
    <h3>${p.title}</h3>
    <p class="project-role">${p.role}</p>
    <p>${p.description}</p>
    <div class="button-container">
      <a href="${p.link}" class="project-link" target="_blank" rel="noopener noreferrer">View Project →</a>
      ${p.video ? `<button class="play-reel-btn">Play Reel</button>` : ""}
    </div>
  `;

  // Añadimos listener para el botón de video
  if (p.video) {
    const btn = card.querySelector(".play-reel-btn");
    btn.addEventListener("click", () => openModal(p.video));
  }

  return card;
}

// Renderizamos las tarjetas
projects.forEach(p => {
  const card = createProjectCard(p);
  projectGrid.appendChild(card);
});

// GSAP Scroll Animations
document.addEventListener("DOMContentLoaded", () => {
  gsap.from("section", {
    opacity: 0,
    y: 60,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
  });
});

// ---- Modal video logic ----

// Creamos el modal y lo añadimos al body
const modal = document.createElement("div");
modal.className = "modal hidden";
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-button">&times;</span>
    <video controls></video>
  </div>
`;
document.body.appendChild(modal);

const videoElement = modal.querySelector("video");
const closeButton = modal.querySelector(".close-button");

// Abrir modal con el video dado
function openModal(videoSrc) {
  videoElement.src = videoSrc;
  modal.classList.remove("hidden");
  videoElement.play();
}

// Cerrar modal
function closeModal() {
  videoElement.pause();
  videoElement.currentTime = 0;
  videoElement.src = "";
  modal.classList.add("hidden");
}

// Event listeners
closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
