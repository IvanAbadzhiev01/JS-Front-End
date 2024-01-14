function deleteByEmail() {
  const input = document.querySelector(`input[name="email"]`).value;
  const email = Array.from(document.querySelectorAll("td:nth-child(2)"));

  email.forEach((element) => {
    if (element.textContent.includes(input)) {
      element.parentElement.remove();
      document.querySelector("#result").textContent = "Deleted";
    } else {
      document.querySelector("#result").textContent = "Not found.";
    }
  });
}
