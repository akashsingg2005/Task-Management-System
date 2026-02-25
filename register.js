document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role: "employee"  // force employee role
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registration Successful! Please login.");
    window.location.href = "login.html";
  } else {
    alert(data.message);
  }
});

function goToLogin() {
  window.location.href = "login.html";
}