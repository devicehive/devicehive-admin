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
import moment from 'moment';

/**
 * Users table component
 * 
 * @export
 * @class UsersTable
 * @extends {Component}
 */
export default class UsersTable extends Component {
  /**
   * Render
   * 
   * @returns 
   * @memberof UsersTable
   */
  render(){
    const width = {
      login : 10,
      role : 15,
      status : 10,
      lastLogin : 20,
      data : 10
    };
    if (this.props.users.size){
      const users = this.props.users.toJS();
      users.forEach(user => {
        if (width.login < user.login.length){
          width.login = user.login.length;
        }
        if (width.data < JSON.stringify(user.data).length){
          width.data = JSON.stringify(user.data).length;
        }
      })
      const widthFull = width.login + width.role + width.status + width.lastLogin + width.data;
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
                width : `${width.login}`
              }}
            >
              Login
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                width : `${width.role}`
              }}
            >
              Role
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
                width : `${width.lastLogin}`
              }}
            >
              Last Login
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                width : `${width.data}`
              }}
            >
              Data
            </TableHeaderColumn>
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
              <TableRowColumn 
                key={`${index}-login`}
                style={{
                  width : `${width.login}`
                }}
              >
                <Link
                  to={{
                    pathname : `/user/${user.id}`
                  }}
                >
                  {user.login}
                </Link>
              </TableRowColumn>
              <TableRowColumn 
                key={`${index}-role`}
                style={{
                  width : `${width.role}`
                }}
              >
                {!user.role ? `Administrator` : `Client`}
              </TableRowColumn>
              <TableRowColumn 
                key={`${index}-status`}
                style={{
                  width : `${width.status}`
                }}
              >
                {user.status === 0 ? `Active` : `Disabled`}
              </TableRowColumn>
              <TableRowColumn 
                key={`${index}-lastlogin`}
                style={{
                  width : `${width.lastLogin}`
                }}
              >
                {user.lastLogin ? moment(user.lastLogin).format(`MM/DD/YYYY[ ]HH:mm:ss`) : ``}
              </TableRowColumn>
              <TableRowColumn 
                key={`${index}-data`}
                style={{
                  width : `${width.data}`
                }}
              >
                {user.data ? JSON.stringify(user.data) : ``}
              </TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons" onTouchTap={this.props.remove.bind(null, user.id)} style={{ cursor : `pointer` }}>close</FontIcon></TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}