import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilters';

const ReducersApp = combineReducers({
  todos,
  visibilityFilter
});

export default ReducersApp;