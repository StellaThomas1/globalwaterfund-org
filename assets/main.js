// Year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Magnetic buttons (premium micro interaction)
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) / r.width;
      const y = (e.clientY - r.top - r.height/2) / r.height;
      btn.style.transform = `translate(${x*10}px, ${y*8}px)`;
    });
    btn.addEventListener("mouseleave", () => btn.style.transform = "translate(0,0)");
  });
}

// Animated wave path (blue, not white)
const wavePath = document.getElementById("wavePath");
let t = 0;
function wave() {
  if (!wavePath) return;
  const w = 1440, h = 180;
  const amp1 = 20, amp2 = 11;
  const y0 = 92;

  const p = [];
  p.push(`M 0 ${h}`);
  p.push(`L 0 ${y0}`);

  for (let x=0; x<=w; x+=24) {
    const a = Math.sin((x/220) + t) * amp1 + Math.sin((x/120) - t*1.4) * amp2;
    p.push(`L ${x} ${y0 + a}`);
  }

  p.push(`L ${w} ${h}`);
  p.push(`Z`);
  wavePath.setAttribute("d", p.join(" "));
  t += 0.028;
  requestAnimationFrame(wave);
}
wave();
