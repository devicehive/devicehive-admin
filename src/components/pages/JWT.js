import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions';
import Navbar from '../common/Navbar';
import { Paper, RaisedButton, TextField, FontIcon } from 'material-ui';
import { Grid, Col, Row } from 'react-flexbox-grid';
import moment from 'moment';
import TokenDialog from '../TokenDialog';
import CopyToClipboard from 'react-copy-to-clipboard';

export class JWT extends Component {
  constructor(props){
    super(props);
    this.state = {
      openTokenDialog : false
    };
  }

  openTokenDialog(){
    this.setState({
      openTokenDialog : true
    })
  }

  closeTokenDialog(){
    this.setState({
      openTokenDialog : false
    })
  }

  createToken(timestamp){
    this.props.actions.jwt.createToken(this.props.auth.getIn([`tokens`, `jwtToken`]), timestamp);
    this.closeTokenDialog();
  }

  render(){
    return (
      <div>
        <Navbar locationPath={this.props.location.pathname} showDrawer={true} authenticated={true} logout={this.props.actions.logout} userRole={this.props.auth.get(`role`)}/>
        <Grid fluid>
          <Row>
            <Col md={8} lg={8} mdOffset={2} lgOffset={2}>
              {this.props.jwt.getIn([`access`, `token`]) &&
              <Paper>
                <h4>JWT Token (Expiration date {moment(this.props.jwt.getIn([`access`, `expiration`])).format(`MM/DD/YYYY[ ]HH:mm [GMT] Z`)}):</h4>
                <Row>
                  <Col lg={11} md={11}>
                    <TextField 
                      id="accessToken"
                      multiLine={true}
                      fullWidth={true}
                      disabled={true}
                      underlineShow={false}
                      style={{
                        cursor : `default`
                      }}
                      value={this.props.jwt.getIn([`access`, `token`])}
                    />
                  </Col>
                  <Col lg={1} md={1}>
                    <CopyToClipboard
                      text={this.props.jwt.getIn([`access`, `token`])}
                    >
                      <FontIcon className="material-icons" style={{ cursor : `pointer` }}>content_copy</FontIcon>
                    </CopyToClipboard>
                  </Col>
                </Row>
              </Paper>
              }
              {this.props.jwt.getIn([`refresh`, `token`]) &&
              <Paper>
                <h4>JWT Token (Expiration date {moment(this.props.jwt.getIn([`refresh`, `expiration`])).format(`MM/DD/YYYY[ ]HH:mm [GMT] Z`)}):</h4>
                <Row>
                  <Col lg={11} md={11}>
                    <TextField 
                      id="refreshToken"
                      multiLine={true}
                      fullWidth={true}
                      disabled={true}
                      underlineShow={false}
                      style={{
                        cursor : `default`
                      }}
                      value={this.props.jwt.getIn([`refresh`, `token`])}
                    />
                  </Col>
                  <Col lg={1} md={1}>
                    <CopyToClipboard
                      text={this.props.jwt.getIn([`refresh`, `token`])}
                    >
                      <FontIcon className="material-icons" style={{ cursor : `pointer` }}>content_copy</FontIcon>
                    </CopyToClipboard>
                  </Col>
                </Row>
              </Paper>
              }
              <Row
                style={{
                  marginTop : `10px`
                }}
              >
                <Col md={3} lg={3}>
                  <RaisedButton
                    label="Create token"
                    primary={true}
                    fullWidth={true}
                    onTouchTap={this.openTokenDialog.bind(this)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
        <TokenDialog
          closeDialog={this.closeTokenDialog.bind(this)}
          openDialog={this.state.openTokenDialog}
          createToken={this.createToken.bind(this)}
        />
      </div>
    );
  }
}

export function mapStateToProps(state){
  return {
    auth : state.auth,
    jwt : state.jwt
  };
}

export function mapDispatchToProps(dispatch){
  return {
    actions : {
      logout : bindActionCreators(actions.auth.logoutUser, dispatch),
      jwt : bindActionCreators(actions.jwt, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JWT);