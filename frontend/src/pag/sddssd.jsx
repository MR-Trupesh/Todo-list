import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import Edit from "../Edit";

function TaskList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editTodoId, setEditTodoId] = useState("");
  const [editedTodoTitle, setEditedTodoTitle] = useState("");
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [activeButtonColor, setActiveButtonColor] = useState("bg-teal-500");

  useEffect(() => {
    loadTodos();
  }, []); // Run only once on component mount

  const loadTodos = () => {
    fetch("http://localhost:2500/get")
      .then((res) => {
        if (!res.ok) {
          return false;
        }
        return res.json();
      })
      .then((res) => {
        setTodos(res);
      });
  };

  // Other functions remain the same

  const handleFilterChange = (filter) => {
    setFilter(filter);
    setActiveButtonColor(getButtonColor(filter)); // Update button color based on filter
  };

  const getButtonColor = (filter) => {
    if (filter === "active") return "bg-red-500"; // Change to desired color for active filter
    return "bg-teal-500"; // Default color for other filters
  };

  return (
    <div>
      <ul>{/* Your todo list rendering */}</ul>
      <button
        className={`flex-shrink-0 ${activeButtonColor} hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white p-1 m-2 rounded`}
        type="button"
        onClick={() => handleFilterChange("all")}
      >
        All
      </button>
      <button
        className={`flex-shrink-0 ${activeButtonColor} hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 m-2 rounded`}
        type="button"
        onClick={() => handleFilterChange("active")}
      >
        Active
      </button>
      <button
        className={`flex-shrink-0 ${activeButtonColor} hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 m-2 rounded`}
        type="button"
        onClick={() => handleFilterChange("completed")}
      >
        completed
      </button>
      {/* Your edit popup component */}
      {isEditPopupOpen && (
        <Edit
          onClose={() => setIsEditPopupOpen(false)}
          todoId={editTodoId}
          initialTitle={editedTodoTitle}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default TaskList;
