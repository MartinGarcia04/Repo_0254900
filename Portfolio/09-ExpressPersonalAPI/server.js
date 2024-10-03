const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let names = [];
let tasks = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    const error = req.query.error;
    res.render('index', { names, tasks, error });
});


app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        names.push(name);
    }
    res.redirect('/');
});


app.get('/greet/:nameIndex', (req, res, next) => {
    const nameIndex = parseInt(req.params.nameIndex);
    if (nameIndex >= 0 && nameIndex < names.length) {
        res.render('wazzup', { name: names[nameIndex] });
    } else {
        next(new Error("Index out of range"));
    }
});


app.post('/task', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/');
});

app.get('/task', (req, res) => {
    res.json(tasks);
});


app.post('/task/delete/:index', (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.redirect('/');
});


app.put('/greet/:name', (req, res) => {
    const name = req.params.name;
    names.push(name);
    res.json(names);
});


app.use((err, req, res, next) => {
    console.error(err.stack);  
    res.status(500).send("Internal Server Error: " + err.message);  
});

app.post('/task/move/up/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index > 0) {
        const taskToMove = tasks[index];
        tasks.splice(index, 1); // Eliminar de la posición actual
        tasks.splice(index - 1, 0, taskToMove); // Insertar en la nueva posición
    }
    res.redirect('/');
});

// Ruta para mover una tarea hacia abajo
app.post('/task/move/down/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index < tasks.length - 1) {
        const taskToMove = tasks[index];
        tasks.splice(index, 1); // Eliminar de la posición actual
        tasks.splice(index + 1, 0, taskToMove); // Insertar en la nueva posición
    }
    res.redirect('/');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
