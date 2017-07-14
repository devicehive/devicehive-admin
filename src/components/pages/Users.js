import { Col, Grid, Row } from 'react-flexbox-grid';
import { RaisedButton } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../common/Navbar';
import Pagination from 'material-ui-pagination';
import UserForm from '../forms/UserForm';
import UsersTable from '../tables/UsersTable';
import actions from '../../actions';

/**
 * Users page
 * 
 * @export
 * @class Users
 * @extends {Component}
 */
export class Users extends Component {
  /**
   * Creates an instance of Users.
   * @param {Object} props 
   * @memberof Users
   */
  constructor(props){
    super(props);
    this.state = {
      currentPage : 1,
      showUserForm : false
    };
  }

  /**
   * Lifecycle
   * 
   * @memberof Users
   */
  componentWillMount(){
    this.props.actions.users.getUsers();
  }

  /**
   * Toggle form handler
   * 
   * @memberof Users
   */
  toggleForm(){
    this.setState({
      showUserForm : !this.state.showUserForm
    })
  }

  /**
   * Submit form handler
   * 
   * @param {Object} body 
   * @memberof Users
   */
  submit(body){
    this.setState({
      showUserForm : false
    });
    this.props.actions.users.createUser(body)
    .then(this.props.actions.users.getUsers);
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof Users
   */
  render(){
    return (
      <div>
        <Navbar locationPath={this.props.location.pathname} showDrawer={true} authenticated={true} logout={this.props.actions.logout} userRole={this.props.auth.get(`role`)}/>
        <Grid fluid>
          <Row>
            <Col md={8} lg={8} mdOffset={2} lgOffset={2}>
              <UsersTable
                users={this.props.users.get(`usersList`).slice(0 + (this.state.currentPage - 1) * 10, this.state.currentPage * 10)}
                userRole={this.props.auth.get(`role`)}
                remove={this.props.actions.users.removeUser}
              />
            </Col>
          </Row>
          <Row>
            <Col md={8} lg={8} mdOffset={2} lgOffset={2}>
              {this.state.showUserForm ?
                <Col md={12} lg={12}>
                  <UserForm toggle={this.toggleForm.bind(this)} submit={this.submit.bind(this)}/>
                </Col>
              :
                <Col md={3} lg={3}>
                  <RaisedButton 
                    label="Add User" 
                    primary={true} 
                    fullWidth={true}
                    onTouchTap={this.toggleForm.bind(this)}
                  />
                </Col>
              }
            </Col>
          </Row>
          <Row>
            <Col md={2} lg={2} mdOffset={5} lgOffset={5}>
              <Pagination
                total={Math.ceil(this.props.users.get(`usersList`).size / 10)}
                display={5}
                current={this.state.currentPage}
                style={{
                  width : `100%`
                }}
                onChange={(value) => this.setState({ currentPage : value })}
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
    auth : state.auth,
    users : state.users
  };
}

/**
 * Redux action mapper
 * 
 * @export
 * @param {Function} dispatch 
 * @returns 
 */
export function mapDispatchToProps(dispatch){
  return {
    actions : {
      logout : bindActionCreators(actions.auth.logoutUser, dispatch),
      users : bindActionCreators(actions.users, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);