import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class ProtectedRoute extends Component {

  render(){
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       location : this.props.location
     })
    );
    return (
      this.props.auth.get(`isAuthenticated`) ?
        <div>
          {childrenWithProps}
        </div>
      :
        <Redirect to={{ pathname : `/`, state : { from : this.props.location.pathname } }}/>
    );
  }
}

export function mapStateToProps(state){
  return {
    auth : state.auth
  };
}

export function mapDispatchToProps(dispatch){
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);