import React, { Component } from 'react';
import {
  Card, 
  CardActions, 
  CardHeader, 
  CardText,
  FlatButton,
  Divider,
  FontIcon,
  TextField,
  SelectField,
  MenuItem
} from 'material-ui';
import { Col } from 'react-flexbox-grid';
import randomstring from 'randomstring';

export default class DeviceForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      id : ``,
      name : ``,
      networkId : ``,
      isBlocked : false,
      data : ``
    };
  }

  componentWillMount(){
    if (this.props.device){
      this.setState({
        id : this.props.device.id,
        name : this.props.device.name,
        networkId : this.props.device.networkId,
        isBlocked : this.props.device.isBlocked,
        data : this.props.device.data
      })
    }
  }

  submit(){
    if (!this.props.device){
      this.props.submit({
        id : randomstring.generate(36),
        name : this.state.name,
        networkId : this.state.networkId,
        isBlocked : this.state.isBlocked,
        data : this.state.data
      });
    } else {
      this.props.submit({
        id : this.state.id,
        name : this.state.name,
        networkId : this.state.networkId,
        isBlocked : this.state.isBlocked,
        data : this.state.data
      });
    }
  }

  render(){
    return (
      <Card>
        <CardHeader
          title="Device Params"
          titleStyle={{
            fontSize : `16px`
          }}
          showExpandableButton={true}
          closeIcon={
            <FontIcon className="material-icons" onTouchTap={this.props.toggle} style={{ cursor : `pointer` }}>close</FontIcon>
          }
        />
        <Divider/>
        <CardText>
          <Col md={6} xs={6} mdOffset={3} xsOffset={3}>
            <TextField
              id="deviceName"
              type="text"
              disabled={this.props.info}
              fullWidth={true}
              floatingLabelText="Name"
              autoComplete="off"
              value={this.state.name}
              onChange={(event, value) => this.setState({ name : value })}
            />
          </Col>
          <Col md={6} xs={6} mdOffset={3} xsOffset={3}>
            <SelectField
              floatingLabelText="Network"
              fullWidth={true}
              id="deviceNetwork"
              disabled={this.props.info}
              value={this.state.networkId}
              onChange={(event, index, value) => this.setState({ networkId : value })}
            >
              {this.props.networks.map((network, i) =>
                <MenuItem value={network.id} key={i}
                  primaryText={network.name}
                >
                </MenuItem>)
              }
            </SelectField>
          </Col>
          <Col md={6} xs={6} mdOffset={3} xsOffset={3}>
            <SelectField
              floatingLabelText="Operation"
              fullWidth={true}
              id="deviceOperation"
              disabled={this.props.info}
              value={this.state.isBlocked}
              onChange={(event, index, value) => this.setState({ isBlocked : value })}
            >
              <MenuItem value={false} key="normal"
                primaryText="Normal"
              >
              </MenuItem>
              <MenuItem value={true} key="blocked"
                primaryText="Blocked"
              >
              </MenuItem>
            </SelectField>
          </Col>
          <Col md={6} xs={6} mdOffset={3} xsOffset={3}>
            <TextField
              id="deviceData"
              type="text"
              fullWidth={true}
              floatingLabelText="Data"
              autoComplete="off"
              disabled={this.props.info}
              multiLine={true}
              value={this.state.data}
              onChange={(event, value) => this.setState({ data : value })}
            />
          </Col>
        </CardText>
        {!this.props.info &&
          <CardActions>
            <Col md={6} xs={6} mdOffset={3} xsOffset={3}>
              <FlatButton label="Save" onTouchTap={this.submit.bind(this)}/>
              <FlatButton label="Cancel" onTouchTap={this.props.toggle}/>
            </Col>
          </CardActions>
        }
      </Card>
    );
  }
}