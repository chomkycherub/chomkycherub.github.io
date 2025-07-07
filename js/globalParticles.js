const canvas = document.getElementById("globalParticles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 50;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.size = Math.random() * 2 + 1;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.directionX = (Math.random() - 0.5) * 0.3;
    this.directionY = (Math.random() - 0.5) * 0.3;
    this.color = "rgba(255,255,255,0.4)";
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) this.directionX *= -1;
    if (this.y > canvas.height || this.y < 0) this.directionY *= -1;
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let particle of particlesArray) {
    particle.update();
  }
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
