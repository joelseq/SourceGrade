import axios from 'axios';

const API_URL = '/api/scrape?';

export const FETCH_GRADES = 'FETCH_GRADES';

export function fetchGrades({id, url}) {
  const request = axios.get(`${API_URL}id=${id}&url=${url}`);

  return {
    type: FETCH_GRADES,
    payload: request
  };
}