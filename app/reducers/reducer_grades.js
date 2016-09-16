import { FETCH_GRADES, GRADES_ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_GRADES:
      return {...state, data: action.payload.data };
    case GRADES_ERROR:
      return {...state, error: action.payload };
    default:
      return state;
  }
}
