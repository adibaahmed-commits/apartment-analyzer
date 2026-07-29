const canvas = document.createElement("canvas");
canvas.id = "bgCanvas";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
let width, height;
let columns = [];

const CODE_SNIPPETS = [
  "const building_id", "await fetch(", "response.json()",
  "if (!response.ok)", "building.floors", "return data;",
  "function analyze(", "status: 'scanning'", "image_url:",
  "0x4CD6E0", "class Building", "def scan_image(",
  "return building", "async function", "try {", "} catch (e) {",
  "confidence: 0.9", "building.style", "GET /buildings",
  "POST /analyze", "true", "false", "null", "=>", "{ ... }"
];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  buildColumns();
}
window.addEventListener("resize", resize);

const FONT_SIZE = 14;
const COL_GAP = 20;

function buildColumns() {
  columns = [];
  const count = Math.floor(width / COL_GAP);

  for (let i = 0; i < count; i++) {
    columns.push({
      x: i * COL_GAP,
      y: Math.random() * -height,
      speed: 0.6 + Math.random() * 1.4,
      opacity: 0.15 + Math.random() * 0.5,
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]
    });
  }
}

function draw() {
  ctx.fillStyle = "rgba(10, 18, 31, 0.25)";
  ctx.fillRect(0, 0, width, height);

  ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;
  ctx.textBaseline = "top";

  for (let c of columns) {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(Math.PI / 2);

    ctx.shadowColor = "rgba(76, 214, 224, 0.9)";
    ctx.shadowBlur = 8;
    ctx.fillStyle = `rgba(76, 214, 224, ${c.opacity})`;
    ctx.fillText(c.text, 0, 0);

    ctx.restore();

    c.y += c.speed;

    if (c.y > height) {
      c.y = -50 - Math.random() * 200;
      c.speed = 0.6 + Math.random() * 1.4;
      c.opacity = 0.15 + Math.random() * 0.5;
      c.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
    }
  }

  requestAnimationFrame(draw);
}

resize();
ctx.fillStyle = "#0A121F";
ctx.fillRect(0, 0, width, height);
draw();