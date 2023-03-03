import { useCallback, useEffect, useState } from "react";
import { Todo } from "./typings";
import { useParams } from "react-router-dom";

function DetailPage() {
  const { id } = useParams();
  const [todo, setTodo] = useState<Todo | null>(null);

  const fetchTodo = useCallback(async () => {
    const res = await fetch(`/api/todo/${id}`);
    const { data }: { data: Todo } = await res.json();
    console.log("data", data);
    setTodo(data);
  }, []);

  useEffect(() => {
    id && fetchTodo();
  }, [fetchTodo, id]);

  return (
    <div className="flex flex-col">
      <div className="bg-blue-400 text-center py-2 mb-4">CREATE REACT APP</div>
      <div className="flex justify-center"></div>
      <div className="flex flex-col">
        <div>{todo?.useID}</div>
        <div>{todo?.title}</div>
        <div>{todo?.completed}</div>
      </div>
    </div>
  );
}

export { DetailPage };
