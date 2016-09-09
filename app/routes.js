import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import GradesForm from 'GradesForm';
import GradesResult from 'GradesResult';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GradesForm} />
    <Route path="grades" component={GradesResult} />
  </Route>
);