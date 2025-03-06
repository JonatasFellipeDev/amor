window.onload = function () {
  const canvas = document.getElementById('hearts');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let hearts = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Heart {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = random(0, width);
      this.y = random(-height, 0);
      this.size = random(8, 14);
      this.speedY = random(1, 2);
      this.opacity = random(0.5, 1);
    }

    update() {
      this.y += this.speedY;
      if (this.y > height) this.reset();
    }

    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = 'pink';
      ctx.beginPath();
      const x = this.x;
      const y = this.y;
      const s = this.size;
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + s / 2, y - s / 2, x + s, y + s / 2, x, y + s);
      ctx.bezierCurveTo(x - s, y + s / 2, x - s / 2, y - s / 2, x, y);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function createHearts(num = 100) {
    hearts = [];
    for (let i = 0; i < num; i++) {
      hearts.push(new Heart());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(h => {
      h.update();
      h.draw();
    });
    requestAnimationFrame(animate);
  }

  createHearts();
  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createHearts();
  });

  // Mostrar mensagem secreta
  window.mostrarMensagem = function () {
    const msg = document.getElementById('mensagem-secreta');
    msg.classList.remove('hidden');
  };
};
