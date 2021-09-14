const express = require('express');
const connectDb = require('./config/db.config');
const Todo = require('./models/Todo');
const cors = require('cors');


connectDb();

const app = express();

app.use(express.json());

app.use(cors());

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch(error) {
        res.status(500).json({ msg: 'Server error', error });
    }
});

app.post('/todos', async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo);
    } catch(error) {
        res.status(500).json({ msg: 'Erro ao criar novo todo', error })
    }
})

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const updatedTodo = await Todo.findOneAndUpdate ({ _id: id }, payload, { new: true });
        res.status(200).json(updatedTodo);
    } catch(error) {
        res.status(500).json({ msg: 'Error while updating todo', error});
    }
});

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.status(200).json();
    } catch(error) {
        res.status(500).json({ msg: "Error while deleting joke", error});
    }
})

app.listen('5000', () => console.log('Server running on port 5000'));

