document.querySelector("#logoutBtn").addEventListener("click", (event) => {
  event.preventDefault();

  fetch("/api/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to log out.");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
