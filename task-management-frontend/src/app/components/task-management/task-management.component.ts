import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface Task {
  id: string;
  date: string;
  entityName: string;
  taskType: "Call" | "Meeting" | "Video Call";
  time: string;
  contactPerson: string;
  note?: string;
  status: "Open" | "Closed";
  phoneNumber?: string;
}

@Component({
  selector: "app-task-management",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./task-management.component.html",
  styleUrls: ["./task-management.component.css"],
})
export class TaskManagementComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedTaskType = "All";
  searchTerm = "";
  showTaskTypeDropdown = false;
  showNewTaskModal = false;
  showOptionsFor: string | null = null;
  editingTask: Task | null = null;

  newTask: Task = {
    id: "",
    date: "",
    entityName: "",
    taskType: "Call",
    time: "",
    contactPerson: "",
    note: "",
    status: "Open",
    phoneNumber: "",
  };

  constructor() {}

  ngOnInit() {
    this.fetchTasksFromBackend();
  }

  // ✅ Step 1: Fetch tasks from backend
  fetchTasksFromBackend() {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        this.tasks = data.data;
        this.applyFilters();
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }

  // ✅ Step 2: Save to backend
  saveTask() {
    if (this.editingTask) {
      const index = this.tasks.findIndex((t) => t.id === this.editingTask!.id);
      if (index !== -1) {
        this.tasks[index] = { ...this.newTask };
      }
      this.applyFilters();
      this.closeNewTaskModal();
    } else {
      const newTask: Task = {
        ...this.newTask,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("en-GB"),
      };

      fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to save task");
          return response.json();
        })
        .then((data) => {
          this.tasks.push(data);
          this.applyFilters();
          this.closeNewTaskModal();
        })
        .catch((error) => {
          console.error("Error saving task:", error);
        });
    }
  }

  openNewTaskModal() {
    this.showNewTaskModal = true;
    this.editingTask = null;
    this.resetNewTask();
  }

  closeNewTaskModal() {
    this.showNewTaskModal = false;
    this.editingTask = null;
    this.resetNewTask();
  }

  resetNewTask() {
    this.newTask = {
      id: "",
      date: "",
      entityName: "",
      taskType: "Call",
      time: "",
      contactPerson: "",
      note: "",
      status: "Open",
      phoneNumber: "",
    };
  }

  editTask(task: Task) {
    this.editingTask = task;
    this.newTask = { ...task };
    this.showNewTaskModal = true;
    this.showOptionsFor = null;
  }

  duplicateTask(task: Task) {
    const duplicatedTask: Task = {
      ...task,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-GB"),
    };
    this.tasks.push(duplicatedTask);
    this.applyFilters();
    this.showOptionsFor = null;
  }

  changeStatus(task: Task) {
    task.status = task.status === "Open" ? "Closed" : "Open";
    this.applyFilters();
    this.showOptionsFor = null;
  }

  addNote(task: Task) {
    const note = prompt("Add a note:");
    if (note) {
      task.note = note;
    }
  }

  toggleTaskTypeDropdown() {
    this.showTaskTypeDropdown = !this.showTaskTypeDropdown;
  }

  setTaskType(taskType: string) {
    this.selectedTaskType = taskType;
    this.showTaskTypeDropdown = false;
    this.applyFilters();
  }

  toggleOptions(taskId: string) {
    this.showOptionsFor = this.showOptionsFor === taskId ? null : taskId;
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesTaskType = this.selectedTaskType === "All" || task.taskType === this.selectedTaskType;
      const matchesSearch =
        !this.searchTerm ||
        task.entityName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.contactPerson.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (task.note && task.note.toLowerCase().includes(this.searchTerm.toLowerCase()));
      return matchesTaskType && matchesSearch;
    });
  }
}