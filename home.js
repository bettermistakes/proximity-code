// Disable scrolling on page load
document.body.style.overflow = "hidden";

function pageLoad() {
  let tl = gsap.timeline();

  tl.to(".main-wrapper", {
    opacity: 1,
    ease: "smooth",
    duration: 0.6,
  });

  tl.from(".background--video-bg", {
    opacity: 0,
    y: "5vw",
    ease: "smooth",
    duration: 0.6,
  });

  tl.add("loadingAnimationsStart");

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

  tl.to(
    ".background--video",
    {
      opacity: "0",
      ease: "smooth",
      duration: 2,
    },
    "loadingAnimationsStart+=4"
  );

  tl.to(
    ".navbar",
    {
      opacity: "1",
      y: "0rem",
      ease: "smooth",
      duration: 0.6,
    },
    "loadingAnimationsStart+=5"
  );

  tl.from(
    ".socialmedia--icons",
    {
      y: "20rem",
      opacity: "0",
      ease: "smooth",
      duration: 0.6,
    },
    "loadingAnimationsStart+=5"
  );

  // Start bouncing clue animation only after the page load finishes
  tl.call(() => {
    gsap.to(".svg--rotate", {
      rotate: -5, // Rotate -5 degrees from current position
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "power2.inOut",
    });
  });

  // Enable scrolling after animation completes
  tl.call(() => {
    document.body.style.overflow = "auto";
  });
}

pageLoad();
