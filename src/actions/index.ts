let nextTodoId = 0;

interface ISimpleTodo { type: String, id: Number, text: String };

export function addTodo(text: String): ISimpleTodo {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}