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
    ".svg path",
    {
      y: "100%",
      opacity: "0",
      stagger: { each: 0.02, from: "start" },
      ease: "smooth",
      duration: 0.6,
    },
    "loadingAnimationsStart"
  );
  tl.from(
    ".svg--rotate",
    {
      rotate: 90,
      opacity: "0",
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
      filter: "blur(10px)",
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
}

pageLoad();

// ------------------ click and hold ------------------ //

function setupClickAndHold(onHoldComplete, holdDuration = 1000) {
  let holdTimeout;
  let animationProgress = { progress: 0 }; // Tracks animation progress
  let holdCompleted = false; // Flag to track if hold was completed

  // Function to apply the hold effect
  function applyHoldEffect() {
    gsap.to(animationProgress, {
      progress: 1, // Animate progress from 0 to 1
      duration: holdDuration / 1000, // Convert milliseconds to seconds
      ease: "linear",
      onUpdate: () => {
        const progress = animationProgress.progress;

        // Animate based on progress
        gsap.to(".background--video", {
          scale: 1 + 0.2 * progress, // Scale from 1 to 1.2
          opacity: 1 - 0.5 * progress, // Opacity from 1 to 0.5
          filter: `blur(${10 * progress}px)`, // Blur from 0px to 10px
          overwrite: true, // Prevent conflicting animations
          duration: 0, // Instant updates
        });

        gsap.to(".svg", {
          scale: 1 + 0.4 * progress, // Scale from 1 to 1.4
          filter: `blur(${10 * progress}px)`, // Blur from 0px to 10px
          overwrite: true,
          duration: 0,
        });

        gsap.to(".svg--rotate", {
          scale: 1 + 0.4 * progress, // Scale from 1 to 1.4
          transform: "rotate(360deg)",
          filter: `blur(${10 * progress}px)`, // Blur from 0px to 10px
          overwrite: true,
          duration: 0,
        });
      },
    });

    // Start the timeout for the hold duration
    holdTimeout = setTimeout(() => {
      holdCompleted = true; // Mark hold as completed
      onHoldComplete(); // Trigger the hold complete animation
    }, holdDuration);
  }

  // Function to revert the hold effect smoothly
  function revertHoldEffect() {
    if (holdCompleted) return; // Skip if the hold was completed

    clearTimeout(holdTimeout); // Clear timeout to prevent triggering the hold complete animation
    gsap.killTweensOf(animationProgress); // Stop progress animation

    // Revert to initial state smoothly
    gsap.to(".background--video", {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.6,
    });

    gsap.to(".svg", {
      scale: 1,
      filter: "blur(0px)",
      duration: 0.6,
    });

    gsap.to(".svg--rotate", {
      scale: 1,
      transform: "rotate(0deg)",
      filter: "blur(0px)",
      duration: 0.6,
    });
  }

  document.addEventListener("mousedown", () => {
    holdCompleted = false; // Reset the flag
    animationProgress.progress = 0; // Reset progress
    applyHoldEffect();
  });

  document.addEventListener("mouseup", () => {
    revertHoldEffect();
  });

  document.addEventListener("mouseleave", () => {
    revertHoldEffect();
  });
}

// Initialize the click-and-hold functionality
setupClickAndHold(() => {
  console.log("Hold complete: Playing animation timeline.");

  let holdTl = gsap.timeline();

  // Animation after holding for 3 seconds
  holdTl.to(".background--video", {
    opacity: 0,
    scale: 1.4,
    duration: 0.8,
    ease: "smooth",
  });

  holdTl.to(
    ".svg",
    {
      opacity: 0,
      scale: 1.6,
      duration: 0.8,
      ease: "smooth",
    },
    "<" // Play simultaneously with .background--video
  );

  holdTl.to(
    ".svg--rotate",
    {
      opacity: 0,
      scale: 1.6,
      duration: 0.8,
      ease: "smooth",
    },
    "<" // Play simultaneously with .background--video
  );

  holdTl.to(".section.is--home", {
    display: "flex", // Change display to flex
    opacity: 1, // Fade in
    duration: 0.8,
    ease: "smooth",
  });

  // Define a stagger object to reuse with the same randomization
  const staggerSettings = {
    each: 0.01,
    from: "random", // Random stagger
  };

  // Staggered animation for .grid--element-wrapper and .grid--bg
  holdTl.to(
    ".grid--element-item:nth-child(4n+1) .grid--bg , .grid--element-item:nth-child(4n+3) .grid--bg",
    {
      width: "0%", // Scale down from 1.1 to 1
      duration: 0.6,
      ease: "power2.out",
      stagger: staggerSettings, // Use the shared stagger settings
    },
    "+=0.2" // Delay after the previous animation
  );

  holdTl.to(
    ".grid--element-item:nth-child(4n+2) .grid--bg , .grid--element-item:nth-child(4n+4) .grid--bg",
    {
      height: "0%", // Shrink height to 0%
      duration: 0.6,
      ease: "power2.out",
      stagger: staggerSettings, // Use the same stagger settings
    },
    "<" // Play simultaneously with the previous animation
  );
});
