import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Dialog, DatePicker, TimePicker, FlatButton, Divider } from 'material-ui';
import moment from 'moment';

export default class TokenDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      date : null,
      time : null
    };
  }

  createToken(){
    let timestamp = ``;
    if (this.state.date && this.state.time){
      timestamp = `${moment(this.state.date).format(`YYYY-MM-DD`)}T${moment(this.state.time).format(`HH:mm:ss`)}`;
    }
    this.props.createToken(timestamp);
  }

  changeDateTime(key, event, value){
    this.setState({
      [key] : value
    })
  }

  clearDateTime(){
    this.setState({
      date : null,
      time : null
    })
  }

  render(){
    const tokenActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.createToken.bind(this)}
      />
    ];
    return(
      <Dialog
        title="Token Expiration Form"
        open={this.props.openDialog}
        onRequestClose={this.props.closeDialog}
        actions={tokenActions}
      >
        <Divider/>
        <Grid fluid>
          <h4>To :</h4>
          <Row>
            <Col lg={4} md={4}>
              <DatePicker
                hintText="Date"
                mode="portrait"
                value={this.state.date}
                onChange={this.changeDateTime.bind(this, `date`)}
              />
            </Col>
            <Col lg={4} md={4} lgOffset={1} mdOffset={1}>
              <TimePicker
                format="24hr"
                hintText="Time"
                value={this.state.time}
                onChange={this.changeDateTime.bind(this, `time`)}
              />
            </Col>
            <Col lg={2} md={2} lgOffset={1} mdOffset={1}>
              <FlatButton
                label="Clear"
                onTouchTap={this.clearDateTime.bind(this)}
              />
            </Col>
          </Row>
        </Grid>
      </Dialog>
    );
  }
}