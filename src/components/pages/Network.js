import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import actions from '../../actions';
import Navbar from '../common/Navbar';
import { TextField, RaisedButton } from 'material-ui';
import { withRouter } from 'react-router';

export class Network extends Component {
  constructor(props){
    super(props);
    this.state = {
      network : Object.assign({}, this.props.location.state.network),
      edit : false
    };
  }

  setEdit(){
    this.setState({
      edit : true
    })
  }

  submit(){
    this.props.actions.networks.updateNetwork(this.state.network);
    this.setState({
      edit : false
    })
  }

  cancel(){
    this.setState({
      network : Object.assign({}, this.props.location.state.network),
      edit : false
    });
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
                  <Col md={6} lg={6}>
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
  }
}

export function mapDispatchToProps(dispatch){
  return {
    actions : {
      networks : bindActionCreators(actions.networks, dispatch)
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Network));