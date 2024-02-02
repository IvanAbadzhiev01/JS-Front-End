window.addEventListener("load", solve);

function solve() {
  const inputSelectors = {
    title: document.querySelector("#task-title"),
    category: document.querySelector("#task-category"),
    content: document.querySelector("#task-content"),
  };
  const buttonSelector = {
    publish: document.querySelector("#publish-btn"),
  };

  buttonSelector.publish.addEventListener("click", addToReview);

  function addToReview() {
    if (
      Object.values(inputSelectors).some((selector) => selector.value === "")
    ) {
      return;
    }

    const ulElement = document.querySelector("#review-list");

    const liElement = createElement("li", null, ["rpost"]);

    const articleElement = createElement("article");

    createElement("h4", inputSelectors.title.value, [], null, articleElement);
    createElement(
      "p",
      `Category: ${inputSelectors.category.value}`,
      [],
      null,
      articleElement
    );
    createElement(
      "p",
      `Content: ${inputSelectors.content.value}`,
      [],
      null,
      articleElement
    );
    liElement.appendChild(articleElement);

    const edit = createElement("button", "Edit", ["action-btn", "edit"]);
    const post = createElement("button", "Post", ["action-btn", "post"]);
    edit.addEventListener("click", (e) => {
      const container = e.target.parentElement;

      const title = container.querySelector(
        "article :nth-child(1)"
      ).textContent;
      const category = container
        .querySelector("article :nth-child(2)")
        .textContent.slice(10);
      const content = container
        .querySelector("article :nth-child(3)")
        .textContent.slice(9);

      inputSelectors.title.value = title;
      inputSelectors.category.value = category;
      inputSelectors.content.value = content;

      container.remove();
    });
    post.addEventListener("click", (e) => {
      const container = e.target.parentElement;

      const child1 = document.querySelector(".edit");
      const child2 = document.querySelector(".post");

      container.removeChild(child1);
      container.removeChild(child2);

      document.querySelector("#published-list").appendChild(container);
      console.log(container);
    });
    liElement.appendChild(edit);
    liElement.appendChild(post);
    ulElement.appendChild(liElement);

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
