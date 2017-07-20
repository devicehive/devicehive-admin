import { Col, Grid, Row } from 'react-flexbox-grid';
import { RaisedButton } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Navbar from '../common/Navbar';
import NetworkForm from '../forms/NetworkForm';
import NetworksTable from '../tables/NetworksTable';
import Pagination from 'material-ui-pagination';
import actions from '../../actions';

/**
 * Networks page
 * 
 * @export
 * @class Networks
 * @extends {Component}
 */
export class Networks extends Component {
  /**
   * Creates an instance of Networks.
   * @param {Object} props 
   * @memberof Networks
   */
  constructor(props){
    super(props);
    this.state = {
      showNetworkForm : false,
      currentPage : 1
    };
  }

  /**
   * Lifecycle
   * 
   * @memberof Networks
   */
  componentWillMount(){
    this.props.actions.networks.getNetworks();
  }

  /**
   * Form toggle handler
   * 
   * @memberof Networks
   */
  toggleForm(){
    this.setState({
      showNetworkForm : !this.state.showNetworkForm
    })
  }

  /**
   * Form submit handler
   * 
   * @param {Object} body 
   * @memberof Networks
   */
  submit(body){
    this.setState({
      showNetworkForm : false
    });
    this.props.actions.networks.createNetwork(body);
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof Networks
   */
  render(){
    return (
      <div>
        <Navbar locationPath={this.props.location.pathname} showDrawer={true} authenticated={true} logout={this.props.actions.logout} userRole={this.props.auth.get(`role`)}/>
        <Grid fluid>
          <Row>
            <Col md={8} lg={8} mdOffset={2} lgOffset={2}>
              <NetworksTable
                networks={this.props.networks.get(`networksList`).slice(0 + (this.state.currentPage - 1) * 10, this.state.currentPage * 10).toJS()}
                userRole={this.props.auth.get(`role`)}
                remove={this.props.actions.networks.removeNetwork}
              />
            </Col>
          </Row>
          {this.props.auth.get(`role`) === `admin` && 
            <Row>
              <Col md={8} lg={8} mdOffset={2} lgOffset={2}>
                {this.state.showNetworkForm ?
                  <Col md={12} lg={12}>
                    <NetworkForm toggle={this.toggleForm.bind(this)} submit={this.submit.bind(this)}/>
                  </Col>
                :
                  <Col md={3} lg={3}>
                    <RaisedButton 
                      label="Add Network" 
                      primary={true} 
                      fullWidth={true}
                      onTouchTap={this.toggleForm.bind(this)}
                    />
                  </Col>
                }
              </Col>
            </Row>
          }
          <Row
            style={{
              position : `absolute`,
              bottom : 10,
              width : `98%`
            }}
          >
            <Col md={2} lg={2} mdOffset={5} lgOffset={5}>
              <Pagination
                total={Math.ceil(this.props.networks.get(`networksList`).size / 10)}
                display={5}
                current={this.state.currentPage}
                style={{
                  width : `100%`
                }}
                onChange={(value) => this.setState({ currentPage : value })}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

/**
 * Redux store mapper
 * 
 * @export
 * @param {Object} state 
 * @returns 
 */
export function mapStateToProps(state){
  return {
    auth : state.auth,
    networks : state.networks
  };
}

/**
 * Redux action mapper
 * 
 * @export
 * @param {Function} dispatch 
 * @returns 
 */
export function mapDispatchToProps(dispatch){
  return {
    actions : {
      logout : bindActionCreators(actions.auth.logoutUser, dispatch),
      networks : bindActionCreators(actions.networks, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Networks);