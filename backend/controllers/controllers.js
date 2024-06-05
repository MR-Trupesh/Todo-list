const express = require("express");
const Todo = require("../models/user");

const todo = async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.status(201).json({
    message: "Todo added successfully",
    todo,
  });
};
const getTodos = async (req, res) => {
  const todos = await Todo.find({});
  res.send(todos);
};
const getDelete = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await Todo.deleteOne({ _id: id });
  res.send({ success: true, message: "Todo deleted successfully", data });
};
// const getEdit = (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   const data = Todo.findByIdAndUpdate({ _id: id }, { Completed: true })
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// };

const findida = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.Completed = !todo.Completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const getupdated = async (req, res) => {
//   const taskId = await Todo.findById(req.params.id);
//   const updatedTask = req.body;
//   tasks = tasks.map((task) =>
//     task.id === taskId ? { ...task, ...updatedTask } : task
//   );
//   res.json(updatedTask);
// };

// const getupdated = async (req, res) => {
//   try {
//     await Todo.findOneAndUpdate(
//       { _id: request.params.id },
//       { data: request.body.data }
//     );
//     const todo = await Todo.findById(request.params.id);
//     return response.status(200).json(todo);
//   } catch (error) {
//     return response.status(500).json(error.message);
//   }
// };
// const getupdated = async (req, res) => {
//   const { id } = req.params;
//   const { title } = req.body;
//   console.log("Updated title:", title);
//   try {
//     const existingTodo = await Todo.findOne({ title });
//     if (existingTodo) {
//       return res.status(400).json({ message: "Todo already exists" });
//     }
//     await Todo.findByIdAndUpdate(id, { title });
//     res.send("Updated Successfully....");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: err, msg: "Something went wrong!" });
//   }
// };

const getupdated = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  console.log("Updated title:", title);

  try {
    const existingTodo = await Todo.findOne({ title, _id: { $ne: id } });
    if (existingTodo) {
      return res
        .status(400)
        .json({ message: "Todo with this title already exists" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    // if (!updatedTodo) {
    //   return res.status(404).json({ message: "Todo not found" });
    // }
    res.json({ message: "Updated Successfully", todo: updatedTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, msg: "Something went wrong!" });
  }
};

module.exports = getupdated;
module.exports = { todo, getTodos, getDelete, findida, getupdated };
