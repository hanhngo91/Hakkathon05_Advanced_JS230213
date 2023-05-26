import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  //Get all tasks:
  const getAllTasks = async () => {
    await axios.get("http://localhost:3000/tasks").then((res) => {
      setTasks(res.data.data);
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  //Convert date to string:
  const convertDate = (date) => {
    const convertedDate = new Date(date).toLocaleDateString("en-US"); // "mm/dd/yyyy"
    return convertedDate;
  };

  //Add new task;
  const handleAddTask = async () => {
    await axios
      .post("http://localhost:3000/tasks", {
        Content: content,
        DueDate: dueDate,
        Task_Status: status,
        AssignedTo: assignedTo,
      })
      .then((res) => {
        console.log(res);
        getAllTasks();
        setContent("");
        setDueDate("");
        setStatus("--Choose status--");
        setAssignedTo("");
      });
  };

  //Delete a task:
  const handleDelete = (id) => async () => {
    await axios.delete(`http://localhost:3000/tasks/${id}`).then((res) => {
      console.log(res);
      getAllTasks();
    });
  };

  //Update a task:
  const handleUpdate = (id) => async () => {
    const updateTask = tasks.find((el) => {
      return el.task_id === id;
    });
    console.log(updateTask);

    const dateObj = new Date(updateTask.DueDate);
    const formattedDate = dateObj.toISOString().split("T")[0];
    setDueDate(formattedDate);

    setContent(updateTask.Content);
    setStatus(updateTask.Task_Status);
    setAssignedTo(updateTask.AssignedTo);

    await axios
      .put(`http://localhost:3000/tasks/${id}`, {
        Content: content,
        DueDate: dueDate,
        Task_Status: status,
        AssignedTo: assignedTo,
      })
      .then((res) => {
        console.log(res);
        getAllTasks();
        setContent("");
        setDueDate("");
        setStatus("--Choose status--");
        setAssignedTo("");
      });
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="header-container d-inline-flex justify-content-center gap-1 m-2">
        {/* Task content */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Task"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {/* Date picker */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
            id="due-date"
            value={dueDate}
          />
        </div>
        {/* Status */}
        <div className="dropdown">
          <select
            onChange={(e) => setStatus(e.target.value)}
            style={{ height: 38, marginRight: 20 }}
            value={status}
            name="status"
            id=""
          >
            <option value="--Choose status--">--Choose status--</option>
            <option value="Fulfill">Fulfill</option>
            <option value="Reject">Reject</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        {/* Task men */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Person incharge"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>
        {/* Submit btn */}
        <button
          type="button"
          className="btn btn-primary"
          style={{ height: 37 }}
          onClick={handleAddTask}
        >
          Submit
        </button>
      </div>
      {/* Render content */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Content</th>
            <th scope="col">Due date</th>
            <th scope="col">Status</th>
            <th scope="col">Assigned to</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((el, index) => (
            <tr key={index}>
              <th scope="row">{el.task_id}</th>
              <td>{el.Content}</td>
              <td>{convertDate(el.DueDate)}</td>
              <td>{el.Task_Status}</td>
              <td>{el.AssignedTo}</td>
              <td>
                <>
                  <button
                    onClick={handleUpdate(el.task_id)}
                    type="button"
                    className="btn btn-success m-1"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleDelete(el.task_id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
