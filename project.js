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
