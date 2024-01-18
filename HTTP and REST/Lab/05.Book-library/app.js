function attachEvents() {
  document.querySelector("#loadBooks").addEventListener("click", getAllBooks);
  document
    .querySelector("#form button")
    .addEventListener("click", hendelFormSumission);
}

async function getAllBooks() {
  const books = await (
    await fetch("http://localhost:3030/jsonstore/collections/books")
  ).json();
  document.querySelector("tbody").innerHTML = "";
  Object.entries(books).forEach(createAndAppendElement);
}

function createAndAppendElement([id, book]) {
  console.log({ id, book });
  const title = document.createElement("td");
  title.textContent = book.title;

  const author = document.createElement("td");
  author.textContent = book.author;

  const editButton = document.createElement("button");
  editButton.setAttribute("data-bookid", id);
  editButton.addEventListener("click", fillEdinForm);
  editButton.textContent = "Edit";

  const deleteButon = document.createElement("button");
  deleteButon.textContent = "Delete";
  deleteButon.setAttribute("data-bookid", id);
  deleteButon.addEventListener("click", deleteBook);

  const button = document.createElement("td");
  button.appendChild(editButton);
  button.appendChild(deleteButon);

  const row = document.createElement("tr");
  row.appendChild(title);
  row.appendChild(author);
  row.appendChild(button);

  document.querySelector("tbody").appendChild(row);
}
async function deleteBook(e) {
  const id = e.currentTarget.dataset.bookid;

  fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
    method: "DELETE",
  });
}

async function fillEdinForm(e) {
  const title =
    e.target.parentElement.parentElement.querySelector(
      "td:first-child"
    ).textContent;
  const author =
    e.target.parentElement.parentElement.querySelector(
      "td:nth-child(2)"
    ).textContent;

  document.querySelector("h3").textContent = "Edit FORM";
  document.querySelector(`#form input[name="title"]`).value = title;
  document.querySelector(`#form input[name="author"]`).value = author;

  document
    .querySelector("#form button")
    .setAttribute("data-bookid", e.currentTarget.dataset.bookid);
}

async function hendelFormSumission(e) {
  const isEditing = document.querySelector("h3").textContent.includes("Edit");
  isEditing ? updateBook(e) : saveBook(e);
}
async function updateBook(e) {
  const id = e.currentTarget.dataset.bookid;

  const title = document.querySelector(`#form input[name="title"]`).value;
  const author = document.querySelector(`#form input[name="author"]`).value;
  fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, author }),
  });
}
async function saveBook(e) {
  const title = document.querySelector(`#form input[name="title"]`).value;
  const author = document.querySelector(`#form input[name="author"]`).value;

  if (!title || !author) {
    return;
  }

  fetch(`http://localhost:3030/jsonstore/collections/books/`, {
    method: "POST",
    body: JSON.stringify({ title, author }),
  });
}
attachEvents();
