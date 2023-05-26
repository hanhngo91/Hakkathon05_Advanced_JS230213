const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./MySQL_Connection");
const port = 3000;

//Import middleware:
const validateData = require("./middleware/checkData");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

//Get all tasks:
server.get("/tasks", (req, res) => {
  database.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Get tasks failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        results: result.length,
        data: result,
      });
    }
  });
});

//Create a task:
server.post("/tasks", validateData, (req, res) => {
  const { Content, DueDate, Task_Status, AssignedTo } = req.body;
  const query =
    "INSERT INTO tasks (Content, DueDate, Task_Status, AssignedTo ) VALUES (?, ?, ?, ?)";
  const newTask = [Content, DueDate, Task_Status, AssignedTo];
  database.query(query, newTask, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Create task failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "Created task successfully",
        data: newTask,
      });
    }
  });
});

//Delete a task:
server.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tasks WHERE task_id = ?";
  database.query(query, id, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Delete task failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "Deleted task successfully",
      });
    }
  });
});

//Update a task:
server.put("/tasks/:id", validateData, (req, res) => {
  const { id } = req.params;
  const { Content, DueDate, Task_Status, AssignedTo } = req.body;
  const query =
    "UPDATE tasks SET Content = ?, DueDate = ?, Task_Status = ?, AssignedTo = ? WHERE task_id = ?";

  const updateTask = [Content, DueDate, Task_Status, AssignedTo, id];

  database.query(query, updateTask, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Update task failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "Updated task successfully",
        data: updateTask,
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
