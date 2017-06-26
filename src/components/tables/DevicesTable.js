import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  FontIcon
} from 'material-ui';

export default class DevicesTable extends Component {

  edit(id){
    this.props.edit(id);
  }

  info(id){
    this.props.info(id);
  }

  render(){
    return (
      <Table
        fixedFooter={false}
        fixedHeader={false}
        selectable={false}
        height={`400px`}
      >
        <TableHeader
          adjustForCheckbox={false}
          enableSelectAll={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Network</TableHeaderColumn>
            <TableHeaderColumn>Operation</TableHeaderColumn>
            <TableHeaderColumn>Data(json)</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {this.props.devices.size && this.props.networks.size && this.props.devices.map((item, index) => 
            <TableRow
              key={index}
            >
              <TableRowColumn key={`${index}-name`}>{item.name}</TableRowColumn>
              <TableRowColumn key={`${index}-network`}>{this.props.networks.find(network => item.networkId === network.id).name}</TableRowColumn>
              <TableRowColumn key={`${index}-operation`}>{item.isBlocked ? `Blocked` : `Normal`}</TableRowColumn>
              <TableRowColumn key={`${index}-data`}>{JSON.stringify(item.data)}</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons" onTouchTap={this.info.bind(this, item.id)} style={{ cursor : `pointer` }}>info</FontIcon><FontIcon className="material-icons" onTouchTap={this.edit.bind(this, item.id)} style={{ cursor : `pointer` }}>edit</FontIcon><FontIcon className="material-icons" onTouchTap={this.props.removeDevice.bind(this, item.id)} style={{ cursor : `pointer` }}>close</FontIcon></TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}