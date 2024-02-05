const API_URL = "http://localhost:3030/jsonstore/gifts";
let lastId;
const inputSelectors = {
  gift: document.querySelector("#gift"),
  for: document.querySelector("#for"),
  price: document.querySelector("#price"),
};
const buttons = {
  load: document.querySelector("#load-presents"),
  add: document.querySelector("#add-present"),
  edit: document.querySelector("#edit-present"),
};

buttons.load.addEventListener("click", loadDate);
buttons.add.addEventListener("click", addPresent);
buttons.edit.addEventListener("click", editPresent);

async function loadDate(e) {
  e.preventDefault();
  const respons = await (await fetch(API_URL)).json();

  const parent = document.querySelector("#gift-list");
  parent.innerHTML = "";
  Object.values(respons).forEach((present) => {
    const divMain = createElement("div", null, ["gift-sock"], present._id);

    const divContainer = createElement("div", null, ["content"]);

    createElement("p", present.gift, [], null, divContainer);
    createElement("p", present.for, [], null, divContainer);
    createElement("p", present.price, [], null, divContainer);
    divMain.appendChild(divContainer);

    const divButtons = createElement("div", null, ["buttons-container"]);

    const change = createElement("button", "Change", ["change-btn"]);
    const deleteBt = createElement("button", "Delete", ["delete-btn"]);
    change.addEventListener("click", (e) => {
      const container = e.target.parentElement.parentElement;
      console.log(container);
      const gift = container.querySelector(
        ".content :nth-child(1)"
      ).textContent;
      const for1 = container.querySelector(
        ".content :nth-child(2)"
      ).textContent;
      const price = container.querySelector(
        ".content :nth-child(3)"
      ).textContent;
      const _id = container.getAttribute("id");

      console.log(gift);
      console.log(for1);
      console.log(price);
      inputSelectors.gift.value = gift;
      inputSelectors.for.value = for1;
      inputSelectors.price.value = price;
      lastId = _id;

      container.remove();

      buttons.add.setAttribute("disabled", true);
      buttons.edit.removeAttribute("disabled");
    });
    deleteBt.addEventListener("click", async (e) => {
      const id = e.target.parentElement.parentElement.getAttribute("id");

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      await loadDate();
    });

    divButtons.appendChild(change);
    divButtons.appendChild(deleteBt);

    divMain.appendChild(divButtons);

    parent.appendChild(divMain);
  });
}

async function addPresent(e) {
  if (Object.values(inputSelectors).some((selector) => selector.value === "")) {
    return;
  }

  const newPresent = {
    gift: inputSelectors.gift.value,
    for: inputSelectors.for.value,
    price: inputSelectors.price.value,
  };
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(newPresent),
  });
  clearInputFild();
  await loadDate();
}

async function editPresent(e) {
  e.preventDefault();

  const newData = {
    gift: inputSelectors.gift.value,
    for: inputSelectors.for.value,
    price: inputSelectors.price.value,
    _id: lastId,
  };

  await fetch(`${API_URL}/${lastId}`, {
    method: "PUT",
    body: JSON.stringify(newData),
  });

  await loadDate();
  buttons.edit.setAttribute("disabled", true);
  buttons.add.removeAttribute("disabled");
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
