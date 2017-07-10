import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import actions from '../../actions';
import Navbar from '../common/Navbar';
import NetworksTable from '../tables/NetworksTable';
import { RaisedButton } from 'material-ui';
import NetworkForm from '../forms/NetworkForm';

export class Networks extends Component {
  constructor(props){
    super(props);
    this.state = {
      showNetworkForm : false,
      network : null
    };
  }

  componentWillMount(){
    this.props.actions.networks.getNetworks();
  }

  toggleForm(){
    this.setState({
      showNetworkForm : !this.state.showNetworkForm,
      network : null
    })
  }

  submit(body){
    this.setState({
      showNetworkForm : false
    });
    if (body.id === ``){
      delete body.id;
      this.props.actions.networks.createNetwork(body);
    } else {
      this.props.actions.networks.updateNetwork(body);
    }
  }

  edit(id){
    this.setState({
      network : this.props.networks.get(`networksList`).find(network => network.id === id),
      showNetworkForm : true
    })
  }

  render(){
    return (
      <div>
        <Navbar locationPath={this.props.location.pathname} showDrawer={true} authenticated={true} logout={this.props.actions.logout} userRole={this.props.auth.get(`role`)}/>
        <Grid fluid>
          <Row>
            <Col md={8} xs={8} mdOffset={2} xsOffset={2}>
              <NetworksTable
                networks={this.props.networks.get(`networksList`)}
                userRole={this.props.auth.get(`role`)}
                network={this.state.network}
                edit={this.edit.bind(this)}
                remove={this.props.actions.networks.removeNetwork}
              />
            </Col>
          </Row>
          {this.props.auth.get(`role`) === `admin` && 
            <Row>
              <Col md={8} xs={8} mdOffset={2} xsOffset={2}>
                {this.state.showNetworkForm ?
                  <Col md={12} xs={12}>
                    <NetworkForm network={this.state.network} toggle={this.toggleForm.bind(this)} submit={this.submit.bind(this)} removeNetwork={this.props.actions.networks.removeNetwork} edit={this.edit.bind(this)}/>
                  </Col>
                :
                  <Col md={3} xs={3}>
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