// Smooth scroll saat klik menu navbar
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Navbar transparan jadi solid saat discroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Form contact - simulasi submit
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Terima kasih! Pesan Anda sudah terkirim.");
  this.reset();
});

// Animasi progress bar saat masuk viewport
const progressBars = document.querySelectorAll(".progress-bar");

function animateProgress(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const value = bar.getAttribute("style").match(/width:\s*(\d+)%/)[1];
      bar.style.width = "0%"; // reset dulu
      setTimeout(() => {
        bar.style.width = value + "%";
      }, 200);
      observer.unobserve(bar); // supaya hanya jalan sekali
    }
  });
}

const progressObserver = new IntersectionObserver(animateProgress, {
  threshold: 0.5,
});
progressBars.forEach((bar) => {
  progressObserver.observe(bar);
});

// Scroll reveal sederhana untuk section
const sections = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => {
  section.classList.add("reveal"); // class awal
  revealObserver.observe(section);
});

// Tutup navbar collapse otomatis setelah klik link (mobile)
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.getElementById("navbarNav");
  const navbarToggler = document.querySelector(".navbar-toggler");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });
  });

  document.addEventListener("click", function (event) {
    const isClickInside =
      navbarCollapse.contains(event.target) ||
      navbarToggler.contains(event.target);
    if (!isClickInside && navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  });
});

// === LIGHTBOX DENGAN NAVIGASI ===
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.innerHTML = `
  <span id="lightbox-close" class="close">&times;</span>
  <span id="lightbox-prev" class="prev">&#10094;</span>
  <img id="lightbox-img" src="">
  <span id="lightbox-next" class="next">&#10095;</span>
`;
document.body.appendChild(lightbox);

const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let images = Array.from(
  document.querySelectorAll(".project-card .carousel-item img")
);
let currentIndex = 0;

// === BUKA LIGHTBOX ===
images.forEach((img, index) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = index;
    showImage();
  });
});

function showImage() {
  lightbox.style.display = "flex";
  lightboxImg.src = images[currentIndex].src;
}

// === EVENT HANDLER ===
// Tutup lightbox
lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Navigasi prev/next
lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});
lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

// Tutup kalau klik background
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Keyboard support (ESC, panah kiri/kanan)
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") {
      lightbox.style.display = "none";
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    }
  }
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.querySelectorAll("section").forEach((sec) => {
  sec.style.scrollMarginTop =
    document.querySelector(".navbar").offsetHeight + "px";
});
