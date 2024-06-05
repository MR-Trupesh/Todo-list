import { useState, useEffect } from "react";
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
  const [buttonColor, setButtonColor] = useState("bg-teal-500");
  const [activeButton, setActiveButton] = useState("bg-teal-500");
  const [allButton, setAllButton] = useState("bg-red-500");

  useEffect(() => {
    loadTodos();
  }, []);
  const loadTodos = () => {
    fetch("http://localhost:2500/get")
      .then((res) => {
        if (!res.ok) {
          return false;
        }
        return res.json();
      })
      .then((res) => {
        -setTodos(res);
      });
  };
  const handleDelete = (titleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your task has been deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await axios.delete(`http://localhost:2500/delete/${titleId}`);
          setTodos(todos.filter((todo) => todo._id !== titleId));
        } catch (error) {
          console.error("Error deleting todo:", error);
        }
      }
    });
  };
  const handleEdit = async (titleId, isChecked) => {
    try {
      await axios.patch(`http://localhost:2500/path/${titleId}`, {
        Completed: isChecked,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === titleId ? { ...todo, Completed: isChecked } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };
  const handleEditTodo = (todoId, title) => {
    setEditTodoId(todoId);
    setEditedTodoTitle(title);
    setIsEditPopupOpen(true);
  };
  const handleSaveEdit = async (todoId, newTitle) => {
    try {
      await axios.patch(`http://localhost:2500/${todoId}`, {
        title: newTitle,
      });
      setIsEditPopupOpen(false);
      loadTodos();
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.Completed;
    if (filter === "completed") return todo.Completed;
    return false;
  });

  const handleFilterChange = (filter) => {
    setFilter(filter);
    setButtonColor(getButtonColor(filter));
    setActiveButton(getButtonColor1(filter));
    setAllButton(getButtonColor2(filter));
  };
  const getButtonColor = (filter) => {
    if (filter === "active") return "bg-red-500";
    return "bg-teal-500";
  };
  const getButtonColor1 = (filter) => {
    if (filter === "completed") return "bg-red-500";
    return "bg-teal-500";
  };
  const getButtonColor2 = (filter) => {
    if (filter === "all") return "bg-red-500";
    return "bg-teal-500";
  };
  return (
    <div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.Completed}
              onChange={(e) => handleEdit(todo._id, e.target.checked)}
            />
            <span
              style={
                todo.Completed
                  ? { textDecoration: "line-through" }
                  : { textDecoration: "none" }
              }
            >
              {todo.title}
            </span>
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white p-1 m-2 rounded"
              onClick={() => handleEditTodo(todo._id, todo.title)}
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(todo._id)}
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white p-1 m-2 rounded"
            >
              <MdAutoDelete />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => handleFilterChange("all")}
        className={`flex-shrink-0 ${allButton} hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 m-2 rounded`}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => handleFilterChange("active")}
        className={`flex-shrink-0 ${buttonColor} hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 m-2 rounded`}
      >
        Active
      </button>
      <button
        type="button"
        onClick={() => handleFilterChange("completed")}
        className={`flex-shrink-0 ${activeButton} hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 m-2 rounded`}
      >
        completed
      </button>
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
