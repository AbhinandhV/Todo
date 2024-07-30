const express = require('express');
const fs = require('fs');
const router = express.Router();
const FILE_PATH = 'todos.json';

// Load todos from the filesystem
const loadTodos = () => {
    try {
        const dataBuffer = fs.readFileSync(FILE_PATH);
        return JSON.parse(dataBuffer.toString());
    } catch (e) {
        return [];
    }
};

// Save todos to the filesystem
const saveTodos = (todos) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
};

// Route to fetch all todos with optional search and date filters
router.get('/todos', (req, res) => {
    let todos = loadTodos();
    const { search, date } = req.query;

    if (search) {
        todos = todos.filter(todo => todo.title.includes(search));
    }

    if (date) {
        todos = todos.filter(todo => new Date(todo.updatedAt).toISOString().startsWith(date));
    }

    res.send(todos);
});

// Route to add a new todo
router.post('/todos', (req, res) => {
    const todos = loadTodos();
    const todo = {
        id: new Date().getTime(),
        title: req.body.title,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    todos.push(todo);
    saveTodos(todos);
    res.status(201).send(todo);
});

// Route to update an existing todo by ID
router.put('/todos/:id', (req, res) => {
    const todos = loadTodos();
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));

    if (todoIndex === -1) {
        return res.status(404).send({ error: 'Todo not found' });
    }

    todos[todoIndex] = {
        ...todos[todoIndex],
        title: req.body.title,
        updatedAt: new Date().toISOString(),
    };

    saveTodos(todos);
    res.send(todos[todoIndex]);
});

// Route to delete a todo by ID
router.delete('/todos/:id', (req, res) => {
    const todos = loadTodos();
    const newTodos = todos.filter(todo => todo.id !== parseInt(req.params.id));

    if (todos.length === newTodos.length) {
        return res.status(404).send({ error: 'Todo not found' });
    }

    saveTodos(newTodos);
    res.status(204).send();
});

// Route to mark a todo as done by ID
router.patch('/todos/:id/done', (req, res) => {
    const todos = loadTodos();
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));

    if (todoIndex === -1) {
        return res.status(404).send({ error: 'Todo not found' });
    }

    todos[todoIndex] = {
        ...todos[todoIndex],
        completed: true,
        updatedAt: new Date().toISOString(),
    };

    saveTodos(todos);
    res.send(todos[todoIndex]);
});

module.exports = router;
