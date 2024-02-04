window.addEventListener("load", solve);

function solve() {
  const inputSelector = {
    player: document.querySelector("#player"),
    score: document.querySelector("#score"),
    round: document.querySelector("#round"),
  };

  const buttonSelector = {
    add: document.querySelector("#add-btn"),
    clear: document.querySelector(".clear"),
  };

  buttonSelector.add.addEventListener("click", moveToMakeSure);
  buttonSelector.clear.addEventListener("click", clearScoreBord);
  function moveToMakeSure() {
    if (
      Object.values(inputSelector).some((selector) => selector.value === "")
    ) {
      return;
    }

    const ulParentEelement = document.querySelector("#sure-list");

    const liElement = createElement("li", null, ["dart-item"]);

    const article = createElement("article");

    createElement("p", inputSelector.player.value, [], null, article);
    createElement(
      "p",
      `Score: ${inputSelector.score.value}`,
      [],
      null,
      article
    );
    createElement(
      "p",
      `Round: ${inputSelector.round.value}`,
      [],
      null,
      article
    );

    const edit = createElement("button", "edit", ["btn", "edit"]);
    edit.addEventListener("click", () => {
      const name = document.querySelector("p:nth-child(1)").textContent;
      const score = document
        .querySelector("p:nth-child(2)")
        .textContent.slice(7);
      const round = document
        .querySelector("p:nth-child(3)")
        .textContent.slice(7);

      inputSelector.player.value = name;
      inputSelector.score.value = score;
      inputSelector.round.value = round;

      document.querySelector(".dart-item").remove();

      buttonSelector.add.removeAttribute("disabled");
    });

    const ok = createElement("button", "ok", ["btn", "ok"]);
    ok.addEventListener("click", () => {
      const parent = document.querySelector(".dart-item");

      const child = document.querySelector(".edit");

      parent.removeChild(child);
      const parent1 = document.querySelector(".dart-item");

      const child1 = document.querySelector(".ok");

      parent1.removeChild(child1);

      const clearBord = document.querySelector(".dart-item");
      document.querySelector("#scoreboard-list").appendChild(clearBord);

      buttonSelector.add.removeAttribute("disabled");
    });
    liElement.appendChild(article);
    liElement.appendChild(edit);
    liElement.appendChild(ok);
    ulParentEelement.appendChild(liElement);

    buttonSelector.add.setAttribute("disabled", true);
    clearInputFild();
  }

  function clearScoreBord() {
    document.querySelector("#scoreboard-list").innerHTML = "";
  }

  function createElement(type, content, classes, id, parent) {
    const element = document.createElement(type);

    if (content) {
      element.textContent = content;
    }
    if (classes && classes.length > 0) {
      element.classList.add(...classes);
    }
    if (id) {
      element.setAttribute("id", id);
    }
    if (parent) {
      parent.appendChild(element);
    }

    return element;
  }
  function clearInputFild() {
    Object.values(inputSelector).forEach((inputFild) => (inputFild.value = ""));
  }
}
