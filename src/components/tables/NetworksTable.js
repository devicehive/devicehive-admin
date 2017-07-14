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
            <TableHeaderColumn>Network</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
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
              <TableRowColumn key={`${index}-network`}>
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
              <TableRowColumn key={`${index}-description`}>{network.description}</TableRowColumn>
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