function validate() {
  const emailInput = document.getElementById("email");

  // Function to validate the email
  function validateEmail(email) {
    const regex = /^[a-z]+@[a-z]+\.[a-z]+$/;
    return regex.test(email);
  }

  // Function to handle the change event
  function handleEmailChange() {
    const email = emailInput.value.toLowerCase(); // Convert to lowercase
    if (validateEmail(email)) {
      emailInput.classList.remove("error");
    } else {
      emailInput.classList.add("error");
    }
  }

  // Add the event listener for the change event
  emailInput.addEventListener("change", handleEmailChange);
}
