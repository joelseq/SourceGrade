import { ADD_CLASS, ERR_CLASS, GET_CLASSES, GET_USER_CLASSES } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case ADD_CLASS:
      return { ...state, added: true, error: '' };
    case ERR_CLASS:
      return { ...state, added: false, error: action.payload.error };
    case GET_CLASSES:
      return { ...state, classes: action.payload };
    case GET_USER_CLASSES:
      return { ...state, userClasses: action.payload };
    default:
      return state;
  }
}
