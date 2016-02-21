require('./nav.styl');

import { Link } from 'react-router';
import Auth from '../elements/auth-form.jsx';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LeftNav from 'material-ui/lib/left-nav';
import FlatButton from 'material-ui/lib/flat-button';

const logout = function() {
  document.cookie = 'auth_token=';
  window.location = '/';
}

const AppBarExampleIconMenu = React.createClass({
  render() {
    return (
      <AppBar
        title="Book Angeles"
        onLeftIconButtonTouchTap={this.props.navClick}
        iconElementRight={
          <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
            <MenuItem primaryText="Sign out" onTouchTap={logout} />
          </IconMenu>
        }
      />
    )
  }
});

export default React.createClass({
  getInitialState() {
    $.getJSON('/bapi/books')
    .done(_.noop)
    .fail(data => {
      if (data.status == 401)
        this.setState({ authorized: false });
    });

    return {
      openNav: false,
      authorized: true
    };
  },
  toggleAuth() {
    this.setState({ authorized: !this.state.authorized })
  },
  handleToggle() {
    this.setState({ openNav: !this.state.openNav })
  },
  render() {
    return (
      <div className="page">
        <AppBarExampleIconMenu navClick={this.handleToggle}/>
        <LeftNav open={this.state.openNav}>
          <AppBar title="Hey!" iconElementRight={<FlatButton label="Close" onClick={this.handleToggle} />} />
          <Link to="/" onClick={this.handleToggle}><MenuItem>Library</MenuItem></Link>
          <Link to="/storage" onClick={this.handleToggle}><MenuItem>Storage</MenuItem></Link>
          <Link to="/profile" onClick={this.handleToggle}><MenuItem>Profile</MenuItem></Link>
        </LeftNav>
        <nav>
          <ul role="nav">
            <li><Link to="/">Library</Link></li>
            <li><Link to="/form">Upload a book</Link></li>
          </ul>
        </nav>

        {!this.state.authorized && <Auth onAuth={this.toggleAuth} />}
        {this.props.children}
      </div>
    );
  },
});
