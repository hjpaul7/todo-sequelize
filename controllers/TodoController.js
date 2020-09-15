const { Router } = require("express");
const { ToDoList, ToDoItem } = require("../models");

const TodoController = Router();

TodoController.get("/", async (req, res) => {
  try {
    const lists = await ToDoList.findAll({
      where: {
        createdBy: req.user.id,
      },
    });
    if (lists) {
      res.status(200).json({
        results: lists,
      });
    } else {
      res.status(404).json({
        message: "No lists found for user",
      });
    }
  } catch (e) {
    res.status(500).message({
      message: "Failed to retrieve lists for user",
    });
  }
});

TodoController.post("/new", async (req, res) => {
  try {
    const { title } = req.body;
    let newList = await ToDoList.create({
      title,
      createdBy: req.user.id,
    });
    res.json({
      message: "List Created",
      list: newList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "failed",
    });
  }
});

TodoController.route("/:id")
  .get(async (req, res) => {
    try {
      const listId = req.params.id;
      const found = await ToDoList.findOne({
        where: {
          id: listId,
          createdBy: req.user.id,
        },
        include: ToDoItem,
      });
      if (found) {
        res.status(200).json({
          result: found.toJSON(),
        });
      } else {
        res.status(404).json({
          message: "List not found",
        });
      }
    } catch (e) {
      res.status(500).json({
        message: "Failed to interact with list",
      });
    }
  })
  .put(async (req, res) => {
    try {
      const { title } = req.body;
      const toUpdate = await ToDoList.findOne({
        where: {
          id: req.params.id,
          createdBy: req.user.id,
        },
      });
      if (toUpdate && title) {
        toUpdate.title = title;
        await toUpdate.save();
        res.status(200).json({
          message: "Successfully updated list",
        });
      } else {
        res.status(404).json({
          message:
            "List title missing, list not found, or user unauthorized to edit",
        });
      }
    } catch (e) {
      res.status(500).json({
        message: "Failed to interact with list",
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const toRemove = await ToDoList.findOne({
        where: {
          id: req.params.id,
          createdBy: req.user.id,
        },
      });
      toRemove
        ? toRemove.destroy()
        : res.status(404).json({
            message: "List not found or list does not belong to user",
          });
      res.status(200).json({
        message: "Successfully removed list",
      });
    } catch (e) {
      res.status(500).json({
        message: "Failed to interact with list",
      });
    }
  });

module.exports = TodoController;
