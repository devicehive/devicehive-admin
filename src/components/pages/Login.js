import { Col, Grid, Row } from 'react-flexbox-grid';
import { RaisedButton, TextField } from 'material-ui';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../common/Navbar';
import actions from '../../actions';

/**
 * Login page
 * 
 * @export
 * @class Login
 * @extends {Component}
 */
export class Login extends Component {
  /**
   * Creates an instance of Login.
   * @memberof Login
   */
  constructor(){
    super();
    this.state = {
      login : ``,
      password : ``
    };
  }
  
  /**
   * Login info handler
   * 
   * @param {Object} event 
   * @param {String} value 
   * @memberof Login
   */
  setLoginInfo(event, value){
    this.setState({
      [event.target.id] : value
    });
  }

  /**
   * Submit login
   * 
   * @memberof Login
   */
  login(){
    this.props.actions.auth.loginUser(this.state.login, this.state.password);
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof Login
   */
  render(){
    return (
      this.props.auth.get(`isAuthenticated`) ?
      <Redirect to={{ pathname : this.state.from ? this.state.from : `/devices` }}/>
      :
      <div>
        <Navbar locationPath={this.props.location.pathname} showDrawer={false} authenticated={false} userRole={this.props.auth.get(`role`)}/>
        <Grid fluid>
          <Row>
            <Col md={4} lg={4}>
              <TextField
                id="login"
                type="text"
                fullWidth={true}
                floatingLabelText="Login"
                onChange={this.setLoginInfo.bind(this)}
                autoComplete="off"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} lg={4}>
              <TextField
                id="password"
                type="password"
                fullWidth={true}
                floatingLabelText="Password"
                onChange={this.setLoginInfo.bind(this)}
                autoComplete="off"
              />
            </Col>
          </Row>
          <Row>
            <Col md={2} lg={2} mdOffset={2} lgOffset={2}>
               <RaisedButton 
                label="Login" 
                primary={true} 
                fullWidth={true}
                onTouchTap={this.login.bind(this)}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

/**
 * Redux store mapper
 * 
 * @export
 * @param {Object} state 
 * @returns 
 */
export function mapStateToProps(state){
  return {
    auth : state.auth
  };
}

/**
 * Redux actions mapper
 * 
 * @export
 * @param {Function} dispatch 
 * @returns 
 */
export function mapDispatchToProps(dispatch){
  return {
    actions : {
      auth : bindActionCreators(actions.auth, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);