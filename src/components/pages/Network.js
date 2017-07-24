import { Col, Grid, Row } from 'react-flexbox-grid';
import { RaisedButton, TextField } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React, { Component } from 'react';
import Navbar from '../common/Navbar';
import actions from '../../actions';

/**
 * Network page
 * 
 * @export
 * @class Network
 * @extends {Component}
 */
export class Network extends Component {
  /**
   * Creates an instance of Network.
   * @param {Object} props 
   * @memberof Network
   */
  constructor(props){
    super(props);
    this.state = {
      network : Object.assign({}, this.props.location.state.network),
      edit : false
    };
  }

  /**
   * Edit handler
   * 
   * @memberof Network
   */
  setEdit(){
    this.setState({
      edit : true
    })
  }

  /**
   * Submit handler
   * 
   * @memberof Network
   */
  submit(){
    this.props.actions.networks.updateNetwork(this.state.network);
    this.setState({
      edit : false
    })
  }

  /**
   * Cancel edition handler
   * 
   * @memberof Network
   */
  cancel(){
    this.setState({
      network : Object.assign({}, this.props.location.state.network),
      edit : false
    });
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof Network
   */
  render(){
    return (
      <div>
        <Navbar locationPath={this.props.location.pathname.substring(0, this.props.location.pathname.lastIndexOf(`/`))} showDrawer={true} authenticated={true} logout={this.props.actions.logout} userRole={this.props.auth.get(`role`)}/>
        <Grid fluid>
          <Row>
              <Col md={8} lg={8} mdOffset={2} lgOffset={2}>
                <Row>
                  <Col md={8} lg={6}>
                    <TextField
                      id="networkName"
                      type="text"
                      disabled={!this.state.edit}
                      fullWidth={true}
                      floatingLabelText="Name"
                      autoComplete="off"
                      value={this.state.network.name}
                      onTouchTap={this.setEdit.bind(this)}
                      style={{
                        cursor : this.state.edit ? `text` : `pointer`
                      }}
                      onChange={(event, value) => {
                        const newState = Object.assign({}, this.state);
                        newState.network.name = value;
                        this.setState(newState);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={8} lg={6}>
                    <TextField
                      id="networkDescription"
                      type="text"
                      disabled={!this.state.edit}
                      fullWidth={true}
                      floatingLabelText="Description"
                      autoComplete="off"
                      value={this.state.network.description}
                      onTouchTap={this.setEdit.bind(this)}
                      style={{
                        cursor : this.state.edit ? `text` : `pointer`
                      }}
                      onChange={(event, value) => {
                        const newState = Object.assign({}, this.state);
                        newState.network.description = value;
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
 * @param {Object} state 
 * @returns 
 */
export function mapStateToProps(state){
  return {
    auth : state.auth
  }
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
      networks : bindActionCreators(actions.networks, dispatch)
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Network));