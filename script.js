// ------------------ Split ------------------ //

function runSplit() {
  text = new SplitType("[animation=loading-split]", {
    types: "lines, chars",
    lineClass: "line-animation-split",
    charClass: "char-animation-split",
  });
  textfade = new SplitType("[animation=fade-split]", {
    types: "lines, chars",
    lineClass: "line-split-fade",
    charClass: "char-split-fade",
  });
  textheading = new SplitType("[animation=load--heading]", {
    types: "lines",
    lineClass: "animation-heading-split",
  });

  textquotes = new SplitType("[animation=quote-fade]", {
    types: "words",
    wordClass: "quote-fade-split",
  });

  // Wrap each line in a div with class 'overflow-hidden'
  $(".animation-heading-split").each(function () {
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
    textheading.revert();
    textquotes.revert();
    runSplit();
  }
});

// ------------------ gsap ------------------ //

gsap.registerPlugin(ScrollTrigger, CustomEase);

// ------------------ smooth ease ------------------ //

CustomEase.create("smooth", "M0,0 C0.38,0.005 0.215,1 1,1");

// ------------------ loading screen ------------------ //

function pageLoad() {
  let tl = gsap.timeline();

  tl.to(".main-wrapper", {
    opacity: 1,
    ease: "smooth",
    duration: 0.6,
  });

  // Add a label to mark the starting point of simultaneous animations
  tl.add("loadingAnimationsStart");

  // Add the 'loading' animation and set its position to the label
  tl.from(
    "path",
    {
      y: "-100%",
      opacity: "0",
      stagger: { each: 0.02, from: "start" },
      ease: "smooth",
      duration: 0.6,
    },
    "loadingAnimationsStart"
  );
  tl.from(
    ".background--video",
    {
      scale: "1.2",
      opacity: "0",
      stagger: { each: 0.02, from: "start" },
      blur: "20px",
      ease: "smooth",
      duration: 1,
    },
    "loadingAnimationsStart"
  );
  tl.from(
    "[animation=loading]",
    {
      y: "20rem",
      opacity: "0",
      stagger: { each: 0.1, from: "start" },
      ease: "smooth",
      duration: 0.6,
      delay: 0.5,
    },
    "loadingAnimationsStart"
  );


pageLoad();

// ------------------ click and hold ------------------ //

function setupClickAndHold(onHoldComplete, holdDuration = 3000) {
  let holdTimeout;

  document.addEventListener("mousedown", () => {
    // Apply the hold effect to the background video
    gsap.to(".background--video", {
      scale: 1.2,
      opacity: 0.5,
      blur: "10px",
      duration: 0.3,
    });

    // Start the timeout for the hold duration
    holdTimeout = setTimeout(() => {
      onHoldComplete();
    }, holdDuration);
  });

  document.addEventListener("mouseup", () => {
    // Cancel the hold effect if not held long enough
    clearTimeout(holdTimeout);

    // Revert the hold effect
    gsap.to(".background--video", {
      scale: 1,
      opacity: 1,
      blur: "0px",
      duration: 0.3,
    });
  });

  document.addEventListener("mouseleave", () => {
    // Handle case when the mouse leaves the document
    clearTimeout(holdTimeout);

    // Revert the hold effect
    gsap.to(".background--video", {
      scale: 1,
      opacity: 1,
      blur: "0px",
      duration: 0.3,
    });
  });
}

// Initialize the click-and-hold functionality
setupClickAndHold(() => {
  let holdTl = gsap.timeline();
  holdTl.to(".main-wrapper", {
    opacity: 0.5,
    duration: 1,
    ease: "smooth",
  });
  holdTl.to(".main-wrapper", {
    scale: 1.1,
    duration: 1,
    ease: "smooth",
  });
});
});

// ------------------ scroll trigger ------------------ //
document.querySelectorAll(".line-split-fade").forEach(function (fadeSplitElem) {
  gsap.from(fadeSplitElem.querySelectorAll(".char-split-fade"), {
    scrollTrigger: {
      trigger: fadeSplitElem,
      start: "bottom bottom",
      markers: false,
    },
    y: "-100%",
    ease: "smooth",
    duration: 0.6,
    stagger: {
      each: 0.05,
    },
  });
});

document.querySelectorAll("[animation=fade]").forEach(function (fadeSplitElem) {
  gsap.from(fadeSplitElem, {
    scrollTrigger: {
      trigger: fadeSplitElem,
      start: "top bottom-=50",
      markers: false,
    },
    y: "20rem",
    opacity: 0,
    ease: "smooth",
    duration: 0.6,
  });
});

document
  .querySelectorAll("[animation=fade-stagger]")
  .forEach(function (fadeSplitElem) {
    gsap.from(fadeSplitElem.querySelectorAll("[animation=fade-item]"), {
      scrollTrigger: {
        trigger: fadeSplitElem,
        start: "top bottom-=200",
        markers: false,
      },
      y: "40rem",
      opacity: 0,
      ease: "smooth",
      duration: 0.6,
      stagger: {
        each: 0.1,
      },
    });
  });

document.querySelectorAll(".text--rotate.is--1st").forEach(function (element) {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      markers: false,
      scrub: true,
    },
    x: "10vw", // Starting position of the animation
  });
});

document.querySelectorAll(".text--rotate.is--2nd").forEach(function (element) {
  gsap.from(element, {
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

// ------------------ SVG Path for all ------------------- //

// Set initial dash offset to hide the stroke with specific strokeDasharray and strokeDashoffset values
gsap.utils.toArray(".bg--logo").forEach((svg) => {
  const path2 = svg.querySelector(".svgPath");

  // Set initial dash offset to hide the stroke with specific strokeDasharray and strokeDashoffset values
  gsap.set(path2, {
    strokeDasharray: 10000, // Total length of the visible stroke
    strokeDashoffset: 10000, // Start the stroke completely offset (not visible)
  });

  // Animate the stroke drawing on scroll with markers
  gsap.to(path2, {
    strokeDashoffset: 3500, // This will "draw" the path from 10000 to 5500
    scrollTrigger: {
      trigger: svg,
      start: "top center", // Start drawing when the top of SVG is 200px above the bottom of the viewport
      end: "bottom center", // Finish drawing when the bottom of SVG reaches the center of the viewport
      scrub: true, // Smooth scroll-linked animation
      markers: false, // Add markers for visualization
    },
  });
});

// ------------------ quote fade ------------------ //
document
  .querySelectorAll("[animation=quote-fade]")
  .forEach(function (fadeSplitElem) {
    gsap.from(fadeSplitElem.querySelectorAll(".quote-fade-split"), {
      scrollTrigger: {
        trigger: fadeSplitElem,
        start: "top center+=100",
        end: "bottom center+=100",
        markers: false,
        scrub: true,
      },
      opacity: "0.1",
      stagger: {
        each: 0.05,
      },
    });
  });

// --------------------- FAQ ------------------------- //

document.querySelectorAll(".timespace--question").forEach((question) => {
  question.addEventListener("click", function () {
    const activeResponse = document.querySelector(
      ".timespace--response.is--active"
    );
    const currentResponse = this.nextElementSibling;

    // Close the currently active response if it's not the one being clicked
    if (activeResponse && activeResponse !== currentResponse) {
      activeResponse.style.height = "0px";
      activeResponse.classList.remove("is--active");
    }

    // Toggle the clicked response
    if (currentResponse.classList.contains("is--active")) {
      currentResponse.style.height = "0px";
      currentResponse.classList.remove("is--active");
    } else {
      currentResponse.style.height = currentResponse.scrollHeight + "px";
      currentResponse.classList.add("is--active");
    }
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

// ------------------ popup ------------------ //
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const popupInside = document.querySelector(".popup-inside");
  const popupClose = document.querySelector(".popup-close");

  if (!popup || !popupInside || !popupClose) {
    console.error("One or more elements not found:", {
      popup,
      popupInside,
      popupClose,
    });
    return;
  }

  if (!sessionStorage.getItem("popupClosed")) {
    popup.style.display = "flex";
  }

  popupClose.addEventListener("click", function (e) {
    e.preventDefault();
    closePopup();
  });

  popup.addEventListener("click", function (e) {
    if (!popupInside.contains(e.target)) {
      closePopup();
    }
  });

  function closePopup() {
    popup.style.display = "none";
    sessionStorage.setItem("popupClosed", "true");
  }
});

// ------------------ accordion ------------------ //
$(".faq--question").on("click", function () {
  // Close other accordions when opening new one
  if (!$(this).hasClass("open")) {
    $(".faq--question.open").click();
  }
  // Save the sibling of the toggle we clicked on
  let sibling = $(this).siblings(".faq--response");
  let animationDuration = 500;

  if ($(this).hasClass("open")) {
    // Close the content div if already open
    sibling.animate({ height: "0px" }, animationDuration);
  } else {
    // Open the content div if already closed
    sibling.css("height", "auto");
    let autoHeight = sibling.height();
    sibling.css("height", "0px");
    sibling.animate({ height: autoHeight }, animationDuration, () => {
      sibling.css("height", "auto");

      // Scroll the page to the accordion, leaving 200 pixels from the top
    });
  }
  // Open and close the toggle div
  $(this).toggleClass("open");
});

// ------------------ blur play ------------------ //
document.addEventListener("DOMContentLoaded", function () {
  const blurs = document.querySelectorAll(".background--blur");

  blurs.forEach((blur, index) => {
    const updateProperties = () => {
      const randomAngle = Math.random() * 360;
      const randomX = 20 * Math.cos(randomAngle * (Math.PI / 180)); // Move 3vw in the random angle
      const randomY = 20 * Math.sin(randomAngle * (Math.PI / 180)); // Move 3vh in the random angle
      const currentTransform = getComputedStyle(blur).transform;

      let currentX = 0,
        currentY = 0;
      if (currentTransform !== "none") {
        const matrix = new WebKitCSSMatrix(currentTransform);
        currentX = matrix.m41 / (window.innerWidth / 100);
        currentY = matrix.m42 / (window.innerHeight / 100);
      }

      blur.style.transform = `translate(${currentX + randomX}vw, ${
        currentY + randomY
      }vh)`;

      // Toggle opacity between 0 and 1
      blur.style.opacity = blur.style.opacity == 0.5 ? 0 : 0.5;

      // Use a random delay between 1 and 3 seconds for the next move
      setTimeout(updateProperties, Math.random() * 2000 + 1000);
    };

    // Start with a random delay for each element
    setTimeout(updateProperties, index * 500);
  });
});

// ------------------ Menu -------------------- //

let isMenuOpen = false; // Track if the menu is open

document.querySelector(".menu--trigger").addEventListener("click", function () {
  let tl = gsap.timeline();

  if (!isMenuOpen) {
    // Set initial styles for opening
    gsap.set(".navbar--menu-new", {
      display: "flex",
      top: "-50rem",
      height: "0vh",
    });
    gsap.set(".menu--trigger-icon-toopen", { top: "0rem", opacity: "1" });
    gsap.set(".menu--trigger-icon-toclose", { top: "20rem", opacity: "0" });
    gsap.set(".navmenulink-wrapper", { top: "100%" });
    gsap.set(".svg--navbar-menu path", { y: "120%", opacity: 0 });
    gsap.set(".bg--nav-logo path", {
      strokeDasharray: 10000,
      strokeDashoffset: 10000,
    });

    // Add animations to the timeline for opening
    tl.to(
      ".navbar--menu-new",
      { top: "0rem", height: "100vh", duration: 0.6, ease: "smooth" },
      0
    )
      .to(
        ".menu--trigger-icon-toopen",
        { top: "-20rem", opacity: "0", duration: 0.6, ease: "smooth" },
        0
      )
      .to(
        ".menu--trigger-icon-toclose",
        { top: "0rem", opacity: "1", duration: 0.6, ease: "smooth" },
        0
      )
      .to(
        ".navmenulink-wrapper",
        {
          top: "0%",
          duration: 0.6,
          stagger: {
            each: 0.1,
          },
          ease: "smooth",
        },
        0.3 // This starts the stagger slightly after the initial animations
      )
      .to(
        ".svg--navbar-menu path",
        {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          stagger: {
            each: 0.1,
          },
          ease: "smooth",
        },
        0.3 // This starts the stagger slightly after the initial animations
      )
      .to(
        ".bg--nav-logo path",
        {
          strokeDashoffset: 5000,
          duration: 3,
          ease: "smooth",
        },
        0 // Make sure this starts with the above animations
      )
      .to(
        ".container--navbar-new",
        { color: "var(--color--text)", duration: 0.3, ease: "smooth" },
        0
      );

    // Disable scrolling
    document.body.style.overflow = "hidden";

    isMenuOpen = true;
  } else {
    // Reverse the animations for closing
    tl.to(
      ".navbar--menu-new",
      { top: "-50rem", height: "0vh", duration: 0.3, ease: "smooth" },
      0
    )
      .to(
        ".menu--trigger-icon-toopen",
        { top: "0rem", opacity: "1", duration: 0.3, ease: "smooth" },
        0
      )
      .to(
        ".menu--trigger-icon-toclose",
        { top: "20rem", opacity: "0", duration: 0.3, ease: "smooth" },
        0
      )
      .to(
        ".navmenulink-wrapper",
        {
          top: "100%",
          duration: 0.3,
          stagger: {
            each: 0.1,
          },
          ease: "smooth",
        },
        0 // This starts the stagger slightly after the initial animations
      )
      .to(
        ".svg--navbar-menu path",
        {
          y: "100%",
          duration: 0.3,
          stagger: {
            each: 0.1,
          },
          ease: "smooth",
        },
        0 // This starts the stagger slightly after the initial animations
      )
      .to(
        ".bg--nav-logo path",
        {
          strokeDashoffset: 10000,
          duration: 0.3,
          ease: "smooth",
        },
        0 // Make sure this starts with the above animations
      )
      .to(
        ".container--navbar-new",
        { color: "inherit", duration: 0.3, ease: "smooth" },
        0
      )
      .then(() => {
        gsap.set(".navbar--menu-new", { display: "none" }); // Hide the menu after animation
        document.body.style.overflow = ""; // Enable scrolling
      });

    isMenuOpen = false;
  }
});

// navbar color
$(document).ready(function () {
  var scrollTop = 0;
  $(window).scroll(function () {
    scrollTop = $(window).scrollTop();
    if (scrollTop >= 50) {
      $(".navbar--new").addClass("is--scrolled");
    } else if (scrollTop < 50) {
      $(".navbar--new").removeClass("is--scrolled");
    }
  });
});
