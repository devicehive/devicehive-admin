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
    const width = {
      name : 10,
      network : 10,
      operation : 15,
      data : 10
    };
    if (this.props.devices.size && this.props.networks.size){
      const devices = this.props.devices.toJS();
      const networks = this.props.networks.toJS();
      networks.forEach(network => {
        if (width.network < network.name.length){
          width.network = network.name.length;
        }
      })
      devices.forEach(device => {
        if (width.name < device.name.length){
          width.name = device.name.length;
        }
        if (device.data && width.data < JSON.stringify(device.data).length){
          width.data = JSON.stringify(device.data).length;
        }
      })
      const widthFull = width.name + width.network + width.operation + width.data;
      for (const key of Object.keys(width)){
        width[key] = `${(width[key] / widthFull) * 90}%`;
      }
    }
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
            <TableHeaderColumn
              style={{
                width : `${width.name}`
              }}
            >
              Name
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                width : `${width.network}`
              }}
            >
              Network
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                width : `${width.operation}`
              }}
            >
              Operation
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                width : `${width.data}`
              }}
            >
              Data(json)
            </TableHeaderColumn>
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
              <TableRowColumn 
                key={`${index}-name`}
                style={{
                  width : `${width.name}`
                }}
              >
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
              <TableRowColumn 
                key={`${index}-network`}
                style={{
                  width : `${width.network}`
                }}
              >
                {this.props.networks.find(network => item.networkId === network.id).name}
              </TableRowColumn>
              <TableRowColumn 
                key={`${index}-operation`}
                style={{
                  width : `${width.operation}`
                }}
              >
                {item.isBlocked ? `Blocked` : `Normal`}
              </TableRowColumn>
              <TableRowColumn 
                key={`${index}-data`}
                style={{
                  width : `${width.data}`
                }}
              >
                {JSON.stringify(item.data)}
              </TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons" onTouchTap={this.props.removeDevice.bind(this, item.id)} style={{ cursor : `pointer` }}>close</FontIcon></TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}