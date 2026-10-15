
const STORAGE_KEY = "todoTasks";

export function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);

        if (!savedTasks) {
            return [];
        }

        const tasks = JSON.parse(savedTasks);

        return Array.isArray(tasks) ? tasks : [];
    } catch (error) {
        console.error("Error loading tasks:", error);
        return [];
    }
}

export function saveTasks(tasks) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Error saving tasks:", error);
    }
}
