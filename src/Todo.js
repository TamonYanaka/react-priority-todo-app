import React from "react";

// 個々のTodoアイテムを表示するコンポーネント
// props:
// - todo: タスクの情報（id, name, completed）を含むオブジェクト
// - toggleTodo: タスクの完了状態を切り替える関数
const Todo = ({ todo, toggleTodo, changePriority, changeDueDate }) => {
  // チェックボックスがクリックされた時の処理
  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };

  // 優先度に応じた色を設定
  const priorityColor = {
    "高": "text-red-500",
    "中": "text-yellow-500",
    "低": "text-blue-500"
  }[todo.priority];
  
  //期限切れの判定
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-2">
      <div className="flex items-center gap-3">
        <label>
          <input 
            type="checkbox" 
            checked={todo.completed} 
            readOnly 
            onChange={handleTodoClick}
            className="w-5 h-5 rounded border-gray-300 text-blue-500"
          />
        </label>
        <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {todo.name}
        </span>
        <select
          value={todo.priority}
          onChange={(e) => changePriority(todo.id, e.target.value)}
          className={`ml-auto p-1 rounded ${priorityColor}`}
        >
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
        <input 
          type="date"
          value={todo.dueDate}
          onChange={(e) => changeDueDate(todo.id, e.target.value)}
          className={`p-1 rounded ${isOverdue ? 'text-red-500' : ''}`}
        />
      </div>
    </div>
  );
};

export default Todo;