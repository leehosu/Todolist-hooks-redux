export const CHANGE_INPUT = "todo/CHANGE_INPUT";
export const INSERT = "todo/INSERT";
export const TOGGLE_CHECK = "todo/TOGGLE_CHECK";
export const REMOVE = "todo/REMOVE";

const initState = {
  input : "",
  todos :[]
};

const todos = (state = initState, action) => {
  switch(action.type){
    case CHANGE_INPUT:
      return {
        ...state,
        input : action.payload
      };

    case INSERT:
      return {
        ...state,
        todos : state.todos.concat({ ...action.payload, done : false })
      };

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
    
      case REMOVE:
        return {
          ...state,
          todos : state.todos.filter(todo => todo.id !== action.payload)
        };

      default:
        return state;
  }
};

export default todos;