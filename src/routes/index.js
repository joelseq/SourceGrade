module.exports = (app) => {
  app.use('/api', require('./api'));
};