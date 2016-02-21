require('./book-form.styl');

import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

export default React.createClass({
  getDefaultProps() {
    return {
    }
  },

  render() {
    return (
      <div>
        <h2>Upload a new book</h2>
        <form className="bookForm">
          <TextField name="title" floatingLabelText="Book title"/><br/>
          <TextField name="author" floatingLabelText="Book author"/><br/>
          <p><label htmlFor="form_file">File</label><input id="form_file" type="file" name="file"/></p>
          <p><label htmlFor="form_tags">Tags</label><input id="form_tags" name="tags"/></p>
          <TextField name="cover" floatingLabelText="Book cover link"/><br/>
          <TextField name="note" floatingLabelText="Note" multiLine/><br/>
          <RaisedButton type="submit" label="Submit" />
        </form>
      </div>
    );
  }
});
