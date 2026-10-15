
const STORAGE_KEY = "todoTasks";

// Load saved tasks when the page opens
let tasks = [];

try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];

    if (Array.isArray(parsedTasks)) {
        tasks = parsedTasks.filter(
            task =>
                task &&
                typeof task.text === "string" &&
                typeof task.completed === "boolean"
        );
    }
} catch (error) {
    console.error("Could not load saved tasks:", error);
}

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

// Save tasks to localStorage
function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        alert("Unable to save tasks in this browser.");
        console.error(error);
    }
}

// Display tasks on the page
function renderTasks() {
    taskList.innerHTML = tasks.map((task, index) => `
        <li>
            <input
                type="checkbox"
                data-action="complete"
                data-index="${index}"
                ${task.completed ? "checked" : ""}
                aria-label="Mark task as complete"
            >

            <span class="task-text ${task.completed ? "completed" : ""}"></span>

            <button
                type="button"
                class="delete-btn"
                data-action="delete"
                data-index="${index}"
            >
                Delete
            </button>
        </li>
    `).join("");

    // Display task text safely
    taskList.querySelectorAll(".task-text").forEach((element, index) => {
        element.textContent = tasks[index].text;
    });

    emptyMessage.hidden = tasks.length > 0;
}

// Add a new task
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
});

// Mark a task complete or incomplete
taskList.addEventListener("change", function(event) {
    if (event.target.dataset.action === "complete") {
        const index = Number(event.target.dataset.index);

        if (!tasks[index]) return;

        tasks[index].completed = event.target.checked;

        saveTasks();
        renderTasks();
    }
});

// Delete a task
taskList.addEventListener("click", function(event) {
    const button = event.target.closest('[data-action="delete"]');

    if (!button) return;

    const index = Number(button.dataset.index);

    if (index < 0 || index >= tasks.length) return;

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
});

// Show saved tasks on initial page load
renderTasks();
