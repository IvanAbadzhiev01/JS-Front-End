function extract(content) {
  const text = document.getElementById(content).textContent;

  const regex = /\(([^)]+)\)/g;

  const matches = text.match(regex);

  if (matches) {
    for (const match of matches) {
      console.log(match);
    }
  } else {
    console.log("No matches found.");
  }

  return matches.join("; ");
}

let text = extract("content");

