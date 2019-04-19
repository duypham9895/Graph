import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import VirtualAlgorithm from './pages/VirtualAlgorithm.jsx';


class App extends Component {
  render() {

      return (
      <div className='App'>

        <Route path='/' exact render={(props) => <Home {...props} /> } />
        <Route path='/simulation' exact render={(props) => <VirtualAlgorithm {...props} />} />
      </div>
    );
  }
}

export default withRouter(App);
