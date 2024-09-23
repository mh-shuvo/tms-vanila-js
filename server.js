const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());

// Path to the JSON file
const tasksFilePath = './data.json';

// GET all tasks
app.get('/tasks', (req, res) => {
    fs.readFile(tasksFilePath, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(JSON.parse(data)[0]);
    });
});

// POST a new task
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    fs.readFile(tasksFilePath, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        const tasks = JSON.parse(data);
        tasks.push(newTask);
        fs.writeFile(tasksFilePath, JSON.stringify(tasks), (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(newTask);
        });
    });
});

// PUT to update a task
app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    fs.readFile(tasksFilePath, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        const tasks = JSON.parse(data);
        const taskIndex = tasks.findIndex(task => task.task_id === taskId);
        if (taskIndex >= 0) {
            tasks[taskIndex] = req.body;
            fs.writeFile(tasksFilePath, JSON.stringify(tasks), (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send(tasks[taskIndex]);
            });
        } else {
            res.status(404).send('Task not found');
        }
    });
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    fs.readFile(tasksFilePath, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        let tasks = JSON.parse(data);
        tasks = tasks.filter(task => task.task_id !== taskId);
        fs.writeFile(tasksFilePath, JSON.stringify(tasks), (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send('Task deleted');
        });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
