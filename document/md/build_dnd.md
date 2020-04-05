# React Drag and Drop

## Previously

예전부터 drag and drop(dnd)를 꼭 적용해보고 싶었는데 이번 기회에 적용하기로 마음먹고 `refactoring`을 시작했다.

## React DnD란?

React-DND 라이브러리는 컴포넌트를 분리된 상태에서 각 독립성을 유지하면서 복잡한 drag and drop를 구현할 수 있는 React 라이브러리이다.

드래그를 하면 서로 다른 부분에 대해 데이터를 주고 받고 상태를 변경하는 것을 직접 제어할 수 있도록 도와준다.

## Directory Structure

```js
├─todolist
│    │  ├─package.json
│    │  └─README.md
│    ├─public
│    │   └─index.html
│    └─src
│       ├─itemType.js
│       ├─index.js
│       ├─App.js
│       ├─component
│       │     ├─TodoInfo
│       │     │     ├─TodoInfo.jsx
│       │     │     └─index.js
│       │     ├─TodoItem
│       │     │     ├─TodoInfo.jsx
│       │     │     └─index.js
│       │     └─TodoList
│       │          ├─TodoInfo.jsx
│       │          └─index.js
│       ├─container
│       │     └─TodoListContainer.js
│       └─store
│           └─modules
│                ├─index.js
│                └─todo.js
```

## Build

공식 문서의 예시를 참고하여 구현하였다. 사실, 제공해주는 예시를 별 달리 수정 할 것도 없이 가져와 사용했는데, 어떤 방식으로 구현되는지에 대해서는 따로 공부를 했다.

> 파일 위치 : src/App.js

```js

import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
...

function App() {
  return (
    <div className="App">
    	<DndProvider backend={Backend}>
        <TodoListContainer />
      </DndProvider>
    </div>
  );
};
```

> 파일 위치 : src/container/TodoListContainer.js

```js
import update from "immutability-helper";

...

const TodoListContainer = () => {

  const [items, setItems] = useState([]);         // 1

  ...

  useEffect(() => {                               // 2
    setItems(todos);
  },[todos]);

  ...

  const moveItem = (dragIndex, hoverIndex) => {   //3
    const dragItem = items[dragIndex];
    setItems(
      update(items, {
        $splice : [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      })
    );
  }
```

##### 1

React-DnD에서 사용해야할 함수인 `moveItem`을 `hooks`형태로 사용하기 위해 `useState`로 상태를 정의해주고 이 상태를 `redux`에 있는 `todos`을 할당하고 주된 todo item으로 사용한다.

##### 2

`useEffect`를 사용하여 `redux`에서 `todos` 배열에 `action`을 통해 값이 바뀔때마다 `componentDidMount`처럼 값을 할당해준다.

##### 3

`item` 이 `drag and drop` 될 때마다 `items` 배열 위치를 재할당해주는 함수이다. 이 부분으로 인해 `drag and drop`이 구현 가능하다.

> 파일 위치 : src/component/TodoItem

```js

const style = {   //1
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move"
};


const TodoItem = React.forwardRef(    //2
({ todo, onRemove, onToggle, onToggleUpdate, isDragging, connectDragSource, connectDropTarget }, ref) => {

  const elementRef = useRef(null);
  connectDragSource(elementRef);
  connectDropTarget(elementRef);
  const opacity = isDragging ? 0 : 1;
  useImperativeHandle(ref,() => ({
    getNode : () => elementRef.current,
  }));

...


  if (editing) {
    return (
      <li className="todo-item" style = {{...style,opacity}}>
      ...
      </li>
    );
  }
  return (
    <li className="todo-item" ref={elementRef} style={{ ...style,opacity }}>

    ...

    </li>
  );

  export default DropTarget(
    ItemTypes.CARD,   // 아이템 타입 정의
    {
      hover(props, monitor, component) {
        //현재 드래그 중인 아이템의 parentStep이 다르면 return
        if (!component) {
          return null;
        }

        const node = component.getNode();
        // node는 imperative API의 HTML div 요소
        if (!node) {
          return null;
        }

        const dragIndex = monitor.getItem().index;
        // 현재 drag 중인 요소
        const hoverIndex = props.index;
        // 호버된 인덱스 hover 이벤트는 hover가 되는 순간 일어나기 때문에
        // props는 마우스가 올라간 순간의 component props를 가져온다.

        if (dragIndex === hoverIndex) {
          return;
        } // 자기들 끼리 바뀌지 못한다.
        const hoverBoundingRect = node.getBoundingClientRect();
        // 스크롤에서 위치를 가져온다.
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // 마우스 위치를 가져온다.
        const clientOffset = monitor.getClientOffset();
        // 사용자의 마우스 위치
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        //index, 마우스 위치가 모두 hover 된 것의 이전이면 그대로
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        // index, 마우스 위치가 모두 hover된 것의 이루라면 그대로
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
        // props는 부모 component의 props이다.
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
```

## Refactoring Redux

위의 방식으로 이제 drag and drop는 구현이 끝났다.

하지만 item을 drag 후 drop 하였을 때 배열이 새롭게 바뀌어야 하고,
수정 될 때, 삭제 될 때에 이전 배열이 아닌 바뀐 배열로 바뀌어야 하기 때문에 redux에서 새롭게 배열을 저장해야 한다.

> 파일 위치 : src/store/modules/todo.js

```js
...
export const RENDER = "todo/RENDER";

...

const todos = (state = initState, action) => {
  switch(action.type){
    ...

    case RENDER:
        return {
          ...state,
          todos :  action.payload.items
        }

      ...
  }
};
```

`RENDER`라는 `action`을 선언하고 배열을 새롭게 쓰기 위해 `todos`에 `payload` 값을 덮어 쓴다.

> 파일 위치 : src/container/TodoListContainer.js

```js
import {
  CHANGE_INPUT,
  INSERT,
  TOGGLE_CHECK,
  REMOVE,
  TOGGLE_UPDATE,
  RENDER,
} from '../store/modules/todo';

...

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
  },[input, dispatch, items]
);

const onToggle = id => {
  dispatch({
    type: RENDER,
    payload: {
      items: items
    }
  });
  dispatch({ type: TOGGLE_CHECK, payload: id });
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
```

각 event에 `RENDER` action을 구현해주면 이벤트가 발생하기 전에 render되어 그 전의 배열이 최신 배열로 저장이 된다.

## Reference

- https://react-dnd.github.io/react-dnd/examples/sortable/simple
- https://velog.io/@head/%EC%9D%B8%ED%84%B4-%ED%95%AD%ED%95%B4%EC%9D%BC%EC%A7%80-React-DND-8ck14zfgk0
