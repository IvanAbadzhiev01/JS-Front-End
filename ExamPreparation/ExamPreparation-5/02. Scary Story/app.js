window.addEventListener("load", solve);

function solve() {
  const inputSelectors = {
    firstName: document.querySelector("#first-name"),
    lastName: document.querySelector("#last-name"),
    age: document.querySelector("#age"),
    storyTitle: document.querySelector("#story-title"),
    genre: document.querySelector("#genre"),
    story: document.querySelector("#story"),
  };
  const button = {
    publish: document.querySelector("#form-btn"),
  };

  const previewList = document.querySelector("#preview-list");

  button.publish.addEventListener("click", publishStory);

  function publishStory() {
    if (
      Object.values(inputSelectors).some((selector) => selector.value === "")
    ) {
      return;
    }

    const liElement = createElement("li", null, ["story-info"]);
    const articleElement = createElement("article");
    const h4Element = createElement(
      "h4",
      `Name: ${inputSelectors.firstName.value} ${inputSelectors.lastName.value}`,
      [],
      null,
      articleElement
    );
    const pAgeElement = createElement(
      "p",
      `Age: ${inputSelectors.age.value}`,
      [],
      null,
      articleElement
    );
    const pTitleElement = createElement(
      "p",
      `Title: ${inputSelectors.storyTitle.value}`,
      [],
      null,
      articleElement
    );
    const pGenreElement = createElement(
      "p",
      `Genre: ${inputSelectors.genre.value}`,
      [],
      null,
      articleElement
    );
    const pDescElement = createElement(
      "p",
      `${inputSelectors.story.value}`,
      [],
      null,
      articleElement
    );
    liElement.appendChild(articleElement);

    const saveBtn = createElement(
      "button",
      "Save Story",
      ["save-btn"],
      null,
      liElement
    );
    saveBtn.addEventListener("click", () => {
      //document.querySelector("div #main").innerHTML = " ";
      document.querySelector("#main").innerHTML =
        "<h1>Your scary story is saved!</h1>";
    });
    const editBtn = createElement(
      "button",
      "Edit Story",
      ["edit-btn"],
      null,
      liElement
    );
    editBtn.addEventListener("click", (e) => {
      const storyInfo = e.target.parentElement;
      const name = storyInfo.firstChild
        .querySelector(":nth-child(1)")
        .textContent.split(": ")[1];

      const firstName = name.split(" ")[0];
      const lastName = name.split(" ")[1];
      const age = storyInfo.firstChild
        .querySelector(":nth-child(2)")
        .textContent.split(": ")[1];
      const storyTitle = storyInfo.firstChild
        .querySelector(":nth-child(3)")
        .textContent.split(": ")[1];

      const genre = storyInfo.firstChild
        .querySelector(":nth-child(4)")
        .textContent.split(": ")[1];
      const desc =
        storyInfo.firstChild.querySelector(":nth-child(5)").textContent;

      inputSelectors.firstName.value = firstName;
      inputSelectors.lastName.value = lastName;
      inputSelectors.age.value = age;
      inputSelectors.storyTitle.value = storyTitle;
      inputSelectors.genre.value = genre;
      inputSelectors.story.value = desc;

      storyInfo.remove();
      button.publish.removeAttribute("disabled");
    });
    const deleteBtn = createElement(
      "button",
      "Delete Story",
      ["delete-btn"],
      null,
      liElement
    );
    deleteBtn.addEventListener("click", (e) => {
      const liElement = e.target.parentElement;
      liElement.remove();
      button.publish.removeAttribute("disabled");
    });

    previewList.appendChild(liElement);
    clearInputFild();
    button.publish.setAttribute("disabled", true);
  }
  //TODO ....
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
