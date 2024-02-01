//window.addEventListener("load", solve);

function solve() {
  const inputSelectors = {
    expense: document.querySelector("#expense"),
    amount: document.querySelector("#amount"),
    date: document.querySelector("#date"),
  };

  const buttonSelector = {
    add: document.querySelector("#add-btn"),
    delete: document.querySelector(".delete"),
  };

  buttonSelector.add.addEventListener("click", addToPreview);
  buttonSelector.delete.addEventListener("click", () => {
    // Reload the current page
    location.reload();
  });
  function addToPreview() {
    if (
      Object.values(inputSelectors).some((selector) => selector.value === "")
    ) {
      return;
    }

    const ulElement = document.querySelector("#preview-list");

    const liElement = createElement("li", null, ["expense-item"]);
    const articleElement = createElement("article");

    createElement(
      "p",
      `Type: ${inputSelectors.expense.value}`,
      [],
      null,
      articleElement
    );
    createElement(
      "p",
      `Amount: ${inputSelectors.amount.value}$`,
      [],
      null,
      articleElement
    );
    createElement(
      "p",
      `Date: ${inputSelectors.date.value}`,
      [],
      null,
      articleElement
    );

    liElement.appendChild(articleElement);

    const divElementButton = createElement("div", null, ["buttons"]);
    const edit = createElement("button", "edit", ["btn", "edit"]);
    edit.addEventListener("click", (e) => {
      const article =
        e.target.parentElement.parentElement.querySelector(":nth-child(1)");

      inputSelectors.expense.value = article
        .querySelector(":nth-child(1)")
        .textContent.slice(6);
      inputSelectors.amount.value = article
        .querySelector(":nth-child(2)")
        .textContent.slice(8, -1);
      inputSelectors.date.value = article
        .querySelector(":nth-child(3)")
        .textContent.slice(6);

      e.target.parentElement.parentElement.remove();

      buttonSelector.add.removeAttribute("disabled");
    });

    const ok = createElement("button", "ok", ["btn", "ok"]);
    ok.addEventListener("click", (e) => {
      const liElement = e.target.parentElement.parentElement;
      const patrnt = document.querySelector("#expenses-list");
      document.querySelector(".buttons").remove();
      patrnt.appendChild(liElement);
      buttonSelector.add.removeAttribute("disabled");
    });
    divElementButton.appendChild(edit);
    divElementButton.appendChild(ok);
    liElement.appendChild(divElementButton);
    ulElement.appendChild(liElement);

    clearInputFild();

    buttonSelector.add.setAttribute("disabled", true);
  }

  function clearInputFild() {
    Object.values(inputSelectors).forEach(
      (inputFild) => (inputFild.value = "")
    );
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
