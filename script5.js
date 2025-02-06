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

  $(".animation-heading-split").each(function () {
    $(this).wrap("<div class='overflow-hidden'></div>");
  });
}

runSplit();

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

  clickTl.to(".section.is--home", {
    display: "flex",
    opacity: 1,
    duration: 0.8,
    ease: "smooth",
  });

  const staggerSettings = {
    each: 0.01,
    from: "random",
  };

  clickTl.to(
    ".grid--element-item:nth-child(4n+1) .grid--bg , .grid--element-item:nth-child(4n+3) .grid--bg",
    {
      width: "0%",
      duration: 0.6,
      ease: "power2.out",
      stagger: staggerSettings,
    },
    "+=0.2"
  );

  clickTl.to(
    ".grid--element-item:nth-child(4n+2) .grid--bg , .grid--element-item:nth-child(4n+4) .grid--bg",
    {
      height: "0%",
      duration: 0.6,
      ease: "power2.out",
      stagger: staggerSettings,
    },
    "<"
  );

  clickTl.to(
    ".grids",
    {
      scale: 1.1,
      duration: 0.8,
      ease: "smooth",
    },
    "<"
  );
});
