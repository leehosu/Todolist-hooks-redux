import React from 'react';
import TodoItem from '../TodoItem';

const TodoInfo = ({ todos, onRemove, onToggle, onChange, onToggleUpdate, moveItem }) => {
   return todos.map((todo,i) => (
    <TodoItem
      key={todo.id}
      id = {todo.id}
      todo={todo}
      index = {i}
      onRemove={onRemove}
      onToggle={onToggle}
      onToggleUpdate={onToggleUpdate}
      onChange={onChange}
      moveItem={moveItem}
    />
  ));
};
export default TodoInfo;