// -------------------------- font scaling -------------------------- //

function autoScaleText() {
  const container = document.querySelector(".is--project-title");
  const text = document.querySelector(".heading--project");

  if (!container || !text) return;

  // Reset font size before calculation
  text.style.fontSize = "10px";

  let minSize = 10; // Minimum font size
  let maxSize = container.clientWidth; // Maximum based on width
  let fontSize = maxSize;

  text.style.fontSize = fontSize + "px";

  // Binary search to find max font size that fits the width
  while (minSize < maxSize) {
    const midSize = Math.floor((minSize + maxSize) / 2);
    text.style.fontSize = midSize + "px";

    if (text.scrollWidth > container.clientWidth) {
      maxSize = midSize - 1; // Reduce size if text overflows width
    } else {
      minSize = midSize + 1; // Increase size if text fits within width
    }
  }

  text.style.fontSize = maxSize + "px";
}

// Run the function after DOM loads and on resize
window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(autoScaleText);
});
window.addEventListener("resize", autoScaleText);

// -------------------------- countdown -------------------------- //

function parseDateFromText(dateText) {
  return new Date(dateText + " 00:00:00");
}

function startCountdown(targetDate) {
  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) {
      document.querySelector(".countdown").innerHTML = "<h2>Time's up!</h2>";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").innerText = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").innerText = seconds
      .toString()
      .padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Get date from the HTML element
const dateElement = document.querySelector(".countdown-date");

if (dateElement) {
  const dateText = dateElement.textContent.trim();
  const countdownDate = parseDateFromText(dateText).getTime();
  startCountdown(countdownDate);
}

// -------------------------- Trivia selector -------------------------- //

document.querySelectorAll(".option").forEach((option) => {
  option.addEventListener("click", function () {
    let isCorrect = this.getAttribute("data-correct") === "true";
    const triviaDiv = document.getElementById("trivia");
    const textElement = triviaDiv.querySelector(
      '[data-content="correct-text"]'
    );

    if (textElement) {
      textElement.textContent = isCorrect ? "Correct!" : "Incorrect";
    }

    if (isCorrect) {
      setTimeout(() => {
        gsap.to(triviaDiv, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => (triviaDiv.style.display = "none"),
        });
      }, 1000); // Delay of 1 second
    } else {
      gsap.fromTo(
        triviaDiv,
        { x: 0 },
        { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: "power2.inOut" }
      );
    }
  });
});

// -------------------------- trivia slider -------------------------- //

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".is--trivia-slider", {
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 6000, // 3 seconds
      disableOnInteraction: false,
    },
    fadeEffect: {
      crossFade: true,
    },
  });
});
