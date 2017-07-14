import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui';
import React, { Component } from 'react';
import moment from 'moment';

/**
 * Notifications table component
 * 
 * @export
 * @class NotificationsTable
 * @extends {Component}
 */
export class NotificationsTable extends Component {
  /**
   * Render
   * 
   * @returns 
   * @memberof NotificationsTable
   */
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
            <TableHeaderColumn>Time</TableHeaderColumn>
            <TableHeaderColumn>Parameters</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {this.props.notificationsPoll.map((item, index) => 
            <TableRow
              key={index}
            >
              <TableRowColumn key={`${index}-name`}>{item.notification}</TableRowColumn>
              <TableRowColumn key={`${index}-time`}>{moment(item.timestamp).format(`MM/DD/YYYY HH:mm:ss`)}</TableRowColumn>
              <TableRowColumn key={`${index}-parameters`}>{JSON.stringify(item.parameters)}</TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

export default NotificationsTable;