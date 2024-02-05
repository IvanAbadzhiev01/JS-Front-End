window.addEventListener("load", solve);

function solve() {
  const inputSelectors = {
    place: document.querySelector("#place"),
    action: document.querySelector("#action"),
    person: document.querySelector("#person"),
  };

  const buttons = {
    add: document.querySelector("#add-btn"),
  };

  buttons.add.addEventListener("click", addToTasks);

  function addToTasks() {
    if (
      Object.values(inputSelectors).some((selector) => selector.value === "")
    ) {
      return;
    }

    const parentElement = document.querySelector("#task-list");

    const lielement = createElement("li", null, ["clean-task"]);

    const articleElement = createElement("article");

    createElement(
      "p",
      `Place:${inputSelectors.place.value}`,
      [],
      null,
      articleElement
    );
    createElement(
      "p",
      `Action:${inputSelectors.action.value}`,
      [],
      null,
      articleElement
    );
    createElement(
      "p",
      `Person:${inputSelectors.person.value}`,
      [],
      null,
      articleElement
    );

    lielement.appendChild(articleElement);

    const divElement = createElement("div", null, ["buttons"]);
    const edit = createElement("button", "Edit", ["edit"]);
    edit.addEventListener("click", (e) => {
      const article =
        e.target.parentElement.parentElement.querySelector(":nth-child(1)");

      inputSelectors.place.value = article
        .querySelector(":nth-child(1)")
        .textContent.slice(6);
      inputSelectors.action.value = article
        .querySelector(":nth-child(2)")
        .textContent.slice(7);
      inputSelectors.person.value = article
        .querySelector(":nth-child(3)")
        .textContent.slice(7);

      e.target.parentElement.parentElement.remove();
    });

    const done = createElement("button", "Done", ["done"]);

    done.addEventListener("click", (e) => {
      const liElement = e.target.parentElement.parentElement;
      const deleteElement = createElement("button", "Delete", ["delete"]);

      deleteElement.addEventListener("click", (e) => {
        e.target.parentElement.remove();
      });

      liElement.appendChild(deleteElement);
      const patrnt = document.querySelector("#done-list");
      document.querySelector(".buttons").remove();
      patrnt.appendChild(liElement);
    });

    divElement.appendChild(edit);
    divElement.appendChild(done);
    lielement.appendChild(divElement);

    parentElement.appendChild(lielement);
    clearInputFild();
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
    Object.values(inputSelectors).forEach(
      (inputFild) => (inputFild.value = "")
    );
  }
}
