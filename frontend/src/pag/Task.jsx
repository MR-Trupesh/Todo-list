import axios from "axios";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

function Task() {
  const [newtodo, setnewtodo] = useState("");
  const [todos, settodo] = useState([]);
  const [error, seterror] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newtodo.trim()) {
      seterror("Please enter a task");
      return;
    }
    settodo([...todos, { text: newtodo }]);
    setnewtodo("");
    seterror("");
    axios.post("http://localhost:2500/todo", {
      title: newtodo,
    });
  };
  const handlenewtodo = (e) => {
    setnewtodo(e.target.value);
  };
  return (
    <div>
      <form id="todoform" onSubmit={handleSubmit}>
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            name="todo"
            value={newtodo}
            onChange={handlenewtodo}
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white p-1 m-2 rounded"
          >
            <IoMdAdd />
          </button>
        </div>
      </form>
      {error && <p style={{ color: `red` }}>{error}</p>}
    </div>
  );
}

export default Task;

// const [error, seterror] = useState();
// const handleSave = () => {
//   if (!editedTitle.trim()) {
//     seterror("Please enter a task");
//     return;
//   }
//   if (editedTitle.trim()) {
//     alert("Todo with this title already exists");
//     return;
//   }
//   try {
//     axios
//       .put(`http://localhost:2500/update/${todoId}`, {
//         title: editedTitle,
//       })
//       .then((res) => {
//         onSave(res.data.id, res.data.title);
//         setEditedTitle("");
//         onClose();
//       });
//   } catch (error) {
//     console.error("Error updating todo:", error);
//   }
// };
