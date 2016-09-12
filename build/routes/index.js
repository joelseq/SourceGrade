'use strict';

/**
 * Created by joelsequeira on 8/6/16.
 */

module.exports = function (app) {
  app.use('/api', require('./api'));
};