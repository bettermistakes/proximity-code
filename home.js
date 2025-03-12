gsap.set(".navbar", { color: "white", backgroundColor: "transparent" });

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

  tl.from(
    ".navbar",
    {
      opacity: "0",
      backgroundColor: "#eae9e4",
      y: "-20rem",
      ease: "smooth",
      duration: 0.6,
    },
    "loadingAnimationsStart"
  );

  tl.from(
    ".socialmedia--icons",
    {
      y: "20rem",
      opacity: "0",
      ease: "smooth",
      duration: 0.6,
    },
    "loadingAnimationsStart"
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
}

pageLoad();

// ------------------ Click animation ------------------ //

document
  .querySelector(".section-old.is--home-6")
  .addEventListener("click", (event) => {
    event.stopPropagation(); // Prevents event bubbling if needed
    console.log(
      "Click detected on .section-old.is--home-6: Playing animation timeline."
    );

    let clickTl = gsap.timeline();

    // Stop the bouncing animation before playing the main animation
    gsap.killTweensOf(".svg--rotate");

    clickTl.to(".svg--rotate", {
      rotate: 360,
      scale: 1.6,
      duration: 0.8,
      ease: "smooth",
    });

    clickTl.to(
      ".svg",
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
      opacity: 0,
      duration: 0.8,
      ease: "smooth",
      onComplete: () => {
        gsap.set(".section-old.is--home-6", { display: "none" });
      },
    });

    const staggerSettings = {
      each: 0.01,
      from: "random",
    };

    clickTl.to(
      ".grid-home-cell-wrapper:nth-child(4n+1) .grid-home-cell-hider, .grid-home-cell-wrapper:nth-child(4n+3) .grid-home-cell-hider",
      {
        width: "0%",
        duration: 0.6,
        ease: "power2.out",
        stagger: staggerSettings,
      },
      "+=0.2"
    );

    clickTl.to(
      ".navbar",
      {
        color: "black",
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: staggerSettings,
      },
      "+=0.2"
    );

    clickTl.to(
      ".grid-home-cell-wrapper:nth-child(4n+2) .grid-home-cell-hider, .grid-home-cell-wrapper:nth-child(4n+4) .grid-home-cell-hider",
      {
        height: "0%",
        duration: 0.6,
        ease: "power2.out",
        stagger: staggerSettings,
      },
      "<"
    );

    clickTl.from(
      ".grid-home, .grid-home-layout",
      {
        scale: 1.1,
        duration: 0.8,
        ease: "smooth",
      },
      "<"
    );
  });
