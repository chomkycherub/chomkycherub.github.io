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
  void title.offsetWidth; // reflow to restart animation
  title.textContent = titles[index];
  title.classList.add("fade-in");
}, 3000);

// Projects data, con campo role y video (puedes poner video null si no tienes)
const projects = [
  {
    title: "Unwound",
    image: "images/UnwoundRoomGif.gif",
    description: "Atmospheric stealth-horror game with a dark, cute twist. Play as a wind-up mouse toy through a surreal miniature city full of secrets and dangers as you manage your winding energy.",
    role: "Game, Narrative, Sound Designer, Programmer",
    link: "https://www.youtube.com/watch?v=59f0Bo12WAM",
    video: "videos/unwound-reel.mp4" 
  },
  {
    title: "Afterwords",
    image: "images/NubiGifCompressed.gif",
    description: "Puzzle-driven journey through memory and loss.",
    role: "Narrative & Sound Designer",
    link: "https://adistantdreamer.itch.io/afterwords",
    video: null
  },
  {
    title: "Nuna",
    image: "images/NunaGif.png",
    description: "A child's fable about dreams and inner worlds. (Game currently in development)",
    role: "Solo dev",
    link: "#",
    video: null
  },
];

// Referencia al contenedor de proyectos
const projectGrid = document.getElementById("projectGrid");

// Función para crear cada tarjeta
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

// GSAP Scroll Animations (se ejecuta cuando DOM esté listo)
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

// Creamos el modal dinámicamente
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

// Abrir modal con video
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

// Eventos para cerrar modal
closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
