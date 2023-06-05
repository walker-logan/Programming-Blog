document.querySelector("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector("#emailLogin").value.trim();
  const password = document.querySelector("#passwordLogin").value.trim();

  if (email && password) {
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to log in. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    alert("Please enter your email and password.");
  }
});
