/* MENU overlay */
const overlay = document.getElementById("overlay");
document.getElementById("openMenu")?.addEventListener("click", () => overlay?.classList.add("open"));
document.getElementById("closeMenu")?.addEventListener("click", () => overlay?.classList.remove("open"));
overlay?.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.classList.remove("open");
});

/* Year */
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

/* Globe (Globe.gl) */
(function initGlobe(){
  const el = document.getElementById("globe");
  if (!el || !window.Globe) return;

  const globe = Globe()(el)
    .backgroundColor("rgba(0,0,0,0)")
    .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-night.jpg")
    .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
    .showAtmosphere(true)
    .atmosphereColor("#21D4FF")
    .atmosphereAltitude(0.18);

  // Clean “signals” dataset (placeholder — you can replace later)
  const points = [
    { lat: 25.2048, lng: 55.2708, size: 0.35, color: "rgba(33,212,255,.95)" }, // Dubai
    { lat: 24.7136, lng: 46.6753, size: 0.35, color: "rgba(26,134,255,.95)" }, // Riyadh
    { lat: 38.7223, lng: 9.1393,  size: 0.28, color: "rgba(33,212,255,.85)" }, // Lisbon
    { lat: 37.9838, lng: 23.7275, size: 0.32, color: "rgba(33,212,255,.95)" }, // Athens
    { lat: 46.2044, lng: 6.1432,  size: 0.26, color: "rgba(26,134,255,.85)" }, // Geneva
    { lat: 40.7128, lng: -74.0060, size: 0.30, color: "rgba(33,212,255,.88)" }  // NYC
  ];

  globe
    .pointsData(points)
    .pointAltitude(d => d.size)
    .pointColor(d => d.color)
    .pointRadius(d => 0.22);

  // Arcs: network dependencies / corridors (placeholder)
  const arcs = [
    { startLat: 37.9838, startLng: 23.7275, endLat: 25.2048, endLng: 55.2708 },
    { startLat: 46.2044, startLng: 6.1432,  endLat: 40.7128, endLng: -74.0060 },
    { startLat: 37.9838, startLng: 23.7275, endLat: 46.2044, endLng: 6.1432 },
    { startLat: 24.7136, startLng: 46.6753, endLat: 25.2048, endLng: 55.2708 }
  ];

  globe
    .arcsData(arcs)
    .arcColor(() => ["rgba(33,212,255,.55)", "rgba(26,134,255,.38)"])
    .arcAltitude(0.22)
    .arcStroke(0.75)
    .arcDashLength(0.55)
    .arcDashGap(2.2)
    .arcDashAnimateTime(3200);

  // Styling + camera
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;
  globe.controls().enableZoom = false;

  globe.pointOfView({ lat: 18, lng: 22, altitude: 2.2 }, 0);

  // Resize
  const resize = () => {
    const r = el.getBoundingClientRect();
    globe.width(r.width);
    globe.height(r.height);
  };
  window.addEventListener("resize", resize);
  resize();
})();
