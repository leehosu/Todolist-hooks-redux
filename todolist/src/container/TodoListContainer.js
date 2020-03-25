import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import TodoList from '../component/TodoList';
import {
  CHANGE_INPUT,
  INSERT,
  TOGGLE_CHECK,
  REMOVE,
  TOGGLE_UPDATE
} from '../store/modules/todo';

let id = 0;

const TodoListContainer = () => {
  const {
    input, todos
  } = useSelector(state => state.todos, []);

  const dispatch = useDispatch();

  const onChange = useCallback(
    e => {
      dispatch({type : CHANGE_INPUT,
      payload : e.target.value});
    }, [dispatch]
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type : INSERT,
        payload : {
          id : ++id,
          text : input
        }
      });
      dispatch({type : CHANGE_INPUT, payload:""});
    },[input, dispatch]
  );

  const onToggle = id => {
    dispatch({type : TOGGLE_CHECK, payload:id});
  };

  const onRemove = id => {
    dispatch({type : REMOVE, payload : id});
  };

  const onUpdate = id => {
    dispatch({
      type: TOGGLE_UPDATE,
      payload: id
    });
  };

  return (
    <TodoList 
    input={input}
    todos={todos}
    onSubmit={onSubmit}
    onChange={onChange}
    onToggle={onToggle}
    onRemove={onRemove}
    onUpdate = {
      onUpdate
    }
    />
  )
};

export default TodoListContainer;