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
    const width = {
      name : 10,
      time : 15,
      parameters : 10
    };
    if (this.props.notificationsPoll.size){
      const notificationsPoll = this.props.notificationsPoll.toJS();
      notificationsPoll.forEach(notification => {
        if (width.name < notification.notification.length){
          width.name = notification.notification.length;
        }
        if (notification.parameters && width.parameters < JSON.stringify(notification.parameters).length){
          width.parameters = JSON.stringify(notification.parameters).length;
        }
      })
      const widthFull = width.name + width.parameters + width.time;
      for (const key of Object.keys(width)){
        width[key] = `${(width[key] / widthFull) * 90}%`;
      }
    }
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
            <TableHeaderColumn
              style={{
                width : `${width.name}`
              }}
            >
              Name
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                width : `${width.time}`
              }}
            >
              Time
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                width : `${width.parameters}`
              }}
            >
              Parameters
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {this.props.notificationsPoll.map((item, index) => 
            <TableRow
              key={index}
            >
              <TableRowColumn 
                key={`${index}-name`}
                style={{
                  width : `${width.name}`
                }}
              >
                {item.notification}
              </TableRowColumn>
              <TableRowColumn 
                key={`${index}-time`}
                style={{
                  width : `${width.time}`
                }}
              >
                {moment(item.timestamp).format(`MM/DD/YYYY HH:mm:ss`)}
              </TableRowColumn>
              <TableRowColumn 
                key={`${index}-parameters`}
                style={{
                  width : `${width.parameters}`
                }}
              >
                {JSON.stringify(item.parameters)}
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

export default NotificationsTable;