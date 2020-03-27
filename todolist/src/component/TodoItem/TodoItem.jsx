import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onRemove, onUpdate, onToggle, onToggleUpdate }) => {
  const { id, text, done, editing } = todo;
  if (editing) {
    return (
      <li className="todo-item">
        <input value={text} onChange={onUpdate} className="todo-item-text"/>
        <button className="todo-update" onClick={() => onToggleUpdate(id)}>
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