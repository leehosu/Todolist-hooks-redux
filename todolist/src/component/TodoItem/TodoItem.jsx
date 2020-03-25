import React from 'react';

const TodoItem = ({todo, onRemove, onToggle}) => {
  const {id, text, done} = todo;

  return (
    <li style = {{ textDecoration: done ? "line-through" : "none"}}>
      <span onClick = {() => onToggle(id)}>{text}</span>
      <button onClick={() => onRemove(id)}>삭제</button>
    </li>
  );
};

export default TodoItem;