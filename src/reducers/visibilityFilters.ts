interface ITodoAction { type: String, text: String, id: Number, filter?: String }

export default (state = 'SHOW_ALL', action: ITodoAction) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}
