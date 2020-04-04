import React, { useState, useImperativeHandle, useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";
import ItemTypes from "../../itemType";
import './TodoItem.css';

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move"
};

const TodoItem = React.forwardRef(
({ todo, onRemove, onToggle, onToggleUpdate, isDragging, connectDragSource, connectDropTarget }, ref) => {

  const elementRef = useRef(null);
  connectDragSource(elementRef);
  connectDropTarget(elementRef);
  const opacity = isDragging ? 0 : 1;
  useImperativeHandle(ref,() => ({
    getNode : () => elementRef.current,
  }));

  const { id, text, done, editing } = todo;

  const [todoText, setTodoText] = useState(text);

  const onChange = e => {
    setTodoText(e.target.value)
  }

  if (editing) {
    return (
      <li className="todo-item" style = {{...style,opacity}}>
        <input
          value={todoText}
          onChange={onChange}
          className="todo-item-text"
        />
        <button
          className="todo-update"
          onClick={() => onToggleUpdate(id, todoText)}
        >
          완료
        </button>
        <button className="todo-remove" onClick={() => onRemove(id)}>
          삭제
        </button>
      </li>
    );
  }

  return (
    <li className="todo-item" ref={elementRef} style={{ ...style,opacity }}>
      <span
        className="todo-item-text"
        onClick={() => onToggle(id)}
        style={{ textDecoration: done ? "line-through" : "none" }}
      >
        {text}
      </span>
      <button className="todo-update" onClick={() => onToggleUpdate(id)}>
        수정
      </button>
      <button className="todo-remove" onClick={() => onRemove(id)}>
        삭제
      </button>
    </li>
  );
});

export default DropTarget(
  ItemTypes.CARD,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }

      const node = component.getNode();
      if (!node) {
        return null;
      }

      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      props.moveItem(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag : (props) => ({
        id: props.id,
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(TodoItem)
);