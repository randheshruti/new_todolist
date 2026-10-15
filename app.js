
import { loadTasks, saveTasks } from "./storage.js";
import { renderTasks } from "./dom.js";

const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = loadTasks();

function updateUI() {
    renderTasks(tasks, taskList);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks(tasks);
    updateUI();

    taskInput.value = "";
    taskInput.focus();
});

taskList.addEventListener("change", function (event) {
    if (event.target.classList.contains("task-checkbox")) {
        const index = Number(event.target.dataset.index);

        tasks[index].completed = event.target.checked;

        saveTasks(tasks);
        updateUI();
    }
});

taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const index = Number(event.target.dataset.index);

        tasks.splice(index, 1);

        saveTasks(tasks);
        updateUI();
    }
});

updateUI();
