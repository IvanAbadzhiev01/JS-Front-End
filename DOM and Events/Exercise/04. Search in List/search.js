function search() {
  let searchText = document.querySelector(`#searchText`).value;

  const text = Array.from(document.querySelectorAll(`li`));
  let counter = 0;
  text.forEach((element) => {
    if (element.textContent.includes(searchText)) {
      element.outerHTML = `<li style="text-decoration: underline;"><b>${element.textContent}</b></li>`;
      // element.style.textDecoration = `underline`;
      counter++;
    }
  });
  document.querySelector(`#result`).textContent = `${counter} matches found`;
}
