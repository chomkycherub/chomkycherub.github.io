document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("globalParticles");
  if (!canvas) {
    console.warn("Canvas for global particles not found.");
    return;
  }
  const ctx = canvas.getContext("2d");

  // Set canvas full screen
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });

  const numberOfParticles = 60;
  const particlesArray = [];
  const mouse = {
    x: null,
    y: null,
    radius: 100 // area of repulsion around cursor
  };

  // Track mouse position
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.size = Math.random() * 2 + 1;
      this.baseSize = this.size;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.directionX = (Math.random() - 0.5) * 0.4;
      this.directionY = (Math.random() - 0.5) * 0.4;
      this.baseColor = "rgba(244, 198, 215, 0.9)";
      this.color = this.baseColor;

      // For blinking effect
      this.blinkSpeed = Math.random() * 0.05 + 0.01; // speed of opacity oscillation
      this.opacity = 0.8 + Math.random() * 0.2;
      this.opacityDirection = 1; // 1 or -1
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 198, 215, ${this.opacity.toFixed(2)})`;
      ctx.shadowColor = "rgba(244, 198, 215, 0.7)";
      ctx.shadowBlur = 5;
      ctx.fill();
      ctx.shadowBlur = 0; // reset shadowBlur
    }

    update() {
      // Move particle
      this.x += this.directionX;
      this.y += this.directionY;

      // Bounce on edges
      if (this.x < 0 || this.x > canvas.width) this.directionX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.directionY *= -1;

      // Repel from mouse
      if (mouse.x && mouse.y) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          // Normalize direction away from mouse
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;

          // Repulsion strength (closer = stronger)
          const maxForce = 2;
          const force = (mouse.radius - distance) / mouse.radius * maxForce;

          this.directionX += forceDirectionX * force;
          this.directionY += forceDirectionY * force;
        }
      }

      // Limit speed to prevent crazy fast movement
      const maxSpeed = 1.5;
      this.directionX = Math.min(Math.max(this.directionX, -maxSpeed), maxSpeed);
      this.directionY = Math.min(Math.max(this.directionY, -maxSpeed), maxSpeed);

      // Blink effect (opacity oscillates)
      this.opacity += this.blinkSpeed * this.opacityDirection;
      if (this.opacity >= 1) {
        this.opacity = 1;
        this.opacityDirection = -1;
      } else if (this.opacity <= 0.6) {
        this.opacity = 0.6;
        this.opacityDirection = 1;
      }

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
