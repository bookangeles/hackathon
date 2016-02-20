require('./main.styl');

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Book from '../book/book.jsx';
import Library from '../library/library.jsx';
import Nav from '../nav/nav.jsx';
import Profile from '../profile/profile.jsx';
import Storage from '../storage/storage.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Nav}>
      <IndexRoute component={Library} />
      <Route path="/storage" component={Storage} />
      <Route path="/book/:id" component={Book} />
      <Route path="/profile" component={Profile} />
    </Route>
  </Router>
), document.getElementById('spa'));

