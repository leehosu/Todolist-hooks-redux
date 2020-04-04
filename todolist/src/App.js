import React from 'react';
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import TodoListContainer from './container/TodoListContainer';

import './App.css';

function App() {
  return (
    <div className="App">
    	<DndProvider backend={Backend}>
        <TodoListContainer />
      </DndProvider>
    </div>
  );
}

export default App;
