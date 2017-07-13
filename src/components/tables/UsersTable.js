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
import moment from 'moment';

export default class UsersTable extends Component {

  render(){
    return (
      <Table
        fixedFooter={false}
        fixedHeader={true}
        selectable={false}
        height={`510px`}
      >
        <TableHeader
          adjustForCheckBox={false}
          enableSelectAll={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Login</TableHeaderColumn>
            <TableHeaderColumn>Role</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>Last Login</TableHeaderColumn>
            <TableHeaderColumn>Data</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {this.props.users.size && this.props.users.map((user, index) => 
            <TableRow
              key={index}
            >
              <TableRowColumn key={`${index}-login`}>
                <Link
                  to={{
                    pathname : `/user/${user.id}`
                  }}
                >
                  {user.login}
                </Link>
              </TableRowColumn>
              <TableRowColumn key={`${index}-role`}>{!user.role ? `Administrator` : `Client`}</TableRowColumn>
              <TableRowColumn key={`${index}-status`}>{user.status === 0 ? `Active` : `Disabled`}</TableRowColumn>
              <TableRowColumn key={`${index}-lastlogin`}>{user.lastLogin ? moment(user.lastLogin).format(`MM/DD/YYYY[]HH:mm:ss`) : ``}</TableRowColumn>
              <TableRowColumn key={`${index}-data`}>{user.data ? JSON.stringify(user.data) : ``}</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons" onTouchTap={this.props.remove.bind(null, user.id)} style={{ cursor : `pointer` }}>close</FontIcon></TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}