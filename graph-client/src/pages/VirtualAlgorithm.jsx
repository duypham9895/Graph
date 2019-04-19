import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Simulation from '../component/Simulation.jsx';


class VirtualAlgorithm extends Component {

  render() {
    
      return (
        <div>
          <div className='uk-position-relative'>
            <Simulation />
          </div>
        </div>
      )
  }
}

export default withRouter(VirtualAlgorithm);
