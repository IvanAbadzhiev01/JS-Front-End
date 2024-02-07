window.addEventListener("load", solve);

function solve() {
  const publishBtn = document
    .querySelector("#publish-btn")
    .addEventListener("click", (e) => {
      const input = {
        title: document.querySelector("#task-title"),
        category: document.querySelector("#task-category"),
        content: document.querySelector("#task-content"),
      };
      if (Object.values(input).some((selector) => selector.value === "")) {
        return;
      }

      const titleHeaderElement = document.createElement("h4");
      titleHeaderElement.textContent = input.title.value;

      const categoryParagraphElement = document.createElement("p");
      categoryParagraphElement.textContent = `Category: ${input.category.value}`;

      const contentParagraphElement = document.createElement("p");
      contentParagraphElement.textContent = `Content: ${input.content.value}`;

      const articleElement = document.createElement("article");
      articleElement.appendChild(titleHeaderElement);
      articleElement.appendChild(categoryParagraphElement);
      articleElement.appendChild(contentParagraphElement);

      const buttonElementEdit = document.createElement(`button`);
      buttonElementEdit.classList.add("action-btn", "edit");
      buttonElementEdit.textContent = "Edit";
      const buttonElementPost = document.createElement(`button`);
      buttonElementPost.classList.add("action-btn", "post");
      buttonElementPost.textContent = "Post";

      const liElement = document.createElement("li");
      liElement.classList.add("rpost");
      liElement.appendChild(articleElement);
      liElement.appendChild(buttonElementEdit);
      liElement.appendChild(buttonElementPost);

      document.querySelector("#review-list").appendChild(liElement);

      const titleElement = input.title.value;
      const categoryElement = input.category.value;
      const contentElement = input.content.value;
      Object.values(input).forEach((selector) => (selector.value = ""));
      buttonElementEdit.addEventListener("click", (e) => {
        input.title.value = titleElement;
        input.category.value = categoryElement;
        input.content.value = contentElement;
        document.querySelector("#review-list").removeChild(liElement);
      });
      buttonElementPost.addEventListener("click", (e) => {
        document.querySelector("#review-list").removeChild(liElement);
        liElement.removeChild(buttonElementEdit);
        liElement.removeChild(buttonElementPost);
        document.querySelector("#published-list").appendChild(liElement);
      });
    });
}
