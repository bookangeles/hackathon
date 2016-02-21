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

// TODO: setup correct access_token
const accessToken = 'access_token=kGWNoGt8LNXlzYLAJnzdrFQ1rnnIERmGooE89JMM8LbQg6vJGuSdH2iUTBuRF5n3';
const fileUploadUrl = `/bapi/books?${accessToken}`;

export default React.createClass({
  getInitialState() {
    return {
      disabled: true
    };
  },

  onFileLoaded(response) {
    this.setState({
      disabled: false,
      action: `/bapi/books/${response.id}?${accessToken}`,
      fileName: response.fileName
    });
  },

  // TODO: ajax-submit
  render() {
    return (
      <div>
        <h2>Upload a new book</h2>
        <MyUploader url={fileUploadUrl} fieldName="book" auto onFileLoaded={this.onFileLoaded} />
        <form
          className="bookForm"
          id="uploadForm"
          encType="multipart/form-data"
          action={this.state.action}
          method="post"
          >
          <TextField name="title" floatingLabelText="Book title" value={this.state.fileName}/><br/>
          <TextField name="author" floatingLabelText="Book author"/><br/>
          <TextField name="cover" floatingLabelText="Book cover link"/><br/>
          <TextField name="note" floatingLabelText="Note" multiLine/><br/>
          <TextField name="tags" floatingLabelText="Tags"/><br/>
          <RaisedButton type="submit" label="Upload" disabled={this.state.disabled} />
        </form>
      </div>
    );
  }
});
