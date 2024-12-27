import React from "react";
import Todo from "./Todo";

// Todoアイテムのリストを表示するコンポーネント
// props:
// - todos: Todoアイテムの配列
// - toggleTodo: タスクの完了状態を切り替える関数
const TodoList = ({ todos, toggleTodo, changePriority, changeDueDate }) => {
  return todos.map((todo) => (
    <Todo 
      todo={todo} 
      key={todo.id} 
      toggleTodo={toggleTodo}
      changePriority={changePriority}
      changeDueDate={changeDueDate}
    />
  ));
};

export default TodoList;