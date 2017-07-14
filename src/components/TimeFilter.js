import { Col, Grid, Row } from 'react-flexbox-grid';
import { DatePicker, Dialog, Divider, FlatButton, TimePicker } from 'material-ui';
import React, { Component } from 'react';

/**
 * Date/time filter dialog
 * 
 * @export
 * @class TimeFilter
 * @extends {Component}
 */
export default class TimeFilter extends Component {
  /**
   * Creates an instance of TimeFilter.
   * @param {Object} props 
   * @memberof TimeFilter
   */
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

  /**
   * Date change handler
   * 
   * @param {String} type 
   * @param {Object} event 
   * @param {String} newDate 
   * @memberof TimeFilter
   */
  changeDate(type, event, newDate){
    const stateCopy = Object.assign({}, this.state);
    stateCopy[type].date = newDate;
    this.setState(stateCopy);
  }

  /**
   * Time change handler
   * 
   * @param {String} type 
   * @param {Object} event 
   * @param {String} newTime 
   * @memberof TimeFilter
   */
  changeTime(type, event, newTime){
    const stateCopy = Object.assign({}, this.state);
    stateCopy[type].time = newTime;
    this.setState(stateCopy);
  }

  /**
   * Date/time cleaning handler
   * 
   * @param {String} type 
   * @memberof TimeFilter
   */
  clearDateTime(type){
    this.setState({
      [type] : {
        date : null,
        time : null
      }
    })
  }

  /**
   * Timet period handler
   * 
   * @memberof TimeFilter
   */
  setTimePeriod(){
    this.props.saveTime(this.state.from, this.state.to);
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof TimeFilter
   */
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