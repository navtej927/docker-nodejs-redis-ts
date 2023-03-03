import React from "react";

function App() {
  const [todos, setTodos] = React.useState(null)

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:1234/api/todos");
    const data = await res.json();
    setTodos(data)
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="text-3xl font-bold underline">TODO APP</h1>

        <div>
          <button
            className="bg-blue-500 rounded py-2 px-4"
            onClick={fetchTodos}
          >
            Fetch version and placeholder
          </button>
        </div>
      </div>
      <div>
        {todos && JSON.stringify(todos)}
      </div>
    </div>
  );
}

export default App;
