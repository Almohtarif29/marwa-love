const loveSong = document.getElementById('loveSong');
const musicToggle = document.getElementById('musicToggle');
const startMagic = document.getElementById('startMagic');
const daysCounter = document.getElementById('daysCounter');
const liveCounter = document.getElementById('liveCounter');
const openSecret = document.getElementById('openSecret');
const closeSecret = document.getElementById('closeSecret');
const secretModal = document.getElementById('secretModal');
const yesButton = document.getElementById('yesButton');
const smileButton = document.getElementById('smileButton');
const toast = document.getElementById('toast');
const floatLayer = document.querySelector('.float-layer');

const togetherSince = new Date('2026-06-18T00:00:00+01:00');

function updateLoveCounter() {
  const now = new Date();
  const diff = Math.max(0, now - togetherSince);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  daysCounter.textContent = days || 4;
  liveCounter.textContent = `${days || 4} أيام، ${hours} ساعة، ${minutes} دقيقة… والقصة مزالت كتبدأ ♡`;
}

updateLoveCounter();
setInterval(updateLoveCounter, 30000);

async function playMusic() {
  try {
    await loveSong.play();
    musicToggle.textContent = 'Pause';
    showToast('الموسيقى بدأت… SATA 9ATALA vibes 🎶');
  } catch (error) {
    showToast('اضغطي مرة أخرى لتشتغل الموسيقى على الهاتف 🎶');
  }
}

function pauseMusic() {
  loveSong.pause();
  musicToggle.textContent = 'Play';
}

musicToggle.addEventListener('click', () => {
  if (loveSong.paused) playMusic();
  else pauseMusic();
});

startMagic.addEventListener('click', () => {
  playMusic();
  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 42);
  document.body.classList.add('magic-started');
});

openSecret.addEventListener('click', () => {
  if (typeof secretModal.showModal === 'function') {
    secretModal.showModal();
  } else {
    showToast('Marwa, you are my favorite dream 💗');
  }
});

closeSecret.addEventListener('click', () => secretModal.close());

smileButton.addEventListener('click', () => {
  showToast('ابتسمي يا أجمل مروى 😍');
  burstHearts(window.innerWidth / 2, window.innerHeight - 120, 32);
});

yesButton.addEventListener('click', () => {
  showToast('Insha’Allah… forever starts with a sincere heart 💍');
  runConfetti();
  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 70);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function createFloatingEmoji() {
  const emojis = ['💗', '💙', '🐾', '🐱', '✨', '💍', '♡'];
  const span = document.createElement('span');
  span.className = 'float-emoji';
  span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  span.style.left = `${Math.random() * 100}%`;
  span.style.fontSize = `${18 + Math.random() * 28}px`;
  span.style.animationDuration = `${8 + Math.random() * 9}s`;
  floatLayer.appendChild(span);
  setTimeout(() => span.remove(), 18000);
}

setInterval(createFloatingEmoji, 900);
for (let i = 0; i < 12; i += 1) setTimeout(createFloatingEmoji, i * 180);

function burstHearts(x, y, amount = 24) {
  for (let i = 0; i < amount; i += 1) {
    const heart = document.createElement('span');
    heart.textContent = ['💗', '💙', '✨', '🐾'][Math.floor(Math.random() * 4)];
    heart.style.position = 'fixed';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.zIndex = '60';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = `${16 + Math.random() * 20}px`;
    const angle = Math.random() * Math.PI * 2;
    const distance = 45 + Math.random() * 155;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;
    heart.animate([
      { transform: 'translate(-50%, -50%) scale(.7)', opacity: 1 },
      { transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1.4)`, opacity: 0 }
    ], {
      duration: 900 + Math.random() * 500,
      easing: 'cubic-bezier(.17,.67,.32,1.15)'
    });
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1600);
  }
}

document.addEventListener('click', (event) => {
  const interactive = event.target.closest('button, a, video, audio, dialog');
  if (!interactive) burstHearts(event.clientX, event.clientY, 10);
});

function runConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const particles = [];
  const colors = ['#ff4fa4', '#ff8fc7', '#48c8ee', '#9fe8ff', '#ffffff'];

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();

  for (let i = 0; i < 190; i += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * window.innerHeight * 0.3,
      size: 5 + Math.random() * 8,
      speedY: 2 + Math.random() * 4.5,
      speedX: -2 + Math.random() * 4,
      rotation: Math.random() * Math.PI,
      rotationSpeed: -0.18 + Math.random() * 0.36,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0
    });
  }

  let frame = 0;
  function tick() {
    frame += 1;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;
      p.life += 1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      ctx.restore();
    });

    if (frame < 220) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  tick();
}
