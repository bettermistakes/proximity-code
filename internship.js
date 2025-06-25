document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".is--quote-slider", {
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    fadeEffect: {
      crossFade: true,
    },
    speed: 500,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
