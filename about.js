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
