import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Custom protected route component.
 * Force user to login
 * 
 * @export
 * @class ProtectedRoute
 * @extends {Component}
 */
export class ProtectedRoute extends Component {

  /**
   * Render
   * 
   * @returns 
   * @memberof ProtectedRoute
   */
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

/**
 * Redux Store mapper
 * 
 * @export
 * @param {Object} state 
 * @returns 
 */
export function mapStateToProps(state){
  return {
    auth : state.auth
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);