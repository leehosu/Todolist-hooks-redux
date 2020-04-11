import React from 'react';
import './TodoList.css';
import TodoItem from '../TodoItem';
import TodoForm from '../TodoForm';

const TodoList = ({
  todos,
  input,
  onKeyEnter,
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
      <TodoForm onSubmit={onSubmit} input={input} onChange={onChange} onKeyEnter={onKeyEnter}/> 
      <ul className="todo-list">
        {todos.map((todo,i) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            todo={todo}
            index={i}
            onRemove={onRemove}
            onToggle={onToggle}
            onToggleUpdate={onToggleUpdate}
            onChange={onChange}
            moveItem={moveItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;