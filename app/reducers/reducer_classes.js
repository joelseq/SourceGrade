import { ADD_CLASS, ERR_CLASS, GET_CLASSES } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case ADD_CLASS:
      return { ...state, added: true, error: '' };
    case ERR_CLASS:
      return { ...state, error: action.payload.error };
    case GET_CLASSES:
      return { ...state, classes: action.payload };
    default:
      return state;
  }
}
