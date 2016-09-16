import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  FETCH_GRADES,
  GRADES_ERROR,
  SELECTED_CLASS,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const API_URL = '/api/scrape?';

// Action creator to get grades from API
export function fetchGrades({id, url}) {
  return function(dispatch) {
    axios.get(`${API_URL}id=${id}&url=${url}`)
      .then(response => {
        dispatch({ type: FETCH_GRADES, payload: response });
      })
      .catch(error => {
        dispatch({ type: GRADES_ERROR, payload: 'Could not fetch grades' });
      });
  }


  const request = axios.get(`${API_URL}id=${id}&url=${url}`);

  return {
    type: FETCH_GRADES,
    payload: request
  };
}

// Action creator to select a class
export function selectClass(selected) {
  console.log(selected);
  return {
    type: SELECTED_CLASS,
    payload: selected
  }
}


// Action creator to log in user
export function userLogin({ username, password }) {
  return function(dispatch) {
    axios.post('/login', { username, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/classes');
      })
      .catch(error => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

// Action creator to sign up user
export function userSignup({ username, password }) {
  return function(dispatch) {
    axios.post('/signup', { username, password})
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/classes');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  }
}

// Action creator to sign out user
export function userSignout(user) {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}

// Helper function for authentication related errors
function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
