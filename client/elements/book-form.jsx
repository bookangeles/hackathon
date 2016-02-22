require('./book-form.styl');

import { browserHistory } from 'react-router';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import XHRUploader from 'react-xhr-uploader';
import CustomTags from '../elements/react-tags.jsx';

class MyUploader extends XHRUploader {
  uploadFile(file, progressCallback) {
    // copypaste https://github.com/rma-consulting/react-xhr-uploader/blob/e99c66b/src/index.js#L254-L275
    if (file) {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append(this.props.fieldName, file, file.name);

      xhr.onload = () => {
        progressCallback(100);
      };

      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable) {
          progressCallback((evt.loaded / evt.total) * 100);
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

const BookForm = React.createClass({
  mixins: [Bem],
  getInitialState() {
    this.data = {};
    return {
      disabled: true,
      tags: []
    };
  },

  onFileLoaded(response) {
    this.setState({
      disabled: false,
      action: `/bapi/books/${response.id}`,
      fileName: response.fileName
    });
  },

  handleInputChange(attr, evt) { this.data[attr] = evt.target.value; },
  handleTitleChange(evt) {
    this.data.title = evt.target.value;
    this.setState({ fileName: evt.target.value });
  },

  handleSubmit(evt) {
    evt.preventDefault();
    this.data.tags = _.pluck(this.state.tags, 'id');
    $.ajax({
      url: evt.target.action,
      method: evt.target.method,
      data: this.data,
      success: (data, status) => {
        browserHistory.push('/');
      },
      error: (error) => {
        console.error(error);
      }
    });
  },

  onTagsUpd(newTags) {
    this.setState({ tags: newTags });
  },

  render() {
    return (
      <div className={this.b_()}>
        <MyUploader url="/bapi/books" fieldName="book" auto onFileLoaded={this.onFileLoaded} />
        <form
          className="bookForm"
          id="uploadForm"
          encType="multipart/form-data"
          action={this.state.action}
          method="post"
          onSubmit={this.handleSubmit}
          >
          <TextField name="title" floatingLabelText="Book title" value={this.state.fileName} onChange={this.handleTitleChange}/><br/>
          <TextField name="author" floatingLabelText="Book author" onChange={_.partial(this.handleInputChange, "author")}/><br/>
          <TextField name="note" floatingLabelText="Note" multiLine onChange={_.partial(this.handleInputChange, "note")}/><br/>
          <label>Tags</label><br/>
          <CustomTags className={this.b_('-tags')} onUpdate={this.onTagsUpd}/>
          <br/><br/><br/><br/>
          <RaisedButton type="submit" label="Upload" disabled={this.state.disabled} />
        </form>
      </div>
    );
  }
});

export default BookForm;
