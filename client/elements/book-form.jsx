require('./book-form.styl');

import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import XHRUploader from 'react-xhr-uploader';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class MyUploader extends XHRUploader {
  uploadFile(file, progressCallback) {
    // copypaste https://github.com/rma-consulting/react-xhr-uploader/blob/e99c66b/src/index.js#L254-L275
    if(file) {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append(this.props.fieldName, file, file.name);

      xhr.onload = () => {
        progressCallback(100);
      };

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          progressCallback((e.loaded / e.total) * 100);
        }
      };

      xhr.open('POST', this.props.url, true);

      // Our code
      // Get auth token from cookie and set to auth header
      // TODO: set auth cookie on server side
      xhr.setRequestHeader('X-Access-Token', _.get(document.cookie.match(/auth_token=(\w+)/), 1));

      xhr.send(formData);
      this.xhrs[file.index] = xhr;

      // Our code
      // Add callback on successful file upload
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status === 200) {
          this.props.onFileLoaded(JSON.parse(xhr.response));
        }
      }

    }
  }
}

export default React.createClass({
  getInitialState() {
    return {
      disabled: true
    };
  },

  onFileLoaded(response) {
    this.setState({
      disabled: false,
      action: `/bapi/books/${response.id}`,
      fileName: response.fileName
    });
  },

  handleSubmit(e, id, oe) {
    e.preventDefault();
    $.ajax({
      url: e.target.action,
      method: e.target.method,
      data: $(e.target).serialize(),
      success: function(data) {
        console.log(arguments);
      },
      error: function(error) {
        console.error(error);
      }
    });
  },

  render() {
    return (
      <div>
        <h2>Upload a new book</h2>
        <MyUploader url="/bapi/books" fieldName="book" auto onFileLoaded={this.onFileLoaded} />
        <form
          className="bookForm"
          id="uploadForm"
          encType="multipart/form-data"
          action={this.state.action}
          method="post"
          onSubmit={this.handleSubmit}
          >
          <TextField name="title" floatingLabelText="Book title" value={this.state.fileName}/><br/>
          <TextField name="author" floatingLabelText="Book author"/><br/>
          <TextField name="cover" floatingLabelText="Book cover link"/><br/>
          <TextField name="note" floatingLabelText="Note" multiLine/><br/>
          <RaisedButton type="submit" label="Upload" disabled={this.state.disabled} />
        </form>
      </div>
    );
  }
});
