// API Configuration
const API_BASE_URL = "http://localhost:5000/api"

// Global variables
let tasks = []
let currentStatus = "Open"

// DOM Elements
const connectionStatus = document.getElementById("connection-status")
const tasksTableBody = document.getElementById("tasks-table-body")
const newTaskBtn = document.getElementById("new-task-btn")
const taskModal = document.getElementById("task-modal")
const taskForm = document.getElementById("task-form")
const searchInput = document.getElementById("search-input")

// API Functions
async function checkConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    const data = await response.json()

    if (data.status === "healthy") {
      connectionStatus.innerHTML = "✅ Backend Connected"
      connectionStatus.className = "text-sm text-green-400"
      return true
    }
  } catch (error) {
    connectionStatus.innerHTML = "❌ Backend Disconnected"
    connectionStatus.className = "text-sm text-red-400"
    console.error("Connection error:", error)
    return false
  }
}

async function fetchTasks(search = "") {
  try {
    const url = search ? `${API_BASE_URL}/tasks?search=${encodeURIComponent(search)}` : `${API_BASE_URL}/tasks`
    const response = await fetch(url)
    const result = await response.json()

    if (result.success) {
      tasks = result.data
      renderTasks(tasks)
    } else {
      console.error("Error fetching tasks:", result.error)
      showError("Failed to load tasks")
    }
  } catch (error) {
    console.error("Fetch error:", error)
    showError("Failed to connect to backend")
  }
}

async function createTask(taskData) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })

    const result = await response.json()

    if (result.success) {
      tasks.unshift(result.data)
      renderTasks(tasks)
      closeModal()
      showSuccess("Task created successfully!")
    } else {
      showError(result.error || "Failed to create task")
    }
  } catch (error) {
    console.error("Create task error:", error)
    showError("Failed to create task")
  }
}

async function updateTaskStatus(taskId, newStatus) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })

    const result = await response.json()

    if (result.success) {
      const taskIndex = tasks.findIndex((task) => task.id === taskId)
      if (taskIndex !== -1) {
        tasks[taskIndex] = result.data
        renderTasks(tasks)
      }
    } else {
      showError(result.error || "Failed to update task")
    }
  } catch (error) {
    console.error("Update task error:", error)
    showError("Failed to update task")
  }
}

// UI Functions
function renderTasks(tasksToRender) {
  if (tasksToRender.length === 0) {
    tasksTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-8 text-slate-500">
                    No tasks found. Click "New Task" to add your first task.
                </td>
            </tr>
        `
    return
  }

  tasksTableBody.innerHTML = tasksToRender
    .map(
      (task) => `
        <tr class="border-b hover:bg-slate-50">
            <td class="p-3">${task.date}</td>
            <td class="p-3">
                <span class="text-blue-600 hover:underline cursor-pointer">${task.entityName}</span>
            </td>
            <td class="p-3">
                <div class="flex items-center space-x-2">
                    <span>${getTaskIcon(task.taskType)}</span>
                    <span>${task.taskType}</span>
                </div>
            </td>
            <td class="p-3">${task.time}</td>
            <td class="p-3">${task.contactPerson}</td>
            <td class="p-3">
                <span 
                    class="px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${getStatusClass(task.status)}"
                    onclick="toggleTaskStatus(${task.id}, '${task.status}')">
                    ${task.status}
                </span>
            </td>
        </tr>
    `,
    )
    .join("")
}

function getTaskIcon(taskType) {
  switch (taskType) {
    case "Call":
      return "📞"
    case "Meeting":
      return "👥"
    case "Video Call":
      return "📹"
    default:
      return "📞"
  }
}

function getStatusClass(status) {
  return status === "Open"
    ? "bg-orange-500 text-white hover:bg-orange-600"
    : "bg-slate-500 text-white hover:bg-slate-600"
}

function toggleTaskStatus(taskId, currentStatus) {
  const newStatus = currentStatus === "Open" ? "Closed" : "Open"
  updateTaskStatus(taskId, newStatus)
}

function showModal() {
  taskModal.classList.remove("hidden")
  taskModal.classList.add("flex")
}

function closeModal() {
  taskModal.classList.add("hidden")
  taskModal.classList.remove("flex")
  taskForm.reset()
  currentStatus = "Open"
  updateStatusButtons()
}

function updateStatusButtons() {
  const openBtn = document.getElementById("status-open")
  const closedBtn = document.getElementById("status-closed")

  if (currentStatus === "Open") {
    openBtn.className = "flex-1 py-2 px-4 rounded bg-orange-500 text-white"
    closedBtn.className = "flex-1 py-2 px-4 rounded border border-gray-300"
  } else {
    openBtn.className = "flex-1 py-2 px-4 rounded border border-gray-300"
    closedBtn.className = "flex-1 py-2 px-4 rounded bg-slate-500 text-white"
  }
}

function showSuccess(message) {
  // Simple success notification
  const notification = document.createElement("div")
  notification.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md z-50"
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    document.body.removeChild(notification)
  }, 3000)
}

function showError(message) {
  // Simple error notification
  const notification = document.createElement("div")
  notification.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md z-50"
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    document.body.removeChild(notification)
  }, 3000)
}

// Event Listeners
newTaskBtn.addEventListener("click", showModal)

document.getElementById("cancel-btn").addEventListener("click", closeModal)

document.getElementById("status-open").addEventListener("click", () => {
  currentStatus = "Open"
  updateStatusButtons()
})

document.getElementById("status-closed").addEventListener("click", () => {
  currentStatus = "Closed"
  updateStatusButtons()
})

taskForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(taskForm)
  const taskData = {
    entityName: document.getElementById("entity-name").value,
    date: formatDate(document.getElementById("task-date").value),
    taskType: document.getElementById("task-type").value,
    time: document.getElementById("task-time").value,
    contactPerson: document.getElementById("contact-person").value,
    phoneNumber: document.getElementById("phone-number").value,
    notes: document.getElementById("notes").value,
    status: currentStatus,
  }

  createTask(taskData)
})

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value
  fetchTasks(searchTerm)
})

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Initialize App
async function initApp() {
  console.log("🚀 Initializing Frontend...")

  // Check backend connection
  const isConnected = await checkConnection()

  if (isConnected) {
    // Load initial tasks
    await fetchTasks()
    console.log("✅ App initialized successfully")
  } else {
    console.log("❌ Backend connection failed")
    tasksTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-8 text-red-500">
                    ❌ Cannot connect to backend. Please make sure Flask server is running on http://localhost:5000
                </td>
            </tr>
        `
  }
}

// Start the app
initApp()

// Auto-refresh connection status every 30 seconds
setInterval(checkConnection, 30000)
