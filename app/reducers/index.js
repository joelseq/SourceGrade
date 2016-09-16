import { combineReducers } from 'redux';
import GradesReducer from './reducer_grades';
import AuthReducer from './reducer_auth';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  grades: GradesReducer,
  form,
  auth: AuthReducer
});

export default rootReducer;
