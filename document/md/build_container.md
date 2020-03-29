# Build Container

> Container Component란 Redux와 연결하여 데이터를 전달해줄 부모 Component를 칭한다.

## Container

```js
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "../component/TodoList";
import {
  CHANGE_INPUT,
  INSERT,
  TOGGLE_CHECK,
  REMOVE,
  TOGGLE_UPDATE
} from "../store/modules/todo";
```

`container`에서는 사용할 `action`을 모두 `import`하여 불러온다.

```js
const { input, todos } = useSelector(state => state.todos, []);

const dispatch = useDispatch();
```

`hooks`에서 `redux`에 대응하여 데이터를 받을 수 있게 함수를 지원해주는데, 그것이 `useSelector`와 `useDispatch` 이다.

`useSelector`는 다음과 같이 사용한다.

```js
const result = useSelector((selector: Function), (deps: any[]));
```

여기서 `selector`는 기존에 `class`형 `component`에서 `redux`와 연동할 때 사용하던 `mapStateToProps`와 비슷한 기능을 한다.

`deps` 배열은 어떤 값이 바뀌었을 때 `selector`를 재정의 할 지 설정해준다. 이 값을 생략하면 매번 렌더링 될때마다 `selector` 함수도 재정의 된다.

최적화를 생각한다면 기본적으로 `[]`을 넣어주면 좋다.

**onChange**

```js
const onChange = useCallback(
  e => {
    dispatch({
      type: CHANGE_INPUT,
      payload: e.target.value
    });
  },
  [dispatch]
);
```

**onSubmit**

```js
const onSubmit = useCallback(
  e => {
    e.preventDefault();
    dispatch({
      type: INSERT,
      payload: {
        id: ++id,
        text: input
      }
    });
    dispatch({ type: CHANGE_INPUT, payload: "" });
  },
  [input, dispatch]
);
```

**onToggle**

```js
const onToggle = id => {
  dispatch({ type: TOGGLE_CHECK, payload: id });
};
```

**onRemove**

```js
const onRemove = id => {
  dispatch({ type: REMOVE, payload: id });
};
```

**onToggleUpdate**

```js
const onToggleUpdate = (id, text) => {
  dispatch({
    type: TOGGLE_UPDATE,
    payload: {
      id: id,
      text: text
    }
  });
};
```

**render**

```js
return (
  <TodoList
    input={input}
    todos={todos}
    onSubmit={onSubmit}
    onChange={onChange}
    onToggle={onToggle}
    onRemove={onRemove}
    onToggleUpdate={onToggleUpdate}
  />
);
```

`redux`로 부터 값을 받아와 해당 `event`와 `data`를 `하위 component`에 props로 전달해준다.
