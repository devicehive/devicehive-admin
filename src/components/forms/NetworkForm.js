import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  Divider,
  FlatButton,
  FontIcon,
  TextField
} from 'material-ui';
import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid';

/**
 * Network creation form
 * 
 * @export
 * @class NetworkForm
 * @extends {Component}
 */
export default class NetworkForm extends Component {
  /**
   * Creates an instance of NetworkForm.
   * @param {Object} props 
   * @memberof NetworkForm
   */
  constructor(props){
    super(props);
    this.state = {
      name : ``,
      description : ``
    };
  }

  /**
   * Form submit handler
   * 
   * @memberof NetworkForm
   */
  submit(){
    this.props.submit(this.state);
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof NetworkForm
   */
  render(){
    return (
      <Card>
        <CardHeader
          title="Network Params"
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
              id="networkName"
              type="text"
              fullWidth={true}
              floatingLabelText="Name"
              autoComplete="off"
              value={this.state.name}
              onChange={(event, value) => this.setState({ name : value })}
            />
          </Col>
          <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
            <TextField
              id="networkDescription"
              type="text"
              fullWidth={true}
              floatingLabelText="Description"
              autoComplete="off"
              value={this.state.description}
              onChange={(event, value) => this.setState({ description : value })}
            />
          </Col>
        </CardText>
        <CardActions>
          <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
            <FlatButton label="Save" onTouchTap={this.submit.bind(this)}/>
            <FlatButton label="Cancel" onTouchTap={this.props.toggle}/>
          </Col>
        </CardActions>
      </Card>
    );
  }
}