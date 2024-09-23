# Task Management System

## Project Overview

This is a simple task management system that allows users to create, edit, delete, and mark tasks as completed. The system stores tasks in the browser's local storage to persist data without using a backend server. This project follows Object-Oriented principles and uses vanilla JavaScript, HTML, and CSS.

---

## 🛠️ Technical Requirements

### Frontend
- **HTML**: Structure the layout, including a task list and form for task input.
- **CSS**: Style the task list and form to ensure a clean, user-friendly interface.
- **JavaScript**: 
  - Manipulate DOM to dynamically add, update, and remove tasks.
  - Store task data using local storage.
  - Validate input data for completeness.
  - Handle task state changes (completed, editing, etc.)

### Browser Requirements:
- Chrome, Firefox, Safari, or Edge (latest versions).

---

## ✅ Development Checklist

> **Note**: Follow the tasks in the order of priority to ensure smooth development.

### Pre-development Setup
- [ ] Set up the project folder and structure:
  - [ ] Create `index.html`
  - [ ] Create `styles.css`
  - [ ] Create `script.js` and `util.js`

---

### HTML Structure (Priority 1)
- [ ] **Task List Container**: Create an HTML structure that contains:
  - [ ] A form for inputting tasks (task title, description, and a hidden field for editing).
  - [ ] A container to display the task list dynamically.

### CSS Styling (Priority 2)
- [ ] **General Styling**: Add styling for the overall layout (colors, fonts, spacing).
  - [ ] Style the form (inputs, buttons).
  - [ ] Style the task list items.
  - [ ] Add responsive design to make it mobile-friendly.

---

### JavaScript Development (Priority 3)

#### Phase 1: Task List Initialization
- [ ] **Local Storage Seed**:
  - [ ] Implement the seeder function to load sample tasks if local storage is empty.
  - [ ] Ensure tasks are stored in local storage and load them when the page loads.

- [ ] **Render Tasks**:
  - [ ] Write JavaScript code to dynamically render tasks from local storage into the task list container.

---

#### Phase 2: Task Creation & Validation
- [ ] **Form Submission**:
  - [ ] Add event listener for form submission.
  - [ ] Create a function to validate task input fields (title and description).
  - [ ] Create a new task object and store it in local storage.
  - [ ] Render the new task dynamically.

---

#### Phase 3: Task Manipulation
- [ ] **Edit Task**:
  - [ ] Add a function to load the selected task’s data into the form for editing.
  - [ ] Ensure editing a task updates local storage and the UI.

- [ ] **Delete Task**:
  - [ ] Add a function to delete tasks and remove them from local storage.
  - [ ] Update the UI dynamically after deletion.

- [ ] **Mark Task as Complete**:
  - [ ] Add a checkbox next to each task.
  - [ ] Implement functionality to mark tasks as complete and update local storage accordingly.
  - [ ] Completed tasks should have a different style (e.g., strikethrough).

---

#### Phase 4: Final Testing & Cleanup
- [ ] **Test Input Validation**:
  - [ ] Test task creation with empty inputs and ensure validation works.
  
- [ ] **Test Task Manipulation**:
  - [ ] Test editing and deleting tasks for different cases (e.g., non-existent tasks, empty tasks).

- [ ] **Refactor Code**:
  - [ ] Review and clean up the code for readability and optimization.
  - [ ] Test the final version of the project across different browsers.

---

## 📋 Software Requirements Specification (SRS)

### 1. Introduction
The Task Management System is a simple to-do list application designed to allow users to manage their daily tasks. It uses browser local storage for persisting data and supports operations like adding, editing, deleting, and completing tasks.

### 2. Functional Requirements

#### 2.1 Task Creation
- Users should be able to input task title and description.
- The form must validate that both fields are non-empty.
- Tasks should be stored in local storage.

#### 2.2 Task Editing
- Users can edit an existing task by clicking the edit button.
- Edited tasks should retain their original task ID but update their content.

#### 2.3 Task Deletion
- Users can delete a task using the delete button next to each task.
- A confirmation prompt should appear before deleting a task.

#### 2.4 Mark Task as Complete
- Users can mark tasks as complete using a checkbox.
- Completed tasks should have a different visual style (e.g., strikethrough).

#### 2.5 Data Persistence
- Tasks should be stored in local storage.
- When the page is refreshed, tasks should persist and be re-rendered from local storage.

### 3. Non-functional Requirements

#### 3.1 Usability
- The UI should be simple, intuitive, and responsive.
- Error messages should be clear and concise.

#### 3.2 Performance
- The system should work smoothly for up to 100 tasks without noticeable lag.
- The local storage should be updated instantly when tasks are added, edited, or deleted.

#### 3.3 Compatibility
- The system should work on all modern browsers (Chrome, Firefox, Safari, Edge).
- The system should be responsive and optimized for both desktop and mobile devices.

### 4. Assumptions and Dependencies
- The system will run entirely in the browser and will not use any backend server.
- Local storage is assumed to have enough capacity to store the required data.
- JavaScript must be enabled in the user's browser.

---

## 📂 Folder Structure

```bash
Task-Management-System/
│
├── index.html      # HTML file (project entry point)
├── styles.css      # CSS file for styling
├── script.js       # Main JS file for event handling and logic
└── util.js         # Utility functions, task storage, and generation
