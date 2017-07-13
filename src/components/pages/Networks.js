import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import actions from '../../actions';
import Navbar from '../common/Navbar';
import NetworksTable from '../tables/NetworksTable';
import { RaisedButton } from 'material-ui';
import NetworkForm from '../forms/NetworkForm';
import Pagination from 'material-ui-pagination';

export class Networks extends Component {
  constructor(props){
    super(props);
    this.state = {
      showNetworkForm : false,
      currentPage : 1
    };
  }

  componentWillMount(){
    this.props.actions.networks.getNetworks();
  }

  toggleForm(){
    this.setState({
      showNetworkForm : !this.state.showNetworkForm
    })
  }

  submit(body){
    this.setState({
      showNetworkForm : false
    });
    this.props.actions.networks.createNetwork(body);
  }

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
          <Row>
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

export function mapStateToProps(state){
  return {
    auth : state.auth,
    networks : state.networks
  };
}

export function mapDispatchToProps(dispatch){
  return {
    actions : {
      logout : bindActionCreators(actions.auth.logoutUser, dispatch),
      networks : bindActionCreators(actions.networks, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Networks);