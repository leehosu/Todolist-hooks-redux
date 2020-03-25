import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onRemove, onToggle, onUpdate }) => {
  const { id, text, done, editing } = todo;

  if (editing) {
    return (
      <li className="todo-item">
        <input value={text} onChange={todo}/>
        <button className="todo-remove" onClick={() => onRemove(id)}>
          삭제
        </button>
        <button className="todo-update" onClick={() => onUpdate(id)}>
          완료
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
      <button className="todo-remove" onClick={() => onRemove(id)}>
        삭제
      </button>
      <button className="todo-update" onClick={() => onUpdate(id)}>
        수정
      </button>
    </li>
  );
};

export default TodoItem;