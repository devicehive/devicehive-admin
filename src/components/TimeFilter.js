import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Dialog, DatePicker, TimePicker, FlatButton, Divider } from 'material-ui';

export default class TimeFilter extends Component {
  constructor(props){
    super(props);
    this.state = {
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

  setTimePeriod(){
    this.props.saveTime(this.state.from, this.state.to);
  }

  render(){
    const dateTimeActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.setTimePeriod.bind(this)}
      />
    ];
    return (
      <Dialog
        title="Time Filter"
        open={this.props.openDialog}
        onRequestClose={this.props.closeDialog}
        actions={dateTimeActions}
      >
        <Divider/>
        <Grid fluid>
          <h4>From:</h4>
          <Row>
            <Col lg={4} md={4}>
              <DatePicker
                hintText="Date"
                mode="portrait"
                value={this.state.from.date}
                onChange={this.changeDate.bind(this, `from`)}
              />
            </Col>
            <Col lg={4} md={4} lgOffset={1} mdOffset={1}>
              <TimePicker
                format="24hr"
                hintText="Time"
                value={this.state.from.time}
                onChange={this.changeTime.bind(this, `from`)}
              />
            </Col>
            <Col lg={2} md={2} lgOffset={1} mdOffset={1}>
              <FlatButton
                label="Clear"
                onTouchTap={this.clearDateTime.bind(this, `from`)}
              />
            </Col>
          </Row>
          <h4>To:</h4>
          <Row>
            <Col lg={4} md={4}>
              <DatePicker
                hintText="Date"
                mode="portrait"
                value={this.state.to.date}
                onChange={this.changeDate.bind(this, `to`)}
              />
            </Col>
            <Col lg={4} md={4} lgOffset={1} mdOffset={1}>
              <TimePicker
                format="24hr"
                hintText="Time"
                value={this.state.to.time}
                onChange={this.changeTime.bind(this, `to`)}
              />
            </Col>
            <Col lg={2} md={2} lgOffset={1} mdOffset={1}>
              <FlatButton
                label="Clear"
                onTouchTap={this.clearDateTime.bind(this, `to`)}
              />
            </Col>
          </Row>
        </Grid>
      </Dialog>
    );
  }
}