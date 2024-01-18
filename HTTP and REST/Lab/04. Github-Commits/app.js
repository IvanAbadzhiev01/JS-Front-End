function loadCommits() {
  const username = document.querySelector("#username").value;
  const repo = document.querySelector("#repo").value;

  fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
    .then((res) => res.json())
    .then((comits) => {
      comits.forEach((comits) => {
        const item = document.createElement("li");
        item.textContent = comits.commit.message;
        document.querySelector("#commits").appendChild(item);
      });
    });
}
