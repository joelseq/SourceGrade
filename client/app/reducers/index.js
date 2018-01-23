import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ClassesReducer from './classes';
import GradesReducer from './grades';

export default combineReducers({
  routing: routerReducer,
  classes: ClassesReducer,
  grades: GradesReducer,
});
