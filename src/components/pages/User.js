import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-flexbox-grid';
import actions from '../../actions';
import Navbar from '../common/Navbar';
import {
  TextField,
  RaisedButton,
  SelectField,
  MenuItem,
  Subheader
} from 'material-ui';
import { withRouter } from 'react-router';
import NetworksTable from '../tables/NetworksTable';

export class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : {},
      edit : false,
      error : ``,
      network : null
    };
  }

  componentWillMount(){
    this.props.actions.users.getUser(this.props.match.params.id)
    .then(() => {
      this.setState({
        user : Object.assign({}, this.props.users.get(`user`).toJS())
      })
    });
    this.props.actions.networks.getNetworks();
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      user : Object.assign({}, nextProps.users.get(`user`).toJS())
    })
  }

  setEdit(){
    this.setState({
      edit : true
    })
  }

  submit(){
    if (this.state.error === ``){
      this.props.actions.users.saveUser(this.state.user);
      this.setState({
        edit : false
      })
    }
  }

  cancel(){
    this.setState({
      user : Object.assign({}, this.props.users.get(`user`).toJS()),
      edit : false,
      error : ``
    })
  }

  unassignNetwork(networkId){
    this.props.actions.users.unassignNetwork(this.state.user.id, networkId);
  }

  assignNetwork(){
    this.props.actions.users.assignNetwork(this.state.user.id, this.state.network);
  }

  render(){
    return (
      <div>
        <Navbar locationPath={this.props.location.pathname.substring(0, this.props.location.pathname.lastIndexOf(`/`))} showDrawer={false} authenticated={true} logout={this.props.actions.logout} userRole={this.props.auth.get(`role`)}/>
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
              {this.state.edit ? 
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
              :
                <Row>
                  <Col md={6} lg={6}>
                    <Row>
                      <Col md={6} lg={6}>
                        <RaisedButton
                          label="Back"
                          fullWidth={true}
                          onTouchTap={() => this.props.history.goBack()}
                        />
                      </Col>
                    </Row> 
                  </Col>
                </Row>
              }
              <Row>
                <NetworksTable
                  networks={this.state.user.networks}
                  userRole={this.props.auth.get(`role`)}
                  remove={this.unassignNetwork.bind(this)}
                />
              </Row>
              <Row>
                <Col md={6} lg={6}>
                  <h4>
                    Grant access:
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={6}>
                  <SelectField
                    floatingLabelText="Network"
                    fullWidth={true}
                    id="userNetwork"
                    value={this.state.network}
                    onChange={(event, index, value) => this.setState({ network : value })}
                  >
                    {this.props.networks.get(`networksList`).map((network, i) =>
                      <MenuItem value={network.id} key={i}
                        primaryText={network.name}
                      >
                      </MenuItem>)
                    }
                  </SelectField>
                </Col>
              </Row>
              <Row>
                <Col md={3} lg={3}>
                  <RaisedButton primary={true} label="Grant" fullWidth={true} onTouchTap={this.assignNetwork.bind(this)}/>
                </Col>
              </Row>
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
    users : state.users,
    networks : state.networks
  }
}

export function mapDispatchToProps(dispatch){
  return {
    actions : {
      users : bindActionCreators(actions.users, dispatch),
      networks : bindActionCreators(actions.networks, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));