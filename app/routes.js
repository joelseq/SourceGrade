import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import GradesForm from 'GradesForm';
import GradesResult from 'GradesResult';
import Login from 'Login';
import Signup from 'Signup';
import Logout from 'Logout';
import Classes from 'Classes';
import RequireAuth from 'RequireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="grades" component={GradesResult} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
    <Route path="logout" component={Logout} />
    <Route path="classes" component={RequireAuth(Classes)} />
  </Route>
);
