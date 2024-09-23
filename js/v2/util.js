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

// Seed initial tasks if necessary
const seedInitialTasks = () => {
    fetch(`${API_ENDPOINT}/tasks`)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            fetch(`${API_ENDPOINT}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(initialTasks)
            });
        } else {
            taskList = data;
        }
    });
};
