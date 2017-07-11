import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Drawer, MenuItem, FlatButton } from 'material-ui';


const menuItems = [
  { text : `Login`, link : `/`, access : [`admin`, `user`], show : false },
  { text : `Users`, link : `/users`, access : [`admin`], show : true },
  { text : `Network`, link : `/network`, access : [`admin`], show : false },
  { text : `Networks`, link : `/networks`, access : [`admin`, `user`], show : true },
  { text : `Devices`, link : `/devices`, access : [`admin`, `user`], show : true },
  { text : `JWT`, link : `/jwt`, access : [`admin`, `user` ], show : true }
];

export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      open : false,
      checkedIndex : 0
    };
  }

  componentWillMount(){
    this.setState({
      checkedIndex : menuItems.findIndex((element, index) => element.link === this.props.locationPath)
    });
  }

  handleToggle(){
    this.setState({ open : !this.state.open });
  }

  handleClose(){
    this.setState({ open : false });
  }

  logout(){
    this.props.logout();
  }

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
