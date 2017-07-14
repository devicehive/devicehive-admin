import {
  FontIcon,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

/**
 * Devices table component
 * 
 * @export
 * @class DevicesTable
 * @extends {Component}
 */
export default class DevicesTable extends Component {
  /**
   * Render
   * 
   * @returns 
   * @memberof DevicesTable
   */
  render(){
    return (
      <Table
        fixedFooter={false}
        fixedHeader={true}
        selectable={false}
        height={`510px`}
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
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {this.props.devices.size && this.props.networks.size && this.props.devices.map((item, index) => 
            <TableRow
              key={index}
            >
              <TableRowColumn key={`${index}-name`}>
                <Link
                  to={{
                    pathname : `/device/${item.id}`,
                    state : {
                      device : item,
                      networks : this.props.networks
                    }
                  }}
                >
                  {item.name}
                </Link>
              </TableRowColumn>
              <TableRowColumn key={`${index}-network`}>{this.props.networks.find(network => item.networkId === network.id).name}</TableRowColumn>
              <TableRowColumn key={`${index}-operation`}>{item.isBlocked ? `Blocked` : `Normal`}</TableRowColumn>
              <TableRowColumn key={`${index}-data`}>{JSON.stringify(item.data)}</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons" onTouchTap={this.props.removeDevice.bind(this, item.id)} style={{ cursor : `pointer` }}>close</FontIcon></TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}