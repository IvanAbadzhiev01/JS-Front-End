window.addEventListener("load", solve);

function solve() {
  const inputFild = {
    player: document.querySelector("#player"),
    score: document.querySelector("#score"),
    round: document.querySelector("#round"),
  };

  const buttonSelector = {
    addButton: document.querySelector("#add-btn"),
    clearButton: document.querySelector(".clear"),
  };

  buttonSelector.addButton.addEventListener("click", addElement);
  buttonSelector.clearButton.addEventListener("click", () => {
    location.reload();
  });
  function addElement() {
    if (Object.values(inputFild).some((selector) => selector.value === "")) {
      return;
    }

    const pTagNameElement = document.createElement("p");
    pTagNameElement.textContent = inputFild.player.value;

    const pTagScoreElement = document.createElement("p");
    pTagScoreElement.textContent = `Score: ${inputFild.score.value}`;

    const pTagRoundElement = document.createElement("p");
    pTagRoundElement.textContent = `Round: ${inputFild.round.value}`;

    const articleElement = document.createElement("article");
    articleElement.appendChild(pTagNameElement);
    articleElement.appendChild(pTagScoreElement);
    articleElement.appendChild(pTagRoundElement);

    const editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.classList.add("btn", "edit");

    const okButton = document.createElement("button");
    okButton.textContent = "ok";
    okButton.classList.add("btn", "ok");

    const liElement = document.createElement("li");
    liElement.classList.add("dart-item");

    editButton.addEventListener("click", () => {
      const name = document.querySelector("article :nth-child(1)").textContent;
      const score = document
        .querySelector("article :nth-child(2)")
        .textContent.split(": ")[1];
      const round = document
        .querySelector("article :nth-child(3)")
        .textContent.split(": ")[1];

      inputFild.player.value = name;
      inputFild.score.value = score;
      inputFild.round.value = round;

      document.querySelector(".dart-item").remove();
      toggleButton(buttonSelector.addButton);
    });
    okButton.addEventListener("click", () => {
      const liElement = document.querySelector(".dart-item");
      liElement.removeChild(document.querySelector(".edit"));
      liElement.removeChild(document.querySelector(".ok"));
      document.querySelector(".dart-item").remove();
      document.querySelector("#scoreboard-list").appendChild(liElement);
      toggleButton(buttonSelector.addButton);
    });
    liElement.appendChild(articleElement);
    liElement.appendChild(editButton);
    liElement.appendChild(okButton);

    document.querySelector("#sure-list").appendChild(liElement);

    clearInputFild();
    toggleButton(buttonSelector.addButton);
  }
  function toggleButton(button) {
    if (button.disabled) {
      // Enable the button
      button.disabled = false;
    } else {
      // Disable the button
      button.disabled = true;
    }
  }

  function clearInputFild() {
    Object.values(inputFild).forEach((inputFild) => (inputFild.value = ""));
  }
}
