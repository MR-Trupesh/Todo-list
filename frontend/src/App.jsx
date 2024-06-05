import Task from "./pag/Task";
import TaskList from "./pag/TaskList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <div className="px-4 py-2">
          <h1 className="text-gray-800 font-bold text-2xl uppercase">
            To-Do List
          </h1>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        <Task />
        <TaskList />
      </div>
    </>
  );
}

export default App;
