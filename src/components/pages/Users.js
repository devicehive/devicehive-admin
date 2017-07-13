import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions';
import Navbar from '../common/Navbar';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Pagination from 'material-ui-pagination';
import UsersTable from '../tables/UsersTable';
import { RaisedButton } from 'material-ui';
import UserForm from '../forms/UserForm';

export class Users extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage : 1,
      showUserForm : false
    };
  }

  componentWillMount(){
    this.props.actions.users.getUsers();
  }

  toggleForm(){
    this.setState({
      showUserForm : !this.state.showUserForm
    })
  }

  submit(body){
    this.setState({
      showUserForm : false
    });
    this.props.actions.users.createUser(body)
    .then(this.props.actions.users.getUsers);
  }

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

export function mapStateToProps(state){
  return {
    auth : state.auth,
    users : state.users
  };
}

export function mapDispatchToProps(dispatch){
  return {
    actions : {
      logout : bindActionCreators(actions.auth.logoutUser, dispatch),
      users : bindActionCreators(actions.users, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);