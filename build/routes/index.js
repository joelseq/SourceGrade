'use strict';

module.exports = function (app) {
  app.use('/api', require('./api'));
};