import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import actions from '../../actions';
import Navbar from '../common/Navbar';
import DevicesTable from '../tables/DevicesTable';
import { RaisedButton } from 'material-ui';
import DeviceForm from '../forms/DeviceForm';
import Pagination from 'material-ui-pagination';

export class Devices extends Component {
  constructor(props){
    super(props);
    this.state = {
      showDeviceForm : false,
      currentPage : 1
    };
  }

  componentWillMount(){
    this.props.actions.devices.getDevices();
    this.props.actions.networks.getNetworks();
  }

  toggleForm(){
    this.setState({
      showDeviceForm : !this.state.showDeviceForm
    });
  }
  
  render(){
    return (
      <div>
        <Navbar locationPath={this.props.location.pathname} showDrawer={true} authenticated={true} logout={this.props.actions.logout} userRole={this.props.auth.get(`role`)}/>
        <Grid fluid>
          <Row
            style={{
              marginBottom : `10px`
            }}
          >
            <Col md={8} lg={8} mdOffset={2} lgOffset={2}>
              <DevicesTable 
                devices={this.props.devices.get(`devicesList`).slice(0 + (this.state.currentPage - 1) * 10, this.state.currentPage * 10)} 
                networks={this.props.networks.get(`networksList`)} 
                removeDevice={this.props.actions.devices.removeDevice}
              />
            </Col>
          </Row>
          <Row>
            <Col md={8} lg={8} mdOffset={2} lgOffset={2}>
              {this.state.showDeviceForm ?
                <Col md={12} lg={12}>
                  <DeviceForm toggle={this.toggleForm.bind(this)} networks={this.props.networks.get(`networksList`)} submit={this.submit.bind(this)}/>
                </Col>
              :
                <Col md={3} lg={3}>
                  <RaisedButton 
                    label="Add Device" 
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
                total={Math.ceil(this.props.devices.get(`devicesList`).size / 10)}
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
    devices : state.devices,
    networks : state.networks,
    polling : state.polling,
    auth : state.auth
  };
}

export function mapDispatchToProps(dispatch){
  return {
    actions : {
      logout : bindActionCreators(actions.auth.logoutUser, dispatch),
      devices : bindActionCreators(actions.devices, dispatch),
      networks : bindActionCreators(actions.networks, dispatch),
      polling : bindActionCreators(actions.polling, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Devices);