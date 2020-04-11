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
  RENDER,
} from '../store/modules/todo';

let id = 0;

const TodoListContainer = () => {
  const {
    input, todos
  } = useSelector(state => state.todos, []);
  
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setItems(todos);
  },[todos]);

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
        type: RENDER,
        payload: {
          items: items
        }
      });
      dispatch({
        type : INSERT,
        payload : {
          id : ++id,
          text : input
        }
      });
      dispatch({type : CHANGE_INPUT, payload:""});
    }, [input, dispatch, items]
  );

  const onKeyEnter = useCallback(
    e => {
      if(e.key === 'Enter'){
        e.preventDefault();
        dispatch({
          type: RENDER,
          payload: {
            items: items
          }
        });
        dispatch({
          type: INSERT,
          payload: {
            id: ++id,
            text: input
          }
        });
        dispatch({
          type: CHANGE_INPUT,
          payload: ""
        });
      }
    }, [input, dispatch, items]
  )

  const onToggle = id => {
    dispatch({
      type: RENDER,
      payload: {
        items: items
      }
    });
      dispatch({ type: TOGGLE_CHECK, payload: id });
    };

  const onRemove = id => {
    dispatch({type : REMOVE, payload : id});
  };

  const onToggleUpdate = (id,text) => {
    dispatch({
      type: RENDER,
      payload: {
        items: items
      }
    });
    dispatch({
      type: TOGGLE_UPDATE,
      payload: {
        id: id,
        text: text
      }
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    setItems(
      update(items, {
        $splice : [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      })
    );
  };
  return (
    <TodoList 
    input={input}
    todos={items}
    onKeyEnter={onKeyEnter}
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