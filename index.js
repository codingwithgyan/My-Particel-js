let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let CANVAS_WIDTH = (canvas.width = window.innerWidth);
let CANVAS_HEIGHT = (canvas.height = window.innerHeight);

let particleArr = [];
let hue = 0;
let mousePosition = {
  x: undefined,
  y: undefined,
};
window.addEventListener("resize", function (event) {
  CANVAS_WIDTH = canvas.width = window.innerWidth;
  CANVAS_HEIGHT = canvas.height = window.innerHeight;
});
function handlePC(event) {
  mousePosition.x = event.x;
  mousePosition.y = event.y;
  generateParticles(10);
}
function handleMobile(event) {
  mousePosition.x = event.touches[0].clientX;
  mousePosition.y = event.touches[0].clientY;
  generateParticles(3);
}
function generateParticles(num) {
  for (let i = 0; i < num; i++) {
    particleArr.push(new Particle());
  }
}
window.addEventListener("click", handlePC);
window.addEventListener("mousemove", handlePC);
window.addEventListener("touchmove", handleMobile);
class Particle {
  constructor() {
    this.x = mousePosition.x;
    this.y = mousePosition.y;
    this.size = Math.random() * 10 + 2;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ",100%, 50%)";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size >= 0.2) {
      this.size -= 0.1;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particleArr.length; i++) {
    particleArr[i].update();
    particleArr[i].draw();
    for (let j = i; j < particleArr.length; j++) {
      let dx = particleArr[i].x - particleArr[j].x;
      let dy = particleArr[i].y - particleArr[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particleArr[i].color;
        ctx.lineWidth = particleArr[i].size / 40;
        ctx.moveTo(particleArr[i].x, particleArr[i].y);
        ctx.lineTo(particleArr[j].x, particleArr[j].y);
        ctx.stroke();
      }
    }
    if (particleArr[i].size < 0.3) {
      particleArr.splice(i, 1);
      i--;
    }
  }
}
function animate() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  handleParticles();
  hue++;
  if (hue >= 360) hue = 0;
  requestAnimationFrame(animate);
}

animate();
