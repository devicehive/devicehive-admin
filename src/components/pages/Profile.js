import { Col, Grid, Row } from 'react-flexbox-grid';
import {
  MenuItem,
  RaisedButton,
  SelectField,
  TextField
} from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../common/Navbar';
import actions from '../../actions';

/**
 * Profile page
 * 
 * @export
 * @class Profile
 * @extends {Component}
 */
export class Profile extends Component {
  /**
   * Creates an instance of Profile.
   * @param {Object} props 
   * @memberof Profile
   */
  constructor(props){
    super(props);
    this.state = {
      user : {},
      edit : false,
      error : ``
    };
  }

  /**
   * Lifecycle
   * 
   * @memberof Profile
   */
  componentWillMount(){
    this.props.actions.profile.getProfile()
    .then(() => this.setState({
      user : Object.assign({}, this.props.profile.get(`user`).toJS())
    }))
  }

  /**
   * Edit Form handler
   * 
   * @memberof Profile
   */
  setEdit(){
    this.setState({
      edit : true
    })
  }

  /**
   * Form submit handler
   * 
   * @memberof Profile
   */
  submit(){
    if (this.state.error === ``){
      this.props.actions.profile.updateProfile(this.state.user);
      this.setState({
        edit : false
      })
    }
  }

  /**
   * Cancel form editing handler
   * 
   * @memberof Profile
   */
  cancel(){
    this.setState({
      user : Object.assign({}, this.props.profile.get(`user`).toJS()),
      edit : false,
      error : ``
    })
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof Profile
   */
  render(){
    return (
      <div>
        <Navbar locationPath={this.props.location.pathname} showDrawer={true} authenticated={true} logout={this.props.actions.logout} userRole={this.props.auth.get(`role`)}/>
        <Grid fluid>
          <Row>
            <Col md={8} lg={8} mdOffset={2} lgOffset={2}>
              <Row>
                <Col md={6} lg={6}>
                  <TextField
                    id="userLogin"
                    type="text"
                    disabled={!this.state.edit}
                    fullWidth={true}
                    floatingLabelText="Login"
                    autoComplete="off"
                    value={this.state.user.login}
                    onTouchTap={this.setEdit.bind(this)}
                    style={{
                      cursor : this.state.edit ? `text` : `pointer`
                    }}
                    onChange={(event, value) => {
                      const newState = Object.assign({}, this.state);
                      newState.user.login = value;
                      this.setState(newState);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={6}>
                  <TextField
                    id="userPassword"
                    type="password"
                    disabled={!this.state.edit}
                    fullWidth={true}
                    floatingLabelText="Password"
                    autoComplete="off"
                    value={this.state.user.password}
                    onTouchTap={this.setEdit.bind(this)}
                    style={{
                      cursor : this.state.edit ? `text` : `pointer`
                    }}
                    onChange={(event, value) => {
                      const newState = Object.assign({}, this.state);
                      newState.user.password = value;
                      this.setState(newState);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={6}>
                  <TextField
                    id="userOldPassword"
                    type="password"
                    disabled={!this.state.edit}
                    fullWidth={true}
                    floatingLabelText="Old Password"
                    autoComplete="off"
                    value={this.state.user.oldPassword}
                    onTouchTap={this.setEdit.bind(this)}
                    style={{
                      cursor : this.state.edit ? `text` : `pointer`
                    }}
                    onChange={(event, value) => {
                      const newState = Object.assign({}, this.state);
                      newState.user.oldPassword = value;
                      this.setState(newState);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={6}>
                  <SelectField
                    floatingLabelText="Role"
                    fullWidth={true}
                    id="userRole"
                    disabled={!this.state.edit}
                    onTouchTap={this.setEdit.bind(this)}
                    style={{
                      cursor : this.state.edit ? `text` : `pointer`
                    }}
                    value={this.state.user.role}
                    onChange={(event, index, value) => {
                      const newState = Object.assign({}, this.state);
                      newState.user.role = value;
                      this.setState(newState);
                    }}
                  >
                    <MenuItem value={0} key="admin"
                      primaryText="Administrator"
                    >
                    </MenuItem>
                    <MenuItem value={1} key="client"
                      primaryText="Client"
                    >
                    </MenuItem>
                  </SelectField>
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={6}>
                  <SelectField
                    floatingLabelText="Status"
                    fullWidth={true}
                    id="userStatus"
                    disabled={!this.state.edit}
                    value={this.state.user.status}
                    onTouchTap={this.setEdit.bind(this)}
                    style={{
                      cursor : this.state.edit ? `text` : `pointer`
                    }}
                    onChange={(event, index, value) => {
                      const newState = Object.assign({}, this.state);
                      newState.user.status = value;
                      this.setState(newState);
                    }}
                  >
                    <MenuItem value={0} key="active"
                      primaryText="Active"
                    >
                    </MenuItem>
                    <MenuItem value={1} key="locked"
                      primaryText="Locked Out"
                    >
                    </MenuItem>
                    <MenuItem value={2} key="disabled"
                      primaryText="Disabled"
                    >
                    </MenuItem>
                  </SelectField>
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={6}>
                  <TextField
                    id="userData"
                    type="text"
                    fullWidth={true}
                    multiLine={true}
                    disabled={!this.state.edit}
                    floatingLabelText="Data"
                    errorText={this.state.error}
                    onTouchTap={this.setEdit.bind(this)}
                    style={{
                      cursor : this.state.edit ? `text` : `pointer`
                    }}
                    autoComplete="off"
                    value={typeof this.state.user.data === `object` ? JSON.stringify(this.state.user.data) : this.state.user.data}
                    onChange={(event, value) => {
                      const newState = Object.assign({}, this.state);
                      try {
                        newState.user.data = JSON.parse(value);
                        newState.error = ``;
                      } catch (err){
                        newState.user.data = value;
                        newState.error = `Not a valid JSON`;
                      }
                      this.setState(newState);
                    }}
                  />
                </Col>
              </Row>
              {this.state.edit && 
              <Row>
                <Col md={6} lg={6}>
                  <Row>
                    <Col md={6} lg={6}>
                      <RaisedButton primary={true} label="Save" fullWidth={true} onTouchTap={this.submit.bind(this)}/>
                    </Col>
                    <Col md={6} lg={6}>
                      <RaisedButton label="Cancel" fullWidth={true} onTouchTap={this.cancel.bind(this)}/>
                    </Col>
                  </Row>
                </Col>
              </Row>
              }
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
 * @param {any} state 
 * @returns 
 */
export function mapStateToProps(state){
  return {
    auth : state.auth,
    profile : state.profile
  };
}

/**
 * Redux action mapper
 * 
 * @export
 * @param {any} dispatch 
 * @returns 
 */
export function mapDispatchToProps(dispatch){
  return {
    actions : {
      logout : bindActionCreators(actions.auth.logoutUser, dispatch),
      profile : bindActionCreators(actions.profile, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);