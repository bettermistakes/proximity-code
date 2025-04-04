// ---------------- split ---------------- //

function runSplit() {
  text = new SplitType("[animation=loading-split]", {
    types: "lines, chars",
    charClass: "loading-animation-split",
  });
  textfade = new SplitType("[animation=split-fade]", {
    types: "lines, words",
    wordClass: "animation-split-fade",
  });

  // Wrap each line in a div with class 'overflow-hidden'
  $(".loading-animation-split").each(function () {
    $(this).wrap("<div class='overflow-hidden'></div>");
  });
  $(".animation-split-fade").each(function () {
    $(this).wrap("<div class='overflow-hidden'></div>");
  });
}

runSplit();

// Update on window resize
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    text.revert();
    textfade.revert();
    runSplit();
  }
});

// ---------------- gsap ---------------- //

gsap.registerPlugin(ScrollTrigger, CustomEase);

// ---------------- smooth scroller ---------------- //

let smoother;

function initializeScrollSmoother() {
  if (!smoother) {
    gsap.registerPlugin(ScrollSmoother);

    // Check if the screen width is below 991px
    const shouldEnableEffects = window.innerWidth >= 991;

    smoother = ScrollSmoother.create({
      smooth: 1,
      effects: shouldEnableEffects, // Enable or disable based on screen width
    });
  }
}

function updateOnResize() {
  // Check if smoother instance exists
  if (smoother) {
    // Update the effects property based on the current window width
    smoother.effects(window.innerWidth >= 991);

    // Update the smoother instance
    if (smoother.update) {
      smoother.update();
    }
  }
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// Initialize ScrollSmoother on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initializeScrollSmoother);

// Add debounced resize event listener
window.addEventListener("resize", debounce(updateOnResize, 250));

CustomEase.create("smooth", "M0,0 C0.38,0.005 0.215,1 1,1");

// ---------------- page load ---------------- //

// On Page Load
function pageLoad() {
  let tl = gsap.timeline();

  tl.to("body", {
    opacity: 1,
    ease: "smooth",
    duration: 0.6,
  });

  // Add a label to mark the starting point of simultaneous animations
  tl.add("loadingAnimationsStart");

  // Add the 'loading' animation and set its position to the label
  tl.from(
    ".loading-animation-split",
    {
      y: "40rem",
      opacity: "0",
      stagger: { each: 0.05, from: "start" },
      ease: "smooth",
      duration: 0.6,
    },
    "loadingAnimationsStart"
  );
  tl.from(
    "[animation=loading]",
    {
      y: "20rem",
      opacity: "0",
      rotateX: -20,
      stagger: { each: 0.1, from: "start" },
      ease: "smooth",
      duration: 0.6,
    },
    "loadingAnimationsStart"
  ); // <-- position parameter set to the label

  // Add the 'loading-reverse' animation and set its position to the label
  tl.from(
    "[animation=loading-reverse]",
    {
      y: "-20rem",
      opacity: "0",
      stagger: { each: 0.1, from: "start" },
      ease: "smooth",
      duration: 1,
    },
    "loadingAnimationsStart"
  ); // <-- position parameter set to the label

  // Once animation is done, trigger the video
  tl.eventCallback("onComplete", playVideoAndPauseAtEnd);
}

pageLoad();

// ---------------- about video ---------------- //

function playVideoAndPauseAtEnd() {
  const video = document.getElementById("heroVideo");

  // Optional: make sure it's visible (if hidden initially)
  video.style.display = "block";
  video.play();

  // Pause the video at the last frame
  video.addEventListener("timeupdate", function pauseAtEnd() {
    if (video.duration - video.currentTime <= 0.1) {
      video.pause();
      video.removeEventListener("timeupdate", pauseAtEnd);
    }
  });
}

// ---------------- marquee ---------------- //

// marquee is--scrolling
const scrollSpeed = 50; // pixels per second, adjust as needed

function updateScrollingSpeed() {
  document.querySelectorAll(".marquee--row").forEach((element) => {
    const scrollWidth = element.offsetWidth;
    const duration = scrollWidth / scrollSpeed; // seconds

    element.style.setProperty("--scroll-width", `${scrollWidth}px`);
    element.style.animationDuration = `${duration}s`;
  });
}

// Call initially
updateScrollingSpeed();

// Update on window resize
window.addEventListener("resize", updateScrollingSpeed);

// ---------------- scrolltrigger ---------------- //

// hero animation on scroll
gsap.to(".section.is--hero", {
  scrollTrigger: {
    trigger: ".section.is--hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
    markers: false,
  },
  scale: 0.8,
});

gsap.utils.toArray("[animation=split-fade]").forEach((container) => {
  const splitFadeElements = container.querySelectorAll(".animation-split-fade");

  gsap.from(splitFadeElements, {
    scrollTrigger: {
      trigger: container,
      start: "top bottom", // When the top of the container hits the bottom of the viewport
      end: "bottom top", // When the bottom of the container leaves the top of the viewport
      toggleActions: "play none none none", // Play the animation when the container enters the viewport
      once: true, // Ensures the animation only triggers once
    },
    opacity: 0,
    y: "100%", // translateY
    duration: 0.6, // Duration of the animation
    ease: "smooth",
    delay: 0.3, // Custom easing function
    stagger: {
      amount: 0.1, // Total time for the stagger (in seconds)
    },
  });
});

document
  .querySelectorAll("[animation=fade-stagger]")
  .forEach(function (fadeSplitElem) {
    gsap.from(fadeSplitElem.querySelectorAll("[animation=fade-item]"), {
      scrollTrigger: {
        trigger: fadeSplitElem,
        start: "top bottom",
        markers: false,
      },
      y: "40rem",
      opacity: 0,
      rotateX: -20,
      ease: "smooth",
      duration: 0.6,
      stagger: {
        each: 0.1,
      },
    });
  });

document
  .querySelectorAll("[animation=parallax-movies]")
  .forEach(function (element) {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        markers: false,
        scrub: true,
      },
      x: "-10vw", // Starting position of the animation
    });
  });

// ------------------ FOOTER ------------------ //

document.querySelectorAll(".svg-footer").forEach(function (fadeSplitElem) {
  gsap.from(fadeSplitElem.querySelectorAll("path"), {
    scrollTrigger: {
      trigger: fadeSplitElem,
      start: "top bottom",
      markers: false,
    },
    y: "100%",
    opacity: 0,
    ease: "smooth",
    duration: 0.6,
    stagger: {
      each: 0.05,
    },
    delay: 0.5, // Added delay of 0.5 seconds
  });
});

// ------------------ change year dynamically ------------------ //

document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// ---------------- navbar scroll ---------------- //

// navbar color
$(document).ready(function () {
  var scrollTop = 0;
  $(window).scroll(function () {
    scrollTop = $(window).scrollTop();
    if (scrollTop >= 50) {
      $(".navbar--bg").addClass("is--scrolled");
    } else if (scrollTop < 50) {
      $(".navbar--bg").removeClass("is--scrolled");
    }
  });
});

// ---------------- navbar menu open ---------------- //

let isMenuOpen = false; // Track if the menu is open

document.querySelector(".menu--trigger").addEventListener("click", function () {
  let tl = gsap.timeline();

  if (!isMenuOpen) {
    // Set initial styles for opening
    gsap.set(".navbar--menu", {
      display: "flex",
      top: "-50rem",
      height: "0vh",
    });

    gsap.set(".menu--trigger-content", { top: "0em" });
    gsap.set(".navbar", { color: "#000000" });
    gsap.set(".nav--link-parent", { top: "-20em", opacity: "0" });

    // Add animations to the timeline for opening
    tl.to(
      ".navbar--menu",
      { top: "0rem", height: "100vh", duration: 0.6, ease: "smooth" },
      0
    )

      .to(
        ".menu--trigger-content",
        { top: "-1em", duration: 0.6, ease: "smooth" },
        0
      )
      .to(".navbar", { color: "#ffffff", duration: 0.6, ease: "smooth" }, 0)
      .to(
        ".nav--link-parent",
        {
          top: "0em",
          opacity: "1",
          stagger: {
            amount: 0.2, // Total time for the stagger (in seconds)
          },
          duration: 0.6,
          ease: "smooth",
        },
        0
      );

    // Disable scrolling
    document.body.style.overflow = "hidden";

    isMenuOpen = true;
  } else {
    // Reverse the animations for closing
    tl.to(
      ".navbar--menu",
      { top: "-50rem", height: "0vh", duration: 0.6, ease: "smooth" },
      0
    )

      .to(
        ".menu--trigger-content",
        { top: "0em", duration: 0.6, ease: "smooth" },
        0
      )
      .to(".navbar", { color: "#000000", duration: 0.6, ease: "smooth" }, 0)
      .to(
        ".nav--link-parent",
        {
          top: "-20em",
          opacity: "0",
          stagger: {
            amount: 0.2, // Total time for the stagger (in seconds)
          },
          duration: 0.6,
          ease: "smooth",
        },
        0
      )
      .then(() => {
        gsap.set(".navbar--menu", { display: "none" }); // Hide the menu after animation
        document.body.style.overflow = ""; // Enable scrolling
      });

    isMenuOpen = false;
  }
});

// --------------------- Hover interaction --------------------- //

document.querySelectorAll("[animation=hover-bg]").forEach((element) => {
  const hoverBg = element.querySelector(".hover--bg");

  const handleMouseEnter = (event) => {
    const { top, bottom } = element.getBoundingClientRect();
    const mousePosition = event.clientY;

    if (mousePosition < (top + bottom) / 2) {
      hoverBg.style.top = "0";
      hoverBg.style.height = "0";
      requestAnimationFrame(() => {
        hoverBg.style.transition = "height 0.3s ease, top 0.3s ease";
        hoverBg.style.height = "100%";
      });
    } else {
      hoverBg.style.top = "auto";
      hoverBg.style.bottom = "0";
      hoverBg.style.height = "0";
      requestAnimationFrame(() => {
        hoverBg.style.transition = "height 0.3s ease, bottom 0.3s ease";
        hoverBg.style.height = "100%";
      });
    }
  };

  const handleMouseLeave = (event) => {
    const { top, bottom } = element.getBoundingClientRect();
    const mousePosition = event.clientY;

    if (mousePosition < (top + bottom) / 2) {
      hoverBg.style.top = "0";
      hoverBg.style.transition = "height 0.3s ease, top 0.3s ease";
      hoverBg.style.height = "0";
    } else {
      hoverBg.style.top = "auto";
      hoverBg.style.bottom = "0";
      hoverBg.style.transition = "height 0.3s ease, bottom 0.3s ease";
      hoverBg.style.height = "0";
    }
  };

  element.addEventListener("mouseenter", handleMouseEnter);
  element.addEventListener("mouseleave", handleMouseLeave);
});

// Wait for first mouse movement after page load
window.addEventListener("mousemove", function initialMouseMove(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  document.querySelectorAll("[animation=hover-bg]").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom
    ) {
      // Simulate mouseenter with fake event
      const fakeEvent = { clientY: mouseY };
      const hoverBg = element.querySelector(".hover--bg");
      const { top, bottom } = rect;

      if (mouseY < (top + bottom) / 2) {
        hoverBg.style.top = "0";
        hoverBg.style.height = "0";
        requestAnimationFrame(() => {
          hoverBg.style.transition = "height 0.3s ease, top 0.3s ease";
          hoverBg.style.height = "100%";
        });
      } else {
        hoverBg.style.top = "auto";
        hoverBg.style.bottom = "0";
        hoverBg.style.height = "0";
        requestAnimationFrame(() => {
          hoverBg.style.transition = "height 0.3s ease, bottom 0.3s ease";
          hoverBg.style.height = "100%";
        });
      }
    }
  });

  // Remove this listener after the first movement
  window.removeEventListener("mousemove", initialMouseMove);
});
