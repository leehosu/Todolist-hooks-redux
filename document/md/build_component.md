# Build Component

이제 `redux`와 `container` 설정이 완료 되었고 값을 받아와 할당시켜주면 된다.

#### component/TodoList

```js
const TodoList = ({
  todos,
  input,
  onRemove,
  onToggle,
  onChange,
  onSubmit,
  onToggleUpdate
}) => {
  return (
    <div className="todo">
      <div className="title">ToDo.</div>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} className="todo-input" />
        <button type="submit" className="todo-button">
          추가
        </button>
      </form>
      <ul className="todo-list">
        <TodoInfo
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle}
          onToggleUpdate={onToggleUpdate}
          onChange={onChange}
        />
      </ul>
    </div>
  );
};
```

#### component/TodoInfo

```js
const TodoInfo = ({ todos, onRemove, onToggle, onChange, onToggleUpdate }) => {
  return todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onRemove={onRemove}
      onToggle={onToggle}
      onToggleUpdate={onToggleUpdate}
      onChange={onChange}
    />
  ));
};
```

#### component/TodoItem

```js
const TodoItem = ({ todo, onRemove, onToggle, onToggleUpdate }) => {
  const { id, text, done, editing } = todo;
  const [todoText, setTodoText] = useState(text);

  const onChange = e => {
    setTodoText(e.target.value);
  };

  if (editing) {
    return (
      <li className="todo-item">
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
    <li className="todo-item">
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
};
```

여기서 봐야할 점은 `todos` 객체의 값인 `editing`이 `true`면 `editing` 모드가 활성화 되고 `text`를 수정할 수 있게 바뀌고 `false`면 입력된 `text`가 객체에 적용되어 값이 바뀐다.

주목해야 할 점은 `useState`라는 `hooks`를 사용하여 바뀐 `text`를 할당해준다.
