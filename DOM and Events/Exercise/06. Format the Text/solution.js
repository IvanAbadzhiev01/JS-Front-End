function solve() {
  const input = Array.from(document.querySelector("#input").value.split("."));
  input.pop();
  const container = document.querySelector(`#output`);
  // while (input.length > 0) {
  //   const p = document.createElement("p");
  //   p.textContent = input
  //     .splice(0, 3)
  //     .map((e) => e.trim())
  //     .join(".");
  //   container.appendChild(p);
  // }

  input.reduce((acc, curr) => {
    if (acc.length === 3) {
      const p = document.createElement("p");
      p.textContent = input
        .splice(0, 3)
        .map((e) => e.trim())
        .join(".");
      container.appendChild(p);
      return [];
    }
    return [...acc, curr];
  }, []);
}
