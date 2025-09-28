document.addEventListener("DOMContentLoaded", () => {
  const specials = document.querySelectorAll(".special");

  specials.forEach(special => {
    const text = special.textContent;
    special.textContent = "";
    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.animationDelay = `${i * 0.05}s`;

      special.appendChild(span);
    });
  });
});