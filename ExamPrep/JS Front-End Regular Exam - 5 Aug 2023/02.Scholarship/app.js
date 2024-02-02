window.addEventListener("load", solve);

function solve() {
  const inputFild = {
    name: document.querySelector("#student"),
    university: document.querySelector("#university"),
    score: document.querySelector("#score"),
  };

  const buttonSelector = {
    next: document.querySelector("#next-btn"),
  };

  buttonSelector.next.addEventListener("click", loadElementToPewciew);

  function loadElementToPewciew() {
    if (Object.values(inputFild).some((selector) => selector.value === "")) {
      return;
    }

    const liElement = createElement("li", null, ["application"]);
    const articleElement = createElement("article");
    createElement("h4", inputFild.name.value, [], null, articleElement);
    createElement(
      "p",
      `University: ${inputFild.university.value}`,
      [],
      null,
      articleElement
    );
    createElement(
      "p",
      `Score: ${inputFild.score.value}`,
      [],
      null,
      articleElement
    );

    liElement.appendChild(articleElement);

    const editButton = createElement("button", "edit", ["action-btn", "edit"]);
    const createButton = createElement("button", "apply", [
      "action-btn",
      "apply",
    ]);

    editButton.addEventListener("click", () => {
      const name = document.querySelector("h4").textContent;
      const uni = document
        .querySelector("p:nth-child(2)")
        .textContent.slice(12);
      const score = document
        .querySelector("p:nth-child(3)")
        .textContent.slice(7);

      inputFild.name.value = name;
      inputFild.university.value = uni;
      inputFild.score.value = score;

      document.querySelector(".application").remove();

      buttonSelector.next.removeAttribute("disabled");
    });
    createButton.addEventListener("click", () => {
      document
        .querySelector("#candidates-list")
        .appendChild(createElement("li", null, ["application"]))
        .appendChild(document.querySelector(".application article"));

      document.querySelector(".application").remove();
      buttonSelector.next.removeAttribute("disabled");
    });

    liElement.appendChild(editButton);
    liElement.appendChild(createButton);
    document.querySelector("#preview-list").appendChild(liElement);

    Object.values(inputFild).forEach((selector) => (selector.value = ""));
    buttonSelector.next.setAttribute("disabled", true);
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
}
