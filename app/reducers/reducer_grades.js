import { FETCH_GRADES } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_GRADES:
      return action.payload.data;
    default:
      return state;
  }
}
