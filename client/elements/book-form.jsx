require('./book-form.styl');

import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import XHRUploader from 'react-xhr-uploader';
var ReactTags = require('react-tag-input').WithContext;
import { browserHistory } from 'react-router';

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
    this.data = {};
    this.availableTags = [];
    $.get('/bapi/tags', (data) => {
      this.availableTags = data;
      this.setState({ suggestions: _.map(data, 'caption') });
    })
    return {
      tags: [],
      suggestions: [],
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

  handleInputChange(attr, e) { this.data[attr] = e.target.value; },
  handleTitleChange(e) {
    this.data.title = e.target.value;
    this.setState({ fileName: e.target.value });
  },

  handleSubmit(e) {
    e.preventDefault();
    this.data.tags = _.map(this.state.tags, (tag) => {
      return _.find(this.availableTags, (atag) => {
        return atag.caption === tag.text;
      }).id;
    });
    console.log(this.availableTags, this.state.tags, this.data.tags);
    $.ajax({
      url: e.target.action,
      method: e.target.method,
      data: this.data,
      success: (data, status) => {
        console.log(data, status);
        browserHistory.push('/');
      },
      error: (error) => {
        console.error(error);
      }
    });
  },

  // tags
  // TODO:
  // - [x] create new tags
  // - [x] remove old input
  // - [ ] attach tags to form
  // - [ ] handle delete
  // - [ ] use material-ui input
  // - [ ] styling
  // - [ ] fix import
  // - [ ] handle drag
  // - [ ] fix deletion bug (see below)
  // - [ ] add hidden input for tags

  // TODO: have a bug here
  // steps to reproduce:
  // - given tags `xxx` and `xcc`
  // - add tags `xxx` and `xcc`
  // - remove tag `xxx`
  // - add tag `xxx` again`
  // - get `Encountered two children with the same key` error
  handleDelete: function(i) {
    var tags = this.state.tags;
    var tag = tags.splice(i, 1)[0];
    var suggestions = this.state.suggestions;
    this.setState({ tags: tags });
    suggestions.push(tag.text);
    this.setState({ suggestions: suggestions });
    console.log('delete', tag, suggestions);
  },

  handleAddition: function(tag) {
    console.log('add', tag, this.state.tags, this.state.suggestions);
    var tags = this.state.tags;
    if (_(tags).map('text').includes(tag)) {
      return;
    }

    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({ tags: tags });

    if (_.includes(this.state.suggestions, tag)) {
      this.setState({ suggestions: _.reject(this.state.suggestions, (el) => { return el === tag; }) })
    } else {
      // Create new tag
      $.post('/bapi/tags', {
        color: _.sample(['grey', 'blue', 'green', 'yellow', 'orange', 'red']),
        caption: tag
      }, (data) => {
        this.availableTags.push(data);
        console.log('tag created', data, this.availableTags);
      });
    }
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
          <TextField name="title" floatingLabelText="Book title" value={this.state.fileName} onChange={this.handleTitleChange}/><br/>
          <TextField name="author" floatingLabelText="Book author" onChange={_.partial(this.handleInputChange, "author")}/><br/>
          <TextField name="note" floatingLabelText="Note" multiLine onChange={_.partial(this.handleInputChange, "note")}/><br/>
          <label>Tags</label><br/>
          <ReactTags tags={this.state.tags}
            suggestions={this.state.suggestions}
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
            /><br/>
          <RaisedButton type="submit" label="Upload" disabled={this.state.disabled} />
        </form>
      </div>
    );
  }
});
