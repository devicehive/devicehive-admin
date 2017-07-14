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

/**
 * Form for User updates
 * 
 * @export
 * @class UserForm
 * @extends {Component}
 */
export default class UserForm extends Component {
  /**
   * Creates an instance of UserForm.
   * @param {Object} props 
   * @memberof UserForm
   */
  constructor(props){
    super(props);
    this.state = {
      login : ``,
      role : 0,
      status : 0,
      password : ``,
      passwordConfirmation : ``,
      data : {},
      error : ``
    };
  }

  /**
   * Form submit handler
   * 
   * @memberof UserForm
   */
  submit(){
    if (this.state.error === `` && this.state.password === this.state.passwordConfirmation){
      this.props.submit({
        login : this.state.login,
        role : this.state.role,
        status : this.state.status,
        password : this.state.password,
        data : this.state.data
      })
    }
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof UserForm
   */
  render(){
    return (
      <Card>
        <CardHeader
          title="User Params"
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
              id="userLogin"
              type="text"
              fullWidth={true}
              floatingLabelText="Login"
              autoComplete="off"
              value={this.state.login}
              onChange={(event, value) => this.setState({ login : value })}
            />
          </Col>
          <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
            <SelectField
              floatingLabelText="Role"
              fullWidth={true}
              id="userRole"
              value={this.state.role}
              onChange={(event, index, value) => this.setState({ role : value })}
            >
              <MenuItem value={0} key="admin"
                primaryText="Administrator"
              >
              </MenuItem>
              <MenuItem value={1} key="client"
                primaryText="Client"
              >
              </MenuItem>
            </SelectField>
          </Col>
          <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
            <SelectField
              floatingLabelText="Status"
              fullWidth={true}
              id="userStatus"
              value={this.state.status}
              onChange={(event, index, value) => this.setState({ status : value })}
            >
              <MenuItem value={0} key="active"
                primaryText="Active"
              >
              </MenuItem>
              <MenuItem value={1} key="locked"
                primaryText="Locked Out"
              >
              </MenuItem>
              <MenuItem value={2} key="disabled"
                primaryText="Disabled"
              >
              </MenuItem>
            </SelectField>
          </Col>
          <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
            <TextField
              id="userPassword"
              type="password"
              fullWidth={true}
              floatingLabelText="Password"
              autoComplete="off"
              value={this.state.password}
              onChange={(event, value) => this.setState({ password : value })}
            />
          </Col>
          <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
            <TextField
              id="userPasswordConfirmation"
              type="password"
              fullWidth={true}
              floatingLabelText="Password Confirmation"
              autoComplete="off"
              value={this.state.passwordConfirmation}
              onChange={(event, value) => this.setState({ passwordConfirmation : value })}
            />
          </Col>
          <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
            <TextField
              id="userData"
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