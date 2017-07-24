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
 * Networks table component
 * 
 * @export
 * @class NetworksTable
 * @extends {Component}
 */
export default class NetworksTable extends Component {
  /**
   * Network removal handler
   * 
   * @param {any} id 
   * @memberof NetworksTable
   */
  remove(id){
    this.props.remove(id);
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof NetworksTable
   */
  render(){
    const width = {
      name : 10,
      description : 10
    };
    if (this.props.networks && this.props.networks.length){
      this.props.networks.forEach(network => {
        if (width.name < network.name.length){
          width.name = network.name.length;
        }
        if (network.description && width.description < network.description.length){
          width.description = network.description.length;
        }
      })
      const widthFull = width.name + width.description;
      for (const key of Object.keys(width)){
        width[key] = `${(width[key] / widthFull) * 90}%`;
      }
    }

    return (
      <Table
        fixedFooter={false}
        fixedHeader={true}
        selectable={false}
        style={{
          maxHeight : `510px`,
          marginTop : `10px`
        }}
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
              Network
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                width : `${width.description}`
              }}
            >
              Description
            </TableHeaderColumn>
            {this.props.userRole === `admin` && 
            <TableHeaderColumn>Actions</TableHeaderColumn>
            }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {this.props.networks && this.props.networks.length && this.props.networks.map((network, index) =>
            <TableRow
              key={index}
            > 
              <TableRowColumn 
                key={`${index}-network`}
                style={{
                  width : `${width.name}`
                }}
              >
                <Link
                  to={{
                    pathname : `/network/${network.id}`,
                    state : {
                      network
                    }
                  }}
                >
                  {network.name}
                </Link>
              </TableRowColumn>
              <TableRowColumn 
                key={`${index}-description`}
                style={{
                  width : `${width.description}`
                }}
              >
                {network.description}</TableRowColumn>
              {this.props.userRole === `admin` &&
                <TableRowColumn><FontIcon className="material-icons" onTouchTap={this.remove.bind(this, network.id)} style={{ cursor : `pointer` }}>close</FontIcon></TableRowColumn>
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}