import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import actions from '../../actions';
import Navbar from '../common/Navbar';
import DevicesTable from '../tables/DevicesTable';
import { RaisedButton, Tabs, Tab, FlatButton, Dialog, DatePicker, Divider, TimePicker } from 'material-ui';
import DeviceForm from '../forms/DeviceForm';
import CommandsTable from '../tables/CommandsTable';
import NotificationsTable from '../tables/NotificationsTable';
import moment from 'moment';

export class Devices extends Component {
  constructor(props){
    super(props);
    this.state = {
      showDeviceForm : false,
      device : null,
      info : false,
      openDateTimeDialog : false,
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

  setTimePeriod(){
    this.setState({
      openDateTimeDialog : false
    });
    const from = `${moment(this.state.from.date).format(`YYYY-MM-DD`)}T${moment(this.state.from.time).format(`HH:mm:ss`)}`;
    let to = ``;
    if (this.state.to.date && this.state.to.time){
      to = `${moment(this.state.to.date).format(`YYYY-MM-DD`)}T${moment(this.state.to.time).format(`HH:mm:ss`)}`;
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
  
  render(){
    const dateTimeActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeDateTimeDialog.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.setTimePeriod.bind(this)}
      />
    ];

    return (
      <div>
        <Navbar locationPath={this.props.location.pathname} showDrawer={true} authenticated={true} logout={this.props.actions.logout}/>
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
                    <Col md={6} xs={6}>
                      <FlatButton
                        label="Filter time period"
                        onTouchTap={this.openDateTimeDialog.bind(this)}
                        fullWidth={true}
                      />
                    </Col>
                    <CommandsTable 
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
                    <Col md={6} xs={6}>
                      <FlatButton
                        label="Filter time period"
                        onTouchTap={this.openDateTimeDialog.bind(this)}
                        fullWidth={true}
                      />
                    </Col>
                    <NotificationsTable 
                      notificationsPoll={this.props.polling.get(`notificationsPoll`)} 
                    />
                  </Tab>
                </Tabs>
              </Col>
            }
          </Row>
        </Grid>
        <Dialog
          title="Time Filter"
          open={this.state.openDateTimeDialog}
          actions={dateTimeActions}
          onRequestClose={this.closeDateTimeDialog.bind(this)}
        >
          <Divider/>
          <Grid fluid>
            <h4>From:</h4>
            <Row>
              <Col xs={4} md={4}>
                <DatePicker 
                  hintText="Date"
                  mode="portrait"
                  value={this.state.from.date}
                  onChange={this.changeDate.bind(this, `from`)}
                />
              </Col>
              <Col xs={4} md={4} xsOffset={1} mdOffset={1}>
                <TimePicker
                  format="24hr"
                  hintText="Time"
                  value={this.state.from.time}
                  onChange={this.changeTime.bind(this, `from`)}
                />
              </Col>
              <Col xs={2} md={2} xsOffset={1} mdOffset={1}>
                <FlatButton
                  label="Clear"
                  onTouchTap={this.clearDateTime.bind(this, `from`)}
                />
              </Col>
            </Row>
            <h4>To:</h4>
            <Row>
              <Col xs={4} md={4}>
                <DatePicker 
                  hintText="Date"
                  mode="portrait"
                  value={this.state.to.date}
                  onChange={this.changeDate.bind(this, `to`)}
                />
              </Col>
              <Col xs={4} md={4} xsOffset={1} mdOffset={1}>
                <TimePicker
                  format="24hr"
                  hintText="Time"
                  value={this.state.to.time}
                  onChange={this.changeTime.bind(this, `to`)}
                />
              </Col>
              <Col xs={2} md={2} xsOffset={1} mdOffset={1}>
                <FlatButton
                  label="Clear"
                  onTouchTap={this.clearDateTime.bind(this, `to`)}
                />
              </Col>
            </Row>
          </Grid>
        </Dialog>
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