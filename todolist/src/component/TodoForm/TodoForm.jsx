import React from 'react';

const TodoForm = ({ onSubmit, input, onChange, onKeyEnter}) => {
  return (
    <div className="todo-header">
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} className="todo-input" onKeyPress={onKeyEnter}/>
        <button type="submit" className="todo-button">
          추가
        </button>
      </form>
    </div>
  )
};

export default TodoForm;