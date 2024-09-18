import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setCompletedTasks((completed) => [...completed, false]); 
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const confirmation = window.confirm("Are you sure you want to delete this task?");
    if (confirmation) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      setCompletedTasks(updatedCompletedTasks);
    }
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      const updatedCompletedTasks = [...completedTasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1],updatedTasks[index]];
      [updatedCompletedTasks[index], updatedCompletedTasks[index - 1]] = [updatedCompletedTasks[index - 1],updatedCompletedTasks[index]];
      setTasks(updatedTasks);
      setCompletedTasks(updatedCompletedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const updatedCompletedTasks = [...completedTasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1],updatedTasks[index]];
      [updatedCompletedTasks[index], updatedCompletedTasks[index + 1]] = [updatedCompletedTasks[index + 1],updatedCompletedTasks[index]];
      setTasks(updatedTasks);
      setCompletedTasks(updatedCompletedTasks);
    }
  }

  function toggleCompletion(index) {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = !updatedCompletedTasks[index];
    setCompletedTasks(updatedCompletedTasks);
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, i) => (
          <li key={i}>
            <input
              type="checkbox"
              checked={completedTasks[i]}
              onChange={() => toggleCompletion(i)}
            />
            <span
              className="text"
              style={{ textDecoration: completedTasks[i] ? "line-through" : "none" }}
            >
              {task}
            </span>
            <button className="delete-button" onClick={() => deleteTask(i)}>
              Delete
            </button>
            <button className="move-button" onClick={() => moveTaskUp(i)}>
              Up
            </button>
            <button className="move-button" onClick={() => moveTaskDown(i)}>
              Down
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
