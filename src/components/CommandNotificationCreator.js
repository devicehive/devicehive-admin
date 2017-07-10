import React, { Component } from 'react';
import { Grid, Col } from 'react-flexbox-grid';
import { Dialog, Divider, TextField, FlatButton } from 'material-ui';

export default class CommandNotificationCreator extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : this.props.command ? this.props.command.command : ``,
      parameters : this.props.command ? JSON.stringify(this.props.command.parameters) : `{}`,
      error : ``
    };
  }

  nameChange(event, value){
    this.setState({
      name : value
    })
  }

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
          <Col xs={6} md={6}>
            <TextField
              floatingLabelText="Name"
              fullWidth={true}
              value={this.state.name}
              onChange={this.nameChange.bind(this)}
            />
          </Col>
          <Col xs={6} md={6}>
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