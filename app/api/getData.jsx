import axios from 'axios';

const API_URL = '/api/scrape?';

function fetch(id, url) {
  let requestUrl = `${API_URL}id=${id}&url=${url}`;

  return axios.get(requestUrl).then((res) => {
    if(res.data.cod && res.data.message) {
      throw new Error(res.data.message);
    } else {
      return res.data;
    }
  }, (res) => {
    throw new Error(res.data.message);
  });
}

export default { fetch };