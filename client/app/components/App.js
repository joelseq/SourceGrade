import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import Home from './Home';

const App = () => (
  <div>
    <NavigationBar />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </div>
);

export default App;
