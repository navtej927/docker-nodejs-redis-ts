import { useEffect, useState } from "react";

interface Todo {
  useID: string;
  id: string;
  title: string;
}

function App() {
  const [todos, setTodos] = useState<[Todo] | null>(null);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const { data }: { data: [Todo] } = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="flex flex-col">
      <div className="bg-blue-400 text-center py-2 mb-4">CREATE REACT APP</div>
      <div className="flex justify-center">
        {/* <button
          className="py-2 px-2 rounded border bg-blue-200 hover:bg-blue-800 border-gray-200"
          onClick={fetchTodos}
        >
          Fetch Data
        </button> */}
      </div>
      <div className="flex flex-col">
        {todos?.map((todo) => {
          return <div className="border border-gray-200 py-1 px-1 text-center">{todo.title}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
