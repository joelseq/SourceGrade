import axios from 'axios';

const API_URL = '/api';

// Types
const GET_USER_CLASSES = 'user-classes/GET_USER_CLASSES';
const ADD_USER_CLASS = 'user-classes/ADD_USER_CLASS';
const ERR_USER_CLASS = 'user-classes/ERR_USER_CLASS';
const DELETE_USER_CLASS = 'user-classes/DELETE_USER_CLASS';

// Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case ADD_USER_CLASS:
      return { ...state, addedUserClass: true, userClassError: '' };
    case ERR_USER_CLASS:
      return { ...state, userClassError: action.payload.error, addedUserClass: false };
    case DELETE_USER_CLASS:
      return { ...state, deletedUserClass: true, userClassError: '' };
    case GET_USER_CLASSES:
      return {
        ...state,
        classes: action.payload,
        addedUserClass: false,
        deletedUserClass: false,
      };
    default:
      return state;
  }
}

// Action Creators

// Get the classes of a single user
export function getUserClasses() {
  return dispatch => axios.get(`${API_URL}/me/classes`, {
    headers: { authorization: localStorage.getItem('token') },
  })
    .then(response => dispatch({
      type: GET_USER_CLASSES,
      payload: response.data,
    }));
}

// Add a class to a single user
export function addUserClass(id, name) {
  return dispatch => axios({
    method: 'post',
    url: `${API_URL}/me/classes`,
    data: {
      id,
      name,
    },
    headers: { authorization: localStorage.getItem('token') },
  })
    .then(() => dispatch({
      type: ADD_USER_CLASS,
    }))
    .catch(err => dispatch({
      type: ERR_USER_CLASS,
      payload: err.response.data,
    }));
}

// Remove a class of a user
export function removeUserClass(id) {
  return dispatch => axios.delete(`${API_URL}/me/classes/${id}`, {
    headers: { authorization: localStorage.getItem('token') },
  })
    .then(() => dispatch({
      type: DELETE_USER_CLASS,
    }))
    .catch(err => dispatch({
      type: ERR_USER_CLASS,
      payload: err.response.data,
    }));
}
