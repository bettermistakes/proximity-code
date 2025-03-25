function pageLoad() {
  let tl = gsap.timeline();

  tl.to(".main-wrapper", {
    opacity: 1,
    ease: "smooth",
    duration: 0.6,
  });

  tl.add("loadingAnimationsStart");

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
  );

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
  );

  // Once animation is done, trigger the video
  tl.eventCallback("onComplete", playVideoAndPauseAtEnd);
}

pageLoad();

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
