import React from 'react';
import TodoItem from '../TodoItem';

const TodoInfo = ({todos, onRemove, onToggle}) => {

  return (
    todos.map(todo => (
      <TodoItem 
         key={todo.id}
         todo={todo}
         onRemove={onRemove}
         onToggle={onToggle}
      />
    ))
  );
};

export default TodoInfo;