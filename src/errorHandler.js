module.exports = function(err, req, res, next) {
  if(err.response.status === 404) {
    return res.status(404).json({ error: 'Invalid URL' });
  }

  res.status(500).json({ error: 'Something went wrong'});
}
