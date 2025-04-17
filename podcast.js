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
  const wrapper = document.createElement("div");
  let currentWrapper = null;

  for (let i = 0; i < children.length; i++) {
    const node = children[i];

    if (node.tagName === "P") {
      const text = node.textContent.trim().toLowerCase();
      const match = text.match(/^(\d)columns$/);

      if (match) {
        // Start a new wrapper
        if (currentWrapper) {
          richtext.insertBefore(currentWrapper, node);
        }
        currentWrapper = document.createElement("div");
        currentWrapper.className = `richtext--${match[1]}columns`;
        currentWrapper.appendChild(node);
        continue;
      }

      // If it's a regular <p> and we're wrapping, close the current wrapper
      if (currentWrapper) {
        richtext.insertBefore(currentWrapper, node);
        currentWrapper = null;
      }
    } else if (node.tagName === "FIGURE" && currentWrapper) {
      currentWrapper.appendChild(node);
      continue;
    }

    // If we're not wrapping or it's not part of the group, just append
    if (!currentWrapper) {
      wrapper.appendChild(node);
    }
  }

  // If we finished with an open wrapper, insert it
  if (currentWrapper) {
    richtext.appendChild(currentWrapper);
  }
});
