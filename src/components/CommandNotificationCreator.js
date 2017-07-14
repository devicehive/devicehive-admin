import { Col, Grid } from 'react-flexbox-grid';
import { Dialog, Divider, FlatButton, TextField } from 'material-ui';
import React, { Component } from 'react';

/**
 * Command/Notification creator dialog
 * 
 * @export
 * @class CommandNotificationCreator
 * @extends {Component}
 */
export default class CommandNotificationCreator extends Component {
  /**
   * Creates an instance of CommandNotificationCreator.
   * @param {Object} props 
   * @memberof CommandNotificationCreator
   */
  constructor(props){
    super(props);
    this.state = {
      name : this.props.command ? this.props.command.command : ``,
      parameters : this.props.command ? JSON.stringify(this.props.command.parameters) : `{}`,
      error : ``
    };
  }

  /**
   * Name change handler
   * 
   * @param {Object} event 
   * @param {String} value 
   * @memberof CommandNotificationCreator
   */
  nameChange(event, value){
    this.setState({
      name : value
    })
  }

  /**
   * Parameters change handler
   * 
   * @param {Object} event 
   * @param {String} value 
   * @memberof CommandNotificationCreator
   */
  parametersChange(event, value){
    try {
      JSON.parse(value);
      this.setState({
        error : ``
      })
    } catch (err) {
      this.setState({
        error : `Not a valid JSON`
      });
    }
    this.setState({
      parameters : value
    });
  }

  /**
   * Command/Notification sender
   * 
   * @memberof CommandNotificationCreator
   */
  send(){
    if (this.state.error === ``){
      this.props.send(Object.assign({}, this.state));
      this.props.closeDialog();
      this.setState({
        name : ``,
        parameters : `{}`
      });
    }
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof CommandNotificationCreator
   */
  render(){
    const commandNotificationActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.send.bind(this)}
      />
    ];
    return (
      <Dialog
        title={`Create new ${this.props.type}`}
        open={this.props.openDialog}
        onRequestClose={this.props.closeDialog}
        actions={commandNotificationActions}
      >
        <Divider/>
        <Grid fluid>
          <Col lg={6} md={6}>
            <TextField
              floatingLabelText="Name"
              fullWidth={true}
              value={this.state.name}
              onChange={this.nameChange.bind(this)}
            />
          </Col>
          <Col lg={6} md={6}>
            <TextField
              floatingLabelText="Parameters"
              fullWidth={true}
              multiLine={true}
              errorText={this.state.error}
              value={this.state.parameters}
              onChange={this.parametersChange.bind(this)}
            />
          </Col>
        </Grid>
      </Dialog>
    );
  }
}