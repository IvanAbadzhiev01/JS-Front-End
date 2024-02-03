const API_URL = "http://localhost:3030/jsonstore/tasks";
let lastId = "";
const buttonSelector = {
  load: document.querySelector("#load-course"),
  add: document.querySelector("#add-course"),
  edit: document.querySelector("#edit-course"),
};

const inputSelectors = {
  title: document.querySelector("#course-name"),
  type: document.querySelector("#course-type"),
  description: document.querySelector("#description"),
  teacher: document.querySelector("#teacher-name"),
};

buttonSelector.load.addEventListener("click", loadCourse);
buttonSelector.add.addEventListener("click", addCourse);
buttonSelector.edit.addEventListener("click", editCourse);
async function loadCourse() {
  const respons = await (await fetch(API_URL)).json();

  const UlElement = document.querySelector("#list");
  UlElement.innerHTML = "";

  Object.values(respons).forEach((course) => {
    const containerElement = createElement(
      "div",
      null,
      ["container"],
      course._id
    );

    createElement("h2", course.title, [], null, containerElement);
    createElement("h3", course.teacher, [], null, containerElement);
    createElement("h3", course.type, [], null, containerElement);
    createElement("h4", course.description, [], null, containerElement);

    const edit = createElement("button", "Edit Course", ["edit-btn"]);
    const finish = createElement("button", "Finish", ["finish-btn"]);
    edit.addEventListener("click", (e) => {
      const currContainer = e.target.parentElement;

      const title = currContainer.querySelector(":nth-child(1)").textContent;
      const teacher = currContainer.querySelector(":nth-child(2)").textContent;
      const type = currContainer.querySelector(":nth-child(3)").textContent;
      const description =
        currContainer.querySelector(":nth-child(4)").textContent;
      const _id = currContainer.getAttribute("id");
      lastId = _id;

      inputSelectors.title.value = title;
      inputSelectors.teacher.value = teacher;
      inputSelectors.type.value = type;
      inputSelectors.description.value = description;

      currContainer.remove();
      buttonSelector.edit.removeAttribute("disabled");
      buttonSelector.add.setAttribute("disabled", true);
    });
    finish.addEventListener("click", async (e) => {
      const id = e.target.parentElement.getAttribute("id");

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      await loadCourse();
    });
    containerElement.appendChild(edit);
    containerElement.appendChild(finish);

    UlElement.appendChild(containerElement);
  });
}

async function addCourse(e) {
  if (Object.values(inputSelectors).some((selector) => selector.value === "")) {
    return;
  }

  const typeValid = ["Long", "Medium", "Short"];
  if (!typeValid.includes(inputSelectors.type.value)) {
    return;
  }
  const newCourse = {
    title: inputSelectors.title.value,
    type: inputSelectors.type.value,
    description: inputSelectors.description.value,
    teacher: inputSelectors.teacher.value,
  };

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(newCourse),
  });

  await loadCourse();
  clearInputFild();
}

async function editCourse(e) {
  e.preventDefault();
  if (Object.values(inputSelectors).some((selector) => selector.value === "")) {
    return;
  }
  const typeValid = ["Long", "Medium", "Short"];
  if (!typeValid.includes(inputSelectors.type.value)) {
    return;
  }

  const updateDate = {
    title: inputSelectors.title.value,
    type: inputSelectors.type.value,
    teacher: inputSelectors.teacher.value,
    description: inputSelectors.description.value,
    _id: lastId,
  };

  await fetch(`${API_URL}/${lastId}`, {
    method: "PUT",
    body: JSON.stringify(updateDate),
  });

  buttonSelector.edit.setAttribute("disabled", true);
  buttonSelector.add.removeAttribute("disabled");
  await loadCourse();
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
  Object.values(inputSelectors).forEach((inputFild) => (inputFild.value = ""));
}
