function attachEvents() {
  document.querySelector("#refresh").addEventListener("click", getMessages);
  document.querySelector("#submit").addEventListener("click", sentMessages);
}

async function getMessages() {
  const result = await (
    await fetch("http://localhost:3030/jsonstore/messenger")
  ).json();

  const messageBox = document.querySelector("#messages");
  messageBox.textContent = "";
  Object.values(result).forEach((message) => {
    messageBox.textContent += `${message.author}: ${message.content}\n`;
  });
}
async function sentMessages() {
  const author = document.querySelector(`input[name="author"]`).value;
  const content = document.querySelector(`input[name="content"]`).value;

  fetch("http://localhost:3030/jsonstore/messenger", {
    method: "POST",
    body: JSON.stringify({ author, content }),
  });
}

attachEvents();
