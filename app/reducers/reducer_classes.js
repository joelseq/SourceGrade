import {
  ADD_CLASS,
  ERR_CLASS,
  GET_CLASSES,
  ADD_USER_CLASS,
  ERR_USER_CLASS,
  DELETE_USER_CLASS,
  GET_USER_CLASSES,
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case ADD_CLASS:
      return { ...state, added: true, error: '' };
    case ERR_CLASS:
      return { ...state, added: false, error: action.payload.error };
    case GET_CLASSES:
      return { ...state, classes: action.payload };
    case ADD_USER_CLASS:
      return { ...state, addedUserClass: true, userClassError: '' };
    case ERR_USER_CLASS:
      return { ...state, userClassError: action.payload.error, addedUserClass: false };
    case DELETE_USER_CLASS:
      return { ...state, deletedUserClass: true, userClassError: '' };
    case GET_USER_CLASSES:
      return { ...state, userClasses: action.payload, addedUserClass: false, deletedUserClass: false };
    default:
      return state;
  }
}
