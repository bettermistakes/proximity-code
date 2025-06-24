document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".is--quote-slider", {
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 3000, // 3 seconds
      disableOnInteraction: false,
    },
    fadeEffect: {
      crossFade: true,
    },
    speed: 500, // transition speed in ms (e.g., 1000ms = 1 second)
  });
});
