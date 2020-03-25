import React from 'react';
import TodoInfo from '../TodoInfo';

const TodoList = ({todos, input, onRemove, onToggle, onChange, onSubmit}) => {
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} />
        <button type="submit"> 추가 </button>
      </form>
        <ul>
          <TodoInfo 
            todos={todos}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        </ul>
    </div>
  )
};

export default TodoList;