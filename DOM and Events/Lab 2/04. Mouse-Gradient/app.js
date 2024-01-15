function attachGradientEvents() {
  const gradient = document.querySelector("#gradient");
  const gradientBox = document.querySelector("#gradient-box");
  const result = document.querySelector("#result");

  gradient.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX - gradient.getBoundingClientRect().left;
    const gradientWidth = gradient.clientWidth;
    const percentage = Number(Math.floor((mouseX / gradientWidth) * 100));
    result.textContent = percentage + "%";
  });
}
