const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#postTitle").value.trim();
  const post_content = document.querySelector("#postContentID").value.trim();

  if (!title || !post_content) {
    return alert("Title and content cannot be empty");
  }

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, post_content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      throw new Error("Error: " + response.statusText);
    }
  } catch (error) {
    alert("Failed to create post: " + error.message);
  }
};

document
  .querySelector("#newPostForm")
  .addEventListener("submit", newFormHandler);
