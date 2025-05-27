import "./App.css";
import Editor from "./components/Editor";
import { useState, useRef, useEffect } from "react";
import { Todo } from "./types";
import ToDoItem from "./components/ToDo-item";

// 메인 페이지 //
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onClickAdd = (text: string) => {
    setTodos([...todos, { id: idRef.current++, content: text }]);
  };

  const idRef = useRef(0);

  const onClickDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="App">
      <h1>ToDo</h1>
      <Editor onClickAdd={onClickAdd} />
      <div>
        {todos.map((todo) => (
          <ToDoItem key={todo.id} {...todo} onClickDelete={onClickDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;
