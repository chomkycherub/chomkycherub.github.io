document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("globalParticles");
  if (!canvas) {
    console.warn("Canvas for global particles not found.");
    return;
  }

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  // Mouse position tracking
  const mouse = {
    x: null,
    y: null,
    radius: 150, // radius of influence for repulsion and line fading
  };

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

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
      // Move particle
      this.x += this.directionX;
      this.y += this.directionY;

      // Bounce on edges
      if (this.x < 0 || this.x > canvas.width) this.directionX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.directionY *= -1;

      // Repel from mouse if close
      if (mouse.x && mouse.y) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius * 0.8; // control force strength
          this.directionX += Math.cos(angle) * force;
          this.directionY += Math.sin(angle) * force;
        }
      }

      // Slow down velocity gradually (friction)
      this.directionX *= 0.95;
      this.directionY *= 0.95;

      this.draw();
    }
  }

  function initParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function connectParticles() {
    let maxDistance = 120;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          // Check mouse proximity to fade lines
          let alpha = 1 - distance / maxDistance;

          // Further reduce alpha if line is close to mouse
          if (mouse.x && mouse.y) {
            const midX = (particlesArray[a].x + particlesArray[b].x) / 2;
            const midY = (particlesArray[a].y + particlesArray[b].y) / 2;
            const dxm = midX - mouse.x;
            const dym = midY - mouse.y;
            const distMouse = Math.sqrt(dxm * dxm + dym * dym);

            if (distMouse < mouse.radius) {
              alpha *= distMouse / mouse.radius; // fade out lines closer to mouse
            }
          }

          ctx.strokeStyle = `rgba(244, 198, 215, ${alpha * 0.7})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of particlesArray) {
      particle.update();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
});
