import axios from 'axios';

const API_URL = '/api';

// Types
export const GET_CLASSES = 'home/GET_CLASSES';
export const ERR_CLASS = 'home/ERR_CLASS';
export const ADD_CLASS = 'home/ADD_CLASS';
export const REMOVE_ALERT = 'home/REMOVE_ALERT';

// Reducer
const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CLASS: {
      return { ...state, added: true, error: '' };
    }
    case ERR_CLASS: {
      return { ...state, added: false, error: action.payload.error };
    }
    case REMOVE_ALERT: {
      return {
        ...state,
        added: false,
        error: '',
        addedUserClass: false,
        userClassError: '',
      };
    }
    case GET_CLASSES: {
      return { ...state, classes: action.payload };
    }
    default: {
      return state;
    }
  }
}

// Action creators

// Get saved classes from API
export function getClasses() {
  return dispatch => (
    axios.get(`${API_URL}/classes`)
      .then(response => dispatch({ type: GET_CLASSES, payload: response.data }))
      .catch(err => dispatch({ type: ERR_CLASS, payload: err.response.data }))
  );
}

// Add a new class to the DB
export function addClass(url) {
  return dispatch => axios.post(`${API_URL}/classes`, {
    url,
  })
    .then(() => dispatch({ type: ADD_CLASS }))
    .catch(err => dispatch({ type: ERR_CLASS, payload: err.response.data }));
}
