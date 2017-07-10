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
import moment from 'moment';

export class CommandsTable extends Component {

  refreshCommand(commandId){
    this.props.refreshCommand(commandId);
  }

  copyCommand(command){
    this.props.copyCommand(command);
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
            <TableHeaderColumn>Time</TableHeaderColumn>
            <TableHeaderColumn>Parameters</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>Result</TableHeaderColumn>
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
            <TableRowColumn key={`${index}-name`}>{item.command}</TableRowColumn>
            <TableRowColumn key={`${index}-time`}>{moment(item.timestamp).format(`MM/DD/YYYY HH:mm:ss`)}</TableRowColumn>
            <TableRowColumn key={`${index}-parameters`}>{JSON.stringify(item.parameters)}</TableRowColumn>
            <TableRowColumn key={`${index}-status`}>{item.status ? item.status : ``}</TableRowColumn>
            <TableRowColumn key={`${index}-result`}>{item.result ? item.result : ``}</TableRowColumn>
            <TableRowColumn><FontIcon className="material-icons" onTouchTap={this.refreshCommand.bind(this, item.id)} style={{ cursor : `pointer` }}>refresh</FontIcon><FontIcon className="material-icons" onTouchTap={this.copyCommand.bind(this, item)} style={{ cursor : `pointer` }}>content_copy</FontIcon></TableRowColumn>
          </TableRow>
        )}

        </TableBody>
      </Table>
    );
  }
}

export default CommandsTable;