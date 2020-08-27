const { Router } = require('express');
const { ToDoList, ToDoItem } = require('../models');

const TodoController = Router();

TodoController.get('/', (req, res) => {
  res.json({
    message: 'Hello from the todo controller'
  });
});

TodoController.post('/list/new', async (req, res) => {
  try {
    const { title } = req.body;
    let newList = await ToDoList.create({
      title,
      userId: req.user.id
    });
    res.json({
      message: 'List Created',
      list: newList
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'failed'
    });
  }
})

module.exports = TodoController;