let posts;
function attachEvents() {
  document.querySelector("#btnLoadPosts").addEventListener("click", loadPosts);

  document
    .querySelector("#btnViewPost")
    .addEventListener("click", loadSinglePost);
}

async function loadSinglePost() {
  const result = await (
    await fetch(`http://localhost:3030/jsonstore/blog/comments
        `)
  ).json();

  const curentPostId = posts[document.querySelector("#posts").value];
  console.log(curentPostId.id);

  const comments = Object.values(result).filter(
    (comment) => comment.postId === curentPostId.id
  );
  console.log(comments);
  document.querySelector("#post-comments").textContent = "";
  comments.forEach((com) => {
    const ul = document.createElement("li");
    ul.textContent = com.text;
    document.querySelector("#post-comments").appendChild(ul);
  });

  document.querySelector("#post-body").textContent = curentPostId.body;
}

async function loadPosts() {
  const result = await (
    await fetch(`http://localhost:3030/jsonstore/blog/posts`)
  ).json();

  posts = result;
  const postsDropdown = document.querySelector("#posts");

  Object.values(result).forEach((post) => {
    const option = document.createElement("option");
    option.value = post.id;
    option.textContent = post.title;

    postsDropdown.appendChild(option);
  });
}
attachEvents();
