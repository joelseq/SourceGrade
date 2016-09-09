import { combineReducers } from 'redux';
import GradesReducer from './reducer_grades';

const rootReducer = combineReducers({
  grades: GradesReducer
});

export default rootReducer;