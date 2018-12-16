import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import todos from './reducerTodo'

export default combineReducers({
  todos,
  form: formReducer,
});
