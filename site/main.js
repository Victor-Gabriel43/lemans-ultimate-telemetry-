/* ==========================================================================
 * Troque aqui o nome e os textos do produto. Nada mais precisa mudar.
 * ======================================================================== */
const CONTENT = {
  name: "ORBIT",
  stages: [
    "", // 0 — a palavra
    "Um produto inteiro cabe num ponto de luz.",
    "Tem nome. Tem forma. Você já sabe qual.",
    "Tudo que você usa, num ciclo só.",
    "No seu bolso, sem barulho.",
    "",
  ],
  ctaTitle: "Chega <b>antes</b>.",
  thanks: "Anotado. Até logo.",
  hello: ["Olá", "Hello", "Bonjour", "Hallo", "Ciao", "Hola", "こんにちは"],
};

/* ======================================================================== */

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (id) => document.getElementById(id);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (v, a, b) => clamp((v - a) / (b - a));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

$("brand").textContent = CONTENT.name;
$("cta-title").innerHTML = CONTENT.ctaTitle;
document.title = CONTENT.name;

/* ---- palavra: cada letra num span, pra achar o "furo" da primeira ------- */
const word = $("word");
CONTENT.name.split("").forEach((ch) => {
  const s = document.createElement("span");
  s.textContent = ch;
  word.appendChild(s);
});
let origin = "50% 50%";
function measureOrigin() {
  word.style.transform = "none";
  const w = word.getBoundingClientRect();
  const first = word.firstElementChild.getBoundingClientRect();
  // centro da primeira letra (o "O" de ORBIT é oco: a câmera passa pelo meio)
  const x = first.left + first.width / 2 - w.left;
  const y = first.top + first.height * 0.5 - w.top;
  origin = `${x}px ${y}px`;
  word.style.transformOrigin = origin;
}

/* ---- partículas --------------------------------------------------------- */
const canvas = $("scene");
const ctx = canvas.getContext("2d");
const N = innerWidth < 700 ? 1400 : 2600;
let W = 0,
  H = 0,
  DPR = 1;

function fibSphere(n) {
  const out = [];
  const g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    out.push([Math.cos(g * i) * r, y, Math.sin(g * i) * r]);
  }
  return out;
}

function textShape(n, text) {
  const c = document.createElement("canvas");
  const cw = 900,
    ch = 300;
  c.width = cw;
  c.height = ch;
  const x = c.getContext("2d");
  x.fillStyle = "#fff";
  x.textAlign = "center";
  x.textBaseline = "middle";
  let size = 260;
  x.font = `800 ${size}px Geist, system-ui, sans-serif`;
  while (x.measureText(text).width > cw * 0.92 && size > 40) {
    size -= 8;
    x.font = `800 ${size}px Geist, system-ui, sans-serif`;
  }
  x.fillText(text, cw / 2, ch / 2);
  const data = x.getImageData(0, 0, cw, ch).data;
  const filled = [];
  for (let yy = 0; yy < ch; yy += 2)
    for (let xx = 0; xx < cw; xx += 2) if (data[(yy * cw + xx) * 4 + 3] > 128) filled.push([xx, yy]);
  const out = [];
  for (let i = 0; i < n; i++) {
    const [px, py] = filled[Math.floor(Math.random() * filled.length)] || [cw / 2, ch / 2];
    out.push([((px - cw / 2) / cw) * 3.0, ((py - ch / 2) / cw) * 3.0, (Math.random() - 0.5) * 0.08]);
  }
  return out;
}

function ring(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const b = Math.random() * Math.PI * 2;
    const r = 1.15 + Math.cos(b) * 0.05;
    out.push([Math.cos(a) * r, Math.sin(b) * 0.05, Math.sin(a) * r]);
  }
  return out;
}

function phone(n) {
  // contorno de um retângulo arredondado + três linhas de "interface"
  const out = [];
  const w = 0.62,
    h = 1.22,
    rr = 0.16;
  const per = 2 * (w + h) * 2;
  for (let i = 0; i < n; i++) {
    if (i % 5 === 0) {
      const row = [-0.5, -0.3, 0.6][i % 3];
      const len = [0.7, 0.45, 0.3][i % 3];
      out.push([-w * 0.7 + Math.random() * w * 2 * len, row * h, 0]);
      continue;
    }
    let t = Math.random() * per;
    let p;
    const hw = w,
      hh = h;
    if (t < 2 * hw) p = [-hw + t, -hh];
    else if ((t -= 2 * hw) < 2 * hh) p = [hw, -hh + t];
    else if ((t -= 2 * hh) < 2 * hw) p = [hw - t, hh];
    else p = [-hw, hh - (t - 2 * hw)];
    // arredonda os cantos puxando pro centro do raio
    const cx = clamp(p[0], -hw + rr, hw - rr);
    const cy = clamp(p[1], -hh + rr, hh - rr);
    const dx = p[0] - cx,
      dy = p[1] - cy;
    const d = Math.hypot(dx, dy) || 1;
    if (d > rr) p = [cx + (dx / d) * rr, cy + (dy / d) * rr];
    out.push([p[0], p[1], (Math.random() - 0.5) * 0.04]);
  }
  return out;
}

function dust(n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push([(Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4.5, (Math.random() - 0.5) * 3]);
  return out;
}

let SHAPES = [];
// rotação por forma: o nome fica parado e legível; o resto gira
const SPIN = [1, 1, 0, 0.6, 0.25, 0.4];
const TILT = [0.25, 0.25, 0, 0.55, 0, 0];

function buildShapes() {
  const s = fibSphere(N);
  SHAPES = [s, s, textShape(N, CONTENT.name), ring(N), phone(N), dust(N)];
  // embaralha a ordem de cada forma pra a transição virar uma "nuvem"
  for (let k = 2; k < SHAPES.length; k++) SHAPES[k].sort(() => Math.random() - 0.5);
}

const P = new Float32Array(N * 3); // posição atual
const O = new Float32Array(N * 2); // deslocamento do mouse
const seed = new Float32Array(N).map(() => Math.random());

function resize() {
  DPR = Math.min(2, devicePixelRatio || 1);
  W = innerWidth;
  H = innerHeight;
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  measureOrigin();
}

/* ---- rolagem suave (não sequestra a rolagem nativa) --------------------- */
let raw = 0,
  sm = 0;
function readScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  raw = max > 0 ? clamp(scrollY / max) : 0;
}
addEventListener("scroll", readScroll, { passive: true });

const mouse = { x: -9999, y: -9999 };
addEventListener("pointermove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
addEventListener("pointerleave", () => (mouse.x = mouse.y = -9999));
addEventListener("pointerup", (e) => {
  if (e.pointerType !== "mouse") mouse.x = mouse.y = -9999;
});

/* estágios: 0 palavra · 1 globo · 2 nome · 3 anel · 4 celular · 5 poeira */
const STOPS = [0, 0.12, 0.32, 0.52, 0.72, 0.9];
function stageAt(p) {
  for (let i = STOPS.length - 1; i >= 0; i--) if (p >= STOPS[i]) return i;
  return 0;
}
function blendAt(p) {
  // posição contínua entre formas; segura cada forma um pouco antes de morfar
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i],
      b = STOPS[i + 1];
    if (p < b) {
      const f = range(p, a + (b - a) * 0.45, b);
      return i + ease(f);
    }
  }
  return STOPS.length - 1;
}

let shownStage = -1;
function setLine(i) {
  $("idx").textContent = `${String(i).padStart(2, "0")} / 05`;
  const line = $("line");
  line.innerHTML = "";
  (CONTENT.stages[i] || "").split(" ").forEach((w, k) => {
    if (!w) return;
    const o = document.createElement("span");
    o.className = "w";
    const s = document.createElement("span");
    s.textContent = w;
    s.style.animationDelay = `${k * 0.04}s`;
    o.appendChild(s);
    line.appendChild(o);
    line.appendChild(document.createTextNode(" "));
  });
  $("cta").classList.toggle("on", i === 5);
}

const t0 = performance.now();
function frame(now) {
  requestAnimationFrame(frame);
  const time = reduced ? 0 : (now - t0) / 1000;
  sm = reduced ? raw : sm + (raw - sm) * 0.09;
  if (Math.abs(raw - sm) < 1e-4) sm = raw;

  // palavra: zoom exponencial atravessando a primeira letra
  const z = range(sm, 0, STOPS[1]);
  const scale = Math.pow(1 + z * 7, 2.7);
  word.style.transform = `scale(${scale})`;
  word.style.opacity = String(1 - range(z, 0.75, 1));

  const st = stageAt(raw);
  if (st !== shownStage) {
    shownStage = st;
    setLine(st);
  }
  $("pct").textContent = String(Math.round(sm * 100)).padStart(3, "0");

  // forma atual
  const bl = blendAt(sm);
  const i0 = Math.floor(bl),
    i1 = Math.min(SHAPES.length - 1, i0 + 1),
    f = bl - i0;
  const A = SHAPES[i0],
    B = SHAPES[i1];
  const spin = SPIN[i0] + (SPIN[i1] - SPIN[i0]) * f;
  const tilt = TILT[i0] + (TILT[i1] - TILT[i0]) * f;
  const yaw = spin * (Math.sin(time * 0.18) * 2.4 + sm * 3);
  const cyw = Math.cos(yaw),
    syw = Math.sin(yaw);
  const ct = Math.cos(tilt),
    stt = Math.sin(tilt);

  // o globo cresce de dentro da letra
  const grow = 0.35 + 0.65 * ease(range(sm, 0.02, STOPS[1]));
  const unit = Math.min(W, H) * 0.3 * grow;
  const cx = W / 2,
    cy = H / 2;

  const retro = document.documentElement.classList.contains("retro");
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, W, H);

  const breathe = reduced ? 0 : 0.012;
  for (let i = 0; i < N; i++) {
    const a = A[i],
      b = B[i];
    // atraso por partícula: a transição vira uma onda, não um bloco
    const fi = clamp(f * 1.4 - seed[i] * 0.4);
    let x = a[0] + (b[0] - a[0]) * fi;
    let y = a[1] + (b[1] - a[1]) * fi;
    let zz = a[2] + (b[2] - a[2]) * fi;
    x += Math.sin(time * 0.9 + seed[i] * 40) * breathe;
    y += Math.cos(time * 0.8 + seed[i] * 30) * breathe;

    // rotação: inclina em X, gira em Y
    const y1 = y * ct - zz * stt;
    const z1 = y * stt + zz * ct;
    const x2 = x * cyw + z1 * syw;
    const z2 = -x * syw + z1 * cyw;
    const persp = 3 / (3 + z2);
    let sx = cx + x2 * unit * persp;
    let sy = cy + y1 * unit * persp;

    // mouse empurra as partículas, que voltam devagar
    const dx = sx - mouse.x,
      dy = sy - mouse.y;
    const d2 = dx * dx + dy * dy;
    const R = 110;
    let ox = O[i * 2] * 0.9,
      oy = O[i * 2 + 1] * 0.9;
    if (d2 < R * R && !reduced) {
      const d = Math.sqrt(d2) || 1;
      const push = (1 - d / R) * 3.2;
      ox += (dx / d) * push;
      oy += (dy / d) * push;
    }
    O[i * 2] = ox;
    O[i * 2 + 1] = oy;
    sx += ox;
    sy += oy;
    P[i * 3] = sx;
    P[i * 3 + 1] = sy;
    P[i * 3 + 2] = persp;

    const depth = clamp((persp - 0.75) / 0.5);
    if (retro) {
      ctx.fillStyle = `rgba(11,11,11,${0.25 + depth * 0.75})`;
      const s = persp > 1 ? 2 : 1;
      ctx.fillRect(Math.round(sx), Math.round(sy), s, s);
    } else {
      // perto = vermelho quente, longe = cinza frio
      const r = 255,
        g = Math.round(42 + (1 - depth) * 170),
        bb = Math.round(31 + (1 - depth) * 190);
      ctx.fillStyle = `rgba(${r},${g},${bb},${0.18 + depth * 0.8})`;
      const s = 0.7 + persp * 0.9;
      ctx.fillRect(sx, sy, s, s);
    }
  }
}

/* ---- 1984 ---------------------------------------------------------------- */
const retroBtn = $("retro");
function setRetro(on) {
  document.documentElement.classList.toggle("retro", on);
  retroBtn.setAttribute("aria-pressed", String(on));
  try {
    localStorage.setItem("orbit-1984", on ? "1" : "0");
  } catch {}
  requestAnimationFrame(measureOrigin);
}
retroBtn.addEventListener("click", () => setRetro(!document.documentElement.classList.contains("retro")));
try {
  if (localStorage.getItem("orbit-1984") === "1") setRetro(true);
} catch {}

/* ---- fim ------------------------------------------------------------------ */
$("cta-form").addEventListener("submit", (e) => {
  e.preventDefault();
  // sem backend ainda: só confirma na tela
  $("cta-form").innerHTML = `<p style="padding:14px 0;font:400 16px var(--mono)">${CONTENT.thanks}</p>`;
});
let h = 0;
$("hello").textContent = CONTENT.hello[0];
if (!reduced)
  setInterval(() => {
    h = (h + 1) % CONTENT.hello.length;
    $("hello").textContent = CONTENT.hello[h];
  }, 1600);

/* ---- loader: 000 → 100 e abre ------------------------------------------- */
function boot() {
  buildShapes();
  resize();
  readScroll();
  sm = raw;
  addEventListener("resize", resize);
  requestAnimationFrame(frame);

  const loader = $("loader");
  if (reduced) {
    loader.remove();
    return;
  }
  const start = performance.now();
  const step = (now) => {
    const t = clamp((now - start) / 1200);
    $("loader-count").textContent = String(Math.round(ease(t) * 100)).padStart(3, "0");
    if (t < 1) requestAnimationFrame(step);
    else {
      loader.classList.add("out");
      setTimeout(() => loader.remove(), 1100);
    }
  };
  requestAnimationFrame(step);
}

// espera a fonte pra amostrar o nome em partículas com a letra certa
(document.fonts ? document.fonts.ready : Promise.resolve()).then(boot);
