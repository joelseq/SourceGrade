import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  FETCH_GRADES,
  GRADES_ERROR,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const API_URL = '/api/scrape?';

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

export function userSignout(user) {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}

function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
