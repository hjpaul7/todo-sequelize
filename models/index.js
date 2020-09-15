const User = require("./User");
const ToDoItem = require("./ToDoItem");
const ToDoList = require("./ToDoList");

// Setup Associations
User.hasMany(ToDoList, {
  onDelete: "CASCADE",
  foreignKey: "createdBy",
});
ToDoList.hasMany(ToDoItem, {
  onDelete: "CASCADE",
  foreignKey: "listId",
});

ToDoList.belongsTo(User);
ToDoItem.belongsTo(ToDoList);

module.exports = {
  User,
  ToDoItem,
  ToDoList,
};
