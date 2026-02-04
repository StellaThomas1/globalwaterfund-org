// soft reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// footer year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
