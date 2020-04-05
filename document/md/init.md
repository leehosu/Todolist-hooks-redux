# ✏ Initial Setting

## Directory structure

```
├─todolist
│    │  ├─package.json
│    │  └─README.md
│    ├─public
│    │   └─index.html
│    └─src
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

## install

`yarn add create-react-app`

- 먼저 개발 환경인 cra를 설치해준다.

`create-react-app todolist`

- todolist라는 react 환경을 설정한다.

`cd ./todolist`

- 그 폴더로 이동한다.

`yarn add redux react-redux`

- redux 환경을 설치해준다.

이제 초기 환경 설치 및 설정은 완료 되었고 개발을 시작한다!
