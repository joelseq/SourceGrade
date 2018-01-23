const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const historyApiFallback = require('connect-history-api-fallback');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const RateLimit = require('express-rate-limit');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const errorHandler = require('./errorHandler');
const webpackConfig = require('../webpack.config');

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;


// Configuration
// ================================================================================================

const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});

if (isDev) {
  require('dotenv').config(); // eslint-disable-line
}

// Set up Mongoose
mongoose.connect(process.env.DB_URI, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

const app = express();
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('x-powered-by');
// Allowing CORS
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.append('Access-Control-Allow-Credentials', 'true');
  res.append('Access-Control-Allow-Methods', ['GET', 'OPTIONS', 'PUT', 'POST', 'DELETE']);
  res.append(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.enable('trust proxy');
app.use(limiter);

// API routes
require('./routes')(app);

// Handle all errors from routes in errorHandler
app.use(errorHandler);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false,
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err); // eslint-disable-line
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port); // eslint-disable-line
});

module.exports = app;
