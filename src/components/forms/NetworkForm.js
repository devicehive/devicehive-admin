import React, { Component } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  FontIcon,
  Divider,
  TextField,
  FlatButton
} from 'material-ui';
import { Col } from 'react-flexbox-grid';

export default class DeviceForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : ``,
      description : ``
    };
  }

  submit(){
    this.props.submit(this.state);
  }

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