import React, { Component } from 'react';

export class Commands extends Component {
  render(){
    return (
      <div>{JSON.stringify(this.props.commandsPoll)}</div> 
    );
  }
}

export default Commands;