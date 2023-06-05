document.querySelector("#signupForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#nameSignup").value.trim();
  const email = document.querySelector("#emailSignup").value.trim();
  const password = document.querySelector("#passwordSignup").value.trim();

  if (name && email && password) {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => {
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to sign up. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    alert("Please enter your name, email, and password.");
  }
});
