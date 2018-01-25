import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ClassesReducer from '../modules/home';
import GradesReducer from '../modules/grades-result';

export default combineReducers({
  routing: routerReducer,
  classes: ClassesReducer,
  grades: GradesReducer,
});
