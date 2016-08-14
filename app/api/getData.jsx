const axios = require('axios');

const API_URL = '/api/scrape?';

module.exports = {
  fetch: function(id, url) {
    let requestUrl = `${API_URL}id=${id}&url=${url}`;

    return axios.get(requestUrl).then(function(res) {
      if(res.data.cod && res.data.message) {
        throw new Error(res.data.message);
      } else {
        return res.data;
      }
    }, function(res) {
      throw new Error(res.data.message);
    });
  }
};