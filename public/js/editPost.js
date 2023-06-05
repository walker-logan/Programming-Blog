const postId = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];

const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#postTitle").value.trim();
  const content = document.querySelector("#postContentID").value.trim();

  if (!title || !content) {
    return alert("Title and content cannot be empty");
  }

  const response = await fetch(`/api/post/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    alert("Post updated successfully");
    document.location.replace("/dashboard");
  } else {
    alert("Failed to update post");
  }
};

const deletePostHandler = async () => {
  const response = await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Post deleted successfully");
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post");
  }
};

document
  .querySelector("#deleteBtn")
  .addEventListener("click", deletePostHandler);

document
  .querySelector("#editPostForm")
  .addEventListener("submit", editFormHandler);
