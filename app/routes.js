import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Grades from 'Grades';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Grades} />
  </Route>
);