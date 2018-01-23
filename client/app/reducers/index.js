import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ClassesReducer from './classes';

export default combineReducers({
  routing: routerReducer,
  classes: ClassesReducer,
});
