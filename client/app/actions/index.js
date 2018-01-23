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

export default {
  getClasses,
};
