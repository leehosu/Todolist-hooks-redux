# Build Redux

## Directory Structure

```
├─store
│     ├─modules
│     │     ├─todo.js
│     │     └─index.js
```

## Store

##### modules/todo.js

```js
export const CHANGE_INPUT = "todo/CHANGE_INPUT";
export const INSERT = "todo/INSERT";
export const TOGGLE_CHECK = "todo/TOGGLE_CHECK";
export const REMOVE = "todo/REMOVE";
export const TOGGLE_UPDATE = "todo/TOGGLE_UPDATE";
```

`action type`을 설정해준다.

여기서 필요한 `action`에는 `input`의 입력 상태를 관리하는 `CHANGE_INPUT`, 입력한 `text`의 값을 저장하는 `INSERT`, 할 일의 check를 결정하는 `TOGGLE_CHECK`, 삭제를 결정하는 `REMOVE`, `item`의 수정을 담당하는 `TOGGLE_UPDATE`가 존재한다.

```js
const initState = {
  input: "",
  todos: []
};
```

위에 `action`을 설정해주었다면 이제 초기 상태 값을 설정해주면 된다.

**CHANGE_INPUT**

```js
case CHANGE_INPUT:
  return {
    ...state,
    input : action.payload
  };
```

`CHANGE_INPUT`은 `input`에 `dispatch`에서 받아온 `payload`값을 넣어준다.

**INSERT**

```js
case INSERT:
  return {
    ...state,
    todos : state.todos.concat({
      ...action.payload,
      done : false
    })
  };
```

`INSERT`에는 `state`에 있는 `todos`배열에 `Array.concat()` 메서드를 활용해서 `dispatch`에서 받아온 `payload` 데이터와 `done` 속성을 넣어서 붙여준다.

**TOGGLE_CHECK**

```js
case TOGGLE_CHECK:
    return {
      ...state,
      todos : state.todos.map(todo =>
        todo.id === action.payload ? {
          ...todo,
          done : !todo.done
        }
        : todo
        )
     };
```

`TOGGLE_CHECK`는 `item`을 클릭했을 시에 완료했다는 상태를 보여주는 `action`이고 그 상태를 만들어주기 위해 `todos` 배열에 `done`이라는 `object`를 넣어준다. 그리고 그 값을 이 `action`이 호출될 때마다 반대값으로 할당한다.

**REMOVE**

```js
case REMOVE:
  return {
    ...state,
    todos : state.todos.filter(todo => todo.id !== action.payload)
  };
```

`REMOVE`는 `Array.filter()`를 사용하는데 `삭제` 버튼을 클릭하게 되면 `id`를 매칭하여 삭제한 후 새로운 배열을 만든다.

**TOGGLE_UPDATE**

```js
case TOGGLE_UPDATE:
    return {
      ...state,
      todos : state.todos.map(todo =>
        todo.id === action.payload.id ? {
          ...todo,
          text : action.payload.text,
          editing : !todo.editing
        }
        : todo
        )
    };
```

`TOGGLE_UPDATE`는 `수정` 버튼을 클릭했을 때 발생하는 `action`인데 `id`를 매칭 후 `editing` 객체를 추가하여 그 값이 바뀔 때 `text`를 수정하는 방식이다.

위와 같이 `dispatch`에 따른 `action`을 설정해준다. 그 후에 이 `reducer`들을 호출하기 위해 `combine`해준다.

#### modules/index.js

```js
import { combineReducers } from "redux";
import todos from "./todo";

const rootReducer = combineReducers({
  todos
});

export default rootReducer;
```

`redux`에서 제공하는 `combineReducer`를 사용하면 쉽게 `reducer`를 제공할 수 있다.

`redux`의 구현은 완료되었고 이제 `TodoList Componenet`와 연결해주는 `container`를 구현한다.
