require('./main.styl');

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Book from '../book/book.jsx';
import Library from '../library/library.jsx';
import Nav from '../nav/nav.jsx';
import Profile from '../profile/profile.jsx';
import Storage from '../storage/storage.jsx';
import Dummy from '../elements/onair.jsx';
import BookForm from '../elements/book-form.jsx'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Nav}>
      <IndexRoute component={Library} />
      <Route path="/storage" component={Storage} />
        <Route path="/storage/upload" name="upload" component={Dummy}>
      </Route>
      <Route path="/tags/:list" name="tags page" component={Dummy} />
      <Route path="/book/:id" name="book item" component={Dummy} />
      <Route path="/profile" component={Profile} />
      <Route path="/connections" name="shares page" component={Dummy} />
      <Route path="/form" component={BookForm}/>
    </Route>
  </Router>
), document.getElementById('spa'));
