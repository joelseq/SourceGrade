import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';

// Components
import NavigationBar from './NavigationBar';
import Home from './home/Home';
import GradesResult from './grades-result/GradesResult';
import Signup from './auth/Signup';
import Login from './auth/Login';

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
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  </ThemeProvider>
);

export default App;
