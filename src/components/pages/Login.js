import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { TextField, RaisedButton } from 'material-ui';
import actions from '../../actions';
import Navbar from '../common/Navbar';

export class Login extends Component {
  constructor(){
    super();
    this.state = {
      login : ``,
      password : ``
    };
  }

  setLoginInfo(event, value){
    this.setState({
      [event.target.id] : value
    });
  }

  login(){
    this.props.actions.auth.loginUser(this.state.login, this.state.password);
  }

  render(){
    return (
      this.props.auth.get(`isAuthenticated`) ?
      <Redirect to={{ pathname : this.state.from ? this.state.from : `/devices` }}/>
      :
      <div>
        <Navbar locationPath={this.props.location.pathname} showDrawer={false} authenticated={false} userRole={this.props.auth.get(`role`)}/>
        <Grid fluid>
          <Row>
            <Col md={4} xs={4}>
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
            <Col md={4} xs={4}>
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
            <Col md={2} xs={2} mdOffset={2} xsOffset={2}>
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

export function mapStateToProps(state){
  return {
    auth : state.auth
  };
}

export function mapDispatchToProps(dispatch){
  return {
    actions : {
      auth : bindActionCreators(actions.auth, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);