// Form submission event listener
const taskForm = document.querySelector("#task_create_form");
taskForm.addEventListener("submit", () => {
    const taskTitle = document.querySelector("#title").value;
    const taskDescription = document.querySelector("#description").value;
    const taskIndex = document.querySelector("#task_index").value || null;

    // Task object
    const newTask = {
        "task_id": `T#${Date.now()}`,
        "title": taskTitle,
        "description": taskDescription,
        "has_completed": false
    };

    // Validate form inputs
    const isValid = validateTaskInput(newTask);

    if (!isValid) {
        alert("Please check your input.");
        return false;
    }

    // If taskIndex is set, update the task, otherwise create a new one
    if (taskIndex != null) {
        newTask.task_id = taskList[taskIndex].task_id;
        taskList[taskIndex] = newTask;
    } else {
        taskList.push(newTask);
    }

    // Update local storage and refresh the task list
    updateTaskStorage();
    afterTaskSave();
});

// Attach event listeners to task buttons
const initializeEventListeners = () => {
    document.querySelectorAll(".complete_checkbox").forEach((checkbox) => {
        checkbox.addEventListener("click", (event) => {
            const taskId = event.target.getAttribute("data-task_id");
            markTaskComplete(taskId);
        });
    });

    document.querySelectorAll(".delete_btn").forEach((deleteButton) => {
        deleteButton.addEventListener("click", (event) => {
            const taskId = event.target.getAttribute("data-task_id");
            removeTask(taskId);
        });
    });

    document.querySelectorAll(".edit_btn").forEach((editButton) => {
        editButton.addEventListener("click", (event) => {
            const taskId = event.target.getAttribute("data-task_id");
            loadTaskForEdit(taskId);
        });
    });
};

// Load tasks and event listeners on window load
window.addEventListener("load", () => {
    seedInitialTasks();
    displayAllTasks(true);
    initializeEventListeners();
});
