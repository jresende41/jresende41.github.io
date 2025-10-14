// Fade-in animation
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Particle effect
const canvas = document.getElementById('byteCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.02;
  }

  draw() {
    ctx.fillStyle = `rgba(0, 255, 224, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].opacity <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
}

window.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}
animate();
