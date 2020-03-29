import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onRemove, onToggle, onToggleUpdate }) => {
  const { id, text, done, editing } = todo;
  const [todoText, setTodoText] = useState(text);

  const onChange = e => {
    setTodoText(e.target.value)
  }

  if (editing) {
    return (
      <li className="todo-item">
        <input value={todoText} onChange={onChange} className="todo-item-text"/>
        <button className="todo-update" onClick={() => onToggleUpdate(id,todoText)}>
          완료
        </button>
        <button className="todo-remove" onClick={() => onRemove(id)}>
          삭제
        </button>
      </li>
    );
  }

  return (
    <li className="todo-item">
      <span
        className="todo-item-text"
        onClick={() => onToggle(id)}
        style={{ textDecoration: done ? "line-through" : "none" }}
      >
        {text}
      </span>
      <button className="todo-update" onClick={() => onToggleUpdate(id)}>
        수정
      </button>
      <button className="todo-remove" onClick={() => onRemove(id)}>
        삭제
      </button>
    </li>
  );
};

export default TodoItem;