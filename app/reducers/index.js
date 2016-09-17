import { combineReducers } from 'redux';
import GradesReducer from './reducer_grades';
import AuthReducer from './reducer_auth';
import ClassesReducer from './reducer_classes';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  grades: GradesReducer,
  classes: ClassesReducer,
  form,
  auth: AuthReducer
});

export default rootReducer;
