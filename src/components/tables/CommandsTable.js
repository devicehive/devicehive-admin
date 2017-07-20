import {
  FontIcon,
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
 * Commands table component
 * 
 * @export
 * @class CommandsTable
 * @extends {Component}
 */
export class CommandsTable extends Component {

  /**
   * Refresh command handler
   * 
   * @param {String} commandId 
   * @memberof CommandsTable
   */
  refreshCommand(commandId){
    this.props.refreshCommand(commandId);
  }

  /**
   * Copy command handler
   * 
   * @param {Object} command 
   * @memberof CommandsTable
   */
  copyCommand(command){
    this.props.copyCommand(command);
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof CommandsTable
   */
  render(){
    const width = {
      name : 10,
      time : 15,
      parameters : 10,
      status : 10,
      result : 10
    };
    if (this.props.commandsPoll.size){
      const commandsPoll = this.props.commandsPoll.toJS();
      commandsPoll.forEach(command => {
        if (width.name < command.command.length){
          width.name = command.command.length;
        }
        if (command.parameters && width.parameters < JSON.stringify(command.parameters).length){
          width.parameters = JSON.stringify(command.parameters).length;
        }
        if (command.status && width.status < command.status.length){
          width.status = command.status.length;
        }
        if (command.result && width.result < command.result.length){
          width.result = command.result.length;
        }
      })
      const widthFull = width.name + width.parameters + width.result + width.status + width.time;
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
                width : `${width.timestamp}`
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
            <TableHeaderColumn
              style={{
                width : `${width.status}`
              }}
            >
              Status
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                width : `${width.result}`
              }}
            >
              Result
            </TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
        {this.props.commandsPoll.map((item, index) => 
          <TableRow
            key={index}
          >
            <TableRowColumn 
              key={`${index}-name`}
              style={{
                width : `${width.name}`
              }}
            >
              {item.command}
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
            <TableRowColumn 
              key={`${index}-status`}
              style={{
                width : `${width.status}`
              }}
            >
              {item.status ? item.status : ``}
            </TableRowColumn>
            <TableRowColumn 
              key={`${index}-result`}
              style={{
                width : `${width.result}`
              }}
            >
              {item.result ? item.result : ``}
            </TableRowColumn>
            <TableRowColumn><FontIcon className="material-icons" onTouchTap={this.refreshCommand.bind(this, item.id)} style={{ cursor : `pointer` }}>refresh</FontIcon><FontIcon className="material-icons" onTouchTap={this.copyCommand.bind(this, item)} style={{ cursor : `pointer` }}>content_copy</FontIcon></TableRowColumn>
          </TableRow>
        )}

        </TableBody>
      </Table>
    );
  }
}

export default CommandsTable;