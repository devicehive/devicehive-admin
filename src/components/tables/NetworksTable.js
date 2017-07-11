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
import { Link } from 'react-router-dom';

export default class NetworksTable extends Component {

  remove(id){
    this.props.remove(id);
  }

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