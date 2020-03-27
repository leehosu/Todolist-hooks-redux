import React from 'react';
import TodoInfo from '../TodoInfo';
import './TodoList.css';

const TodoList = ({
  todos,
  input,
  onRemove,
  onToggle,
  onChange,
  onSubmit,
  onToggleUpdate,
  onUpdate
}) => {
  return (
    <div className="todo">
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} className="todo-input" />
        <button type="submit" className="todo-button">
          추가
        </button>
      </form>
      <ul className="todo-list">
        <TodoInfo 
        todos={todos} 
        onRemove={onRemove} 
        onToggle={onToggle}
        onToggleUpdate={onToggleUpdate}
        onUpdate={onUpdate} 
        onChange={onChange}/>
      </ul>
    </div>
  );
};

export default TodoList;