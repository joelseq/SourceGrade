import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';

// Components
import NavigationBar from './NavigationBar';
import Home from './home/Home';
import GradesResult from './grades-result/GradesResult';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Logout from './auth/Logout';
import ConnectedAuthRoute from './auth/ConnectedAuthRoute';
import ConnectedUnauthRoute from './auth/ConnectedUnauthRoute';
import UserClasses from './user-classes/UserClasses';

const theme = {
  primaryColor: '#110070',
  accentColor: '#f1c40f',
  fontSize: 20,
};

const App = () => (
  <ThemeProvider theme={theme}>
    <div>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/grades" component={GradesResult} />
        <ConnectedUnauthRoute path="/signup" redirectTo="/classes" component={Signup} />
        <ConnectedUnauthRoute path="/login" redirectTo="/classes" component={Login} />
        <Route path="/logout" component={Logout} />
        <ConnectedAuthRoute path="/classes" redirectTo="/login" component={UserClasses} />
      </Switch>
    </div>
  </ThemeProvider>
);

export default App;
