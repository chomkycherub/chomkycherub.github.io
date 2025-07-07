document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("globalParticles");
  if (!canvas) {
    console.warn("Canvas for global particles not found.");
    return;
  }

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

  // Config
  const numberOfParticles = 60;
  const particlesArray = [];

  class Particle {
    constructor() {
      this.size = Math.random() * 2 + 1;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.directionX = (Math.random() - 0.5) * 0.4;
      this.directionY = (Math.random() - 0.5) * 0.4;
      this.color = "rgba(244, 198, 215, 0.9)";
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      this.x += this.directionX;
      this.y += this.directionY;

      if (this.x < 0 || this.x > canvas.width) this.directionX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.directionY *= -1;

      this.draw();
    }
  }

  function initParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of particlesArray) {
      particle.update();
    }
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
});
