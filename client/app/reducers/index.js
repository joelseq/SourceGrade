import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import classesReducer from '../modules/home';
import gradesReducer from '../modules/grades-result';
import authReducer from '../modules/auth';

export default combineReducers({
  routing: routerReducer,
  classes: classesReducer,
  grades: gradesReducer,
  form: formReducer,
  auth: authReducer,
});
