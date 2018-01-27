import axios from 'axios';
import { SubmissionError } from 'redux-form';

import { history } from '../../store';

// Types
export const AUTH_USER = 'auth/AUTH_USER';
export const AUTH_ERROR = 'auth/AUTH_ERROR';
export const UNAUTH_USER = 'auth/UNAUTH_USER';


// Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, error: '' };
    case AUTH_ERROR:
      return { ...state, authenticated: false, error: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    default:
      return state;
  }
}


// Action creators

// Action creator to log in user
export function userLogin({ username, password }) {
  return dispatch => axios.post('/login', { username, password })
    .then((response) => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/classes');
    })
    .catch(() => {
      throw new SubmissionError({
        _error: 'Invalid Login or Password',
      });
    });
}

// Sign up user
export function userSignup({ username, password }) {
  return dispatch => axios.post('/signup', { username, password })
    .then((response) => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/classes');
    })
    .catch((error) => {
      throw new SubmissionError({
        _error: error.response.data.error,
      });
    });
}

// Action creator to sign out user
export function userSignout() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER,
  };
}
