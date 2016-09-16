import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import GradesForm from 'GradesForm';
import GradesResult from 'GradesResult';
import Login from 'Login';
import Signup from 'Signup';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GradesForm} />
    <Route path="grades" component={GradesResult} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
  </Route>
);
