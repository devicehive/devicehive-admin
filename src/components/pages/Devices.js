import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import actions from '../../actions';
import Navbar from '../common/Navbar';
import DevicesTable from '../tables/DevicesTable';
import { RaisedButton, Tabs, Tab, FlatButton } from 'material-ui';
import DeviceForm from '../forms/DeviceForm';
import CommandsTable from '../tables/CommandsTable';
import NotificationsTable from '../tables/NotificationsTable';
import moment from 'moment';
import TimeFilter from '../TimeFilter';
import CommandNotificationCreator from '../CommandNotificationCreator';

export class Devices extends Component {
  constructor(props){
    super(props);
    this.state = {
      showDeviceForm : false,
      device : null,
      info : false,
      openDateTimeDialog : false,
      openCommandNotificationDialog : false,
      command : null,
      from : {
        date : null,
        time : null
      },
      to : {
        date : null,
        time : null
      }
    };
  }

  componentWillMount(){
    this.props.actions.devices.getDevices();
    this.props.actions.networks.getNetworks();
  }

  toggleForm(){
    if (this.state.device){
      this.props.actions.polling.removeDeviceId();
    }
    this.setState({
      showDeviceForm : !this.state.showDeviceForm,
      info : false,
      device : null
    });
  }

  tabChange(value){
    this.props.actions.polling.updateTab(value, this.state.device.id);
  }

  edit(id){
    this.setState({
      device : this.props.devices.get(`devicesList`).find(device => device.id === id),
      showDeviceForm : true,
      info : false
    });
  }

  info(id){
    this.props.actions.polling.setDeviceId(id);
    this.props.actions.polling.updateTab(`command`, id);
    this.setState({
      device : this.props.devices.get(`devicesList`).find(device => device.id === id),
      showDeviceForm : true,
      info : true
    });
  }

  openDateTimeDialog(){
    this.setState({
      openDateTimeDialog : true
    })
  }

  closeDateTimeDialog(){
    this.setState({
      openDateTimeDialog : false
    })
  }

  setTimePeriod(fromDateTime, toDateTime){
    this.setState({
      openDateTimeDialog : false
    });
    const from = `${moment(fromDateTime.date).format(`YYYY-MM-DD`)}T${moment(fromDateTime.time).format(`HH:mm:ss`)}`;
    let to = ``;
    if (toDateTime.date && toDateTime.time){
      to = `${moment(toDateTime.date).format(`YYYY-MM-DD`)}T${moment(toDateTime.time).format(`HH:mm:ss`)}`;
    }
    this.props.actions.polling.setTimePeriod(from, to);
  }

  changeDate(type, event, newDate){
    const stateCopy = Object.assign({}, this.state);
    stateCopy[type].date = newDate;
    this.setState(stateCopy);
  }

  changeTime(type, event, newTime){
    const stateCopy = Object.assign({}, this.state);
    stateCopy[type].time = newTime;
    this.setState(stateCopy);
  }

  clearDateTime(type){
    this.setState({
      [type] : {
        date : null,
        time : null
      }
    })
  }

  submit(body){
    this.setState({
      showDeviceForm : false
    });
    this.props.actions.devices.saveDevice(body)
      .then(() => this.props.actions.devices.getDevices())
  }

  openCommandNotificationDialog(){
    this.setState({
      openCommandNotificationDialog : true
    })
  }

  closeCommandNotificationDialog(){
    this.setState({
      openCommandNotificationDialog : false,
      command : null
    })
  }

  send({ name, parameters }){
    this.props.polling.get(`tab`) === `command` ?
    this.props.actions.devices.sendCommand(this.props.polling.get(`device`), { command : name, parameters : JSON.parse(parameters) }) :
    this.props.actions.devices.sendNotification(this.props.polling.get(`device`), { notification : name, parameters : JSON.parse(parameters) });
  }

  refreshCommand(commandId){
    this.props.actions.devices.refreshCommand(this.props.polling.get(`device`), commandId);
  }

  copyCommand(command){
    this.setState({
      command
    });
    this.openCommandNotificationDialog();
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
                    <Row>
                      <Col md={6} xs={6}>
                        <FlatButton
                          label="Filter time period"
                          onTouchTap={this.openDateTimeDialog.bind(this)}
                          fullWidth={true}
                        />
                      </Col>
                      <Col md={6} xs={6}>
                        <FlatButton
                          label="Enter new command"
                          onTouchTap={this.openCommandNotificationDialog.bind(this)}
                          fullWidth={true}
                        />
                      </Col>
                    </Row>
                    <CommandsTable 
                      commandsPoll={this.props.polling.get(`commandsPoll`)}
                      refreshCommand={this.refreshCommand.bind(this)}
                      copyCommand={this.copyCommand.bind(this)}
                    />
                  </Tab>
                  <Tab
                    label="Notification"
                    value="notification"
                    style={{
                      color : `black`
                    }}
                  >
                    <Row>
                      <Col md={6} xs={6}>
                        <FlatButton
                          label="Filter time period"
                          onTouchTap={this.openDateTimeDialog.bind(this)}
                          fullWidth={true}
                        />
                      </Col>
                      <Col md={6} xs={6}>
                        <FlatButton
                          label="Enter new notification"
                          onTouchTap={this.openCommandNotificationDialog.bind(this)}
                          fullWidth={true}
                        />
                      </Col>
                    </Row>
                    <NotificationsTable 
                      notificationsPoll={this.props.polling.get(`notificationsPoll`)} 
                    />
                  </Tab>
                </Tabs>
              </Col>
            }
          </Row>
        </Grid>
        <TimeFilter
          closeDialog={this.closeDateTimeDialog.bind(this)}
          saveTime={this.setTimePeriod.bind(this)}
          openDialog={this.state.openDateTimeDialog}
        />
        {this.state.openCommandNotificationDialog &&
        <CommandNotificationCreator
          type={this.props.polling.get(`tab`)}
          openDialog={this.state.openCommandNotificationDialog}
          closeDialog={this.closeCommandNotificationDialog.bind(this)}
          send={this.send.bind(this)}
          command={this.state.command}
        />}
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