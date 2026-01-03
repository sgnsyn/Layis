document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".main-header");
  const heroSection = document.querySelector(".hero-section");
  const lazyImages = document.querySelectorAll(".lazy");

  const lazyLoad = (target) => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          img.setAttribute("src", src);
          img.classList.remove("lazy");
          observer.disconnect();
        }
      });
    });
    io.observe(target);
  };

  lazyImages.forEach(lazyLoad);

  window.addEventListener("scroll", () => {
    // Navbar scroll effect
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Parallax scroll effect
    const scrollPosition = window.pageYOffset;
    heroSection.style.backgroundPositionY = scrollPosition * 0.7 + "px";
  });
});
