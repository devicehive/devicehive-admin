import { AppBar, Drawer, FlatButton, MenuItem } from 'material-ui';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  { text : `Login`, link : `/`, access : [`admin`, `user`], show : false },
  { text : `Users`, link : `/users`, access : [`admin`], show : true },
  { text : `User`, link : `/user`, access : [`admin`], show : false },
  { text : `Network`, link : `/network`, access : [`admin`], show : false },
  { text : `Networks`, link : `/networks`, access : [`admin`, `user`], show : true },
  { text : `Devices`, link : `/devices`, access : [`admin`, `user`], show : true },
  { text : `Device`, link : `/device`, access : [`admin`, `user`], show : false },
  { text : `JWT`, link : `/jwt`, access : [`admin`, `user` ], show : true },
  { text : `Profile`, link : `/profile`, access : [`admin`, `user`], show : true }
];

/**
 * Navbar component
 * 
 * @export
 * @class Navbar
 * @extends {Component}
 */
export default class Navbar extends Component {
  /**
   * Creates an instance of Navbar.
   * @param {Object} props 
   * @memberof Navbar
   */
  constructor(props){
    super(props);
    this.state = {
      open : false,
      checkedIndex : 0
    };
  }
  
  /**
   * Lifecycle
   * 
   * @memberof Navbar
   */
  componentWillMount(){
    this.setState({
      checkedIndex : menuItems.findIndex((element, index) => element.link === this.props.locationPath)
    });
  }

  /**
   * Handler for Drawer toggle
   * 
   * @memberof Navbar
   */
  handleToggle(){
    this.setState({ open : !this.state.open });
  }

  /**
   * Handler for Drawer close
   * 
   * @memberof Navbar
   */
  handleClose(){
    this.setState({ open : false });
  }

  /**
   * Logout handler
   * 
   * @memberof Navbar
   */
  logout(){
    this.props.logout();
  }

  /**
   * Render
   * 
   * @returns 
   * @memberof Navbar
   */
  render(){
    return (
      <div>
        <AppBar
          id="app-bar"
          title={menuItems[this.state.checkedIndex].text}
          showMenuIconButton={this.props.showDrawer}
          onLeftIconButtonTouchTap={this.props.showDrawer ? this.handleToggle.bind(this) : () => {}}
          iconElementRight={this.props.authenticated ? <FlatButton label="Logout" onTouchTap={this.logout.bind(this)}/> : <div></div>}
        />
        <Drawer open={this.state.open}
                docked={false}
                onRequestChange={(open) => this.setState({ open })}>
          {menuItems.map((item, i) => item.show && item.access.includes(this.props.userRole) && <Link to={item.link} key={i} onTouchTap={this.handleClose.bind(this)}><MenuItem style={ this.state.checkedIndex === i ? { backgroundColor : `grey` } : {}}>{item.text}</MenuItem></Link>)}
        </Drawer>
      </div>
    );
  }
}
