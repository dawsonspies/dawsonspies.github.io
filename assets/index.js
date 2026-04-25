console.log("loaded");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

const elements = document.querySelectorAll(".effect");

elements.forEach(el => {
  el.addEventListener("mouseover", event => {
    let iteration = 0;

    clearInterval(interval);

    const target = event.target.dataset.value;

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return target[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= target.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  });
});
const layers = [
    document.getElementById("layer-1"),
    document.getElementById("layer-2"),
    document.getElementById("layer-3"),
];

const STAR_COUNTS = [80, 120, 160]; // depth density

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

/* =========================
   CREATE STAR LAYERS
========================= */
layers.forEach((layer, index) => {
    for (let i = 0; i < STAR_COUNTS[index]; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        const size = rand(1, 3 - index * 0.5);

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left = `${rand(0, 100)}%`;
        star.style.top = `${rand(0, 100)}%`;

        const baseOpacity = rand(0.2, 0.9);
        star.style.opacity = baseOpacity;

        // flicker
        const speed = rand(800, 5000);

        setInterval(() => {
            star.style.opacity = rand(0.2, 1) * baseOpacity;
        }, speed);

        layer.appendChild(star);
    }
});

/* =========================
   PARALLAX EFFECT
========================= */
document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    layers.forEach((layer, i) => {
        const depth = (i + 1) * 0.5;
        layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
});

/* =========================
   SHOOTING STARS
========================= */
function createShootingStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");

    star.style.left = `${rand(0, 100)}%`;
    star.style.top = `${rand(0, 40)}%`;

    document.querySelector(".starfield").appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 1200);
}

// random intervals (not predictable)
setInterval(() => {
    if (Math.random() > 0.6) {
        createShootingStar();
    }
}, rand(1500, 4000));