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
    link: "unwound.html",
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
    image: "images/NunaGif.gif",
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

// Terminal-style intro
const introLines = [
  "Hello, I'm Gonzalo.",
  "Game & Narrative Designer.",
  "I craft interactive dreamscapes.",
  "Philosophy meets interactivity here.",
  "Welcome to my portfolio."
];

const textElement = document.getElementById("terminalText");
const cursor = document.getElementById("terminalCursor");

let currentLine = 0;
let currentChar = 0;
let isTyping = false;

// Tipo máquina de escribir
function typeLine() {
  if (currentLine >= introLines.length) {
    cursor.style.display = "none";
    return;
  }

  isTyping = true;
  const line = introLines[currentLine];

  if (currentChar < line.length) {
    textElement.textContent += line[currentChar];
    currentChar++;
    setTimeout(typeLine, 40); // Velocidad
  } else {
    textElement.textContent += '\n';
    currentLine++;
    currentChar = 0;
    isTyping = false;
  }
}

// Avanzar manualmente al clic o tecla
function handleAdvance() {
  if (isTyping) return;
  typeLine();
}

document.addEventListener("click", handleAdvance);
document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") handleAdvance();
});

// Inicia la primera línea al cargar
document.addEventListener("DOMContentLoaded", () => {
  typeLine();
});

// BURBUJAS: distribuirlas de forma aleatoria dentro del contenedor
const bubbles = document.querySelectorAll('.skill-bubble');
const galaxy = document.querySelector('.skills-galaxy');

const galaxyWidth = galaxy.offsetWidth;
const galaxyHeight = galaxy.offsetHeight;

bubbles.forEach((bubble, i) => {
  const top = Math.random() * 80 + 10;    // entre 10% y 90%
  const left = Math.random() * 80 + 10;   // entre 10% y 90%
  const scale = Math.random() * 0.4 + 0.9; // escala entre 0.9 y 1.3

  bubble.style.top = `${top}%`;
  bubble.style.left = `${left}%`;
  bubble.style.transform = `scale(${scale})`;
  bubble.style.animationDelay = `${Math.random() * 3}s`;
});


// CANVAS PARTICLES
/*const canvas = document.getElementById('skillsCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = Array.from({ length: 40 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.5 + 0.5,
  speedY: Math.random() * 0.5 + 0.1,
  alpha: Math.random() * 0.4 + 0.2,
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.y += p.speedY;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();*/

document.addEventListener("DOMContentLoaded", () => {
  // ----------- FADING --------------
  const fadeEls = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeEls.forEach(el => observer.observe(el));

  // ----------- LIGHTBOX --------------
  const galleryImages = document.querySelectorAll(".reference-gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove("hidden");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dialogueLines = [
    `"Zhoom ezsa... feer'n garr tikkar voln’náa, chaaa rish'n norah va?"`,
    "Whom is this, whose gears seem to tick from lands unheard of?\n",

    `"Zhaa joor'nieth... kel esh'wevra symphonira?"`,
    "Would thee join it? Her weaving symphony?\n",

    `"Mmm... veesi feln'a beit... mmmm-hrr."`,
    "A sweet fit it would be...\n",

    `"Thiy-naa... vokh’zaa na’kellm, harn’mora vin echora... krah'sen doszth'n krakka'noss..."`,
    "Thine voice, agonizing in harmony with the echoing of sorrows, with the cracking of bones...\n",

    `"Shya zho’mothri... sheth kom’daa, sil'nash gessurra..."`,
    "She is The Mother, for She conducts with silken gesture…\n",

    `"Mar’sh vel'tho… unf’sheel… fate'n dah slumb’reen cu’coon… nev’ah born 'ganesh…"`,
    "March forward, unwound, meet a fate no different from those who lay here, asleep in cocoon dreams, to never be born anew.\n"
  ];

  const dialogueText = document.getElementById("dialogueText");
  const dialogueCursor = document.getElementById("dialogueCursor");

  let currentLine = 0;
  let currentChar = 0;
  let isTyping = false;

  function typeDialogueLine() {
    if (currentLine >= dialogueLines.length) {
      dialogueCursor.style.display = "none";
      return;
    }

    isTyping = true;
    const line = dialogueLines[currentLine];

    if (currentChar === 0) {
  dialogueText.textContent = ""; // limpia texto anterior al comenzar línea
}

if (currentChar < line.length) {
  dialogueText.textContent += line[currentChar];
  currentChar++;
  setTimeout(typeDialogueLine, 35);
} else {
  currentLine++;
  currentChar = 0;
  isTyping = false;
}
  }

  function advanceDialogue() {
    if (isTyping) return;
    typeDialogueLine();
  }

  document.addEventListener("click", advanceDialogue);
  document.addEventListener("keydown", e => {
    if (e.key === " " || e.key === "Enter") advanceDialogue();

  });

  // Inicia automáticamente
  typeDialogueLine();
});
