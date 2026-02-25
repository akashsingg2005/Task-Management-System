// ================= TOKEN CHECK =================

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// ================= LOAD MY TASKS =================

async function loadMyTasks() {
  try {
    const res = await fetch("https://task-management-system-gx89.onrender.com/api/tasks", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    if (!res.ok) {
      console.log("Failed to fetch tasks. Status:", res.status);
      return;
    }

    const tasks = await res.json();

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
          <td>
            ${task.deadline ? new Date(task.deadline).toLocaleDateString() : ""}
          </td>
        </tr>
      `;
    });

  } catch (error) {
    console.log("Error loading tasks:", error);
  }
}

// ================= UPDATE TASK STATUS =================

async function updateStatus(id, newStatus) {
  try {
    console.log("Updating:", id, newStatus);

    const res = await fetch(`https://task-management-system-gx89.onrender.com/api/tasks/${id}/status`, {
      method: "PATCH", // 🔥 IMPORTANT
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (!res.ok) {
      console.log("Update failed. Status:", res.status);
      alert("Not allowed or update failed");
      loadMyTasks(); // Reset dropdown to DB value
      return;
    }

    console.log("Update successful");
    loadMyTasks();

  } catch (error) {
    console.log("Error updating status:", error);
  }
}

// ================= LOGOUT =================

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

// ================= INITIAL LOAD =================

loadMyTasks();