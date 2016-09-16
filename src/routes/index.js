/**
 * Created by joelsequeira on 8/6/16.
 */

module.exports = (app) => {
  app.use('/api', require('./api'));
  app.use(require('./auth'));
};
