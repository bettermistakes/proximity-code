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

  // Start bouncing clue animation only after the page load finishes
  tl.call(() => {
    gsap.to(".svg--rotate", {
      rotate: -5, // Rotate -10 degrees from current position
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "power2.inOut",
    });
  });
}

// Call pageLoad after defining it
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

        // Animate width instead of scale
        gsap.to(".background--video", {
          width: `${40 + 20 * progress}vw`, // Width goes from initial to 60vw
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
          rotate: -360 * progress, // Rotate from 0deg to -360deg
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

    // Revert width back to original state
    gsap.to(".background--video", {
      width: "40vw", // Reset width
      duration: 0.6,
    });

    gsap.to(".svg", {
      scale: 1,
      filter: "blur(0px)",
      duration: 0.6,
    });

    gsap.to(".svg--rotate", {
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      duration: 0.6,
      onComplete: () => {
        // Restart bouncing animation when reset animation completes
        gsap.to(".svg--rotate", {
          rotate: -5, // Rotate -5 degrees from current position
          yoyo: true,
          repeat: -1,
          duration: 1,
          ease: "power2.inOut",
        });
      },
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

  // On successful hold: Expand `.background--video` to full-screen (100vw x 100vh)
  holdTl.to(".background--video", {
    width: "100vw",
    height: "100vh",
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

  // Fade in `.img--absolute`
  holdTl.to(".img--absolute", {
    opacity: 1,
    duration: 0.8,
    ease: "smooth",
  });
});
