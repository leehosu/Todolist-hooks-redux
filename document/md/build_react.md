# Build React

> Component 디렉토리에 있는 component들은 state가 없는 dump component이다.

## Component Structure

```
├─component
│     ├─TodoInfo
│     │     ├─TodoInfo.jsx
│     │     └─index.js
│     ├─TodoItem
│     │     ├─TodoInfo.jsx
│     │     └─index.js
│     └─TodoList
│          ├─TodoInfo.jsx
│          └─index.js
```

## TodoList

이 `Component`는 일종의 틀이라고 생각하면 된다. 나중에 `container`를 구현하고 나서 `store`에서 만든 이벤트와 state들을 `하위 component`들에게 넘겨주는 역할을 하게된다.

```js
const TodoList = () => {
  return (
    <div className="todo">
      <div className="title">ToDo.</div>
      <form>
        <input className="todo-input" />
        <button type="submit" className="todo-button">
          추가
        </button>
      </form>
      <ul className="todo-list">
        <TodoInfo />
      </ul>
    </div>
  );
};

export default TodoList;
```

## TodoInfo

이 `Component`는 `component`간에 비동기적으로 데이터를 주고 받을 수 있도록 event와 state를 전달해주는 `component`이다.

```js
const TodoInfo = () => {
  return todos.map(todo => <TodoItem key={todo.id} />);
};

export default TodoInfo;
```

여기서 중요한 점은 `Array.map()`을 사용한다는 것인데 그 이유는 `item`이 배열 형태로 넘겨와서 `TodoItem`에 전달해주기 때문이다.

## TodoItem

```js
const TodoItem = () => {
  return (
    <li className="todo-item">
      <span className="todo-item-text">{text}</span>
      <button className="todo-update">수정</button>
      <button className="todo-remove">삭제</button>
    </li>
  );
};

export default TodoItem;
```
