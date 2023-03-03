import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState(null);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data)
  }

  return (
    <div className="flex">
      <h1 className='text-red-500'>create react app</h1>
      <button onClick={fetchTodos}>CLICK</button>
      {JSON.stringify(todos)}
    </div>
  );
}

export default App;
