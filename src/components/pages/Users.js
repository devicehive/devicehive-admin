import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions';
import Navbar from '../common/Navbar';

export class Users extends Component {

  render(){
    return (
      <div>
        <Navbar locationPath={this.props.location.pathname} showDrawer={true} authenticated={true} logout={this.props.actions.logout} userRole={this.props.auth.get(`role`)}/>
        <h4>Users</h4>
      </div>
    );
  }
}

export function mapStateToProps(state){
  return {
    auth : state.auth
  };
}

export function mapDispatchToProps(dispatch){
  return {
    actions : {
      logout : bindActionCreators(actions.auth.logoutUser, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);