function attachEvents() {
  document.querySelector("#btnLoad").addEventListener("click", loadPhonebook);
  document.querySelector("#btnCreate").addEventListener(`click`, newPhone);
}

async function loadPhonebook() {
  const phonebooks = await (
    await fetch(` http://localhost:3030/jsonstore/phonebook`)
  ).json();

  Object.values(phonebooks).forEach((phone) => {
    createPhonebookLine(phone);
  });
}

async function createPhonebookLine(phonebookdata) {
  console.log(phonebookdata._id);
  const phonebookBox = document.querySelector("#phonebook");
  const newElement = document.createElement("li");
  const deleteBtn = document.createElement("button");

  newElement.textContent = `${phonebookdata.person} ${phonebookdata.phone}`;
  deleteBtn.addEventListener("click", deleteContact);
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("data-phoneid", phonebookdata._id);
  newElement.appendChild(deleteBtn);

  phonebookBox.appendChild(newElement);

  const person = phonebookdata.person;
  const phone = phonebookdata.phone;
  const _id = phonebookdata._id;
}
async function deleteContact(e) {
  const id = e.currentTarget.dataset.phoneid;

  await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
    method: "DELETE",
  });
  // console.log(id);
}
async function newPhone() {
  const person = document.querySelector("#person").value;
  const phone = document.querySelector("#phone").value;
  const _id = Math.floor(Math.random() * 100);
  fetch(`http://localhost:3030/jsonstore/phonebook`, {
    method: "POST",
    body: JSON.stringify({ person, phone, _id }),
  });
  createPhonebookLine({
    person: person,
    phone: phone,
    _id: _id,
  });
}

attachEvents();
