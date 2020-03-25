import React from 'react';
import TodoItem from '../TodoItem';

const TodoInfo = ({ todos, onRemove, onToggle, onUpdate, onChange }) => {
  return todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onRemove={onRemove}
      onToggle={onToggle}
      onUpdate={onUpdate}
      onChange={onChange}
    />
  ));
};

export default TodoInfo;