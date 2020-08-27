const { DataTypes } = require('sequelize');
const db = require('../db');

const ToDoItem = db.define('todo_item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complete: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

module.exports = ToDoItem;