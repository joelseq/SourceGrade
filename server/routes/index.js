/* eslint-disable global-require */
module.exports = (app) => {
  app.use('/api', require('./api'));
  app.use(require('./auth'));
};
/* eslint-enable global-require */
