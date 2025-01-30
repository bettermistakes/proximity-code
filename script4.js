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

// Set initial state only for `.char-animation-split`
gsap.set(".char-animation-split", { opacity: 0, y: "100%" });

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

let animationCompleted = false; // Track if the animation has already run

function setupClickAndHold(onHoldComplete, holdDuration = 1000) {
  let holdTimeout;
  let animationProgress = { progress: 0 }; // Tracks animation progress
  let holdCompleted = false; // Flag to track if hold was completed

  // Function to apply the hold effect
  function applyHoldEffect() {
    if (animationCompleted) return; // Prevent animation if already completed

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
    if (holdCompleted || animationCompleted) return; // Prevent reset if hold was completed or animation is done

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

  function disableClickAndHold() {
    document.removeEventListener("mousedown", applyHoldEffect);
    document.removeEventListener("mouseup", revertHoldEffect);
    document.removeEventListener("mouseleave", revertHoldEffect);
  }

  document.addEventListener("mousedown", () => {
    if (animationCompleted) return; // Prevent interaction after completion
    holdCompleted = false; // Reset the flag
    animationProgress.progress = 0; // Reset progress
    applyHoldEffect();
  });

  document.addEventListener("mouseup", () => {
    if (animationCompleted) return; // Prevent interaction after completion
    revertHoldEffect();
  });

  document.addEventListener("mouseleave", () => {
    if (animationCompleted) return; // Prevent interaction after completion
    revertHoldEffect();
  });
}

// Initialize the click-and-hold functionality
setupClickAndHold(() => {
  if (animationCompleted) return; // Prevent duplicate execution
  animationCompleted = true; // Mark animation as completed

  console.log("Hold complete: Playing animation timeline.");

  let holdTl = gsap.timeline();

  // On successful hold: Expand `.background--video` to full-screen (100vw x 100vh)
  holdTl.to(".background--video", {
    width: "100vw",
    height: "100vh",
    duration: 0.8,
    borderRadius: "0%",
    ease: "power2.inOut",
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
  holdTl.to(".grid--v4-bg", {
    scale: 0,
    borderRadius: "2vw",
    stagger: { each: 0.01, from: "start" },
    duration: 0.8,
    ease: "smooth",
  });

  // Animate `.char-animation-split` AFTER `.img--absolute` is fully revealed
  holdTl.to(".char-animation-split", {
    opacity: 1,
    y: "0%", // Move to its final position
    stagger: { each: 0.05, from: "start" }, // Staggered animation
    duration: 0.6,
    ease: "smooth",
    onComplete: () => {
      console.log("Animation fully completed. Disabling further interactions.");
      disableClickAndHold(); // Remove event listeners once animation is done
    },
  });
});
