import React, {useCallback, useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import update from "immutability-helper";
import TodoList from '../component/TodoList';
import {
  CHANGE_INPUT,
  INSERT,
  TOGGLE_CHECK,
  REMOVE,
  TOGGLE_UPDATE,
  UPDATE
} from '../store/modules/todo';

let id = 1;

const TodoListContainer = () => {
  const {
    input, todos
  } = useSelector(state => state.todos, []);
  const [items, setItems] = useState([]);


  const dispatch = useDispatch();

  useEffect(() => {
    setItems(todos);
  }, [todos]);
  
  const onChange = useCallback(
    e => {
      dispatch({
        type : CHANGE_INPUT,
        payload : e.target.value
      });
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

  const onToggleUpdate = (id,text) => {
    dispatch({
      type: TOGGLE_UPDATE,
      payload: {
        id : id,
        text : text
    }});
  };

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = items[dragIndex];
      setItems(
          update(items, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragItem]
            ]
          })
      )
     dispatch({
       type: UPDATE,
       payload: items
     })
    },[dispatch,items]
  );

  return (
    <TodoList 
    input={input}
    todos={todos}
    onSubmit={onSubmit}
    onChange={onChange}
    onToggle={onToggle}
    onRemove={onRemove}
    onToggleUpdate = {onToggleUpdate}
    moveItem={moveItem}
    />
  )
};

export default TodoListContainer;