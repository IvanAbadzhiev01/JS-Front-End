const tastsURL = "http://localhost:3030/jsonstore/tasks/";
const courseTypes = ["Long", "Medium", "Short"];
const loadButton = document.querySelector("#load-course");
const addButtonElement = document.querySelector("#add-course");
const formEditBtn = document.querySelector("#edit-course");
loadButton.addEventListener("click", loadCourses);
addButtonElement.addEventListener("click", addCourse);
formEditBtn.addEventListener("click", editCourse);
const input = {
  title: document.querySelector("#course-name"),
  type: document.querySelector("#course-type"),
  description: document.querySelector("#description"),
  teachers: document.querySelector("#teacher-name"),
};

let currentCourseId = "";

async function editCourse(e) {
  e.preventDefault();

  const title = input.title.value;
  const type = input.type.value;
  const description = input.description.value;
  const teacher = input.teachers.value;
  if (!courseTypes.includes(type)) {
    return;
  }
  const course = {
    _id: currentCourseId,
    title,
    type,
    description,
    teacher,
  };
  await fetch(`${tastsURL}/${currentCourseId}`, {
    method: "PUT",
    body: JSON.stringify(course),
  });
  Object.values(input).forEach((input) => (input.value = ""));
  document.querySelector("#add-course").removeAttribute("disabled");
  formEditBtn.setAttribute("disabled", true);

  await loadCourses();
}

async function addCourse(e) {
  e.preventDefault();
  const title = input.title.value;
  const type = input.type.value;
  const description = input.description.value;
  const teacher = input.teachers.value;
  if (!courseTypes.includes(type)) {
    return;
  }
  const course = {
    title,
    type,
    description,
    teacher,
  };
  await fetch(tastsURL, {
    method: "POST",
    body: JSON.stringify(course),
  });

  Object.values(input).forEach((input) => (input.value = ""));
  // document.querySelector("#list").innerHTML = "";
  await loadCourses();
}

async function loadCourses() {
  const courseListElement = document.querySelector("#list");
  courseListElement.innerHTML = "";
  const response = await fetch(tastsURL);
  const data = await response.json();

  const corses = Object.values(data);

  for (const corse of corses) {
    const corseElement = renderCourse(corse);

    corseElement.setAttribute("data-id", corse._id);
    courseListElement.appendChild(corseElement);
  }
}
async function renderCourse(course) {
  const hedingElement = document.createElement("h2");
  hedingElement.textContent = course.title;

  const teacherElement = document.createElement("h3");
  teacherElement.textContent = course.teacher;

  const typeElement = document.createElement("h3");
  typeElement.textContent = course.type;

  const descriptionElement = document.createElement("h4");
  descriptionElement.textContent = course.description;

  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  editButton.textContent = "Edit Course";
  //editButton.setAttribute("disabled", true);

  const finishButton = document.createElement("button");
  finishButton.classList.add("finish-btn");
  finishButton.textContent = "Finish Course";

  const divElement = document.createElement("div");
  divElement.classList.add("container");

  divElement.appendChild(hedingElement);
  divElement.appendChild(teacherElement);
  divElement.appendChild(typeElement);
  divElement.appendChild(descriptionElement);
  divElement.appendChild(editButton);
  divElement.appendChild(finishButton);

  editButton.addEventListener("click", (e) => {
    input.title.value = course.title;
    input.type.value = course.type;
    input.description.value = course.description;
    input.teachers.value = course.teacher;

    currentCourseId = divElement.getAttribute("data-id");
    divElement.remove();
    document.querySelector("#add-course").setAttribute("disabled", true);
    formEditBtn.removeAttribute("disabled");
  });
  finishButton.addEventListener("click", async () => {
    await fetch(`${tastsURL}/${course._id}`, {
      method: "DELETE",
    });

    await loadCourses();
  });
  return divElement;
}
