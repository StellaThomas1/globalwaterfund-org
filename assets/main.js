// Year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Magnetic buttons (premium micro-interaction)
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

// Animated wave path (clean “waterline”)
const wavePath = document.getElementById("wavePath");
let t = 0;
function wave() {
  if (!wavePath) return;
  const w = 1440, h = 160;
  const amp1 = 18, amp2 = 10;
  const y0 = 72;

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

// Spinning 3D Globe (Davos signal)
(function globe(){
  const canvas = document.getElementById("globe");
  if (!canvas || !window.THREE || prefersReduced) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 3.6);

  const lightA = new THREE.DirectionalLight(0xffffff, 1.1);
  lightA.position.set(3, 2, 4);
  scene.add(lightA);

  const lightB = new THREE.AmbientLight(0x88aaff, 0.55);
  scene.add(lightB);

  const geometry = new THREE.SphereGeometry(1.05, 64, 64);

  // texture (public from three.js examples CDN)
  const loader = new THREE.TextureLoader();
  const tex = loader.load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );
  tex.anisotropy = 8;

  const material = new THREE.MeshStandardMaterial({
    map: tex,
    metalness: 0.05,
    roughness: 0.95
  });

  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // atmosphere glow
  const glowGeo = new THREE.SphereGeometry(1.09, 64, 64);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x2ad4ff,
    transparent: true,
    opacity: 0.12
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glow);

  function resize(){
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    renderer.setPixelRatio(dpr);
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  let r = 0;
  function animate(){
    r += 0.0032;
    globe.rotation.y = r;
    globe.rotation.x = Math.sin(r*0.4) * 0.03;
    glow.rotation.y = r * 0.92;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
})();
