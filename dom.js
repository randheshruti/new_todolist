
export function renderTasks(tasks, taskList) {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.dataset.index = index;
        checkbox.className = "task-checkbox";
        checkbox.setAttribute("aria-label", `Complete ${task.text}`);

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.dataset.index = index;
        deleteButton.className = "delete-button";
        deleteButton.setAttribute("aria-label", `Delete ${task.text}`);

        li.append(checkbox, span, deleteButton);
        taskList.appendChild(li);
    });
}
