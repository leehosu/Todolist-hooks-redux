import React from 'react';
import './TodoList.css';
import TodoInfo from '../TodoInfo/TodoInfo';
const TodoList = ({
  todos,
  input,
  onRemove,
  onToggle,
  onChange,
  onSubmit,
  onToggleUpdate,
  moveItem
}) => {

  return (
    <div className="todo">
      <div className="title">ToDo.</div>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} className="todo-input" />
        <button type="submit" className="todo-button">
          추가
        </button>
      </form>
      <ul className="todo-list">
        <TodoInfo 
          todos = {todos}
          onChange = {onChange}
          onToggle = {onToggle}
          onRemove = {onRemove}
          onToggleUpdate = {onToggleUpdate}
          moveItem = {moveItem}
        />
      </ul>
    </div>
  );
};

export default TodoList;