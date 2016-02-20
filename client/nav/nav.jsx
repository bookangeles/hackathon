require('./nav.styl');

import { Link } from 'react-router'
import Cloud from '../elements/cloud.jsx'

const mockData = {
  loadedTags: [{
    id: 1,
    caption: 'work'
  }, {
    id: 2,
    caption: 'fun'
  }]
};

export default React.createClass({
  render() {
    return (
      <nav>
        <ul role="nav">
          <li><Link to="/">Library</Link></li>
          <li><Link to="/storage">Storage</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
        {this.props.children}
        <Cloud tags={mockData.loadedTags} />
      </nav>
    )
  }
})
