import React from 'react';
import TodoItem from '../TodoItem';

const TodoInfo = ({ todos, onRemove, onToggle, onChange, onToggleUpdate }) => {
  return todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onRemove={onRemove}
      onToggle={onToggle}
      onToggleUpdate={onToggleUpdate}
      onChange={onChange}
    />
  ));
};

export default TodoInfo;