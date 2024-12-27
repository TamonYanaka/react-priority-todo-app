import { useState, useRef } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

// メインのTodoアプリケーションコンポーネント
// タスクの追加、削除、状態管理を担当
function App() {
  // タスクの一覧を状態として管理
  const [todos, setTodos] = useState([]);
  
  // 新規タスク入力フィールドへの参照
  const todoNameRef = useRef();

  // 新規タスク追加の処理
  const handleAddTodo = () => {
    // 入力値を取得してトリム（前後の空白を削除）
    const name = todoNameRef.current.value.trim();
    // 空文字の場合は追加しない
    if (name === "") return;
    // 優先度も含めてタスクを作成
    setTodos((prevTodos) => {
      return [...prevTodos, {
      id: uuidv4(),
      name: name,
      completed: false,
      priority: "中", // デフォルトは"中"に設定
      dueDate: "" // 初期値は空に
      }];
    });
    // 入力フィールドをクリア
    todoNameRef.current.value = null;
  };

  // タスクの完了状態を切り替える処理
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  // 完了済みタスクを一括削除する処理
  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  //優先度を変更できる機能
  const changePriority = (id, newPriority) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.priority = newPriority;
    setTodos(newTodos);
  };

  //期限を変更する機能
  const changeDueDate = (id, newDate) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.dueDate = newDate;
    setTodos(newTodos);
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <TodoList 
          todos={todos} 
          toggleTodo={toggleTodo}
          changePriority={changePriority}
          changeDueDate={changeDueDate}
        />
        <div className="flex gap-2 mt-4">
          <input 
            type="text" 
            ref={todoNameRef}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleAddTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            タスクを追加
          </button>
          <button 
            onClick={handleClear}
            className="px-4 py-2 text-red-500 hover:text-red-600 border border-red-500 rounded-lg"
          >
            完了したタスクの削除
          </button>
        </div>
        <div className="mt-4 text-gray-600">
          残りのタスク:{todos.filter((todo)=>!todo.completed).length}
        </div>
      </div>
    </div>
  );
}

export default App;