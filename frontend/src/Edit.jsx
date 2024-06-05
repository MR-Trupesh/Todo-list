/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Edit({ todoId, initialTitle, onSave, onClose }) {
  const [editedTitle, setEditedTitle] = useState(initialTitle);
  const [error, seterror] = useState();

  const handleSave = async () => {
    if (!editedTitle.trim()) {
      seterror("Please enter a task");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:2500/update/${todoId}`,
        {
          title: editedTitle,
        }
      );
      onSave(response.data.id, response.data.title);
      toast.success("Task updated successfully");
      setEditedTitle("");
      onClose();
    } catch (error) {
      console.error("Error updating todo:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error updating todo");
      }
    }
  };
  return (
    <div className="modal fixed w-full h-full top-2 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-white opacity-90">
        <div className="modal-container w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-40 text-left px-15">
            <div className="bg-[#f4ff28] rounded-2xl flex max-w-3xl p-5 items-center ">
              <div className="mt-4 flex justify-end">
                <div className="p-6 space-y-6">
                  <h1 className="text-gray-800 font-bold text-2xl uppercase">
                    To-Do update
                  </h1>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <div>
                    <button
                      className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white p-1 m-2 rounded"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white p-1 m-2 rounded"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Edit;
