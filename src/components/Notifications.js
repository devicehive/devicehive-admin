import React, { Component } from 'react';

export class Notifications extends Component {

  render(){
    return (
      <div>{JSON.stringify(this.props.notificationsPoll)}</div> 
    );
  }
}

export default Notifications;