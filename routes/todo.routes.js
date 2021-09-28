const { Router } = require('express');
const Todo = require('../models/Todo');
const User = require('../models/User.js');

const router = Router();

//get all users Todos.
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch(error) {
        res.status(500).json({ msg: 'Server error', error });
    }
});

//get one user Todos.
router.get('/todos-by-user', async (req, res) => {
    const { id } = req.user;
    console.log('user id', id)

    try {
        const todos = await User.findById( {_id: id}, 'todos' ).populate('todos');
        res.status(200).json(todos);

    } catch(error) {
        res.status(500).json({ msg: 'Server error', error });
    }
})


router.post('/todos', async (req, res) => {
    const { id } = req.user;
    console.log('this is id', id)
    console.log(req.body);

    try {
        const newTodo = await Todo.create(req.body);
        console.log('new todo', newTodo)

        const updateUserTodo = await User.findByIdAndUpdate({_id: id}, { $push: { todos: newTodo._id }}, { new: true });
        res.status(201).json(updateUserTodo);

    } catch(error) {
        //console.log(error)
        res.status(500).json({ msg: 'Erro ao criar novo todo', error })
    }
})


router.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const updatedTodo = await Todo.findOneAndUpdate ({ _id: id }, payload, { new: true });
        res.status(200).json(updatedTodo);
    } catch(error) {
        res.status(500).json({ msg: 'Error while updating todo', error});
    }
});


router.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.status(200).json();
    } catch(error) {
        res.status(500).json({ msg: "Error while deleting joke", error});
    }
})

module.exports = router;
