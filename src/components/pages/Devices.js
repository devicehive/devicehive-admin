import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import actions from '../../actions';
import Navbar from '../common/Navbar';
import DevicesTable from '../tables/DevicesTable';
import { RaisedButton, Tabs, Tab } from 'material-ui';
import DeviceForm from '../forms/DeviceForm';
import Commands from '../Commands';
import Notifications from '../Notifications';

export class Devices extends Component {
  constructor(props){
    super(props);
    this.state = {
      showDeviceForm : false,
      device : null,
      info : false
    };
  }

  componentWillMount(){
    this.props.actions.devices.getDevices();
    this.props.actions.networks.getNetworks();
  }

  toggleForm(){
    if (this.state.device){
      this.props.actions.devices.removeDeviceId();
    }
    this.setState({
      showDeviceForm : !this.state.showDeviceForm,
      info : false,
      device : null
    });
  }

  tabChange(value){
    this.props.actions.polling.updateTab(value);
  }

  edit(id){
    this.setState({
      device : this.props.devices.get(`devicesList`).find(device => device.id === id),
      showDeviceForm : true
    });
  }

  info(id){
    this.props.actions.devices.setDeviceId(id);
    this.props.actions.polling.pollData(`command`);
    this.setState({
      device : this.props.devices.get(`devicesList`).find(device => device.id === id),
      showDeviceForm : true,
      info : true
    });
  }

  submit(body){
    this.setState({
      showDeviceForm : false
    });
    this.props.actions.devices.saveDevice(body)
      .then(() => this.props.actions.devices.getDevices())
  }
  
  render(){
    return (
      <div>
        <Navbar locationPath={this.props.location.pathname} showDrawer={true} authenticated={true} logout={this.props.actions.logout}/>
        <Grid fluid>
          <Row>
            <Col md={8} xs={8} mdOffset={2} xsOffset={2}>
              <DevicesTable devices={this.props.devices.get(`devicesList`)} networks={this.props.networks.get(`networksList`)} removeDevice={this.props.actions.devices.removeDevice} edit={this.edit.bind(this)} info={this.info.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col md={8} xs={8} mdOffset={2} xsOffset={2}>
              {this.state.showDeviceForm ?
                <Col md={12} xs={12}>
                  <DeviceForm device={this.state.device} toggle={this.toggleForm.bind(this)} networks={this.props.networks.get(`networksList`)} submit={this.submit.bind(this)} info={this.state.info}/>
                </Col>
              :
                <Col md={3} xs={3}>
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
          <Row
            style={{
              marginTop : `2px`
            }}
          >
            { this.state.info &&
              <Col md={8} xs={8} mdOffset={2} xsOffset={2}>
                <Tabs
                  value={this.props.polling.get(`tab`)}
                  onChange={this.tabChange.bind(this)}
                  tabItemContainerStyle={{
                    backgroundColor : `white`
                  }}
                >
                  <Tab
                    label="Command"
                    value="command"
                    style={{
                      color : `black`
                    }}
                  >
                    <Commands 
                      commandsPoll={this.props.polling.get(`commandsPoll`)} 
                    />
                  </Tab>
                  <Tab
                    label="Notification"
                    value="notification"
                    style={{
                      color : `black`
                    }}
                  >
                    <Notifications 
                      notificationsPoll={this.props.polling.get(`notificationsPoll`)} 
                    />
                  </Tab>
                </Tabs>
              </Col>
            }
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
    polling : state.polling
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