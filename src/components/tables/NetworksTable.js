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

export default class NetworksTable extends Component {

  edit(id){
    this.props.edit(id);
  }

  remove(id){
    this.props.remove(id);
  }

  render(){
    return (
      <Table
        fixedFooter={false}
        fixedHeader={true}
        selectable={false}
        height={`400px`}
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
          {this.props.networks.size && this.props.networks.map((network, index) =>
            <TableRow
              key={index}
            > 
              <TableRowColumn key={`${index}-network`}>{network.name}</TableRowColumn>
              <TableRowColumn key={`${index}-description`}>{network.description}</TableRowColumn>
              {this.props.userRole === `admin` &&
                <TableRowColumn><FontIcon className="material-icons" onTouchTap={this.edit.bind(this, network.id)} style={{ cursor : `pointer` }}>edit</FontIcon><FontIcon className="material-icons" onTouchTap={this.remove.bind(this, network.id)} style={{ cursor : `pointer` }}>close</FontIcon></TableRowColumn>
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}