import axios from 'axios';

const API_URL = '/api';

// Types
export const FETCH_GRADES = 'grades-result/FETCH_GRADES';
export const GRADES_ERROR = 'grades-result/GRADES_ERROR';
export const SELECTED_CLASS = 'grades-result/SELECTED_CLASS';
export const REMOVE_GRADES = 'grades-result/REMOVE_GRADES';

// Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_GRADES: {
      return { data: action.payload.data };
    }
    case GRADES_ERROR: {
      return { error: action.payload.error };
    }
    case SELECTED_CLASS: {
      return { ...state, selectedClass: action.payload };
    }
    case REMOVE_GRADES: {
      return {};
    }
    default: {
      return state;
    }
  }
}

// Actions
// Fetch user's grades for a particular class
export function fetchGrades({ id, url }) {
  return dispatch => axios.get(`${API_URL}/scrape?id=${id}&url=${url}`)
    .then(response => dispatch({ type: FETCH_GRADES, payload: response }))
    .catch(error => dispatch({ type: GRADES_ERROR, payload: error.response.data }));
}

// Select a particular category/assessment
export function selectClass(selected) {
  return {
    type: SELECTED_CLASS,
    payload: selected,
  };
}

// Return grades state to original form
export function removeGrades() {
  return {
    type: REMOVE_GRADES,
  };
}
