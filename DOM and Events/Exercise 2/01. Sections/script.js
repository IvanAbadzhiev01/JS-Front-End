function create(words) {
  const content = document.querySelector("#content");

  words.forEach((w) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = w;
    p.style.display = "none";
    div.addEventListener("click", (e) => {
      div.firstChild.style.display = "";
    });
    div.appendChild(p);
    content.appendChild(div);
  });
}
