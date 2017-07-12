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
  Tabs,
  Tab,
  FlatButton 
} from 'material-ui';
import CommandsTable from '../tables/CommandsTable';
import NotificationsTable from '../tables/NotificationsTable';
import CommandNotificationCreator from '../CommandNotificationCreator';
import TimeFilter from '../TimeFilter';
import { withRouter } from 'react-router';
import moment from 'moment';

export class Device extends Component {
  constructor(props){
    super(props);
    this.state = {
      device : Object.assign({}, this.props.location.state.device),
      networks : this.props.location.state.networks,
      edit : false,
      error : ``,
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

  componentDidMount(){
    this.props.actions.polling.setDeviceId(this.state.device.id);
    this.props.actions.polling.updateTab(`command`, this.state.device.id);
  }

  setEdit(){
    this.setState({
      edit : true
    })
  }

  submit(){
    if (this.state.error === ``){
      this.props.actions.devices.saveDevice(this.state.device);
      this.setState({
        edit : false
      })
    }
  }

  cancel(){
    this.setState({
      device : Object.assign({}, this.props.location.state.device),
      networks : this.props.location.state.networks,
      edit : false,
      error : ``
    })
  }

  tabChange(value){
    this.clearDateTime(`from`);
    this.clearDateTime(`to`);
    this.props.actions.polling.updateTab(value, this.state.device.id);
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
        <Navbar locationPath={this.props.location.pathname.substring(0, this.props.location.pathname.lastIndexOf(`/`))} showDrawer={false} authenticated={true} logout={this.props.actions.logout} userRole={this.props.auth.get(`role`)}/>
        <Grid fluid>
          <Row>
            <Col md={8} lg={8} mdOffset={2} lgOffset={2}>
              <Row>
                <Col md={6} lg={6}>
                  <TextField
                    id="deviceName"
                    type="text"
                    disabled={!this.state.edit}
                    fullWidth={true}
                    floatingLabelText="Name"
                    autoComplete="off"
                    value={this.state.device.name}
                    onTouchTap={this.setEdit.bind(this)}
                    style={{
                      cursor : this.state.edit ? `text` : `pointer`
                    }}
                    onChange={(event, value) => {
                      const newState = Object.assign({}, this.state);
                      newState.device.name = value;
                      this.setState(newState);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={6}>
                  <SelectField
                    floatingLabelText="Network"
                    fullWidth={true}
                    id="deviceNetwork"
                    disabled={!this.state.edit}
                    value={this.state.device.networkId}
                    onTouchTap={this.setEdit.bind(this)}
                    onChange={(event, index, value) => {
                      const newState = Object.assign({}, this.state);
                      newState.device.networkId = value;
                      this.setState(newState);
                    }}
                  >
                    {this.state.networks.map((network, i) =>
                      <MenuItem value={network.id} key={i}
                        primaryText={network.name}
                      >
                      </MenuItem>)
                    }
                  </SelectField>
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={6}>
                    <SelectField
                      floatingLabelText="Operation"
                      fullWidth={true}
                      id="deviceOperation"
                      disabled={!this.state.edit}
                      value={this.state.device.isBlocked}
                      onTouchTap={this.setEdit.bind(this)}
                      onChange={(event, index, value) => {
                        const newState = Object.assign({}, this.state);
                        newState.device.isBlocked = value;
                        this.setState(newState);
                      }}
                    >
                      <MenuItem 
                        value={false} 
                        key="normal"
                        primaryText="Normal"
                      >
                      </MenuItem>
                      <MenuItem 
                        value={true} 
                        key="blocked"
                        primaryText="Blocked"
                      >
                      </MenuItem>
                    </SelectField>
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={6}>
                  <TextField
                    id="deviceData"
                    type="text"
                    disabled={!this.state.edit}
                    fullWidth={true}
                    floatingLabelText="Data"
                    autoComplete="off"
                    multiLine={true}
                    errorText={this.state.error}
                    value={typeof this.state.device.data === `object` ? JSON.stringify(this.state.device.data) : this.state.device.data}
                    onTouchTap={this.setEdit.bind(this)}
                    style={{
                      cursor : this.state.edit ? `text` : `pointer`
                    }}
                    onChange={(event, value) => {
                      const newState = Object.assign({}, this.state);
                      try {
                        newState.device.data = JSON.parse(value);
                        newState.error = ``;
                      } catch (err){
                        newState.device.data = value;
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
                          onTouchTap={() => {
                            this.props.actions.polling.clearPolling();
                            this.props.history.goBack();
                          }}
                        />
                      </Col>
                    </Row> 
                  </Col>
                </Row>
              }
            </Col>
          </Row>
          <Row
            style={{
              marginTop : `2px`
            }}
          >
            <Col md={8} lg={8} mdOffset={2} lgOffset={2}>
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
                    <Col md={6} lg={6}>
                      <FlatButton
                        label="Filter time period"
                        onTouchTap={this.openDateTimeDialog.bind(this)}
                        fullWidth={true}
                      />
                    </Col>
                    <Col md={6} lg={6}>
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
                    <Col md={6} lg={6}>
                      <FlatButton
                        label="Filter time period"
                        onTouchTap={this.openDateTimeDialog.bind(this)}
                        fullWidth={true}
                      />
                    </Col>
                    <Col md={6} lg={6}>
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
    auth : state.auth,
    polling : state.polling
  }
}

export function mapDispatchToProps(dispatch){
  return {
    actions : {
      devices : bindActionCreators(actions.devices, dispatch),
      polling : bindActionCreators(actions.polling, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Device));