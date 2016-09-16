import { FETCH_GRADES, GRADES_ERROR, SELECTED_CLASS, REMOVE_GRADES } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_GRADES:
      return { data: action.payload.data };
    case GRADES_ERROR:
      return { error: action.payload.error };
    case SELECTED_CLASS:
      return {...state, selectedClass: action.payload };
    case REMOVE_GRADES:
      return {};
    default:
      return state;
  }
}
