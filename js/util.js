// Initial dummy task data
const initialTasks = [
    {
        "task_id": "T#01",
        "title": "Meeting with Akhilesh at 10:00 AM",
        "description": "We will discuss the upcoming CRM project.",
        "has_completed": false,
    },
    {
        "task_id": "T#02",
        "title": "Requirement Analysis with Team Lead",
        "description": "We will discuss CRM project requirements.",
        "has_completed": true,
    },
    {
        "task_id": "T#03",
        "title": "Lunch Break",
        "description": "Have a healthy lunch.",
        "has_completed": false,
    }
];

let taskList = [];

// Generate the HTML for a single task
const createTaskHTML = (task) => {
    let taskTitle = `(${task.task_id}) ${task.title}`;
    let taskButtons = `
        <input type="checkbox" class="complete_checkbox" data-task_id="${task.task_id}">
        <button type="button" class="edit_btn fa fa-edit" data-task_id="${task.task_id}"></button>`;

    if (task.has_completed) {
        taskTitle = `<del>${taskTitle}</del>`;
        taskButtons = ``;
    }

    return `
        <div class="task" data-task_id="${task.task_id}">
            <div>
                <h3 class="task-title">${taskTitle}</h3>
                <p class="task-description">${task.description}</p>
            </div>
            <div>
                ${taskButtons}
                <button type="button" class="delete_btn fa fa-trash" data-task_id="${task.task_id}"></button>
            </div>
        </div>`;
};

// Display all tasks in the list
const displayAllTasks = (refreshRequired = false) => {
    const taskContainer = document.querySelector(".tasks");
    let taskHTML = "";

    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage && refreshRequired) {
        taskList = JSON.parse(tasksFromStorage);
    }

    taskList.forEach((task) => {
        taskHTML += createTaskHTML(task);
    });

    taskContainer.innerHTML = taskHTML;
};

// Validate the task input
const validateTaskInput = (task) => {
    return task.title.trim() && task.description.trim();
};

// Refresh task list and re-attach event listeners
const refreshTaskList = () => {
    displayAllTasks(true);
    initializeEventListeners();  // Re-attach event listeners after updating the list
};

// Find task index by task_id
const findTaskIndexById = (taskId) => {
    return taskList.findIndex((task) => task.task_id === taskId);
};

// Mark a task as complete
const markTaskComplete = (taskId) => {
    const taskIndex = findTaskIndexById(taskId);
    if (taskIndex >= 0) {
        taskList[taskIndex].has_completed = true;
        refreshTaskList();
    }
};

// Remove a task from the list
const removeTask = (taskId) => {
    const taskIndex = findTaskIndexById(taskId);
    const isConfirmed = confirm("Are you sure you want to delete this task?");
    if (taskIndex >= 0 && isConfirmed) {
        taskList.splice(taskIndex, 1);
        updateTaskStorage();
        refreshTaskList();
    }
};

// Load a task into the form for editing
const loadTaskForEdit = (taskId) => {
    const taskIndex = findTaskIndexById(taskId);
    if (taskIndex >= 0) {
        const task = taskList[taskIndex];
        document.querySelector("#task_index").value = taskIndex;
        document.querySelector("#title").value = task.title;
        document.querySelector("#description").value = task.description;
    }
};

// After saving a task, reset the form and re-attach listeners
const afterTaskSave = () => {
    displayAllTasks();
    document.querySelector("#clear_btn").click();
    initializeEventListeners();
};

// Update tasks in local storage
const updateTaskStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
};

// Seed initial tasks if local storage is empty
const seedInitialTasks = () => {
    const tasksInStorage = localStorage.getItem("tasks");
    if (!tasksInStorage) {
        localStorage.setItem("tasks", JSON.stringify(initialTasks));
        taskList.push(...initialTasks);
    } else {
        taskList = JSON.parse(tasksInStorage);
    }
};
