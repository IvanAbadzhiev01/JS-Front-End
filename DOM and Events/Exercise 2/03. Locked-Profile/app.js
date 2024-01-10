function lockedProfile() {
  const button = Array.from(document.querySelectorAll("button"));

  button.forEach((but) => {
    but.addEventListener("click", (e) => {
      const lockdChecbox =
        e.currentTarget.parentElement.querySelector(`input[type=radio]`);

      if (lockdChecbox.checked) {
        return;
      }
      const hiddenInfo = e.currentTarget.parentElement.querySelector("div");

      const isHiden = e.currentTarget.textContent === "Show more";
      hiddenInfo.style.display = isHiden ? "block" : "none";
      e.currentTarget.textContent = isHiden ? "Hide it" : "Show more";
    });
  });
}
