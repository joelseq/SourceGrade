module.exports = (err, req, res, next) => {
  if (err.response && err.response.status === 404) {
    return res.status(404).json({ error: 'Invalid URL' });
  }
  if (err instanceof TypeError) {
    return res.status(404).json({ error: 'Invalid ID' });
  }
  if (err.error) {
    return res.status(422).json(err);
  }

  return res.status(500).json({ error: 'Something went wrong' });
};
