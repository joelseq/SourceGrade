const app = require('./server/server');

const port = process.env.PORT || 8080;

app.listen(port, (err) => {
  if (err) {
    console.log(err); // eslint-disable-line
  }
  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port); // eslint-disable-line
});
