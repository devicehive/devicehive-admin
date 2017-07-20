import { Col, Grid, Row } from 'react-flexbox-grid';
import { DatePicker, Dialog, Divider, FlatButton, TimePicker } from 'material-ui';
import React, { Component } from 'react';
import moment from 'moment';

/**
 * Token creation dialog
 * 
 * @export
 * @class TokenDialog
 * @extends {Component}
 */
export default class TokenDialog extends Component {
  /**
   * Creates an instance of TokenDialog.
   * @param {Object} props 
   * @memberof TokenDialog
   */
  constructor(props){
    super(props);
    this.state = {
      date : null,
      time : null
    };
  }

  componentWillMount(){
    this.setState({
      date : new Date(moment().add(30, `minutes`).format(`YYYY-MM-DD[T]HH:mm:ss.SSS`)),
      time : new Date(moment().add(30, `minutes`).format(`YYYY-MM-DD[T]HH:mm:ss.SSS`))
    })
  }

  /**
   * Token creation handler
   * 
   * @memberof TokenDialog
   */
  createToken(){
    let timestamp = ``;
    if (this.state.date && this.state.time){
      timestamp = `${moment(this.state.date).format(`YYYY-MM-DD`)}T${moment(this.state.time).format(`HH:mm:ss`)}`;
    }
    this.props.createToken(timestamp);
  }

  /**
   * Date/Time change handler
   * 
   * @param {String} key 
   * @param {Object} event 
   * @param {String} value 
   * @memberof TokenDialog
   */
  changeDateTime(key, event, value){
    console.log(JSON.stringify(value));
    this.setState({
      [key] : value
    })
  }

  /**
   * Date/Time clearing handler
   * 
   * @memberof TokenDialog
   */
  clearDateTime(){
    this.setState({
      date : null,
      time : null
    })
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof TokenDialog
   */
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
    return (
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