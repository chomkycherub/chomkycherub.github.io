// Select the canvas element and its 2D rendering context
const canvas = document.getElementById("globalParticles");
const ctx = canvas.getContext("2d");

// Set the canvas to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust canvas size on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles(); // Reinitialize particles to fit new dimensions
});

// Configuration
const numberOfParticles = 60;
const particlesArray = [];

// Particle class definition
class Particle {
  constructor() {
    this.size = Math.random() * 2 + 1;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.directionX = (Math.random() - 0.5) * 0.4;
    this.directionY = (Math.random() - 0.5) * 0.4;
    this.color = "rgba(244, 198, 215, 0.35)"; // pastel pink with some transparency
  }

  // Draw the particle on the canvas
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Update particle position and bounce off edges
  update() {
    this.x += this.directionX;
    this.y += this.directionY;

    // Bounce logic
    if (this.x < 0 || this.x > canvas.width) this.directionX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.directionY *= -1;

    this.draw();
  }
}

// Initialize particles
function initParticles() {
  particlesArray.length = 0;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Animate all particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const particle of particlesArray) {
    particle.update();
  }

  requestAnimationFrame(animateParticles);
}

// Start the show
initParticles();
animateParticles();
