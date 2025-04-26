function mostrarMensagem() {
    const msg = document.getElementById('mensagem-secreta');
    msg.classList.remove('hidden');
  }
  
  // Efeito de corações caindo
  const canvas = document.getElementById('hearts');
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  let hearts = [];
  
  function Heart() {
    this.x = Math.random() * width;
    this.y = Math.random() * height - height;
    this.size = Math.random() * 5 + 5;
    this.speedY = Math.random() * 1 + 0.5;
    this.opacity = Math.random();
  }
  
  Heart.prototype.update = function() {
    this.y += this.speedY;
    if (this.y > height) {
      this.y = 0;
      this.x = Math.random() * width;
    }
  };
  
  Heart.prototype.draw = function() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = 'pink';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + 2, this.y - 3, this.x + 5, this.y + 5, this.x, this.y + 7);
    ctx.bezierCurveTo(this.x - 5, this.y + 5, this.x - 2, this.y - 3, this.x, this.y);
    ctx.fill();
    ctx.globalAlpha = 1;
  };
  
  function createHearts() {
    for (let i = 0; i < 100; i++) {
      hearts.push(new Heart());
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(heart => {
      heart.update();
      heart.draw();
    });
    requestAnimationFrame(animate);
  }
  
  createHearts();
  animate();
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  