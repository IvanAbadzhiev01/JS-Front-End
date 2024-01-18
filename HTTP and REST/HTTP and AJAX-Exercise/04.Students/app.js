function attachEvents() {
  document.querySelector("#submit").addEventListener("click", submitForm);

}

async function submitForm() {
  const respons = await (
    await fetch(`http://localhost:3030/jsonstore/collections/students`)
  ).json();
  console.log(respons);
}
async function loadData() {
  
}
attachEvents();
