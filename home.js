// ------------------ loading screen ------------------ //

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

  // Start bouncing clue animation only after the page load finishes
}

pageLoad();

// ------------------ click animation with rotation first ------------------ //

document.addEventListener("click", () => {
  console.log("Click detected: Playing animation timeline.");

  let clickTl = gsap.timeline();

  clickTl.to(".svg--rotate", {
    rotate: 360,
    scale: 1.4,
    duration: 0.8,
    ease: "smooth",
  });

  clickTl.to(
    ".svg",
    {
      scale: 1.4,
      duration: 0.8,
      ease: "smooth",
    },
    "<"
  );

  clickTl.to(
    ".background--video-bg",
    {
      scale: 1.6,
      duration: 0.8,
      ease: "smooth",
    },
    "<"
  );

  clickTl.to(
    ".background--video-bg",
    {
      scale: 10,
      duration: 0.8,
      ease: "smooth",
    },
    "+=0.2"
  );

  clickTl.to(
    ".background--video",
    {
      opacity: 0,
      duration: 0.4,
      ease: "smooth",
    },
    "<"
  );

  clickTl.to(
    ".svg",
    {
      opacity: 0,
      scale: 1.6,
      duration: 0.8,
      ease: "smooth",
    },
    "<"
  );

  clickTl.to(
    ".svg--rotate",
    {
      opacity: 0,
      scale: 1.6,
      duration: 0.8,
      ease: "smooth",
    },
    "<"
  );

  clickTl.to(".section-old.is--home-6", {
    display: "flex",
    opacity: 0,
    duration: 0.8,
    ease: "smooth",
  });

  const staggerSettings = {
    each: 0.01,
    from: "random",
  };

  clickTl.to(
    ".grid-home-cell-wrapper:nth-child(4n+1) .grid-home-cell-hider , .grid-home-cell-wrappernth-child(4n+3) .grid-home-cell-hider",
    {
      width: "0%",
      duration: 0.6,
      ease: "power2.out",
      stagger: staggerSettings,
    },
    "+=0.2"
  );

  clickTl.to(
    ".grid-home-cell-wrappernth-child(4n+2) .grid-home-cell-hider , .grid-home-cell-wrappernth-child(4n+4) .grid-home-cell-hider",
    {
      height: "0%",
      duration: 0.6,
      ease: "power2.out",
      stagger: staggerSettings,
    },
    "<"
  );

  clickTl.from(
    ".grid-home",
    {
      scale: 1.1,
      duration: 0.8,
      ease: "smooth",
    },
    "<"
  );
});
