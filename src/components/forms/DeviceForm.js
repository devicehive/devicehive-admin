import {
  Card, 
  CardActions, 
  CardHeader, 
  CardText,
  Divider,
  FlatButton,
  FontIcon,
  MenuItem,
  SelectField,
  TextField
} from 'material-ui';
import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid';
import randomstring from 'randomstring';

/**
 * Form for Device creation
 * 
 * @export
 * @class DeviceForm
 * @extends {Component}
 */
export default class DeviceForm extends Component {
  /**
   * Creates an instance of DeviceForm.
   * @param {Object} props 
   * @memberof DeviceForm
   */
  constructor(props){
    super(props);
    this.state = {
      id : ``,
      name : ``,
      networkId : ``,
      isBlocked : false,
      data : {},
      error : ``
    };
  }

  /**
   * Form submit handler
   * 
   * @memberof DeviceForm
   */
  submit(){
    if (this.state.error === ``){
      this.props.submit({
        id : randomstring.generate(36),
        name : this.state.name,
        networkId : this.state.networkId,
        isBlocked : this.state.isBlocked,
        data : this.state.data
      });
    }
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof DeviceForm
   */
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
          <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
            <TextField
              id="deviceName"
              type="text"
              fullWidth={true}
              floatingLabelText="Name"
              autoComplete="off"
              value={this.state.name}
              onChange={(event, value) => this.setState({ name : value })}
            />
          </Col>
          <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
            <SelectField
              floatingLabelText="Network"
              fullWidth={true}
              id="deviceNetwork"
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
          <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
            <SelectField
              floatingLabelText="Operation"
              fullWidth={true}
              id="deviceOperation"
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
          <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
            <TextField
              id="deviceData"
              type="text"
              fullWidth={true}
              floatingLabelText="Data"
              errorText={this.state.error}
              autoComplete="off"
              multiLine={true}
              value={typeof this.state.data === `object` ? JSON.stringify(this.state.data) : this.state.data}
              onChange={(event, value) => {
                const newState = Object.assign({}, this.state);
                try {
                  newState.data = JSON.parse(value);
                  newState.error = ``;
                } catch (err) {
                  newState.data = value;
                  newState.error = `Not a valid JSON`;
                }
                this.setState(newState);
              }}
            />
          </Col>
        </CardText>
        {!this.props.info &&
          <CardActions>
            <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
              <FlatButton label="Save" onTouchTap={this.submit.bind(this)}/>
              <FlatButton label="Cancel" onTouchTap={this.props.toggle}/>
            </Col>
          </CardActions>
        }
      </Card>
    );
  }
}