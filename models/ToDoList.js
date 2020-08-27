const { DataTypes } = require('sequelize');
const db = require('../db');

const ToDoList = db.define('todo_list', {
  title: {
    type: DataTypes.STRING(40),
    allowNull: false
  }
});

module.exports = ToDoList;