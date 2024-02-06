window.addEventListener("load", solve);

function solve() {
  const tasks = {};
  const inputSelectors = {
    title: document.querySelector("#title"),
    description: document.querySelector("#description"),
    lable: document.querySelector("#label"),
    points: document.querySelector("#points"),
    assignee: document.querySelector("#assignee"),
  };

  const selectors = {
    hiddenInput: document.querySelector("#task-id"),
    createButton: document.querySelector("#create-task-btn"),
    tasksSection: document.querySelector("#tasks-section"),
    totalPoints: document.querySelector("#total-sprint-points"),
    deleteButton: document.querySelector("#delete-task-btn"),
  };
  const icons = {
    Feature: "&#8865",
    "Low Priority Bug": "&#9737",
    "High Priority Bug": "&#9888",
  };
  const labelClasses = {
    Feature: "feature",
    "Low Priority Bug": "low-priority",
    "High Priority Bug": "high-priority",
  };
  selectors.createButton.addEventListener("click", crateTask);
  selectors.deleteButton.addEventListener("click", deleteTask);
  function crateTask(e) {
    if (
      Object.values(inputSelectors).some((selector) => selector.value === "")
    ) {
      return;
    }

    const task = {
      id: `task-${Object.values(tasks).length + 1}`,
      title: inputSelectors.title.value,
      description: inputSelectors.description.value,
      lable: inputSelectors.lable.value,
      points: Number(inputSelectors.points.value),
      assignee: inputSelectors.assignee.value,
    };
    tasks[task.id] = task;

    const article = createElement("article", null, ["task-card"], task.id);

    createElement(
      "div",
      `${task.lable} ${icons[task.lable]}`,
      ["task-card-label", labelClasses[task.lable]],
      null,
      article,
      true
    );

    createElement("h3", task.title, ["task-card-title"], null, article);

    createElement(
      "p",
      task.description,
      ["task-card.discription"],
      null,
      article
    );
    createElement(
      "div",
      `Estimated at ${task.points} pts`,
      ["task-card-points"],
      null,
      article
    );
    createElement(
      "div",
      `Assigned to: ${task.assignee}`,
      ["task-card-assignee"],
      null,
      article
    );

    const taskActions = createElement(
      "div",
      null,
      ["task-card-actions"],
      null,
      article
    );
    const button = createElement("button", "Delete", [], null, taskActions);
    button.addEventListener("click", loadDeleteConfirm);
    selectors.tasksSection.appendChild(article);
    calculateTotalPoints();
    Object.values(inputSelectors).forEach((input) => {
      input.value = "";
    });
  }
  function createElement(type, content, classes, id, parent, useInnerHTML) {
    const element = document.createElement(type);
    if (useInnerHTML && content) {
      element.innerHTML = content;
    } else if (content) {
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
  function loadDeleteConfirm(e) {
    const taskId =
      e.currentTarget.parentElement.parentElement.getAttribute("id");

    Object.keys(inputSelectors).forEach((key) => {
      const selector = inputSelectors[key];
      selector.value = tasks[taskId][key];
      selector.setAttribute("disabled", true);
    });

    selectors.hiddenInput.value = taskId;
    selectors.createButton.setAttribute("disabled", true);
    selectors.deleteButton.removeAttribute("disabled");
  }
  function deleteTask(e) {
    const taskId = selectors.hiddenInput.value;
    const taskElement = document.querySelector(`#${taskId}`);
    taskElement.remove();
    delete tasks[taskId];
    Object.values(inputSelectors).forEach((selector) => {
      selector.value = "";
      selector.disabled = false;
    });

    selectors.createButton.removeAttribute("disabled");
    selectors.deleteButton.setAttribute("disabled", true);

    calculateTotalPoints();
  }

  function calculateTotalPoints() {
    const totalPoints = Object.values(tasks).reduce((acc, curr) => {
      return acc + curr.points;
    }, 0);

    selectors.totalPoints.textContent = `Total Points ${totalPoints}pts`;
  }
}
