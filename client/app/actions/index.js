import axios from 'axios';
import * as types from './types';

const API_URL = '/api';

// Get saved classes from API
export function getClasses() {
  return dispatch => (
    axios.get(`${API_URL}/classes`)
      .then(response => dispatch({ type: types.GET_CLASSES, payload: response.data }))
      .catch(err => dispatch({ type: types.ERR_CLASS, payload: err.response.data }))
  );
}

// Fetch user's grades for a particular class
export function fetchGrades({ id, url }) {
  return dispatch => axios.get(`${API_URL}/scrape?id=${id}&url=${url}`)
    .then(response => dispatch({ type: types.FETCH_GRADES, payload: response }))
    .catch(error => dispatch({ type: types.GRADES_ERROR, payload: error.response.data }));
}

// Select a particular category/assessment
export function selectClass(selected) {
  return {
    type: types.SELECTED_CLASS,
    payload: selected,
  };
}

// Return grades state to original form
export function removeGrades() {
  return {
    type: types.REMOVE_GRADES,
  };
}

export default {
  getClasses,
  fetchGrades,
  selectClass,
  removeGrades,
};
