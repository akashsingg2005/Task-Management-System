const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// LOAD EMPLOYEES IN DROPDOWN
async function loadEmployees() {
  const res = await fetch("/api/auth/users", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const users = await res.json();
  const select = document.getElementById("assignedTo");

  select.innerHTML = '<option value="">Select Employee</option>';

  users.forEach(user => {
    if (user.role === "employee") {
      select.innerHTML += `
        <option value="${user._id}">${user.name}</option>
      `;
    }
  });
}

// LOAD TASKS
async function loadTasks() {
  const res = await fetch("/api/tasks", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const tasks = await res.json();

  // Stats
  document.getElementById("totalTasks").innerText = tasks.length;

  const completed = tasks.filter(t => t.status === "Completed").length;
  document.getElementById("completedTasks").innerText = completed;

  const pending = tasks.filter(t => t.status !== "Completed").length;
  document.getElementById("pendingTasks").innerText = pending;

  const table = document.getElementById("taskTable");
  table.innerHTML = "";

  tasks.forEach(task => {
    table.innerHTML += `
      <tr>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.priority}</td>
        <td>
          <select onchange="updateStatus('${task._id}', this.value)">
            <option value="Pending" ${task.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
          </select>
        </td>
        <td>${new Date(task.deadline).toLocaleDateString()}</td>
        <td>
          <button onclick="deleteTask('${task._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// CREATE TASK
document.getElementById("taskForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;
  const assignedTo = document.getElementById("assignedTo").value;

  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      title,
      description,
      priority,
      deadline,
      assignedTo
    })
  });

  if (res.ok) {
    alert("Task Created");
    loadTasks();
  } else {
    alert("Error creating task");
  }
});

// DELETE TASK
async function deleteTask(id) {
  if (!confirm("Are you sure?")) return;

  const res = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });

  if (res.ok) {
    loadTasks();
  }
}

// UPDATE STATUS
async function updateStatus(id, newStatus) {
  await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ status: newStatus })
  });

  loadTasks();
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

loadEmployees();
loadTasks();