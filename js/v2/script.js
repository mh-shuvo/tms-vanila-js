// API Endpoint 

const API_ENDPOINT = "http://localhost:3000";

// Form submission event listener
const taskForm = document.querySelector("#task_create_form");
taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

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
        updateTask(newTask);
    } else {
        createTask(newTask);
    }
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
    displayAllTasks();
});

// Create a new task
const createTask = (task) => {
    fetch(`${API_ENDPOINT}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(() => {
        displayAllTasks();
        resetForm();
    });
};

// Update an existing task
const updateTask = (task) => {
    fetch(`${API_ENDPOINT}/tasks/${task.task_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(() => {
        displayAllTasks();
        resetForm();
    });
};

// Remove a task from the list
const removeTask = (taskId) => {
    const isConfirmed = confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
        fetch(`${API_ENDPOINT}/tasks/${taskId}`, {
            method: 'DELETE'
        })
        .then(() => {
            displayAllTasks();
        });
    }
};

// Load a task into the form for editing
const loadTaskForEdit = (taskId) => {
    fetch(`${API_ENDPOINT}/tasks/${taskId}`)
    .then(response => response.json())
    .then(task => {
        document.querySelector("#task_index").value = taskList.findIndex(t => t.task_id === taskId);
        document.querySelector("#title").value = task.title;
        document.querySelector("#description").value = task.description;
    });
};

// Reset the form
const resetForm = () => {
    document.querySelector("#task_index").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
};

// Mark a task as complete
const markTaskComplete = (taskId) => {
    fetch(`${API_ENDPOINT}/tasks/${taskId}`)
    .then(response => response.json())
    .then(task => {
        task.has_completed = true; // Update the completion status
        updateTask(task); // Call updateTask to save the change
    });
};

// Display all tasks in the list
const displayAllTasks = () => {
    fetch(`${API_ENDPOINT}/tasks`)
        .then(response => response.json())
        .then(data => {
            taskList = data;
            const taskContainer = document.querySelector(".tasks");
            let taskHTML = "";
            taskList.forEach((task) => {
                taskHTML += createTaskHTML(task);
            });
            taskContainer.innerHTML = taskHTML;
            initializeEventListeners();
        });
};

// Validate the task input
const validateTaskInput = (task) => {
    return task.title.trim() && task.description.trim();
};

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
