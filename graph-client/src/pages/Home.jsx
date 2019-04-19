import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Panel from '../component/Panel.jsx';
import Menu from '../component/Menu.jsx';
import Search from '../component/Search.jsx';


class Home extends Component {

  render() {
    
      return (
      <div>
        <div className='uk-position-relative'>
          <Menu/>
          <Search />
          <Panel />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store)=>{
  return{
    form: store.VertexReducer.form,
  }
}

export default withRouter(connect(mapStateToProps)(Home));
