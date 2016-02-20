require('./nav.styl');

import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <nav>
        <ul role="nav">
          <li><Link to="/">Library</Link></li>
          <li><Link to="/storage">Storage</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/form">Upload a book</Link></li>
        </ul>
        {this.props.children}
      </nav>
    );
  },
});
