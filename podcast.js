document.addEventListener("DOMContentLoaded", function () {
  const timeline = document.querySelector(".richtext--timeline");
  if (!timeline) return;

  const elements = Array.from(timeline.children);
  let newStructure = document.createDocumentFragment();
  let currentRow = null;

  elements.forEach((el) => {
    if (el.tagName === "H3") {
      // Create a new row for each H3
      currentRow = document.createElement("div");
      currentRow.classList.add("grid--timeline-row");

      // Append H3 to the new row
      currentRow.appendChild(el);

      // Create a wrapper for the remaining content
      var contentWrapper = document.createElement("div");
      currentRow.appendChild(contentWrapper);

      // Append the row to the new structure
      newStructure.appendChild(currentRow);
    } else if (currentRow) {
      // Append other elements (H4, P, etc.) to the content wrapper
      contentWrapper.appendChild(el);
    }
  });

  // Replace existing content with the new structure
  timeline.innerHTML = "";
  timeline.appendChild(newStructure);
});
