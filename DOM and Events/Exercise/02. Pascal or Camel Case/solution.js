function solve() {
  const text = document.getElementById("text").value.toString().toLowerCase();
  const convention = document.getElementById("naming-convention").value;

  if (convention === "Camel Case") {
    function camelCase(text) {
      // Using replace method with regEx
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index == 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
    }
    const res = camelCase(text);
    document.getElementById("result").textContent = res;
  } else if (convention === "Pascal Case") {
    const toPascalCase = (text) =>
      text
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
        .join("");

    document.getElementById("result").textContent = toPascalCase(text);
  } else {
    document.getElementById("result").textContent = "Error!";
  }
}
