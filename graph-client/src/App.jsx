import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import VirtualAlgorithm from './pages/VirtualAlgorithm.jsx';


class App extends Component {
	componentWillMount(){
		fetch('http://localhost:3000/api/users/insert', {
			method: 'GET',
			mode: 'cors',
			headers:{
				'Content-Type': 'application/json',
				'Accept' : 'application/json',
				'x-auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5nb2NodXlvdSIsImlhdCI6MTU1NTY2MDk4OCwiZXhwIjoxNTU1NjYxMDEzfQ.C7M2Dcf7vYWjuKyP217eh3x4ywv3F5nfGGxL25vcHQw'
			}
		})
		.then((res) => res.json())
		.then((res) => console.log(res))
	}


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
