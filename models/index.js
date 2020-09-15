const User = require("./User");
const ToDoItem = require("./ToDoItem");
const ToDoList = require("./ToDoList");

// Setup Associations
User.hasMany(ToDoList, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
    name: "createdBy",
  },
});
ToDoList.hasMany(ToDoItem, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
    name: "listId",
  },
});

ToDoList.belongsTo(User);
ToDoItem.belongsTo(ToDoList);

module.exports = {
  User,
  ToDoItem,
  ToDoList,
};
