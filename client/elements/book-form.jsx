require('./book-form.styl');

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

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
