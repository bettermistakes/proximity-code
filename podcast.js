document.addEventListener("DOMContentLoaded", function () {
  const timeline = document.querySelector(".richtext--timeline");
  if (!timeline) return;

  const elements = Array.from(timeline.children);
  let newStructure = document.createDocumentFragment();
  let currentRow = null;
  let contentWrapper = null;

  elements.forEach((el) => {
    if (el.tagName === "H3") {
      // Create a new row for each H3
      currentRow = document.createElement("div");
      currentRow.classList.add("grid--timeline-row");

      // Append H3 to the new row
      currentRow.appendChild(el);

      // Create a wrapper for the remaining content
      contentWrapper = document.createElement("div");
      currentRow.appendChild(contentWrapper);

      // Append the row to the new structure
      newStructure.appendChild(currentRow);
    } else {
      // If no H3 was encountered yet, remove the orphaned elements
      if (!currentRow) {
        el.remove();
      } else {
        // Append other elements (H4, P, etc.) to the content wrapper
        contentWrapper.appendChild(el);
      }
    }
  });

  // Replace existing content with the new structure
  timeline.innerHTML = "";
  timeline.appendChild(newStructure);
});

// ----------------------- credit rows ----------------------- //

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".richtext--credits");
  const headings = container.querySelectorAll("h3");

  headings.forEach((h3) => {
    const p = h3.nextElementSibling;

    // Ensure the next element is a <p>
    if (p && p.tagName.toLowerCase() === "p") {
      const wrapper = document.createElement("div");
      wrapper.classList.add("credit--row-wrapper");

      // Move h3 and p inside the wrapper
      container.insertBefore(wrapper, h3);
      wrapper.appendChild(h3);
      wrapper.appendChild(p);
    }
  });
});

// ----------------------- images richtext ----------------------- //

window.addEventListener("DOMContentLoaded", () => {
  const richtext = document.querySelector(".richtext--imgs");
  if (!richtext) return;

  const children = Array.from(richtext.children);
  let currentWrapper = null;

  for (let i = 0; i < children.length; i++) {
    const node = children[i];

    if (node.tagName === "P") {
      const text = node.textContent.trim().toLowerCase();
      const match = text.match(/^(\d)columns$/);

      if (match) {
        // If a wrapper is open, insert it before the current <p>
        if (currentWrapper) {
          richtext.insertBefore(currentWrapper, node);
          currentWrapper = null;
        }

        // Start a new wrapper (but DO NOT append the trigger <p>)
        currentWrapper = document.createElement("div");
        currentWrapper.className = `richtext--${match[1]}columns`;

        // Remove the trigger <p>
        richtext.removeChild(node);
        continue;
      }

      // If a regular <p> and there's an open wrapper, close and insert it
      if (currentWrapper) {
        richtext.insertBefore(currentWrapper, node);
        currentWrapper = null;
      }
    } else if (node.tagName === "FIGURE" && currentWrapper) {
      currentWrapper.appendChild(node);
      continue;
    }

    // If no wrapper is open, just move to the next element
    if (!currentWrapper) {
      continue;
    }
  }

  // If we finished with an open wrapper, insert it at the end
  if (currentWrapper) {
    richtext.appendChild(currentWrapper);
  }
});
